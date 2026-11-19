"use client";

import { useEffect, useRef, useState } from "react";
import { useScatter } from "./scatter";
import { skills } from "@/data/portfolio";

const toCommand = (category: string) => category.toUpperCase().replace(/[^A-Z0-9]+/g, "_");

export default function SkillsSection() {
  const categories = Object.keys(skills);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const sectionRef = useRef<HTMLElement>(null);

  const activeSkills = skills[activeCategory];

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
          <h2 className="text-4xl md:text-6xl font-mono-matrix text-phosphor-glow mb-4">SKILL_MATRIX</h2>
          <div className="text-xl font-mono-matrix text-matrix-highlight">&gt; LOADING_CAPABILITIES...</div>
          <div className="w-32 h-1 bg-gradient-to-r from-matrix-accent to-matrix-highlight mx-auto mt-4" />
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10" role="tablist">
          {categories.map((category) => (
            <button
              key={category}
              role="tab"
              aria-selected={activeCategory === category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 font-mono-matrix border-2 rounded transition-all duration-300 ${
                activeCategory === category
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
            <div className="flex-1 text-center font-mono-matrix text-matrix-accent">SKILL_ANALYZER</div>
          </div>

          <div className="font-mono-matrix text-matrix-highlight mb-4">
            $ ls ./stack/{toCommand(activeCategory).toLowerCase()}
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
            {activeSkills.length} entries found
            <span className="text-matrix-accent animate-pulse"> _</span>
          </div>
        </div>
      </div>
    </section>
  );
}
