import type { Locale } from "./portfolio";

/** Interface text (labels, buttons, headings) for each language. */
const dictionaries = {
  en: {
    meta: {
      description:
        "Freelance full-stack developer in Brazil. Bug fixing and app rescue for React, Next.js and Node apps, Web3 and Solidity, AI integrations.",
    },
    skipToContent: "Skip to content",
    nav: { work: "Work", experience: "Experience", about: "About", contact: "Contact", label: "Main" },
    switchLanguage: { label: "Português", title: "Ver o site em português" },
    hero: { emailMe: "Email me", seeWork: "See the work", howJobRuns: "How a job runs" },
    services: { title: "What I can help with" },
    work: {
      title: "Selected work",
      intro: "Production apps for clients and my own products, mostly for Web3, climate and community projects.",
      visitSite: "Visit site",
      sourceCode: "Source code",
      screenshotAlt: (title: string) => `Screenshot of ${title}`,
      moreTitle: "More projects",
      moreIntro: "Recent experiments, hackathon entries and products in progress. Everything else is on",
      all: "All",
      filterLabel: "Filter projects",
    },
    github: {
      title: "Recently on GitHub",
      intro: "The repositories I pushed to most recently, pulled from GitHub once a day.",
      updated: "Updated",
      stars: (n: number) => `${n} ${n === 1 ? "star" : "stars"}`,
      viewAll: "See all repositories",
    },
    experience: {
      title: "Experience",
      beforeTech: "Before tech",
      beforeTechIntro:
        "Production engineering, a mountain railway and my own shop. That's where I learned to troubleshoot under pressure and to document what I change.",
    },
    about: {
      title: "About",
      photoAlt: (name: string) => `Portrait of ${name}`,
      sideProjects: ["Outside client work I run", "regenerative infrastructure for communities in the Mantiqueira range, and write on"],
      tools: "Tools I use",
      education: "Education",
      languages: "Languages",
    },
    contact: {
      title: "Tell me what's broken",
      intro:
        "Or what you want to build. Describe the problem and send a link to the repo if you can; I usually reply within a day.",
      channels: {
        whatsapp: ["WhatsApp", "Send a message"],
        github: ["GitHub", ""],
        cv: ["CV", "Read my CV"],
        support: ["Support", "Buy me a coffee on Ko-fi"],
      },
      form: {
        name: "Your name",
        namePlaceholder: "Ana Souza",
        email: "Your email",
        emailPlaceholder: "ana@company.com",
        message: "What's going on?",
        messagePlaceholder: "The app deploys but login fails on production…",
        submit: "Send message",
        sending: "Sending…",
        sent: "Message sent. I'll reply by email, usually within a day.",
        failed: "The message didn't go through. Please email me directly at",
      },
    },
    footer: { builtWith: "Built with Next.js and Tailwind CSS.", matrix: "Prefer the Matrix version?" },
  },
  pt: {
    meta: {
      description:
        "Desenvolvedor full-stack freelancer no Brasil. Correção de bugs e resgate de apps em React, Next.js e Node, Web3 e Solidity, integrações de IA.",
    },
    skipToContent: "Pular para o conteúdo",
    nav: { work: "Projetos", experience: "Experiência", about: "Sobre", contact: "Contato", label: "Principal" },
    switchLanguage: { label: "English", title: "View the site in English" },
    hero: { emailMe: "Me mande um e-mail", seeWork: "Ver projetos", howJobRuns: "Como funciona um trabalho" },
    services: { title: "Como posso ajudar" },
    work: {
      title: "Projetos em destaque",
      intro:
        "Apps em produção para clientes e produtos próprios, a maioria para projetos de Web3, meio ambiente e comunidades.",
      visitSite: "Ver site",
      sourceCode: "Código-fonte",
      screenshotAlt: (title: string) => `Captura de tela do ${title}`,
      moreTitle: "Mais projetos",
      moreIntro: "Experimentos recentes, projetos de hackathon e produtos em andamento. O resto está no",
      all: "Todos",
      filterLabel: "Filtrar projetos",
    },
    github: {
      title: "Recentemente no GitHub",
      intro: "Os repositórios em que mexi por último, puxados do GitHub uma vez por dia.",
      updated: "Atualizado em",
      stars: (n: number) => `${n} ${n === 1 ? "estrela" : "estrelas"}`,
      viewAll: "Ver todos os repositórios",
    },
    experience: {
      title: "Experiência",
      beforeTech: "Antes da tecnologia",
      beforeTechIntro:
        "Engenharia de produção, uma ferrovia de montanha e minha própria loja. Foi ali que aprendi a resolver problemas sob pressão e a documentar o que eu mudo.",
    },
    about: {
      title: "Sobre",
      photoAlt: (name: string) => `Retrato de ${name}`,
      sideProjects: ["Fora dos projetos para clientes, toco a", "infraestrutura regenerativa para comunidades na Serra da Mantiqueira, e escrevo no"],
      tools: "Ferramentas que uso",
      education: "Formação",
      languages: "Idiomas",
    },
    contact: {
      title: "Me conte o que quebrou",
      intro:
        "Ou o que você quer construir. Descreva o problema e mande o link do repositório, se puder; normalmente respondo em até um dia.",
      channels: {
        whatsapp: ["WhatsApp", "Mandar mensagem"],
        github: ["GitHub", ""],
        cv: ["Currículo", "Ver meu currículo"],
        support: ["Apoio", "Me pague um café no Ko-fi"],
      },
      form: {
        name: "Seu nome",
        namePlaceholder: "Ana Souza",
        email: "Seu e-mail",
        emailPlaceholder: "ana@empresa.com.br",
        message: "O que está acontecendo?",
        messagePlaceholder: "O app sobe, mas o login falha em produção…",
        submit: "Enviar mensagem",
        sending: "Enviando…",
        sent: "Mensagem enviada. Respondo por e-mail, normalmente em até um dia.",
        failed: "A mensagem não foi enviada. Escreva direto para",
      },
    },
    footer: { builtWith: "Feito com Next.js e Tailwind CSS.", matrix: "Prefere a versão Matrix?" },
  },
} satisfies Record<Locale, unknown>;

export type Dictionary = (typeof dictionaries)["en"];

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale];
