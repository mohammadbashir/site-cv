import { useEffect, useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { mapNodes, mapEdges, mapAnnotations, caseStudies, caseById, type MapNode } from '../data/map';
import { useInViewReveal } from '../hooks/useInViewReveal';

/** Corner focus brackets drawn just outside a node's box. */
function cornerPath(w: number, h: number) {
  const o = 4;
  const c = 10;
  return [
    `M ${-o} ${c - o} L ${-o} ${-o} L ${c - o} ${-o}`,
    `M ${w - c + o} ${-o} L ${w + o} ${-o} L ${w + o} ${c - o}`,
    `M ${w + o} ${h - c + o} L ${w + o} ${h + o} L ${w - c + o} ${h + o}`,
    `M ${c - o} ${h + o} L ${-o} ${h + o} L ${-o} ${h - c + o}`,
  ].join(' ');
}

function NodeBox({ node, index, selected, onSelect }: {
  node: MapNode;
  index: number;
  selected: boolean;
  onSelect: (caseId: string) => void;
}) {
  const { x, y, w, h } = node;
  const cx = w / 2;
  const big = !!node.big;
  const labelY = node.sub ? (big ? h / 2 - 6 : h / 2 - 3) : h / 2 + 4;
  const subY = big ? h / 2 + 16 : h / 2 + 15;
  const cls = [
    'm-node',
    big ? 'big' : '',
    node.dashed ? 'dashed' : '',
    node.accent ? 'accent' : '',
    selected ? 'selected' : '',
  ].filter(Boolean).join(' ');

  return (
    <g
      className={cls}
      transform={`translate(${x}, ${y})`}
      onClick={(e) => { e.stopPropagation(); onSelect(node.caseId); }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(node.caseId); } }}
      aria-label={`${node.label}: open case study`}
    >
      {/* CSS transforms would override the positioning transform above,
          so the cascade animation lives on an inner group. */}
      <g className="n-anim" style={{ '--i': index } as React.CSSProperties}>
        <rect className="n-box" width={w} height={h} rx={2} />
        <path className="n-corners" d={cornerPath(w, h)} aria-hidden="true" />
        {node.tag ? <text className="n-tag" x={10} y={15}>{node.tag}</text> : null}
        <text className="n-label" x={cx} y={labelY} textAnchor="middle" dominantBaseline="middle">{node.label}</text>
        {node.sub ? (
          <text className="n-sub" x={cx} y={subY} textAnchor="middle" dominantBaseline="middle">{node.sub}</text>
        ) : null}
      </g>
    </g>
  );
}

const ZONE_OF_CASE: Record<string, 'murex' | 'indie'> = {
  cscrm: 'murex', salescrm: 'murex', mcp: 'murex', gateway: 'murex', pdftk: 'murex',
  alamenu: 'indie', ios: 'indie',
};

/** Main node (drawn box) representing a case in the mobile rail. */
const railNodeFor = (caseId: string) =>
  mapNodes.find((n) => n.caseId === caseId && (n.big || n.id === caseId)) ?? mapNodes.find((n) => n.caseId === caseId)!;

