import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { certifications } from '../data/certifications';

export default function Certifications() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="certifications" className="py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-6">
            <span className="label-mono">Credentials</span>
          </div>

          <hr className="rule-hair mb-2" />

          <ol className="divide-y divide-[color:var(--color-rule)]">
            {certifications.map((cert, idx) => {
              const isPlaceholder = cert.href?.startsWith('#TODO');
              const showLink = cert.href && !isPlaceholder;
              const num = String(idx + 1).padStart(2, '0');

              return (
                <li
                  key={cert.name}
                  className="grid grid-cols-[3rem_minmax(0,1fr)_auto] lg:grid-cols-[180px_minmax(0,1fr)_auto] items-baseline gap-x-6 gap-y-1 py-4"
                >
                  <span className="numeral-dept text-base lg:text-lg font-mono not-italic font-medium tracking-[0.18em] text-[color:var(--color-accent-red)]">
                    {num}
                  </span>
                  <div>
                    <span
                      className="font-headline text-lg text-[color:var(--color-ink)] mr-3"
                      style={{ fontVariationSettings: "'opsz' 36, 'wght' 500" }}
                    >
                      {cert.name}
                    </span>
                    {cert.detail ? (
                      <span className="font-body italic text-sm text-[color:var(--color-ink-mute)]">
                        {cert.detail}
                      </span>
                    ) : null}
                  </div>
                  {showLink ? (
                    <a
                      href={cert.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-red font-mono text-[0.7rem] tracking-[0.2em] uppercase inline-flex items-center gap-1"
                    >
                      Verify
                      <ArrowUpRight size={11} />
                    </a>
                  ) : null}
                </li>
              );
            })}
          </ol>
        </motion.div>
      </div>
    </section>
  );
}
