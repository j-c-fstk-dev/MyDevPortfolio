import Image from "next/image";
import { getContent, type Locale, type Project } from "@/data/portfolio";
import screenshots from "@/data/screenshots.json";
import { getDictionary, type Dictionary } from "@/data/ui";
import { getRecentRepos } from "@/lib/github";
import MoreProjects from "./MoreProjects";
import RecentRepos from "./RecentRepos";
import { Section, TextLink } from "./ui";

/** Slugs with a captured screenshot in public/projects/ (see scripts/capture-screenshots.mts). */
const withScreenshot = new Set<string>(screenshots);

export function StatusMark({ status, label }: { status: Project["status"]; label: string }) {
  const live = status === "live";
  return (
    <span className="inline-flex items-center gap-2 text-sm text-lichen">
      <span className={`h-2 w-2 rounded-full ${live ? "bg-pine" : "border-[1.5px] border-lichen"}`} aria-hidden />
      {label}
    </span>
  );
}

function FeaturedRow({ project, lang, d }: { project: Project; lang: Locale; d: Dictionary["work"] }) {
  const { statusLabels } = getContent(lang);
  const shot = withScreenshot.has(project.slug);

  return (
    <li className="grid gap-4 border-t border-line py-8 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-10">
      <div>
        <h3 className="text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold leading-[1.05] tracking-[-0.02em] [font-stretch:80%]">
          {project.title}
        </h3>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
          <span className="text-sm font-medium">{project.context}</span>
          <StatusMark status={project.status} label={statusLabels[project.status]} />
        </div>
        {shot && (
          <a
            href={project.live ?? project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 block overflow-hidden rounded-xl ring-1 ring-line transition-shadow hover:ring-pine/50"
          >
            <Image
              src={`/projects/${project.slug}.jpg`}
              alt={d.screenshotAlt(project.title)}
              width={1280}
              height={800}
              sizes="(min-width: 1024px) 440px, (min-width: 768px) 40vw, 100vw"
              className="aspect-[16/10] w-full object-cover object-top"
            />
          </a>
        )}
      </div>
      <div className="max-w-prose">
        <p className="text-lg leading-relaxed">{project.description}</p>
        <p className="mt-3 text-sm text-lichen">{project.tech.join(", ")}</p>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1">
          {project.live && <TextLink href={project.live}>{d.visitSite}</TextLink>}
          {project.repo && <TextLink href={project.repo}>{d.sourceCode}</TextLink>}
        </div>
      </div>
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
        <ul className="mt-16 border-b border-line">
          {featured.slice(DECK_SIZE).map((project) => (
            <FeaturedRow key={project.slug} project={project} lang={lang} d={d} />
          ))}
        </ul>
      )}

      <div className="mt-20">
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
      </div>

      {repos.length > 0 && (
        <RecentRepos repos={repos} lang={lang} d={dict.github} allReposUrl={`${contact.github}?tab=repositories`} />
      )}
    </Section>
  );
}
