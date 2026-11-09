/**
 * The seam where one section's colour takes over from the previous one.
 *
 * It sits just above its section (overlapping the previous one) and is painted
 * in the section's own background colour. ScrollEffects drives --p from 0 to 1
 * as the section approaches; each seam shape reveals the colour differently.
 * Without JavaScript or with reduced motion --p is unset and falls back to 1,
 * so the colour change is a clean cut.
 */

export type SeamShape = "circle" | "ridge" | "ink" | "blocks";

const P = "var(--p, 1)";

/** The pine disc from the hero, grown until it fills the screen. */
function Circle() {
  return (
    <div
      className="absolute inset-0 bg-mist"
      style={{ clipPath: `circle(calc(${P} * 135vmax) at 78% 100%)` }}
    />
  );
}

/** Peak heights (0–1) of a ridge line, loosely the Serra da Mantiqueira skyline. */
const RIDGE = [0.3, 0.45, 0.38, 0.62, 0.55, 0.85, 1, 0.72, 0.58, 0.8, 0.66, 0.42, 0.52, 0.35, 0.25];

/** The colour rises with a mountain-ridge edge that flattens as it fills the section. */
function Ridge() {
  const peaks = RIDGE.map((h, i) => {
    const x = (i / (RIDGE.length - 1)) * 100;
    // Starts below the box (hidden) and ends above it (fully covered); the jaggedness fades out.
    return `${x.toFixed(2)}% calc((1.3 - ${P} * 1.45) * 100% - ${h} * 32% * (1 - ${P}))`;
  });
  return (
    <div
      className="absolute inset-0 bg-mist"
      style={{ clipPath: `polygon(0% 100%, ${peaks.join(", ")}, 100% 100%)` }}
    />
  );
}

/** Blobs of ink that grow and melt into each other (an SVG "goo" filter fuses their edges). */
const BLOBS = [
  { x: 8, size: 34, k: 1.5 },
  { x: 27, size: 26, k: 2.1 },
  { x: 46, size: 40, k: 1.3 },
  { x: 63, size: 24, k: 2.4 },
  { x: 80, size: 36, k: 1.7 },
  { x: 96, size: 28, k: 2 },
];

function Ink() {
  return (
    <>
      <svg aria-hidden className="absolute h-0 w-0">
        <filter id="seam-goo" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="22" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 26 -11" />
        </filter>
      </svg>
      {/* Extends past the seam on every side so the filter never rounds the visible edges. */}
      <div className="seam-goo absolute -inset-x-[10%] -bottom-[12%] -top-[10%]">
        <div
          className="absolute inset-x-0 bottom-0 bg-mist"
          style={{ height: `calc(${P} * 112% - 8%)` }}
        />
        {BLOBS.map((b) => (
          <div
            key={b.x}
            className="absolute rounded-full bg-mist"
            style={{
              left: `${b.x}%`,
              bottom: `calc(${P} * 100% - ${b.size / 2}vw)`,
              width: `${b.size}vw`,
              height: `${b.size}vw`,
              transform: `translateX(-50%) scale(clamp(0, ${P} * ${b.k}, 1.6))`,
            }}
          />
        ))}
      </div>
    </>
  );
}

const COLS = 12;
const ROWS = 6;

/** The colour arrives in blocks, bottom rows first, like a build being assembled. */
function Blocks() {
  const cells = [];
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      // Lower rows go first; a fixed per-column jitter makes the steps uneven.
      const delay = ((ROWS - 1 - row) / ROWS) * 0.55 + (((col * 37) % 11) / 11) * 0.22;
      cells.push(
        <div
          key={`${row}-${col}`}
          className="origin-bottom bg-mist shadow-[0_0_0_1px_rgb(var(--mist))]"
          style={{ transform: `scaleY(clamp(0, (${P} - ${delay.toFixed(3)}) * 7, 1))` }}
        />
      );
    }
  }
  return (
    <div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)`, gridTemplateRows: `repeat(${ROWS}, 1fr)` }}>
      {cells}
    </div>
  );
}

const shapes = { circle: Circle, ridge: Ridge, ink: Ink, blocks: Blocks };

export default function Seam({ shape }: { shape: SeamShape }) {
  const Shape = shapes[shape];
  return (
    <div
      aria-hidden
      data-progress="seam"
      className="pointer-events-none absolute inset-x-0 bottom-[calc(100%_-_1px)] h-[60vh] overflow-hidden"
    >
      <Shape />
    </div>
  );
}
