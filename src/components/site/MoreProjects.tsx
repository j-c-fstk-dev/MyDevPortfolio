"use client";

import { useEffect, useRef, useState } from "react";
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
  const listRef = useRef<HTMLUListElement>(null);

  // Cards rendered after a filter change are new elements, so watch them here.
  useEffect(() => {
    const cards = listRef.current?.querySelectorAll<HTMLElement>('[data-reveal="attract"]:not([data-visible="true"])');
    if (!cards?.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.visible = "true";
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [filter]);

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

      <ul ref={listRef} className="mt-8 grid gap-5 md:grid-cols-2" aria-live="polite">
        {visible.map((project, i) => {
          const href = project.live ?? project.repo;
          return (
            <li
              key={project.slug}
              data-reveal="attract"
              className="flex flex-col rounded-[1.5rem] bg-surface p-6 ring-1 ring-line/70 transition-shadow hover:shadow-[0_18px_40px_-24px_rgb(0_0_0/0.5)] sm:p-7"
              style={{ "--from": i % 2 === 0 ? -1 : 1, transitionDelay: `${(i % 2) * 90}ms` } as React.CSSProperties}
            >
              <div className="flex items-center justify-between gap-4 text-sm text-lichen">
                <span>{categoryLabels[project.category]}</span>
                <span className="shrink-0">{statusLabels[project.status]}</span>
              </div>
              <h4 className="mt-3 text-2xl font-bold leading-tight [font-stretch:82%]">
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
              <p className="mt-2 flex-1 leading-relaxed text-lichen">{project.description}</p>
              {project.live && project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 self-start text-sm font-medium text-pine underline decoration-pine/30 underline-offset-4 hover:decoration-signal"
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
