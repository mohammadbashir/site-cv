import { stack } from '../data/stack';
import { useInViewReveal } from '../hooks/useInViewReveal';

export default function Stack() {
  const { ref, inView } = useInViewReveal<HTMLDivElement>();
  return (
    <section id="stack" className="py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <div ref={ref} className={`reveal ${inView ? 'in' : ''}`}>
          <div className="mb-6">
            <span className="section-label">Stack</span>
          </div>
          <hr className="rule-hair mb-2" />
          <dl className="divide-y divide-[color:var(--rule)]">
            {stack.map((group) => (
              <div
                key={group.label}
                className="grid grid-cols-1 lg:grid-cols-[minmax(0,180px)_minmax(0,1fr)] gap-y-2 gap-x-10 py-5 lg:items-baseline"
              >
                <dt
                  className="font-serif italic text-lg text-[color:var(--ink)]"
                  style={{ fontWeight: 500, fontVariationSettings: "'opsz' 36" }}
                >
                  {group.label}
                </dt>
                <dd className="font-mono text-[0.85rem] leading-[1.85] text-[color:var(--ink-2)]">
                  {group.items.join(', ')}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
