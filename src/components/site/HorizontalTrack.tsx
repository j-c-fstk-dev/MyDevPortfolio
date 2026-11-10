"use client";

import { useEffect, useRef } from "react";
import type { Tone } from "./ui";

/** Extra scroll (in viewport heights) after the ride, while the last card fills the screen. */
const EXIT_VH = 0.8;

/**
 * Scrolling down moves the content sideways, like a train ride along the line.
 *
 * - Entering: the [data-hz-title] element drops in from above the centre of the
 *   screen and settles into its place at the start of the track.
 * - Riding: a runway as tall as the track is wide holds a sticky stage; the
 *   track slides left as the runway is scrolled. [data-station] children get
 *   data-passed="true" once they reach the middle of the screen; the stage gets
 *   --p (0 → 1) for the rail line.
 * - Leaving: the [data-exit-card] (the last card) grows its colour until it
 *   fills the screen while its text zooms and fades, handing over to the next
 *   section, which starts in that same colour.
 *
 * Without the .motion class (no JavaScript or reduced motion) the stage is a
 * normal block and the track wraps as a vertical stack.
 */
export default function HorizontalTrack({
  children,
  rail,
  exitTone,
}: {
  children: React.ReactNode;
  rail?: React.ReactNode;
  /** Tone of the section that follows; the last card grows in this colour. */
  exitTone: Tone;
}) {
  const runwayRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const runway = runwayRef.current;
    const stage = stageRef.current;
    const track = trackRef.current;
    const fill = fillRef.current;
    if (!runway || !stage || !track || !fill) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let distance = 0;
    let exit = 0;
    let frame = 0;
    const stations = Array.from(track.querySelectorAll<HTMLElement>("[data-station]"));
    const title = track.querySelector<HTMLElement>("[data-hz-title]");
    const lastCard = track.querySelector<HTMLElement>("[data-exit-card]");
    const lastContent = lastCard?.querySelector<HTMLElement>("[data-exit-content]");
    const others = Array.from(track.children).filter((el) => el !== lastCard) as HTMLElement[];

    const clamp = (v: number) => Math.min(Math.max(v, 0), 1);
    const ease = (t: number) => 1 - (1 - t) ** 3;

    const update = () => {
      frame = 0;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const top = runway.getBoundingClientRect().top;

      // Ride: 0 → 1 across the horizontal distance.
      const p = distance > 0 ? clamp(-top / distance) : 0;
      track.style.transform = `translate3d(${-p * distance}px, 0, 0)`;
      stage.style.setProperty("--p", p.toFixed(4));
      stations.forEach((el) => {
        el.dataset.passed = String(el.getBoundingClientRect().left < vw * 0.6);
      });

      // Enter: the title starts near the top of the screen, centred, and comes
      // down into its slot at the start of the track as the section arrives.
      if (title) {
        const t = clamp((vh - top) / vh); // spread over the whole approach
        if (t === 0) {
          // The section is still below the screen: keep the title home and out of sight,
          // so it never floats over the sections above.
          title.style.transform = "";
          title.style.opacity = "0";
        } else {
          const e = t * t * (3 - 2 * t);
          const restX = title.offsetLeft + title.offsetWidth / 2; // centre in the track, before any shift
          const restY = Math.max(top, 0) + track.offsetTop + title.offsetTop + title.offsetHeight / 2; // centre on screen, unshifted
          const dx = (vw / 2 - restX) * (1 - e);
          const dy = (vh * 0.22 - restY) * (1 - e);
          title.style.transform = `translate3d(${dx}px, ${dy}px, 0) scale(${1 + 0.15 * (1 - e)})`;
          title.style.opacity = String(clamp(t * 4));
        }
      }

      // Leave: the last card's colour fills the screen, its text zooms and fades.
      const q = exit > 0 ? clamp((-top - distance) / exit) : 0;
      stage.style.setProperty("--exit", q.toFixed(4));
      fill.style.setProperty("--p", q.toFixed(4));
      if (lastCard) {
        const r = lastCard.getBoundingClientRect();
        if (q > 0) {
          const k = 1 - ease(q);
          fill.style.visibility = "visible";
          fill.style.clipPath = `inset(${r.top * k}px ${(vw - r.right) * k}px ${(vh - r.bottom) * k}px ${r.left * k}px round ${28 * k}px)`;
        } else {
          fill.style.visibility = "hidden";
        }
        if (lastContent) {
          lastContent.style.transform = `scale(${1 + q * 0.5})`;
          lastContent.style.opacity = String(1 - clamp(q * 1.6));
        }
        others.forEach((el) => (el.style.opacity = String(1 - clamp(q * 2))));
      }
    };

    const measure = () => {
      distance = Math.max(track.scrollWidth - window.innerWidth, 0);
      exit = lastCard ? window.innerHeight * EXIT_VH : 0;
      runway.style.height = `${distance + exit + window.innerHeight}px`;
      update();
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(track);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", schedule);
    };
  }, []);

  return (
    <div ref={runwayRef} className="pin-runway relative">
      <div ref={stageRef} className="pin-stage hz-stage sticky top-0 flex h-screen flex-col justify-center overflow-x-clip">
        {rail}
        {/* The last card's colour, grown to fill the screen on the way out. */}
        <div
          ref={fillRef}
          aria-hidden
          data-tone={exitTone}
          data-progress="manual"
          data-cover="0.5"
          className="hz-fill pointer-events-none invisible absolute inset-0 bg-mist"
        />
        <div ref={trackRef} className="hz-track relative flex w-max items-stretch gap-6 px-4 will-change-transform sm:gap-8 sm:px-[6vw]">
          {children}
        </div>
      </div>
    </div>
  );
}
