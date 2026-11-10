"use client";

import { useEffect, useRef } from "react";

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
 * - Leaving: the [data-exit-card] (the last card) rounds into a circle, which
 *   then grows from the card's centre until it fills the screen, covering the
 *   other cards. The card's text dives in (a strong zoom from its centre) and
 *   fades at the end, handing over to the next section in that same colour.
 *   The shape is the card's [data-exit-bloom] layer, so it sits above the
 *   other cards.
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
    if (!runway || !stage || !track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let distance = 0;
    let exit = 0;
    let frame = 0;
    const stations = Array.from(track.querySelectorAll<HTMLElement>("[data-station]"));
    const title = track.querySelector<HTMLElement>("[data-hz-title]");
    const lastCard = track.querySelector<HTMLElement>("[data-exit-card]");
    const lastContent = lastCard?.querySelector<HTMLElement>("[data-exit-content]");
    const bloom = lastCard?.querySelector<HTMLElement>("[data-exit-bloom]");
    const lastStation = lastCard?.querySelector<HTMLElement>(".hz-station");

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

      // Leave: the card rounds into a circle, then the circle floods the screen.
      const q = exit > 0 ? clamp((-top - distance) / exit) : 0;
      stage.style.setProperty("--exit", q.toFixed(4));
      if (lastCard && bloom) {
        bloom.style.setProperty("--p", q.toFixed(4));
        if (q > 0) {
          const r = lastCard.getBoundingClientRect();
          // Work in the stage's coordinates, not the screen's: the layer covers the stage
          // (the screen while it is pinned), so once the section scrolls away the layer
          // leaves with it instead of staying over the rest of the page.
          const st = stage.getBoundingClientRect();
          const cardLeft = r.left - st.left;
          const cardTop = r.top - st.top;
          Object.assign(bloom.style, {
            visibility: "visible",
            left: `${-cardLeft}px`,
            top: `${-cardTop}px`,
            width: `${st.width}px`,
            height: `${st.height}px`,
          });
          lastCard.style.backgroundColor = "transparent";
          if (lastStation) lastStation.style.opacity = "0";
          // The whole card (the colour layer and the text) is clipped to the shape, so the
          // zooming text only shows inside it. Coordinates are relative to the card.
          const cx = r.width / 2;
          const cy = r.height / 2;
          const d = Math.min(r.width, r.height); // the circle the card rounds into
          const ROUND = 0.3; // first 30%: round into a circle
          if (q < ROUND) {
            const m = ease(q / ROUND);
            const w = r.width + (d - r.width) * m;
            const h = r.height + (d - r.height) * m;
            const radius = 28 + (d / 2 - 28) * m;
            lastCard.style.clipPath = `inset(${cy - h / 2}px ${cx - w / 2}px ${cy - h / 2}px ${cx - w / 2}px round ${radius}px)`;
          } else {
            const g = ease((q - ROUND) / (1 - ROUND));
            // Far enough to cover the farthest corner of the screen from the card's centre.
            const sx = cardLeft + cx;
            const sy = cardTop + cy;
            const far = Math.hypot(Math.max(sx, st.width - sx), Math.max(sy, st.height - sy));
            lastCard.style.clipPath = `circle(${d / 2 + (far - d / 2) * g}px at ${cx}px ${cy}px)`;
          }
        } else {
          bloom.style.visibility = "hidden";
          lastCard.style.backgroundColor = "";
          lastCard.style.clipPath = "";
          if (lastStation) lastStation.style.opacity = "";
        }
        if (lastContent) {
          // Dive into the card: a strong zoom from its centre, fading only at the very end.
          lastContent.style.transform = `scale(${1 + 2.2 * ease(q)})`;
          lastContent.style.opacity = String(1 - clamp((q - 0.6) / 0.3));
        }
      }
    };

    const measure = () => {
      const vw = window.innerWidth;
      // Where the ride stops comes from the last card's own layout box, not from the
      // track's scrollWidth: during the exit the card's colour layer overflows the
      // track, and counting it pushed the card further left (and off screen on phones).
      // The card ends against the right margin on wide screens, centred on phones.
      const end = track.lastElementChild as HTMLElement | null;
      if (end) {
        const stop =
          vw < 640
            ? end.offsetLeft + end.offsetWidth / 2 - vw / 2
            : end.offsetLeft + end.offsetWidth - (vw - parseFloat(getComputedStyle(track).paddingRight));
        distance = Math.max(stop, 0);
      } else {
        distance = Math.max(track.scrollWidth - vw, 0);
      }
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
        <div ref={trackRef} className="hz-track relative flex w-max items-stretch gap-6 px-4 will-change-transform sm:gap-8 sm:px-[6vw]">
          {children}
        </div>
      </div>
    </div>
  );
}
