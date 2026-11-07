import Image from "next/image";
import { contact, education, languages, profile, skills } from "@/data/portfolio";
import { Section, TextLink } from "./ui";

export default function About() {
  return (
    <Section id="about" title="About">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div>
          <Image
            src={profile.photo}
            alt={`Portrait of ${profile.name}`}
            width={480}
            height={480}
            className="aspect-square w-full max-w-sm rounded-[1.75rem] bg-surface object-cover ring-1 ring-line"
          />
          <div className="mt-8 max-w-prose space-y-4 text-lg leading-relaxed">
            <p>{profile.summary}</p>
            <p>{profile.story}</p>
            <p>
              Outside client work I run <TextLink href={contact.beregen}>BeRegen</TextLink>, regenerative
              infrastructure for communities in the Mantiqueira range, and write on{" "}
              <TextLink href={contact.blog}>FineCoding</TextLink>.
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold [font-stretch:85%]">Tools I use</h3>
          <dl className="mt-6">
            {Object.entries(skills).map(([category, list]) => (
              <div
                key={category}
                className="grid gap-1 border-t border-line py-4 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-6"
              >
                <dt className="font-semibold">{category}</dt>
                <dd className="leading-relaxed text-ink/80">{list.join(", ")}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-12 grid gap-10 sm:grid-cols-2">
            <div>
              <h3 className="text-xl font-bold [font-stretch:85%]">Education</h3>
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
              <h3 className="text-xl font-bold [font-stretch:85%]">Languages</h3>
              <ul className="mt-4 space-y-2">
                {languages.map((lang) => (
                  <li key={lang}>{lang}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
