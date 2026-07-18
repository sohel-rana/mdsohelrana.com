/**
 * ─────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH for all site content.
 *  Edit this file → push to main → site redeploys automatically.
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  url: 'https://mdsohelrana.com',
  title: 'Md. Sohel Rana — Founder & CEO @ NerdDevs · AI & SaaS Architect',
  description:
    'Software engineer turned entrepreneur with 17+ years in tech. Founder & CEO of NerdDevs. Architect behind Genius AI (100K+ users), Second Text (5M+ texts/month), Biddaan LMS and TestReach — the exam platform trusted by ACCA & British Council.',
  ogImage: '/og.png',
};

export const person = {
  name: 'Md. Sohel Rana',
  firstName: 'Sohel',
  role: 'Founder & CEO @ NerdDevs Ltd',
  headline: 'AI & SaaS Architect · Full-Stack Engineer',
  location: 'Dhaka, Bangladesh',
  timezone: 'UTC+6',
  email: 'sohel@nerddevs.com',
  linkedin: 'https://www.linkedin.com/in/mdsohelrana',
  github: 'https://github.com/sohel-rana',
  cvFile: '/Md-Sohel-Rana-CV.pdf',
  summary:
    'I’m a software engineer turned entrepreneur with 17+ years in tech. I lead NerdDevs, where a 20+ strong team builds AI-driven products, scalable SaaS and EdTech platforms for clients across Asia, Europe and North America. I don’t just manage projects — I architect them: cloud infrastructure across AWS, Azure and GCP, LLM pipelines, messaging systems handling millions of texts monthly, and assessment platforms trusted by the world’s biggest certification bodies.',
  principles: [
    'I don’t just write code — I solve business problems.',
    'TDD and proven design patterns keep products reliable and scalable.',
    'Move fast without breaking quality.',
  ],
};

export const stats = [
  { value: '17+', label: 'Years in engineering' },
  { value: '5M+', label: 'Texts/month · Second Text' },
  { value: '100K+', label: 'Users · Genius AI' },
  { value: '20+', label: 'Engineers led at NerdDevs' },
];

export type Project = {
  index: string;
  name: string;
  role: string;
  period: string;
  description: string;
  impact: string;
  tags: string[];
  link?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    index: '01',
    name: 'Genius — AI Chat 5.0',
    role: 'Architect · AI pipeline design',
    period: '2023 — present',
    description:
      'AI-powered chat assistant with advanced prompt workflows and image analysis. Designed the architecture and the AI pipeline end to end.',
    impact: '100K+ sign-ups in the first three weeks',
    tags: ['OpenAI GPT-4/5', 'Node.js', 'AI pipeline', 'Mobile backend'],
    link: 'https://nerddevs.com/portfolio/genius-ai',
    featured: true,
  },
  {
    index: '02',
    name: 'Second Text — Virtual Phone Number',
    role: 'System design · Messaging architecture',
    period: '2021 — present',
    description:
      'Virtual phone number app built for Torqued Studios (USA). I own system design, backend scalability and the messaging architecture.',
    impact: '5M+ text messages handled monthly',
    tags: ['Twilio', 'Bandwidth', 'Node.js', 'MongoDB', 'Redis'],
    featured: true,
  },
  {
    index: '03',
    name: 'Biddaan — EdTech LMS',
    role: 'Co-founder · Architect',
    period: '2025 — present',
    description:
      'Multi-tenant LMS: courses, exams, question banks, analytics, audio questions, offline enrollment and institute management.',
    impact: '1,000+ educators digitizing learning',
    tags: ['Multi-tenant SaaS', 'EdTech', 'Assessments'],
    link: 'https://nerddevs.com/portfolio/biddaan',
  },
  {
    index: '04',
    name: 'TestReach',
    role: 'Software Architect & Team Lead',
    period: '2014 — 2020',
    description:
      'Designed the architecture of large-scale online assessment systems — APIs, integrations, load balancing and uptime reliability.',
    impact: 'Trusted by ACCA, British Council & CIPS',
    tags: ['High-stakes exams', 'Scalability', 'Performance'],
    link: 'https://nerddevs.com/portfolio/testreach',
  },
  {
    index: '05',
    name: 'TissueConnect.ai',
    role: 'Lead & Cloud Architect',
    period: '2022',
    description:
      'Medical-imaging AI platform: Azure-based pipeline processing DICOM/MRI data with private endpoints, Redis and Bicep deployments.',
    impact: 'AI-enhanced diagnostics in production',
    tags: ['Azure', 'Healthcare AI', 'DICOM/MRI', 'IaC'],
  },
];

export type Job = {
  period: string;
  role: string;
  company: string;
  location: string;
  points: string[];
};

export const experience: Job[] = [
  {
    period: '2014 — Present',
    role: 'Founder & CEO / Solution Architect',
    company: 'NerdDevs Ltd',
    location: 'Dhaka, Bangladesh',
    points: [
      'Lead a 20+ member engineering team delivering AI-powered SaaS, EdTech platforms and enterprise applications.',
      'Principal engineer for systems involving LLMs, messaging workflows, scheduling and assessments; cloud architecture across AWS, Azure and GCP.',
    ],
  },
  {
    period: '2020 — Present',
    role: 'Country Coordinator',
    company: 'TestReach',
    location: 'Dhaka, Bangladesh',
    points: [
      'Liaison between TestReach international teams and Bangladesh operations.',
    ],
  },
  {
    period: '2014 — 2020',
    role: 'Software Architect & Team Lead',
    company: 'TestReach',
    location: 'Dhaka, Bangladesh',
    points: [
      'Architected large-scale assessment systems used by thousands of candidates — APIs, third-party integrations, load balancing and uptime reliability.',
    ],
  },
  {
    period: '2013 — 2014',
    role: 'Lead Web Developer',
    company: 'Severalnines AB',
    location: 'Stockholm, Sweden',
    points: [
      'Built UI modules and REST APIs for ClusterControl, the database cluster management platform.',
    ],
  },
  {
    period: '2007 — 2012',
    role: 'Sr. Software Engineer',
    company: 'Dohatec New Media',
    location: 'Dhaka, Bangladesh',
    points: [
      'Built mission-critical national systems: e-Government Procurement (Ministry of Planning) and the Biometric Voter ID System.',
    ],
  },
];

export const education = {
  degree: 'B.Sc. in Computer Science & Engineering',
  school: 'Rajshahi University of Engineering & Technology (RUET)',
  period: '2003 — 2007',
};

export const skills: { group: string; items: string[] }[] = [
  {
    group: 'AI & Automation',
    items: ['OpenAI GPT-4/5', 'Claude', 'DALL·E', 'RAG pipelines', 'n8n'],
  },
  {
    group: 'Frontend',
    items: ['TypeScript', 'React', 'Next.js', 'Vue.js', 'TailwindCSS'],
  },
  {
    group: 'Backend',
    items: ['Node.js', 'Express', 'Python', 'Django / Flask', 'Laravel / PHP'],
  },
  {
    group: 'Databases',
    items: ['MongoDB', 'PostgreSQL', 'MySQL', 'SQL Server', 'Redis'],
  },
  {
    group: 'Cloud & DevOps',
    items: ['AWS (EC2 · Lambda · S3 · CloudFront)', 'Azure', 'GCP', 'DigitalOcean', 'Docker', 'Jenkins'],
  },
  {
    group: 'Mobile & Integrations',
    items: ['Flutter', 'Electron', 'Twilio', 'RevenueCat', 'Mailgun / Mailchimp'],
  },
];

export const company = {
  name: 'NerdDevs Ltd',
  url: 'https://nerddevs.com',
  tagline: 'AI, EdTech & SaaS solutions that scale globally',
  blurb:
    'Since 2015, my team at NerdDevs has shipped 27+ long-term projects across three continents — powering TestReach (the exam platform trusted by ACCA & British Council) and building products like AI Mate (100K+ downloads, 4.5★), Biddaan LMS, NerdCRM and DailyHabitz.',
  stats: [
    { value: '2015', label: 'Founded' },
    { value: '27+', label: 'Long-term projects' },
    { value: '6+', label: 'Countries served' },
    { value: '99.9%', label: 'Uptime' },
  ],
  cta: 'Start a project with NerdDevs',
  email: 'hello@nerddevs.com',
};
