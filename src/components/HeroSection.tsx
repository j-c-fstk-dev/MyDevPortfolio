"use client";

import { useEffect, useState } from "react";
import TerminalTyping from "./TerminalTyping";

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setIsLoaded(true);
  }, []);

  if (!isClient) {
    return (
      <section
        className="h-screen flex items-center justify-center bg-matrix-black"
        data-oid="g3e.ovw">

        <div
          className="text-matrix-primary-green font-mono-matrix"
          data-oid="2umf17_">

          Loading...
        </div>
      </section>);

  }

  return (
    <section
      id="section-0"
      className="relative h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6"
      data-oid="i2vjygm">

      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10" data-oid="o_v_l:5">
        <div
          className="grid grid-cols-8 sm:grid-cols-12 gap-2 sm:gap-4 h-full"
          data-oid="n0kp8fr">

          {Array.from({ length: 96 }).map((_, i) =>
          <div
            key={i}
            className="border border-matrix-primary-green/20 animate-pulse"
            style={{ animationDelay: `${i * 0.1}s` }}
            data-oid="jc2-1ra" />

          )}
        </div>
      </div>

      {/* Main Content */}
      <div
        className="relative z-10 text-center max-w-4xl mx-auto w-full"
        data-oid="-7knw2h">

        {/* Glitch Effect Title */}
        <div
          className={`mb-6 sm:mb-8 transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          data-oid="m9vdaep">

          <h1
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-mono-matrix text-glow-green mb-3 sm:mb-4 glitch-text leading-tight"
            data-text="MATRIX_DEV"
            data-oid="11a_kgb">

            MATRIX_DEV
          </h1>
          <div
            className="text-lg sm:text-xl md:text-2xl font-mono-matrix text-matrix-electric-blue mb-6 sm:mb-8"
            data-oid=":k9.k6i">

            &gt; INITIALIZING_PORTFOLIO.EXE
          </div>
        </div>

        {/* Terminal Window */}
        <div
          className={`bg-matrix-black/90 border-2 border-matrix-primary-green rounded-lg p-4 sm:p-6 mb-6 sm:mb-8 transition-all duration-1000 delay-500 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          data-oid="yy3xg4l">

          <div className="flex items-center mb-3 sm:mb-4" data-oid="w.6hazu">
            <div className="flex space-x-2" data-oid="gwig2oo">
              <div
                className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500"
                data-oid="j6s6jwv">
              </div>
              <div
                className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500"
                data-oid="mpqvsma">
              </div>
              <div
                className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-matrix-primary-green"
                data-oid="mkjaz.i">
              </div>
            </div>
            <div
              className="flex-1 text-center font-mono-matrix text-matrix-primary-green text-sm sm:text-base"
              data-oid="7dyckof">

              TERMINAL_v2.1.0
            </div>
          </div>
          <TerminalTyping data-oid="0kbi_g9" />
        </div>

        {/* Action Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center transition-all duration-1000 delay-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          data-oid="fho__-k">

          <button
            className="px-6 sm:px-8 py-3 bg-matrix-primary-green/20 border-2 border-matrix-primary-green rounded font-mono-matrix text-matrix-primary-green hover:bg-matrix-primary-green/30 hover:shadow-neon-green transition-all duration-300 group text-sm sm:text-base"
            onClick={() =>
            document.
            getElementById("section-2")?.
            scrollIntoView({ behavior: "smooth" })
            }
            data-oid="rx5use2">

            <span className="group-hover:animate-pulse" data-oid="rhl_jog">
              &gt; VIEW_SKILLS
            </span>
          </button>
          <button
            className="px-6 sm:px-8 py-3 bg-matrix-electric-blue/20 border-2 border-matrix-electric-blue rounded font-mono-matrix text-matrix-electric-blue hover:bg-matrix-electric-blue/30 hover:shadow-neon-blue transition-all duration-300 group text-sm sm:text-base"
            onClick={() =>
            document.
            getElementById("section-3")?.
            scrollIntoView({ behavior: "smooth" })
            }
            data-oid="p-nhi9p">

            <span className="group-hover:animate-pulse" data-oid="bxcuy0-">
              &gt; VIEW_PROJECTS
            </span>
          </button>
        </div>

        {/* Scroll Indicator */}
        <div
          className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
          data-oid="ge98-it">

          <div
            className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-matrix-primary-green rounded-full flex justify-center"
            data-oid="gf6s-9d">

            <div
              className="w-1 h-2 sm:h-3 bg-matrix-primary-green rounded-full mt-1 sm:mt-2 animate-pulse"
              data-oid="7dlij8p">
            </div>
          </div>
          <div
            className="text-xs font-mono-matrix text-matrix-primary-green mt-2"
            data-oid="yksut5n">

            SCROLL
          </div>
        </div>
      </div>

      {/* Floating Code Elements */}
      <div className="absolute inset-0 pointer-events-none" data-oid="j42xmnd">
        {Array.from({ length: 15 }).map((_, i) =>
        <div
          key={i}
          className="absolute font-mono-matrix text-matrix-primary-green/30 text-xs animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${2 + Math.random() * 3}s`
          }}
          data-oid="-p-5rnq">

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
          Math.floor(Math.random() * 10)]
          }
          </div>
        )}
      </div>
    </section>);

}