import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { education } from '../data/certifications';

export default function Education() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="education" className="py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 lg:grid-cols-[minmax(0,180px)_minmax(0,1fr)] gap-y-2 gap-x-10 items-baseline"
        >
          <span className="label-mono">Education</span>
          <p className="font-body text-lg text-[color:var(--color-ink-soft)]">
            <span
              className="font-headline italic text-[color:var(--color-ink)]"
              style={{ fontVariationSettings: "'opsz' 36, 'wght' 500" }}
            >
              {education.degree}
            </span>
            , {education.institution}
            <span className="font-mono text-sm tracking-[0.16em] uppercase text-[color:var(--color-ink-faint)] ml-2">
              {education.year}
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
