"use client";

import { useId, useState } from "react";

/**
 * A block that stays folded until the visitor asks for it. The content is in
 * the page from the start (good for search engines) but hidden and inert, and
 * it unfolds smoothly when opened.
 */
export default function Expandable({
  openLabel,
  closeLabel,
  className = "",
  children,
}: {
  openLabel: string;
  closeLabel: string;
  className?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div className={className}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(!open)}
        className="group flex w-full items-center justify-between gap-6 rounded-[1.5rem] bg-surface px-6 py-5 text-left ring-1 ring-line/70 transition-colors hover:ring-pine/50 sm:px-8 sm:py-6"
      >
        <span className="text-[clamp(1.4rem,3vw,2.1rem)] font-extrabold leading-tight [font-stretch:80%]">
          {open ? closeLabel : openLabel}
        </span>
        <span
          aria-hidden
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-pine text-2xl leading-none text-on-pine transition-transform duration-500 ${
            open ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>

      {/* Animates its height from 0 to the content's natural height. */}
      <div
        id={id}
        inert={!open}
        className={`grid transition-[grid-template-rows,opacity] duration-700 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pt-12">{children}</div>
        </div>
      </div>
    </div>
  );
}
