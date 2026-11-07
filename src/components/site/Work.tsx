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
    <Section id="work" title={d.title} intro={d.intro}>
      <ul className="border-b border-line">
        {featured.map((project) => (
          <FeaturedRow key={project.slug} project={project} lang={lang} d={d} />
        ))}
      </ul>

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
