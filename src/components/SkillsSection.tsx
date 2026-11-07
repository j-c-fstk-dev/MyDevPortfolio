"use client";

import { useEffect, useState, useRef } from "react";

interface Skill {
  name: string;
  level: number;
  category: string;
  icon: string;
}

export default function SkillsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState("FRONTEND");
  const sectionRef = useRef<HTMLElement>(null);

  const skills: Skill[] = [
  // Frontend
  { name: "React.js", level: 95, category: "FRONTEND", icon: "⚛️" },
  { name: "TypeScript", level: 90, category: "FRONTEND", icon: "📘" },
  { name: "Next.js", level: 88, category: "FRONTEND", icon: "▲" },
  { name: "Tailwind CSS", level: 92, category: "FRONTEND", icon: "🎨" },
  { name: "Vue.js", level: 75, category: "FRONTEND", icon: "💚" },

  // Backend
  { name: "Node.js", level: 92, category: "BACKEND", icon: "🟢" },
  { name: "Python", level: 88, category: "BACKEND", icon: "🐍" },
  { name: "Express.js", level: 90, category: "BACKEND", icon: "🚀" },
  { name: "PostgreSQL", level: 85, category: "BACKEND", icon: "🐘" },
  { name: "MongoDB", level: 82, category: "BACKEND", icon: "🍃" },

  // DevOps
  { name: "AWS", level: 85, category: "DEVOPS", icon: "☁️" },
  { name: "Docker", level: 88, category: "DEVOPS", icon: "🐳" },
  { name: "Kubernetes", level: 75, category: "DEVOPS", icon: "⚙️" },
  { name: "CI/CD", level: 80, category: "DEVOPS", icon: "🔄" },
  { name: "Terraform", level: 70, category: "DEVOPS", icon: "🏗️" },

  // Tools
  { name: "Git", level: 95, category: "TOOLS", icon: "📝" },
  { name: "VS Code", level: 98, category: "TOOLS", icon: "💻" },
  { name: "Figma", level: 80, category: "TOOLS", icon: "🎨" },
  { name: "Postman", level: 85, category: "TOOLS", icon: "📮" },
  { name: "Linux", level: 82, category: "TOOLS", icon: "🐧" }];


  const categories = ["FRONTEND", "BACKEND", "DEVOPS", "TOOLS"];

  const filteredSkills = skills.filter(
    (skill) => skill.category === activeCategory
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="section-2"
      className="min-h-screen flex items-center justify-center py-20 relative"
     >

      {/* Background Matrix */}
      <div className="absolute inset-0 opacity-5">
        {Array.from({ length: 100 }).map((_, i) =>
        <div
          key={i}
          className="absolute font-mono-matrix text-matrix-primary-green text-xs animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${2 + Math.random() * 3}s`
          }}
         >

            {Math.random() > 0.5 ? "1" : "0"}
          </div>
        )}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-6xl font-mono-matrix text-glow-green mb-4"
           >

            SKILL_MATRIX
          </h2>
          <div
            className="text-xl font-mono-matrix text-matrix-electric-blue"
           >

            &gt; LOADING_CAPABILITIES...
          </div>
          <div
            className="w-32 h-1 bg-gradient-to-r from-matrix-primary-green to-matrix-electric-blue mx-auto mt-4"
           >
          </div>
        </div>

        {/* Category Tabs */}
        <div
          className="flex flex-wrap justify-center gap-4 mb-12"
         >

          {categories.map((category) =>
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-3 font-mono-matrix border-2 rounded transition-all duration-300 ${
            activeCategory === category ?
            "bg-matrix-primary-green/20 border-matrix-primary-green text-matrix-primary-green shadow-neon-green" :
            "bg-matrix-black/50 border-matrix-primary-green/30 text-matrix-light-gray hover:border-matrix-primary-green hover:text-matrix-primary-green"}`
            }
           >

              {category}
            </button>
          )}
        </div>

        {/* Skills Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
         >

          {filteredSkills.map((skill, index) =>
          <div
            key={skill.name}
            className={`bg-matrix-black/50 border border-matrix-primary-green/30 rounded-lg p-6 hover:border-matrix-primary-green hover:shadow-neon-green transition-all duration-500 transform ${
            isVisible ?
            "translate-y-0 opacity-100" :
            "translate-y-10 opacity-0"}`
            }
            style={{ transitionDelay: `${index * 0.1}s` }}
           >

              {/* Skill Header */}
              <div
              className="flex items-center justify-between mb-4"
             >

                <div className="flex items-center gap-3">
                  <span className="text-2xl">
                    {skill.icon}
                  </span>
                  <span
                  className="font-mono-matrix text-matrix-light-gray"
                 >

                    {skill.name}
                  </span>
                </div>
                <span
                className="font-mono-matrix text-matrix-primary-green text-sm"
               >

                  {skill.level}%
                </span>
              </div>

              {/* Progress Bar */}
              <div
              className="w-full bg-matrix-dark-gray rounded-full h-3 mb-4"
             >

                <div
                className="h-3 rounded-full bg-gradient-to-r from-matrix-primary-green to-matrix-secondary-green transition-all duration-1000 ease-out"
                style={{
                  width: isVisible ? `${skill.level}%` : "0%",
                  transitionDelay: `${index * 0.1 + 0.5}s`
                }}
               >
              </div>
              </div>

              {/* Binary Representation */}
              <div
              className="font-mono-matrix text-xs text-matrix-primary-green/50 overflow-hidden"
             >

                <div className="animate-pulse">
                  {Array.from({ length: Math.floor(skill.level / 5) }).map(
                  (_, i) =>
                  <span
                    key={i}
                    className="inline-block mr-1"
                   >

                        {Math.random() > 0.3 ? "1" : "0"}
                      </span>

                )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Terminal Output */}
        <div
          className="mt-16 bg-matrix-black/70 border-2 border-matrix-primary-green rounded-lg p-6 max-w-4xl mx-auto"
         >

          <div className="flex items-center mb-4">
            <div className="flex space-x-2">
              <div
                className="w-3 h-3 rounded-full bg-red-500"
               >
              </div>
              <div
                className="w-3 h-3 rounded-full bg-yellow-500"
               >
              </div>
              <div
                className="w-3 h-3 rounded-full bg-matrix-primary-green"
               >
              </div>
            </div>
            <div
              className="flex-1 text-center font-mono-matrix text-matrix-primary-green"
             >

              SKILL_ANALYZER_v3.0
            </div>
          </div>

          <div
            className="font-mono-matrix text-sm space-y-2"
           >

            <div className="text-matrix-electric-blue">
              $ analyze --category {activeCategory.toLowerCase()}
            </div>
            <div className="text-matrix-light-gray">
              Scanning {filteredSkills.length} skills...
            </div>
            <div className="text-matrix-primary-green">
              Average proficiency:{" "}
              {Math.round(
                filteredSkills.reduce((acc, skill) => acc + skill.level, 0) /
                filteredSkills.length
              )}
              %
            </div>
            <div className="text-matrix-light-gray">
              Status: READY_FOR_PRODUCTION
            </div>
            <div
              className="text-matrix-primary-green animate-pulse"
             >

              _
            </div>
          </div>
        </div>
      </div>
    </section>);

}