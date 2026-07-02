/**
 * The system map: every node is something he owns or built, laid out as an
 * engineering drawing. Coordinates are in the SVG viewBox (1200 x 720).
 * Small nodes reference a parent case via caseId so every click lands
 * somewhere substantial.
 */

export type MapNode = {
  id: string;
  caseId: string;
  zone: 'murex' | 'indie';
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sub?: string;
  tag?: string;
  big?: boolean;
  dashed?: boolean;
  accent?: boolean;
};

export type MapEdge = {
  id: string;
  d: string;
  label?: string;
  labelX?: number;
  labelY?: number;
  dashed?: boolean;
  accent?: boolean;
};

export type MapAnnotation = {
  x: number;
  y: number;
  text: string;
  anchor?: 'start' | 'middle' | 'end';
};

export type CaseStudy = {
  id: string;
  title: string;
  meta: string;
  body: string;
  facts: string[];
  href?: string;
  hrefLabel?: string;
};

export const mapNodes: MapNode[] = [
  // ── Murex estate ─────────────────────────────────────────────
  { id: 'gateway', caseId: 'gateway', zone: 'murex', x: 250, y: 92, w: 220, h: 56, label: 'SPRING CLOUD GATEWAY', sub: 'API EDGE', tag: 'JAVA' },
  { id: 'admin', caseId: 'gateway', zone: 'murex', x: 60, y: 222, w: 180, h: 56, label: 'ADMIN SERVICE', sub: 'SPRING BOOT', tag: 'JAVA' },
  { id: 'clientmgmt', caseId: 'gateway', zone: 'murex', x: 280, y: 222, w: 200, h: 56, label: 'CLIENT MANAGEMENT', sub: 'SPRING BOOT', tag: 'JAVA' },
  { id: 'pdftk', caseId: 'pdftk', zone: 'murex', x: 520, y: 222, w: 210, h: 56, label: 'PDF TOOLKIT', sub: 'FASTAPI · CELERY · RABBITMQ', tag: 'PY' },
  { id: 'cscrm', caseId: 'cscrm', zone: 'murex', x: 60, y: 362, w: 270, h: 92, label: 'CUSTOMER SERVICE CRM', sub: 'BUILT FROM SCRATCH · LIVE SINCE 2018', tag: 'PEGA', big: true },
  { id: 'salescrm', caseId: 'salescrm', zone: 'murex', x: 400, y: 362, w: 260, h: 92, label: 'SALES CRM', sub: 'ACQUIRED PRODUCT · EXTENDED', tag: 'PEGA', big: true },
  { id: 'agents', caseId: 'mcp', zone: 'murex', x: 180, y: 532, w: 170, h: 48, label: 'AI AGENTS', dashed: true },
  { id: 'mcp', caseId: 'mcp', zone: 'murex', x: 480, y: 528, w: 200, h: 56, label: 'MCP SERVER', sub: 'FIRST PRODUCTION AI AT MUREX', tag: 'AI', accent: true },

  // ── Independent practice ─────────────────────────────────────
  { id: 'alamenu', caseId: 'alamenu', zone: 'indie', x: 850, y: 102, w: 290, h: 92, label: 'À LA MENU', sub: 'RESTAURANT SAAS · ALA.MENU', tag: 'SAAS', big: true },
  { id: 'aitrans', caseId: 'alamenu', zone: 'indie', x: 850, y: 254, w: 155, h: 52, label: 'AI TRANSLATION', sub: '20+ LANGUAGES' },
  { id: 'ordering', caseId: 'alamenu', zone: 'indie', x: 1025, y: 254, w: 115, h: 52, label: 'ORDERING', sub: '0% COMMISSION' },
  { id: 'ios', caseId: 'ios', zone: 'indie', x: 850, y: 402, w: 290, h: 80, label: 'iOS PRACTICE', sub: '10+ SHIPPED APPS · SINCE 2015', tag: 'SWIFT', big: true },
  { id: 'qibla', caseId: 'ios', zone: 'indie', x: 850, y: 534, w: 200, h: 50, label: 'QIBLA PRO', sub: '4.8★ · 5,000+ REVIEWS' },
];

export const mapEdges: MapEdge[] = [
  { id: 'g-admin', d: 'M 330 148 L 330 186 L 150 186 L 150 222' },
  { id: 'g-client', d: 'M 360 148 L 360 186 L 380 186 L 380 222' },
  { id: 'g-pdftk', d: 'M 390 148 L 390 168 L 625 168 L 625 222' },
  { id: 'client-cs', d: 'M 350 278 L 350 322 L 195 322 L 195 362' },
  { id: 'client-sales', d: 'M 410 278 L 410 322 L 530 322 L 530 362' },
  { id: 'agents-mcp', d: 'M 350 556 L 480 556', dashed: true, label: 'TOOL CALLS', labelX: 415, labelY: 547 },
  { id: 'mcp-sales', d: 'M 580 528 L 580 454', accent: true, label: 'LIVE PEGA SALES DATA', labelX: 596, labelY: 494 },
  { id: 'ala-trans', d: 'M 925 194 L 925 254' },
  { id: 'ala-order', d: 'M 1082 194 L 1082 254' },
  { id: 'ios-qibla', d: 'M 950 482 L 950 534' },
];

