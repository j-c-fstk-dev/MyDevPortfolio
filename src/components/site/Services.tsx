import { getContent, type Locale } from "@/data/portfolio";
import { getDictionary } from "@/data/ui";
import { Section } from "./ui";

/**
 * The first dark section, where the hero's disc lands: what Jorge helps with
 * and how a job runs (the steps light up in turn, like a line of signals).
 */
export default function Services({ lang }: { lang: Locale }) {
  const { services, process } = getContent(lang);
  const dict = getDictionary(lang);

  return (
    <Section id="services" title={dict.services.title} tone="dark" pullUp>
      <div className="grid gap-x-10 gap-y-12 md:grid-cols-3">
        {services.map((service, i) => (
          <div
            key={service.title}
            data-reveal
            className="border-t-2 border-pine pt-5"
            style={{ transitionDelay: `${i * 120}ms` }}
          >
            <h3 className="text-2xl font-bold leading-tight [font-stretch:85%]">{service.title}</h3>
            <p className="mt-3 leading-relaxed text-lichen">{service.description}</p>
          </div>
        ))}
      </div>

      <div data-reveal className="mt-20 rounded-[1.75rem] bg-surface p-6 sm:p-10">
        <h3 className="text-2xl font-bold [font-stretch:85%]">{dict.hero.howJobRuns}</h3>
        <ol className="mt-8 grid gap-8 md:grid-cols-3">
          {process.map((step, i) => (
            <li key={step.title} className="grid grid-cols-[2.5rem_1fr] gap-x-3">
              <span className="flex flex-col items-start gap-2">
                {/* Counts up: the digits roll from 0 to the step number, one step after the other. */}
                <span className="relative inline-block h-[1em] overflow-hidden text-3xl font-bold leading-none text-pine tabular-nums [font-stretch:75%]">
                  <span className="sr-only">{i + 1}</span>
                  <span
                    aria-hidden
                    className="count-roll block"
                    style={{ "--n": i + 1, transitionDelay: `${150 + i * 380}ms` } as React.CSSProperties}
                  >
                    {Array.from({ length: i + 2 }, (_, digit) => (
                      <span key={digit} className="block h-[1em]">
                        {digit}
                      </span>
                    ))}
                  </span>
                </span>
                <span
                  className="signal-lamp h-2 w-2 rounded-full bg-signal shadow-[0_0_10px_rgb(var(--signal)/0.7)]"
                  style={{ animationDelay: `${650 + i * 380}ms` }}
                  aria-hidden
                />
              </span>
              <div>
                <h4 className="font-semibold leading-tight">{step.title}</h4>
                <p className="mt-1 leading-relaxed text-lichen">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
