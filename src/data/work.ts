export type WorkEntry = {
  numeral: string;
  title: string;
  context: string;
  period: string;
  description: string;
  pullQuote?: string;
  factbox?: string[];
  href?: string;
  hrefLabel?: string;
  isLead?: boolean;
};

export const selectedWork: WorkEntry[] = [
  {
    numeral: 'I',
    title: 'Murex CRM Platforms',
    context: 'Murex Lebanon',
    period: '2016 to present',
    description:
      "Architect for Murex's two internal CRM platforms, the tools customer-service and sales teams use to support a global client base of 300-plus banks and financial institutions in 65 countries. The Customer Service CRM was built from scratch on Pega over a two-year cycle and runs in production today, covering Projects, Cases, Solutions, and User Administration. The Sales CRM, originally a Pega-based product Murex acquired, was extended for the sales and business-development side of the organisation: companies, opportunities, and internal sales workflows. Internal subject-matter expert for CRM development tools, with version upgrades from Pega 8 through 25 and dedicated Playwright suites achieving 100% coverage of main business objects on both platforms. Also designed and shipped Murex's first production AI integration on top of the Sales CRM: a sanctioned MCP server bringing AI-driven opportunity summarization and similar-deal comparison into sales workflows.",
    pullQuote:
      'Two enterprise CRM platforms: one built from scratch on Pega, one extended on top of it.',
    factbox: [
      'Two CRM platforms',
      '300+ client banks',
      '60,000+ daily users',
      'Pega 7 through 25',
      '100% Playwright coverage',
      'Internal SME',
    ],
    isLead: true,
  },
  {
    numeral: 'II',
    title: 'Murex Microservices Platform',
    context: 'Murex Lebanon',
    period: '2020 to present',
    description:
      "Architect for Murex's microservices landscape: Spring Cloud Gateway as the API edge, an Admin Service, and a Client Management Service powering the CRM platforms. Built a Python FastAPI toolkit with Celery workers, RabbitMQ queuing, and multi-tenant template management for async PDF generation across enterprise applications. Java Spring Boot, Python, Docker, deployed in production.",
  },
  {
    numeral: 'III',
    title: 'À La Menu',
    context: 'Independent SaaS, in active development',
    period: 'Currently building',
    description:
      'À La Menu is a SaaS for restaurants that I am building in parallel to full-time work at Murex. Guests scan a QR code to view a multilingual menu and place zero-commission orders that arrive in real time on a restaurant dashboard. AI translation across twenty-plus languages, multi-tenant architecture, freemium pricing with paid Growth and Pro tiers.',
    href: 'https://ala.menu/',
    hrefLabel: 'Visit ala.menu',
  },
];
