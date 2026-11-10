import Image from "next/image";
import { getContent, type Locale, type Project } from "@/data/portfolio";
import screenshots from "@/data/screenshots.json";
import { getDictionary, type Dictionary } from "@/data/ui";
import { getRecentRepos } from "@/lib/github";
import Expandable from "./Expandable";
import MoreProjects from "./MoreProjects";
import RecentRepos from "./RecentRepos";
import { Section, TextLink } from "./ui";

/** Slugs with a captured screenshot in public/projects/ (see scripts/capture-screenshots.mts). */
const withScreenshot = new Set<string>(screenshots);

/**
 * A featured project after the stacked deck: a card that flies in from off
 * screen as it scrolls into view, from the left or the right in turn, and
 * settles on its own side of a zig-zag. Tied to the scroll (--p), not a timer.
 * Without motion --p is unset and the card simply sits in place.
 */
function FlyCard({ project, index, lang, d }: { project: Project; index: number; lang: Locale; d: Dictionary["work"] }) {
  const { statusLabels } = getContent(lang);
  const shot = withScreenshot.has(project.slug);
  const from = index % 2 === 0 ? -1 : 1;
  // 0 → 1 as the card travels in during the first third of its pass through the screen.
  const k = "clamp(0, var(--p, 1) * 3.2, 1)";
  const left = `calc(1 - ${k})`;

  return (
    <li
      data-progress="through"
      className={`flex ${from < 0 ? "justify-start" : "justify-end"}`}
    >
      <article
        data-panel={PANEL_COLOURS[(index + DECK_SIZE) % PANEL_COLOURS.length]}
        className="w-full rounded-[1.75rem] bg-ink p-6 text-mist shadow-[0_18px_40px_-24px_rgb(0_0_0/0.5)] will-change-transform sm:w-[78%] sm:p-9"
        style={{
          transform: `translateX(calc(${from} * ${left} * ${left} * 110vw)) rotate(calc(${from} * ${left} * 7deg))`,
        }}
      >
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
          <span className="font-medium">{project.context}</span>
          <span className="inline-flex items-center gap-2 text-mist/70">
            <span
              className={`h-2 w-2 rounded-full ${project.status === "live" ? "bg-signal" : "border-[1.5px] border-mist/60"}`}
              aria-hidden
            />
            {statusLabels[project.status]}
          </span>
        </div>
        <h3 className="mt-3 text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold leading-[0.95] tracking-[-0.02em] [font-stretch:76%]">
          {project.title}
        </h3>
        {shot && (
          <Image
            src={`/projects/${project.slug}.jpg`}
            alt={d.screenshotAlt(project.title)}
            width={1280}
            height={800}
            sizes="(min-width: 640px) 60vw, 100vw"
            className="mt-5 aspect-[16/10] w-full rounded-xl object-cover object-top"
          />
        )}
        <p className="mt-4 max-w-prose text-lg leading-relaxed text-mist/90">{project.description}</p>
        <p className="mt-3 text-sm text-mist/60">{project.tech.join(", ")}</p>
        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1">
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className={deckLink}>
              {d.visitSite}
            </a>
          )}
          {project.repo && (
            <a href={project.repo} target="_blank" rel="noopener noreferrer" className={deckLink}>
              {d.sourceCode}
            </a>
          )}
        </div>
      </article>
    </li>
  );
}

/** How many featured projects get the stacked full-width panel treatment. */
const DECK_SIZE = 6;

/** Stacked panels cycle through these colours (see [data-panel] in globals.css). */
const PANEL_COLOURS = ["mist", "amber", "mint"] as const;

const deckLink =
  "font-medium text-mist underline decoration-signal/60 decoration-2 underline-offset-4 transition-[text-decoration-color] hover:decoration-signal";

/**
 * A featured project as a dark panel that sticks to the top while the next
 * one slides over it, building a stack as the visitor scrolls.
 */
