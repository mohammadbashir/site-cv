import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { links } from '../data/profile';
import portrait from '../assets/portrait.jpg';

function openAsk(detail?: { question?: string; mode?: 'question' | 'fit' }) {
  window.dispatchEvent(new CustomEvent('cv:ask', { detail }));
}

/** Runs cb once the tab is actually visible (immediately if it already is). */
function whenVisible(cb: () => void) {
  if (document.visibilityState === 'visible') {
    cb();
    return () => {};
  }
  const onChange = () => {
    if (document.visibilityState === 'visible') {
      document.removeEventListener('visibilitychange', onChange);
      cb();
    }
  };
  document.addEventListener('visibilitychange', onChange);
  return () => document.removeEventListener('visibilitychange', onChange);
}

/** Counts 0 → end once, after a delay, honoring prefers-reduced-motion. */
function useCountUp(end: number, delayMs: number) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(end);
      return;
    }
    let raf = 0;
    let timer = 0;
    const cleanup = whenVisible(() => {
      timer = window.setTimeout(() => {
        const t0 = performance.now();
        const run = () => {
          const k = Math.min(1, (performance.now() - t0) / 1400);
          setValue(Math.round(end * (1 - Math.pow(1 - k, 3))));
          if (k < 1) raf = requestAnimationFrame(run);
        };
        raf = requestAnimationFrame(run);
      }, delayMs);
    });
    return () => {
      cleanup();
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [end, delayMs]);

  return value;
}

/** The hero ask bar: the signature entry point. Submits into the AskPanel drawer. */
function AskBar() {
  const [q, setQ] = useState('');
  // The full placeholder truncates inside a 390px viewport; narrow screens get
  // the short form.
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)');
    const update = () => setNarrow(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    openAsk(q.trim() ? { question: q.trim() } : undefined);
    setQ('');
  };
  return (
    <div className="in mt-8 max-w-[520px]" style={{ '--t': '1.3s' } as React.CSSProperties}>
      <form
        onSubmit={submit}
        className="flex items-center gap-3 rounded-[2px] border border-hairline bg-card py-1.5 pl-4 pr-1.5 transition-colors focus-within:border-ink/30"
      >
        <span className="think-dot shrink-0" style={{ animationDuration: '2.6s' }} />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          maxLength={500}
          placeholder={narrow ? 'Ask my CV anything.' : 'Ask my CV anything. It answers with receipts.'}
          className="w-full border-0 bg-transparent py-2.5 text-[13.5px] text-ink outline-none placeholder:text-ink-3"
        />
        <button
          type="submit"
          aria-label="Ask"
          className="grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-full border-0 bg-red text-white transition-colors hover:bg-red-deep"
        >
          ↑
        </button>
      </form>
      <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1.5">
        <button
          onClick={() => openAsk({ question: 'Why is he principal level?' })}
          className="cursor-pointer border-0 bg-transparent p-0 font-mono text-[11.5px] text-ink-3 transition-colors hover:text-ink"
        >
          <span className="text-red">→</span> Why principal level?
        </button>
        <button
          onClick={() => openAsk({ mode: 'fit' })}
          className="cursor-pointer border-0 bg-transparent p-0 font-mono text-[11.5px] text-ink-3 transition-colors hover:text-ink"
        >
          <span className="text-red">→</span> Paste a job description, get a fit brief
        </button>
      </div>
    </div>
  );
}

function Stat({
  value,
  suffix,
  label,
  delay,
}: {
  value: number;
  suffix?: string;
  label: string;
  delay: number;
}) {
  const n = useCountUp(value, 1500);
  return (
    <div className="in" style={{ '--t': `${delay}s` } as React.CSSProperties}>
      <div className="font-display text-[26px] font-bold tabular-nums leading-none">
        {n}
        {suffix}
      </div>
      <div className="label-mono mt-2 text-[9px] tracking-[0.12em] text-ink-3">{label}</div>
    </div>
  );
}

