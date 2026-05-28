export type Certification = {
  name: string;
  detail?: string;
  href?: string;
};

export const certifications: Certification[] = [
  {
    name: 'Pega Certified System Architect (CSA)',
    href: 'https://academy.pega.com/verify-certification?email=mohammadbashir.sidani%40murex.com',
  },
  {
    name: 'Pega Certified Senior System Architect (CSSA)',
    href: 'https://academy.pega.com/verify-certification?email=mohammadbashir.sidani%40murex.com',
  },
  {
    name: 'Pega Lead System Architect (LSA)',
    detail: 'In progress',
  },
  {
    name: 'Mindbreeze Expert Certification',
    detail: '2020',
  },
  {
    name: 'Intel Ideathon Winner, Berytech',
    detail: '2014',
  },
  {
    name: 'SAFe Training',
    detail: 'Fundamentals, Scrum Master Principles, Liberating Structures',
  },
];

export const education = {
  degree: 'Bachelor of Science in Computer Science',
  institution: 'Lebanese American University (LAU)',
  year: '2015',
};
