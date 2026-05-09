import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { selectedWork, type WorkEntry } from '../data/work';

export default function SelectedWork() {
  const lead = selectedWork.find((e) => e.isLead) ?? selectedWork[0];
  const rest = selectedWork.filter((e) => e !== lead);

  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });

  return (
    <section id="work" className="py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 12 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="label-mono block mb-3">The Work</span>
          <h2
            className="font-headline text-3xl md:text-4xl text-[color:var(--color-ink)]"
            style={{ fontVariationSettings: "'opsz' 60, 'wght' 500" }}
          >
            <span className="italic">Selected</span> projects, in order of weight.
          </h2>
        </motion.div>

        <LeadFeature entry={lead} />

        <hr className="rule-hair my-20 md:my-24" />

        <ol className="space-y-16 md:space-y-20">
          {rest.map((entry, idx) => (
            <Department key={entry.title} entry={entry} index={idx} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function LeadFeature({ entry }: { entry: WorkEntry }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,200px)] gap-x-12 gap-y-8 lg:items-start"
    >
      <div>
        <div className="flex items-baseline gap-5 mb-4">
          <span
            className="numeral-feature text-[5rem] md:text-[6.5rem]"
          >
            {entry.numeral}.
          </span>
          <span className="label-mono-red">A Lead Engagement</span>
        </div>

        <h3
          className="font-headline text-3xl md:text-[2.6rem] lg:text-[3rem] leading-[1.05] text-[color:var(--color-ink)] mb-6"
          style={{ fontVariationSettings: "'opsz' 72, 'wght' 600" }}
        >
          {entry.title}
        </h3>

        <div className="font-mono text-[0.72rem] tracking-[0.2em] uppercase text-[color:var(--color-ink-faint)] mb-8 flex flex-wrap items-center gap-x-3">
          <span>{entry.context}</span>
          <span className="text-[color:var(--color-rule)]">/</span>
          <span>{entry.period}</span>
        </div>

        {entry.pullQuote ? (
          <blockquote
            className="pull-quote text-2xl md:text-[1.85rem] mb-8 max-w-[40ch] border-l-2 border-[color:var(--color-accent-red)] pl-6"
          >
            &ldquo;{entry.pullQuote}&rdquo;
          </blockquote>
        ) : null}

        <p className="font-body text-lg leading-[1.7] text-[color:var(--color-ink-soft)] max-w-[60ch]">
          {entry.description}
        </p>
      </div>

      {entry.factbox ? (
        <aside className="lg:pt-4 lg:pl-6 lg:border-l lg:border-[color:var(--color-rule)]">
          <span className="label-mono block mb-4">Factbox</span>
          <ul className="font-mono text-xs leading-[1.9] text-[color:var(--color-ink-mute)] space-y-1">
            {entry.factbox.map((line) => (
              <li key={line} className="break-words">
                {line}
              </li>
            ))}
          </ul>
        </aside>
      ) : null}
    </motion.article>
  );
}

function Department({ entry, index }: { entry: WorkEntry; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const isPlaceholder = entry.href?.startsWith('#TODO');

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="grid grid-cols-[3rem_minmax(0,1fr)] md:grid-cols-[4.5rem_minmax(0,1fr)] gap-x-5 md:gap-x-8"
    >
      <span className="numeral-dept text-2xl md:text-[2.3rem] pt-1.5">{entry.numeral}.</span>

      <div>
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 mb-2">
          <h3
            className="font-headline text-2xl md:text-[1.7rem] text-[color:var(--color-ink)] leading-[1.15]"
            style={{ fontVariationSettings: "'opsz' 48, 'wght' 500" }}
          >
            {entry.title}
          </h3>
          <span className="font-mono text-[0.7rem] tracking-[0.18em] uppercase text-[color:var(--color-ink-faint)] whitespace-nowrap">
            {entry.period}
          </span>
        </div>

        <div className="font-mono text-[0.68rem] tracking-[0.2em] uppercase text-[color:var(--color-ink-mute)] mb-4">
          {entry.context}
        </div>

        <p className="font-body text-base md:text-lg leading-[1.7] text-[color:var(--color-ink-soft)] max-w-[62ch]">
          {entry.description}
        </p>

        {entry.href && !isPlaceholder ? (
          <a
            href={entry.href}
            target="_blank"
            rel="noopener noreferrer"
            className="link-red mt-4 inline-flex items-center gap-1.5 font-mono text-[0.72rem] tracking-[0.18em] uppercase"
          >
            {entry.hrefLabel ?? 'View'}
            <ArrowUpRight size={12} />
          </a>
        ) : null}
      </div>
    </motion.li>
  );
}
