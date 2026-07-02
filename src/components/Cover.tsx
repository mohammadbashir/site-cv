import profileImage from '../assets/profile.jpg';
import AskCv from './AskCv';
import { useMouseParallax } from '../hooks/useMouseParallax';
import { profile } from '../data/profile';

export default function Cover() {
  useMouseParallax();

  return (
    <section className="cover">
      <div className="cover-portrait">
        <img src={profileImage} alt={profile.name} />
        <div className="portrait-cap">
          <span>FOLIO · 2026</span>
          <span>Beirut</span>
        </div>
      </div>

      <div className="cover-stage">
        <div className="cover-eyebrow">
          <span className="bar" aria-hidden="true" />
          <span>Principal Engineer · Pega Architect</span>
        </div>

        <h1 className="cover-name">
          <span className="line line1"><span className="inner">Mohamad</span></span>
          <span className="line line2"><span className="inner it">Bachir</span></span>
          <span className="line line3"><span className="inner">Sidani<span className="stop">.</span></span></span>
        </h1>

        <div className="ask-section w-full max-w-[920px]">
          <p className="ask-invite">
            <span className="ask-live" aria-hidden="true" />
            Ask my CV anything. <em>It answers in my words.</em>
          </p>
          <AskCv />
        </div>

        <div className="cover-foot">
          <div className="cover-role">
            Architect of two enterprise platforms<br />
            300+ banks · 60,000+ daily users<br />
            Led a 5-engineer Scrum team
          </div>
          <div className="cover-place">
            Beirut · remote-first<br />
            Open to leadership & principal roles<br />
            Arabic · English
          </div>
        </div>
      </div>
    </section>
  );
}
