import type { Locale } from "@/data/portfolio";
import type { Dictionary } from "@/data/ui";
import type { Repo } from "@/lib/github";
import { TextLink } from "./ui";

export default function RecentRepos({
  repos,
  lang,
  d,
  allReposUrl,
}: {
  repos: Repo[];
  lang: Locale;
  d: Dictionary["github"];
  allReposUrl: string;
}) {
  const date = new Intl.DateTimeFormat(lang === "pt" ? "pt-BR" : "en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

  return (
    <div className="mt-20">
      <h3 className="text-2xl font-bold [font-stretch:85%]">{d.title}</h3>
      <p className="mt-2 text-lichen">{d.intro}</p>
      <ul className="mt-6 grid gap-x-10 md:grid-cols-2 lg:grid-cols-3">
        {repos.map((repo) => (
          <li key={repo.name} className="border-t border-line py-5">
            <h4 className="text-lg font-semibold">
              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="break-words underline decoration-transparent decoration-2 underline-offset-4 transition-[text-decoration-color] hover:decoration-signal"
              >
                {repo.name}
              </a>
            </h4>
            {repo.description && <p className="mt-1 leading-relaxed text-lichen">{repo.description}</p>}
            <p className="mt-2 flex flex-wrap gap-x-4 text-sm text-lichen">
              {repo.language && <span className="font-medium text-ink/80">{repo.language}</span>}
              <span>
                {d.updated} <time dateTime={repo.pushedAt}>{date.format(new Date(repo.pushedAt))}</time>
              </span>
              {repo.stars > 0 && <span>{d.stars(repo.stars)}</span>}
            </p>
          </li>
        ))}
      </ul>
      <p className="mt-6">
        <TextLink href={allReposUrl}>{d.viewAll}</TextLink>
      </p>
    </div>
  );
}
