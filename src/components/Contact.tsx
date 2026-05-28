import { ArrowUpRight, Download } from 'lucide-react';
import { profile, links } from '../data/profile';
import { useInViewReveal } from '../hooks/useInViewReveal';

export default function Contact() {
  const { ref, inView } = useInViewReveal<HTMLDivElement>();

  const linkRows = [
    { label: 'Email', href: links.email, value: profile.emailDisplay, external: false },
    { label: 'Phone', href: links.phone, value: profile.phoneDisplay, external: false },
    { label: 'LinkedIn', href: links.linkedin, value: 'linkedin.com/in/mohamadbachir', external: true },
    { label: 'App Store', href: links.appStore, value: 'View shipped apps', external: true },
  ];

  return (
    <section id="contact" className="py-16 md:py-24 bg-[color:var(--bg-2)]">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <div ref={ref} className={`reveal ${inView ? 'in' : ''}`}>
          <div className="mb-6">
            <span className="section-label">Contact</span>
          </div>
          <hr className="rule-hair mb-2" />
          <dl className="divide-y divide-[color:var(--rule)] max-w-2xl">
            {linkRows.map((row) => {
              const isPlaceholder = row.href.startsWith('#TODO') || row.href.includes('TODO');
              return (
                <div
                  key={row.label}
                  className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-x-6 py-3.5 items-baseline"
                >
                  <dt className="font-mono text-[0.72rem] tracking-[0.2em] uppercase text-[color:var(--ink-3)]">
                    {row.label}
                  </dt>
                  <dd>
                    {isPlaceholder ? (
                      <span className="font-serif italic text-[color:var(--ink-3)] text-base">
                        {row.value} (link pending)
                      </span>
                    ) : (
                      <a
                        href={row.href}
                        target={row.external ? '_blank' : undefined}
                        rel={row.external ? 'noopener noreferrer' : undefined}
                        className="link-bare font-serif text-base inline-flex items-center gap-1.5"
                      >
                        {row.value}
                        {row.external ? (
                          <ArrowUpRight size={13} className="text-[color:var(--ink-3)]" />
                        ) : null}
                      </a>
                    )}
                  </dd>
                </div>
              );
            })}
          </dl>

          <div className="mt-10 max-w-2xl">
            <a href="/cv" target="_blank" rel="noopener noreferrer" className="cta-resume">
              <Download size={15} strokeWidth={1.8} />
              <span>Download résumé</span>
            </a>
          </div>

          <div className="mt-10 max-w-2xl">
            <p
              className="font-serif italic text-xl md:text-[1.4rem] leading-snug mb-3"
              style={{ color: 'var(--accent)', fontWeight: 400, fontVariationSettings: "'opsz' 36" }}
            >
              {profile.availability}
            </p>
            <p className="font-mono text-[0.72rem] tracking-[0.18em] uppercase text-[color:var(--ink-3)]">
              {profile.geographySignal}
            </p>
            <p className="font-mono text-[0.72rem] tracking-[0.18em] uppercase text-[color:var(--ink-3)] mt-1">
              {profile.languages}
            </p>
          </div>

          <p className="font-mono text-[0.65rem] tracking-[0.22em] uppercase text-[color:var(--ink-3)] mt-20">
            © 2026 {profile.name}
          </p>
        </div>
      </div>
    </section>
  );
}
