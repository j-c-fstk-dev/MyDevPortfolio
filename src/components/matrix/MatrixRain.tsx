"use client";

import { useEffect, useRef } from "react";

/** Random glyphs, plus words from Jorge's stack that stream down some columns. */
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*+=<>{}[]|;:";
const TERMS = ["SOLIDITY", "NEXT.JS", "REACT", "CELO", "NODE", "N8N", "TYPESCRIPT", "SUPABASE", "WEB3", "FARCASTER", "NOSTR", "STRIPE"];
const WORD_CHANCE = 0.18;
const FONT_SIZE = 14;

interface Drop {
  x: number;
  y: number;
  speed: number;
  opacity: number;
  /** When set, the column spells this word, one letter per row. */
  word: string | null;
  row: number;
  char: string;
}

const randomChar = () => CHARS[Math.floor(Math.random() * CHARS.length)];

function newDrop(x: number, y: number): Drop {
  const word = Math.random() < WORD_CHANCE ? TERMS[Math.floor(Math.random() * TERMS.length)] : null;
  return {
    x,
    y,
    speed: Math.random() * 3 + 1,
    opacity: word ? 0.75 : Math.random() * 0.5 + 0.1,
    word,
    row: Math.floor(y / FONT_SIZE),
    char: word ? word[0] : randomChar(),
  };
}

/**
 * The falling-code background. One canvas is used from the entrance transition
 * through the whole Matrix portfolio; `intensity` sets how strongly it shows.
 */
export default function MatrixRain({ intensity = 0.2 }: { intensity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const drops: Drop[] = [];
    let animationId = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drops.length = 0;
      for (let x = 0; x < canvas.width; x += FONT_SIZE) {
        drops.push(newDrop(x, Math.random() * canvas.height));
      }
    };

    // next/font exposes the generated font-family name through a CSS variable.
    const fontFamily = getComputedStyle(document.body).getPropertyValue("--font-vt323").trim();
    const font = `${FONT_SIZE}px ${fontFamily ? `${fontFamily}, ` : ""}monospace`;

    const draw = () => {
      ctx.fillStyle = "rgba(10, 10, 10, 0.05)"; // trailing fade
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = font;

      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i];
        const row = Math.floor(drop.y / FONT_SIZE);
        if (row !== drop.row) {
          drop.row = row;
          drop.char = drop.word ? drop.word[Math.abs(row) % drop.word.length] : randomChar();
        } else if (!drop.word && Math.random() < 0.05) {
          drop.char = randomChar();
        }

        ctx.fillStyle = `rgb(0, ${Math.floor(255 * drop.opacity)}, 0)`;
        ctx.fillText(drop.char, drop.x, drop.y);
        drop.y += drop.speed;

        if (drop.y > canvas.height) drops[i] = newDrop(drop.x, -FONT_SIZE);
      }
      animationId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    // No endless animation for people who prefer reduced motion.
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="fixed inset-0 h-full w-full pointer-events-none z-0 transition-opacity duration-1000"
      style={{ opacity: intensity }}
    />
  );
}
