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
        data-oid="jglpjf1">

        <div
          className="text-matrix-primary-green font-mono-matrix"
          data-oid=":xhz91k">

          Initializing Matrix...
        </div>
      </div>);

  }

  // Show splash screen first
  if (showSplash) {
    return <SplashScreen onChoose={handlePillChoice} data-oid="xj20rj8" />;
  }

  // Show normal portfolio if blue pill was chosen
  if (userChoice === "blue") {
    return (
      <NormalPortfolio onExitMatrix={handleSwitchReality} data-oid="fulp-67" />);

  }

  // Show Matrix portfolio if red pill was chosen
  return (
    <div
      className="relative bg-matrix-black text-matrix-light-gray overflow-x-hidden"
      data-oid="0sc284a">

      {/* Matrix Rain Background */}
      <MatrixRain data-oid="ws0v:zh" />

      {/* Reality Switch Toggle */}
      <button
        onClick={handleSwitchReality}
        className="fixed top-4 right-4 z-50 w-12 h-12 bg-matrix-black/80 border border-blue-500/30 rounded-full flex items-center justify-center hover:border-blue-500 hover:shadow-neon-blue transition-all duration-300 group"
        title="Switch to Normal Reality"
        data-oid="9.6e1au">

        <div
          className="text-blue-400 group-hover:text-blue-300 transition-all"
          data-oid="lf5vtko">

          💊
        </div>
      </button>

      {/* Navigation */}
      <Navigation currentSection={currentSection} data-oid="210bp3x" />

      {/* Scroll Progress Indicator */}
      <div
        className="fixed top-0 left-0 w-full h-1 bg-matrix-dark-gray z-50"
        data-oid="3n.uvi2">

        <div
          className="h-full bg-gradient-to-r from-matrix-primary-green to-matrix-electric-blue transition-all duration-100"
          style={{ width: `${scrollProgress * 100}%` }}
          data-oid=".-6hdvc" />

      </div>

      {/* Main Content */}
      <main className="relative z-10" data-oid="x5x_iso">
        {/* Hero Section */}
        <HeroSection data-oid="23dkcm2" />

        {/* Stats Section */}
        <StatsSection data-oid="wn3.150" />

        {/* Skills Section */}
        <SkillsSection data-oid="_ga-:vg" />

        {/* Projects Section */}
        <ProjectsSection data-oid="49emab8" />

        {/* Experience Section */}
        <ExperienceSection data-oid="zwdk:m2" />

        {/* Contact Section */}
        <ContactSection data-oid="05ss7xr" />
      </main>
    </div>);

}