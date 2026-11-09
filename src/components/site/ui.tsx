/** Small shared building blocks for the standard site. */

import Seam, { type SeamShape } from "./Seam";

export type Tone = "light" | "dark";

export const container = "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8";

/**
 * A page section. Sections alternate tone (light or dark); a section can bring
 * its colour in through a seam that grows over the end of the previous one.
 */
export function Section({
  id,
  title,
  intro,
  tone = "light",
  seam,
  children,
}: {
  id: string;
  title: string;
  intro?: string;
  tone?: Tone;
  seam?: SeamShape;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      data-tone={tone}
      className="relative bg-mist pb-32 pt-20 text-ink sm:pb-44 sm:pt-28"
    >
      {seam && <Seam shape={seam} />}
      <div className={container}>
        <div className="mb-12 max-w-prose">
          <h2
            id={`${id}-title`}
            data-reveal="condense"
            aria-label={title}
            className="text-[clamp(2.25rem,5vw,3.5rem)] font-bold leading-[1.02] tracking-[-0.025em] [font-stretch:82%]"
          >
            <Letters text={title} />
          </h2>
          {intro && (
            <p data-reveal="lines" className="mt-4 text-lg text-lichen">
              <Lines text={intro} />
            </p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}

/** Text link with a steady underline that thickens on hover. */
export function TextLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`font-medium text-pine underline decoration-pine/30 decoration-2 underline-offset-4 transition-[text-decoration-color] hover:decoration-signal ${className}`}
    >
      {children}
    </a>
  );
}

export const buttonPrimary =
  "inline-flex items-center justify-center rounded-full bg-pine px-6 py-3 font-semibold text-on-pine transition-colors hover:bg-ink";
export const buttonSecondary =
  "inline-flex items-center justify-center rounded-full border-2 border-pine/40 px-6 py-[10px] font-semibold text-pine transition-colors hover:border-pine";

/**
 * Splits a title into letters for a staggered entrance (each letter rises a
 * moment after the previous one). Words stay unbreakable. The parent carries
 * the readable text (aria-label), so screen readers don't spell it out.
 */
export function Letters({ text }: { text: string }) {
  let i = 0;
  return (
    <span aria-hidden>
      {text.split(" ").map((word, w) => (
        <span key={w}>
          {w > 0 && " "}
          <span className="inline-block whitespace-nowrap">
            {Array.from(word).map((char) => (
              <span key={i} className="rl-char" style={{ "--i": i++ } as React.CSSProperties}>
                {char}
              </span>
            ))}
          </span>
        </span>
      ))}
    </span>
  );
}

/**
 * Splits text into words so it can enter line by line: ScrollEffects measures
 * which line each word landed on and the CSS staggers the lines. The words
 * stay in reading order, so the text reads normally without JavaScript.
 */
export function Lines({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span key={i}>
          {i > 0 && " "}
          <span className="rl-word">{word}</span>
        </span>
      ))}
    </>
  );
}

/**
 * A list read by a moving amber bar. The list is drawn twice: normally, and as
 * an amber copy with dark text that is clipped to a strip at the reading line
 * (55% down the screen). As the list scrolls past, the strip travels through
 * it, lighting rows, phrases and headings in turn. ScrollEffects sets --p.
 */
export function ScanList({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div data-progress="scan" className={`relative ${className}`}>
      {children}
      <div
        aria-hidden
        inert
        className="scan-copy pointer-events-none absolute inset-0 bg-signal"
        style={{
          clipPath:
            "inset(calc(var(--p, -1) * 100% - var(--band, 1.4rem)) 0 calc(100% - var(--p, -1) * 100% - var(--band, 1.4rem)) 0)",
        }}
      >
        {children}
      </div>
    </div>
  );
}
