"use client";

import { useEffect, useState } from "react";

export default function TerminalTyping() {
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [displayedText, setDisplayedText] = useState<string[]>([]);
  const [showCursor, setShowCursor] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const lines = [
  "$ whoami",
  "matrix_developer",
  "",
  "$ cat skills.txt",
  "React.js ████████████████████ 95%",
  "TypeScript ██████████████████ 90%",
  "Node.js ████████████████████ 92%",
  "Python ██████████████████ 88%",
  "AWS ████████████████ 85%",
  "",
  "$ ls projects/",
  "ai-chatbot.js    e-commerce-app.tsx",
  "blockchain-dapp.sol    mobile-app.dart",
  "",
  "$ echo 'Welcome to my digital realm'",
  "Welcome to my digital realm",
  "",
  "$ status",
  "READY FOR NEW CHALLENGES...",
  "_"];


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
      <div className="text-left font-mono-matrix text-sm" data-oid="tk:8gup">
        <div className="text-matrix-primary-green" data-oid="-y8y8b2">
          Loading terminal...
        </div>
      </div>);

  }

  return (
    <div
      className="text-left font-mono-matrix text-xs sm:text-sm overflow-x-auto"
      data-oid="r17rfim">

      {displayedText.map((line, index) =>
      <div
        key={index}
        className="min-h-[1.2em] whitespace-nowrap sm:whitespace-normal"
        data-oid="19zo_wr">

          {line && line.includes && line.includes("████") ?
        // Progress bar styling
        <div className="text-matrix-primary-green" data-oid="o_i4b4z">
              {line.split(" ").map((word, wordIndex) =>
          <span
            key={wordIndex}
            className={
            word && word.includes && word.includes("████") ?
            "text-glow-green" :
            ""
            }
            data-oid="h:._pi5">

                  {word}
                  {wordIndex < line.split(" ").length - 1 ? " " : ""}
                </span>
          )}
            </div> :
        line && line.startsWith && line.startsWith("$") ?
        // Command styling
        <div data-oid="nx76uf2">
              <span className="text-matrix-electric-blue" data-oid="uoab0v3">
                $
              </span>
              <span className="text-matrix-light-gray" data-oid="qj0sqq1">
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
        <div className="text-matrix-primary-green" data-oid=":x_5dde">
              {line.split("    ").map((file, fileIndex) =>
          <span
            key={fileIndex}
            className="mr-2 sm:mr-4 hover:text-glow-green transition-all duration-300 inline-block"
            data-oid="glg6ml8">

                  {file}
                </span>
          )}
            </div> :
        line === "READY FOR NEW CHALLENGES..." ?
        // Status message styling
        <div
          className="text-matrix-electric-blue text-glow-blue animate-pulse"
          data-oid="vhg.gti">

              {line}
            </div> :

        // Regular text
        <div className="text-matrix-light-gray" data-oid="-xjcnnf">
              {line || ""}
            </div>
        }
        </div>
      )}

      {/* Cursor */}
      {currentLine < lines.length &&
      <span
        className={`text-matrix-primary-green ${showCursor ? "opacity-100" : "opacity-0"} transition-opacity duration-100`}
        data-oid="v95k1yz">

          █
        </span>
      }
    </div>);

}