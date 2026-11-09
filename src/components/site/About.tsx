import Image from "next/image";
import { getContent, type Locale } from "@/data/portfolio";
import { getDictionary } from "@/data/ui";
import { Lines, ScanList, Section, TextLink } from "./ui";

export default function About({ lang }: { lang: Locale }) {
  const { profile, contact, skills, education, languages } = getContent(lang);
  const d = getDictionary(lang).about;

  return (
    <Section id="about" title={d.title} tone="dark" seam="ink">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        {/* Stays in view while the long tools list scrolls past. */}
        <div className="self-start lg:sticky lg:top-24">
          <Image
            src={profile.photo}
            alt={d.photoAlt(profile.name)}
            width={480}
            height={480}
            className="aspect-square w-full max-w-sm rounded-[1.75rem] bg-surface object-cover ring-1 ring-line lg:max-w-[15rem]"
          />
          <div className="mt-8 max-w-prose space-y-4 text-lg leading-relaxed">
            <p data-reveal="lines">
              <Lines text={profile.summary} />
            </p>
            <p data-reveal="lines">
              <Lines text={profile.story} />
            </p>
            <p>
              {d.sideProjects[0]} <TextLink href={contact.beregen}>BeRegen</TextLink>, {d.sideProjects[1]}{" "}
              <TextLink href={contact.blog}>FineCoding</TextLink>.
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold [font-stretch:85%]">{d.tools}</h3>
          <ScanList className="mt-6">
            {skills.map((group) => (
              <div key={group.category} className="pt-6 first:pt-0">
                <h4 data-pass className="dim-until-passed text-[clamp(1.6rem,3vw,2.25rem)] font-extrabold leading-tight [font-stretch:78%]">
                  {group.category}
                </h4>
                <ul className="mt-1">
                  {group.items.map((item) => (
                    <li key={item} className="border-b border-line py-2.5 text-lg leading-snug">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </ScanList>

          <div className="mt-12 grid gap-10 sm:grid-cols-2">
            <div>
              <h3 className="text-xl font-bold [font-stretch:85%]">{d.education}</h3>
              <ul className="mt-4 space-y-4">
                {education.map((item) => (
                  <li key={item.title}>
                    <p className="font-semibold leading-snug">{item.title}</p>
                    <p className="text-[15px] text-lichen">
                      {item.school}
                      {item.year && `, ${item.year}`}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold [font-stretch:85%]">{d.languages}</h3>
              <ul className="mt-4 space-y-2">
                {languages.map((language) => (
                  <li key={language}>{language}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
