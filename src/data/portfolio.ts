/**
 * Single source of truth for everything the site says about Jorge.
 *
 * Text that changes with the language is written as t("English", "Português").
 * getContent(locale) resolves it into plain strings for one language, so the
 * components never deal with translations. The Matrix version uses English.
 */

export const SITE_URL = "https://jcdevportfolio.netlify.app";

export const locales = ["en", "pt"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const isLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);

/** Path of the home page for a locale ("/" for English, "/pt" for Portuguese). */
export const localePath = (locale: Locale) => (locale === defaultLocale ? "/" : `/${locale}`);

interface Text {
  en: string;
  pt: string;
}
const t = (en: string, pt: string): Text => ({ en, pt });

const GITHUB_USER = "j-c-fstk-dev";
const gh = (repo: string, owner = GITHUB_USER) => `https://github.com/${owner}/${repo}`;

export type ProjectCategory = "web3" | "ai" | "web" | "desktop" | "automation";
export type ProjectStatus = "live" | "beta" | "in-development" | "prototype";

const contexts = {
  client: t("Client", "Cliente"),
  own: t("Own product", "Produto próprio"),
  hackathon: t("Hackathon", "Hackathon"),
  bounty: t("Bounty", "Bounty"),
  competition: t("Competition", "Competição"),
  openSource: t("Open source", "Código aberto"),
};

