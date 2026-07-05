import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { useInViewReveal } from '../hooks/useInViewReveal';

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const { ref, inView } = useInViewReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`sr ${inView ? 'is-in' : ''}`}
      style={{ '--d': `${delay}s` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}

/** Live Beirut clock, ticking every second. */
function useBeirutTime() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(t);
  }, []);
  const fmt = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Beirut',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
  return fmt.format(now);
}

const nowLines = [
  'Architecting the Pega 8 → 25 upgrade across both CRMs',
  'Building ala.menu, live with restaurants',
  'Lead System Architect certification in progress',
];

export default function Person() {
  const time = useBeirutTime();

  return (
    <section id="person" className="px-6 pb-24 md:px-10 md:pb-32">
      <div className="grid gap-10 lg:grid-cols-[1fr_400px] lg:gap-16">
        <Reveal>
          <p className="label-mono text-ink-3">
            <span className="text-red">04</span> / The person behind it
          </p>
          <h2 className="mt-4 max-w-[620px] font-display text-[clamp(32px,3.4vw,48px)] font-bold leading-[1.05] tracking-[-0.01em]">
            Platforms at work. Products after hours.
          </h2>
          <p className="mt-5 max-w-[620px] text-[15.5px] leading-[1.7] text-ink-2">
            Ten years inside one of the most demanding software companies in finance, and I still
            ship like it's day one. I architect the systems, run the team as Scrum Master, mentor
            the engineers on it, and keep founding things on the side because building is the part
            I never switch off.
          </p>
          <p className="mt-5 max-w-[620px] text-[15.5px] leading-[1.7] text-ink-2">
            Based in Beirut, native in <b className="font-semibold text-ink">Arabic and English</b>,
            and used to running delivery across European and US hours.
          </p>
        </Reveal>

        <div className="flex flex-col gap-4">
          <Reveal delay={0.08}>
            <div className="card rounded-[2px] border border-hairline bg-card p-7">
              <div className="label-mono text-[8.5px] text-ink-3">Local time · Beirut</div>
              <div className="mt-3 font-display text-[40px] font-bold leading-none tracking-[-0.01em] tabular-nums">
                {time}
              </div>
              <div className="label-mono mt-3 text-[8.5px] text-ink-3">
                Overlapping EU hours fully · US mornings comfortably
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="card rounded-[2px] border border-hairline bg-card p-7">
              <div className="label-mono text-[8.5px] text-red">Now</div>
              <ul className="mt-4 flex flex-col gap-3.5">
                {nowLines.map((line) => (
                  <li
                    key={line}
                    className="border-l-2 border-red/60 pl-4 text-[13.5px] leading-[1.5] text-ink-2"
                  >
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
