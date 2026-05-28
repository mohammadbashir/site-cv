import { experience } from '../data/experience';
import { useInViewReveal } from '../hooks/useInViewReveal';

export default function Experience() {
  const { ref, inView } = useInViewReveal<HTMLDivElement>();
  return (
    <section id="experience" className="py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <div ref={ref} className={`reveal ${inView ? 'in' : ''}`}>
          <div className="mb-10">
            <span className="section-label">Experience</span>
          </div>
          <hr className="rule-hair mb-12" />
          <div className="space-y-12">
            {experience.map((entry) => (
              <ExperienceBlock key={entry.company} entry={entry} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceBlock({ entry }: { entry: (typeof experience)[number] }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,180px)_minmax(0,1fr)] gap-x-10 gap-y-3">
      <div className="font-mono text-xs tracking-[0.18em] uppercase text-[color:var(--ink-3)] tabular-nums lg:pt-2">
        {entry.span}
      </div>
      <div>
        <h3
          className="font-serif text-xl md:text-[1.6rem] text-[color:var(--ink)] mb-1"
          style={{ fontWeight: 500, fontVariationSettings: "'opsz' 36" }}
        >
          {entry.company}
        </h3>
        <p className="font-mono text-[0.72rem] tracking-[0.16em] uppercase text-[color:var(--ink-3)] mb-4">
          {entry.location}
        </p>
        <ul className="space-y-1.5 pl-0 border-l border-[color:var(--rule)]">
          {entry.roles.map((role) => (
            <li
              key={role.title + role.period}
              className="pl-5 flex flex-wrap items-baseline justify-between gap-x-4"
            >
              <span className="font-serif text-[1.05rem] text-[color:var(--ink-2)] italic">
                {role.title}
              </span>
              {role.period ? (
                <span className="font-mono text-[0.7rem] tracking-[0.16em] uppercase text-[color:var(--ink-3)] whitespace-nowrap">
                  {role.period}
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
