import { ArrowUpRight } from 'lucide-react';
import { selectedWork, type WorkEntry } from '../data/work';
import { useInViewReveal } from '../hooks/useInViewReveal';

export default function SelectedWork() {
  const { ref: headerRef, inView: headerIn } = useInViewReveal<HTMLDivElement>();

  const lead = selectedWork.find((e) => e.isLead) ?? selectedWork[0];
  const rest = selectedWork.filter((e) => e !== lead);

  return (
    <section id="work" className="py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <div ref={headerRef} className={`reveal ${headerIn ? 'in' : ''} text-center mb-12 md:mb-16`}>
          <span className="section-label-accent block mb-3">The Work</span>
          <h2
            className="font-serif text-3xl md:text-4xl text-[color:var(--ink)]"
            style={{ fontWeight: 400, fontVariationSettings: "'opsz' 60" }}
          >
            <span className="italic" style={{ color: 'var(--accent)' }}>Selected</span> projects, in order of weight.
          </h2>
        </div>

        <LeadFeature entry={lead} />

        <hr className="rule-hair my-12 md:my-16" />

        <ol className="space-y-12 md:space-y-16">
          {rest.map((entry) => (
            <Department key={entry.title} entry={entry} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function LeadFeature({ entry }: { entry: WorkEntry }) {
  const { ref, inView } = useInViewReveal<HTMLElement>();
  return (
    <article
      ref={ref}
      className={`reveal ${inView ? 'in' : ''} grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,220px)] gap-x-12 gap-y-8 lg:items-start`}
    >
      <div>
        <div className="flex items-baseline gap-5 mb-4">
          <span className="numeral-feature text-[5rem] md:text-[6.5rem]">{entry.numeral}.</span>
          <span className="section-label-accent">A Lead Engagement</span>
        </div>
        <h3
          className="font-serif text-3xl md:text-[2.6rem] lg:text-[3rem] leading-[1.05] text-[color:var(--ink)] mb-6"
          style={{ fontWeight: 500, fontVariationSettings: "'opsz' 72" }}
        >
          {entry.title}
        </h3>
        <div className="font-mono text-[0.72rem] tracking-[0.2em] uppercase text-[color:var(--ink-3)] mb-8 flex flex-wrap items-center gap-x-3">
          <span>{entry.context}</span>
          <span className="text-[color:var(--rule)]">/</span>
          <span>{entry.period}</span>
        </div>
        {entry.pullQuote ? (
          <blockquote
            className="font-serif italic text-2xl md:text-[1.85rem] mb-8 max-w-[40ch] border-l-2 pl-6 leading-[1.35]"
            style={{ borderColor: 'var(--accent)', color: 'var(--ink)', fontWeight: 400 }}
          >
            &ldquo;{entry.pullQuote}&rdquo;
          </blockquote>
        ) : null}
        <p className="font-serif text-lg leading-[1.7] text-[color:var(--ink-2)] max-w-[60ch]">
          {entry.description}
        </p>
      </div>
      {entry.factbox ? (
        <aside className="lg:pt-4 lg:pl-6 lg:border-l lg:border-[color:var(--rule)]">
          <span className="section-label block mb-4">Factbox</span>
          <ul className="font-mono text-xs leading-[1.9] text-[color:var(--ink-2)] space-y-1">
            {entry.factbox.map((line) => (
              <li key={line} className="break-words">
                {line}
              </li>
            ))}
          </ul>
        </aside>
      ) : null}
    </article>
  );
}

function Department({ entry }: { entry: WorkEntry }) {
  const { ref, inView } = useInViewReveal<HTMLLIElement>();
  const isPlaceholder = entry.href?.startsWith('#TODO');
  return (
    <li
      ref={ref}
      className={`reveal ${inView ? 'in' : ''} grid grid-cols-[3rem_minmax(0,1fr)] md:grid-cols-[4.5rem_minmax(0,1fr)] gap-x-5 md:gap-x-8`}
    >
      <span className="numeral-dept text-2xl md:text-[2.3rem] pt-1.5">{entry.numeral}.</span>
      <div>
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 mb-2">
          <h3
            className="font-serif text-2xl md:text-[1.7rem] text-[color:var(--ink)] leading-[1.15]"
            style={{ fontWeight: 500, fontVariationSettings: "'opsz' 48" }}
          >
            {entry.title}
          </h3>
          <span className="font-mono text-[0.7rem] tracking-[0.18em] uppercase text-[color:var(--ink-3)] whitespace-nowrap">
            {entry.period}
          </span>
        </div>
        <div className="section-label mb-4">{entry.context}</div>
        <p className="font-serif text-base md:text-lg leading-[1.7] text-[color:var(--ink-2)] max-w-[62ch]">
          {entry.description}
        </p>
        {entry.href && !isPlaceholder ? (
          <a
            href={entry.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 font-mono text-[0.72rem] tracking-[0.18em] uppercase"
            style={{ color: 'var(--accent)' }}
          >
            {entry.hrefLabel ?? 'View'}
            <ArrowUpRight size={12} />
          </a>
        ) : null}
      </div>
    </li>
  );
}
