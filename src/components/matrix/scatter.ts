import { useState } from "react";

export interface ScatterItem {
  left: string;
  top: string;
  delay: string;
  duration: string;
  /** A random value in [0, 1) for picking a character. */
  pick: number;
}

/**
 * Random positions for decorative background characters. Generated once per
 * mount (in the state initializer) so they don't reshuffle on every render.
 */
export function useScatter(count: number, maxDelay = 5): ScatterItem[] {
  const [items] = useState(() =>
    Array.from({ length: count }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * maxDelay}s`,
      duration: `${2 + Math.random() * 3}s`,
      pick: Math.random(),
    }))
  );
  return items;
}
