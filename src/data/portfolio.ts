/**
 * Single source of truth for everything the site says about Jorge.
 * Both the standard portfolio and the Matrix version read from here,
 * so updating a project or a job only happens in this file.
 */

export const SITE_URL = "https://jcdevportfolio.netlify.app";

const GITHUB_USER = "j-c-fstk-dev";
const gh = (repo: string, owner = GITHUB_USER) => `https://github.com/${owner}/${repo}`;

export const profile = {
  name: "Jorge Cristo",
  legalName: "Jorge Augusto Medeiros Lopes",
  role: "Full-Stack Developer",
  tagline: "Bug fixing & app rescue · Web3 / Solidity · AI integrations",
  location: "Brazil · remote · UTC-3",
  photo:
    "https://res.cloudinary.com/dr0weongo/image/upload/v1754567145/1kjsy9_mqwlus.jpg",
  summary:
    "Freelance full-stack developer with 3 years of client work and around 20 projects delivered, many of them production apps for Web3, climate and community projects. I take existing codebases and make them work: debugging, broken builds and deploys, database and auth issues, and new features on top. In Web3 I build dApps and Farcaster mini apps and review Solidity contracts.",
  story:
    "Before tech I worked in production engineering, commerce and tourism — including eight years operating trains on a mountain railway. That shaped how I work: diagnose first, agree on a clear scope, deliver on a separate branch with clean documentation.",
  availability: "Available for freelance work",
  freelanceSince: 2023,
};

export const contact = {
  email: "dev.jorge.c@gmail.com",
  whatsapp: "https://wa.me/5512992185685",
  github: `https://github.com/${GITHUB_USER}`,
  githubHandle: GITHUB_USER,
  cv: "https://j-c-fstk-dev.github.io/cvs/",
  blog: "https://finecoding.netlify.app/",
  beregen: "https://beregen.xyz/",
  kofi: "https://ko-fi.com/devjc",
};

export interface Service {
  title: string;
  description: string;
}

export const services: Service[] = [
  {
    title: "Bug fixing & app rescue",
    description:
      "React, Next.js and Node apps, including ones built with Lovable, Bolt or Cursor: build and deploy errors, auth, Supabase and database rules, broken integrations.",
  },
  {
    title: "Web3 & smart contracts",
    description:
      "dApps on EVM chains (Celo, Ethereum), Solidity contract review, wallet flows, Farcaster mini apps and account abstraction.",
  },
  {
    title: "Features & automation",
    description:
      "End-to-end features, Stripe payments, AI/LLM integrations, n8n and Zapier workflows, Python data apps.",
  },
];


export type ProjectCategory = "web3" | "ai" | "web" | "automation";
export type ProjectStatus = "live" | "beta" | "in-development" | "prototype";

