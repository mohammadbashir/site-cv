import { ArrowUpRight } from 'lucide-react';
import { links } from '../data/profile';
import { useInViewReveal } from '../hooks/useInViewReveal';
import alamenuShot from '../assets/alamenu-shot.jpg';

export default function IndependentAct() {
  const { ref, inView } = useInViewReveal<HTMLDivElement>();

  return (
    <section id="independent" className="act" style={{ paddingTop: 0 }}>
      <div className="act-shell">
        <div ref={ref} className={`reveal ${inView ? 'in' : ''}`}>
          <div className="act-kicker">Act II / Independent practice, 2015 to present</div>
          <h2 className="act-title">Nights and weekends, <span className="it">shipped</span>.</h2>
          <p className="act-lede">
            Everything here is designed, built, and run by one person, in parallel with
            the day job: a live SaaS for restaurants, and a decade of iOS work on the
            App Store.
          </p>

          <div className="indie-grid">
            <div>
              <div className="pc-meta" style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 10 }}>
                À La Menu / Restaurant SaaS, in active development
              </div>
              <p className="act-lede" style={{ fontSize: 16, marginBottom: 18 }}>
                Guests scan a QR code to a multilingual menu and place zero-commission
                orders that land in real time on the restaurant&rsquo;s dashboard.
                AI translation across twenty-plus languages, multi-tenant, freemium
                with paid tiers.
              </p>
              <div className="shot-frame">
                <img src={alamenuShot} alt="À La Menu, the restaurant SaaS, live in production" loading="lazy" />
                <div className="shot-caption">
                  <span>ALA.MENU / LIVE PRODUCT</span>
                  <span className="accent">AI TRANSLATION · 20+ LANGUAGES</span>
                </div>
              </div>
              <a className="case-link" style={{ marginTop: 14, display: 'inline-flex' }} href={links.alaMenu} target="_blank" rel="noopener noreferrer">
                Visit ala.menu
                <ArrowUpRight size={12} />
              </a>
            </div>

            <div>
              <div className="pc-meta" style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 10 }}>
                The App Store shelf / 10+ apps since 2015
              </div>
              <div className="app-shelf">
                <a className="app-card" href={links.appStore} target="_blank" rel="noopener noreferrer">
                  <span className="app-icon" aria-hidden="true">Q</span>
                  <span>
                    <span className="app-name">Qibla Pro</span>
                    <span className="app-sub">Prayer direction · iOS</span>
                  </span>
                  <span className="app-stars">4.8★ · 5,000+ reviews</span>
                </a>
                <div className="app-card">
                  <span className="app-icon" aria-hidden="true">W</span>
                  <span>
                    <span className="app-name">WhatsDoc</span>
                    <span className="app-sub">HIPAA telehealth · Tech lead</span>
                  </span>
                  <span className="app-stars">DIAHCO Group</span>
                </div>
                <a className="app-card" href={links.appStore} target="_blank" rel="noopener noreferrer">
                  <span className="app-icon" aria-hidden="true">+</span>
                  <span>
                    <span className="app-name">Ten-plus shipped apps</span>
                    <span className="app-sub">Swift · SwiftUI · StoreKit 2 · Since 2015</span>
                  </span>
                  <span className="app-stars">App Store ↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
