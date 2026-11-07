"use client";

import { useEffect, useRef, useState } from "react";
import ContactSection from "./ContactSection";
import ExperienceSection from "./ExperienceSection";
import HeroSection from "./HeroSection";
import MatrixRain from "./MatrixRain";
import Navigation from "./Navigation";
import ProjectsSection from "./ProjectsSection";
import SkillsSection from "./SkillsSection";
import StatsSection from "./StatsSection";

export interface Origin {
  x: number;
  y: number;
}

type Phase = "transition" | "portfolio";

const TRANSITION_MS = 900;

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function initialPhase(origin: Origin | null): Phase {
  return origin && !prefersReducedMotion() ? "transition" : "portfolio";
}

/**
 * The Matrix version: a circle of falling code opens from where the visitor
 * clicked, then the terminal-style portfolio, whose hero terminal fixes a broken build.
 * Loaded on demand, so visitors who never open it don't download it.
 */
export default function MatrixExperience({
  origin,
  onCovered,
  onExit,
}: {
  /** Where the visitor clicked, for the opening transition. Null for a direct link. */
  origin: Origin | null;
  /** Called once the standard site is fully hidden. */
  onCovered: () => void;
  onExit: () => void;
}) {
  const [phase, setPhase] = useState<Phase>(() => initialPhase(origin));
  const [open, setOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const mainRef = useRef<HTMLElement>(null);

  // Without a transition the standard site is hidden right away.
  useEffect(() => {
    if (phase !== "transition") onCovered();
    // Only on mount: later phases come after the cover already happened.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Start the circle growing on the next frame, so the CSS transition runs.
  useEffect(() => {
    if (phase !== "transition") return;
    const frame = requestAnimationFrame(() => setOpen(true));
    return () => cancelAnimationFrame(frame);
  }, [phase]);

  const finishTransition = () => {
    onCovered();
    window.scrollTo({ top: 0, behavior: "instant" });
    setPhase("portfolio");
  };

  // Portfolio: track scroll, move focus to the content, Escape leaves.
  useEffect(() => {
    if (phase !== "portfolio") return;
    window.scrollTo({ top: 0, behavior: "instant" });
    mainRef.current?.focus({ preventScroll: true });

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0);
      setCurrentSection(Math.floor(scrollTop / window.innerHeight));
    };
    // Escape closes an open dialog first (e.g. a project); only then does it leave.
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !e.defaultPrevented && !document.querySelector('[role="dialog"]')) onExit();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("keydown", handleKey);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKey);
    };
  }, [phase, onExit]);

  const overlay = phase !== "portfolio";
  const circle = (radius: string) => `circle(${radius} at ${origin?.x ?? 0}px ${origin?.y ?? 0}px)`;

  return (
    <div
      className={`matrix-mode bg-matrix-black text-matrix-light-gray ${
        overlay ? "fixed inset-0 z-[60] overflow-hidden" : "relative min-h-screen overflow-x-hidden"
      }`}
      style={
        phase === "transition"
          ? { clipPath: circle(open ? "150vmax" : "0px"), transition: `clip-path ${TRANSITION_MS}ms cubic-bezier(0.55, 0, 0.75, 0.3)` }
          : undefined
      }
      onTransitionEnd={(e) => {
        if (phase === "transition" && e.target === e.currentTarget && e.propertyName === "clip-path") finishTransition();
      }}
    >
      {/* One canvas from the first frame to the end; only its strength changes. */}
      <MatrixRain intensity={phase === "transition" ? 0.9 : 0.25} />

      {phase === "portfolio" && (
        <>
          <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2">
            <button
              onClick={onExit}
              className="h-12 px-4 bg-matrix-black/80 border border-blue-500/40 rounded-full flex items-center gap-2 font-mono-matrix text-blue-300 hover:border-blue-400 hover:shadow-neon-blue transition-all duration-300"
              aria-label="Leave the Matrix and go back to the standard portfolio (Escape)"
            >
              <span aria-hidden>💊</span>
              <span className="hidden sm:inline">EXIT_MATRIX [ESC]</span>
            </button>
          </div>

          <Navigation currentSection={currentSection} />

          <div className="fixed top-0 left-0 w-full h-1 bg-matrix-dark-gray z-50">
            <div
              className="h-full bg-gradient-to-r from-matrix-primary-green to-matrix-electric-blue transition-all duration-100"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>

          <main ref={mainRef} tabIndex={-1} className="relative z-10 outline-none" aria-label="Jorge Cristo, Matrix version">
            <HeroSection />
            <StatsSection />
            <SkillsSection />
            <ProjectsSection />
            <ExperienceSection />
            <ContactSection />
          </main>
        </>
      )}
    </div>
  );
}
