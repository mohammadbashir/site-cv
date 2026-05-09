import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight, Download } from 'lucide-react';
import cvPdf from '../assets/Mohamad_Bachir_Sidani_CV.pdf';
import { profile, links } from '../data/profile';

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const linkRows = [
    { label: 'Email', href: links.email, value: profile.emailDisplay, external: false },
    { label: 'Phone', href: links.phone, value: profile.phoneDisplay, external: false },
    { label: 'LinkedIn', href: links.linkedin, value: 'linkedin.com/in/mohamadbachir', external: true },
    { label: 'App Store', href: links.appStore, value: 'View shipped apps', external: true },
  ];

  return (
    <section id="contact" className="py-16 md:py-24 bg-[color:var(--color-paper-deep)]">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-6">
            <span className="label-mono">Contact</span>
          </div>

          <hr className="rule-hair mb-2" />

          <dl className="divide-y divide-[color:var(--color-rule)] max-w-2xl">
            {linkRows.map((row) => {
              const isPlaceholder = row.href.startsWith('#TODO') || row.href.includes('TODO');
              return (
                <div
                  key={row.label}
                  className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-x-6 py-3.5 items-baseline"
                >
                  <dt className="font-mono text-[0.72rem] tracking-[0.2em] uppercase text-[color:var(--color-ink-mute)]">
                    {row.label}
                  </dt>
                  <dd>
                    {isPlaceholder ? (
                      <span className="font-body italic text-[color:var(--color-ink-faint)] text-base">
                        {row.value} (link pending)
                      </span>
                    ) : (
                      <a
                        href={row.href}
                        target={row.external ? '_blank' : undefined}
                        rel={row.external ? 'noopener noreferrer' : undefined}
                        className="link-bare font-body text-base inline-flex items-center gap-1.5"
                      >
                        {row.value}
                        {row.external ? (
                          <ArrowUpRight size={13} className="text-[color:var(--color-ink-faint)]" />
                        ) : null}
                      </a>
                    )}
                  </dd>
                </div>
              );
            })}
          </dl>

          <div className="mt-10 max-w-2xl">
            <a
              href={cvPdf}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-resume group inline-flex items-center gap-2.5 px-6 py-3 bg-[color:var(--color-accent-red)] text-[color:var(--color-paper)] hover:bg-[color:var(--color-accent-red-hover)] font-body text-base font-medium"
            >
              <Download
                size={15}
                strokeWidth={1.8}
                className="transition-transform duration-300 ease-out group-hover:translate-y-[2px]"
              />
              <span>Download résumé</span>
            </a>
          </div>

          <div className="mt-10 max-w-2xl">
            <p
              className="font-headline italic text-xl md:text-[1.4rem] text-[color:var(--color-accent-red)] leading-snug mb-3"
              style={{ fontVariationSettings: "'opsz' 36, 'wght' 400" }}
            >
              {profile.availability}
            </p>
            <p className="font-mono text-[0.72rem] tracking-[0.18em] uppercase text-[color:var(--color-ink-mute)]">
              {profile.geographySignal}
            </p>
            <p className="font-mono text-[0.72rem] tracking-[0.18em] uppercase text-[color:var(--color-ink-faint)] mt-1">
              {profile.languages}
            </p>
          </div>

          <p className="font-mono text-[0.65rem] tracking-[0.22em] uppercase text-[color:var(--color-ink-faint)] mt-20">
            © 2026 {profile.name}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
