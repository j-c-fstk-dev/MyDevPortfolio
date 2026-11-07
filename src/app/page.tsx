"use client";

import { useEffect, useState } from "react";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";
import MatrixRain from "@/components/MatrixRain";
import Navigation from "@/components/Navigation";
import NormalPortfolio from "@/components/NormalPortfolio";
import SplashScreen from "@/components/SplashScreen";

type Mode = "standard" | "splash" | "matrix";

export default function Page() {
  // The standard portfolio renders first (and on the server), so visitors and
  // search engines see the content right away. The Matrix version is opt-in.
  const [mode, setMode] = useState<Mode>("standard");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    if (mode !== "matrix") return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0);
      setCurrentSection(Math.floor(scrollTop / window.innerHeight));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mode]);

  if (mode === "standard") {
    return <NormalPortfolio onEnterMatrix={() => setMode("splash")} />;
  }

  if (mode === "splash") {
    return (
      <SplashScreen
        onChoose={(choice) => setMode(choice === "red" ? "matrix" : "standard")}
      />
    );
  }

  return (
    <div className="relative bg-matrix-black text-matrix-light-gray overflow-x-hidden">
      <MatrixRain />

      <button
        onClick={() => setMode("standard")}
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