function DeckPanel({
  project,
  index,
  lang,
  d,
}: {
  project: Project;
  index: number;
  lang: Locale;
  d: Dictionary["work"];
}) {
  const { statusLabels } = getContent(lang);
  const shot = withScreenshot.has(project.slug);

  return (
    <li
      className="sticky mb-[10vh] last:mb-0"
      style={{ top: `calc(5rem + ${index * 14}px)` }}
    >
      <article
        data-panel={PANEL_COLOURS[index % PANEL_COLOURS.length]}
        className="relative overflow-hidden rounded-[1.75rem] bg-ink p-6 text-mist shadow-[0_-18px_40px_-20px_rgb(0_0_0/0.45)] sm:p-10"
      >
        <div className="flex items-start justify-between gap-6">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
            <span className="font-medium">{project.context}</span>
            <span className="inline-flex items-center gap-2 text-mist/70">
              <span
                className={`h-2 w-2 rounded-full ${project.status === "live" ? "bg-signal" : "border-[1.5px] border-mist/60"}`}
                aria-hidden
              />
              {statusLabels[project.status]}
            </span>
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] md:gap-12">
          <div>
            <h3 className="text-[clamp(2.4rem,6vw,4.75rem)] font-extrabold leading-[0.95] tracking-[-0.02em] [font-stretch:76%]">
              {project.title}
            </h3>
            {shot && (
              <Image
                src={`/projects/${project.slug}.jpg`}
                alt={d.screenshotAlt(project.title)}
                width={1280}
                height={800}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="mt-6 aspect-[16/10] w-full rounded-xl object-cover object-top"
              />
            )}
          </div>
          <div className="self-end">
            <p className="text-lg leading-relaxed text-mist/90">{project.description}</p>
            <p className="mt-3 text-sm text-mist/60">{project.tech.join(", ")}</p>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1">
              {project.live && (
                <a href={project.live} target="_blank" rel="noopener noreferrer" className={deckLink}>
                  {d.visitSite}
                </a>
              )}
              {project.repo && (
                <a href={project.repo} target="_blank" rel="noopener noreferrer" className={deckLink}>
                  {d.sourceCode}
                </a>
              )}
            </div>
          </div>
        </div>
      </article>
    </li>
  );
}

export default async function Work({ lang }: { lang: Locale }) {
  const { projects, contact, categoryLabels, statusLabels } = getContent(lang);
  const dict = getDictionary(lang);
  const d = dict.work;
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  // Skip repos already shown above, and the profile README repo.
  const listed = projects
    .map((p) => p.repo?.match(new RegExp(`github\\.com/${contact.githubHandle}/([^/]+)`, "i"))?.[1])
    .filter((name): name is string => Boolean(name));
  const repos = await getRecentRepos(contact.githubHandle, { exclude: [...listed, contact.githubHandle] });

  return (
    <Section id="work" title={d.title} intro={d.intro} tone="dark">
      <ol>
        {featured.slice(0, DECK_SIZE).map((project, i) => (
          <DeckPanel key={project.slug} project={project} index={i} lang={lang} d={d} />
        ))}
      </ol>

      {featured.length > DECK_SIZE && (
        <ul className="mt-20 space-y-10 overflow-x-clip sm:space-y-14">
          {featured.slice(DECK_SIZE).map((project, i) => (
            <FlyCard key={project.slug} project={project} index={i} lang={lang} d={d} />
          ))}
        </ul>
      )}

      {/* Everything else stays folded away until the visitor asks for it. */}
      <Expandable
        className="mt-24"
        openLabel={d.exploreMore(others.length)}
        closeLabel={d.showLess}
      >
        <h3 className="text-2xl font-bold [font-stretch:85%]">{d.moreTitle}</h3>
        <p className="mt-2 text-lichen">
          {d.moreIntro} <TextLink href={`${contact.github}?tab=repositories`}>GitHub</TextLink>.
        </p>
        <MoreProjects
          projects={others}
          categoryLabels={categoryLabels}
          statusLabels={statusLabels}
          labels={{ all: d.all, filter: d.filterLabel, sourceCode: d.sourceCode }}
        />
        {repos.length > 0 && (
          <RecentRepos repos={repos} lang={lang} d={dict.github} allReposUrl={`${contact.github}?tab=repositories`} />
        )}
      </Expandable>
    </Section>
  );
}
