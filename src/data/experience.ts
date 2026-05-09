export type Role = {
  title: string;
  period: string;
};

export type ExperienceEntry = {
  company: string;
  location: string;
  span: string;
  roles: Role[];
  note?: string;
};

export const experience: ExperienceEntry[] = [
  {
    company: 'Murex Lebanon',
    location: 'Beirut',
    span: '2016 to present',
    roles: [
      { title: 'Senior Software Engineer & Scrum Master', period: '2020 to present' },
      { title: 'Software Engineer (Internal)', period: '2018 to 2020' },
      { title: 'Software Engineer (External Consultant)', period: '2016 to 2018' },
    ],
  },
  {
    company: 'Intalio GS',
    location: 'Beirut',
    span: '2015 to 2016',
    roles: [{ title: 'iOS Developer, government iPad applications for Qatari ministries', period: '' }],
  },
  {
    company: 'Independent iOS practice',
    location: 'Side projects and freelance, parallel to full-time work',
    span: '2015 to present',
    roles: [
      { title: 'Ten-plus shipped App Store apps including Qibla Pro (5,000+ reviews, 4.8 stars)', period: '' },
    ],
  },
];
