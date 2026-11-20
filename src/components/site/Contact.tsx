import { getContent, type Locale } from "@/data/portfolio";
import { getDictionary } from "@/data/ui";
import ContactForm from "./ContactForm";
import { Section, TextLink } from "./ui";

export default function Contact({ lang }: { lang: Locale }) {
  const { contact } = getContent(lang);
  const d = getDictionary(lang).contact;

  const channels = [
    { label: d.channels.email, text: contact.email, href: `mailto:${contact.email}` },
    { label: d.channels.whatsapp[0], text: d.channels.whatsapp[1], href: contact.whatsapp },
    { label: d.channels.github[0], text: `github.com/${contact.githubHandle}`, href: contact.github },
    { label: d.channels.cv[0], text: d.channels.cv[1], href: contact.cv },
    { label: d.channels.support[0], text: d.channels.support[1], href: contact.kofi },
  ];

  return (
    <Section id="contact" title={d.title} intro={d.intro} tone="amber">
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
        <ContactForm labels={d.form} email={contact.email} />
        <div>
          <h3 className="text-xl font-semibold text-pine">{d.channels.title}</h3>
          <dl className="mt-4">
            {channels.map((c) => (
              <div key={c.label} className="grid grid-cols-[7rem_minmax(0,1fr)] gap-4 border-t border-line py-3">
                <dt className="text-lichen">{c.label}</dt>
                <dd className="min-w-0 break-words">
                  <TextLink href={c.href}>{c.text}</TextLink>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
