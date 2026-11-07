# Jorge Cristo — Developer Portfolio

Personal portfolio of **Jorge Cristo**, freelance full-stack developer (bug fixing & app rescue, Web3 / Solidity, AI integrations).

🌐 **Live:** [jcdevportfolio.netlify.app](https://jcdevportfolio.netlify.app) · 📄 [CV](https://j-c-fstk-dev.github.io/cvs/) · 📝 [Blog](https://finecoding.netlify.app)

The site is available in English at `/` and in Portuguese at `/pt`, and has two faces:

- **Standard portfolio**: the default view. A single page rendered on the server, with a light
  and a dark theme that follow the visitor's system setting.
- **Matrix mode**: an opt-in terminal-style version, loaded only when someone asks for it. Open it
  with the 💊 button in the footer, by typing `matrix` anywhere on the page, or with `#matrix` at
  the end of the URL. The entrance plays a broken build being diagnosed and fixed (any key skips
  it, and it plays once per session); Escape goes back to where you were on the standard site.
  Sound effects are optional and off by default.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS

## Editing the content

All the content (profile, services, projects, experience, skills, education) lives in
[`src/data/portfolio.ts`](src/data/portfolio.ts). Text that changes with the language is written as
`t("English", "Português")`. Interface text (buttons, headings, form labels) is in
[`src/data/ui.ts`](src/data/ui.ts). Both versions of the site read from these files, so adding a
project or updating a job only needs a change there.

## Project screenshots

Featured projects show a screenshot once one exists in `public/projects/<slug>.jpg`. To capture
them from the live sites:

```bash
npx playwright install chromium
```

```bash
npm run screenshots
```

Pass slugs to capture only some projects, e.g. `npm run screenshots -- bass-forest beregen`. The
script also updates `src/data/screenshots.json`, which tells the site which images exist. Commit
both.

## Contact form

The form posts to Netlify Forms. Netlify detects it
from `public/__forms.html` at deploy time; turn on **form detection** in the Netlify dashboard
(Forms) once, and set up an email notification there to receive messages in your inbox. If sending
fails, the form shows the email address instead.

## Recently on GitHub

The work section lists the most recently pushed public repositories that are not already listed as
projects. The data is fetched from the GitHub API and refreshed once a day. Optionally set
`GITHUB_TOKEN` in the Netlify environment to raise the API rate limit; without it the section still
works, and it hides itself if GitHub can't be reached.

## Running locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run screenshots` | Capture project screenshots (see above) |

## Project structure

```
src/
  app/[lang]/   layout (metadata, SEO, fonts) and page, per language
  app/          robots.txt, sitemap.xml
  components/
    site/       the standard single-page portfolio (header, hero, work, experience, about, contact)
    matrix/     the Matrix version, loaded on demand
  data/         portfolio.ts (content), ui.ts (interface text), screenshots.json
  lib/          github.ts: recent repositories from the GitHub API
scripts/        capture-screenshots.mts
public/         __forms.html (Netlify Forms), projects/ (screenshots)
```
