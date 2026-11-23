"use client";

import { useEffect, useRef, useState } from "react";
import { getContent, type Locale } from "@/data/portfolio";
import { matrixCopy } from "./copy";

export default function StatsSection({ lang }: { lang: Locale }) {
  const { profile, stats } = getContent(lang);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.15 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="section-1" className="relative px-4 py-16 sm:px-6 sm:py-24">
      <div className="container relative z-10 mx-auto max-w-6xl">
        <h2 className="mb-10 break-words text-center font-mono-matrix text-3xl text-phosphor-glow sm:text-5xl">
          {matrixCopy[lang].stats}
        </h2>

        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:gap-8">
          {stats.map(({ label, value }, index) => (
            <div
              key={label}
              className={`flex flex-col-reverse gap-2 rounded-lg border border-matrix-accent/40 bg-matrix-black/[.85] p-5 text-center motion-safe:transition-transform motion-safe:duration-500 ${isVisible ? "translate-y-0" : "motion-safe:translate-y-2"}`}
            >
              <dt className="font-mono-matrix text-sm text-matrix-light-gray">{label}</dt>
              <dd className={`font-mono-matrix text-4xl ${index % 2 === 0 ? "text-matrix-accent" : "text-matrix-highlight"}`}>
                {value}
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-8 text-center text-matrix-light-gray">{profile.availability} · {profile.location}</p>
      </div>
    </section>
  );
}
