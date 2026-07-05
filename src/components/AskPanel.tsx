import { useCallback, useEffect, useRef, useState } from 'react';
import { askCv, type AskMode } from '../lib/askCv';

/** Where each citation id lands on the page, and how its receipt reads. */
const REF_TARGETS: Record<string, { el: string; label: string }> = {
  cscrm: { el: 'proof-cscrm', label: 'Customer Service CRM' },
  salescrm: { el: 'proof-salescrm', label: 'Sales CRM' },
  gateway: { el: 'proof-estate', label: 'The microservices estate' },
  pdftk: { el: 'proof-estate', label: 'The microservices estate' },
  leadership: { el: 'proof-team', label: 'The team' },
  alamenu: { el: 'founder-alamenu', label: 'ala.menu' },
  ios: { el: 'founder-ios', label: 'The iOS practice' },
  ledger: { el: 'expertise', label: 'Expertise' },
  contact: { el: 'contact', label: 'Contact' },
};

/** Strip the trailing [refs: ...] machine line (even while partially streamed). */
function stripRefs(raw: string): string {
  return raw.replace(/\n?\s*\[(?:refs?[^\]]*\]?)?\s*$/i, '').trimEnd();
}

function parseRefs(raw: string): string[] {
  const m = raw.match(/\[refs?:\s*([^\]]+)\]/i);
  if (!m) return [];
  return [...new Set(
    m[1]
      .split(/[,\s]+/)
      .map((s) => s.trim().toLowerCase())
      .filter((s) => s in REF_TARGETS),
  )];
}

function focusReceipt(id: string) {
  const target = REF_TARGETS[id];
  if (!target) return;
  const el = document.getElementById(target.el);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  el.classList.remove('flash-target');
  requestAnimationFrame(() => el.classList.add('flash-target'));
  window.setTimeout(() => el.classList.remove('flash-target'), 2000);
}

type Msg = {
  role: 'user' | 'assistant';
  text: string;
  refs?: string[];
  error?: boolean;
  streaming?: boolean;
};

const SUGGESTIONS = [
  'Why is he principal level?',
  'What did he actually build at Murex?',
  "What's his AI experience?",
  'Can he lead a team?',
];

