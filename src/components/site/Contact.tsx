import { getContent, type Locale } from "@/data/portfolio";
import { getDictionary } from "@/data/ui";
import ContactForm from "./ContactForm";
import { Section, TextLink } from "./ui";

export default function Contact({ lang }: { lang: Locale }) {
  const { contact } = getContent(lang);
  const d = getDictionary(lang).contact;

  const channels = [
    { label: d.channels.whatsapp[0], text: d.channels.whatsapp[1], href: contact.whatsapp },
    { label: d.channels.github[0], text: `github.com/${contact.githubHandle}`, href: contact.github },
    { label: d.channels.cv[0], text: d.channels.cv[1], href: contact.cv },
    { label: d.channels.support[0], text: d.channels.support[1], href: contact.kofi },
  ];

  return (
    <Section id="contact" title={d.title} intro={d.intro} tone="light" seam="blocks">
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <a
            href={`mailto:${contact.email}`}
            className="break-all text-[clamp(1.6rem,3.6vw,2.6rem)] font-bold leading-tight tracking-[-0.02em] text-pine underline decoration-pine/30 decoration-[3px] underline-offset-[6px] transition-[text-decoration-color] [font-stretch:80%] hover:decoration-signal"
          >
            {contact.email}
          </a>
          <dl className="mt-10">
            {channels.map((c) => (
              <div key={c.label} className="grid grid-cols-[7rem_minmax(0,1fr)] gap-4 border-t border-line py-3">
                <dt className="text-lichen">{c.label}</dt>
                <dd>
                  <TextLink href={c.href}>{c.text}</TextLink>
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <ContactForm labels={d.form} email={contact.email} />
      </div>
    </Section>
  );
}