export interface Project {
  title: string;
  description: string;
  tech: string[];
  category: ProjectCategory;
  status: ProjectStatus;
  /** Who it was built for, e.g. "Client", "Own product", "Hackathon". */
  context: string;
  live?: string;
  repo?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    title: "DeCleanup DApp",
    description:
      "Web3 platform that coordinates and rewards real-world cleanups. Used by 100+ people in community cleanup groups. Fixed production bugs, shipped features across front-end, back-end and database, and reviewed the Solidity contracts.",
    tech: ["TypeScript", "React", "Node.js", "Solidity", "Celo"],
    category: "web3",
    status: "live",
    context: "Client",
    live: "https://dapp.decleanup.net",
    repo: gh("decleanup-main-celo"),
    featured: true,
  },
  {
    title: "DeCleanup Mini App",
    description:
      "Farcaster mini app that brings DeCleanup's cleanup actions into the social feed, with on-chain rewards.",
    tech: ["TypeScript", "React", "Solidity", "Farcaster"],
    category: "web3",
    status: "live",
    context: "Client",
    live: "https://miniapp.decleanup.net",
    repo: gh("Farcaster-Mini-App", "DeCleanup-Network"),
    featured: true,
  },
  {
    title: "BeRegen Ecosystem",
    description:
      "Regenerative infrastructure for communities: identity and impact validation, reputation-based governance, learning, daily practices and impact-aligned funding.",
    tech: ["TypeScript", "React", "Node.js", "Stripe", "Web3"],
    category: "web3",
    status: "live",
    context: "Own product",
    live: "https://beregen.xyz",
    repo: gh("beregen_site"),
    featured: true,
  },
  {
    title: "Bass Forest",
    description:
      "Site for an annual global electronic music festival tied to World Environment Day and tree planting. Designed and built solo from scratch.",
    tech: ["TypeScript", "React"],
    category: "web",
    status: "live",
    context: "Client",
    live: "https://bassforest.earth",
    repo: gh("bassforest", "BeRegen"),
    featured: true,
  },
  {
    title: "Monthly Earth Day",
    description:
      "Community hub for monthly environmental actions. Designed and built solo from scratch.",
    tech: ["TypeScript", "React", "Node.js"],
    category: "web",
    status: "live",
    context: "Client",
    live: "https://monthlyearthday.org",
    repo: gh("site-monthly-earth-day"),
    featured: true,
  },
  {
    title: "Rastro",
    description:
      "Real-world regenerative actions, signed by who did them and confirmed by who was there. Works offline with no account or wallet, built on Nostr, exports to the DeCleanup format.",
    tech: ["React", "TypeScript", "Nostr", "IndexedDB", "Leaflet"],
    category: "web3",
    status: "in-development",
    context: "Own product",
    repo: gh("rastro"),
    featured: true,
  },
  {
    title: "Prumo",
    description:
      "PWA that turns a short assessment into a niche diagnosis and a 90-day roadmap, with a contextual AI coach.",
    tech: ["React 19", "TypeScript", "Express", "Cloudflare Workers", "LLM APIs"],
    category: "ai",
    status: "in-development",
    context: "Own product",
    repo: gh("Prumo"),
  },
  {
    title: "MAESTRO",
    description:
      "Live electronic music web app with an AI conductor: change the track with commands and every change lands on the beat. Nine styles, two decks, autopilot and MP3 recording.",
    tech: ["React", "TypeScript", "Strudel", "Web Audio", "LLM"],
    category: "ai",
    status: "prototype",
    context: "Own product",
    repo: gh("maiestro"),
  },
  {
    title: "Operator",
    description:
      "Keyboard-first project workspace with a retro terminal look. Local-first, with optional cloud sync and file storage.",
    tech: ["React", "TypeScript", "Supabase", "Web Audio"],
    category: "web",
    status: "in-development",
    context: "Own product",
    repo: gh("Operator-Matrix-Retro-Terminal-Workspace"),
  },
  {
    title: "Megazord MVP",
    description:
      "Automation suite that pulls stories, links, sales and DMs and delivers the morning's content ready to post.",
    tech: ["Python", "n8n", "Cloudflare Workers", "Meta Graph API"],
    category: "automation",
    status: "prototype",
    context: "Own product",
    repo: gh("megazord-mvp"),
  },
  {
    title: "Wondrix",
    description:
      "AI education agent for families. Team project for the Dubai Create AI Agents Championship (Best Societal AI Agent track).",
    tech: ["Next.js", "TypeScript", "AI agents"],
    category: "ai",
    status: "prototype",
    context: "Hackathon",
    repo: gh("Wondrix"),
  },
  {
    title: "PartoMagnus",
    description:
      "Clinical PWA for real-time labor tracking based on WHO and FEBRASGO protocols: contraction analytics, phase detection, guided breathing and PDF reports.",
    tech: ["React", "TypeScript", "Zustand", "Tone.js"],
    category: "web",
    status: "prototype",
    context: "Own product",
    repo: gh("PartoMagnus"),
  },
  {
    title: "Superteam Academy",
    description:
      "On-chain learning platform on Solana with soulbound XP and credential NFTs. Built the Next.js front-end and wallet integration for the bounty.",
    tech: ["Next.js", "TypeScript", "Solana"],
    category: "web3",
    status: "prototype",
    context: "Bounty",
    repo: gh("superteam-academy"),
  },
  {
    title: "PassPay",
    description:
      "Gasless stablecoin payments using passkeys and account abstraction. Reference implementation.",
    tech: ["TypeScript", "React", "Node.js", "Account abstraction"],
    category: "web3",
    status: "prototype",
    context: "Own product",
    repo: gh("PassPay"),
  },
  {
    title: "Contextual SEO Engine",
    description: "AI-powered marketing content generator built for a Base44 competition.",
    tech: ["JavaScript", "React", "Node.js", "LLM APIs"],
    category: "ai",
    status: "live",
    context: "Competition",
    live: "https://contextual-seo-engine.netlify.app",
    repo: gh("CSE-landing-page"),
  },
  {
    title: "RegenFlix",
    description: "Regenerative learning platform with Stripe payments. Part of the BeRegen ecosystem.",
    tech: ["TypeScript", "React", "Node.js", "Stripe"],
    category: "web",
    status: "beta",
    context: "Own product",
    live: "https://regenflix.netlify.app",
    repo: gh("RegenFlix"),
  },
  {
    title: "RegenImpactHub",
    description: "Identity, reputation and impact validation for regenerative work. In beta testing.",
    tech: ["TypeScript", "React", "Node.js", "Web3"],
    category: "web3",
    status: "beta",
    context: "Own product",
    live: "https://regenimpacthub.netlify.app",
    repo: gh("RegenImpactHub"),
  },
  {
    title: "Jardim do Fazer",
    description: "My own e-commerce for physical and digital products, with a blog and an admin panel.",
    tech: ["React", "Express", "SQLite", "JWT", "Cloudinary"],
    category: "web",
    status: "in-development",
    context: "Own product",
    repo: gh("jardimdofazer"),
  },
  {
    title: "SubGuard AI",
    description: "Analyzes recurring subscriptions with AI and suggests what to cancel.",
    tech: ["Python", "TypeScript", "Streamlit"],
    category: "ai",
    status: "in-development",
    context: "Own product",
    repo: gh("subguard-ai"),
  },
  {
    title: "FineCoding",
    description: "Blog template with AI integrations — also my development blog.",
    tech: ["TypeScript", "React"],
    category: "web",
    status: "live",
    context: "Own product",
    live: "https://finecoding.netlify.app",
    repo: gh("finecoding"),
  },
];

