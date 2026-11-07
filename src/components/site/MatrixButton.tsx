"use client";

import { useEnterMatrix } from "./ModeSwitcher";

/** Opens the Matrix version of the portfolio. */
export default function MatrixButton({ className, children }: { className?: string; children: React.ReactNode }) {
  const enter = useEnterMatrix();
  return (
    <button type="button" onClick={enter} className={className}>
      {children}
    </button>
  );
}
