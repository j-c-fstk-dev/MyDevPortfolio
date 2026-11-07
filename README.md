# Jorge Cristo — Developer Portfolio

Personal portfolio of **Jorge Cristo**, freelance full-stack developer (bug fixing & app rescue, Web3 / Solidity, AI integrations).

🌐 **Live:** [jcdevportfolio.netlify.app](https://jcdevportfolio.netlify.app) · 📄 [CV](https://j-c-fstk-dev.github.io/cvs/) · 📝 [Blog](https://finecoding.netlify.app)

The site has two faces:

- **Standard portfolio**: the default view, rendered on the server so visitors and search engines see the content right away.
- **Matrix mode**: an opt-in terminal-style version. Click **💊 Enter the Matrix** and take the red pill.

## Stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS

## Editing the content

All the content (profile, services, projects, experience, skills, education) lives in
[`src/data/portfolio.ts`](src/data/portfolio.ts). Both versions of the site read from that file,
so adding a project or updating a job only needs a change there.

## Running locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server with Turbopack |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |

## Project structure

```
src/
  app/          layout (metadata, SEO, fonts), page, robots.txt, sitemap.xml
  components/   NormalPortfolio, ContactForm and the Matrix sections
  data/         portfolio.ts: the site's content
```
