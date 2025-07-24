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
      data-oid="z_ijz6u">

      {/* Background Matrix */}
      <div className="absolute inset-0 opacity-5" data-oid="61epveq">
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
          data-oid="5r-tk8l">

            {Math.random() > 0.5 ? "1" : "0"}
          </div>
        )}
      </div>

      <div className="container mx-auto px-6 relative z-10" data-oid="zcreq5l">
        {/* Section Header */}
        <div className="text-center mb-16" data-oid="2nm_pc8">
          <h2
            className="text-4xl md:text-6xl font-mono-matrix text-glow-green mb-4"
            data-oid="uhip:43">

            SKILL_MATRIX
          </h2>
          <div
            className="text-xl font-mono-matrix text-matrix-electric-blue"
            data-oid="ew2ss:b">

            &gt; LOADING_CAPABILITIES...
          </div>
          <div
            className="w-32 h-1 bg-gradient-to-r from-matrix-primary-green to-matrix-electric-blue mx-auto mt-4"
            data-oid="f.1tib4">
          </div>
        </div>

        {/* Category Tabs */}
        <div
          className="flex flex-wrap justify-center gap-4 mb-12"
          data-oid="gyfoa58">

          {categories.map((category) =>
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-3 font-mono-matrix border-2 rounded transition-all duration-300 ${
            activeCategory === category ?
            "bg-matrix-primary-green/20 border-matrix-primary-green text-matrix-primary-green shadow-neon-green" :
            "bg-matrix-black/50 border-matrix-primary-green/30 text-matrix-light-gray hover:border-matrix-primary-green hover:text-matrix-primary-green"}`
            }
            data-oid="pn0o3w9">

              {category}
            </button>
          )}
        </div>

        {/* Skills Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          data-oid="28kv8jf">

          {filteredSkills.map((skill, index) =>
          <div
            key={skill.name}
            className={`bg-matrix-black/50 border border-matrix-primary-green/30 rounded-lg p-6 hover:border-matrix-primary-green hover:shadow-neon-green transition-all duration-500 transform ${
            isVisible ?
            "translate-y-0 opacity-100" :
            "translate-y-10 opacity-0"}`
            }
            style={{ transitionDelay: `${index * 0.1}s` }}
            data-oid="w5i4e1o">

              {/* Skill Header */}
              <div
              className="flex items-center justify-between mb-4"
              data-oid="z1t2rge">

                <div className="flex items-center gap-3" data-oid="txtn55m">
                  <span className="text-2xl" data-oid="xj06-pe">
                    {skill.icon}
                  </span>
                  <span
                  className="font-mono-matrix text-matrix-light-gray"
                  data-oid="np1wdzr">

                    {skill.name}
                  </span>
                </div>
                <span
                className="font-mono-matrix text-matrix-primary-green text-sm"
                data-oid="uvslm:7">

                  {skill.level}%
                </span>
              </div>

              {/* Progress Bar */}
              <div
              className="w-full bg-matrix-dark-gray rounded-full h-3 mb-4"
              data-oid="bfn5lsu">

                <div
                className="h-3 rounded-full bg-gradient-to-r from-matrix-primary-green to-matrix-secondary-green transition-all duration-1000 ease-out"
                style={{
                  width: isVisible ? `${skill.level}%` : "0%",
                  transitionDelay: `${index * 0.1 + 0.5}s`
                }}
                data-oid="rtu1sl8">
              </div>
              </div>

              {/* Binary Representation */}
              <div
              className="font-mono-matrix text-xs text-matrix-primary-green/50 overflow-hidden"
              data-oid="5retdqm">

                <div className="animate-pulse" data-oid="g76wf9v">
                  {Array.from({ length: Math.floor(skill.level / 5) }).map(
                  (_, i) =>
                  <span
                    key={i}
                    className="inline-block mr-1"
                    data-oid="7hpri5k">

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
          data-oid="i9dsepn">

          <div className="flex items-center mb-4" data-oid="qw8c4m0">
            <div className="flex space-x-2" data-oid="opiveko">
              <div
                className="w-3 h-3 rounded-full bg-red-500"
                data-oid="ub1sgfd">
              </div>
              <div
                className="w-3 h-3 rounded-full bg-yellow-500"
                data-oid="mjhu9g5">
              </div>
              <div
                className="w-3 h-3 rounded-full bg-matrix-primary-green"
                data-oid="p8hmtg0">
              </div>
            </div>
            <div
              className="flex-1 text-center font-mono-matrix text-matrix-primary-green"
              data-oid="c2k16e8">

              SKILL_ANALYZER_v3.0
            </div>
          </div>

          <div
            className="font-mono-matrix text-sm space-y-2"
            data-oid="f8g_yay">

            <div className="text-matrix-electric-blue" data-oid="fr:yxno">
              $ analyze --category {activeCategory.toLowerCase()}
            </div>
            <div className="text-matrix-light-gray" data-oid="-mr-n.u">
              Scanning {filteredSkills.length} skills...
            </div>
            <div className="text-matrix-primary-green" data-oid="l2xghf6">
              Average proficiency:{" "}
              {Math.round(
                filteredSkills.reduce((acc, skill) => acc + skill.level, 0) /
                filteredSkills.length
              )}
              %
            </div>
            <div className="text-matrix-light-gray" data-oid="p1i:-r7">
              Status: READY_FOR_PRODUCTION
            </div>
            <div
              className="text-matrix-primary-green animate-pulse"
              data-oid="ngr:htu">

              _
            </div>
          </div>
        </div>
      </div>
    </section>);

}