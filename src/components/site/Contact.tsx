import { contact } from "@/data/portfolio";
import ContactForm from "./ContactForm";
import { Section, TextLink } from "./ui";

const channels = [
  { label: "WhatsApp", href: contact.whatsapp, text: "Send a message" },
  { label: "GitHub", href: contact.github, text: `github.com/${contact.githubHandle}` },
  { label: "CV", href: contact.cv, text: "Read my CV" },
  { label: "Support", href: contact.kofi, text: "Buy me a coffee on Ko-fi" },
];

export default function Contact() {
  return (
    <Section
      id="contact"
      title="Tell me what's broken"
      intro="Or what you want to build. Describe the problem and send a link to the repo if you can; I usually reply within a day."
    >
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
        <ContactForm />
      </div>
    </Section>
  );
}
