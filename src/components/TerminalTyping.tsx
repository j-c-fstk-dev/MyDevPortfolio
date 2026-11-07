"use client";

import { useEffect, useState } from "react";

const lines = [
  "$ whoami",
  "jorge_cristo // full-stack developer",
  "",
  "$ cat services.txt",
  "> bug fixing & app rescue (React, Next.js, Node)",
  "> web3: dApps, Solidity review, Farcaster mini apps",
  "> features & automation: Stripe, LLMs, n8n",
  "",
  "$ ls projects/ --live",
  "decleanup-dapp  bass-forest  monthly-earth-day  beregen",
  "",
  "$ status",
  "AVAILABLE FOR FREELANCE WORK...",
  "_"];

export default function TerminalTyping() {
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [displayedText, setDisplayedText] = useState<string[]>([]);
  const [showCursor, setShowCursor] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  


  useEffect(() => {
    if (!isClient) return;

    const typeSpeed = 50;
    const lineDelay = 500;

    const timer = setTimeout(() => {
      if (currentLine < lines.length) {
        const currentLineText = lines[currentLine];

        if (currentChar < currentLineText.length) {
          setDisplayedText((prev) => {
            const newText = [...prev];
            if (!newText[currentLine]) newText[currentLine] = "";
            newText[currentLine] = currentLineText.substring(
              0,
              currentChar + 1
            );
            return newText;
          });
          setCurrentChar((prev) => prev + 1);
        } else {
          // Move to next line
          setTimeout(() => {
            setCurrentLine((prev) => prev + 1);
            setCurrentChar(0);
          }, lineDelay);
        }
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [currentLine, currentChar, isClient]);

  // Cursor blinking effect
  useEffect(() => {
    if (!isClient) return;

    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorTimer);
  }, [isClient]);

  if (!isClient) {
    return (
      <div className="text-left font-mono-matrix text-sm">
        <div className="text-matrix-primary-green">
          Loading terminal...
        </div>
      </div>);

  }

  return (
    <div
      className="text-left font-mono-matrix text-xs sm:text-sm overflow-x-auto"
     >

      {displayedText.map((line, index) =>
      <div
        key={index}
        className="min-h-[1.2em] whitespace-nowrap sm:whitespace-normal"
       >

          {line && line.includes && line.includes("████") ?
        // Progress bar styling
        <div className="text-matrix-primary-green">
              {line.split(" ").map((word, wordIndex) =>
          <span
            key={wordIndex}
            className={
            word && word.includes && word.includes("████") ?
            "text-glow-green" :
            ""
            }
           >

                  {word}
                  {wordIndex < line.split(" ").length - 1 ? " " : ""}
                </span>
          )}
            </div> :
        line && line.startsWith && line.startsWith("$") ?
        // Command styling
        <div>
              <span className="text-matrix-electric-blue">
                $
              </span>
              <span className="text-matrix-light-gray">
                {line.substring(1)}
              </span>
            </div> :
        line && (
        line.includes(".js") ||
        line.includes(".tsx") ||
        line.includes(".ts") ||
        line.includes(".sol") ||
        line.includes(".dart") ||
        line.includes(".py")) ?
        // File listing styling - responsive
        <div className="text-matrix-primary-green">
              {line.split("    ").map((file, fileIndex) =>
          <span
            key={fileIndex}
            className="mr-2 sm:mr-4 hover:text-glow-green transition-all duration-300 inline-block"
           >

                  {file}
                </span>
          )}
            </div> :
        line === "READY FOR NEW CHALLENGES..." ?
        // Status message styling
        <div
          className="text-matrix-electric-blue text-glow-blue animate-pulse"
         >

              {line}
            </div> :

        // Regular text
        <div className="text-matrix-light-gray">
              {line || ""}
            </div>
        }
        </div>
      )}

      {/* Cursor */}
      {currentLine < lines.length &&
      <span
        className={`text-matrix-primary-green ${showCursor ? "opacity-100" : "opacity-0"} transition-opacity duration-100`}
       >

          █
        </span>
      }
    </div>);

}