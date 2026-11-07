"use client";

import { useEffect, useState } from "react";
import ContactSection from "./ContactSection";
import ExperienceSection from "./ExperienceSection";
import HeroSection from "./HeroSection";
import MatrixRain from "./MatrixRain";
import Navigation from "./Navigation";
import ProjectsSection from "./ProjectsSection";
import SkillsSection from "./SkillsSection";
import SplashScreen from "./SplashScreen";
import StatsSection from "./StatsSection";

/**
 * The whole Matrix version: the red/blue pill intro, then the terminal-style
 * portfolio. Loaded on demand, so visitors who never open it don't download it.
 */
export default function MatrixExperience({ onExit }: { onExit: () => void }) {
  const [entered, setEntered] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    if (!entered) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0);
      setCurrentSection(Math.floor(scrollTop / window.innerHeight));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [entered]);

  if (!entered) {
    return <SplashScreen onChoose={(choice) => (choice === "red" ? setEntered(true) : onExit())} />;
  }

  return (
    <div className="matrix-mode relative bg-matrix-black text-matrix-light-gray overflow-x-hidden min-h-screen">
      <MatrixRain />

      <button
        onClick={onExit}
        className="fixed bottom-4 right-4 z-50 h-12 px-4 bg-matrix-black/80 border border-blue-500/40 rounded-full flex items-center gap-2 font-mono-matrix text-blue-300 hover:border-blue-400 hover:shadow-neon-blue transition-all duration-300"
        aria-label="Leave the Matrix and go back to the standard portfolio"
      >
        <span aria-hidden>💊</span>
        <span className="hidden sm:inline">EXIT_MATRIX</span>
      </button>

      <Navigation currentSection={currentSection} />

      <div className="fixed top-0 left-0 w-full h-1 bg-matrix-dark-gray z-50">
        <div
          className="h-full bg-gradient-to-r from-matrix-primary-green to-matrix-electric-blue transition-all duration-100"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      <main className="relative z-10">
        <HeroSection />
        <StatsSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
    </div>
  );
}
