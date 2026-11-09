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
            className="text-[clamp(2.25rem,5vw,3.5rem)] font-bold leading-[1.02] tracking-[-0.025em] [font-stretch:82%]"
          >
            {title}
          </h2>
          {intro && (
            <p data-reveal className="mt-4 text-lg text-lichen [transition-delay:150ms]">
              {intro}
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
