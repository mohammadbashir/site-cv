import type { ReactNode } from 'react';
import { useInViewReveal } from '../hooks/useInViewReveal';

function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInViewReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`sr ${inView ? 'is-in' : ''} ${className}`}
      style={{ '--d': `${delay}s` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}

type Row = {
  id: string;
  headline: string;
  body: ReactNode;
  foot: string;
  stat: string;
  statLabel: string;
  red?: boolean;
};

const rows: Row[] = [
  {
    id: 'proof-cscrm',
    headline: 'The platform 300+ banks file their support cases through.',
    body: (
      <>
        Built from scratch on Pega and in production ever since: projects, cases, solutions and
        user administration for the teams supporting Murex's global client base. Behind the
        go-live sat a full PeopleSoft migration I led, with referential integrity preserved across
        the entire data model.
      </>
    ),
    foot: 'Customer Service CRM · Pega · built from scratch · 2016 to present',
    stat: '2018',
    statLabel: 'Live in production since',
  },
  {
    id: 'proof-salescrm',
    headline: 'The sales platform I took over after an acquisition and made mine.',
    body: (
      <>
        Extended for companies, opportunities and the sales workflows of the organisation. I also
        own the platform lifecycle across both CRMs: Pega 8 through 25 upgrades with zero
        production downtime, backed by Playwright suites covering 100% of main business objects.
      </>
    ),
    foot: 'Sales CRM · Pega · acquired product, extended',
    stat: '8 → 25',
    statLabel: 'Pega upgrades, zero downtime',
  },
  {
    id: 'proof-estate',
    headline: 'Releases took 3 hours. Now they take 15 minutes.',
    body: (
      <>
        The landscape around the CRMs is mine too: Spring Cloud Gateway at the edge, admin and
        client-management services behind it, security across Azure AD, SAML 2.0 and OAuth 2.0,
        plus an async Python PDF engine (FastAPI, Celery over RabbitMQ) serving every tenant. The
        92 percent deploy-time cut came from pipeline parallelization, at 95% test coverage.
      </>
    ),
    foot: 'Microservices estate · Java Spring · Python FastAPI · Docker · AWS ECS',
    stat: '92%',
    statLabel: 'Deploy time cut',
  },
  {
    id: 'proof-team',
    headline: 'And I run the team that runs them.',
    body: (
      <>
        Scrum Master for a five-engineer team: planning, mentoring and delivery, while acting as
        the organisation's subject-matter expert for CRM development tooling. The platforms above
        are not just systems I drew; they are systems I am accountable for, every day.
      </>
    ),
    foot: 'Leadership · Scrum Master · SME for CRM development tools',
    stat: '5',
    statLabel: 'Engineers led as Scrum Master',
  },
];

export default function Proof() {
  return (
    <section id="proof" className="px-6 py-24 md:px-10 md:py-32">
      <Reveal>
        <p className="label-mono text-ink-3">
          <span className="text-red">02</span> / The Murex decade
        </p>
        <h2 className="mt-4 max-w-[720px] font-display text-[clamp(32px,3.4vw,48px)] font-bold leading-[1.05] tracking-[-0.01em]">
          What banks run on.
        </h2>
        <p className="mt-4 max-w-[560px] text-[15.5px] leading-[1.65] text-ink-2">
          Ten years at Murex, owning the client platforms end to end: architecture, delivery, and
          the team behind them.
        </p>
      </Reveal>

      <div className="mt-14 flex flex-col gap-4">
        {rows.map((row) => (
          <Reveal key={row.id} delay={0.05}>
            <article
              id={row.id}
              className="card grid gap-8 rounded-[2px] border border-hairline bg-card p-8 md:grid-cols-[1fr_220px] md:p-10 lg:gap-14"
            >
              <div>
                <h3 className="max-w-[640px] font-display text-[clamp(21px,2vw,27px)] font-bold leading-[1.15] tracking-[-0.01em]">
                  <span className="sweep">{row.headline}</span>
                </h3>
                <p className="mt-4 max-w-[640px] text-[15px] leading-[1.7] text-ink-2">{row.body}</p>
                <p className="meta-mono mt-6">{row.foot}</p>
              </div>
              <div className="flex flex-row items-end justify-between gap-2 border-t border-hairline pt-6 md:flex-col md:items-end md:justify-start md:border-t-0 md:border-l md:pl-8 md:pt-0 md:text-right">
                <div
                  className={`font-display text-[clamp(34px,3vw,44px)] font-bold leading-none tracking-[-0.01em] ${
                    row.red ? 'text-red' : ''
                  }`}
                >
                  {row.stat}
                </div>
                <div className="label-mono max-w-[180px] text-[9px] leading-[1.6] tracking-[0.12em] text-ink-3">
                  {row.statLabel}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
