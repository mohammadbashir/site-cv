export type Certification = {
  name: string;
  detail?: string;
  href?: string;
};

// NOTE: Pega cert verify URLs below are placeholders. Replace with the real
// Credly badge URLs once the certificates are live in your Credly profile.
export const certifications: Certification[] = [
  {
    name: 'Pega Certified System Architect (CSA)',
    href: 'https://www.credly.com/users/mohamad-bachir-sidani/badges',
  },
  {
    name: 'Pega Certified Senior System Architect (CSSA)',
    href: 'https://www.credly.com/users/mohamad-bachir-sidani/badges',
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
