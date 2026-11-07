"use client";

import { useEffect, useState, useRef } from "react";

interface Experience {
  id: number;
  year: string;
  title: string;
  company: string;
  description: string;
  tech: string[];
  achievements: string[];
  type: "FULL_TIME" | "CONTRACT" | "FREELANCE";
}

export default function ExperienceSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedExperience, setSelectedExperience] =
  useState<Experience | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const experiences: Experience[] = [
  {
    id: 1,
    year: "2024",
    title: "SENIOR_FULL_STACK_DEVELOPER",
    company: "TECHCORP_INDUSTRIES",
    description:
    "Leading development of AI-powered applications and cloud infrastructure solutions.",
    tech: ["React", "Node.js", "AWS", "Python", "Docker", "Kubernetes"],
    achievements: [
    "Architected microservices handling 1M+ daily requests",
    "Reduced deployment time by 75% with CI/CD automation",
    "Led team of 5 developers on critical projects"],


    type: "FULL_TIME"
  },
  {
    id: 2,
    year: "2022-2024",
    title: "FULL_STACK_DEVELOPER",
    company: "STARTUP_XYZ",
    description:
    "Built scalable web applications and implemented DevOps practices from ground up.",
    tech: ["TypeScript", "Next.js", "PostgreSQL", "GraphQL", "Terraform"],
    achievements: [
    "Developed MVP that secured $2M Series A funding",
    "Implemented real-time features serving 50K+ users",
    "Established testing practices achieving 95% coverage"],


    type: "FULL_TIME"
  },
  {
    id: 3,
    year: "2021-2022",
    title: "FRONTEND_DEVELOPER",
    company: "DIGITAL_AGENCY",
    description:
    "Created responsive web applications and optimized user experiences for various clients.",
    tech: ["React", "JavaScript", "CSS", "REST APIs", "Firebase"],
    achievements: [
    "Delivered 15+ client projects on time and budget",
    "Improved page load speeds by 60% on average",
    "Mentored 3 junior developers"],


    type: "CONTRACT"
  },
  {
    id: 4,
    year: "2020-2021",
    title: "FREELANCE_DEVELOPER",
    company: "INDEPENDENT",
    description:
    "Provided custom web development solutions for small businesses and startups.",
    tech: ["Vue.js", "PHP", "MySQL", "WordPress", "Shopify"],
    achievements: [
    "Completed 25+ freelance projects",
    "Maintained 5-star rating across all platforms",
    "Generated $100K+ in revenue"],


    type: "FREELANCE"
  }];


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

  const getTypeColor = (type: string) => {
    switch (type) {
      case "FULL_TIME":
        return "text-matrix-primary-green";
      case "CONTRACT":
        return "text-matrix-electric-blue";
      case "FREELANCE":
        return "text-yellow-400";
      default:
        return "text-matrix-light-gray";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "FULL_TIME":
        return "🏢";
      case "CONTRACT":
        return "📋";
      case "FREELANCE":
        return "💼";
      default:
        return "💻";
    }
  };

  return (
    <section
      ref={sectionRef}
      id="section-4"
      className="min-h-screen flex items-center justify-center py-20 relative"
     >

      {/* Background Timeline */}
      <div className="absolute inset-0 opacity-5">
        <div className="flex justify-center h-full">
          <div
            className="w-px bg-matrix-primary-green"
           >
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-6xl font-mono-matrix text-glow-green mb-4"
           >

            EXPERIENCE_LOG
          </h2>
          <div
            className="text-xl font-mono-matrix text-matrix-electric-blue"
           >

            &gt; PARSING_CAREER_HISTORY...
          </div>
          <div
            className="w-32 h-1 bg-gradient-to-r from-matrix-primary-green to-matrix-electric-blue mx-auto mt-4"
           >
          </div>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Central Line */}
          <div
            className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-matrix-primary-green to-matrix-electric-blue"
           >
          </div>

          {experiences.map((experience, index) =>
          <div
            key={experience.id}
            className={`relative flex items-center mb-16 ${
            index % 2 === 0 ? "flex-row" : "flex-row-reverse"} transition-all duration-1000 ${

            isVisible ?
            "opacity-100 translate-y-0" :
            "opacity-0 translate-y-10"}`
            }
            style={{ transitionDelay: `${index * 0.3}s` }}
           >

              {/* Content Card */}
              <div
              className={`w-5/12 ${index % 2 === 0 ? "pr-8" : "pl-8"}`}
             >

                <div
                className="bg-matrix-black/70 border-2 border-matrix-primary-green/30 rounded-lg p-6 cursor-pointer hover:border-matrix-primary-green hover:shadow-neon-green transition-all duration-300"
                onClick={() => setSelectedExperience(experience)}
               >

                  {/* Experience Header */}
                  <div
                  className="flex items-center justify-between mb-4"
                 >

                    <div className="flex items-center gap-2">
                      <span>
                        {getTypeIcon(experience.type)}
                      </span>
                      <span
                      className={`font-mono-matrix text-xs ${getTypeColor(experience.type)}`}
                     >

                        {experience.type}
                      </span>
                    </div>
                    <span
                    className="font-mono-matrix text-sm text-matrix-electric-blue"
                   >

                      {experience.year}
                    </span>
                  </div>

                  {/* Title & Company */}
                  <h3
                  className="font-mono-matrix text-lg text-matrix-primary-green mb-2 text-glow-green"
                 >

                    {experience.title}
                  </h3>
                  <div
                  className="font-mono-matrix text-matrix-electric-blue mb-4"
                 >

                    @ {experience.company}
                  </div>

                  {/* Description */}
                  <p
                  className="text-matrix-light-gray text-sm mb-4"
                 >

                    {experience.description}
                  </p>

                  {/* Tech Stack Preview */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {experience.tech.slice(0, 3).map((tech) =>
                  <span
                    key={tech}
                    className="px-2 py-1 bg-matrix-primary-green/20 border border-matrix-primary-green/50 rounded text-xs font-mono-matrix text-matrix-primary-green"
                   >

                        {tech}
                      </span>
                  )}
                    {experience.tech.length > 3 &&
                  <span
                    className="px-2 py-1 text-xs font-mono-matrix text-matrix-light-gray"
                   >

                        +{experience.tech.length - 3}
                      </span>
                  }
                  </div>

                  {/* Click to expand */}
                  <div
                  className="text-xs font-mono-matrix text-matrix-primary-green/50"
                 >

                    &gt; CLICK_TO_EXPAND
                  </div>
                </div>
              </div>

              {/* Timeline Node */}
              <div
              className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-matrix-primary-green border-4 border-matrix-black rounded-full shadow-neon-green z-10"
             >
            </div>

              {/* Year Label */}
              <div
              className={`w-5/12 ${index % 2 === 0 ? "pl-8" : "pr-8"} flex ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
             >

                <div
                className="bg-matrix-black/50 border border-matrix-primary-green/50 rounded px-4 py-2"
               >

                  <span
                  className="font-mono-matrix text-matrix-primary-green font-bold"
                 >

                    {experience.year}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Experience Modal */}
        {selectedExperience &&
        <div
          className="fixed inset-0 bg-matrix-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
         >

            <div
            className="bg-matrix-black border-2 border-matrix-primary-green rounded-lg p-8 max-w-3xl w-full max-h-[80vh] overflow-y-auto"
           >

              {/* Modal Header */}
              <div
              className="flex items-center justify-between mb-6"
             >

                <div>
                  <h3
                  className="font-mono-matrix text-2xl text-glow-green mb-2"
                 >

                    {selectedExperience.title}
                  </h3>
                  <div
                  className="font-mono-matrix text-matrix-electric-blue"
                 >

                    @ {selectedExperience.company} | {selectedExperience.year}
                  </div>
                </div>
                <button
                onClick={() => setSelectedExperience(null)}
                className="text-matrix-light-gray hover:text-matrix-primary-green transition-colors text-2xl"
               >

                  ✕
                </button>
              </div>

              {/* Experience Details */}
              <div className="space-y-6">
                <div>
                  <h4
                  className="font-mono-matrix text-matrix-electric-blue mb-3"
                 >

                    DESCRIPTION:
                  </h4>
                  <p
                  className="text-matrix-light-gray leading-relaxed"
                 >

                    {selectedExperience.description}
                  </p>
                </div>

                <div>
                  <h4
                  className="font-mono-matrix text-matrix-electric-blue mb-3"
                 >

                    TECHNOLOGIES:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedExperience.tech.map((tech) =>
                  <span
                    key={tech}
                    className="px-3 py-1 bg-matrix-primary-green/20 border border-matrix-primary-green/50 rounded font-mono-matrix text-matrix-primary-green"
                   >

                        {tech}
                      </span>
                  )}
                  </div>
                </div>

                <div>
                  <h4
                  className="font-mono-matrix text-matrix-electric-blue mb-3"
                 >

                    KEY_ACHIEVEMENTS:
                  </h4>
                  <ul className="space-y-2">
                    {selectedExperience.achievements.map(
                    (achievement, index) =>
                    <li
                      key={index}
                      className="flex items-start gap-3"
                     >

                          <span
                        className="text-matrix-primary-green mt-1"
                       >

                            ▶
                          </span>
                          <span
                        className="text-matrix-light-gray"
                       >

                            {achievement}
                          </span>
                        </li>

                  )}
                  </ul>
                </div>

                <div className="flex items-center gap-4">
                  <div>
                    <h4
                    className="font-mono-matrix text-matrix-electric-blue mb-2"
                   >

                      TYPE:
                    </h4>
                    <span
                    className={`font-mono-matrix ${getTypeColor(selectedExperience.type)}`}
                   >

                      {getTypeIcon(selectedExperience.type)}{" "}
                      {selectedExperience.type}
                    </span>
                  </div>
                  <div>
                    <h4
                    className="font-mono-matrix text-matrix-electric-blue mb-2"
                   >

                      DURATION:
                    </h4>
                    <span
                    className="font-mono-matrix text-matrix-light-gray"
                   >

                      {selectedExperience.year}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }

        {/* Career Summary */}
        <div
          className="mt-16 bg-matrix-black/70 border-2 border-matrix-primary-green rounded-lg p-6 max-w-4xl mx-auto"
         >

          <div
            className="font-mono-matrix text-sm space-y-2"
           >

            <div className="text-matrix-electric-blue">
              $ career --summary
            </div>
            <div className="text-matrix-primary-green">
              Total Experience: {new Date().getFullYear() - 2020}+ years
            </div>
            <div className="text-matrix-primary-green">
              Companies Worked: {experiences.length}
            </div>
            <div className="text-matrix-primary-green">
              Technologies Mastered: 20+
            </div>
            <div className="text-matrix-light-gray">
              Status: READY_FOR_NEXT_CHALLENGE
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