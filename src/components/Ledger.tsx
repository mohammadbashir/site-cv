import { experience } from '../data/experience';
import { certifications, education } from '../data/certifications';
import { stack } from '../data/stack';
import { useInViewReveal } from '../hooks/useInViewReveal';

export default function Ledger() {
  const { ref, inView } = useInViewReveal<HTMLDivElement>();

  return (
    <section id="ledger" className="act">
      <div className="act-shell">
        <div ref={ref} className={`reveal ${inView ? 'in' : ''}`}>
          <div className="act-kicker">The ledger</div>
          <h2 className="act-title">A decade, <span className="it">on the record</span>.</h2>

          <div className="ledger-table" style={{ marginTop: 'clamp(24px, 4vh, 40px)' }}>
            <div className="ledger-row">
              <div className="ledger-k">Experience</div>
              <div className="ledger-v">
                {experience.map((entry, i) => (
                  <div key={entry.company} style={{ marginTop: i === 0 ? 0 : 18 }}>
                    <div className="lv-title">{entry.company}</div>
                    <div className="lv-mono" style={{ margin: '2px 0 6px' }}>
                      {entry.location} · {entry.span}
                    </div>
                    {entry.roles.map((role) => (
                      <div key={role.title} className="ledger-role">
                        <span className="r-t">{role.title}</span>
                        {role.period ? <span className="r-p">{role.period}</span> : null}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="ledger-row">
              <div className="ledger-k">Credentials</div>
              <div className="ledger-v">
                {certifications.map((c) => (
                  <div key={c.name} className="ledger-role">
                    <span className="r-t" style={{ fontStyle: 'normal' }}>{c.name}</span>
                    {c.detail ? <span className="r-p">{c.detail}</span> : null}
                  </div>
                ))}
              </div>
            </div>

            <div className="ledger-row">
              <div className="ledger-k">Education</div>
              <div className="ledger-v">
                <div className="lv-line">
                  {education.degree}, {education.institution}
                  <span className="lv-mono" style={{ marginLeft: 10 }}>{education.year}</span>
                </div>
              </div>
            </div>

            <div className="ledger-row">
              <div className="ledger-k">Stack</div>
              <div className="ledger-v">
                {stack.map((group) => (
                  <div key={group.label} className="stack-line">
                    <span className="s-k">{group.label}</span>
                    <span className="s-v">{group.items.join(', ')}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
