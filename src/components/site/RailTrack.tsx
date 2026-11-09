"use client";

import { useEffect, useRef } from "react";

interface Station {
  id: string;
  label: string;
}

/**
 * A railway line that runs along the page: each section is a station and an
 * amber signal travels down the track as the visitor scrolls. Stations are
 * links, so the track doubles as navigation. On narrower screens it becomes
 * a thin progress line under the header.
 *
 * Positions are written straight to the DOM on scroll (no React re-render).
 */
export default function RailTrack({ stations, label }: { stations: Station[]; label: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const bar = barRef.current;
    if (!track || !bar) return;

    let positions: number[] = [];
    let frame = 0;

    const measure = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      positions = stations.map(({ id }) => {
        const el = document.getElementById(id);
        if (!el || max <= 0) return 0;
        return Math.min(Math.max((el.getBoundingClientRect().top + window.scrollY - 80) / max, 0), 1);
      });
      track.querySelectorAll<HTMLElement>("[data-station]").forEach((el, i) => {
        el.style.top = `${positions[i] * 100}%`;
      });
    };

    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
      track.style.setProperty("--progress", String(progress));
      bar.style.setProperty("--progress", String(progress));
      // The current station is the last one the signal has reached.
      let current = -1;
      positions.forEach((pos, i) => {
        if (progress >= pos - 0.002) current = i;
      });
      track.querySelectorAll<HTMLElement>("[data-station]").forEach((el, i) => {
        el.dataset.state = i < current ? "passed" : i === current ? "current" : "ahead";
      });
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const remeasure = () => {
      measure();
      schedule();
    };

    remeasure();
    // Layout can shift after fonts and images load.
    const resizeObserver = new ResizeObserver(remeasure);
    resizeObserver.observe(document.body);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", remeasure);
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", remeasure);
    };
  }, [stations]);

  return (
    <>
      {/* Wide screens: the vertical track in the left margin (the current station is labelled where there is room). */}
      <nav
        aria-label={label}
        data-tone="light"
        data-tone-follow="middle"
        className="pointer-events-none fixed bottom-10 left-6 top-28 z-30 hidden xl:block"
      >
        <div ref={trackRef} className="relative h-full w-[2px] bg-line">
          <div
            className="absolute inset-x-0 top-0 origin-top bg-pine"
            style={{ height: "100%", transform: "scaleY(var(--progress, 0))" }}
          />
          {/* The signal: an amber lamp riding the track. */}
          <div
            aria-hidden
            className="absolute left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal shadow-[0_0_12px_rgb(var(--signal)/0.8)]"
            style={{ top: "calc(var(--progress, 0) * 100%)" }}
          />
          {stations.map((station) => (
            <a
              key={station.id}
              href={`#${station.id}`}
              data-station
              data-state="ahead"
              className="group pointer-events-auto absolute left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center"
            >
              <span className="h-3.5 w-3.5 rounded-full border-2 border-line bg-mist transition-colors group-hover:border-pine group-data-[state=current]:border-pine group-data-[state=passed]:border-pine group-data-[state=passed]:bg-pine" />
              <span className="absolute left-6 whitespace-nowrap rounded-full bg-mist/90 px-2 py-0.5 text-sm font-medium text-lichen opacity-0 ring-1 ring-line transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 group-data-[state=current]:text-ink 2xl:group-data-[state=current]:opacity-100">
                {station.label}
              </span>
            </a>
          ))}
        </div>
      </nav>

      {/* Narrower screens: a thin progress line under the header. */}
      <div aria-hidden className="pointer-events-none fixed inset-x-0 top-16 z-40 h-[2px] xl:hidden">
        <div
          ref={barRef}
          className="h-full origin-left bg-signal"
          style={{ transform: "scaleX(var(--progress, 0))" }}
        />
      </div>
    </>
  );
}
