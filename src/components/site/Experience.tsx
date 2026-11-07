import { getContent, type Locale } from "@/data/portfolio";
import { getDictionary } from "@/data/ui";
import { Section, TextLink } from "./ui";

export default function Experience({ lang }: { lang: Locale }) {
  const { experience, previousCareer } = getContent(lang);
  const d = getDictionary(lang).experience;

  return (
    <Section id="experience" title={d.title}>
      <ol>
        {experience.map((job) => (
          <li
            key={job.title}
            className="grid gap-3 border-t border-line py-10 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-10"
          >
            <p className="font-medium tabular-nums text-lichen">{job.period}</p>
            <div className="max-w-prose">
              <h3 className="text-2xl font-bold leading-tight [font-stretch:85%]">{job.title}</h3>
              <p className="mt-1 font-medium text-pine">
                {job.link ? <TextLink href={job.link}>{job.company}</TextLink> : job.company}
              </p>
              <p className="mt-4 leading-relaxed">{job.summary}</p>
              <ul className="mt-4 space-y-2">
                {job.highlights.map((h) => (
                  <li key={h} className="relative pl-5 leading-relaxed text-ink/85">
                    <span className="absolute left-0 top-[0.7em] h-1.5 w-1.5 rounded-full bg-pine" aria-hidden />
                    {h}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-lichen">{job.tech.join(", ")}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-8 rounded-2xl bg-surface p-6 ring-1 ring-line sm:p-10">
        <h3 className="text-2xl font-bold [font-stretch:85%]">{d.beforeTech}</h3>
        <p className="mt-2 max-w-prose leading-relaxed text-lichen">{d.beforeTechIntro}</p>
        <ol className="mt-8 grid gap-8 md:grid-cols-3">
          {previousCareer.map((job) => (
            <li key={job.title}>
              <p className="text-sm tabular-nums text-lichen">{job.period}</p>
              <h4 className="mt-1 text-lg font-semibold leading-snug">{job.title}</h4>
              <p className="text-pine">{job.company}</p>
              <p className="mt-2 text-[15px] leading-relaxed text-ink/80">{job.summary}</p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
