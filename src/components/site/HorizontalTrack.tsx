"use client";

import { useEffect, useRef } from "react";

/**
 * Scrolling down moves the content sideways: a runway as tall as the track is
 * wide holds a sticky stage, and the track inside slides left as the runway is
 * scrolled. Like a train ride along the line.
 *
 * Children marked [data-station] get data-passed="true" once they reach the
 * middle of the screen. The stage gets --p (0 → 1) for the rail line.
 *
 * Without the .motion class (no JavaScript or reduced motion) the stage is a
 * normal block and the track wraps as a vertical stack.
 */
export default function HorizontalTrack({ children, rail }: { children: React.ReactNode; rail?: React.ReactNode }) {
  const runwayRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const runway = runwayRef.current;
    const stage = stageRef.current;
    const track = trackRef.current;
    if (!runway || !stage || !track || !document.documentElement.classList.contains("motion")) return;

    let distance = 0;
    let frame = 0;
    const stations = Array.from(track.querySelectorAll<HTMLElement>("[data-station]"));

    const update = () => {
      frame = 0;
      const p = distance > 0 ? Math.min(Math.max(-runway.getBoundingClientRect().top / distance, 0), 1) : 0;
      track.style.transform = `translate3d(${-p * distance}px, 0, 0)`;
      stage.style.setProperty("--p", p.toFixed(4));
      const middle = window.innerWidth * 0.6;
      stations.forEach((el) => {
        el.dataset.passed = String(el.getBoundingClientRect().left < middle);
      });
    };
    const measure = () => {
      distance = Math.max(track.scrollWidth - window.innerWidth, 0);
      runway.style.height = `${distance + window.innerHeight}px`;
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
      <div ref={stageRef} className="pin-stage hz-stage sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        {rail}
        <div ref={trackRef} className="hz-track flex w-max items-stretch gap-6 px-4 will-change-transform sm:gap-8 sm:px-[6vw]">
          {children}
        </div>
      </div>
    </div>
  );
}
