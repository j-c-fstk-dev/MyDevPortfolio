"use client";

import { useEffect } from "react";

/**
 * One small engine for the standard site's scroll animations. It renders
 * nothing; it writes CSS custom properties that the styles read.
 *
 * - [data-progress="through"]: --p goes 0 → 1 while the element crosses the viewport.
 * - [data-progress="exit"]:    --p goes 0 → 1 while the element scrolls off the top.
 * - [data-progress="draw"]:    --p goes 0 → 1 as the element passes the middle of the screen.
 * - [data-reveal]:             gets data-visible="true" once it enters the viewport.
 * - [data-pass]:               gets data-passed="true" once its top crosses the middle of the screen.
 *
 * With reduced motion nothing moves: reveals are shown at once and --p stays unset.
 */
export default function ScrollEffects() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reveals = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    if (reduced) {
      reveals.forEach((el) => (el.dataset.visible = "true"));
      document.querySelectorAll<HTMLElement>("[data-pass]").forEach((el) => (el.dataset.passed = "true"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.visible = "true";
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px" }
    );
    reveals.forEach((el) => observer.observe(el));

    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      document.querySelectorAll<HTMLElement>("[data-progress]").forEach((el) => {
        const rect = el.getBoundingClientRect();
        const mode = el.dataset.progress;
        const p =
          mode === "exit"
            ? -rect.top / Math.max(rect.height, 1)
            : mode === "draw"
              ? (vh * 0.55 - rect.top) / Math.max(rect.height, 1)
              : (vh - rect.top) / (vh + rect.height);
        el.style.setProperty("--p", Math.min(Math.max(p, 0), 1).toFixed(4));
      });
      document.querySelectorAll<HTMLElement>("[data-pass]").forEach((el) => {
        el.dataset.passed = String(el.getBoundingClientRect().top < vh * 0.55);
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return null;
}