const raw = {
  profile: {
    name: "Jorge Cristo",
    legalName: "Jorge Augusto Medeiros Lopes",
    role: t("Full-Stack Developer", "Desenvolvedor Full-Stack"),
    tagline: t(
      "Bug fixing & app rescue · Web3 / Solidity · AI integrations",
      "Correção de bugs e resgate de apps · Web3 / Solidity · integrações de IA"
    ),
    location: t("Brazil, remote, UTC-3", "Brasil, remoto, UTC-3"),
    photo: "https://res.cloudinary.com/dr0weongo/image/upload/v1754567145/1kjsy9_mqwlus.jpg",
    summary: t(
      "Freelance full-stack developer with 3 years of client work and around 20 projects delivered, many of them production apps for Web3, climate and community projects. I take existing codebases and make them work: debugging, broken builds and deploys, database and auth issues, and new features on top. In Web3 I build dApps and Farcaster mini apps and review Solidity contracts.",
      "Desenvolvedor full-stack freelancer com 3 anos de trabalho com clientes e cerca de 20 projetos entregues, muitos deles apps em produção para projetos de Web3, meio ambiente e comunidades. Assumo bases de código existentes e faço funcionar: depuração, build e deploy quebrados, problemas de banco de dados e autenticação, e novas funcionalidades em cima disso. Em Web3, desenvolvo dApps e mini apps para Farcaster e reviso contratos em Solidity."
    ),
    story: t(
      "Before tech I worked in production engineering, commerce and tourism — including eight years operating trains on a mountain railway. That shaped how I work: diagnose first, agree on a clear scope, deliver on a separate branch with clean documentation.",
      "Antes da tecnologia trabalhei com engenharia de produção, comércio e turismo — incluindo oito anos operando trens numa ferrovia de montanha. Isso define meu jeito de trabalhar: diagnóstico primeiro, escopo fechado, entrega em branch separada com documentação clara."
    ),
    availability: t("Available for freelance work", "Disponível para projetos freelance"),
    /** Hero headline, one entry per line. */
    headline: [
      t("Your app almost works.", "Seu app quase funciona."),
      t("I'll get it shipped.", "Eu coloco no ar."),
    ],
    intro: t(
      "I'm Jorge Cristo, a freelance full-stack developer in Brazil. I take broken React, Next.js and Node apps — including ones built with Lovable, Bolt or Cursor — and get them building, deploying and working again. I also build Web3 apps and review Solidity contracts.",
      "Sou Jorge Cristo, desenvolvedor full-stack freelancer no Brasil. Pego apps em React, Next.js e Node que quebraram — inclusive os feitos com Lovable, Bolt ou Cursor — e faço voltarem a compilar, subir e funcionar. Também desenvolvo apps Web3 e reviso contratos em Solidity."
    ),
    freelanceSince: 2023,
  },

  contact: {
    email: "dev.jorge.c@gmail.com",
    whatsapp: "https://wa.me/5512992185685",
    github: `https://github.com/${GITHUB_USER}`,
    githubHandle: GITHUB_USER,
    cv: "https://j-c-fstk-dev.github.io/cvs/",
    blog: "https://finecoding.netlify.app/",
    beregen: "https://beregen.xyz/",
    kofi: "https://ko-fi.com/devjc",
  },

  services: [
    {
      title: t("Bug fixing & app rescue", "Correção de bugs e resgate de apps"),
      description: t(
        "React, Next.js and Node apps, including ones built with Lovable, Bolt or Cursor: build and deploy errors, auth, Supabase and database rules, broken integrations.",
        "Apps em React, Next.js e Node, inclusive os feitos com Lovable, Bolt ou Cursor: erros de build e deploy, autenticação, regras do Supabase e do banco, integrações quebradas."
      ),
    },
    {
      title: t("Web3 & smart contracts", "Web3 e smart contracts"),
      description: t(
        "dApps on EVM chains (Celo, Ethereum), Solidity contract review, wallet flows, Farcaster mini apps and account abstraction.",
        "dApps em redes EVM (Celo, Ethereum), revisão de contratos em Solidity, fluxos de carteira, mini apps para Farcaster e account abstraction."
      ),
    },
    {
      title: t("Features & automation", "Funcionalidades e automação"),
      description: t(
        "End-to-end features, Stripe payments, AI/LLM integrations, n8n and Zapier workflows, Python data apps.",
        "Funcionalidades de ponta a ponta, pagamentos com Stripe, integrações de IA/LLM, fluxos no n8n e Zapier, apps de dados em Python."
      ),
    },
  ],

  /** How a job runs, in order. */
  process: [
    {
      title: t("Diagnose first", "Diagnóstico primeiro"),
      description: t(
        "I reproduce the problem and find the cause before changing any code.",
        "Reproduzo o problema e encontro a causa antes de mexer no código."
      ),
    },
    {
      title: t("Agree on a fixed scope", "Escopo fechado"),
      description: t(
        "We settle exactly what gets done before the work starts.",
        "Combinamos exatamente o que será feito antes de começar."
      ),
    },
    {
      title: t("Deliver on a branch", "Entrega em branch"),
      description: t(
        "Changes arrive on a separate branch with clear documentation, so you review before merging.",
        "As mudanças chegam numa branch separada, com documentação clara, para você revisar antes de juntar."
      ),
    },
  ],

  projects: [
    {
      slug: "decleanup-dapp",
      title: "DeCleanup DApp",
      description: t(
        "Web3 platform that coordinates and rewards real-world cleanups. Used by 100+ people in community cleanup groups. Fixed production bugs, shipped features across front-end, back-end and database, and reviewed the Solidity contracts.",
        "Plataforma Web3 que coordena e recompensa mutirões de limpeza reais, usada por mais de 100 pessoas em grupos comunitários. Corrigi bugs em produção, entreguei funcionalidades no front-end, back-end e banco de dados, e revisei os contratos em Solidity."
      ),
      tech: ["TypeScript", "React", "Node.js", "Solidity", "Celo"],
      category: "web3",
      status: "live",
      context: contexts.client,
      live: "https://dapp.decleanup.net",
      repo: gh("decleanup-main-celo"),
      featured: true,
    },
    {
      slug: "decleanup-mini-app",
      title: "DeCleanup Mini App",
      description: t(
        "Farcaster mini app that brings DeCleanup's cleanup actions into the social feed, with on-chain rewards.",
        "Mini app para Farcaster que leva as ações de limpeza do DeCleanup para o feed social, com recompensas on-chain."
      ),
      tech: ["TypeScript", "React", "Solidity", "Farcaster"],
      category: "web3",
      status: "live",
      context: contexts.client,
      live: "https://miniapp.decleanup.net",
      repo: gh("Farcaster-Mini-App", "DeCleanup-Network"),
      featured: true,
    },
    {
      slug: "operator",
      title: "Operator",
      description: t(
        "Keyboard-first project workspace with a retro terminal look. Local-first, with optional cloud sync and file storage.",
        "Espaço de trabalho para projetos, guiado pelo teclado, com visual de terminal retrô. Local-first, com sincronização e armazenamento de arquivos opcionais na nuvem."
      ),
      tech: ["React", "TypeScript", "Supabase", "Web Audio"],
      category: "web",
      status: "live",
      context: contexts.own,
      repo: gh("Operator-Matrix-Retro-Terminal-Workspace"),
      featured: true,
    },
    {
      slug: "wondrix",
      title: "Wondrix",
      description: t(
        "AI education agent for families. Team project for the Dubai Create AI Agents Championship (Best Societal AI Agent track).",
        "Agente de IA educacional para famílias. Projeto em equipe para o Dubai Create AI Agents Championship (trilha Best Societal AI Agent)."
      ),
      tech: ["Next.js", "TypeScript", "AI agents"],
      category: "ai",
      status: "live",
      context: contexts.hackathon,
      repo: gh("Wondrix"),
      featured: true,
    },
    {
      slug: "prumo",
      title: "Prumo",
      description: t(
        "Native Android app (Kotlin + Jetpack Compose) and interactive simulator with AI mentoring: a guided 15-minute diagnosis, a practical roadmap in narrative chapters and short presence audios to get ideas off paper without stalling.",
        "Aplicativo Android nativo (Kotlin + Jetpack Compose) e simulador interativo com mentoria por IA: diagnóstico guiado em 15 minutos, roteiro prático em capítulos narrativos e micro-áudios de presença para tirar ideias do papel sem paralisia."
      ),
      tech: ["Kotlin", "Jetpack Compose", "TypeScript", "Gemini"],
      category: "ai",
      status: "live",
      context: contexts.own,
      repo: gh("Prumo"),
      featured: true,
    },
    {
      slug: "rastro",
      title: "Rastro",
      description: t(
        "Real-world regenerative actions, signed by who did them and confirmed by who was there. Works offline with no account or wallet, built on Nostr, exports to the DeCleanup format.",
        "Ações regenerativas do mundo real, assinadas por quem fez e confirmadas por quem estava lá. Funciona offline, sem conta nem carteira, é construído sobre Nostr e exporta no formato do DeCleanup."
      ),
      tech: ["React", "TypeScript", "Nostr", "IndexedDB", "Leaflet"],
      category: "web3",
      status: "live",
      context: contexts.own,
      repo: gh("rastro"),
      featured: true,
    },
    {
      slug: "clipvault",
      title: "ClipVault",
      description: t(
        "Desktop clipboard manager that sorts everything you copy into categories automatically.",
        "Gerenciador de área de transferência para desktop que organiza automaticamente em categorias tudo o que você copia."
      ),
      tech: ["Rust"],
      category: "desktop",
      status: "live",
      context: contexts.own,
      repo: gh("clipvault"),
      featured: true,
    },
    {
      slug: "maestro",
      title: "MAESTRO",
      description: t(
        "Live electronic music web app with an AI conductor: change the track with commands and every change lands on the beat. Nine styles, two decks, autopilot and MP3 recording.",
        "App web de música eletrônica ao vivo com um maestro de IA: você muda a faixa com comandos e cada mudança cai no tempo certo. Nove estilos, dois decks, piloto automático e gravação em MP3."
      ),
      tech: ["React", "TypeScript", "Strudel", "Web Audio", "LLM"],
      category: "ai",
      status: "live",
      context: contexts.own,
      repo: gh("maiestro"),
      featured: true,
    },
    {
      slug: "finecoding",
      title: "FineCoding",
      description: t(
        "Blog template with AI integrations — also my development blog.",
        "Template de blog com integrações de IA — também é meu blog de desenvolvimento."
      ),
      tech: ["TypeScript", "React"],
      category: "web",
      status: "live",
      context: contexts.own,
      live: "https://finecoding.netlify.app",
      repo: gh("finecoding"),
      featured: true,
    },
    {
      slug: "matrix-hacker-desktop",
      title: "Matrix Hacker Desktop",
      description: t(
        "Turns Linux into a Matrix-style hacker workstation: an ultra-light i3wm setup for old hardware (Core 2 Duo and up) with Matrix rain, a system dashboard, multi-panel terminals and a green neon theme. Works on Kali, Debian, Ubuntu, Arch and Fedora.",
        "Transforma o Linux numa estação de trabalho hacker no estilo Matrix: um setup ultraleve de i3wm para hardware antigo (Core 2 Duo em diante), com chuva Matrix, painel do sistema, terminais em vários painéis e tema verde neon. Funciona no Kali, Debian, Ubuntu, Arch e Fedora."
      ),
      tech: ["Shell", "i3wm", "Linux"],
      category: "desktop",
      status: "live",
      context: contexts.openSource,
      repo: gh("matrix-hacker-desktop"),
      featured: true,
    },
    {
      slug: "beregen",
      title: "BeRegen Ecosystem",
      description: t(
        "Regenerative infrastructure for communities: identity and impact validation, reputation-based governance, learning, daily practices and impact-aligned funding.",
        "Infraestrutura regenerativa para comunidades: identidade e validação de impacto, governança baseada em reputação, aprendizado, práticas diárias e financiamento alinhado ao impacto."
      ),
      tech: ["TypeScript", "React", "Node.js", "Stripe", "Web3"],
      category: "web3",
      status: "live",
      context: contexts.own,
      live: "https://beregen.xyz",
      repo: gh("beregen_site"),
      featured: true,
    },
    {
      slug: "bass-forest",
      title: "Bass Forest",
      description: t(
        "Site for an annual global electronic music festival tied to World Environment Day and tree planting. Designed and built solo from scratch.",
        "Site de um festival global anual de música eletrônica ligado ao Dia Mundial do Meio Ambiente e ao plantio de árvores. Projetado e desenvolvido do zero, sozinho."
      ),
      tech: ["TypeScript", "React"],
      category: "web",
      status: "live",
      context: contexts.client,
      live: "https://bassforest.earth",
      repo: gh("bassforest", "BeRegen"),
      featured: true,
    },
    {
      slug: "monthly-earth-day",
      title: "Monthly Earth Day",
      description: t(
        "Community hub for monthly environmental actions. Designed and built solo from scratch.",
        "Hub comunitário de ações ambientais mensais. Projetado e desenvolvido do zero, sozinho."
      ),
      tech: ["TypeScript", "React", "Node.js"],
      category: "web",
      status: "live",
      context: contexts.client,
      live: "https://monthlyearthday.org",
      repo: gh("site-monthly-earth-day"),
      featured: true,
    },
    {
      slug: "megazord",
      title: "Megazord MVP",
      description: t(
        "Automation suite that pulls stories, links, sales and DMs and delivers the morning's content ready to post.",
        "Suíte de automação que reúne stories, links, vendas e DMs e entrega o conteúdo da manhã pronto para postar."
      ),
      tech: ["Python", "n8n", "Cloudflare Workers", "Meta Graph API"],
      category: "automation",
      status: "prototype",
      context: contexts.own,
      repo: gh("megazord-mvp"),
    },
    {
      slug: "partomagnus",
      title: "PartoMagnus",
      description: t(
        "Clinical PWA for real-time labor tracking based on WHO and FEBRASGO protocols: contraction analytics, phase detection, guided breathing and PDF reports.",
        "PWA clínico para acompanhar o trabalho de parto em tempo real, baseado nos protocolos da OMS e da FEBRASGO: análise de contrações, detecção de fase, respiração guiada e relatórios em PDF."
      ),
      tech: ["React", "TypeScript", "Zustand", "Tone.js"],
      category: "web",
      status: "prototype",
      context: contexts.own,
      repo: gh("PartoMagnus"),
    },
    {
      slug: "superteam-academy",
      title: "Superteam Academy",
      description: t(
        "On-chain learning platform on Solana with soulbound XP and credential NFTs. Built the Next.js front-end and wallet integration for the bounty.",
        "Plataforma de aprendizado on-chain na Solana, com XP soulbound e NFTs de credencial. Desenvolvi o front-end em Next.js e a integração de carteira para o bounty."
      ),
      tech: ["Next.js", "TypeScript", "Solana"],
      category: "web3",
      status: "prototype",
      context: contexts.bounty,
      repo: gh("superteam-academy"),
    },
    {
      slug: "passpay",
      title: "PassPay",
      description: t(
        "Gasless stablecoin payments using passkeys and account abstraction. Reference implementation.",
        "Pagamentos em stablecoin sem taxa de gas, usando passkeys e account abstraction. Implementação de referência."
      ),
      tech: ["TypeScript", "React", "Node.js", "Account abstraction"],
      category: "web3",
      status: "prototype",
      context: contexts.own,
      repo: gh("PassPay"),
    },
    {
      slug: "contextual-seo-engine",
      title: "Contextual SEO Engine",
      description: t(
        "AI-powered marketing content generator built for a Base44 competition.",
        "Gerador de conteúdo de marketing com IA, criado para uma competição da Base44."
      ),
      tech: ["JavaScript", "React", "Node.js", "LLM APIs"],
      category: "ai",
      status: "live",
      context: contexts.competition,
      live: "https://contextual-seo-engine.netlify.app",
      repo: gh("CSE-landing-page"),
    },
    {
      slug: "regenflix",
      title: "RegenFlix",
      description: t(
        "Regenerative learning platform with Stripe payments. Part of the BeRegen ecosystem.",
        "Plataforma de aprendizado regenerativo com pagamentos via Stripe. Parte do ecossistema BeRegen."
      ),
      tech: ["TypeScript", "React", "Node.js", "Stripe"],
      category: "web",
      status: "beta",
      context: contexts.own,
      live: "https://regenflix.netlify.app",
      repo: gh("RegenFlix"),
    },
    {
      slug: "regenimpacthub",
      title: "RegenImpactHub",
      description: t(
        "Identity, reputation and impact validation for regenerative work. In beta testing.",
        "Identidade, reputação e validação de impacto para trabalho regenerativo. Em fase beta."
      ),
      tech: ["TypeScript", "React", "Node.js", "Web3"],
      category: "web3",
      status: "beta",
      context: contexts.own,
      live: "https://regenimpacthub.netlify.app",
      repo: gh("RegenImpactHub"),
    },
    {
      slug: "jardim-do-fazer",
      title: "Jardim do Fazer",
      description: t(
        "My own e-commerce for physical and digital products, with a blog and an admin panel.",
        "Meu próprio e-commerce de produtos físicos e digitais, com blog e painel administrativo."
      ),
      tech: ["React", "Express", "SQLite", "JWT", "Cloudinary"],
      category: "web",
      status: "in-development",
      context: contexts.own,
      repo: gh("jardimdofazer"),
    },
    {
      slug: "subguard-ai",
      title: "SubGuard AI",
      description: t(
        "Analyzes recurring subscriptions with AI and suggests what to cancel.",
        "Analisa assinaturas recorrentes com IA e sugere o que cancelar."
      ),
      tech: ["Python", "TypeScript", "Streamlit"],
      category: "ai",
      status: "in-development",
      context: contexts.own,
      repo: gh("subguard-ai"),
    },
  ] as RawProject[],

  categoryLabels: {
    web3: t("Web3", "Web3"),
    ai: t("AI", "IA"),
    web: t("Web apps", "Apps web"),
    desktop: t("Desktop & Linux", "Desktop e Linux"),
    automation: t("Automation", "Automação"),
  },

  statusLabels: {
    live: t("Live", "No ar"),
    beta: t("Beta", "Beta"),
    "in-development": t("In development", "Em desenvolvimento"),
    prototype: t("Prototype", "Protótipo"),
  },

  experience: [
    {
      title: t("Freelance Full-Stack Developer", "Desenvolvedor Full-Stack Freelancer"),
      company: t("Remote", "Remoto"),
      period: t("2023 – present", "2023 – atual"),
      summary: t(
        "Projects for Web3, climate and community organizations, including work under NDA.",
        "Projetos para organizações de Web3, meio ambiente e comunidades, incluindo trabalhos sob NDA."
      ),
      highlights: [
        t(
          "DeCleanup Network — full-stack developer on a Web3 platform that coordinates and rewards real cleanups, and on its Farcaster mini app; used by 100+ people.",
          "DeCleanup Network — desenvolvedor full-stack de uma plataforma Web3 que coordena e recompensa mutirões de limpeza reais, e do seu mini app para Farcaster; usada por mais de 100 pessoas."
        ),
        t(
          "Fixed production bugs and shipped new features across front-end, back-end and database; reviewed Solidity contracts and built the flows around them.",
          "Corrigi bugs em produção e entreguei novas funcionalidades no front-end, back-end e banco de dados; revisei contratos em Solidity e construí os fluxos ligados a eles."
        ),
        t(
          "Bass Forest and Monthly Earth Day — designed and built both sites solo, from scratch.",
          "Bass Forest e Monthly Earth Day — projetei e desenvolvi os dois sites do zero, sozinho."
        ),
      ],
      tech: ["TypeScript", "React", "Node.js", "Solidity", "Celo", "Farcaster"],
    },
    {
      title: t("Founder & Lead Developer", "Fundador e Desenvolvedor Líder"),
      company: t("BeRegen", "BeRegen"),
      period: t("2023 – present", "2023 – atual"),
      summary: t(
        "Regenerative infrastructure for communities, connecting real-world action, learning, identity, governance and funding, with fieldwork in the Mantiqueira range.",
        "Infraestrutura regenerativa para comunidades, conectando ação no mundo real, aprendizado, identidade, governança e financiamento, com trabalho de campo na Serra da Mantiqueira."
      ),
      highlights: [
        t(
          "Designed and built the ecosystem site and its products: RegenImpactHub (identity and impact validation, beta), RegenFlix (learning with Stripe payments) and BeRegen App (daily practices, MVP).",
          "Projetei e desenvolvi o site do ecossistema e seus produtos: RegenImpactHub (identidade e validação de impacto, em beta), RegenFlix (aprendizado com pagamentos via Stripe) e BeRegen App (práticas diárias, MVP)."
        ),
        t(
          "Created GOPR, an optimistic governance model based on reputation.",
          "Criei o GOPR, um modelo de governança otimista baseado em reputação."
        ),
      ],
      tech: ["TypeScript", "React", "Node.js", "Stripe", "Web3"],
      link: "https://beregen.xyz",
    },
    {
      title: t("Content, Community & Documentation", "Conteúdo, Comunidade e Documentação"),
      company: t(
        "NFTrees Brasil, Greenpill Brasil, ReFi DAO, Beregenerative.life",
        "NFTrees Brasil, Greenpill Brasil, ReFi DAO, Beregenerative.life"
      ),
      period: t("2021 – 2025", "2021 – 2025"),
      summary: t(
        "Web presence and documentation for Web3 and regenerative finance projects.",
        "Presença digital e documentação para projetos de Web3 e finanças regenerativas."
      ),
      highlights: [
        t(
          "Built and maintained blogs and marketing sites for Web3 projects, with SEO.",
          "Construí e mantive blogs e sites de marketing para projetos Web3, com SEO."
        ),
        t(
          "Wrote technical documentation for blockchain platforms and ran their community channels.",
          "Escrevi documentação técnica para plataformas blockchain e gerenciei seus canais de comunidade."
        ),
      ],
      tech: ["CMS", "SEO", "Technical writing"],
    },
  ] as RawJob[],

  previousCareer: [
    {
      title: t("Owner", "Proprietário"),
      company: t("Brincando em Família Ateliê", "Brincando em Família Ateliê"),
      period: t("2019 – 2025", "2019 – 2025"),
      summary: t(
        "Ran the online store, website and digital marketing.",
        "Gestão da loja virtual, do site e do marketing digital."
      ),
      highlights: [],
      tech: [],
    },
    {
      title: t("Train Operator", "Operador de Trem"),
      company: t("Estrada de Ferro Campos do Jordão", "Estrada de Ferro Campos do Jordão"),
      period: t("2015 – 2023", "2015 – 2023"),
      summary: t(
        "Operated and troubleshot electromechanical systems under strict safety protocols.",
        "Operação e solução de falhas em sistemas eletromecânicos sob protocolos rígidos de segurança."
      ),
      highlights: [],
      tech: [],
    },
    {
      title: t("Engineering Assistant", "Assistente de Engenharia"),
      company: t("Zodiac (pharmaceutical)", "Zodiac (farmacêutica)"),
      period: t("2010 – 2014", "2010 – 2014"),
      summary: t(
        "Built cost-control and maintenance-order systems; documented processes.",
        "Criação de sistemas de controle de custos e ordens de manutenção; documentação de processos."
      ),
      highlights: [],
      tech: [],
    },
  ] as RawJob[],

  skills: [
    {
      category: t("Languages", "Linguagens"),
      items: ["TypeScript", "JavaScript", "Python", "Solidity", "SQL", "Java", "Kotlin"],
    },
    {
      category: t("Front-end", "Front-end"),
      items: ["React", "Next.js", "Angular", "Vue", "Tailwind CSS", "HTML", "CSS"],
    },
    {
      category: t("Back-end", "Back-end"),
      items: ["Node.js", "Express", "REST APIs", "Supabase (Auth, RLS)", "Firebase", "Stripe API"],
    },
    {
      category: t("Databases", "Bancos de dados"),
      items: [
        "PostgreSQL",
        "MySQL",
        "SQLite",
        "MongoDB",
        "Firestore",
        t("Browser & local storage", "Armazenamento local e no navegador"),
      ],
    },
    {
      category: t("Web3", "Web3"),
      items: [
        "Solidity",
        "EVM (Ethereum, Celo)",
        "Solana",
        "Ethers.js",
        "Web3.js",
        "Account abstraction",
        t("Farcaster mini apps", "Mini apps para Farcaster"),
      ],
    },
    {
      category: t("Automation & AI", "Automação e IA"),
      items: ["n8n", "Zapier", "Kommo CRM", "Streamlit", "LangChain", t("LLM APIs", "APIs de LLM")],
    },
    {
      category: t("Tools", "Ferramentas"),
      items: [
        "Git & GitHub",
        t("Linux (daily driver)", "Linux (uso diário)"),
        "Netlify",
        "Vercel",
        "Docker",
        "GCP",
        t("AI-assisted dev (Claude, Cursor, Copilot)", "Desenvolvimento assistido por IA (Claude, Cursor, Copilot)"),
      ],
    },
  ] as { category: Text; items: (string | Text)[] }[],

  education: [
    { title: t("BSc in Production Engineering", "Bacharelado em Engenharia de Produção"), school: t("FUNVIC", "FUNVIC"), year: "2015" },
    {
      title: t("Blockchain Developer with Solidity", "Blockchain Developer with Solidity"),
      school: t("DIO × Binance bootcamp", "Bootcamp DIO × Binance"),
      year: "2025",
    },
    {
      title: t("CS50", "CS50"),
      school: t("Harvard, plus freeCodeCamp and DIO tracks", "Harvard, além de freeCodeCamp e trilhas da DIO"),
      year: "",
    },
  ],

  languages: [t("Portuguese (native)", "Português (nativo)"), t("English (advanced)", "Inglês (avançado)")],
};

