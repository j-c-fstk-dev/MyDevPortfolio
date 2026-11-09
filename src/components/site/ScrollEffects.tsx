"use client";

import { useEffect } from "react";

/**
 * One small engine for the standard site's scroll animations. It renders
 * nothing; it writes CSS custom properties that the styles read.
 *
 * - [data-progress="through"]: --p goes 0 → 1 while the element crosses the viewport.
 * - [data-progress="draw"]:    --p goes 0 → 1 as the element passes the middle of the screen.
 * - [data-progress="pin"]:     --p goes 0 → 1 while a tall runway with a sticky stage is scrolled
 *                              through (the stage stays on screen the whole time).
 * - [data-cover]:              a layer that, once its --p reaches the given threshold, fills the
 *                              screen with its own data-tone (the hero disc, colour transitions).
 * - [data-tone-follow]:        takes the tone showing under it ("top" or "middle" of the screen).
 * - [data-reveal]:             gets data-visible="true" once it enters the viewport.
 * - [data-reveal="lines"]:     its .rl-word children get --line (the line they wrapped onto).
 * - [data-pass]:               gets data-passed="true" once its top crosses the middle of the screen.
 *
 * With reduced motion nothing moves: reveals are shown at once and --p stays unset.
 */

const progressOf = (el: HTMLElement) => {
  const holder = el.closest<HTMLElement>("[data-progress]");
  return parseFloat(holder?.style.getPropertyValue("--p") || "0");
};

export default function ScrollEffects() {
  useEffect(() => {
    const reduced = !document.documentElement.classList.contains("motion");

    // The header and the rail take the tone showing beneath them.
    const followTone = (vh: number) => {
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("section[data-tone], footer[data-tone], [data-tone-source]")
      );
      const covers = reduced ? [] : Array.from(document.querySelectorAll<HTMLElement>("[data-cover]"));
      document.querySelectorAll<HTMLElement>("[data-tone-follow]").forEach((el) => {
        const y = el.dataset.toneFollow === "top" ? 32 : vh / 2;
        const inside = (node: HTMLElement) => {
          const rect = node.getBoundingClientRect();
          return rect.top <= y && rect.bottom > y;
        };
        const cover = covers.find((c) => inside(c) && progressOf(c) >= parseFloat(c.dataset.cover || "0.6"));
        const under = cover ?? sections.find(inside);
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
        const p =
          mode === "pin"
            ? -rect.top / Math.max(rect.height - vh, 1)
            : mode === "draw"
              ? (vh * 0.55 - rect.top) / Math.max(rect.height, 1)
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