export default function AskPanel() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<AskMode>('question');
  const [input, setInput] = useState('');
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const busyRef = useRef(false);

  const send = useCallback(async (question: string, sendMode: AskMode) => {
    const q = question.trim();
    if (!q || busyRef.current) return;
    busyRef.current = true;
    setBusy(true);
    setInput('');
    setMsgs((m) => [
      ...m,
      { role: 'user', text: sendMode === 'fit' ? 'Job description pasted. How does he fit?' : q },
      { role: 'assistant', text: '', streaming: true },
    ]);

    let raw = '';
    let errored = false;
    for await (const chunk of askCv(q, sendMode)) {
      if (chunk.type === 'chunk') {
        raw += chunk.text;
        const shown = stripRefs(raw);
        setMsgs((m) => {
          const next = [...m];
          next[next.length - 1] = { role: 'assistant', text: shown, streaming: true };
          return next;
        });
      } else if (chunk.type === 'error') {
        errored = true;
        setMsgs((m) => {
          const next = [...m];
          next[next.length - 1] = { role: 'assistant', text: chunk.message, error: true };
          return next;
        });
      }
    }

    if (!errored) {
      const refs = parseRefs(raw);
      setMsgs((m) => {
        const next = [...m];
        next[next.length - 1] = { role: 'assistant', text: stripRefs(raw), refs };
        return next;
      });
    }
    busyRef.current = false;
    setBusy(false);
  }, []);

  // Hero and anywhere else open the panel via this event.
  useEffect(() => {
    const onAsk = (e: Event) => {
      const detail = (e as CustomEvent<{ question?: string; mode?: AskMode }>).detail;
      setOpen(true);
      setMode(detail?.mode ?? 'question');
      if (detail?.question) {
        void send(detail.question, detail?.mode ?? 'question');
      } else {
        window.setTimeout(() => inputRef.current?.focus(), 480);
      }
    };
    window.addEventListener('cv:ask', onAsk);
    return () => window.removeEventListener('cv:ask', onAsk);
  }, [send]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const submit = () => void send(input, mode);

  return (
    <>
      <div
        className={`ask-backdrop fixed inset-0 z-40 bg-ink/25 ${open ? 'open' : ''}`}
        onClick={() => setOpen(false)}
      />
      <aside
        className={`ask-drawer fixed inset-y-0 right-0 z-50 flex w-full max-w-[460px] flex-col border-l border-hairline bg-card shadow-[-24px_0_60px_-40px_rgba(20,22,29,0.35)] ${open ? 'open' : ''}`}
        aria-label="Ask my CV"
      >
        {/* header */}
        <div className="flex items-start justify-between border-b border-hairline px-6 py-5">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="think-dot" style={{ animationDuration: '2.6s' }} />
              <span className="label-mono text-ink">Ask my CV</span>
            </div>
            <p className="mt-2 text-[12.5px] leading-[1.55] text-ink-2">
              Answers in my words, grounded in this page. Every claim comes with a receipt.
            </p>
          </div>
          <button
            className="label-mono -mr-1 mt-0.5 cursor-pointer border-0 bg-transparent p-1 text-ink-3 transition-colors hover:text-ink"
            onClick={() => setOpen(false)}
          >
            Close
          </button>
        </div>

        {/* mode switch */}
        <div className="flex gap-6 border-b border-hairline px-6 pt-4">
          {(
            [
              ['question', 'Ask a question'],
              ['fit', 'Paste a job description'],
            ] as [AskMode, string][]
          ).map(([m, label]) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`label-mono cursor-pointer border-0 bg-transparent pb-3 transition-colors ${
                mode === m
                  ? 'border-b-2 border-red text-ink'
                  : 'text-ink-3 hover:text-ink-2'
              }`}
              style={mode === m ? { borderBottom: '2px solid var(--color-red)' } : undefined}
            >
              {label}
            </button>
          ))}
        </div>

        {/* messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-5">
          {msgs.length === 0 && (
            <div>
              <p className="text-[13.5px] leading-[1.6] text-ink-2">
                {mode === 'fit'
                  ? 'Paste the job description below. You get a fit summary, where I map with receipts, honest gaps, and what to probe in an interview.'
                  : 'Ask anything a screening call would cover. A few starters:'}
              </p>
              {mode === 'question' && (
                <div className="mt-4 flex flex-col items-start gap-2.5">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => void send(s, 'question')}
                      className="nav-link cursor-pointer border-0 bg-transparent p-0 text-left normal-case tracking-normal"
                      style={{ fontSize: '13px' }}
                    >
                      <span className="text-red">→ </span>
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="flex flex-col gap-5">
            {msgs.map((m, i) =>
              m.role === 'user' ? (
                <div key={i} className="ml-8 self-end rounded-[2px] bg-bg px-4 py-3 text-[13.5px] leading-[1.55] text-ink">
                  {m.text}
                </div>
              ) : (
                <div key={i} className="mr-4">
                  <div className="flex items-start gap-2.5">
                    {m.streaming && !m.text ? (
                      <span className="think-dot mt-1.5 shrink-0" />
                    ) : (
                      <span className="mt-[7px] h-[7px] w-[7px] shrink-0 rounded-full bg-red" />
                    )}
                    <p className={`whitespace-pre-wrap text-[13.5px] leading-[1.65] ${m.error ? 'text-ink-3' : 'text-ink'}`}>
                      {m.text || (m.streaming ? '' : '')}
                    </p>
                  </div>
                  {m.refs && m.refs.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 pl-[17px]">
                      {m.refs.map((r) => (
                        <button
                          key={r}
                          onClick={() => focusReceipt(r)}
                          className="link-red cursor-pointer border-0 bg-transparent p-0 text-[12.5px]"
                        >
                          → See: {REF_TARGETS[r].label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ),
            )}
          </div>
        </div>

        {/* composer */}
        <div className="border-t border-hairline px-6 py-4">
          <div className="flex items-end gap-3">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey && mode === 'question') {
                  e.preventDefault();
                  submit();
                }
              }}
              rows={mode === 'fit' ? 6 : 1}
              maxLength={mode === 'fit' ? 6000 : 500}
              placeholder={mode === 'fit' ? 'Paste the full job description here…' : 'Type your question…'}
              className="min-h-[44px] flex-1 resize-none rounded-[2px] border border-hairline bg-bg px-4 py-3 text-[13.5px] leading-[1.5] text-ink outline-none transition-colors placeholder:text-ink-3 focus:border-ink/30"
            />
            <button
              onClick={submit}
              disabled={busy || !input.trim()}
              aria-label="Send"
              className="grid h-[44px] w-[44px] shrink-0 cursor-pointer place-items-center rounded-full border-0 bg-red text-white transition-all hover:bg-red-deep disabled:cursor-default disabled:opacity-30"
            >
              ↑
            </button>
          </div>
          {mode === 'fit' && (
            <p className="label-mono mt-2.5 text-[8px] text-ink-3">
              Press the button to get the fit brief · nothing is stored
            </p>
          )}
        </div>
      </aside>
    </>
  );
}
