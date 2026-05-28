import { education } from '../data/certifications';
import { useInViewReveal } from '../hooks/useInViewReveal';

export default function Education() {
  const { ref, inView } = useInViewReveal<HTMLDivElement>();
  return (
    <section id="education" className="py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <div
          ref={ref}
          className={`reveal ${inView ? 'in' : ''} grid grid-cols-1 lg:grid-cols-[minmax(0,180px)_minmax(0,1fr)] gap-y-2 gap-x-10 items-baseline`}
        >
          <span className="section-label">Education</span>
          <p className="font-serif text-lg text-[color:var(--ink-2)]">
            <span
              className="font-serif italic text-[color:var(--ink)]"
              style={{ fontWeight: 500, fontVariationSettings: "'opsz' 36" }}
            >
              {education.degree}
            </span>
            , {education.institution}
            <span className="font-mono text-sm tracking-[0.16em] uppercase text-[color:var(--ink-3)] ml-2">
              {education.year}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
