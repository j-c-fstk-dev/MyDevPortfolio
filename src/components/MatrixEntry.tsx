"use client";

import { useEffect, useState } from "react";

interface MatrixEntryProps {
  onEnter: () => void;
  onCancel: () => void;
  isLoading: boolean;
}

export default function MatrixEntry({
  onEnter,
  onCancel,
  isLoading
}: MatrixEntryProps) {
  const [step, setStep] = useState(0);
  const [typedText, setTypedText] = useState("");

  const messages = [
  "Wake up, Neo...",
  "The Matrix has you...",
  "Follow the white rabbit.",
  "Knock, knock, Neo."];


  useEffect(() => {
    if (isLoading && step < messages.length) {
      const message = messages[step];
      let currentIndex = 0;

      const typeInterval = setInterval(() => {
        if (currentIndex <= message.length) {
          setTypedText(message.substring(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typeInterval);
          setTimeout(() => {
            setStep((prev) => prev + 1);
            setTypedText("");
          }, 1000);
        }
      }, 100);

      return () => clearInterval(typeInterval);
    }
  }, [isLoading, step]);

  if (isLoading) {
    return (
      <div
        className="fixed inset-0 bg-black z-50 flex items-center justify-center"
        data-oid="4gy1xaf">

        {/* Matrix Loading Effect */}
        <div className="text-center" data-oid="73z6l28">
          {/* Scanning Lines */}
          <div className="relative w-80 h-80 mb-8" data-oid="tkvfotz">
            <div
              className="absolute inset-0 border-2 border-matrix-primary-green rounded-full opacity-20"
              data-oid="ey:ou7g">
            </div>
            <div
              className="absolute inset-4 border border-matrix-primary-green rounded-full opacity-40"
              data-oid="hyuq2rx">
            </div>
            <div
              className="absolute inset-8 border border-matrix-primary-green rounded-full opacity-60"
              data-oid="3l6bi9w">
            </div>

            {/* Rotating Scanner */}
            <div className="absolute inset-0 animate-spin" data-oid="1_pd13o">
              <div
                className="w-full h-0.5 bg-gradient-to-r from-transparent via-matrix-primary-green to-transparent absolute top-1/2"
                data-oid="os11yig">
              </div>
            </div>

            {/* Center Icon */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              data-oid="3rnm7su">

              <div
                className="text-6xl text-matrix-primary-green animate-pulse"
                data-oid="h0j1:2_">

                🔍
              </div>
            </div>
          </div>

          {/* Loading Text */}
          <div
            className="font-mono-matrix text-matrix-primary-green text-xl mb-4"
            data-oid="ium4aal">

            {typedText}
            <span className="animate-pulse" data-oid="kekxvq-">
              |
            </span>
          </div>

          {/* Progress Bar */}
          <div
            className="w-80 h-2 bg-matrix-dark-gray rounded-full overflow-hidden"
            data-oid="js7xy1.">

            <div
              className="h-full bg-gradient-to-r from-matrix-primary-green to-matrix-electric-blue transition-all duration-300"
              style={{ width: `${(step + 1) / messages.length * 100}%` }}
              data-oid="yupdvg-">
            </div>
          </div>

          {/* Binary Rain */}
          <div
            className="absolute inset-0 pointer-events-none overflow-hidden"
            data-oid="q-3n3w8">

            {Array.from({ length: 50 }).map((_, i) =>
            <div
              key={i}
              className="absolute font-mono-matrix text-matrix-primary-green text-xs opacity-30 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random() * 2}s`
              }}
              data-oid="jdwdw6r">

                {Math.random() > 0.5 ? "1" : "0"}
              </div>
            )}
          </div>
        </div>
      </div>);

  }

  return (
    <div
      className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      data-oid="sv-_28s">

      <div
        className="bg-matrix-black border-2 border-matrix-primary-green rounded-lg p-8 max-w-md w-full text-center"
        data-oid="h7_ei6a">

        {/* Matrix Symbol */}
        <div className="text-6xl mb-6 animate-pulse" data-oid="kxixv8k">
          <span className="text-matrix-primary-green" data-oid="jdq9:o0">
            ⚡
          </span>
        </div>

        {/* Title */}
        <h2
          className="font-mono-matrix text-2xl text-matrix-primary-green mb-4 text-glow-green"
          data-oid="y-7n6y1">

          MATRIX_ACCESS
        </h2>

        {/* Description */}
        <p
          className="text-matrix-light-gray mb-8 leading-relaxed"
          data-oid="nop8d9_">

          You have discovered the hidden entrance. Choose your reality:
        </p>

        {/* Pills Choice */}
        <div
          className="flex flex-col sm:flex-row gap-4 mb-6"
          data-oid=":x3lqm5">

          <button
            onClick={onEnter}
            className="flex-1 px-6 py-4 bg-red-500/20 border-2 border-red-500 rounded font-mono-matrix text-red-400 hover:bg-red-500/30 hover:shadow-neon-red transition-all duration-300 group"
            data-oid="jziger:">

            <div className="text-2xl mb-2" data-oid="v5rm04g">
              💊
            </div>
            <div className="text-sm" data-oid="r1hx52u">
              RED PILL
            </div>
            <div
              className="text-xs opacity-70 group-hover:opacity-100"
              data-oid="i6jyaod">

              Enter the Matrix
            </div>
          </button>

          <button
            onClick={onCancel}
            className="flex-1 px-6 py-4 bg-blue-500/20 border-2 border-blue-500 rounded font-mono-matrix text-blue-400 hover:bg-blue-500/30 hover:shadow-neon-blue transition-all duration-300 group"
            data-oid="bmo1wq5">

            <div className="text-2xl mb-2" data-oid="gq-fea_">
              💊
            </div>
            <div className="text-sm" data-oid="6f_53qb">
              BLUE PILL
            </div>
            <div
              className="text-xs opacity-70 group-hover:opacity-100"
              data-oid="mqby0t6">

              Stay in Reality
            </div>
          </button>
        </div>

        {/* Quote */}
        <div
          className="text-xs text-matrix-primary-green/50 font-mono-matrix"
          data-oid="6b7oa1l">

          "This is your last chance. After this, there is no going back."
        </div>

        {/* Morpheus Quote */}
        <div
          className="text-xs text-matrix-light-gray/50 mt-2"
          data-oid="sa3la:m">

          - Morpheus
        </div>
      </div>

      {/* Background Effect */}
      <div className="absolute inset-0 pointer-events-none" data-oid="aouz860">
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
          data-oid="jsnklrb">

            {["01", "10", "11", "00"][Math.floor(Math.random() * 4)]}
          </div>
        )}
      </div>
    </div>);

}