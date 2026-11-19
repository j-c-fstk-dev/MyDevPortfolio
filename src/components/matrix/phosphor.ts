export const phosphorColors = {
  green: "Green",
  aqua: "Aqua",
  blue: "Blue",
  purple: "Purple",
  pink: "Pink",
  red: "Red",
  amber: "Amber",
  mono: "Mono",
} as const;

export type PhosphorColor = keyof typeof phosphorColors;

export const PHOSPHOR_STORAGE_KEY = "portfolio-matrix-phosphor";

export function getPhosphorColor(value: string | null): PhosphorColor {
  return value && Object.hasOwn(phosphorColors, value) ? value as PhosphorColor : "green";
}
