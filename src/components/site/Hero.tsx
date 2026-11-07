import { getContent, type Locale } from "@/data/portfolio";
import { getDictionary } from "@/data/ui";
import { buttonPrimary, buttonSecondary, container } from "./ui";

export default function Hero({ lang }: { lang: Locale }) {
  const { profile, contact, process } = getContent(lang);
  const d = getDictionary(lang).hero;

  return (
    <section id="top" className="pb-20 pt-14 sm:pb-28 sm:pt-24">
      <div className={container}>
        <h1 className="text-[clamp(3rem,9.5vw,8rem)] font-extrabold leading-[0.95] tracking-[-0.015em] [font-stretch:78%]">
          {profile.headline.map((line, i) => (
            <span key={line} className="rise-in block" style={{ animationDelay: `${i * 140}ms` }}>
              {line}
            </span>
          ))}
        </h1>

        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-20">
          <div className="max-w-prose">
            <p className="text-xl leading-relaxed text-ink/90">{profile.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={`mailto:${contact.email}`} className={buttonPrimary}>
                {d.emailMe}
              </a>
              <a href="#work" className={buttonSecondary}>
                {d.seeWork}
              </a>
            </div>
            <p className="mt-8 flex items-center gap-3 text-lichen">
              <span className="relative flex h-2.5 w-2.5" aria-hidden>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-signal" />
              </span>
              {profile.availability}, {profile.location}
            </p>
          </div>

          <div className="rounded-2xl bg-surface p-6 ring-1 ring-line sm:p-8">
            <h2 className="text-lg font-bold">{d.howJobRuns}</h2>
            <ol className="mt-6 space-y-6">
              {process.map((step, i) => (
                <li key={step.title} className="grid grid-cols-[2rem_1fr] gap-x-3">
                  <span className="text-2xl font-bold leading-none text-pine tabular-nums [font-stretch:75%]">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold leading-tight">{step.title}</h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-lichen">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