export const stats = [
  { label: "Projects delivered", value: 20, suffix: "+" },
  { label: "Years of client work", value: new Date().getFullYear() - profile.freelanceSince, suffix: "+" },
  { label: "People using DeCleanup", value: 100, suffix: "+" },
  { label: "Apps live in production", value: projects.filter((p) => p.status === "live").length, suffix: "" },
];

export const categoryLabels: Record<ProjectCategory, string> = {
  web3: "Web3",
  ai: "AI",
  web: "Web apps",
  automation: "Automation",
};

export const statusLabels: Record<ProjectStatus, string> = {
  live: "Live",
  beta: "Beta",
  "in-development": "In development",
  prototype: "Prototype",
};

export interface Job {
  title: string;
  company: string;
  period: string;
  start: number;
  /** Omit for current roles. */
  end?: number;
  summary: string;
  highlights: string[];
  tech: string[];
  link?: string;
}

export const experience: Job[] = [
  {
    title: "Freelance Full-Stack Developer",
    company: "Remote",
    period: "2023 – present",
    start: 2023,
    summary:
      "Projects for Web3, climate and community organizations, including work under NDA.",
    highlights: [
      "DeCleanup Network — full-stack developer on a Web3 platform that coordinates and rewards real cleanups, and on its Farcaster mini app; used by 100+ people.",
      "Fixed production bugs and shipped new features across front-end, back-end and database; reviewed Solidity contracts and built the flows around them.",
      "Bass Forest and Monthly Earth Day — designed and built both sites solo, from scratch.",
    ],
    tech: ["TypeScript", "React", "Node.js", "Solidity", "Celo", "Farcaster"],
  },
  {
    title: "Founder & Lead Developer",
    company: "BeRegen",
    period: "2023 – present",
    start: 2023,
    summary:
      "Regenerative infrastructure for communities, connecting real-world action, learning, identity, governance and funding, with fieldwork in the Mantiqueira range.",
    highlights: [
      "Designed and built the ecosystem site and its products: RegenImpactHub (identity and impact validation, beta), RegenFlix (learning with Stripe payments) and BeRegen App (daily practices, MVP).",
      "Created GOPR, an optimistic governance model based on reputation.",
    ],
    tech: ["TypeScript", "React", "Node.js", "Stripe", "Web3"],
    link: "https://beregen.xyz",
  },
  {
    title: "Content, Community & Documentation",
    company: "NFTrees Brasil, Greenpill Brasil, ReFi DAO, Beregenerative.life",
    period: "2021 – 2025",
    start: 2021,
    end: 2025,
    summary: "Web presence and documentation for Web3 and regenerative finance projects.",
    highlights: [
      "Built and maintained blogs and marketing sites for Web3 projects, with SEO.",
      "Wrote technical documentation for blockchain platforms and ran their community channels.",
    ],
    tech: ["CMS", "SEO", "Technical writing"],
  },
];

