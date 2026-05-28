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
          <span>Senior Software Engineer · Pega Architect</span>
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
            10 years at Murex<br />
            Two Pega CRM platforms<br />
            300+ banks · 60,000+ daily users
          </div>
          <div className="cover-place">
            Beirut<br />
            Open to remote or relocation<br />
            Arabic · English
          </div>
        </div>
      </div>
    </section>
  );
}
