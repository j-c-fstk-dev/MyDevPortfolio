import type { Locale } from "./portfolio";

/** Interface text (labels, buttons, headings) for each language. */
const dictionaries = {
  en: {
    meta: {
      description:
        "Freelance full-stack developer in Brazil. Bug fixing and app rescue for React, Next.js and Node apps, Web3 and Solidity, AI integrations.",
    },
    skipToContent: "Skip to content",
    nav: { start: "Start", work: "Work", experience: "Experience", about: "About", contact: "Contact", label: "Main", track: "Page sections" },
    switchLanguage: { label: "Português", title: "Ver o site em português" },
    hero: { startProject: "Tell me about your project", seeWork: "See the work", howJobRuns: "How a job runs" },
    services: { title: "What I can help with" },
    work: {
      title: "Selected work",
      intro: "Client work and my own products: Web3 platforms, AI apps, web sites and desktop tools.",
      visitSite: "Visit site",
      sourceCode: "Source code",
      openSource: "Open source",
      screenshotAlt: (title: string) => `Screenshot of ${title}`,
      moreTitle: "More projects",
      moreIntro: "Recent experiments, hackathon entries and products in progress. Everything else is on",
      all: "All",
      filterLabel: "Filter projects",
      exploreMore: (n: number) => `Explore ${n} other projects`,
      showLess: "Show fewer projects",
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
      title: "Let’s talk about your project",
      intro:
        "Have a bug to fix, a feature to ship or a workflow to automate? Tell me where you need help.",
      channels: {
        title: "Other ways to reach me",
        email: "Email",
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
        message: "What do you need help with?",
        repo: "Repository or app link (optional)",
        messagePlaceholder: "The app deploys but login fails on production…",
        submit: "Send message",
        sending: "Sending…",
        sentTitle: "Message sent!",
        sent: "Thanks for reaching out. I'll get back to you by email soon.",
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
    nav: { start: "Início", work: "Projetos", experience: "Experiência", about: "Sobre", contact: "Contato", label: "Principal", track: "Seções da página" },
    switchLanguage: { label: "English", title: "View the site in English" },
    hero: { startProject: "Me conte sobre seu projeto", seeWork: "Ver projetos", howJobRuns: "Como funciona um trabalho" },
    services: { title: "Como posso ajudar" },
    work: {
      title: "Projetos em destaque",
      intro: "Trabalhos para clientes e produtos próprios: plataformas Web3, apps de IA, sites e ferramentas para desktop.",
      visitSite: "Ver site",
      sourceCode: "Código-fonte",
      openSource: "Código aberto",
      screenshotAlt: (title: string) => `Captura de tela do ${title}`,
      moreTitle: "Mais projetos",
      moreIntro: "Experimentos recentes, projetos de hackathon e produtos em andamento. O resto está no",
      all: "Todos",
      filterLabel: "Filtrar projetos",
      exploreMore: (n: number) => `Explorar outros ${n} projetos`,
      showLess: "Mostrar menos projetos",
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
      title: "Vamos falar sobre seu projeto",
      intro:
        "Tem um bug pra resolver, uma feature pra entregar ou uma automação pra montar? Me conta onde você precisa de ajuda.",
      channels: {
        title: "Outros canais",
        email: "E-mail",
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
        message: "Em que você precisa de ajuda?",
        repo: "Link do repositório ou app (opcional)",
        messagePlaceholder: "O app sobe, mas o login falha em produção…",
        submit: "Enviar mensagem",
        sending: "Enviando…",
        sentTitle: "Mensagem enviada!",
        sent: "Obrigado pelo contato. Respondo por e-mail em breve.",
        failed: "A mensagem não foi enviada. Escreva direto para",
      },
    },
    footer: { builtWith: "Feito com Next.js e Tailwind CSS.", matrix: "Prefere a versão Matrix?" },
  },
} satisfies Record<Locale, unknown>;

export type Dictionary = (typeof dictionaries)["en"];

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale];
