import { getContent, type Locale } from "@/data/portfolio";
import { getDictionary } from "@/data/ui";
import { buttonPrimary, buttonSecondary, container } from "./ui";

const headlineClass =
  "text-[clamp(3rem,9.5vw,8rem)] font-extrabold leading-[0.95] tracking-[-0.015em] [font-stretch:calc(78%_-_var(--p,0)_*_3%)]";

function Headline({ lines, copy = false }: { lines: string[]; copy?: boolean }) {
  return (
    <h1 className={headlineClass} aria-hidden={copy || undefined}>
      {lines.map((line, i) => (
        <span key={line} className="condense-in block" style={{ animationDelay: `${i * 160}ms` }}>
          {line}
        </span>
      ))}
    </h1>
  );
}

/**
 * The hero is a pinned moment. It stays on screen while the visitor scrolls
 * through a runway, and the signal disc behind the headline grows until it
 * fills the screen. The disc is painted in the next section's colour, so when
 * it closes the page has already become the dark section that follows.
 */
export default function Hero({ lang }: { lang: Locale }) {
  const { profile, contact } = getContent(lang);
  const d = getDictionary(lang).hero;

  // The disc grows slowly at first, then sweeps over everything (radius eases with --p²).
  const disc =
    "circle(calc(var(--r) + var(--p, 0) * var(--p, 0) * 150vmax) at calc(var(--cx) * (1 - var(--p, 0)) + 50% * var(--p, 0)) calc(var(--cy) * (1 - var(--p, 0)) + 50% * var(--p, 0)))";

  return (
    <section id="top" data-tone="light" data-progress="pin" className="pin-runway relative h-[230vh] bg-mist text-ink">
      <div className="pin-stage sticky top-0 h-screen overflow-hidden">
        <div className={`${container} pt-20 sm:pt-28`}>
          <Headline lines={profile.headline} />

          <div className="mt-10 max-w-prose sm:mt-14">
            <p className="text-lg leading-relaxed text-ink/90 sm:text-xl">{profile.intro}</p>
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
        </div>

        {/*
          The signal disc, in the next section's colour. Inside it a copy of the
          headline is drawn in that section's text colour, so the words flip
          contrast where the disc crosses them. It switches on at load, then
          grows over the whole screen as the hero runway is scrolled.
        */}
        <div
          aria-hidden
          data-tone="dark"
          data-cover="0.85"
          className="signal-disc pointer-events-none absolute inset-0 bg-mist pt-20 text-ink sm:pt-28 [--cx:78%] [--cy:calc(5rem_+_1.4_*_clamp(3rem,9.5vw,8rem))] [--r:clamp(7rem,21vw,19rem)] sm:[--cy:calc(7rem_+_0.95_*_clamp(3rem,9.5vw,8rem))]"
          style={{ clipPath: disc }}
        >
          <div className={container}>
            <Headline lines={profile.headline} copy />
          </div>
        </div>
      </div>
    </section>
  );
}
