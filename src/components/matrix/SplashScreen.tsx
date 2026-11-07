"use client";

import { useEffect, useState } from "react";

interface SplashScreenProps {
  onChoose: (choice: "red" | "blue") => void;
}

const messages = [
  "Wake up, Neo...",
  "The Matrix has you...",
  "Follow the white rabbit.",
  "This is your last chance."];

export default function SplashScreen({ onChoose }: SplashScreenProps) {
  const [step, setStep] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [showPills, setShowPills] = useState(false);
  const [isClient, setIsClient] = useState(false);

  


  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    if (step < messages.length) {
      const message = messages[step];
      let currentIndex = 0;

      const typeInterval = setInterval(() => {
        if (currentIndex <= message.length) {
          setTypedText(message.substring(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typeInterval);
          setTimeout(() => {
            if (step === messages.length - 1) {
              setShowPills(true);
            } else {
              setStep((prev) => prev + 1);
              setTypedText("");
            }
          }, 1000);
        }
      }, 100);

      return () => clearInterval(typeInterval);
    }
  }, [step, isClient]);

  if (!isClient) {
    return (
      <div
        className="fixed inset-0 bg-black flex items-center justify-center"
       >

        <div
          className="text-matrix-primary-green font-mono-matrix"
         >

          Initializing...
        </div>
      </div>);

  }

  return (
    <div
      className="fixed inset-0 bg-black z-50 overflow-hidden"
     >

      {/* Matrix Rain Background */}
      <div className="absolute inset-0">
        {Array.from({ length: 100 }).map((_, i) =>
        <div
          key={i}
          className="absolute font-mono-matrix text-matrix-primary-green/20 text-xs animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 3}s`
          }}
         >

            {Math.random() > 0.5 ? "1" : "0"}
          </div>
        )}
      </div>

      {/* Scanning Lines */}
      <div className="absolute inset-0">
        <div
          className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-matrix-primary-green to-transparent animate-pulse opacity-30"
         >
        </div>
        <div
          className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-matrix-primary-green to-transparent animate-pulse opacity-30"
          style={{ animationDelay: "1s" }}
         >
        </div>
      </div>

      {/* Main Content */}
      <div
        className="relative z-10 flex items-center justify-center min-h-screen p-4 sm:p-6"
       >

        <div className="text-center max-w-2xl mx-auto">
          {!showPills ?
          // Typing Animation Phase
          <div className="space-y-8">
              {/* Matrix Logo */}
              <div className="mb-12">
                <div
                className="text-6xl sm:text-8xl md:text-9xl font-mono-matrix text-matrix-primary-green text-glow-green animate-pulse mb-4"
               >

                  ⚡
                </div>
                <div
                className="text-xl sm:text-2xl font-mono-matrix text-matrix-electric-blue"
               >

                  THE MATRIX
                </div>
              </div>

              {/* Typing Text */}
              <div
              className="h-16 flex items-center justify-center"
             >

                <div
                className="font-mono-matrix text-lg sm:text-xl md:text-2xl text-matrix-primary-green text-glow-green"
               >

                  {typedText}
                  <span className="animate-pulse">
                    |
                  </span>
                </div>
              </div>

              {/* Progress Indicator */}
              <div
              className="w-64 sm:w-80 h-1 bg-matrix-dark-gray rounded-full mx-auto overflow-hidden"
             >

                <div
                className="h-full bg-gradient-to-r from-matrix-primary-green to-matrix-electric-blue transition-all duration-1000"
                style={{ width: `${(step + 1) / messages.length * 100}%` }}
               >
              </div>
              </div>
            </div> :

          // Pills Choice Phase
          <div className="space-y-12 animate-fade-in">
              {/* Morpheus Quote */}
              <div className="space-y-6">
                <div
                className="text-4xl sm:text-6xl font-mono-matrix text-matrix-primary-green text-glow-green mb-8"
               >

                  CHOOSE
                </div>
                <div
                className="text-base sm:text-lg text-matrix-light-gray leading-relaxed max-w-xl mx-auto"
               >

                  &ldquo;After this, there is no going back. You take the blue
                  pill—the story ends, you wake up in your bed and believe
                  whatever you want to believe. You take the red pill—you stay
                  in Wonderland, and I show you how deep the rabbit hole goes.&rdquo;
                </div>
                <div
                className="text-sm text-matrix-primary-green/70 font-mono-matrix"
               >

                  - Morpheus
                </div>
              </div>

              {/* Pills */}
              <div
              className="flex flex-col sm:flex-row gap-8 sm:gap-12 justify-center items-center"
             >

                {/* Blue Pill */}
                <div
                className="group cursor-pointer transform transition-all duration-500 hover:scale-110"
                onClick={() => onChoose("blue")}
               >

                  <div className="relative">
                    {/* Pill Glow */}
                    <div
                    className="absolute inset-0 bg-blue-500/30 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"
                   >
                  </div>

                    {/* Pill */}
                    <div
                    className="relative w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center border-4 border-blue-300 group-hover:border-blue-200 transition-all duration-300 shadow-2xl"
                   >

                      <div
                      className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-300 to-blue-500 rounded-full flex items-center justify-center"
                     >

                        <div
                        className="text-2xl sm:text-3xl"
                       >

                          💊
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 text-center">
                    <div
                    className="font-mono-matrix text-blue-400 text-lg sm:text-xl mb-2 group-hover:text-blue-300 transition-colors"
                   >

                      BLUE PILL
                    </div>
                    <div
                    className="text-xs sm:text-sm text-blue-400/70 max-w-32 mx-auto"
                   >

                      Back to the standard portfolio
                    </div>
                  </div>
                </div>

                {/* VS Divider */}
                <div
                className="text-matrix-primary-green font-mono-matrix text-xl sm:text-2xl opacity-50"
               >

                  VS
                </div>

                {/* Red Pill */}
                <div
                className="group cursor-pointer transform transition-all duration-500 hover:scale-110"
                onClick={() => onChoose("red")}
               >

                  <div className="relative">
                    {/* Pill Glow */}
                    <div
                    className="absolute inset-0 bg-red-500/30 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"
                   >
                  </div>

                    {/* Pill */}
                    <div
                    className="relative w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center border-4 border-red-300 group-hover:border-red-200 transition-all duration-300 shadow-2xl"
                   >

                      <div
                      className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-red-300 to-red-500 rounded-full flex items-center justify-center"
                     >

                        <div
                        className="text-2xl sm:text-3xl"
                       >

                          💊
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 text-center">
                    <div
                    className="font-mono-matrix text-red-400 text-lg sm:text-xl mb-2 group-hover:text-red-300 transition-colors"
                   >

                      RED PILL
                    </div>
                    <div
                    className="text-xs sm:text-sm text-red-400/70 max-w-32 mx-auto"
                   >

                      Matrix Experience
                    </div>
                  </div>
                </div>
              </div>

              {/* Warning Text */}
              <div
              className="text-xs sm:text-sm text-matrix-primary-green/50 font-mono-matrix animate-pulse"
             >

                Choose wisely. Your reality depends on it.
              </div>
            </div>
          }
        </div>
      </div>

      {!showPills && (
        <button
          onClick={() => setShowPills(true)}
          className="absolute bottom-6 right-6 z-20 px-4 py-2 font-mono-matrix text-matrix-primary-green/70 border border-matrix-primary-green/30 rounded hover:text-matrix-primary-green hover:border-matrix-primary-green transition-all"
        >
          SKIP &gt;&gt;
        </button>
      )}

      {/* Corner Effects */}
      <div
        className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-matrix-primary-green/30"
       >
      </div>
      <div
        className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-matrix-primary-green/30"
       >
      </div>
      <div
        className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-matrix-primary-green/30"
       >
      </div>
      <div
        className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-matrix-primary-green/30"
       >
      </div>

      {/* Glitch Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-0 w-full h-0.5 bg-matrix-primary-green opacity-20 animate-pulse"
          style={{ animationDelay: "2s" }}
         >
        </div>
        <div
          className="absolute top-3/4 left-0 w-full h-0.5 bg-matrix-electric-blue opacity-20 animate-pulse"
          style={{ animationDelay: "3s" }}
         >
        </div>
      </div>
    </div>);

}