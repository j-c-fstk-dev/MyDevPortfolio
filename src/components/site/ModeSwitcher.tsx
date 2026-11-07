"use client";

import dynamic from "next/dynamic";
import { createContext, useCallback, useContext, useSyncExternalStore } from "react";

const MatrixExperience = dynamic(() => import("@/components/matrix/MatrixExperience"), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-black" aria-hidden />,
});

const MatrixContext = createContext<() => void>(() => {});

/** Returns a function that switches the page to the Matrix version. */
export const useEnterMatrix = () => useContext(MatrixContext);

const MATRIX_HASH = "#matrix";

function subscribe(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}

/** Tell subscribers the hash changed (replaceState doesn't fire hashchange). */
function setHash(hash: string) {
  history.replaceState(null, "", hash || window.location.pathname + window.location.search);
  window.dispatchEvent(new HashChangeEvent("hashchange"));
}

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

  const enter = useCallback(() => setHash(MATRIX_HASH), []);
  const exit = useCallback(() => {
    setHash("");
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <MatrixContext.Provider value={enter}>
      {matrix ? <MatrixExperience onExit={exit} /> : children}
    </MatrixContext.Provider>
  );
}
