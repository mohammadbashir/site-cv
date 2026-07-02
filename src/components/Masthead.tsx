import { Download } from 'lucide-react';
import portrait from '../assets/portrait.jpg';
import { profile } from '../data/profile';

const openDock = () => window.dispatchEvent(new CustomEvent('cv:open-dock'));

const scrollToMap = () => {
  document.getElementById('map')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export default function Masthead() {
  return (
    <header className="masthead">
      <span className="crop-mark crop-tl" aria-hidden="true" />
      <span className="crop-mark crop-tr" aria-hidden="true" />
      <span className="crop-mark crop-bl" aria-hidden="true" />
      <span className="crop-mark crop-br" aria-hidden="true" />

      <div className="m-inner">
        <div className="m-top">
          <div>
            <div className="m-eyebrow">
              <span className="bar" aria-hidden="true" />
              <span>Principal Engineer · Systems Architect</span>
            </div>

            <h1 className="m-name">
              <span className="line line1"><span className="inner">Mohamad</span></span>
              <span className="line line2"><span className="inner it">Bachir</span></span>
              <span className="line line3"><span className="inner">Sidani<span className="stop">.</span></span></span>
            </h1>

            <p className="m-thesis">
              Ten years at Murex architecting the CRM platforms behind{' '}
              <em>300+ banks</em>, with <em>60,000 people</em> on them daily.
              Nights and weekends, I ship my own products.
            </p>

            <div className="m-ctas">
              <a href="/cv" target="_blank" rel="noopener noreferrer" className="pill-accent">
                <Download size={14} strokeWidth={1.9} />
                <span>Download CV</span>
              </a>
              <button type="button" className="pill-quiet" onClick={openDock}>
                <span className="ask-live" aria-hidden="true" />
                <span>ASK MY CV</span>
              </button>
            </div>
          </div>

          <figure className="m-portrait">
            <div className="ph">
              <img src={portrait} alt={profile.name} />
            </div>
            <figcaption>
              <span>M.B.S.</span>
              <span>Beirut · 33.9°N</span>
            </figcaption>
          </figure>
        </div>

        <div className="m-bottom">
          <button type="button" className="m-cue" onClick={scrollToMap}>
            <span>Sheet 01 / The systems I own</span>
            <span className="cue-arrow" aria-hidden="true">↓</span>
          </button>
          <div className="m-foot">
            Beirut · Remote-first<br />
            Open to principal, staff &amp; leadership roles<br />
            Arabic · English
          </div>
        </div>
      </div>
    </header>
  );
}
