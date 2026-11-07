import type { MetadataRoute } from "next";
import { SITE_URL, localePath, locales } from "@/data/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => new URL(path, SITE_URL).toString();
  const languages = { en: url(localePath("en")), "pt-BR": url(localePath("pt")) };

  return locales.map((locale) => ({
    url: url(localePath(locale)),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: locale === "en" ? 1 : 0.9,
    alternates: { languages },
  }));
}
