"use client";

import { useEffect, useRef, useState } from "react";
import ContactForm from "@/components/ContactForm";
import { contact, profile } from "@/data/portfolio";

const contactMethods = [
  { label: "EMAIL_PROTOCOL", value: contact.email, icon: "✉️", href: `mailto:${contact.email}` },
  { label: "WHATSAPP_CHANNEL", value: "Send a message", icon: "💬", href: contact.whatsapp },
  { label: "GITHUB_REPOSITORY", value: `github.com/${contact.githubHandle}`, icon: "🐙", href: contact.github },
  { label: "CV_ARCHIVE", value: "j-c-fstk-dev.github.io/cvs", icon: "📄", href: contact.cv },
];

export default function ContactSection() {
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
          <h2 className="text-4xl md:text-6xl font-mono-matrix text-glow-green mb-4">CONTACT_INTERFACE</h2>
          <div className="text-xl font-mono-matrix text-matrix-electric-blue">&gt; ESTABLISHING_CONNECTION...</div>
          <div className="w-32 h-1 bg-gradient-to-r from-matrix-primary-green to-matrix-electric-blue mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div
            className={`space-y-4 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <h3 className="font-mono-matrix text-2xl text-matrix-primary-green mb-6 text-glow-green">
              COMMUNICATION_PROTOCOLS
            </h3>
            {contactMethods.map((method) => (
              <a
                key={method.label}
                href={method.href}
                target={method.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-matrix-black/50 border border-matrix-primary-green/30 rounded-lg p-5 hover:border-matrix-primary-green hover:shadow-neon-green transition-all duration-500 group"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform" aria-hidden>
                  {method.icon}
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block font-mono-matrix text-matrix-electric-blue text-sm mb-1">{method.label}</span>
                  <span className="block font-mono-matrix text-matrix-light-gray group-hover:text-matrix-primary-green transition-colors break-all">
                    {method.value}
                  </span>
                </span>
                <span className="text-matrix-primary-green opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden>
                  →
                </span>
              </a>
            ))}

            <div className="bg-matrix-black/70 border border-matrix-primary-green/30 rounded-lg p-4 mt-6 font-mono-matrix text-sm space-y-1">
              <div className="text-matrix-electric-blue">$ status --availability</div>
              <div className="text-matrix-primary-green">● ONLINE — {profile.availability}</div>
              <div className="text-matrix-light-gray">{profile.location}</div>
              <div className="text-matrix-primary-green animate-pulse">_</div>
            </div>
          </div>

          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <h3 className="font-mono-matrix text-2xl text-matrix-primary-green mb-6 text-glow-green">
              DIRECT_MESSAGE_SYSTEM
            </h3>
            <ContactForm variant="matrix" />
          </div>
        </div>

        <div className="text-center mt-20">
          <div className="bg-matrix-black/70 border border-matrix-primary-green/30 rounded-lg p-8 max-w-2xl mx-auto">
            <h4 className="font-mono-matrix text-xl text-matrix-primary-green mb-4 text-glow-green">
              END_OF_TRANSMISSION
            </h4>
            <p className="text-matrix-light-gray mb-6">
              Thanks for exploring. Have a broken app, a Web3 idea or a feature to ship? Let&apos;s talk.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="px-6 py-3 bg-matrix-primary-green/20 border-2 border-matrix-primary-green rounded font-mono-matrix text-matrix-primary-green hover:bg-matrix-primary-green/30 hover:shadow-neon-green transition-all duration-300"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                &gt; RESTART_SEQUENCE
              </button>
              <a
                href={`mailto:${contact.email}`}
                className="px-6 py-3 bg-matrix-electric-blue/20 border-2 border-matrix-electric-blue rounded font-mono-matrix text-matrix-electric-blue hover:bg-matrix-electric-blue/30 hover:shadow-neon-blue transition-all duration-300"
              >
                &gt; HIRE_DEVELOPER
              </a>
            </div>
            <div className="mt-8 pt-6 border-t border-matrix-primary-green/20 font-mono-matrix text-sm text-matrix-primary-green/50">
              © {new Date().getFullYear()} {profile.name} · Built with Next.js, TypeScript and Tailwind CSS
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
