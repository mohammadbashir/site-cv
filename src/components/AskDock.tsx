import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { askCv } from '../lib/askCv';
import { caseById } from '../data/map';
import Composer from './Composer';
import Message from './Message';

type Turn = {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  streaming?: boolean;
  refs?: string[];
};

const STARTERS = [
  'Why should we hire him?',
  "What's your AI experience?",
  'How deep is your Pega work?',
  'What have you shipped on your own?',
  'Are you open to relocation?',
];

/** Citation ids the backend may emit → chip labels + on-page targets. */
const REF_LABELS: Record<string, string> = {
  cscrm: 'Customer Service CRM',
  salescrm: 'Sales CRM',
  mcp: 'MCP Server',
  gateway: 'Microservices',
  pdftk: 'PDF Toolkit',
  alamenu: 'À La Menu',
  ios: 'iOS practice',
  leadership: 'Leadership',
  ledger: 'The ledger',
  contact: 'Contact',
};

const stripRefs = (raw: string) =>
  raw.replace(/\n?\s*\[(?:refs?[^\]]*\]?)?\s*$/i, '').trimEnd();

const parseRefs = (raw: string): string[] => {
  const m = raw.match(/\[refs?:\s*([a-z0-9\-,\s]+)\]/i);
  if (!m) return [];
  return m[1]
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter((id) => REF_LABELS[id]);
};

export default function AskDock() {
  const [open, setOpen] = useState(false);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const idRef = useRef(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [turns, open]);

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('cv:open-dock', onOpen);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('cv:open-dock', onOpen);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  const goToRef = (id: string) => {
    setOpen(false);
    if (caseById(id)) {
      window.dispatchEvent(new CustomEvent('cv:focus-node', { detail: { caseId: id } }));
      return;
    }
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    el.classList.remove('flash-target');
    requestAnimationFrame(() => el.classList.add('flash-target'));
    setTimeout(() => el.classList.remove('flash-target'), 1800);
  };

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

    // Chunks arrive in lumps; a rAF loop reveals characters at a steady
    // cadence. The trailing [refs: …] line is stripped from display and
    // parsed into citation chips when the stream finishes.
    let target = '';
    let shown = 0;
    let done = false;

    const pump = () => {
      if (shown < target.length) {
        const remaining = target.length - shown;
        const step = Math.min(remaining, Math.max(1, Math.round(remaining / 9)), 6);
        shown += step;
        const text = stripRefs(target.slice(0, shown));
        setTurns((t) => t.map((r) => (r.id === assistantId ? { ...r, content: text } : r)));
      }
      if (!done || shown < target.length) {
        rafRef.current = requestAnimationFrame(pump);
      } else {
        const refs = parseRefs(target);
        setTurns((t) => t.map((r) => (
          r.id === assistantId
            ? { ...r, content: stripRefs(target), streaming: false, refs }
            : r
        )));
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
    <>
      {!open ? (
        <div className="dock-anchor">
          <button type="button" className="dock-pill" onClick={() => setOpen(true)}>
            <span className="ask-live" aria-hidden="true" />
            <span>Ask my CV</span>
          </button>
        </div>
      ) : null}

      <div className={`dock-panel${open ? ' open' : ''}${empty ? ' is-empty' : ''}`} role="dialog" aria-label="Ask my CV" aria-hidden={!open}>
        {open ? (
          <>
            <div className="dock-head">
              <span className="dh-label">
                <span className="ask-live" aria-hidden="true" />
                Ask my CV / Live
              </span>
              <button type="button" className="case-close" onClick={() => setOpen(false)} aria-label="Close">
                <X size={13} strokeWidth={2} />
              </button>
            </div>

            {empty ? (
              <div className="dock-sub">
                Answers in my words, grounded in the CV. <em>It cites its sources.</em>
              </div>
            ) : null}

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
                      <div key={turn.id}>
                        <Message role={turn.role} content={turn.content} streaming={turn.streaming} />
                        {turn.role === 'assistant' && !turn.streaming && turn.refs && turn.refs.length > 0 ? (
                          <div className="refs-row" style={{ paddingLeft: 38 }}>
                            <span className="refs-label">From</span>
                            {turn.refs.map((id) => (
                              <button key={id} type="button" className="ref-chip" onClick={() => goToRef(id)}>
                                {REF_LABELS[id]} ↗
                              </button>
                            ))}
                          </div>
                        ) : null}
                      </div>
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
          </>
        ) : null}
      </div>
    </>
  );
}
