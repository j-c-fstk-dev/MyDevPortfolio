"use client";

import { localePath, type Locale } from "@/data/portfolio";
import { matrixCopy } from "./copy";
import { getPhosphorColor, phosphorColors, type PhosphorColor } from "./phosphor";

interface NavigationProps {
  lang: Locale;
  currentSection: number;
  phosphor: PhosphorColor;
  onPhosphorChange: (color: PhosphorColor) => void;
}

export default function Navigation({ lang, currentSection, phosphor, onPhosphorChange }: NavigationProps) {
  const d = matrixCopy[lang];
  const alternate = lang === "en" ? "pt" : "en";

  const scrollToSection = (id: number) => {
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth";
    document.getElementById(`section-${id}`)?.scrollIntoView({ behavior });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-matrix-accent/20 bg-matrix-black/90 backdrop-blur-sm">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-x-3 px-3 pt-2 lg:flex-nowrap lg:px-6 lg:py-3">
        <div className="shrink-0 font-mono-matrix text-sm text-matrix-accent sm:text-base">&gt; JORGE_CRISTO.EXE</div>

        <nav aria-label={d.navLabel} className="order-last flex w-full justify-center gap-1 lg:order-none lg:w-auto">
          {d.nav.map((label, id) => (
            <button
              key={label}
              type="button"
              aria-label={label}
              aria-current={currentSection === id ? "location" : undefined}
              title={label}
              onClick={() => scrollToSection(id)}
              className={`grid min-h-8 min-w-8 place-items-center rounded px-1.5 font-mono-matrix text-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-matrix-highlight lg:min-h-10 ${currentSection === id ? "text-matrix-accent" : "text-matrix-light-gray hover:text-matrix-accent"}`}
            >
              <span aria-hidden className={`h-2 w-2 rounded-full lg:hidden ${currentSection === id ? "bg-matrix-accent" : "bg-current opacity-60"}`} />
              <span aria-hidden className="hidden uppercase lg:inline">{label}</span>
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2 font-mono-matrix text-xs text-matrix-highlight sm:text-sm">
          <select
            aria-label={d.phosphor}
            value={phosphor}
            onChange={(event) => onPhosphorChange(getPhosphorColor(event.target.value))}
            className="min-h-8 rounded border border-matrix-accent/40 bg-matrix-dark-gray px-1"
          >
            {Object.keys(phosphorColors).map((color, index) => (
              <option key={color} value={color}>{d.colors[index]}</option>
            ))}
          </select>
          <a
            href={`${localePath(alternate)}#matrix`}
            hrefLang={alternate === "pt" ? "pt-BR" : "en"}
            lang={alternate === "pt" ? "pt-BR" : "en"}
            aria-label={alternate === "pt" ? "Ver Matrix em português" : "View Matrix in English"}
            className="inline-flex min-h-8 items-center rounded border border-matrix-accent/40 px-1.5 hover:border-matrix-highlight"
          >
            {alternate.toUpperCase()}
          </a>
        </div>
      </div>
    </header>
  );
}
