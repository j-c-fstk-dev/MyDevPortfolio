"use client";

import Image from "next/image";
import { useState } from "react";
import ContactForm from "@/components/ContactForm";
import {
  categoryLabels,
  contact,
  education,
  experience,
  languages,
  previousCareer,
  profile,
  projects,
  services,
  skills,
  statusLabels,
  type Project,
} from "@/data/portfolio";

interface NormalPortfolioProps {
  onEnterMatrix: () => void;
}

const sections = ["about", "skills", "projects", "experience", "contact"] as const;
type Section = (typeof sections)[number];

const cardBase = "bg-[#0A0A0A] rounded-lg border border-[#00F0FF]/40";
const card = `${cardBase} p-6`;
const panel = "space-y-8 bg-[#1A1A1A] p-6 sm:p-8 rounded-lg shadow-xl";
const linkClass = "text-[#00F0FF] hover:underline text-sm font-medium";

const contactLinks = [
  { label: "Email", value: contact.email, href: `mailto:${contact.email}`, icon: "✉️" },
  { label: "WhatsApp", value: "Message me", href: contact.whatsapp, icon: "💬" },
  { label: "GitHub", value: `github.com/${contact.githubHandle}`, href: contact.github, icon: "🐙" },
  { label: "CV", value: "View my CVs", href: contact.cv, icon: "📄" },
  { label: "Blog", value: "FineCoding", href: contact.blog, icon: "📝" },
];

function SectionHeader({ title, intro }: { title: string; intro?: string }) {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-[#00F0FF] mb-4">{title}</h2>
      {intro && <p className="text-[#D1D1D1] max-w-2xl mx-auto">{intro}</p>}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className={`${cardBase} flex flex-col overflow-hidden`}>
      <div className="p-6 flex-1">
        <div className="flex items-center justify-between gap-2 mb-3 text-xs">
          <span className="text-[#D1D1D1]">
            {categoryLabels[project.category]} · {project.context}
          </span>
          <span className="px-2 py-0.5 rounded-full border border-[#00F0FF]/40 text-[#00F0FF]">
            {statusLabels[project.status]}
          </span>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
        <p className="text-[#D1D1D1] mb-4 text-sm leading-relaxed">{project.description}</p>
        <ul className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <li
              key={tech}
              className="px-2 py-1 bg-[#1A1A1A] text-[#00F0FF] text-xs rounded-full border border-[#00F0FF]/40"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
      <div className="px-6 py-3 border-t border-[#00F0FF]/40 flex gap-6">
        {project.live && (
          <a href={project.live} target="_blank" rel="noopener noreferrer" className={linkClass}>
            Live site ↗
          </a>
        )}
        {project.repo && (
          <a href={project.repo} target="_blank" rel="noopener noreferrer" className={linkClass}>
            Code ↗
          </a>
        )}
      </div>
    </article>
  );
}