export default function Hero() {
  useEffect(() => {
    return whenVisible(() =>
      requestAnimationFrame(() => document.documentElement.classList.add('anim-ready'))
    );
  }, []);

  return (
    <section id="top" className="relative flex min-h-screen flex-col overflow-hidden">
      {/* quiet structure: hairline guides + warm wash behind the portrait */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: [
            'radial-gradient(640px 520px at 76% 42%, rgba(229,72,77,0.055), transparent 72%)',
            'linear-gradient(to right, transparent calc(33.3% - 1px), rgba(20,22,29,0.045) 33.3%, transparent calc(33.3% + 1px))',
            'linear-gradient(to right, transparent calc(66.6% - 1px), rgba(20,22,29,0.045) 66.6%, transparent calc(66.6% + 1px))',
          ].join(', '),
        }}
      />
      {/* top bar */}
      <header
        className="in flex items-center justify-between px-6 pt-6 md:px-10"
        style={{ '--t': '0.1s' } as React.CSSProperties}
      >
        <div className="label-mono text-ink-2">Mohamad Bachir Sidani</div>
        <nav className="flex items-center gap-7">
          <a className="nav-link hidden sm:block" href="#proof">
            Proof
          </a>
          <a className="nav-link hidden sm:block" href="#founder">
            Founder
          </a>
          <a className="nav-link hidden sm:block" href="#contact">
            Contact
          </a>
          <a
            className="label-mono rounded-[2px] border border-ink/25 px-4 py-2.5 text-ink transition-colors hover:border-red hover:text-red"
            href="/cv.pdf"
            target="_blank"
            rel="noopener"
          >
            Download CV
          </a>
        </nav>
      </header>

      {/* main */}
      <div className="grid flex-1 items-center gap-10 px-6 py-8 md:px-10 lg:grid-cols-[1.12fr_0.88fr] lg:gap-14">
        <div className="max-w-[640px]">
          <p className="label-mono in text-ink-2" style={{ '--t': '0.25s' } as React.CSSProperties}>
            Principal Engineer · Systems Architect
          </p>

          <h1 className="mt-5 font-display text-[clamp(42px,5.4vw,72px)] font-bold leading-[1.02] tracking-[-0.015em]">
            <span className="reveal">
              <span style={{ '--t': '0.35s' } as React.CSSProperties}>Mohamad</span>
            </span>
            <span className="reveal">
              <span style={{ '--t': '0.48s' } as React.CSSProperties}>
                Bachir Sidani<span className="dot-live text-red">.</span>
              </span>
            </span>
          </h1>

          {/* portrait, mobile placement */}
          <div className="img-wipe mt-8 lg:hidden" style={{ '--t': '0.55s' } as React.CSSProperties}>
            <img
              src={portrait}
              alt="Mohamad Bachir Sidani"
              className="aspect-[4/5] w-full rounded-[2px] object-cover ring-1 ring-hairline"
            />
          </div>

          <h2
            className="in mt-8 font-display text-[clamp(24px,2.5vw,36px)] font-bold leading-[1.12] tracking-[-0.01em]"
            style={{ '--t': '0.7s' } as React.CSSProperties}
          >
            60,000 people start their workday on systems I architected.
          </h2>

          <p
            className="in mt-5 max-w-[520px] text-[16px] leading-[1.65] text-ink-2"
            style={{ '--t': '0.9s' } as React.CSSProperties}
          >
            <b className="font-semibold text-ink">300+ banks</b> depend on them, supported through
            the two CRM platforms I own. Ten years at{' '}
            <b className="font-semibold text-ink">Murex</b>, the software behind the world's top
            banks. Founder of <b className="font-semibold text-ink">ala.menu</b>, live with
            restaurants today.
          </p>

          <div className="in mt-9 flex flex-wrap items-center gap-4" style={{ '--t': '1.1s' } as React.CSSProperties}>
            <a className="btn btn-solid" href="/cv.pdf" target="_blank" rel="noopener">
              Download CV
            </a>
            <a className="btn btn-ghost" href={links.email}>
              Email me
            </a>
            <a
              className="nav-link"
              href={links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn ↗
            </a>
          </div>

          <AskBar />
        </div>

        {/* portrait, desktop */}
        <div
          className="img-wipe relative ml-auto hidden aspect-[4/5] h-[min(64vh,660px)] lg:block"
          style={{ '--t': '0.5s' } as React.CSSProperties}
        >
          <img
            src={portrait}
            alt="Mohamad Bachir Sidani"
            className="h-full w-full rounded-[2px] object-cover ring-1 ring-hairline"
          />
        </div>
      </div>

      {/* proof band */}
      <div className="px-6 pb-7 md:px-10">
        <div className="rule-draw" style={{ '--t': '1.4s' } as React.CSSProperties} />
        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-7 md:grid-cols-4">
          <Stat value={10} label="Years at Murex" delay={1.55} />
          <Stat value={300} suffix="+" label="Client banks" delay={1.65} />
          <Stat value={60} suffix="K+" label="Daily users" delay={1.75} />
          <Stat value={10} suffix="+" label="App Store apps shipped" delay={1.85} />
        </div>
        <p
          className="in mt-6 font-mono text-[11.5px] tracking-[0.02em] text-ink-3"
          style={{ '--t': '2s' } as React.CSSProperties}
        >
          <span className="text-ink">Scrum Master of 5 engineers</span>
          <span className="text-red"> / </span>
          <span className="text-ink">founder of ala.menu, live</span>
          <span className="text-red"> / </span>Pega Certified Senior System Architect
          <span className="text-red"> / </span>Beirut, works across timezones
        </p>
      </div>
    </section>
  );
}
