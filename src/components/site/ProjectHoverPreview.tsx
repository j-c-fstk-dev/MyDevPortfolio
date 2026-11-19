"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function ProjectHoverPreview() {
  const frameRef = useRef<HTMLDivElement>(null);
  const [screenshot, setScreenshot] = useState<string>();
  const [loadedScreenshot, setLoadedScreenshot] = useState<string>();

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const desktop = window.matchMedia("(min-width: 1024px) and (hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let active: string | undefined;
    let dismissed: string | undefined;
    let pointerX = 0;
    let pointerY = 0;

    const previewTarget = (target: Element | null) =>
      target?.closest<HTMLElement>("[data-project-preview]");

    const hide = () => {
      if (!active) return;
      active = undefined;
      setScreenshot(undefined);
    };

    const follow = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const trigger = desktop.matches && event.pointerType === "mouse" ? previewTarget(target) : undefined;
      const next = trigger?.dataset.projectPreview;

      if (next !== dismissed) dismissed = undefined;
      if (!next || next === dismissed) {
        hide();
        return;
      }

      pointerX = event.clientX;
      pointerY = event.clientY;
      if (active !== next || !reducedMotion.matches) {
        frame.dataset.large = String(trigger?.hasAttribute("data-project-preview-large") ?? false);
        const gap = 20;
        const edge = 12;
        const width = frame.offsetWidth;
        const height = frame.offsetHeight;
        const x = event.clientX + width + gap + edge < window.innerWidth
          ? event.clientX + gap
          : event.clientX - width - gap;
        const y = Math.min(event.clientY + gap, window.innerHeight - height - edge);
        frame.style.transform = `translate3d(${Math.max(edge, x)}px, ${Math.max(edge, y)}px, 0)`;
      }

      if (active !== next) {
        active = next;
        setScreenshot(next);
      }
    };

    const leaveWindow = (event: PointerEvent) => {
      if (event.relatedTarget) return;
      dismissed = undefined;
      hide();
    };
    const handleScroll = () => {
      if (active && previewTarget(document.elementFromPoint(pointerX, pointerY))?.dataset.projectPreview !== active) hide();
    };
    const dismiss = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      dismissed = active;
      hide();
    };

    document.addEventListener("pointermove", follow, { passive: true });
    document.addEventListener("pointerout", leaveWindow);
    document.addEventListener("pointerdown", hide);
    document.addEventListener("keydown", dismiss);
    window.addEventListener("scroll", handleScroll, { capture: true, passive: true });
    window.addEventListener("resize", hide);
    window.addEventListener("blur", hide);
    desktop.addEventListener("change", hide);

    return () => {
      document.removeEventListener("pointermove", follow);
      document.removeEventListener("pointerout", leaveWindow);
      document.removeEventListener("pointerdown", hide);
      document.removeEventListener("keydown", dismiss);
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", hide);
      window.removeEventListener("blur", hide);
      desktop.removeEventListener("change", hide);
    };
  }, []);

  return (
    <div
      ref={frameRef}
      aria-hidden="true"
      data-hover-preview
      className={`pointer-events-none fixed left-0 top-0 z-[70] aspect-[16/10] w-[clamp(288px,28vw,420px)] data-[large=true]:w-[min(52vw,740px)] overflow-hidden rounded-xl shadow-2xl motion-safe:transition-opacity border border-white/20 bg-ink ${screenshot && loadedScreenshot === screenshot ? "opacity-100" : "opacity-0"}`}
    >
      {screenshot && (
        <Image
          key={screenshot}
          src={screenshot}
          alt=""
          fill
          loading="eager"
          unoptimized
          onLoad={() => setLoadedScreenshot(screenshot)}
          className="object-cover object-top"
        />
      )}
    </div>
  );
}