export default function NormalPortfolio({ onEnterMatrix }: NormalPortfolioProps) {
  const [activeSection, setActiveSection] = useState<Section>("about");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  const goTo = (section: Section) => {
    setActiveSection(section);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0 });
  };

  const navButton = (section: Section, mobile = false) => (
    <button
      key={section}
      onClick={() => goTo(section)}
      aria-current={activeSection === section ? "page" : undefined}
      className={
        mobile
          ? `block px-3 py-2 text-base font-medium w-full text-left transition-colors duration-200 ${
              activeSection === section ? "text-[#00F0FF] bg-[#0A0A0A]" : "text-white hover:text-[#D1D1D1]"
            }`
          : `px-3 py-2 text-sm font-medium transition-colors duration-200 ${
              activeSection === section
                ? "text-[#00F0FF] border-b-2 border-[#00F0FF]"
                : "text-white hover:text-[#D1D1D1]"
            }`
      }
    >
      {section.charAt(0).toUpperCase() + section.slice(1)}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans">
      <button
        onClick={onEnterMatrix}
        className="fixed bottom-4 right-4 h-12 px-4 bg-[#1A1A1A] border border-red-500/40 rounded-full flex items-center gap-2 text-sm text-red-300 hover:border-red-400 transition-all duration-300 z-50"
        aria-label="Enter the Matrix version of this portfolio"
      >
        <span aria-hidden>💊</span>
        <span className="hidden sm:inline">Enter the Matrix</span>
      </button>

      <nav className="bg-[#1A1A1A] shadow-sm border-b border-gray-700 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button onClick={() => goTo("about")} className="text-xl font-bold text-white">
              {profile.name}
            </button>

            <div className="hidden md:flex space-x-8">{sections.map((s) => navButton(s))}</div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-[#D1D1D1]"
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-700 px-2 pt-2 pb-3 space-y-1">
              {sections.map((s) => navButton(s, true))}
            </div>
          )}
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeSection === "about" && (
          <section className={panel}>
            <div className="text-center">
              <div className="w-32 h-32 rounded-full mx-auto mb-6 overflow-hidden border-2 border-[#00F0FF]/60">
                <Image
                  src={profile.photo}
                  alt={`Photo of ${profile.name}`}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-white">{profile.name}</h1>
              <p className="text-xl text-[#00F0FF] mb-1">{profile.role}</p>
              <p className="text-[#D1D1D1] mb-6">{profile.tagline}</p>
              <p className="inline-flex items-center gap-2 text-sm text-green-300 bg-green-500/10 border border-green-500/30 rounded-full px-3 py-1 mb-6">
                <span className="w-2 h-2 rounded-full bg-green-400" aria-hidden />
                {profile.availability} · {profile.location}
              </p>
              <div className="max-w-2xl mx-auto space-y-4 text-lg text-[#D1D1D1] text-left sm:text-center">
                <p>{profile.summary}</p>
                <p>{profile.story}</p>
              </div>
              <div className="flex flex-wrap justify-center gap-3 mt-8">
                <button
                  onClick={() => goTo("projects")}
                  className="px-5 py-2 rounded-md bg-[#00F0FF] text-[#0A0A0A] font-bold hover:bg-[#00D1E0] transition-colors"
                >
                  See my work
                </button>
                <button
                  onClick={() => goTo("contact")}
                  className="px-5 py-2 rounded-md border border-[#00F0FF] text-[#00F0FF] font-bold hover:bg-[#00F0FF]/10 transition-colors"
                >
                  Get in touch
                </button>
                <a
                  href={contact.cv}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 rounded-md border border-gray-600 text-white hover:border-[#00F0FF] transition-colors"
                >
                  CV ↗
                </a>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4 text-white">What I do</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {services.map((service) => (
                  <div key={service.title} className={card}>
                    <h3 className="font-semibold text-[#00F0FF] mb-2">{service.title}</h3>
                    <p className="text-sm text-[#D1D1D1] leading-relaxed">{service.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeSection === "skills" && (
          <section className={panel}>
            <SectionHeader title="Skills & Technologies" intro="The stack I use in client and personal projects." />
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(skills).map(([category, list]) => (
                <div key={category} className={card}>
                  <h3 className="text-lg font-semibold mb-4 text-white">{category}</h3>
                  <ul className="flex flex-wrap gap-2">
                    {list.map((skill) => (
                      <li
                        key={skill}
                        className="px-3 py-1 text-sm rounded-full bg-[#1A1A1A] text-[#D1D1D1] border border-gray-700"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className={card}>
                <h3 className="text-lg font-semibold mb-4 text-white">Education</h3>
                <ul className="space-y-3 text-[#D1D1D1]">
                  {education.map((item) => (
                    <li key={item.title}>
                      <span className="text-white font-medium">{item.title}</span>
                      <br />
                      <span className="text-sm">
                        {item.school}
                        {item.year && ` · ${item.year}`}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={card}>
                <h3 className="text-lg font-semibold mb-4 text-white">Languages</h3>
                <ul className="space-y-2 text-[#D1D1D1]">
                  {languages.map((lang) => (
                    <li key={lang}>{lang}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {activeSection === "projects" && (
          <section className={panel}>
            <SectionHeader
              title="Featured Projects"
              intro="Production apps for clients and my own products — mostly Web3, climate and community work."
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>

            <h3 className="text-2xl font-bold text-white pt-4">More projects</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {others.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
            <p className="text-center text-[#D1D1D1]">
              Everything else lives on{" "}
              <a href={`${contact.github}?tab=repositories`} target="_blank" rel="noopener noreferrer" className={linkClass}>
                GitHub ↗
              </a>
            </p>
          </section>
        )}

        {activeSection === "experience" && (
          <section className={panel}>
            <SectionHeader title="Experience" />
            <div className="space-y-6">
              {experience.map((job) => (
                <article key={job.title} className={`${card} text-[#D1D1D1]`}>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-white">{job.title}</h3>
                      <p className="text-[#00F0FF] font-medium">
                        {job.link ? (
                          <a href={job.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                            {job.company} ↗
                          </a>
                        ) : (
                          job.company
                        )}
                      </p>
                    </div>
                    <span className="text-sm whitespace-nowrap">{job.period}</span>
                  </div>
                  <p className="mb-3">{job.summary}</p>
                  <ul className="list-disc pl-5 space-y-1 mb-4">
                    {job.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                  <p className="text-xs text-gray-400">{job.tech.join(" · ")}</p>
                </article>
              ))}
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Before tech</h3>
              <p className="text-[#D1D1D1] mb-4">{profile.story}</p>
              <ul className="grid md:grid-cols-3 gap-4">
                {previousCareer.map((job) => (
                  <li key={job.title} className={`${card} text-sm text-[#D1D1D1]`}>
                    <p className="text-white font-semibold">{job.title}</p>
                    <p className="text-[#00F0FF]">{job.company}</p>
                    <p className="text-xs mb-2">{job.period}</p>
                    <p>{job.summary}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {activeSection === "contact" && (
          <section className={panel}>
            <SectionHeader
              title="Get In Touch"
              intro="Have a broken app, a Web3 idea or a feature to ship? Tell me about it — I usually reply within a day."
            />
            <div className="grid md:grid-cols-2 gap-8">
              <ul className="space-y-4">
                {contactLinks.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 group"
                    >
                      <span
                        className="w-12 h-12 shrink-0 bg-[#0A0A0A] rounded-full flex items-center justify-center text-2xl border border-[#00F0FF]/60"
                        aria-hidden
                      >
                        {item.icon}
                      </span>
                      <span>
                        <span className="block font-semibold text-white">{item.label}</span>
                        <span className="text-[#D1D1D1] group-hover:text-[#00F0FF] transition-colors">
                          {item.value}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <ContactForm />
            </div>
          </section>
        )}
      </main>

      <footer className="bg-[#1A1A1A] border-t border-gray-700 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-[#D1D1D1]">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p className="text-sm mt-2">Built with Next.js, TypeScript and Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
}