export const mapAnnotations: MapAnnotation[] = [
  { x: 60, y: 486, text: 'PEGA 8 → 25 · ZERO DOWNTIME · 100% PLAYWRIGHT COVERAGE' },
  { x: 60, y: 646, text: 'SERVING 300+ BANKS · 60,000+ DAILY USERS · 65 COUNTRIES' },
  { x: 850, y: 646, text: 'DESIGNED, BUILT & RUN BY ONE PERSON' },
];

export const caseStudies: CaseStudy[] = [
  {
    id: 'cscrm',
    title: 'Customer Service CRM',
    meta: 'PEGA · 2016 TO PRESENT · LIVE SINCE 2018',
    body:
      'Built from scratch on Pega over a two-year cycle, and in production ever since: Projects, Cases, Solutions, and User Administration for the teams supporting Murex’s global client base. Behind the go-live sat a full PeopleSoft-to-Pega migration I led: extraction, transformation, and loading of complex object hierarchies with referential integrity preserved across the entire data model.',
    facts: [
      '300+ client banks supported',
      '60,000+ daily internal users',
      'Full PeopleSoft migration, integrity preserved',
    ],
  },
  {
    id: 'salescrm',
    title: 'Sales CRM',
    meta: 'PEGA · ACQUIRED PRODUCT, EXTENDED',
    body:
      'Originally a Pega-based product Murex acquired. I extended it for the sales and business-development side of the organisation: companies, opportunities, and internal sales workflows. As internal subject-matter expert for CRM development tools I also own the platform lifecycle: Pega 8 through 25 upgrades across both CRMs with zero production downtime, backed by Playwright suites covering 100% of main business objects.',
    facts: [
      'Pega 8 → 25, zero production downtime',
      '100% Playwright coverage, both platforms',
      'Companies · opportunities · sales workflows',
    ],
  },
  {
    id: 'mcp',
    title: 'MCP Server: first production AI at Murex',
    meta: 'AI · FROM IDEA TO PRODUCTION, INDEPENDENTLY',
    body:
      'Murex’s first production AI integration, and I took it from idea to production on my own, ahead of the company’s centralised AI initiatives. A sanctioned Model Context Protocol server connects AI agents to live Pega Sales data for opportunity summarization and similar-deal comparison, inside the workflows salespeople already use.',
    facts: [
      'Sanctioned MCP server design',
      'Agents on live Pega Sales data',
      'Shipped ahead of central AI initiatives',
    ],
  },
  {
    id: 'gateway',
    title: 'The microservices estate',
    meta: 'JAVA SPRING · DOCKER · AWS ECS',
    body:
      'The landscape around the CRMs is mine too: Spring Cloud Gateway as the API edge, an Admin Service, and a Client Management Service powering both platforms, with security models across Azure AD, SAML 2.0, and OAuth 2.0. I cut CI/CD deploy time 92 percent, from 3 hours to 15 minutes, through pipeline parallelization, while holding 95% test coverage on the services.',
    facts: [
      '92% deploy-time cut: 3h → 15m',
      '95% microservices test coverage',
      'Azure AD · SAML 2.0 · OAuth 2.0',
    ],
  },
  {
    id: 'pdftk',
    title: 'Async PDF toolkit',
    meta: 'PYTHON FASTAPI · CELERY · RABBITMQ',
    body:
      'A Python FastAPI toolkit for asynchronous, multi-tenant PDF generation used across enterprise applications: Celery workers over RabbitMQ queues, template management per tenant, deployed as Docker containers on AWS ECS with Kubernetes-based test environments.',
    facts: [
      'Multi-tenant template engine',
      'Async Celery workers over RabbitMQ',
      'Docker on AWS ECS',
    ],
  },
  {
    id: 'alamenu',
    title: 'À La Menu',
    meta: 'INDEPENDENT SAAS · IN ACTIVE DEVELOPMENT',
    body:
      'A SaaS for restaurants that I design, build, and run alone, in parallel with full-time work. Guests scan a QR code to a multilingual menu and place zero-commission orders that land in real time on the restaurant’s dashboard. AI translation across twenty-plus languages, multi-tenant architecture, freemium pricing with paid tiers.',
    facts: [
      'AI translation, 20+ languages',
      'Zero-commission real-time ordering',
      'Multi-tenant · freemium + paid tiers',
    ],
    href: 'https://ala.menu/',
    hrefLabel: 'Visit ala.menu',
  },
  {
    id: 'ios',
    title: 'The iOS practice',
    meta: 'SWIFT · SINCE 2015, PARALLEL TO FULL-TIME WORK',
    body:
      'Ten-plus App Store apps shipped independently since 2015. The headline product is Qibla Pro, a prayer-direction app holding 4.8 stars across 5,000+ reviews. Earlier engagements include WhatsDoc, a HIPAA-compliant telehealth platform for DIAHCO Group, where I was the technical lead.',
    facts: [
      '10+ shipped App Store apps',
      'Qibla Pro: 4.8★ · 5,000+ reviews',
      'WhatsDoc telehealth: tech lead',
    ],
    href: 'https://apps.apple.com/developer/mohamad-bachir-sidani',
    hrefLabel: 'View on the App Store',
  },
];

export const caseById = (id: string) => caseStudies.find((c) => c.id === id);
