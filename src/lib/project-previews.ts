import screenshots from "@/data/screenshots.json";

const captured = new Set<string>(screenshots);

export function projectScreenshot(slug: string) {
  return captured.has(slug) ? `/projects/${slug}.jpg` : undefined;
}