export const previousCareer: Job[] = [
  {
    title: "Owner",
    company: "Brincando em Família Ateliê",
    period: "2019 – 2025",
    start: 2019,
    end: 2025,
    summary: "Ran the online store, website and digital marketing.",
    highlights: [],
    tech: [],
  },
  {
    title: "Train Operator",
    company: "Estrada de Ferro Campos do Jordão",
    period: "2015 – 2023",
    start: 2015,
    end: 2023,
    summary:
      "Operated and troubleshot electromechanical systems under strict safety protocols.",
    highlights: [],
    tech: [],
  },
  {
    title: "Engineering Assistant",
    company: "Zodiac (pharmaceutical)",
    period: "2010 – 2014",
    start: 2010,
    end: 2014,
    summary: "Built cost-control and maintenance-order systems; documented processes.",
    highlights: [],
    tech: [],
  },
];

export const skills: Record<string, string[]> = {
  Languages: ["TypeScript", "JavaScript", "Python", "Solidity", "SQL", "Java", "Kotlin"],
  "Front-end": ["React", "Next.js", "Angular", "Vue", "Tailwind CSS", "HTML", "CSS"],
  "Back-end": ["Node.js", "Express", "REST APIs", "Supabase (Auth, RLS)", "Firebase", "Stripe API"],
  Databases: ["PostgreSQL", "MySQL", "SQLite", "MongoDB", "Firestore", "Browser & local storage"],
  Web3: ["Solidity", "EVM (Ethereum, Celo)", "Solana", "Ethers.js", "Web3.js", "Account abstraction", "Farcaster mini apps"],
  "Automation & AI": ["n8n", "Zapier", "Kommo CRM", "Streamlit", "LangChain", "LLM APIs"],
  Tools: ["Git & GitHub", "Linux (daily driver)", "Netlify", "Vercel", "Docker", "GCP", "AI-assisted dev (Claude, Cursor, Copilot)"],
};

export const education = [
  { title: "BSc in Production Engineering", school: "FUNVIC", year: "2015" },
  { title: "Blockchain Developer with Solidity", school: "DIO × Binance bootcamp", year: "2025" },
  { title: "CS50", school: "Harvard · plus freeCodeCamp and DIO tracks", year: "" },
];

export const languages = ["Portuguese (native)", "English (advanced)"];