interface RawProject {
  /** Used for the screenshot file name in public/projects/. */
  slug: string;
  title: string;
  description: Text;
  tech: string[];
  category: ProjectCategory;
  status: ProjectStatus;
  /** Who it was built for, e.g. client, own product, hackathon. */
  context: Text;
  live?: string;
  repo?: string;
  featured?: boolean;
}

interface RawJob {
  title: Text;
  company: Text;
  period: Text;
  summary: Text;
  highlights: Text[];
  tech: string[];
  link?: string;
}

/** The type of `X` with every translatable Text replaced by a plain string. */
type Localized<X> = X extends Text
  ? string
  : X extends readonly (infer U)[]
    ? Localized<U>[]
    : X extends object
      ? { [K in keyof X]: Localized<X[K]> }
      : X;

const isText = (value: unknown): value is Text =>
  typeof value === "object" &&
  value !== null &&
  !Array.isArray(value) &&
  Object.keys(value).length === 2 &&
  typeof (value as Text).en === "string" &&
  typeof (value as Text).pt === "string";

function resolve<X>(value: X, locale: Locale): Localized<X> {
  if (isText(value)) return value[locale] as Localized<X>;
  if (Array.isArray(value)) return value.map((v) => resolve(v, locale)) as Localized<X>;
  if (typeof value === "object" && value !== null) {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, resolve(v, locale)])
    ) as Localized<X>;
  }
  return value as Localized<X>;
}

