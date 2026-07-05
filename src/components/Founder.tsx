import type { ReactNode } from 'react';
import { useInViewReveal } from '../hooks/useInViewReveal';
import { links } from '../data/profile';
import alamenuShot from '../assets/alamenu-shot.jpg';
import appStoreMark from '../assets/appstore-white.svg';
import swiftMark from '../assets/swift-white.svg';

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

export default function Founder() {
  return (
    <section id="founder" className="px-6 pb-24 md:px-10 md:pb-32">
      <Reveal>
        <p className="label-mono text-ink-3">
          <span className="text-red">03</span> / Outside the bank stack
        </p>
        <h2 className="mt-4 max-w-[720px] font-display text-[clamp(32px,3.4vw,48px)] font-bold leading-[1.05] tracking-[-0.01em]">
          Then I built my own.
        </h2>
        <p className="mt-4 max-w-[560px] text-[15.5px] leading-[1.65] text-ink-2">
          Proof you can click: a live SaaS restaurants use today, and eleven years of shipped apps.
        </p>
      </Reveal>

      <div className="mt-14 flex flex-col gap-4">
        <Reveal delay={0.05}>
          <article
            id="founder-alamenu"
            className="card grid overflow-hidden rounded-[2px] border border-hairline bg-card lg:grid-cols-[1.05fr_0.95fr]"
          >
            <a
              href={links.alaMenu}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block min-h-[280px] overflow-hidden border-b border-hairline lg:min-h-0 lg:border-b-0 lg:border-r"
            >
              <img
                src={alamenuShot}
                alt="The ala.menu landing page, live"
                className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
            </a>
            <div className="p-8 md:p-10">
              <h3 className="font-display text-[clamp(21px,2vw,27px)] font-bold leading-[1.15] tracking-[-0.01em]">
                <span className="sweep">ala.menu, a restaurant SaaS I design, build and run alone.</span>
              </h3>
              <p className="mt-4 text-[15px] leading-[1.7] text-ink-2">
                Guests scan a QR code to a multilingual menu and place zero-commission orders that
                land in real time on the restaurant's dashboard. And the AI here does real work:
                owners talk to their menu and an agent edits it for them, while translations
                stream in live across 20+ languages.
              </p>
              <ul className="mt-6 flex flex-col gap-2.5">
                {[
                  'An AI agent that edits the whole menu from plain language',
                  'Streaming AI translation across 20+ languages',
                  'Zero-commission ordering, landing in real time',
                  'Designed, built and run by one person',
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[13.5px] leading-[1.55] text-ink-2">
                    <span className="mt-px text-red">→</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                className="link-red mt-7 inline-block text-[14px]"
                href={links.alaMenu}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit ala.menu, it's live ↗
              </a>
            </div>
          </article>
        </Reveal>

        <Reveal delay={0.05}>
          <article
            id="founder-ios"
            className="card grid gap-8 rounded-[2px] border border-hairline bg-card p-8 md:grid-cols-[1fr_220px] md:p-10 lg:gap-14"
          >
            <div>
              <h3 className="max-w-[640px] font-display text-[clamp(21px,2vw,27px)] font-bold leading-[1.15] tracking-[-0.01em]">
                <span className="sweep">Eleven years of iOS, shipped on the side.</span>
              </h3>
              <p className="mt-4 max-w-[640px] text-[15px] leading-[1.7] text-ink-2">
                10+ App Store apps since 2015, built, shipped and maintained independently. The
                headline product is Qibla Pro, holding 4.8 stars across 5,000+ reviews. Earlier
                engagements include WhatsDoc, a HIPAA-compliant telehealth platform where I was
                the technical lead.
              </p>
              <div className="mt-7 flex items-center gap-4">
                <div className="flex gap-2.5">
                  <span className="grid h-10 w-10 place-items-center rounded-[9px] bg-[#0D96F6]">
                    <img src={appStoreMark} alt="App Store" className="h-5 w-5" />
                  </span>
                  <span className="grid h-10 w-10 place-items-center rounded-[9px] bg-[#F05138]">
                    <img src={swiftMark} alt="Swift" className="h-5 w-5" />
                  </span>
                </div>
                <a
                  className="link-red text-[14px]"
                  href={links.appStore}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on the App Store ↗
                </a>
              </div>
            </div>
            <div className="flex flex-row items-end justify-between gap-6 border-t border-hairline pt-6 md:flex-col md:items-end md:justify-start md:border-l md:border-t-0 md:pl-8 md:pt-0 md:text-right">
              <div>
                <div className="font-display text-[clamp(34px,3vw,44px)] font-bold leading-none tracking-[-0.01em]">
                  4.8
                </div>
                <div className="relative mt-2 inline-block text-[15px] leading-none tracking-[2px]">
                  <div className="text-[#f5a623]/25">★★★★★</div>
                  <div className="absolute inset-0 overflow-hidden" style={{ width: '96%' }}>
                    <div className="text-[#f5a623]">★★★★★</div>
                  </div>
                </div>
                <div className="label-mono mt-2 max-w-[180px] text-[9px] leading-[1.6] tracking-[0.12em] text-ink-3">
                  Flagship app · 5,000+ reviews
                </div>
              </div>
              <div>
                <div className="font-display text-[clamp(34px,3vw,44px)] font-bold leading-none tracking-[-0.01em]">
                  10+
                </div>
                <div className="label-mono mt-2 max-w-[180px] text-[9px] leading-[1.6] tracking-[0.12em] text-ink-3">
                  Apps shipped since 2015
                </div>
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
