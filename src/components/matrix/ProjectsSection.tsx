"use client";

import { useEffect, useRef, useState } from "react";
import {
  categoryLabels,
  contact,
  projects,
  statusLabels,
  type Project,
  type ProjectCategory,
  type ProjectStatus,
} from "@/data/portfolio";

const toCommand = (text: string) => text.toUpperCase().replace(/[^A-Z0-9]+/g, "_");

const statusStyle: Record<ProjectStatus, { color: string; icon: string }> = {
  live: { color: "text-matrix-primary-green", icon: "●" },
  beta: { color: "text-matrix-electric-blue", icon: "◐" },
  "in-development": { color: "text-yellow-400", icon: "⚡" },
  prototype: { color: "text-matrix-light-gray", icon: "◇" },
};

const filters: ("ALL" | ProjectCategory)[] = ["ALL", ...(Object.keys(categoryLabels) as ProjectCategory[])];

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap gap-3">
      {project.repo && (
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-matrix-primary-green/20 border border-matrix-primary-green rounded font-mono-matrix text-matrix-primary-green hover:bg-matrix-primary-green/30 transition-all"
        >
          VIEW_CODE ↗
        </a>
      )}
      {project.live && (
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-matrix-electric-blue/20 border border-matrix-electric-blue rounded font-mono-matrix text-matrix-electric-blue hover:bg-matrix-electric-blue/30 transition-all"
        >
          LIVE_SITE ↗
        </a>
      )}
    </div>
  );
}

export default function ProjectsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);
  const [filter, setFilter] = useState<(typeof filters)[number]>("ALL");
  const sectionRef = useRef<HTMLElement>(null);

  const visible = filter === "ALL" ? projects : projects.filter((p) => p.category === filter);

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

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  return (
    <section
      ref={sectionRef}
      id="section-3"
      className="min-h-screen flex items-center justify-center py-20 relative"
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-mono-matrix text-glow-green mb-4">PROJECT_ARCHIVE</h2>
          <div className="text-xl font-mono-matrix text-matrix-electric-blue">&gt; SCANNING_REPOSITORIES...</div>
          <div className="w-32 h-1 bg-gradient-to-r from-matrix-primary-green to-matrix-electric-blue mx-auto mt-4" />
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`px-4 py-2 font-mono-matrix text-sm border rounded transition-all duration-300 ${
                filter === f
                  ? "bg-matrix-primary-green/20 border-matrix-primary-green text-matrix-primary-green"
                  : "bg-matrix-black/50 border-matrix-primary-green/30 text-matrix-light-gray hover:border-matrix-primary-green"
              }`}
            >
              {f === "ALL" ? "ALL" : toCommand(categoryLabels[f])}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {visible.map((project, index) => {
            const status = statusStyle[project.status];
            return (
              <button
                key={project.title}
                type="button"
                onClick={() => setSelected(project)}
                className={`flex flex-col text-left bg-matrix-black/50 border border-matrix-primary-green/30 rounded-lg p-6 hover:border-matrix-primary-green hover:shadow-neon-green transition-all duration-500 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${Math.min(index, 8) * 0.05}s` }}
              >
                <div className="w-full flex items-center justify-between mb-4 font-mono-matrix text-xs">
                  <span className={status.color}>
                    {status.icon} {toCommand(statusLabels[project.status])}
                  </span>
                  <span className="text-matrix-light-gray">{toCommand(project.context)}</span>
                </div>
                <h3 className="font-mono-matrix text-xl text-matrix-primary-green mb-3 text-glow-green">
                  {toCommand(project.title)}
                </h3>
                <p className="text-matrix-light-gray text-sm mb-4 line-clamp-3">{project.description}</p>
                <div className="flex flex-wrap gap-1">
                  {project.tech.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-matrix-primary-green/20 border border-matrix-primary-green/50 rounded text-xs font-mono-matrix text-matrix-primary-green"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="px-2 py-1 text-xs font-mono-matrix text-matrix-light-gray">
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {selected && (
          <div
            className="fixed inset-0 bg-matrix-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setSelected(null)}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-dialog-title"
              className="bg-matrix-black border-2 border-matrix-primary-green rounded-lg p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4 mb-6">
                <h3 id="project-dialog-title" className="font-mono-matrix text-2xl text-glow-green">
                  {toCommand(selected.title)}
                </h3>
                <button
                  onClick={() => setSelected(null)}
                  className="text-matrix-light-gray hover:text-matrix-primary-green transition-colors"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-mono-matrix text-matrix-electric-blue mb-2">DESCRIPTION:</h4>
                  <p className="text-matrix-light-gray">{selected.description}</p>
                </div>
                <div>
                  <h4 className="font-mono-matrix text-matrix-electric-blue mb-2">TECH_STACK:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selected.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-matrix-primary-green/20 border border-matrix-primary-green/50 rounded font-mono-matrix text-matrix-primary-green"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 font-mono-matrix">
                  <div>
                    <h4 className="text-matrix-electric-blue mb-2">STATUS:</h4>
                    <span className={statusStyle[selected.status].color}>
                      {statusStyle[selected.status].icon} {toCommand(statusLabels[selected.status])}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-matrix-electric-blue mb-2">BUILT_FOR:</h4>
                    <span className="text-matrix-light-gray">{toCommand(selected.context)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <ProjectLinks project={selected} />
              </div>
            </div>
          </div>
        )}

        <div className="bg-matrix-black/70 border-2 border-matrix-primary-green rounded-lg p-6 max-w-4xl mx-auto font-mono-matrix text-sm space-y-2">
          <div className="text-matrix-electric-blue">$ ls projects/ | wc -l</div>
          <div className="text-matrix-primary-green">
            {projects.length} projects listed · {projects.filter((p) => p.status === "live").length} live in production
          </div>
          <div className="text-matrix-electric-blue">$ open github</div>
          <a
            href={`${contact.github}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-matrix-light-gray hover:text-matrix-primary-green underline"
          >
            {contact.github.replace("https://", "")} ↗
          </a>
          <div className="text-matrix-primary-green animate-pulse">_</div>
        </div>
      </div>
    </section>
  );
}
