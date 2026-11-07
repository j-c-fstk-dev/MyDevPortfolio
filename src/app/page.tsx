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

export default function Page() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [userChoice, setUserChoice] = useState<"red" | "blue" | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !userChoice) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / docHeight, 1);
      setScrollProgress(progress);

      // Calculate current section based on scroll position
      const sectionHeight = window.innerHeight;
      const section = Math.floor(scrollTop / sectionHeight);
      setCurrentSection(section);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isClient, userChoice]);

  const handlePillChoice = (choice: "red" | "blue") => {
    setUserChoice(choice);
    setTimeout(() => {
      setShowSplash(false);
    }, 1000);
  };

  const handleSwitchReality = () => {
    setUserChoice(userChoice === "red" ? "blue" : "red");
  };

  if (!isClient) {
    return (
      <div
        className="min-h-screen bg-black flex items-center justify-center"
       >

        <div
          className="text-matrix-primary-green font-mono-matrix"
         >

          Initializing Matrix...
        </div>
      </div>);

  }

  // Show splash screen first
  if (showSplash) {
    return <SplashScreen onChoose={handlePillChoice} />;
  }

  // Show normal portfolio if blue pill was chosen
  if (userChoice === "blue") {
    return (
      <NormalPortfolio onExitMatrix={handleSwitchReality} />);

  }

  // Show Matrix portfolio if red pill was chosen
  return (
    <div
      className="relative bg-matrix-black text-matrix-light-gray overflow-x-hidden"
     >

      {/* Matrix Rain Background */}
      <MatrixRain />

      {/* Reality Switch Toggle */}
      <button
        onClick={handleSwitchReality}
        className="fixed top-4 right-4 z-50 w-12 h-12 bg-matrix-black/80 border border-blue-500/30 rounded-full flex items-center justify-center hover:border-blue-500 hover:shadow-neon-blue transition-all duration-300 group"
        title="Switch to Normal Reality"
       >

        <div
          className="text-blue-400 group-hover:text-blue-300 transition-all"
         >

          💊
        </div>
      </button>

      {/* Navigation */}
      <Navigation currentSection={currentSection} />

      {/* Scroll Progress Indicator */}
      <div
        className="fixed top-0 left-0 w-full h-1 bg-matrix-dark-gray z-50"
       >

        <div
          className="h-full bg-gradient-to-r from-matrix-primary-green to-matrix-electric-blue transition-all duration-100"
          style={{ width: `${scrollProgress * 100}%` }}
          />

      </div>

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <HeroSection />

        {/* Stats Section */}
        <StatsSection />

        {/* Skills Section */}
        <SkillsSection />

        {/* Projects Section */}
        <ProjectsSection />

        {/* Experience Section */}
        <ExperienceSection />

        {/* Contact Section */}
        <ContactSection />
      </main>
    </div>);

}