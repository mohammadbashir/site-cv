export type StackGroup = {
  label: string;
  items: string[];
};

export const stack: StackGroup[] = [
  {
    label: 'Pega platform',
    items: [
      'Pega CRM versions 7 through 25',
      'Case management',
      'Decisioning',
      'ABAC & RBAC security',
      'Pega Mobile',
      'Activities, data transforms, flows',
      'Tracer & PAL',
    ],
  },
  {
    label: 'AI & agents',
    items: [
      'Model Context Protocol (MCP server design)',
      'Agentic development with n8n orchestration',
      'Hosted LLM APIs and local-model inference',
      'Prompt engineering',
      'Two-plus years hands-on, across personal and sanctioned work',
    ],
  },
  {
    label: 'Backend & microservices',
    items: [
      'Java Spring Boot',
      'Spring Cloud Gateway',
      'Python FastAPI',
      'Celery',
      'Mule 3 & 4 with DataWeave',
      'REST and SOAP APIs',
      'RabbitMQ',
      'PostgreSQL',
      'Redis',
    ],
  },
  {
    label: 'iOS',
    items: [
      'Swift',
      'Objective-C',
      'SwiftUI',
      'UIKit',
      'async / await',
      'Combine',
      'Live Activities',
      'Widgets',
      'StoreKit 2',
      'Firebase',
      'App Store deployment',
    ],
  },
  {
    label: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux', 'Custom Confluence plugins'],
  },
  {
    label: 'Cloud, DevOps & quality',
    items: [
      'AWS (ECS, S3, EFS, RDS)',
      'Azure AD',
      'Kubernetes (test environments)',
      'Docker',
      'GitHub Actions',
      'Stash',
      'Jenkins',
      'Pipeline parallelization',
      'Playwright',
      'SonarQube',
      'Black Duck',
      'SAML 2.0',
      'OAuth 2.0',
    ],
  },
];
