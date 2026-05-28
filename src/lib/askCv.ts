/**
 * Client for the /api/ask-cv backend (Firebase Function, OpenAI streaming).
 * POSTs the question and yields Server-Sent-Event chunks as they arrive.
 */

export type StreamChunk =
  | { type: 'chunk'; text: string }
  | { type: 'done' }
  | { type: 'error'; message: string };

const ENDPOINT = '/api/ask-cv';

export async function* askCv(question: string): AsyncGenerator<StreamChunk> {
  let res: Response;
  try {
    res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    });
  } catch {
    yield { type: 'error', message: 'The live demo is offline right now. Email me or grab the PDF up top.' };
    return;
  }

  if (!res.ok || !res.body) {
    const message = await readErrorMessage(res);
    yield { type: 'error', message };
    return;
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    // SSE frames are separated by a blank line.
    let sep: number;
    while ((sep = buffer.indexOf('\n\n')) !== -1) {
      const frame = buffer.slice(0, sep);
      buffer = buffer.slice(sep + 2);
      const chunk = parseFrame(frame);
      if (chunk) yield chunk;
    }
  }
}

function parseFrame(frame: string): StreamChunk | null {
  const line = frame.split('\n').find((l) => l.startsWith('data:'));
  if (!line) return null;
  const json = line.slice(5).trim();
  if (!json) return null;
  try {
    return JSON.parse(json) as StreamChunk;
  } catch {
    return null;
  }
}

async function readErrorMessage(res: Response): Promise<string> {
  try {
    const data = (await res.json()) as { error?: string };
    if (data.error) return data.error;
  } catch {
    /* ignore */
  }
  return 'The live demo is offline right now. Email me or grab the PDF up top.';
}