export type Content = Localized<typeof raw> & {
  stats: { label: string; value: number; suffix: string }[];
};
export type Project = Content["projects"][number];
export type Job = Content["experience"][number];

const cache = new Map<Locale, Content>();

/** Everything the site says, in one language. */
export function getContent(locale: Locale): Content {
  const cached = cache.get(locale);
  if (cached) return cached;

  const content = resolve(raw, locale);
  const live = raw.projects.filter((p) => p.status === "live").length;
  const labels =
    locale === "pt"
      ? ["Projetos entregues", "Anos de trabalho com clientes", "Pessoas usando o DeCleanup", "Apps em produção"]
      : ["Projects delivered", "Years of client work", "People using DeCleanup", "Apps live in production"];
  const values = [20, new Date().getFullYear() - raw.profile.freelanceSince, 100, live];
  const suffixes = ["+", "+", "+", ""];

  const result: Content = {
    ...content,
    stats: labels.map((label, i) => ({ label, value: values[i], suffix: suffixes[i] })),
  };
  cache.set(locale, result);
  return result;
}

// English exports, used by the Matrix version.
const en = getContent("en");
export const { profile, contact, services, projects, categoryLabels, statusLabels, experience, previousCareer, education, languages, stats } = en;
export const skills: Record<string, string[]> = Object.fromEntries(
  en.skills.map((group) => [group.category, group.items])
);
