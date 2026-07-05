import type { ReactNode } from 'react';
import { useInViewReveal } from '../hooks/useInViewReveal';
import { links, profile } from '../data/profile';

function Reveal({ children }: { children: ReactNode }) {
  const { ref, inView } = useInViewReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`sr ${inView ? 'is-in' : ''}`}>
      {children}
    </div>
  );
}

export default function ContactCta() {
  return (
    <section id="contact" className="px-6 pb-10 md:px-10">
      <Reveal>
        <div className="card rounded-[2px] bg-ink px-8 py-16 text-center md:py-24">
          <p className="label-mono text-white/40">
            <span className="text-red">05</span> / Contact
          </p>
          <h2 className="mx-auto mt-5 max-w-[760px] font-display text-[clamp(38px,4.6vw,64px)] font-bold leading-[1.02] tracking-[-0.015em] text-white">
            Let's talk<span className="dot-live text-red">.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[500px] text-[15.5px] leading-[1.65] text-white/60">
            Hiring, or building something? Email is the fastest way to reach me. The CV has the
            rest.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a
              className="btn btn-solid shadow-[0_14px_34px_-14px_rgba(229,72,77,0.6)]"
              href={links.email}
            >
              Email me
            </a>
            <a
              className="btn border border-white/30 text-white hover:border-white"
              href="/cv.pdf"
              target="_blank"
              rel="noopener"
            >
              Download CV
            </a>
            <a
              className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/60 transition-colors hover:text-white"
              href={links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn ↗
            </a>
          </div>
          <p className="meta-mono mt-8 !text-white/40">{profile.emailDisplay}</p>
        </div>
      </Reveal>

      <footer className="flex flex-col items-start justify-between gap-3 border-t border-hairline py-8 sm:flex-row sm:items-center">
        <div className="label-mono text-ink-3">Mohamad Bachir Sidani · {profile.title}</div>
        <div className="label-mono text-ink-3">Beirut · 2026</div>
      </footer>
    </section>
  );
}
