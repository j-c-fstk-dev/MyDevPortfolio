"use client";

import { useEffect, useState } from "react";
import { errorBuzz, keyClick, successChime } from "./sound";
import SoundToggle from "./SoundToggle";

type LineKind = "cmd" | "info" | "err" | "ok";

/** A broken build, diagnosed and fixed: the work Jorge does, in about six seconds. */
const SCRIPT: { kind: LineKind; text: string; pause: number }[] = [
  { kind: "cmd", text: "npm run build", pause: 200 },
  { kind: "info", text: "Creating an optimized production build...", pause: 400 },
  { kind: "err", text: "✗ Module not found: Can't resolve './auth' in src/lib/session.ts", pause: 120 },
  { kind: "err", text: "✗ Build failed in 3.2s", pause: 500 },
  { kind: "cmd", text: "jorge --diagnose", pause: 250 },
  { kind: "info", text: "› cause: session.ts imports './auth', the file lives at '../auth'", pause: 220 },
  { kind: "info", text: "› fix: corrected the import, added a regression test", pause: 220 },
  { kind: "info", text: "› pushed to branch fix/auth-import", pause: 380 },
  { kind: "cmd", text: "npm run build", pause: 250 },
  { kind: "ok", text: "✓ Compiled successfully", pause: 500 },
];

const NAME = "JORGE_CRISTO";
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
const TYPE_MS = 30;
const SCRAMBLE_MS = 60;

const lineColor: Record<LineKind, string> = {
  cmd: "text-matrix-light-gray",
  info: "text-matrix-electric-blue/80",
  err: "text-red-400",
  ok: "text-matrix-primary-green text-glow-green",
};

const scramble = (revealed: number) =>
  NAME.split("")
    .map((ch, i) => (i < revealed || ch === "_" ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
    .join("");

/**
 * The Matrix entrance. Any key or click skips it; Escape goes back to the
 * standard site. With reduced motion it shows the finished log at once.
 */
export default function BootSequence({
  onDone,
  onExit,
  reducedMotion,
}: {
  onDone: () => void;
  onExit: () => void;
  reducedMotion: boolean;
}) {
  const [shown, setShown] = useState(reducedMotion ? SCRIPT.length : 0);
  const [typed, setTyped] = useState(0);
  const [shake, setShake] = useState(0);
  const [name, setName] = useState<string | null>(reducedMotion ? NAME : null);
  const [revealed, setRevealed] = useState(reducedMotion ? NAME.length : 0);

  // Log: type commands character by character, print output lines whole.
  useEffect(() => {
    if (reducedMotion || name !== null) return;
    if (shown >= SCRIPT.length) {
      const t = setTimeout(() => setName(scramble(0)), 150);
      return () => clearTimeout(t);
    }
    const line = SCRIPT[shown];
    if (line.kind === "cmd" && typed < line.text.length) {
      const t = setTimeout(() => {
        keyClick();
        setTyped(typed + 1);
      }, TYPE_MS);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      const next = SCRIPT[shown + 1];
      if (next?.kind === "err" && line.kind !== "err") {
        setShake((n) => n + 1);
        errorBuzz();
      }
      if (next?.kind === "ok") successChime();
      setShown(shown + 1);
      setTyped(0);
    }, line.pause);
    return () => clearTimeout(t);
  }, [shown, typed, name, reducedMotion]);

  // Name: letters settle left to right out of random glyphs, then hand over.
  useEffect(() => {
    if (name === null) return;
    if (revealed >= NAME.length) {
      const t = setTimeout(onDone, reducedMotion ? 2500 : 700);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setRevealed(revealed + 1);
      setName(scramble(revealed + 1));
    }, SCRAMBLE_MS);
    return () => clearTimeout(t);
  }, [name, revealed, onDone, reducedMotion]);

  // Skip with any key or click; Escape leaves the Matrix.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onExit();
      else if (!["Tab", "Shift", "Control", "Alt", "Meta"].includes(e.key)) onDone();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onDone, onExit]);

  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center p-4 sm:p-8 font-mono-matrix"
      onPointerDown={(e) => {
        if (!(e.target as HTMLElement).closest("button")) onDone();
      }}
    >
      <p className="sr-only" role="status">
        Matrix mode is starting. Press any key to skip, or Escape to go back.
      </p>

      <div key={shake} className={`w-full max-w-3xl ${shake ? "matrix-shake" : ""}`} aria-hidden>
        {(name === null || reducedMotion) && (
          <div className="rounded-lg border-2 border-matrix-primary-green/60 bg-matrix-black/85 p-5 sm:p-7 shadow-neon-green">
            <div className="mb-4 flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-500" />
              <span className="h-3 w-3 rounded-full bg-yellow-500" />
              <span className="h-3 w-3 rounded-full bg-matrix-primary-green" />
              <span className="flex-1 text-center text-matrix-primary-green/80">~/client-app</span>
            </div>
            <div className="space-y-1 text-base leading-snug sm:text-xl">
              {SCRIPT.slice(0, shown + 1).map((line, i) => {
                const current = i === shown;
                const text = line.kind === "cmd" && current ? line.text.slice(0, typed) : line.text;
                return (
                  <div key={i} className={`break-words ${lineColor[line.kind]}`}>
                    {line.kind === "cmd" && <span className="text-matrix-primary-green">$ </span>}
                    {text}
                    {current && line.kind === "cmd" && <span className="cursor-blink text-matrix-primary-green">█</span>}
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {name !== null && (
          <div className={`text-center ${reducedMotion ? "mt-10" : ""}`}>
            <div className="text-5xl text-glow-green text-matrix-primary-green sm:text-7xl md:text-8xl">{name}</div>
            <div
              className={`mt-4 text-lg text-matrix-electric-blue transition-opacity duration-500 sm:text-2xl ${
                revealed >= NAME.length ? "opacity-100" : "opacity-0"
              }`}
            >
              &gt; FULL_STACK_DEVELOPER // WEB3 // AI
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-4 left-4 right-4 flex items-center justify-between gap-4 text-sm text-matrix-primary-green/70">
        <SoundToggle />
        <button
          type="button"
          onClick={onDone}
          className="rounded border border-matrix-primary-green/30 px-4 py-2 hover:border-matrix-primary-green hover:text-matrix-primary-green"
        >
          <span className="hidden sm:inline">PRESS ANY KEY TO </span>SKIP &gt;&gt;
        </button>
      </div>
    </div>
  );
}
