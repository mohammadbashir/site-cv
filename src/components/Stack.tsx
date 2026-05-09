import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { stack } from '../data/stack';

export default function Stack() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="stack" className="py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-6">
            <span className="label-mono">Stack</span>
          </div>

          <hr className="rule-hair mb-2" />

          <dl className="divide-y divide-[color:var(--color-rule)]">
            {stack.map((group) => (
              <div
                key={group.label}
                className="grid grid-cols-1 lg:grid-cols-[minmax(0,180px)_minmax(0,1fr)] gap-y-2 gap-x-10 py-5 lg:items-baseline"
              >
                <dt
                  className="font-headline italic text-lg text-[color:var(--color-ink)]"
                  style={{ fontVariationSettings: "'opsz' 36, 'wght' 500" }}
                >
                  {group.label}
                </dt>
                <dd className="font-mono text-[0.85rem] leading-[1.85] text-[color:var(--color-ink-soft)]">
                  {group.items.join(', ')}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
