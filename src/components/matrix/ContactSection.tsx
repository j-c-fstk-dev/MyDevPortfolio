"use client";

import { getContent, type Locale } from "@/data/portfolio";
import { matrixCopy } from "./copy";
import { useEffect, useRef, useState } from "react";
import ContactForm from "@/components/site/ContactForm";
import { getDictionary } from "@/data/ui";

export default function ContactSection({ lang }: { lang: Locale }) {
  const d = matrixCopy[lang];
  const { contact, profile } = getContent(lang);
  const labels = getDictionary(lang);
  const contactMethods = [
  { label: d.emailProtocol, value: contact.email, icon: "✉️", href: `mailto:${contact.email}` },
  { label: d.whatsappChannel, value: labels.contact.channels.whatsapp[1], icon: "💬", href: contact.whatsapp },
  { label: d.githubRepository, value: `github.com/${contact.githubHandle}`, icon: "🐙", href: contact.github },
  { label: d.cvArchive, value: labels.contact.channels.cv[1], icon: "📄", href: contact.cv },
];
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="section-5"
      className="min-h-screen flex items-center justify-center py-20 relative"
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="break-words text-3xl sm:text-4xl md:text-6xl font-mono-matrix text-phosphor-glow mb-4">{d.contactTitle}</h2>
          <div className="break-words text-base sm:text-xl font-mono-matrix text-matrix-highlight">&gt; {d.contactIntro}</div>
          <div className="w-32 h-1 bg-gradient-to-r from-matrix-accent to-matrix-highlight mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <h3 className="font-mono-matrix text-2xl text-matrix-accent mb-6 text-phosphor-glow">
              {d.contactForm}
            </h3>
            <p className="mb-6 text-matrix-light-gray">{labels.contact.intro}</p>
            <ContactForm variant="matrix" labels={labels.contact.form} email={contact.email} />
          </div>

          <div
            className={`space-y-4 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <h3 className="font-mono-matrix text-2xl text-matrix-accent mb-6 text-phosphor-glow">
              {d.otherChannels}
            </h3>
            {contactMethods.map((method) => (
              <a
                key={method.label}
                href={method.href}
                target={method.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-matrix-black/50 border border-matrix-accent/30 rounded-lg p-5 hover:border-matrix-accent hover:shadow-phosphor transition-all duration-500 group"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform" aria-hidden>
                  {method.icon}
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block font-mono-matrix text-matrix-highlight text-sm mb-1">{method.label}</span>
                  <span className="block font-mono-matrix text-matrix-light-gray group-hover:text-matrix-accent transition-colors break-all">
                    {method.value}
                  </span>
                </span>
                <span className="text-matrix-accent opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden>
                  →
                </span>
              </a>
            ))}

            <div className="bg-matrix-black/70 border border-matrix-accent/30 rounded-lg p-4 mt-6 font-mono-matrix text-sm space-y-1">
              <div className="text-matrix-highlight">$ status --availability</div>
              <div className="text-matrix-accent">● {d.online} — {profile.availability}</div>
              <div className="text-matrix-light-gray">{profile.location}</div>
              <div className="text-matrix-accent animate-pulse">_</div>
            </div>
          </div>
        </div>

        <div className="text-center mt-20">
          <div className="bg-matrix-black/70 border border-matrix-accent/30 rounded-lg p-8 max-w-2xl mx-auto">
            <h4 className="font-mono-matrix text-xl text-matrix-accent mb-4 text-phosphor-glow">
              {d.end}
            </h4>
            <p className="text-matrix-light-gray mb-6">
              {d.thanks} Have a broken app, a Web3 idea or a feature to ship? Let&apos;s talk.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="px-6 py-3 bg-matrix-accent/20 border-2 border-matrix-accent rounded font-mono-matrix text-matrix-accent hover:bg-matrix-accent/30 hover:shadow-phosphor transition-all duration-300"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                &gt; {d.restart}
              </button>
              <button
                type="button"
                onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })}
                className="px-6 py-3 bg-matrix-highlight/20 border-2 border-matrix-highlight rounded font-mono-matrix text-matrix-highlight hover:bg-matrix-highlight/30 hover:shadow-phosphor transition-all duration-300"
              >
                &gt; {d.sendBrief}
              </button>
            </div>
            <div className="mt-8 pt-6 border-t border-matrix-accent/20 font-mono-matrix text-sm text-matrix-accent/50">
              © {new Date().getFullYear()} {profile.name} · {labels.footer.builtWith}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
