import portrait from '../assets/portrait.jpg';
import { useInViewReveal } from '../hooks/useInViewReveal';

const POINTS = [
  'Scrum Master for a five-engineer team, running on SAFe and Liberating Structures.',
  'Recognized by Murex leadership for cultural transformation and sustained velocity gains.',
  'Mentored five junior engineers and interns; six years of active code review.',
  'Regular technical interviewer; author of architecture decision records and design docs.',
];

export default function LeadershipBand() {
  const { ref, inView } = useInViewReveal<HTMLDivElement>();

  return (
    <section id="leadership" className="act lead-band">
      <div className="act-shell">
        <div ref={ref} className={`reveal ${inView ? 'in' : ''} lead-grid`}>
          <figure className="lead-photo">
            <div className="ph">
              <img src={portrait} alt="Mohamad Bachir Sidani" loading="lazy" />
            </div>
            <figcaption>
              <span>Beirut · Off duty</span>
              <span>5-engineer team</span>
            </figcaption>
          </figure>

          <div>
            <div className="act-kicker">The person behind the drawings</div>
            <h2 className="act-title">Systems need <span className="it">people</span>.</h2>
            <p className="act-lede">
              I run the team as well as the architecture. The platforms above are built
              and maintained by five engineers I lead as Scrum Master, mentor, and
              reviewer, in Arabic and English, both native.
            </p>
            <ul className="lead-points">
              {POINTS.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
