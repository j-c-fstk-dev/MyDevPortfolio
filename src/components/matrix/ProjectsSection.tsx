"use client";

import Image from "next/image";
import { projectScreenshot } from "@/lib/project-previews";
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
  live: { color: "text-matrix-accent", icon: "●" },
  released: { color: "text-matrix-accent", icon: "●" },
  beta: { color: "text-matrix-highlight", icon: "◐" },
  "in-development": { color: "text-yellow-400", icon: "⚡" },
  prototype: { color: "text-matrix-light-gray", icon: "◇" },
};

const filters: ("ALL" | ProjectCategory)[] = ["ALL", ...(Object.keys(categoryLabels) as ProjectCategory[])];

function ProjectLinks({ project, onPreview }: { project: Project; onPreview?: () => void }) {
  const links = [
    ...(project.repo ? [{ href: project.repo, label: "VIEW_CODE" }] : []),
    ...(project.live ? [{ href: project.live, label: project.liveLabel ? toCommand(project.liveLabel) : "LIVE_SITE" }] : []),
    ...(project.links ?? []).map(({ href, label }) => ({ href, label: toCommand(label) })),
  ];
  const actionClass = "rounded border border-matrix-highlight/50 px-2.5 py-1.5 font-mono-matrix text-sm text-matrix-highlight transition-colors hover:border-matrix-highlight hover:bg-matrix-highlight/15";

  if (!links.length && !onPreview) return null;
  return (
    <div className="mt-auto flex flex-wrap gap-2 pt-4">
      {links.map(({ href, label }) => (
        <a key={href} href={href} target="_blank" rel="noopener noreferrer" className={actionClass}>
          {label} ↗
        </a>
      ))}
      {onPreview && (
        <button type="button" aria-haspopup="dialog" onClick={onPreview} className={actionClass}>
          PREVIEW
        </button>
      )}
    </div>
  );
}

export default function ProjectsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);
  const [filter, setFilter] = useState<(typeof filters)[number]>("ALL");
  const sectionRef = useRef<HTMLElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const screenshot = selected && projectScreenshot(selected.slug);

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
    const dialog = dialogRef.current;
    if (!dialog || !selected) return;
    dialog.showModal();
    return () => dialog.close();
  }, [selected]);

  const closeProject = () => {
    dialogRef.current?.close();
    setSelected(null);
  };

  return (
    <section
      ref={sectionRef}
      id="section-3"
      className="min-h-screen flex items-center justify-center py-20 relative"
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-mono-matrix text-phosphor-glow mb-4">PROJECT_ARCHIVE</h2>
          <div className="text-xl font-mono-matrix text-matrix-highlight">&gt; SCANNING_REPOSITORIES...</div>
          <div className="w-32 h-1 bg-gradient-to-r from-matrix-accent to-matrix-highlight mx-auto mt-4" />
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`px-4 py-2 font-mono-matrix text-sm border rounded transition-all duration-300 ${
                filter === f
                  ? "bg-matrix-accent/20 border-matrix-accent text-matrix-accent"
                  : "bg-matrix-black/50 border-matrix-accent/30 text-matrix-light-gray hover:border-matrix-accent"
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
              <article
                key={project.slug}
                className={`flex flex-col text-left bg-matrix-black/50 border border-matrix-accent/30 rounded-lg p-6 hover:border-matrix-accent hover:bg-matrix-dark-gray transition-all duration-500 ${
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
                <h3 className="font-mono-matrix text-xl text-matrix-accent mb-3">
                  <button
                    type="button"
                    aria-haspopup="dialog"
                    onClick={() => setSelected(project)}
                    className="break-all text-left underline-offset-4 hover:underline"
                  >
                    {toCommand(project.title)}
                  </button>
                </h3>
                <p className="text-matrix-light-gray text-sm mb-4 line-clamp-3">{project.description}</p>
                {project.chains && (
                  <p className="mb-4 font-mono-matrix text-matrix-light-gray text-sm">
                    {project.chains.join(" · ")}
                  </p>
                )}
                <div className="flex flex-wrap gap-1">
                  {project.tech.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-matrix-accent/20 border border-matrix-accent/50 rounded text-xs font-mono-matrix text-matrix-accent"
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
                <ProjectLinks
                  project={project}
                  onPreview={projectScreenshot(project.slug) ? () => setSelected(project) : undefined}
                />
              </article>
            );
          })}
        </div>

        {selected && (
          <dialog
            ref={dialogRef}
            role="dialog"
            aria-labelledby="project-dialog-title"
            className="m-auto max-h-[85dvh] w-[calc(100%_-_2rem)] max-w-2xl overflow-y-auto rounded-lg border-2 border-matrix-accent bg-matrix-black p-0 backdrop:bg-matrix-black/80 backdrop:backdrop-blur-sm"
            onClick={(event) => {
              if (event.target === event.currentTarget) closeProject();
            }}
            onCancel={(event) => {
              event.preventDefault();
              closeProject();
            }}
          >
            <div className="p-4 sm:p-8">
              <div className="flex items-start justify-between gap-4 mb-6">
                <h3 id="project-dialog-title" className="font-mono-matrix text-2xl text-matrix-accent">
                  {toCommand(selected.title)}
                </h3>
                <button
                  onClick={closeProject}
                  className="text-matrix-light-gray hover:text-matrix-accent transition-colors"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                {screenshot && (
                  <Image
                    src={screenshot}
                    alt={selected.previewAlt ?? `Screenshot of ${selected.title}`}
                    width={1280}
                    height={800}
                    sizes="(min-width: 640px) 576px, 100vw"
                    className="aspect-[16/10] w-full rounded-lg border border-matrix-accent/30 object-cover object-top"
                  />
                )}
                <div>
                  <h4 className="font-mono-matrix text-matrix-highlight mb-2">DESCRIPTION:</h4>
                  <p className="text-matrix-light-gray">{selected.description}</p>
                  {selected.chains && (
                    <p className="mt-3 font-mono-matrix text-matrix-light-gray text-sm">
                      {selected.chains.join(" · ")}
                    </p>
                  )}
                </div>
                <div>
                  <h4 className="font-mono-matrix text-matrix-highlight mb-2">TECH_STACK:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selected.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-matrix-accent/20 border border-matrix-accent/50 rounded font-mono-matrix text-matrix-accent"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 font-mono-matrix">
                  <div>
                    <h4 className="text-matrix-highlight mb-2">STATUS:</h4>
                    <span className={statusStyle[selected.status].color}>
                      {statusStyle[selected.status].icon} {toCommand(statusLabels[selected.status])}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-matrix-highlight mb-2">BUILT_FOR:</h4>
                    <span className="text-matrix-light-gray">{toCommand(selected.context)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <ProjectLinks project={selected} />
              </div>
            </div>
          </dialog>
        )}

        <div className="bg-matrix-black/70 border-2 border-matrix-accent rounded-lg p-6 max-w-4xl mx-auto font-mono-matrix text-sm space-y-2">
          <div className="text-matrix-highlight">$ ls projects/ | wc -l</div>
          <div className="text-matrix-accent">
            {projects.length} projects listed · {projects.filter((p) => p.status === "live").length} live in production
          </div>
          <div className="text-matrix-highlight">$ open github</div>
          <a
            href={`${contact.github}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-matrix-light-gray hover:text-matrix-accent underline"
          >
            {contact.github.replace("https://", "")} ↗
          </a>
          <div className="text-matrix-accent animate-pulse">_</div>
        </div>
      </div>
    </section>
  );
}
