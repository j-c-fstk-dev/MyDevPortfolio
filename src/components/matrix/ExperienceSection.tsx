"use client";

import { useEffect, useRef, useState } from "react";
import { experience, previousCareer, profile } from "@/data/portfolio";

const toCommand = (text: string) => text.toUpperCase().replace(/[^A-Z0-9]+/g, "_").replace(/^_|_$/g, "");

export default function ExperienceSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="section-4"
      className="min-h-screen flex items-center justify-center py-20 relative"
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-mono-matrix text-phosphor-glow mb-4">EXPERIENCE_LOG</h2>
          <div className="text-xl font-mono-matrix text-matrix-highlight">&gt; PARSING_CAREER_HISTORY...</div>
          <div className="w-32 h-1 bg-gradient-to-r from-matrix-accent to-matrix-highlight mx-auto mt-4" />
        </div>

        {/* Timeline: a single column on the left on mobile, alternating on desktop */}
        <ol className="relative max-w-4xl mx-auto">
          <div
            className="absolute left-3 md:left-1/2 md:-translate-x-1/2 w-1 h-full bg-gradient-to-b from-matrix-accent to-matrix-highlight"
            aria-hidden
          />
          {experience.map((job, index) => (
            <li
              key={job.title}
              className={`relative mb-12 pl-10 md:pl-0 md:w-1/2 transition-all duration-1000 ${
                index % 2 === 0 ? "md:pr-10" : "md:ml-auto md:pl-10"
              } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${index * 0.2}s` }}
            >
              <div
                className={`absolute top-6 left-1 md:left-auto w-5 h-5 bg-matrix-accent border-4 border-matrix-black rounded-full shadow-phosphor ${
                  index % 2 === 0 ? "md:-right-2.5" : "md:-left-2.5"
                }`}
                aria-hidden
              />
              <article className="bg-matrix-black/70 border-2 border-matrix-accent/30 rounded-lg p-6 hover:border-matrix-accent hover:shadow-phosphor transition-all duration-300">
                <div className="font-mono-matrix text-sm text-matrix-highlight mb-2">{job.period}</div>
                <h3 className="font-mono-matrix text-xl text-matrix-accent mb-1 text-phosphor-glow">
                  {toCommand(job.title)}
                </h3>
                <div className="font-mono-matrix text-matrix-highlight mb-4">
                  @{" "}
                  {job.link ? (
                    <a href={job.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {job.company} ↗
                    </a>
                  ) : (
                    job.company
                  )}
                </div>
                <p className="text-matrix-light-gray text-sm mb-4">{job.summary}</p>
                <ul className="space-y-2 mb-4">
                  {job.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm text-matrix-light-gray">
                      <span className="text-matrix-accent" aria-hidden>
                        ▶
                      </span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1">
                  {job.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-matrix-accent/20 border border-matrix-accent/50 rounded text-xs font-mono-matrix text-matrix-accent"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            </li>
          ))}
        </ol>

        <div className="mt-8 bg-matrix-black/70 border-2 border-matrix-accent rounded-lg p-6 max-w-4xl mx-auto font-mono-matrix text-sm space-y-2">
          <div className="text-matrix-highlight">$ cat legacy_career.log</div>
          {previousCareer.map((job) => (
            <div key={job.title} className="text-matrix-light-gray">
              <span className="text-matrix-accent">[{job.period}]</span> {job.title} @ {job.company}
              <span className="text-matrix-light-gray/60"> — {job.summary}</span>
            </div>
          ))}
          <div className="text-matrix-highlight pt-2">$ echo $WHY_IT_MATTERS</div>
          <div className="text-matrix-light-gray">{profile.story}</div>
          <div className="text-matrix-accent animate-pulse">_</div>
        </div>
      </div>
    </section>
  );
}
