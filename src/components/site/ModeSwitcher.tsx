"use client";

import dynamic from "next/dynamic";
import { createContext, useCallback, useContext, useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { Origin } from "@/components/matrix/MatrixExperience";

const loadMatrix = () => import("@/components/matrix/MatrixExperience");
const MatrixExperience = dynamic(loadMatrix, { ssr: false });

/** Start downloading the Matrix code early, e.g. when the pointer nears its button. */
export const preloadMatrix = () => void loadMatrix();

const MatrixContext = createContext<(origin?: Origin) => void>(() => {});

/** Returns a function that switches the page to the Matrix version, optionally from a screen point. */
export const useEnterMatrix = () => useContext(MatrixContext);

const MATRIX_HASH = "#matrix";
/** Typing this anywhere on the standard site opens the Matrix. */
const SECRET = "matrix";

function subscribe(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}

/** Tell subscribers the hash changed (replaceState doesn't fire hashchange). */
function setHash(hash: string) {
  history.replaceState(null, "", hash || window.location.pathname + window.location.search);
  window.dispatchEvent(new HashChangeEvent("hashchange"));
}

const isTyping = (target: EventTarget | null) =>
  target instanceof HTMLElement && (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));

/**
 * Wraps the standard site (rendered on the server) and swaps it for the
 * Matrix version on demand. The mode lives in the URL hash, so /#matrix
 * opens the Matrix directly and can be shared.
 */
export default function ModeSwitcher({ children }: { children: React.ReactNode }) {
  const matrix = useSyncExternalStore(
    subscribe,
    () => window.location.hash === MATRIX_HASH,
    () => false
  );
  const [origin, setOrigin] = useState<Origin | null>(null);
  // While the Matrix opens over it, the standard site stays visible underneath.
  const [covered, setCovered] = useState(false);
  const savedScroll = useRef(0);
  const restoreScroll = useRef(false);

  const enter = useCallback((from?: Origin) => {
    savedScroll.current = window.scrollY;
    setOrigin(from ?? { x: window.innerWidth / 2, y: window.innerHeight / 2 });
    setCovered(false);
    setHash(MATRIX_HASH);
  }, []);

  const exit = useCallback(() => {
    restoreScroll.current = true;
    setOrigin(null);
    setHash("");
  }, []);

  const handleCovered = useCallback(() => setCovered(true), []);

  // Back on the standard site: return to where the visitor was.
  useEffect(() => {
    if (matrix || !restoreScroll.current) return;
    restoreScroll.current = false;
    window.scrollTo({ top: savedScroll.current, behavior: "instant" });
  }, [matrix]);

  // Easter egg: type "matrix" anywhere outside a form field.
  useEffect(() => {
    if (matrix) return;
    let buffer = "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key.length !== 1 || e.metaKey || e.ctrlKey || e.altKey || isTyping(e.target)) return;
      buffer = (buffer + e.key.toLowerCase()).slice(-SECRET.length);
      if (buffer === SECRET) enter();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [matrix, enter]);

  const showSite = !matrix || (origin !== null && !covered);

  return (
    <MatrixContext.Provider value={enter}>
      {showSite && children}
      {matrix && <MatrixExperience origin={origin} onCovered={handleCovered} onExit={exit} />}
    </MatrixContext.Provider>
  );
}
