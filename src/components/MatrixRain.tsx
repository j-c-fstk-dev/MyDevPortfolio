"use client";

import { useEffect, useRef, useState } from "react";

interface Drop {
  x: number;
  y: number;
  speed: number;
  char: string;
  opacity: number;
}

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Matrix characters
    const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?";
    const drops: Drop[] = [];
    const fontSize = 14;
    let columns = 0;
    let animationId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.floor(canvas.width / fontSize);

      // Initialize drops
      drops.length = 0;
      for (let i = 0; i < columns; i++) {
        drops.push({
          x: i * fontSize,
          y: Math.random() * canvas.height,
          speed: Math.random() * 3 + 1,
          char: chars[Math.floor(Math.random() * chars.length)],
          opacity: Math.random() * 0.5 + 0.1
        });
      }
    };

    const animate = () => {
      // Create trailing effect
      ctx.fillStyle = "rgba(10, 10, 10, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw drops
      ctx.font = `${fontSize}px 'VT323', monospace`;

      drops.forEach((drop) => {
        // Random character change
        if (Math.random() < 0.1) {
          drop.char = chars[Math.floor(Math.random() * chars.length)];
        }

        // Set color with opacity
        const green = Math.floor(255 * drop.opacity);
        ctx.fillStyle = `rgb(0, ${green}, 0)`;

        // Draw character
        ctx.fillText(drop.char, drop.x, drop.y);

        // Move drop
        drop.y += drop.speed;

        // Reset drop when it goes off screen
        if (drop.y > canvas.height) {
          drop.y = -fontSize;
          drop.speed = Math.random() * 3 + 1;
          drop.opacity = Math.random() * 0.5 + 0.1;
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isClient]);

  if (!isClient) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-20"
      style={{ background: "transparent" }}
      data-oid="edwylqb" />);


}