import { getContent, type Locale } from "@/data/portfolio";
import { getDictionary } from "@/data/ui";
import HorizontalTrack from "./HorizontalTrack";
import { Letters, TextLink } from "./ui";

/**
 * Experience as a train ride: the page pins and the jobs pass from right to
 * left along a rail. Each job is a station that lights up as it reaches the
 * middle; the rail line fills as the ride goes on.
 */
export default function Experience({ lang }: { lang: Locale }) {
  const { experience, previousCareer } = getContent(lang);
  const d = getDictionary(lang).experience;

  const rail = (
    <div aria-hidden className="hz-rail relative mb-10 h-[2px] w-full shrink-0 bg-line">
      <div className="h-full origin-left bg-signal" style={{ transform: "scaleX(var(--p, 0))" }} />
    </div>
  );

  const station =
    "hz-station absolute -top-[51px] left-6 h-5 w-5 rounded-full border-2 border-line bg-mist transition-colors duration-500 group-data-[passed=true]:border-signal group-data-[passed=true]:bg-signal sm:left-9";

  return (
    <section id="experience" aria-labelledby="experience-title" data-tone="light" className="relative bg-mist text-ink">
      <HorizontalTrack rail={rail}>
        {/* The departure board: the giant title. It drops in from above the centre. */}
        <div data-hz-title className="hz-card flex w-[min(80vw,30rem)] shrink-0 flex-col justify-center">
          <h2
            id="experience-title"
            data-reveal="condense"
            aria-label={d.title}
            className="text-[clamp(3.25rem,10vw,9rem)] font-extrabold leading-[0.9] tracking-[-0.03em] [font-stretch:76%]"
          >
            <Letters text={d.title} />
          </h2>
        </div>

        {experience.map((job) => (
          <article
            key={job.title}
            data-station
            className="hz-card group relative w-[min(84vw,38rem)] shrink-0 rounded-[1.75rem] bg-surface p-6 ring-1 ring-line/70 sm:p-9"
          >
            <span aria-hidden className={station} />
            <p className="text-sm font-medium tabular-nums text-lichen">{job.period}</p>
            <h3 className="mt-2 text-[clamp(1.6rem,3vw,2.25rem)] font-extrabold leading-tight [font-stretch:80%]">
              {job.title}
            </h3>
            <p className="mt-1 font-medium text-pine">
              {job.link ? <TextLink href={job.link}>{job.company}</TextLink> : job.company}
            </p>
            <p className="mt-4 leading-relaxed">{job.summary}</p>
            <ul className="mt-4 space-y-2">
              {job.highlights.map((h) => (
                <li key={h} className="relative pl-5 text-[15px] leading-relaxed text-ink/85 sm:text-base">
                  <span className="absolute left-0 top-[0.7em] h-1.5 w-1.5 rounded-full bg-pine" aria-hidden />
                  {h}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-lichen">{job.tech.join(", ")}</p>
          </article>
        ))}

        {/* Earlier stops on the line. In the next section's colour: it grows to fill the screen on the way out. */}
        <article
          data-station
          data-exit-card
          data-tone="dark"
          className="hz-card group relative z-10 w-[min(84vw,44rem)] shrink-0 rounded-[1.75rem] bg-mist p-6 text-ink sm:p-9"
        >
          {/* On the way out this layer takes over the card's colour: it rounds into a
              circle and grows over the other cards until it fills the screen. */}
          <div
            aria-hidden
            data-exit-bloom
            data-progress="manual"
            data-cover="0.5"
            className="pointer-events-none invisible absolute bg-mist"
          />
          <span aria-hidden className={station} />
          <div data-exit-content className="relative origin-center">
          <h3 className="text-[clamp(1.6rem,3vw,2.25rem)] font-extrabold leading-tight [font-stretch:80%]">{d.beforeTech}</h3>
          <p className="mt-2 max-w-prose leading-relaxed text-lichen">{d.beforeTechIntro}</p>
          <ol className="mt-6 grid gap-6 sm:grid-cols-3">
            {previousCareer.map((job) => (
              <li key={job.title}>
                <p className="text-sm tabular-nums text-lichen">{job.period}</p>
                <h4 className="mt-1 font-semibold leading-snug">{job.title}</h4>
                <p className="text-sm text-pine">{job.company}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink/80">{job.summary}</p>
              </li>
            ))}
          </ol>
          </div>
        </article>
      </HorizontalTrack>
    </section>
  );
}
