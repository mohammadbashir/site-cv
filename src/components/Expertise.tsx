import type { ReactNode } from 'react';
import { Fragment } from 'react';
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

const stack = [
  'Pega',
  'AI · Agents',
  'Prompt Engineering',
  'Java · Spring',
  'iOS · Swift',
  'React · TypeScript',
  'Python · FastAPI',
  'Docker · AWS',
];

const areas = [
  {
    kicker: 'Pega platform',
    color: '#2f6fe0',
    title: 'Pega Certified Senior System Architect.',
    body: 'Ten years, two enterprise CRM platforms live in production, and the Lead System Architect certification in progress.',
    foot: 'Pega 8 → 25 · zero-downtime upgrades',
  },
  {
    kicker: 'AI engineering',
    color: '#e5484d',
    title: 'Prompt engineering, in production.',
    body: 'ala.menu runs on it: an AI agent that edits whole menus from plain language, streaming translation across 20+ languages, and LLM pipelines with caching and guardrails, designed and prompted end to end.',
    foot: 'agents · tool calling · streaming pipelines',
  },
  {
    kicker: 'Java · Spring',
    color: '#5fa73a',
    title: 'Microservices that banks sit on.',
    body: 'Spring Cloud Gateway at the edge, admin and client services behind it, SSO across Azure AD, SAML 2.0 and OAuth 2.0. Deploys cut 92 percent.',
    foot: 'Docker · AWS ECS · 95% test coverage',
  },
  {
    kicker: 'iOS · Swift',
    color: '#F05138',
    title: 'Ten years on the App Store.',
    body: '10+ apps shipped independently since 2015. Qibla Pro holds 4.8 stars; WhatsDoc telehealth had me as technical lead.',
    foot: 'Swift · App Store · since 2015',
  },
  {
    kicker: 'Web · React',
    color: '#087ea4',
    title: 'TypeScript, end to end.',
    body: 'ala.menu runs React, TypeScript and Node in production. This site is the same stack: design system, motion, performance.',
    foot: 'React · TypeScript · Node · Tailwind',
  },
  {
    kicker: 'Python',
    color: '#3776ab',
    title: 'Async services at enterprise scale.',
    body: 'A FastAPI PDF platform serving every tenant: Celery workers over RabbitMQ queues, Dockerised on AWS ECS.',
    foot: 'FastAPI · Celery · RabbitMQ',
  },
];

export default function Expertise() {
  return (
    <section id="expertise" className="pb-24 md:pb-32">
      {/* stack strip, edge to edge */}
      <div className="marquee border-y border-hairline py-4" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((half) => (
            <div key={half} className="flex shrink-0 items-center">
              {stack.map((item) => (
                <Fragment key={`${half}-${item}`}>
                  <span className="whitespace-nowrap px-6 font-display text-[16px] font-bold uppercase tracking-[0.08em] text-ink-2">
                    {item}
                  </span>
                  <span className="text-red">/</span>
                </Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 pt-20 md:px-10 md:pt-24">
        <Reveal>
          <p className="label-mono text-ink-3">
            <span className="text-red">01</span> / Where I go deep
          </p>
          <h2 className="mt-4 max-w-[720px] font-display text-[clamp(32px,3.4vw,48px)] font-bold leading-[1.05] tracking-[-0.01em]">
            Expertise you can audit.
          </h2>
          <p className="mt-4 max-w-[560px] text-[15.5px] leading-[1.65] text-ink-2">
            Six areas, each with its receipt further down this page.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {areas.map((a, i) => (
            <Reveal key={a.kicker} delay={(i % 3) * 0.06}>
              <div className="card h-full rounded-[2px] border border-hairline bg-card p-7">
                <div className="label-mono text-[9px]" style={{ color: a.color }}>
                  {a.kicker}
                </div>
                <h3 className="mt-3 font-display text-[19px] font-bold leading-[1.2] tracking-[-0.01em]">
                  {a.title}
                </h3>
                <p className="mt-3 text-[13.5px] leading-[1.65] text-ink-2">{a.body}</p>
                <p className="meta-mono mt-5">{a.foot}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
