import type { Tone } from "./ui";

/**
 * A colour transition between two sections. A runway that overlaps the last
 * screen of the previous section holds a transparent stage that stays on
 * screen (sticky). While that last screen scrolls by, the next section's
 * colour grows over it with a shape, so there is never an empty screen. The
 * stage is the whole screen, so the shape is never cut by a section edge.
 * ScrollEffects drives --p (0 → 1) across the runway.
 *
 * Without JavaScript or with reduced motion the runway is not rendered and the
 * sections simply meet.
 */

export type TransitionShape = "ridge" | "blocks";

const P = "var(--p, 0)";

/** Peak heights (0–1) of a ridge line, loosely the Serra da Mantiqueira skyline. */
const RIDGE = [0.3, 0.45, 0.38, 0.62, 0.55, 0.85, 1, 0.72, 0.58, 0.8, 0.66, 0.42, 0.52, 0.35, 0.25];

/** The new colour rises with a mountain-ridge edge that flattens as it fills the screen. */
function ridgeClip() {
  const peaks = RIDGE.map((h, i) => {
    const x = (i / (RIDGE.length - 1)) * 100;
    return `${x.toFixed(2)}% calc((1.3 - ${P} * 1.45) * 100% - ${h} * 34% * (1 - ${P}))`;
  });
  return `polygon(0% 100%, ${peaks.join(", ")}, 100% 100%)`;
}

const COLS = 12;
const ROWS = 7;

/** The new colour arrives in blocks, bottom rows first, like a build being assembled. */
function Blocks() {
  const cells = [];
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      // Lower rows go first; a fixed per-column jitter makes the steps uneven.
      const delay = ((ROWS - 1 - row) / ROWS) * 0.6 + (((col * 37) % 11) / 11) * 0.22;
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
    <div
      className="absolute inset-0 grid"
      style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)`, gridTemplateRows: `repeat(${ROWS}, 1fr)` }}
    >
      {cells}
    </div>
  );
}

export default function Transition({ from, to, shape }: { from: Tone; to: Tone; shape: TransitionShape }) {
  return (
    <div
      aria-hidden
      data-progress="pin"
      className="transition-screen pin-runway pointer-events-none relative -mt-[100vh] h-[165vh]"
    >
      <div data-tone={from} className="pin-stage sticky top-0 h-screen overflow-hidden">
        {shape === "blocks" ? (
          <div data-tone={to} data-cover="0.75" className="absolute inset-0">
            <Blocks />
          </div>
        ) : (
          <div
            data-tone={to}
            data-cover="0.6"
            className="absolute inset-0 bg-mist"
            style={{ clipPath: ridgeClip() }}
          />
        )}
      </div>
    </div>
  );
}
