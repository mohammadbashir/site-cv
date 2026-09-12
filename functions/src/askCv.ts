import { onRequest } from 'firebase-functions/v2/https';
import { defineSecret } from 'firebase-functions/params';
import { logger } from 'firebase-functions/v2';
import { initializeApp, getApps } from 'firebase-admin/app';
import OpenAI from 'openai';
import { SYSTEM_PROMPT } from './systemPrompt.js';
import { checkAndIncrementRate, ipHash } from './rateLimit.js';
import { checkAndIncrementBudget } from './budget.js';

if (getApps().length === 0) initializeApp();

const OPENAI_API_KEY = defineSecret('OPENAI_API_KEY');

const ALLOWED_ORIGINS = new Set([
  'https://mohamadbachir.com',
  'https://www.mohamadbachir.com',
  'https://mbs-site-ea6ff.web.app',
  'https://mbs-site-ea6ff.firebaseapp.com',
  // Local preview/dev of the new site; harmless: rate limits + budget still apply.
  'http://localhost:4173',
  'http://localhost:5173',
]);

const ALLOW_LOCALHOST_IN_EMULATOR = process.env.FUNCTIONS_EMULATOR === 'true';

// In the emulator without a Firestore emulator running, skip the Firestore-backed
// rate-limit and budget checks so the function can be exercised locally. This never
// applies in production (FUNCTIONS_EMULATOR is unset there).
const SKIP_FIRESTORE_GUARDS =
  process.env.FUNCTIONS_EMULATOR === 'true' && !process.env.FIRESTORE_EMULATOR_HOST;

const BOT_UA_PATTERNS = [
  /curl/i,
  /wget/i,
  /python-requests/i,
  /scrapy/i,
  /Go-http-client/i,
  /httpie/i,
];

const MIN_Q_LEN = 3;
const MAX_Q_LEN = 500;
const MAX_JD_LEN = 6000;

export const askCv = onRequest(
  {
    region: 'us-central1',
    secrets: [OPENAI_API_KEY],
    cors: false,
    timeoutSeconds: 30,
    memory: '256MiB',
    maxInstances: 5,
    // No warm instance: the chat gets a handful of requests a month, and a
    // 24/7 idle container was the entire Firebase bill. First question after
    // idle pays a cold start; every one after is warm.
    minInstances: 0,
  },
  async (req, res) => {
    // ── Origin / method gating ────────────────────────────────────
    if (req.method === 'OPTIONS') {
      setCors(req, res);
      res.status(204).send('');
      return;
    }

    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }

    const origin = (req.headers.origin as string | undefined) ?? '';
    const isAllowedOrigin = ALLOWED_ORIGINS.has(origin) ||
      (ALLOW_LOCALHOST_IN_EMULATOR && /^http:\/\/localhost(:\d+)?$/.test(origin));
    if (!isAllowedOrigin) {
      logger.warn('blocked origin', { origin });
      res.status(403).json({ error: 'Origin not allowed' });
      return;
    }
    setCors(req, res);

    // ── Bot UA guard (basic) ──────────────────────────────────────
    const ua = (req.headers['user-agent'] as string | undefined) ?? '';
    if (BOT_UA_PATTERNS.some((re) => re.test(ua))) {
      logger.info('blocked bot UA', { ua });
      res.status(403).json({ error: 'No bots, please' });
      return;
    }

    // ── Input validation ──────────────────────────────────────────
    const body = (req.body ?? {}) as { question?: unknown; mode?: unknown };
    const mode = body.mode === 'fit' ? 'fit' : 'question';
    const question = typeof body.question === 'string' ? body.question.trim() : '';
    const maxLen = mode === 'fit' ? MAX_JD_LEN : MAX_Q_LEN;
    if (question.length < MIN_Q_LEN || question.length > maxLen) {
      res.status(400).json({ error: `Input must be ${MIN_Q_LEN}–${maxLen} characters.` });
      return;
    }

    // ── Rate limit ────────────────────────────────────────────────
    const rawIp = (req.headers['fastly-client-ip'] as string | undefined) ||
      (req.headers['x-forwarded-for'] as string | undefined)?.split(',')[0]?.trim() ||
      (req.ip ?? 'unknown');
    const hashedIp = ipHash(rawIp);

    if (!SKIP_FIRESTORE_GUARDS) {
      const rate = await checkAndIncrementRate(hashedIp);
      if (!rate.allowed) {
        const minutes = Math.ceil(rate.retryAfterMs / 60_000);
        const msg = rate.reason === 'hour'
          ? `Too many questions in a short time. Try again in about ${minutes} minutes.`
          : `Daily question limit reached for this network. Try again tomorrow, or email me directly at mohamadbachir.sidani@gmail.com.`;
        res.status(429).json({ error: msg });
        return;
      }

      // ── Daily budget ──────────────────────────────────────────────
      const budget = await checkAndIncrementBudget();
      if (!budget.allowed) {
        res.status(503).json({
          error: 'The live demo is paused for the day. Email me directly at mohamadbachir.sidani@gmail.com or grab the PDF up top.',
        });
        return;
      }
    }

    // ── OpenAI streaming ──────────────────────────────────────────
    const client = new OpenAI({ apiKey: OPENAI_API_KEY.value() });

    res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('X-Accel-Buffering', 'no');
    res.flushHeaders?.();

    const send = (payload: object) => {
      res.write(`data: ${JSON.stringify(payload)}\n\n`);
    };

    try {
      const userContent =
        mode === 'fit'
          ? `JOB DESCRIPTION:\n${question}\n\nProduce the fit brief exactly as instructed in FIT BRIEF MODE. First person, plain text, no markdown, no em-dashes. End with the [refs: ...] citation line.`
          : `Question: ${question}\n\nAnswer in first person, 2 to 4 short sentences. Plain text only. No markdown, no em-dashes. End with the [refs: ...] citation line as instructed.`;

      const stream = await client.chat.completions.create({
        model: 'gpt-4o-mini',
        stream: true,
        max_tokens: mode === 'fit' ? 520 : 300,
        temperature: 0.6,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userContent },
        ],
      });

      for await (const chunk of stream) {
        const delta = chunk.choices?.[0]?.delta?.content;
        if (delta) send({ type: 'chunk', text: delta });
      }

      send({ type: 'done' });
      res.end();
    } catch (err) {
      logger.error('openai error', err);
      send({
        type: 'error',
        message: 'The live demo had a hiccup. Email me directly at mohamadbachir.sidani@gmail.com.',
      });
      res.end();
    }
  },
);

function setCors(req: { headers: { origin?: string | string[] } }, res: { setHeader: (k: string, v: string) => void }) {
  const origin = (req.headers.origin as string | undefined) ?? '';
  if (ALLOWED_ORIGINS.has(origin) || (ALLOW_LOCALHOST_IN_EMULATOR && /^http:\/\/localhost(:\d+)?$/.test(origin))) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Max-Age', '86400');
}
