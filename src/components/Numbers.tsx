import { useInViewReveal } from '../hooks/useInViewReveal';

const STATS = [
  { value: '10y', label: 'At Murex Lebanon' },
  { value: '300+', label: 'Client banks served' },
  { value: '60k+', label: 'Daily internal users' },
  { value: '5,000+', label: 'iOS App Store reviews' },
];

export default function Numbers() {
  const { ref, inView } = useInViewReveal<HTMLDivElement>();
  return (
    <section className="py-16 md:py-20 border-t border-b border-[color:var(--rule)]">
      <div
        ref={ref}
        className={`reveal ${inView ? 'in' : ''} max-w-[1200px] mx-auto px-6 lg:px-10 grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8`}
      >
        {STATS.map((s) => (
          <div key={s.label} className="text-left">
            <div
              className="font-serif text-[color:var(--ink)]"
              style={{
                fontSize: 'clamp(40px, 6vw, 84px)',
                fontWeight: 300,
                lineHeight: 1,
                letterSpacing: '-0.03em',
              }}
            >
              {s.value}
            </div>
            <div className="section-label mt-3">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
