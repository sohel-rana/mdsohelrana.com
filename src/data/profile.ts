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
    'Software engineer turned entrepreneur with 19+ years in tech. Founder & CEO of NerdDevs. Architect behind Genius AI (100K+ users), a US messaging platform moving 5M+ texts/month, Biddaan LMS and TestReach — the exam platform trusted by ACCA & British Council.',
  ogImage: '/og.png',
};

export const person = {
  name: 'Md. Sohel Rana',
  // Hero's two-line display lockup (explicit, not derived from `name`).
  nameLines: ['Md. Sohel', 'Rana'],
  role: 'Founder & CEO @ NerdDevs Ltd',
  headline: 'AI & SaaS Architect · Full-Stack Engineer',
  location: 'Dhaka, Bangladesh',
  timezone: 'UTC+6',
  email: 'sohel@nerddevs.com',
  linkedin: 'https://www.linkedin.com/in/mdsohelrana',
  github: 'https://github.com/sohel-rana',
  cvFile: '/Md-Sohel-Rana-CV.pdf',
  // The hero highlights the word "NerdDevs" in brighter ink; Hero.astro wraps
  // that token in <strong>. Keep the spelling here matching that token exactly.
  summary:
    'A software engineer turned entrepreneur, 19+ years in. I lead NerdDevs — a 20+ strong team building AI-driven products, scalable SaaS and EdTech across three continents. I don’t manage projects; I architect them — cloud on AWS, Azure & GCP, LLM pipelines, messaging moving millions of texts a month, and assessment platforms trusted by the world’s biggest certification bodies.',
  principles: [
    'I don’t just write code — I solve business problems.',
    'TDD and proven design patterns keep products reliable and scalable.',
    'Move fast without breaking quality.',
  ],
};

export const stats = [
  { value: '19+', label: 'Years in engineering' },
  { value: '5M+', label: 'Texts / month shipped' },
  { value: '100K+', label: 'Users on Genius AI' },
  { value: '20+', label: 'Engineers led' },
];

export type Project = {
  index: string;
  name: string;
  role: string;
  period: string;
  description: string;
  impact: string;
  tags: string[];
  caseStudy?: string;
  live?: { url: string; label: string };
  nda?: boolean;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    index: '01',
    name: 'Genius — AI Chat 5.0',
    role: 'Architect · AI pipeline',
    period: '2023 — present',
    description:
      'An AI chat companion with GPT-4/5 and Vision-powered image analysis. I designed the architecture and AI pipeline end to end — a high-throughput Node.js backend built to survive viral growth.',
    impact: '100K+ users · 99.9% uptime',
    tags: ['OpenAI GPT-4/5', 'Vision API', 'Node.js', 'MongoDB', 'Redis', 'AWS'],
    caseStudy: 'https://nerddevs.com/portfolio/genius-ai',
    live: { url: 'https://apps.apple.com/kz/app/ai-chat-4-0-genius/id1665764663', label: 'App Store' },
    featured: true,
  },
  {
    index: '02',
    name: 'US Messaging Platform',
    role: 'System & messaging design',
    period: '2021 — present',
    description:
      'A second phone number that lives in an app — text and call without handing out your real one. I own the queue-driven system design where deliverability is the product.',
    impact: '5M+ texts delivered / month',
    tags: ['Twilio', 'Bandwidth', 'Node.js', 'Redis queues', 'MongoDB', 'AWS'],
    caseStudy: 'https://nerddevs.com/portfolio/us-messaging-platform',
    nda: true,
    featured: true,
  },
  {
    index: '03',
    name: 'Biddaan — EdTech LMS',
    role: 'Co-founder · Architect',
    period: '2025 — present',
    description:
      'Bangladesh’s localized multi-vendor LMS. Educators run their whole teaching business — live classes, courses, exams and payments — from one platform.',
    impact: '1,000+ educators onboarded',
    tags: ['Multi-tenant SaaS', 'EdTech', 'Assessments', 'Payments'],
    caseStudy: 'https://nerddevs.com/portfolio/biddaan',
    live: { url: 'https://biddaan.nerddevs.biz/', label: 'Live demo' },
    featured: true,
  },
  {
    index: '04',
    name: 'TestReach',
    role: 'Software Architect & Lead',
    period: '2014 — 2020',
    description:
      'Secure online assessment with remote proctoring — the platform behind high-stakes professional exams worldwide. I architected the core systems and led the engineering team.',
    impact: 'Millions of exams, globally',
    tags: ['High-stakes exams', 'Remote proctoring', 'Scalability'],
    caseStudy: 'https://nerddevs.com/portfolio/testreach',
    live: { url: 'https://www.testreach.com', label: 'testreach.com' },
    featured: true,
  },
  {
    index: '05',
    name: 'AI Mate',
    role: 'Consumer AI assistant · GPT-5',
    period: '2023 — present',
    description:
      'Consumer AI assistant powered by GPT-5 — human-like chat, content generation and productivity tools across web and mobile.',
    impact: '100K+ downloads · 4.5★',
    tags: ['GPT-5', 'Consumer AI', 'Web + Mobile', 'Subscriptions'],
    live: { url: 'https://app.aimate.online/', label: 'Try it live' },
  },
  {
    index: '06',
    name: 'NerdCRM',
    role: '$4/seat CRM for sales teams',
    period: '2024 — present',
    description:
      'A fast, focused $4/seat CRM for phone-heavy sales teams — every recorded call auto-attaches to the matching deal and contact by phone-number match.',
    impact: 'Used daily in production',
    tags: ['Multi-tenant SaaS', 'Call recording', 'Email outreach', 'Paddle'],
    caseStudy: 'https://nerddevs.com/portfolio/nerd-crm',
    live: { url: 'https://getnerdcrm.com', label: 'getnerdcrm.com' },
  },
  {
    index: '07',
    name: 'DailyHabitz',
    role: 'iOS habit tracker · AI coaching',
    period: '2025 — present',
    description:
      'iOS habit tracker that solves the week-two drop-off: AI-powered micro-coaching, streak analytics, smart reminders and friend-led accountability challenges.',
    impact: '5.0★ App Store rating',
    tags: ['iOS', 'AI coaching', 'Firebase', 'Gamification'],
    caseStudy: 'https://nerddevs.com/portfolio/dailyhabitz',
    live: { url: 'https://apps.apple.com/us/app/dailyhabitz/id6751629717', label: 'App Store' },
  },
  {
    index: '08',
    name: 'Medical Imaging AI Platform',
    role: 'Lead & Cloud Architect · Azure',
    period: '2022',
    description:
      'HealthTech platform bringing AI-enhanced diagnostics to medical imaging. I led the cloud architecture: an Azure pipeline processing DICOM/MRI data under strict healthcare-grade security.',
    impact: 'In-production diagnostics',
    tags: ['Azure', 'Healthcare AI', 'DICOM/MRI', 'Bicep IaC', 'Redis'],
    nda: true,
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
    'Since 2015, my team at NerdDevs has shipped 27+ long-term projects across three continents — powering TestReach (the exam platform trusted by ACCA & British Council) and building first-party products like AI Mate (100K+ downloads, 4.5★), Biddaan LMS, NerdCRM and DailyHabitz.',
  stats: [
    { value: '2015', label: 'Founded' },
    { value: '27+', label: 'Long-term projects' },
    { value: '6+', label: 'Countries served' },
    { value: '99.9%', label: 'Uptime' },
  ],
  cta: 'Start a project with NerdDevs',
  email: 'hello@nerddevs.com',
};
