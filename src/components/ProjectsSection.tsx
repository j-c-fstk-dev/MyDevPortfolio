"use client";

import { useEffect, useState, useRef } from "react";

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  status: "COMPLETED" | "IN_PROGRESS" | "ARCHIVED";
  type: "WEB_APP" | "MOBILE_APP" | "API" | "BLOCKCHAIN" | "AI_ML";
  lines: number;
  commits: number;
}

export default function ProjectsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState("ALL");
  const sectionRef = useRef<HTMLElement>(null);

  const projects: Project[] = [
  {
    id: 1,
    title: "AI_CHATBOT_SYSTEM",
    description:
    "Advanced conversational AI with natural language processing and machine learning capabilities.",
    tech: ["Python", "TensorFlow", "FastAPI", "React", "PostgreSQL"],
    status: "COMPLETED",
    type: "AI_ML",
    lines: 15420,
    commits: 247
  },
  {
    id: 2,
    title: "ECOMMERCE_PLATFORM",
    description:
    "Full-stack e-commerce solution with real-time inventory, payment processing, and analytics.",
    tech: ["Next.js", "TypeScript", "Stripe", "Prisma", "AWS"],
    status: "COMPLETED",
    type: "WEB_APP",
    lines: 28350,
    commits: 412
  },
  {
    id: 3,
    title: "BLOCKCHAIN_DAPP",
    description:
    "Decentralized application for secure transactions with smart contract integration.",
    tech: ["Solidity", "Web3.js", "React", "Ethereum", "IPFS"],
    status: "IN_PROGRESS",
    type: "BLOCKCHAIN",
    lines: 8920,
    commits: 156
  },
  {
    id: 4,
    title: "MOBILE_FITNESS_APP",
    description:
    "Cross-platform fitness tracking app with real-time data synchronization.",
    tech: ["React Native", "Firebase", "Redux", "Node.js", "MongoDB"],
    status: "COMPLETED",
    type: "MOBILE_APP",
    lines: 19680,
    commits: 324
  },
  {
    id: 5,
    title: "MICROSERVICES_API",
    description:
    "Scalable microservices architecture with containerization and orchestration.",
    tech: ["Docker", "Kubernetes", "Node.js", "Redis", "GraphQL"],
    status: "IN_PROGRESS",
    type: "API",
    lines: 12750,
    commits: 189
  },
  {
    id: 6,
    title: "DATA_VISUALIZATION_TOOL",
    description:
    "Interactive dashboard for complex data analysis and real-time visualization.",
    tech: ["D3.js", "React", "Python", "FastAPI", "PostgreSQL"],
    status: "ARCHIVED",
    type: "WEB_APP",
    lines: 22100,
    commits: 298
  }];


  const filters = [
  "ALL",
  "WEB_APP",
  "MOBILE_APP",
  "API",
  "BLOCKCHAIN",
  "AI_ML"];


  const filteredProjects =
  filter === "ALL" ?
  projects :
  projects.filter((project) => project.type === filter);

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "text-matrix-primary-green";
      case "IN_PROGRESS":
        return "text-matrix-electric-blue";
      case "ARCHIVED":
        return "text-matrix-light-gray";
      default:
        return "text-matrix-light-gray";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "✓";
      case "IN_PROGRESS":
        return "⚡";
      case "ARCHIVED":
        return "📦";
      default:
        return "?";
    }
  };

  return (
    <section
      ref={sectionRef}
      id="section-3"
      className="min-h-screen flex items-center justify-center py-20 relative"
      data-oid="eb8ghw3">

      {/* Background Code */}
      <div
        className="absolute inset-0 opacity-5 overflow-hidden"
        data-oid="__04.lw">

        <pre
          className="font-mono-matrix text-xs text-matrix-primary-green leading-relaxed"
          data-oid="6mp.kum">

          {Array.from({ length: 50 }).map((_, i) =>
          <div key={i} data-oid="_yiqzgy">
              {`function project${i}() { return "innovation"; }`}
            </div>
          )}
        </pre>
      </div>

      <div className="container mx-auto px-6 relative z-10" data-oid="mzoowmp">
        {/* Section Header */}
        <div className="text-center mb-16" data-oid="48mo:dd">
          <h2
            className="text-4xl md:text-6xl font-mono-matrix text-glow-green mb-4"
            data-oid="nc2k5e6">

            PROJECT_ARCHIVE
          </h2>
          <div
            className="text-xl font-mono-matrix text-matrix-electric-blue"
            data-oid="9vmkgm3">

            &gt; SCANNING_REPOSITORIES...
          </div>
          <div
            className="w-32 h-1 bg-gradient-to-r from-matrix-primary-green to-matrix-electric-blue mx-auto mt-4"
            data-oid="bt_g_84">
          </div>
        </div>

        {/* Filter Tabs */}
        <div
          className="flex flex-wrap justify-center gap-2 mb-12"
          data-oid="hdb3zkt">

          {filters.map((filterType) =>
          <button
            key={filterType}
            onClick={() => setFilter(filterType)}
            className={`px-4 py-2 font-mono-matrix text-sm border rounded transition-all duration-300 ${
            filter === filterType ?
            "bg-matrix-primary-green/20 border-matrix-primary-green text-matrix-primary-green" :
            "bg-matrix-black/50 border-matrix-primary-green/30 text-matrix-light-gray hover:border-matrix-primary-green"}`
            }
            data-oid="kyht1ez">

              {filterType}
            </button>
          )}
        </div>

        {/* Projects Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          data-oid=":9vkqpz">

          {filteredProjects.map((project, index) =>
          <div
            key={project.id}
            className={`bg-matrix-black/50 border border-matrix-primary-green/30 rounded-lg p-6 cursor-pointer hover:border-matrix-primary-green hover:shadow-neon-green transition-all duration-500 transform ${
            isVisible ?
            "translate-y-0 opacity-100" :
            "translate-y-10 opacity-0"}`
            }
            style={{ transitionDelay: `${index * 0.1}s` }}
            onClick={() => setSelectedProject(project)}
            data-oid="l:f5-q9">

              {/* Project Header */}
              <div
              className="flex items-center justify-between mb-4"
              data-oid="rb6ssob">

                <div className="flex items-center gap-2" data-oid="rk_uo:i">
                  <span
                  className={getStatusColor(project.status)}
                  data-oid="1l1tj56">

                    {getStatusIcon(project.status)}
                  </span>
                  <span
                  className={`font-mono-matrix text-xs ${getStatusColor(project.status)}`}
                  data-oid="1va_:bb">

                    {project.status}
                  </span>
                </div>
                <span
                className="font-mono-matrix text-xs text-matrix-light-gray"
                data-oid="mfd51zk">

                  {project.type}
                </span>
              </div>

              {/* Project Title */}
              <h3
              className="font-mono-matrix text-lg text-matrix-primary-green mb-3 text-glow-green"
              data-oid="2jq7m3i">

                {project.title}
              </h3>

              {/* Project Description */}
              <p
              className="text-matrix-light-gray text-sm mb-4 line-clamp-3"
              data-oid="pgzt_65">

                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-1 mb-4" data-oid="2_c37d3">
                {project.tech.slice(0, 3).map((tech) =>
              <span
                key={tech}
                className="px-2 py-1 bg-matrix-primary-green/20 border border-matrix-primary-green/50 rounded text-xs font-mono-matrix text-matrix-primary-green"
                data-oid="wpc-gj3">

                    {tech}
                  </span>
              )}
                {project.tech.length > 3 &&
              <span
                className="px-2 py-1 text-xs font-mono-matrix text-matrix-light-gray"
                data-oid="s7wfq7g">

                    +{project.tech.length - 3}
                  </span>
              }
              </div>

              {/* Project Stats */}
              <div
              className="flex justify-between text-xs font-mono-matrix text-matrix-light-gray"
              data-oid="sgoszuv">

                <span data-oid="js900_n">
                  {project.lines.toLocaleString()} lines
                </span>
                <span data-oid="anmqw8k">{project.commits} commits</span>
              </div>

              {/* Binary Footer */}
              <div
              className="mt-4 font-mono-matrix text-xs text-matrix-primary-green/30 overflow-hidden"
              data-oid="f06-ivg">

                <div className="animate-pulse" data-oid="ji8.rqx">
                  {Array.from({ length: 20 }).map((_, i) =>
                <span
                  key={i}
                  className="inline-block mr-1"
                  data-oid="9wssy8_">

                      {Math.random() > 0.5 ? "1" : "0"}
                    </span>
                )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Project Modal */}
        {selectedProject &&
        <div
          className="fixed inset-0 bg-matrix-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          data-oid="2dtgj26">

            <div
            className="bg-matrix-black border-2 border-matrix-primary-green rounded-lg p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            data-oid="1uy4ulm">

              {/* Modal Header */}
              <div
              className="flex items-center justify-between mb-6"
              data-oid="b9gfm0f">

                <h3
                className="font-mono-matrix text-2xl text-glow-green"
                data-oid="i-t0e-4">

                  {selectedProject.title}
                </h3>
                <button
                onClick={() => setSelectedProject(null)}
                className="text-matrix-light-gray hover:text-matrix-primary-green transition-colors"
                data-oid="fpwz9p6">

                  ✕
                </button>
              </div>

              {/* Project Details */}
              <div className="space-y-6" data-oid="cu-t6r_">
                <div data-oid="y0i0oz3">
                  <h4
                  className="font-mono-matrix text-matrix-electric-blue mb-2"
                  data-oid="utmv:sw">

                    DESCRIPTION:
                  </h4>
                  <p className="text-matrix-light-gray" data-oid="uo61mxw">
                    {selectedProject.description}
                  </p>
                </div>

                <div data-oid="r74qyqp">
                  <h4
                  className="font-mono-matrix text-matrix-electric-blue mb-2"
                  data-oid="tkip233">

                    TECH_STACK:
                  </h4>
                  <div className="flex flex-wrap gap-2" data-oid="uctf46n">
                    {selectedProject.tech.map((tech) =>
                  <span
                    key={tech}
                    className="px-3 py-1 bg-matrix-primary-green/20 border border-matrix-primary-green/50 rounded font-mono-matrix text-matrix-primary-green"
                    data-oid="6w45ogq">

                        {tech}
                      </span>
                  )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4" data-oid="uuhs1yc">
                  <div data-oid="_9r-nnp">
                    <h4
                    className="font-mono-matrix text-matrix-electric-blue mb-2"
                    data-oid="-hv67.2">

                      STATUS:
                    </h4>
                    <span
                    className={`font-mono-matrix ${getStatusColor(selectedProject.status)}`}
                    data-oid="8haqy6e">

                      {getStatusIcon(selectedProject.status)}{" "}
                      {selectedProject.status}
                    </span>
                  </div>
                  <div data-oid="gdn7u_q">
                    <h4
                    className="font-mono-matrix text-matrix-electric-blue mb-2"
                    data-oid="m_:g7py">

                      TYPE:
                    </h4>
                    <span
                    className="font-mono-matrix text-matrix-light-gray"
                    data-oid="tvn9izy">

                      {selectedProject.type}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4" data-oid="100e29r">
                  <div data-oid="_bhicgt">
                    <h4
                    className="font-mono-matrix text-matrix-electric-blue mb-2"
                    data-oid="t6qwaft">

                      LINES_OF_CODE:
                    </h4>
                    <span
                    className="font-mono-matrix text-matrix-primary-green"
                    data-oid="ruc:t.9">

                      {selectedProject.lines.toLocaleString()}
                    </span>
                  </div>
                  <div data-oid="nmiq_mb">
                    <h4
                    className="font-mono-matrix text-matrix-electric-blue mb-2"
                    data-oid="2e5mq9z">

                      COMMITS:
                    </h4>
                    <span
                    className="font-mono-matrix text-matrix-primary-green"
                    data-oid=":vx1__t">

                      {selectedProject.commits}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-8" data-oid="yjyk3l1">
                <button
                className="px-6 py-2 bg-matrix-primary-green/20 border border-matrix-primary-green rounded font-mono-matrix text-matrix-primary-green hover:bg-matrix-primary-green/30 transition-all"
                data-oid="xnufdm1">

                  VIEW_CODE
                </button>
                <button
                className="px-6 py-2 bg-matrix-electric-blue/20 border border-matrix-electric-blue rounded font-mono-matrix text-matrix-electric-blue hover:bg-matrix-electric-blue/30 transition-all"
                data-oid="rqkbclc">

                  LIVE_DEMO
                </button>
              </div>
            </div>
          </div>
        }

        {/* Terminal Summary */}
        <div
          className="bg-matrix-black/70 border-2 border-matrix-primary-green rounded-lg p-6 max-w-4xl mx-auto"
          data-oid="1ajo0:1">

          <div
            className="font-mono-matrix text-sm space-y-2"
            data-oid="ytzk3vq">

            <div className="text-matrix-electric-blue" data-oid="fav-zh4">
              $ git log --oneline | wc -l
            </div>
            <div className="text-matrix-primary-green" data-oid="9yhjje5">
              {projects.reduce((acc, project) => acc + project.commits, 0)}{" "}
              total commits
            </div>
            <div className="text-matrix-electric-blue" data-oid="ey_lc3_">
              $ find . -name "*.js" -o -name "*.ts" -o -name "*.py" | xargs wc
              -l
            </div>
            <div className="text-matrix-primary-green" data-oid="p8ru7ix">
              {projects.
              reduce((acc, project) => acc + project.lines, 0).
              toLocaleString()}{" "}
              lines of code
            </div>
            <div className="text-matrix-light-gray" data-oid=".pd5uv4">
              Ready to build the next big thing...
            </div>
            <div
              className="text-matrix-primary-green animate-pulse"
              data-oid="al2q:hk">

              _
            </div>
          </div>
        </div>
      </div>
    </section>);

}