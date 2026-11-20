"use client";

import { getContent, type Locale } from "@/data/portfolio";
import { matrixCopy, toCommand } from "./copy";
import { useEffect, useRef, useState } from "react";
import { useScatter } from "./scatter";

export default function SkillsSection({ lang }: { lang: Locale }) {
  const d = matrixCopy[lang];
  const { skills } = getContent(lang);

  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const { category: activeLabel, items: activeSkills } = skills[activeCategory];

  const background = useScatter(60);

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
      id="section-2"
      className="min-h-screen flex items-center justify-center py-20 relative"
    >
      <div className="absolute inset-0 opacity-5 overflow-hidden" aria-hidden>
        {background.map((b, i) => (
          <div
            key={i}
            className="absolute font-mono-matrix text-matrix-accent text-xs animate-pulse"
            style={{ left: b.left, top: b.top, animationDelay: b.delay }}
          >
            {b.pick > 0.5 ? "1" : "0"}
          </div>
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="break-words text-3xl sm:text-4xl md:text-6xl font-mono-matrix text-phosphor-glow mb-4">{d.skillsTitle}</h2>
          <div className="break-words text-base sm:text-xl font-mono-matrix text-matrix-highlight">&gt; {d.skillsIntro}</div>
          <div className="w-32 h-1 bg-gradient-to-r from-matrix-accent to-matrix-highlight mx-auto mt-4" />
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10" role="group" aria-label={d.skillsTitle}>
          {skills.map(({ category }, index) => (
            <button
              key={category}
              aria-pressed={activeCategory === index}
              onClick={() => setActiveCategory(index)}
              className={`px-4 py-2 font-mono-matrix border-2 rounded transition-all duration-300 ${
                activeCategory === index
                  ? "bg-matrix-accent/20 border-matrix-accent text-matrix-accent shadow-phosphor"
                  : "bg-matrix-black/50 border-matrix-accent/30 text-matrix-light-gray hover:border-matrix-accent hover:text-matrix-accent"
              }`}
            >
              {toCommand(category)}
            </button>
          ))}
        </div>

        <div className="bg-matrix-black/70 border-2 border-matrix-accent rounded-lg p-6">
          <div className="flex items-center mb-4">
            <div className="flex space-x-2" aria-hidden>
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-matrix-accent" />
            </div>
            <div className="flex-1 text-center font-mono-matrix text-matrix-accent">{d.skillsPanel}</div>
          </div>

          <div className="font-mono-matrix text-matrix-highlight mb-4">
            $ ls ./stack/{toCommand(activeLabel).toLowerCase()}
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {activeSkills.map((skill, index) => (
              <li
                key={skill}
                className={`font-mono-matrix text-lg text-matrix-light-gray bg-matrix-black/50 border border-matrix-accent/30 rounded px-4 py-2 hover:border-matrix-accent hover:text-matrix-accent transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${index * 0.05}s` }}
              >
                <span className="text-matrix-accent">&gt;</span> {skill}
              </li>
            ))}
          </ul>
          <div className="font-mono-matrix text-sm text-matrix-light-gray mt-4">
            {d.skillCount(activeSkills.length)}
            <span className="text-matrix-accent animate-pulse"> _</span>
          </div>
        </div>
      </div>
    </section>
  );
}
