import { getFirestore } from 'firebase-admin/firestore';
import { createHash } from 'node:crypto';

const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

const HOURLY_LIMIT = 15;
const DAILY_LIMIT = 60;

export function ipHash(rawIp: string): string {
  return createHash('sha256').update(rawIp + '|mbs-cv-salt').digest('hex').slice(0, 24);
}

type RateRecord = {
  hourStart: number;
  hourCount: number;
  dayStart: number;
  dayCount: number;
  lastSeen: number;
};

export type RateResult =
  | { allowed: true; remaining: { hour: number; day: number } }
  | { allowed: false; reason: 'hour' | 'day'; retryAfterMs: number };

/**
 * Per-IP sliding window rate limit backed by Firestore.
 * Resets the hour window after 1 hour from its start, day window after 24h.
 * Each call atomically increments the appropriate counters.
 */
export async function checkAndIncrementRate(ipHashId: string): Promise<RateResult> {
  // Project's (default) database is in Datastore mode and unusable by the
  // Admin SDK; use the named Native-mode database instead.
  const db = getFirestore('mbs-cv');
  const ref = db.collection('chat_rate').doc(ipHashId);
  const now = Date.now();

  return db.runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    const data = (snap.data() ?? null) as RateRecord | null;

    let hourStart = data?.hourStart ?? now;
    let hourCount = data?.hourCount ?? 0;
    let dayStart = data?.dayStart ?? now;
    let dayCount = data?.dayCount ?? 0;

    if (now - hourStart > HOUR_MS) {
      hourStart = now;
      hourCount = 0;
    }
    if (now - dayStart > DAY_MS) {
      dayStart = now;
      dayCount = 0;
    }

    if (hourCount >= HOURLY_LIMIT) {
      return {
        allowed: false,
        reason: 'hour' as const,
        retryAfterMs: HOUR_MS - (now - hourStart),
      };
    }
    if (dayCount >= DAILY_LIMIT) {
      return {
        allowed: false,
        reason: 'day' as const,
        retryAfterMs: DAY_MS - (now - dayStart),
      };
    }

    hourCount += 1;
    dayCount += 1;

    tx.set(ref, {
      hourStart,
      hourCount,
      dayStart,
      dayCount,
      lastSeen: now,
    });

    return {
      allowed: true as const,
      remaining: {
        hour: HOURLY_LIMIT - hourCount,
        day: DAILY_LIMIT - dayCount,
      },
    };
  });
}
