import { getContent, type Locale } from "@/data/portfolio";
import { getDictionary } from "@/data/ui";
import { buttonPrimary, buttonSecondary, container } from "./ui";

const headlineClass =
  "text-[clamp(3rem,9.5vw,8rem)] font-extrabold leading-[0.95] tracking-[-0.015em] [font-stretch:calc(78%_-_var(--p,0)_*_3%)]";

/** While the hero scrolls away (--p 0 → 1) the headline drifts up and condenses a little more. */
const headlineMotion = { transform: "translateY(calc(var(--p, 0) * -14vh))" };

function Headline({ lines, copy = false }: { lines: string[]; copy?: boolean }) {
  return (
    <h1 className={headlineClass} style={headlineMotion} aria-hidden={copy || undefined}>
      {lines.map((line, i) => (
        <span key={line} className="condense-in block" style={{ animationDelay: `${i * 160}ms` }}>
          {line}
        </span>
      ))}
    </h1>
  );
}

export default function Hero({ lang }: { lang: Locale }) {
  const { profile, contact, process } = getContent(lang);
  const d = getDictionary(lang).hero;

  return (
    <section id="top" data-tone="light" data-progress="exit" className="relative overflow-hidden bg-mist pb-20 pt-14 text-ink sm:pb-28 sm:pt-24">
      <div className={container}>
        <Headline lines={profile.headline} />

        <div
          className="relative z-10 mt-12 grid gap-12 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-20"
        >
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
                  <span className="flex flex-col items-start gap-2">
                    <span className="text-2xl font-bold leading-none text-pine tabular-nums [font-stretch:75%]">
                      {i + 1}
                    </span>
                    {/* Lights up in turn, like a line of signals. */}
                    <span
                      className="signal-lamp h-2 w-2 rounded-full bg-signal shadow-[0_0_10px_rgb(var(--signal)/0.7)]"
                      style={{ animationDelay: `${900 + i * 350}ms` }}
                      aria-hidden
                    />
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

      {/*
        The signal disc: a pine circle behind the headline. Inside it a copy of
        the headline is drawn in the light colour, so the words flip contrast
        where they cross it. It switches on at load and slides and grows as the
        hero scrolls away.
      */}
      <div
        aria-hidden
        className="signal-disc pointer-events-none absolute inset-0 bg-pine pt-14 text-on-pine sm:pt-24 [--cx:78%] [--cy:calc(3.5rem_+_1.4_*_clamp(3rem,9.5vw,8rem))] [--r:clamp(7rem,21vw,19rem)] sm:[--cy:calc(6rem_+_0.95_*_clamp(3rem,9.5vw,8rem))]"
        style={{
          clipPath:
            "circle(calc(var(--r) * (1 + var(--p, 0) * 1.4)) at calc(var(--cx) - var(--p, 0) * 22%) calc(var(--cy) - var(--p, 0) * 10vh))",
        }}
      >
        <div className={container}>
          <Headline lines={profile.headline} copy />
        </div>
      </div>
    </section>
  );
}
