/** Small shared building blocks for the standard site. */

export type Tone = "light" | "dark" | "amber";

export const container = "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8";

/**
 * A page section with its own tone (light, dark or amber). Its title is set
 * huge and drifts sideways a little as the section scrolls past.
 */
export function Section({
  id,
  title,
  intro,
  tone = "light",
  children,
}: {
  id: string;
  title: string;
  intro?: string;
  tone?: Tone;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} data-tone={tone} className="relative bg-mist pb-28 pt-24 text-ink sm:pb-36 sm:pt-32">
      <div className={container}>
        <SectionTitle id={`${id}-title`} title={title} />
        {intro && (
          <p data-reveal="lines" className="mb-14 mt-6 max-w-prose text-lg text-lichen sm:text-xl">
            <Lines text={intro} />
          </p>
        )}
        {!intro && <div className="mb-14" />}
        {children}
      </div>
    </section>
  );
}

/** The giant section title: letters rise in, the word condenses, and it drifts with the scroll. */
export function SectionTitle({ id, title }: { id?: string; title: string }) {
  return (
    <div data-progress="through" className="overflow-x-clip">
      <h2
        id={id}
        data-reveal="condense"
        aria-label={title}
        className="text-[clamp(3.25rem,10vw,9.5rem)] font-extrabold leading-[0.9] tracking-[-0.03em] [font-stretch:76%]"
        style={{ transform: "translateX(max(0px, calc((0.6 - var(--p, 0.6)) * 9vw)))" }}
      >
        <Letters text={title} />
      </h2>
    </div>
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
