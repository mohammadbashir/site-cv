import { useEffect, useRef, useState } from 'react';
import { askCv } from '../lib/askCv';
import Composer from './Composer';
import Message from './Message';

type Turn = { id: number; role: 'user' | 'assistant'; content: string; streaming?: boolean };

const STARTERS = [
  'Why should we hire him?',
  "What's your AI experience?",
  'Tell me about your Pega depth',
  "What's your most impressive shipped work?",
  'Are you open to relocation?',
];

export default function AskCv() {
  const [turns, setTurns] = useState<Turn[]>([]);
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const idRef = useRef(0);

  // Keep the scroll area pinned to the latest message as it streams.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [turns]);

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);

  const ask = async (question: string) => {
    if (busy) return;
    setBusy(true);

    const userId = ++idRef.current;
    const assistantId = ++idRef.current;
    setTurns((t) => [
      ...t,
      { id: userId, role: 'user', content: question },
      { id: assistantId, role: 'assistant', content: '', streaming: true },
    ]);

    // Network chunks arrive in irregular lumps. We append them to `target` and
    // let a rAF loop reveal characters at a steady, eased cadence so the text
    // types out smoothly instead of jumping.
    let target = '';
    let shown = 0;
    let done = false;

    const pump = () => {
      if (shown < target.length) {
        const remaining = target.length - shown;
        const step = Math.min(remaining, Math.max(1, Math.round(remaining / 9)), 6);
        shown += step;
        const text = target.slice(0, shown);
        setTurns((t) => t.map((r) => (r.id === assistantId ? { ...r, content: text } : r)));
      }
      if (!done || shown < target.length) {
        rafRef.current = requestAnimationFrame(pump);
      } else {
        setTurns((t) => t.map((r) => (r.id === assistantId ? { ...r, streaming: false } : r)));
        setBusy(false);
        rafRef.current = null;
      }
    };
    rafRef.current = requestAnimationFrame(pump);

    try {
      for await (const chunk of askCv(question)) {
        if (chunk.type === 'chunk') target += chunk.text;
        else if (chunk.type === 'error') { target = chunk.message; done = true; break; }
        else if (chunk.type === 'done') { done = true; }
      }
    } catch {
      target = 'The live demo is offline right now. Email me or grab the PDF up top.';
    } finally {
      done = true;
    }
  };

  const empty = turns.length === 0;

  return (
    <div className="ask-panel">
      <div className="ask-scroll" ref={scrollRef}>
        <div className="ask-scroll-inner">
          {empty ? (
            <div className="chips">
              {STARTERS.map((s) => (
                <button key={s} type="button" className="chip-btn" onClick={() => ask(s)} disabled={busy}>
                  {s}
                </button>
              ))}
            </div>
          ) : (
            <>
              {turns.map((turn) => (
                <Message key={turn.id} role={turn.role} content={turn.content} streaming={turn.streaming} />
              ))}
              {busy && turns[turns.length - 1]?.content === '' ? (
                <div className="thinking">
                  <span className="thinking-bar" />
                  <span>Thinking</span>
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>
      <Composer busy={busy} onSubmit={ask} />
    </div>
  );
}
