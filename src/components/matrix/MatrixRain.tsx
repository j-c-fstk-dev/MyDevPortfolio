"use client";

import { useEffect, useRef } from "react";
import type { PhosphorColor } from "./phosphor";

// Half-width katakana, hexadecimal digits, and symbols, as in Operator's CMatrix mode.
const GLYPHS = Array.from("ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ0123456789ABCDEF:・.\"=*+-<>¦｜");
const FRAME_INTERVAL = 1000 / 30;
const MUTATION_RATIO = 0.004;
const HEAD = 0;
const BODY = 1;
const TAIL = 2;

interface Stream {
  head: number;
  speed: number;
  length: number;
  delay: number;
}

const randomIndex = (length: number) => Math.floor(Math.random() * length);
const dimFrom = (stream: Stream) => Math.floor(stream.length * 0.65);

function createStream(rows: number, initial: boolean): Stream {
  return {
    head: initial ? Math.random() * rows * 1.5 - rows * 0.5 : -1,
    speed: 0.3 + Math.random() * 0.7,
    length: 6 + randomIndex(Math.max(8, Math.floor(rows * 0.6))),
    delay: initial ? 0 : randomIndex(45),
  };
}

/** Rasterize each glyph in its three brightness levels once per size or palette. */
function createGlyphAtlas(cell: number, highlight: string, accent: string) {
  const atlas = document.createElement("canvas");
  atlas.width = GLYPHS.length * cell;
  atlas.height = 3 * cell;
  const context = atlas.getContext("2d");
  if (!context) return null;

  context.font = `${Math.round(cell * 0.85)}px "Noto Sans Mono CJK JP", "MS Gothic", monospace`;
  context.textAlign = "center";
  context.textBaseline = "middle";

  for (const [style, paint] of [highlight, accent, accent].entries()) {
    context.fillStyle = paint;
    context.globalAlpha = style === TAIL ? 0.35 : 1;
    context.shadowColor = accent;
    context.shadowBlur = style === HEAD ? cell * 0.18 : 0;
    GLYPHS.forEach((glyph, column) => {
      context.save();
      context.beginPath();
      context.rect(column * cell, style * cell, cell, cell);
      context.clip();
      context.fillText(glyph, (column + 0.5) * cell, (style + 0.5) * cell);
      context.restore();
    });
  }

  return atlas;
}

/** One canvas for the entrance and the background, with fixed cells and staggered streams. */
export default function MatrixRain({ phosphor, intensity }: { phosphor: PhosphorColor; intensity: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const colors = getComputedStyle(canvas);
    const accent = `rgb(${colors.getPropertyValue("--matrix-accent").trim()})`;
    const highlight = `rgb(${colors.getPropertyValue("--matrix-highlight").trim()})`;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let cell = 0;
    let columns = 0;
    let rows = 0;
    let atlas: HTMLCanvasElement | null = null;
    let grid = new Uint8Array(0);
    let streams: Stream[] = [];

    const drawCell = (column: number, row: number, style: number) => {
      if (row < 0 || row >= rows || !atlas) return;
      const x = column * cell;
      const y = row * cell;
      context.clearRect(x, y, cell, cell);
      if (style < 0) return;
      const glyph = grid[row * columns + column];
      context.drawImage(atlas, glyph * cell, style * cell, cell, cell, x, y, cell, cell);
    };

    const styleAt = (column: number, row: number) => {
      const stream = streams[column];
      const distance = Math.floor(stream.head) - row;
      if (stream.delay > 0 || distance < 0 || distance >= stream.length) return -1;
      if (distance === 0) return HEAD;
      return distance >= dimFrom(stream) ? TAIL : BODY;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      cell = Math.round((width < 640 ? 14 : 16) * dpr);
      canvas.width = Math.ceil(width * dpr);
      canvas.height = Math.ceil(height * dpr);
      columns = Math.ceil(canvas.width / cell);
      rows = Math.ceil(canvas.height / cell);
      atlas = createGlyphAtlas(cell, highlight, accent);
      grid = Uint8Array.from({ length: columns * rows }, () => randomIndex(GLYPHS.length));
      streams = Array.from({ length: columns }, () => createStream(rows, true));

      for (let column = 0; column < columns; column++) {
        for (let row = 0; row < rows; row++) {
          const style = styleAt(column, row);
          if (style >= 0) drawCell(column, row, style);
        }
      }
    };

    const step = () => {
      // Update only the cells where the head or tail changed.
      streams.forEach((stream, column) => {
        if (stream.delay > 0) {
          stream.delay--;
          return;
        }
        const previous = Math.floor(stream.head);
        stream.head += stream.speed;
        const row = Math.floor(stream.head);
        if (row === previous) return;

        if (row >= 0 && row < rows) grid[row * columns + column] = randomIndex(GLYPHS.length);
        drawCell(column, row, HEAD);
        drawCell(column, previous, BODY);
        drawCell(column, row - dimFrom(stream), TAIL);
        drawCell(column, row - stream.length, -1);

        if (row - stream.length >= rows) streams[column] = createStream(rows, false);
      });

      const mutations = Math.round(columns * rows * MUTATION_RATIO);
      for (let i = 0; i < mutations; i++) {
        const column = randomIndex(columns);
        const row = randomIndex(rows);
        const style = styleAt(column, row);
        if (style < 0) continue;
        grid[row * columns + column] = randomIndex(GLYPHS.length);
        drawCell(column, row, style);
      }
    };

    let frame = 0;
    let last = 0;
    const animate = (now: number) => {
      const elapsed = now - last;
      if (elapsed >= FRAME_INTERVAL) {
        last = now - elapsed % FRAME_INTERVAL;
        step();
      }
      frame = requestAnimationFrame(animate);
    };

    const updateMotion = () => {
      cancelAnimationFrame(frame);
      if (reducedMotion.matches) return;
      last = performance.now();
      frame = requestAnimationFrame(animate);
    };

    resize();
    updateMotion();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    reducedMotion.addEventListener("change", updateMotion);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      reducedMotion.removeEventListener("change", updateMotion);
    };
  }, [phosphor]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="fixed inset-0 h-full w-full pointer-events-none z-0 motion-safe:transition-opacity duration-1000"
      style={{ opacity: intensity }}
    />
  );
}
