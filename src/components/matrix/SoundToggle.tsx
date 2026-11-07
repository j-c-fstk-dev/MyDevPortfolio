"use client";

import { setSoundOn, useSoundOn } from "./sound";

/** Turns the Matrix sound effects on or off. */
export default function SoundToggle({ className = "" }: { className?: string }) {
  const on = useSoundOn();
  return (
    <button
      type="button"
      onClick={() => setSoundOn(!on)}
      aria-pressed={on}
      className={`rounded border border-matrix-primary-green/30 px-3 py-2 font-mono-matrix text-matrix-primary-green/80 hover:border-matrix-primary-green hover:text-matrix-primary-green ${className}`}
    >
      SOUND: {on ? "ON" : "OFF"}
    </button>
  );
}
