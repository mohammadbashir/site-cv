import { ArrowUpRight } from 'lucide-react';
import { certifications } from '../data/certifications';
import { useInViewReveal } from '../hooks/useInViewReveal';

export default function Certifications() {
  const { ref, inView } = useInViewReveal<HTMLDivElement>();
  return (
    <section id="certifications" className="py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <div ref={ref} className={`reveal ${inView ? 'in' : ''}`}>
          <div className="mb-6">
            <span className="section-label">Credentials</span>
          </div>
          <hr className="rule-hair mb-2" />
          <ol className="divide-y divide-[color:var(--rule)]">
            {certifications.map((cert, idx) => {
              const isPlaceholder = cert.href?.startsWith('#TODO');
              const showLink = cert.href && !isPlaceholder;
              const num = String(idx + 1).padStart(2, '0');
              return (
                <li
                  key={cert.name}
                  className="grid grid-cols-[3rem_minmax(0,1fr)_auto] lg:grid-cols-[180px_minmax(0,1fr)_auto] items-baseline gap-x-6 gap-y-1 py-4"
                >
                  <span
                    className="font-mono text-base lg:text-lg font-medium tracking-[0.18em]"
                    style={{ color: 'var(--accent)' }}
                  >
                    {num}
                  </span>
                  <div>
                    <span
                      className="font-serif text-lg text-[color:var(--ink)] mr-3"
                      style={{ fontWeight: 500, fontVariationSettings: "'opsz' 36" }}
                    >
                      {cert.name}
                    </span>
                    {cert.detail ? (
                      <span className="font-serif italic text-sm text-[color:var(--ink-3)]">
                        {cert.detail}
                      </span>
                    ) : null}
                  </div>
                  {showLink ? (
                    <a
                      href={cert.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[0.7rem] tracking-[0.2em] uppercase inline-flex items-center gap-1"
                      style={{ color: 'var(--accent)' }}
                    >
                      Verify
                      <ArrowUpRight size={11} />
                    </a>
                  ) : null}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
