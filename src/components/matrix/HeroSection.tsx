"use client";

import TerminalTyping from "./TerminalTyping";
import { useScatter } from "./scatter";

export default function HeroSection() {
  const floating = useScatter(15);

  return (
    <section
      id="section-0"
      className="relative h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6"
     >

      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="grid grid-cols-8 sm:grid-cols-12 gap-2 sm:gap-4 h-full"
         >

          {Array.from({ length: 96 }).map((_, i) =>
          <div
            key={i}
            className="border border-matrix-primary-green/20 animate-pulse"
            style={{ animationDelay: `${i * 0.1}s` }}
            />

          )}
        </div>
      </div>

      {/* Main Content */}
      <div
        className="relative z-10 text-center max-w-4xl mx-auto w-full"
       >

        {/* Glitch Effect Title */}
        <div
          className={`mb-6 sm:mb-8 transition-all duration-1000 rise-in`}
         >

          <h1
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-mono-matrix text-glow-green mb-3 sm:mb-4 glitch-text leading-tight"
            data-text="JORGE_CRISTO"
           >

            JORGE_CRISTO
          </h1>
          <div
            className="text-lg sm:text-xl md:text-2xl font-mono-matrix text-matrix-electric-blue mb-6 sm:mb-8"
           >

            &gt; FULL_STACK_DEVELOPER // WEB3 // AI
          </div>
        </div>

        {/* Terminal Window */}
        <div
          className={`bg-matrix-black/90 border-2 border-matrix-primary-green rounded-lg p-4 sm:p-6 mb-6 sm:mb-8 transition-all duration-1000 delay-500 rise-in`}
         >

          <div className="flex items-center mb-3 sm:mb-4">
            <div className="flex space-x-2">
              <div
                className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500"
               >
              </div>
              <div
                className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500"
               >
              </div>
              <div
                className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-matrix-primary-green"
               >
              </div>
            </div>
            <div
              className="flex-1 text-center font-mono-matrix text-matrix-primary-green text-sm sm:text-base"
             >

              TERMINAL_v2.1.0
            </div>
          </div>
          <TerminalTyping />
        </div>

        {/* Action Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center transition-all duration-1000 delay-1000 rise-in`}
         >

          <button
            className="px-6 sm:px-8 py-3 bg-matrix-primary-green/20 border-2 border-matrix-primary-green rounded font-mono-matrix text-matrix-primary-green hover:bg-matrix-primary-green/30 hover:shadow-neon-green transition-all duration-300 group text-sm sm:text-base"
            onClick={() =>
            document.
            getElementById("section-3")?.
            scrollIntoView({ behavior: "smooth" })
            }
           >

            <span className="group-hover:animate-pulse">
              &gt; VIEW_PROJECTS
            </span>
          </button>
          <button
            className="px-6 sm:px-8 py-3 bg-matrix-electric-blue/20 border-2 border-matrix-electric-blue rounded font-mono-matrix text-matrix-electric-blue hover:bg-matrix-electric-blue/30 hover:shadow-neon-blue transition-all duration-300 group text-sm sm:text-base"
            onClick={() =>
            document.
            getElementById("section-5")?.
            scrollIntoView({ behavior: "smooth" })
            }
           >

            <span className="group-hover:animate-pulse">
              &gt; CONTACT_ME
            </span>
          </button>
        </div>

        {/* Scroll Indicator */}
        <div
          className="hidden sm:block absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
         >

          <div
            className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-matrix-primary-green rounded-full flex justify-center"
           >

            <div
              className="w-1 h-2 sm:h-3 bg-matrix-primary-green rounded-full mt-1 sm:mt-2 animate-pulse"
             >
            </div>
          </div>
          <div
            className="text-xs font-mono-matrix text-matrix-primary-green mt-2"
           >

            SCROLL
          </div>
        </div>
      </div>

      {/* Floating Code Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {floating.map((item, i) =>
        <div
          key={i}
          className="absolute font-mono-matrix text-matrix-primary-green/30 text-xs animate-pulse"
          style={{
            left: item.left,
            top: item.top,
            animationDelay: item.delay,
            animationDuration: item.duration
          }}
         >

            {
          [
          "01",
          "10",
          "11",
          "00",
          "NULL",
          "TRUE",
          "FALSE",
          "&&",
          "||",
          "!="][
          Math.floor(item.pick * 10)]
          }
          </div>
        )}
      </div>
    </section>);

}