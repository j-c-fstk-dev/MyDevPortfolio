"use client";

import { preloadMatrix, useEnterMatrix } from "./ModeSwitcher";

/** Opens the Matrix version of the portfolio, starting the transition from this button. */
export default function MatrixButton({ className, children }: { className?: string; children: React.ReactNode }) {
  const enter = useEnterMatrix();
  return (
    <button
      type="button"
      onPointerEnter={preloadMatrix}
      onFocus={preloadMatrix}
      onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        enter({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
      }}
      className={className}
    >
      {children}
    </button>
  );
}
