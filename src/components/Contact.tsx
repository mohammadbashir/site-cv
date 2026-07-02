import { ArrowUpRight, Download } from 'lucide-react';
import { profile, links } from '../data/profile';
import { useInViewReveal } from '../hooks/useInViewReveal';

export default function Contact() {
  const { ref, inView } = useInViewReveal<HTMLDivElement>();

  const rows = [
    { label: 'Email', href: links.email, value: profile.emailDisplay, external: false },
    { label: 'Phone', href: links.phone, value: profile.phoneDisplay, external: false },
    { label: 'LinkedIn', href: links.linkedin, value: 'linkedin.com/in/mohamadbachir', external: true },
    { label: 'App Store', href: links.appStore, value: 'View shipped apps', external: true },
  ];

  return (
    <section id="contact" className="act contact">
      <div className="act-shell">
        <div ref={ref} className={`reveal ${inView ? 'in' : ''}`}>
          <div className="act-kicker">Contact</div>
          <p className="contact-avail">Open to principal, staff, and engineering-leadership roles.</p>
          <p className="mono-label">Remote-first from Beirut · Open to relocation for the right role · Arabic &amp; English</p>

          <dl className="contact-rows">
            {rows.map((row) => (
              <div key={row.label} className="contact-row">
                <dt>{row.label}</dt>
                <dd>
                  <a
                    href={row.href}
                    target={row.external ? '_blank' : undefined}
                    rel={row.external ? 'noopener noreferrer' : undefined}
                    className="link-quiet"
                  >
                    {row.value}
                    {row.external ? <ArrowUpRight size={13} style={{ display: 'inline', marginLeft: 4, color: 'var(--ink-3)' }} /> : null}
                  </a>
                </dd>
              </div>
            ))}
          </dl>

          <div style={{ marginTop: 34 }}>
            <a href="/cv" target="_blank" rel="noopener noreferrer" className="pill-accent">
              <Download size={15} strokeWidth={1.8} />
              <span>Download the CV</span>
            </a>
          </div>

          <p className="colophon">
            Designed &amp; built by me / React · Vite · Tailwind · one Firebase function<br />
            © 2026 {profile.name}
          </p>
        </div>
      </div>
    </section>
  );
}
