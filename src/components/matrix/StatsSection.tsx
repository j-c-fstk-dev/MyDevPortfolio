"use client";

import { useEffect, useState, useRef } from "react";
import { profile, stats as portfolioStats } from "@/data/portfolio";
import { useScatter } from "./scatter";

interface StatItem {
  label: string;
  value: number;
  suffix: string;
  color: string;
}

const stats: StatItem[] = portfolioStats.map((stat, i) => ({
    label: stat.label.toUpperCase().replace(/[ &]+/g, "_"),
    value: stat.value,
    suffix: stat.suffix,
    color: i % 2 === 0 ? "text-matrix-primary-green" : "text-matrix-electric-blue"
  }));

export default function StatsSection() {
  const binary = useScatter(48);
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValues, setAnimatedValues] = useState<number[]>([0, 0, 0, 0]);
  const sectionRef = useRef<HTMLElement>(null);





  useEffect(() => {

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      stats.forEach((stat, index) => {
        let current = 0;
        const increment = stat.value / 50; // 50 steps for smooth animation
        const timer = setInterval(() => {
          current += increment;
          if (current >= stat.value) {
            current = stat.value;
            clearInterval(timer);
          }
          setAnimatedValues((prev) => {
            const newValues = [...prev];
            newValues[index] = Math.floor(current);
            return newValues;
          });
        }, 30);
      });
    }
  }, [isVisible]);


  return (
    <section
      ref={sectionRef}
      id="section-1"
      className="min-h-screen flex items-center justify-center py-12 sm:py-20 relative px-4 sm:px-6"
     >

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="grid grid-cols-6 sm:grid-cols-8 gap-1 sm:gap-2 h-full"
         >

          {Array.from({ length: 48 }).map((_, i) =>
          <div
            key={i}
            className="border border-matrix-primary-green animate-pulse"
            style={{ animationDelay: `${i * 0.05}s` }}
            />

          )}
        </div>
      </div>

      <div
        className="container mx-auto relative z-10 max-w-6xl"
       >

        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2
            className="text-3xl sm:text-4xl md:text-6xl font-mono-matrix text-glow-green mb-3 sm:mb-4"
           >

            SYSTEM_STATS
          </h2>
          <div
            className="text-lg sm:text-xl font-mono-matrix text-matrix-electric-blue"
           >

            &gt; ANALYZING_PERFORMANCE_METRICS...
          </div>
          <div
            className="w-24 sm:w-32 h-1 bg-gradient-to-r from-matrix-primary-green to-matrix-electric-blue mx-auto mt-3 sm:mt-4"
           >
          </div>
        </div>

        {/* Stats Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
         >

          {stats.map((stat, index) =>
          <div
            key={stat.label}
            className={`bg-matrix-black/50 border-2 border-matrix-primary-green/30 rounded-lg p-4 sm:p-6 text-center hover:border-matrix-primary-green hover:shadow-neon-green transition-all duration-500 transform ${
            isVisible ?
            "translate-y-0 opacity-100" :
            "translate-y-10 opacity-0"}`
            }
            style={{ transitionDelay: `${index * 0.2}s` }}
           >

              {/* Stat Value */}
              <div
              className={`text-3xl sm:text-4xl md:text-5xl font-mono-matrix ${stat.color} mb-3 sm:mb-4`}
             >

                <span className="text-glow-green">
                  {animatedValues[index]}
                </span>
                <span
                className="text-lg sm:text-xl md:text-2xl"
               >

                  {stat.suffix}
                </span>
              </div>

              {/* Stat Label */}
              <div
              className="font-mono-matrix text-matrix-light-gray text-xs sm:text-sm mb-3 sm:mb-4 break-words"
             >

                {stat.label}
              </div>

              {/* Progress Bar */}
              <div
              className="w-full bg-matrix-dark-gray rounded-full h-2"
             >

                <div
                className={`h-2 rounded-full transition-all duration-1000 ${
                stat.color.includes("green") ?
                "bg-gradient-to-r from-matrix-primary-green to-matrix-secondary-green" :
                "bg-gradient-to-r from-matrix-electric-blue to-matrix-neon-cyan"}`
                }
                style={{
                  width: isVisible ? "100%" : "0%",
                  transitionDelay: `${index * 0.3 + 0.5}s`
                }}
               >
              </div>
              </div>

              {/* Binary Animation */}
              <div
              className="mt-3 sm:mt-4 font-mono-matrix text-xs text-matrix-primary-green/50 overflow-hidden h-4"
             >

                <div className="animate-pulse">
                  {Array.from({ length: 12 }).map((_, i) =>
                <span
                  key={i}
                  className="inline-block mr-1"
                 >

                      {binary[(index * 12 + i) % binary.length].pick > 0.5 ? "1" : "0"}
                    </span>
                )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12 sm:mt-16">
          <div
            className="bg-matrix-black/70 border border-matrix-primary-green/30 rounded-lg p-4 sm:p-6 max-w-2xl mx-auto"
           >

            <div
              className="font-mono-matrix text-matrix-electric-blue mb-2 text-sm sm:text-base"
             >

              &gt; STATUS: OPERATIONAL
            </div>
            <div
              className="text-matrix-light-gray text-sm sm:text-base"
             >

              {profile.availability}. {profile.location}.
            </div>
          </div>
        </div>
      </div>
    </section>);

}