export default function SystemMap() {
  const [selected, setSelected] = useState<string | null>(null);
  const { ref: sheetRef, inView } = useInViewReveal<HTMLDivElement>('-12% 0px');
  const { ref: headRef, inView: headIn } = useInViewReveal<HTMLDivElement>();

  const close = () => setSelected(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // The assistant's citation chips focus nodes on the drawing.
  useEffect(() => {
    const onFocusNode = (e: Event) => {
      const caseId = (e as CustomEvent<{ caseId: string }>).detail?.caseId;
      if (!caseId || !caseById(caseId)) return;
      setSelected(caseId);
      const isMobile = window.matchMedia('(max-width: 1023px)').matches;
      if (isMobile) {
        setTimeout(() => {
          document.getElementById(`rail-${caseId}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 60);
      } else {
        document.getElementById('map')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    window.addEventListener('cv:focus-node', onFocusNode);
    return () => window.removeEventListener('cv:focus-node', onFocusNode);
  }, []);

  const activeCase = selected ? caseById(selected) : null;

  return (
    <section id="map" className="map-section">
      <div className="map-shell">
        <div ref={headRef} className={`reveal ${headIn ? 'in' : ''} map-header`}>
          <span className="mono-label-accent">Sheet 01 / System Overview</span>
          <h2>Every box on this sheet is something <span className="it">I own</span>.</h2>
          <p>
            One architect, two worlds: the enterprise estate I run at Murex, and the
            products I ship alone. Select any node to read the drawing.
          </p>
        </div>

        <div className="sheet">
          <div className="sheet-head">
            <span>System overview / production estate</span>
            <span>STATUS: <span className="accent">ALL LIVE</span></span>
          </div>

          <div ref={sheetRef} className={`sheet-inner${inView ? ' map-live' : ''}${activeCase ? ' has-focus' : ''}`}>
            {/* ── Desktop drawing ── */}
            <div className="map-svg-wrap">
              <svg
                className="map-svg"
                viewBox="0 0 1200 720"
                onClick={close}
                aria-label="System map of platforms and products"
              >
                <defs>
                  <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--ink-2)" opacity="0.6" />
                  </marker>
                  <marker id="arrA" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)" />
                  </marker>
                </defs>

                <g className="map-fade">
                  <text className="zone-label" x="60" y="56">MUREX LEBANON / ENTERPRISE ESTATE</text>
                  <text className="zone-label" x="850" y="56">INDEPENDENT PRACTICE</text>
                  <line className="map-divider" x1="790" y1="44" x2="790" y2="668" />
                  {mapAnnotations.map((a) => (
                    <text key={a.text} className="map-anno" x={a.x} y={a.y} textAnchor={a.anchor ?? 'start'}>{a.text}</text>
                  ))}
                </g>

                {mapEdges.map((e, i) => (
                  <g key={e.id}>
                    <path
                      className={`edge-path${e.dashed ? ' dashed' : ''}${e.accent ? ' accent' : ''}`}
                      d={e.d}
                      pathLength={1}
                      markerEnd={e.accent ? 'url(#arrA)' : 'url(#arr)'}
                      style={{ '--i': i } as React.CSSProperties}
                    />
                    {e.label ? (
                      <text
                        className={`edge-label${e.accent ? ' accent' : ''} map-fade`}
                        x={e.labelX}
                        y={e.labelY}
                        style={{ paintOrder: 'stroke', stroke: 'var(--paper)', strokeWidth: 3 }}
                      >
                        {e.label}
                      </text>
                    ) : null}
                  </g>
                ))}

                {mapNodes.map((n, i) => (
                  <NodeBox
                    key={n.id}
                    node={n}
                    index={i}
                    selected={!!selected && n.caseId === selected}
                    onSelect={setSelected}
                  />
                ))}
              </svg>

              {/* Case study panel over the sheet */}
              <aside className={`case-panel${activeCase ? ' open' : ''}`} aria-hidden={!activeCase}>
                {activeCase ? (
                  <>
                    <div className="case-head">
                      <span>Case study / Sheet 01</span>
                      <button type="button" className="case-close" onClick={close} aria-label="Close case study">
                        <X size={13} strokeWidth={2} />
                      </button>
                    </div>
                    <div className="case-body">
                      <h3 className="case-title">{activeCase.title}</h3>
                      <div className="case-meta">{activeCase.meta}</div>
                      <p className="case-prose">{activeCase.body}</p>
                      <ul className="case-facts">
                        {activeCase.facts.map((f) => <li key={f}>{f}</li>)}
                      </ul>
                      {activeCase.href ? (
                        <a className="case-link" href={activeCase.href} target="_blank" rel="noopener noreferrer">
                          {activeCase.hrefLabel ?? 'View'}
                          <ArrowUpRight size={12} />
                        </a>
                      ) : null}
                    </div>
                  </>
                ) : null}
              </aside>
            </div>

            {/* ── Mobile rail ── */}
            <div className="rail">
              {(['murex', 'indie'] as const).map((zone) => (
                <div key={zone}>
                  <div className="rail-zone">
                    <div className="rail-zone-label">
                      {zone === 'murex' ? 'Murex Lebanon / Enterprise estate' : 'Independent practice'}
                    </div>
                  </div>
                  {caseStudies.filter((c) => ZONE_OF_CASE[c.id] === zone).map((c) => {
                    const node = railNodeFor(c.id);
                    const open = selected === c.id;
                    return (
                      <div key={c.id} id={`rail-${c.id}`} className={`rail-item${open ? ' open' : ''}`}>
                        <button
                          type="button"
                          className="rail-btn"
                          onClick={() => setSelected(open ? null : c.id)}
                          aria-expanded={open}
                        >
                          <span className="rb-label">{node.label}</span>
                          {node.tag ? <span className="rb-tag">{node.tag}</span> : null}
                          {node.sub ? <span className="rb-sub">{node.sub}</span> : null}
                        </button>
                        <div className="rail-body">
                          <div className="rail-body-inner">
                            <p className="case-prose">{c.body}</p>
                            <ul className="case-facts">
                              {c.facts.map((f) => <li key={f}>{f}</li>)}
                            </ul>
                            {c.href ? (
                              <a className="case-link" href={c.href} target="_blank" rel="noopener noreferrer">
                                {c.hrefLabel ?? 'View'}
                                <ArrowUpRight size={12} />
                              </a>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="title-block" aria-hidden="true">
              <div className="tb-row"><span className="tb-k">Sheet</span><span className="tb-v">01 / System overview</span></div>
              <div className="tb-row"><span className="tb-k">Drawn by</span><span className="tb-v">M. B. Sidani</span></div>
              <div className="tb-row"><span className="tb-k">Scale</span><span className="tb-v">Production</span></div>
              <div className="tb-row"><span className="tb-k">Status</span><span className="tb-v" style={{ color: 'var(--accent)' }}>Live · 2016 → 2026</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
