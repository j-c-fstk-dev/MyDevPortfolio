"use client";

import { useCallback, useEffect, useState } from "react";
import HeroTerminal from "./HeroTerminal";

const NAME = "JORGE_CRISTO";
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

const scramble = (revealed: number) =>
  NAME.split("")
    .map((ch, i) => (i < revealed || ch === "_" ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
    .join("");

/**
 * The name stays scrambled while the build is broken and settles, letter by
 * letter, once the terminal reports a successful compile.
 */
function ScrambledName({ resolved, reducedMotion }: { resolved: boolean; reducedMotion: boolean }) {
  const [revealed, setRevealed] = useState(reducedMotion ? NAME.length : 0);
  const [text, setText] = useState(reducedMotion ? NAME : NAME.replace(/[^_]/g, "█"));

  useEffect(() => {
    if (revealed >= NAME.length) return;
    const t = setTimeout(
      () => {
        const next = resolved ? revealed + 1 : revealed;
        setRevealed(next);
        setText(scramble(next));
      },
      resolved ? 70 : 110
    );
    return () => clearTimeout(t);
  }, [resolved, revealed, text]);

  return (
    <h1
      aria-label="Jorge Cristo"
      className="text-5xl sm:text-7xl md:text-8xl font-mono-matrix text-glow-green text-matrix-primary-green leading-tight"
    >
      <span aria-hidden>{text}</span>
    </h1>
  );
}

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export default function HeroSection() {
  const [reducedMotion] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [compiled, setCompiled] = useState(false);
  const handleCompiled = useCallback(() => setCompiled(true), []);

  return (
    <section id="section-0" className="relative min-h-screen px-4 pb-16 pt-24 sm:px-6 sm:pt-28">
      <div className="relative z-10 mx-auto w-full max-w-4xl text-center">
        <ScrambledName resolved={compiled} reducedMotion={reducedMotion} />
        <div
          className={`mt-3 mb-8 text-lg font-mono-matrix text-matrix-electric-blue transition-opacity duration-700 sm:text-2xl ${
            compiled ? "opacity-100" : "opacity-40"
          }`}
        >
          &gt; FULL_STACK_DEVELOPER // WEB3 // AI
        </div>

        <HeroTerminal onCompiled={handleCompiled} reducedMotion={reducedMotion} />

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
          <button
            className="rounded border-2 border-matrix-primary-green bg-matrix-primary-green/20 px-6 py-3 font-mono-matrix text-sm text-matrix-primary-green transition-all duration-300 hover:bg-matrix-primary-green/30 hover:shadow-neon-green sm:px-8 sm:text-base"
            onClick={() => scrollTo("section-3")}
          >
            &gt; VIEW_PROJECTS
          </button>
          <button
            className="rounded border-2 border-matrix-electric-blue bg-matrix-electric-blue/20 px-6 py-3 font-mono-matrix text-sm text-matrix-electric-blue transition-all duration-300 hover:bg-matrix-electric-blue/30 hover:shadow-neon-blue sm:px-8 sm:text-base"
            onClick={() => scrollTo("section-5")}
          >
            &gt; CONTACT_ME
          </button>
        </div>
      </div>
    </section>
  );
}
