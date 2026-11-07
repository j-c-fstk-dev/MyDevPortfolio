"use client";

import { useState } from "react";
import type { Project, ProjectCategory, ProjectStatus } from "@/data/portfolio";

type Filter = "all" | ProjectCategory;

export default function MoreProjects({
  projects,
  categoryLabels,
  statusLabels,
  labels,
}: {
  projects: Project[];
  categoryLabels: Record<ProjectCategory, string>;
  statusLabels: Record<ProjectStatus, string>;
  labels: { all: string; filter: string; sourceCode: string };
}) {
  const [filter, setFilter] = useState<Filter>("all");

  // Only offer filters that have at least one project.
  const categories = (Object.keys(categoryLabels) as ProjectCategory[]).filter((c) =>
    projects.some((p) => p.category === c)
  );
  const visible = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  const chip = (value: Filter, label: string) => (
    <button
      key={value}
      type="button"
      onClick={() => setFilter(value)}
      aria-pressed={filter === value}
      className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
        filter === value ? "bg-pine text-on-pine" : "bg-surface text-ink ring-1 ring-line hover:ring-pine/50"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="mt-6">
      <div className="flex flex-wrap gap-2" role="group" aria-label={labels.filter}>
        {chip("all", labels.all)}
        {categories.map((c) => chip(c, categoryLabels[c]))}
      </div>

      <ul className="mt-6 grid gap-x-10 md:grid-cols-2" aria-live="polite">
        {visible.map((project) => {
          const href = project.live ?? project.repo;
          return (
            <li key={project.slug} className="border-t border-line py-5">
              <div className="flex items-baseline justify-between gap-4">
                <h4 className="text-lg font-semibold">
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-transparent decoration-2 underline-offset-4 transition-[text-decoration-color] hover:decoration-signal"
                    >
                      {project.title}
                    </a>
                  ) : (
                    project.title
                  )}
                </h4>
                <span className="shrink-0 text-sm text-lichen">{statusLabels[project.status]}</span>
              </div>
              <p className="mt-1 leading-relaxed text-lichen">{project.description}</p>
              {project.live && project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-sm text-pine underline decoration-pine/30 underline-offset-4 hover:decoration-signal"
                >
                  {labels.sourceCode}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
