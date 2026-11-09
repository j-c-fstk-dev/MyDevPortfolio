"use client";

import { useEffect } from "react";

/**
 * One small engine for the standard site's scroll animations. It renders
 * nothing; it writes CSS custom properties that the styles read.
 *
 * - [data-progress="through"]: --p goes 0 → 1 while the element crosses the viewport.
 * - [data-progress="exit"]:    --p goes 0 → 1 while the element scrolls off the top.
 * - [data-progress="draw"]:    --p goes 0 → 1 as the element passes the middle of the screen.
 * - [data-progress="seam"]:    --p goes 0 → 1 from the seam entering at the bottom until the
 *                              section it belongs to reaches the top of the screen.
 * - [data-progress="scan"]:    like "draw" but not clamped, so the reading bar leaves the list cleanly.
 * - [data-reveal="lines"]:     its .rl-word children get --line (the line they wrapped onto).
 * - [data-tone-follow]:        takes the data-tone of the section under it ("top" or "middle" of the screen).
 * - [data-reveal]:             gets data-visible="true" once it enters the viewport.
 * - [data-pass]:               gets data-passed="true" once its top crosses the middle of the screen.
 *
 * With reduced motion nothing moves: reveals are shown at once and --p stays unset.
 */
export default function ScrollEffects() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // The header and the rail take the tone of the section beneath them.
    const followTone = (vh: number) => {
      const sections = Array.from(document.querySelectorAll<HTMLElement>("section[data-tone]"));
      document.querySelectorAll<HTMLElement>("[data-tone-follow]").forEach((el) => {
        const y = el.dataset.toneFollow === "top" ? 32 : vh / 2;
        // A seam that has mostly filled already shows its section's colour above that section's top.
        const coveredBy = sections.find((section) => {
          const seam = section.querySelector<HTMLElement>(':scope > [data-progress="seam"]');
          if (!seam) return false;
          const rect = seam.getBoundingClientRect();
          const p = parseFloat(seam.style.getPropertyValue("--p") || "1");
          return p >= 0.6 && rect.top <= y && rect.bottom > y;
        });
        const under =
          coveredBy ??
          sections.find((section) => {
            const rect = section.getBoundingClientRect();
            return rect.top <= y && rect.bottom > y;
          });
        if (under?.dataset.tone) el.dataset.tone = under.dataset.tone;
      });
    };
    const reveals = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    if (reduced) {
      reveals.forEach((el) => (el.dataset.visible = "true"));
      document.querySelectorAll<HTMLElement>("[data-pass]").forEach((el) => (el.dataset.passed = "true"));
      // Tones still follow the page, without animation.
      const onScroll = () => followTone(window.innerHeight);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }

    // Number the visual lines of line-by-line paragraphs (redone when the width changes).
    const indexLines = () => {
      document.querySelectorAll<HTMLElement>('[data-reveal="lines"]').forEach((el) => {
        let line = -1;
        let lastTop = -Infinity;
        el.querySelectorAll<HTMLElement>(".rl-word").forEach((word) => {
          if (word.offsetTop > lastTop + 2) {
            line++;
            lastTop = word.offsetTop;
          }
          word.style.setProperty("--line", String(line));
        });
      });
    };
    indexLines();
    let width = window.innerWidth;
    const onResize = () => {
      if (window.innerWidth !== width) {
        width = window.innerWidth;
        indexLines();
      }
    };
    window.addEventListener("resize", onResize);

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
        if (mode === "scan") {
          el.style.setProperty("--p", ((vh * 0.55 - rect.top) / Math.max(rect.height, 1)).toFixed(4));
          return;
        }
        const p =
          mode === "exit"
            ? -rect.top / Math.max(rect.height, 1)
            : mode === "draw"
              ? (vh * 0.55 - rect.top) / Math.max(rect.height, 1)
              : mode === "seam"
                ? (vh - rect.top) / (vh * 0.85 + rect.height)
                : (vh - rect.top) / (vh + rect.height);
        el.style.setProperty("--p", Math.min(Math.max(p, 0), 1).toFixed(4));
      });
      followTone(vh);
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
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return null;
}
