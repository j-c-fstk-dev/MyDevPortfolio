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
      data-oid="syqrgbx">

      {/* Background Timeline */}
      <div className="absolute inset-0 opacity-5" data-oid="8y.73zg">
        <div className="flex justify-center h-full" data-oid="qdz805p">
          <div
            className="w-px bg-matrix-primary-green"
            data-oid="5jtbede">
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10" data-oid="m5dpg53">
        {/* Section Header */}
        <div className="text-center mb-16" data-oid="_9_6:5w">
          <h2
            className="text-4xl md:text-6xl font-mono-matrix text-glow-green mb-4"
            data-oid="n6dd97p">

            EXPERIENCE_LOG
          </h2>
          <div
            className="text-xl font-mono-matrix text-matrix-electric-blue"
            data-oid="8aq6t.j">

            &gt; PARSING_CAREER_HISTORY...
          </div>
          <div
            className="w-32 h-1 bg-gradient-to-r from-matrix-primary-green to-matrix-electric-blue mx-auto mt-4"
            data-oid="go29j50">
          </div>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto" data-oid="fx.bh_m">
          {/* Central Line */}
          <div
            className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-matrix-primary-green to-matrix-electric-blue"
            data-oid="aqlzya8">
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
            data-oid="d3wtwme">

              {/* Content Card */}
              <div
              className={`w-5/12 ${index % 2 === 0 ? "pr-8" : "pl-8"}`}
              data-oid="t5d27u8">

                <div
                className="bg-matrix-black/70 border-2 border-matrix-primary-green/30 rounded-lg p-6 cursor-pointer hover:border-matrix-primary-green hover:shadow-neon-green transition-all duration-300"
                onClick={() => setSelectedExperience(experience)}
                data-oid="w7m-lj0">

                  {/* Experience Header */}
                  <div
                  className="flex items-center justify-between mb-4"
                  data-oid="38oo87o">

                    <div className="flex items-center gap-2" data-oid="q-49f8f">
                      <span data-oid="vr5c5z-">
                        {getTypeIcon(experience.type)}
                      </span>
                      <span
                      className={`font-mono-matrix text-xs ${getTypeColor(experience.type)}`}
                      data-oid="4e:5q1:">

                        {experience.type}
                      </span>
                    </div>
                    <span
                    className="font-mono-matrix text-sm text-matrix-electric-blue"
                    data-oid="gtom_p4">

                      {experience.year}
                    </span>
                  </div>

                  {/* Title & Company */}
                  <h3
                  className="font-mono-matrix text-lg text-matrix-primary-green mb-2 text-glow-green"
                  data-oid="v3uj4n3">

                    {experience.title}
                  </h3>
                  <div
                  className="font-mono-matrix text-matrix-electric-blue mb-4"
                  data-oid="0ii7qxo">

                    @ {experience.company}
                  </div>

                  {/* Description */}
                  <p
                  className="text-matrix-light-gray text-sm mb-4"
                  data-oid="zopsujg">

                    {experience.description}
                  </p>

                  {/* Tech Stack Preview */}
                  <div className="flex flex-wrap gap-1 mb-4" data-oid="ti6ldrt">
                    {experience.tech.slice(0, 3).map((tech) =>
                  <span
                    key={tech}
                    className="px-2 py-1 bg-matrix-primary-green/20 border border-matrix-primary-green/50 rounded text-xs font-mono-matrix text-matrix-primary-green"
                    data-oid="qe6:ui1">

                        {tech}
                      </span>
                  )}
                    {experience.tech.length > 3 &&
                  <span
                    className="px-2 py-1 text-xs font-mono-matrix text-matrix-light-gray"
                    data-oid="dbh8irs">

                        +{experience.tech.length - 3}
                      </span>
                  }
                  </div>

                  {/* Click to expand */}
                  <div
                  className="text-xs font-mono-matrix text-matrix-primary-green/50"
                  data-oid="ikh_l87">

                    &gt; CLICK_TO_EXPAND
                  </div>
                </div>
              </div>

              {/* Timeline Node */}
              <div
              className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-matrix-primary-green border-4 border-matrix-black rounded-full shadow-neon-green z-10"
              data-oid="u3zei7h">
            </div>

              {/* Year Label */}
              <div
              className={`w-5/12 ${index % 2 === 0 ? "pl-8" : "pr-8"} flex ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
              data-oid="gd-pvrx">

                <div
                className="bg-matrix-black/50 border border-matrix-primary-green/50 rounded px-4 py-2"
                data-oid="j5t6k8.">

                  <span
                  className="font-mono-matrix text-matrix-primary-green font-bold"
                  data-oid="96iftdz">

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
          data-oid="tyvllrz">

            <div
            className="bg-matrix-black border-2 border-matrix-primary-green rounded-lg p-8 max-w-3xl w-full max-h-[80vh] overflow-y-auto"
            data-oid="_8jsxq1">

              {/* Modal Header */}
              <div
              className="flex items-center justify-between mb-6"
              data-oid="dnsm.3p">

                <div data-oid="db00t.f">
                  <h3
                  className="font-mono-matrix text-2xl text-glow-green mb-2"
                  data-oid=":6347b6">

                    {selectedExperience.title}
                  </h3>
                  <div
                  className="font-mono-matrix text-matrix-electric-blue"
                  data-oid="g5vasjh">

                    @ {selectedExperience.company} | {selectedExperience.year}
                  </div>
                </div>
                <button
                onClick={() => setSelectedExperience(null)}
                className="text-matrix-light-gray hover:text-matrix-primary-green transition-colors text-2xl"
                data-oid="qarwk2g">

                  ✕
                </button>
              </div>

              {/* Experience Details */}
              <div className="space-y-6" data-oid=".0qa.s.">
                <div data-oid="e1vkib7">
                  <h4
                  className="font-mono-matrix text-matrix-electric-blue mb-3"
                  data-oid="fdl.q6k">

                    DESCRIPTION:
                  </h4>
                  <p
                  className="text-matrix-light-gray leading-relaxed"
                  data-oid="cvmjjti">

                    {selectedExperience.description}
                  </p>
                </div>

                <div data-oid="f:m:zdh">
                  <h4
                  className="font-mono-matrix text-matrix-electric-blue mb-3"
                  data-oid="lny4xzt">

                    TECHNOLOGIES:
                  </h4>
                  <div className="flex flex-wrap gap-2" data-oid="l735dlp">
                    {selectedExperience.tech.map((tech) =>
                  <span
                    key={tech}
                    className="px-3 py-1 bg-matrix-primary-green/20 border border-matrix-primary-green/50 rounded font-mono-matrix text-matrix-primary-green"
                    data-oid="y1vndl0">

                        {tech}
                      </span>
                  )}
                  </div>
                </div>

                <div data-oid="t6dwje9">
                  <h4
                  className="font-mono-matrix text-matrix-electric-blue mb-3"
                  data-oid="8ksj:9j">

                    KEY_ACHIEVEMENTS:
                  </h4>
                  <ul className="space-y-2" data-oid="_9x3alc">
                    {selectedExperience.achievements.map(
                    (achievement, index) =>
                    <li
                      key={index}
                      className="flex items-start gap-3"
                      data-oid="p0srfny">

                          <span
                        className="text-matrix-primary-green mt-1"
                        data-oid="-2hyizu">

                            ▶
                          </span>
                          <span
                        className="text-matrix-light-gray"
                        data-oid="mreuh50">

                            {achievement}
                          </span>
                        </li>

                  )}
                  </ul>
                </div>

                <div className="flex items-center gap-4" data-oid="enfg-x4">
                  <div data-oid="32v7hgz">
                    <h4
                    className="font-mono-matrix text-matrix-electric-blue mb-2"
                    data-oid="v4dz277">

                      TYPE:
                    </h4>
                    <span
                    className={`font-mono-matrix ${getTypeColor(selectedExperience.type)}`}
                    data-oid="ykd1q2t">

                      {getTypeIcon(selectedExperience.type)}{" "}
                      {selectedExperience.type}
                    </span>
                  </div>
                  <div data-oid="l959-uk">
                    <h4
                    className="font-mono-matrix text-matrix-electric-blue mb-2"
                    data-oid="p5ijxc2">

                      DURATION:
                    </h4>
                    <span
                    className="font-mono-matrix text-matrix-light-gray"
                    data-oid="shlk.6h">

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
          data-oid="age7kn9">

          <div
            className="font-mono-matrix text-sm space-y-2"
            data-oid="1klskcj">

            <div className="text-matrix-electric-blue" data-oid="6m9hcx6">
              $ career --summary
            </div>
            <div className="text-matrix-primary-green" data-oid="4iwja58">
              Total Experience: {new Date().getFullYear() - 2020}+ years
            </div>
            <div className="text-matrix-primary-green" data-oid="wmfzvia">
              Companies Worked: {experiences.length}
            </div>
            <div className="text-matrix-primary-green" data-oid="0ryetps">
              Technologies Mastered: 20+
            </div>
            <div className="text-matrix-light-gray" data-oid="juk:hjl">
              Status: READY_FOR_NEXT_CHALLENGE
            </div>
            <div
              className="text-matrix-primary-green animate-pulse"
              data-oid="8r8ag-k">

              _
            </div>
          </div>
        </div>
      </div>
    </section>);

}