import { useInViewReveal } from '../hooks/useInViewReveal';

const FIGURES = [
  { num: '300', accent: '+', label: 'Client banks supported' },
  { num: '60k', accent: '+', label: 'Daily internal users' },
  { num: '65', accent: '', label: 'Countries served' },
  { num: '100', accent: '%', label: 'Playwright coverage' },
];

export default function MurexAct() {
  const { ref, inView } = useInViewReveal<HTMLDivElement>();
  const { ref: vizRef, inView: vizIn } = useInViewReveal<HTMLDivElement>('-8% 0px');

  return (
    <section id="murex" className="act">
      <div className="act-shell">
        <div ref={ref} className={`reveal ${inView ? 'in' : ''}`}>
          <div className="act-kicker">Act I / Murex Lebanon, 2016 to present</div>
          <h2 className="act-title">The enterprise <span className="it">estate</span>.</h2>
          <p className="act-lede">
            Two CRM platforms carry Murex&rsquo;s client operations: I built one from scratch
            and extended the other after an acquisition, then kept both current from
            Pega&nbsp;8 through 25 without a minute of production downtime.
          </p>

          <div className="figures">
            {FIGURES.map((f) => (
              <div key={f.label} className="figure">
                <div className="f-num">{f.num}<span className="accent">{f.accent}</span></div>
                <div className="f-label">{f.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div ref={vizRef} className="panel-grid">
          <div className={`cicd${vizIn ? ' play' : ''}`}>
            <div className="pc-meta" style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 12 }}>
              CI/CD / Deploy time
            </div>
            <div className="cicd-row">
              <span className="cicd-k">Before</span>
              <div className="cicd-bar"><span className="fill before" /></div>
              <span className="cicd-v">3 hours</span>
            </div>
            <div className="cicd-row">
              <span className="cicd-k">After</span>
              <div className="cicd-bar"><span className="fill after" /></div>
              <span className="cicd-v">15 min</span>
            </div>
            <div className="cicd-note">92% cut via pipeline parallelization · 95% service test coverage held</div>
          </div>

          <div className={`upg${vizIn ? ' play' : ''}`}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent)' }}>
              Platform lifecycle / Pega version upgrades
            </div>
            <div className="upg-track"><span className="progress" /></div>
            <div className="upg-ticks">
              {['8', '', '', '', '', '25'].map((t, i) => (
                <span key={i} className={`upg-tick${t === '8' || t === '25' ? ' major' : ''}`}>{t || '·'}</span>
              ))}
            </div>
            <div className="upg-note">
              <span className="accent">Zero production downtime</span> · 100% Playwright coverage of main business objects
            </div>
          </div>

          <div className="panel-card" style={{ gridColumn: '1 / -1' }}>
            <div className="pc-meta">MCP Server · Shipped independently, ahead of central AI initiatives</div>
            <h4>The first production AI at Murex</h4>
            <p>
              I designed and shipped the company&rsquo;s first production AI integration:
              a sanctioned Model Context Protocol server connecting AI agents to live
              Pega Sales data for opportunity summarization and similar-deal comparison,
              inside the workflows salespeople already use. From idea to production, alone.
            </p>
            <div className="mcp-flow" aria-hidden="true">
              <span className="chip">AI AGENTS</span>
              <span className="arrow">→ tool calls →</span>
              <span className="chip accent">MCP SERVER</span>
              <span className="arrow">→ live data →</span>
              <span className="chip">SALES CRM</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
