"use client";

import dynamic from "next/dynamic";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

const MatrixExperience = dynamic(() => import("@/components/matrix/MatrixExperience"), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-black" aria-hidden />,
});

const MatrixContext = createContext<() => void>(() => {});

/** Returns a function that switches the page to the Matrix version. */
export const useEnterMatrix = () => useContext(MatrixContext);

/**
 * Wraps the standard site (rendered on the server) and swaps it for the
 * Matrix version on demand. Visiting /#matrix opens the Matrix directly.
 */
export default function ModeSwitcher({ children }: { children: React.ReactNode }) {
  const [matrix, setMatrix] = useState(false);

  const enter = useCallback(() => {
    history.replaceState(null, "", "#matrix");
    setMatrix(true);
  }, []);

  const exit = useCallback(() => {
    history.replaceState(null, "", window.location.pathname);
    setMatrix(false);
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    if (window.location.hash === "#matrix") setMatrix(true);
  }, []);

  return (
    <MatrixContext.Provider value={enter}>
      {matrix ? <MatrixExperience onExit={exit} /> : children}
    </MatrixContext.Provider>
  );
}
