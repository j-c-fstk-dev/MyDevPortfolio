import { getContent, localePath, type Locale } from "@/data/portfolio";
import { getDictionary } from "@/data/ui";
import { container } from "./ui";

export default function SiteHeader({ lang }: { lang: Locale }) {
  const { profile } = getContent(lang);
  const d = getDictionary(lang);
  const other: Locale = lang === "en" ? "pt" : "en";
  const links = [
    { href: "#work", label: d.nav.work },
    { href: "#experience", label: d.nav.experience },
    { href: "#about", label: d.nav.about },
    { href: "#contact", label: d.nav.contact },
  ];

  return (
    <header
      data-tone="light"
      data-tone-follow="top"
      className="sticky top-0 z-40 border-b border-line/70 bg-mist/85 text-ink backdrop-blur-md transition-colors duration-500"
    >
      <div className={`${container} flex h-16 items-center justify-between gap-4`}>
        <a href="#top" className="text-lg font-bold tracking-tight [font-stretch:85%]">
          <span className="sm:hidden" aria-hidden>
            JC
          </span>
          <span className="sr-only sm:not-sr-only">{profile.name}</span>
        </a>
        <div className="flex items-center gap-4 sm:gap-8">
          <nav aria-label={d.nav.label} className="hidden md:block">
            <ul className="flex items-center gap-8 text-[15px]">
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-ink/80 transition-colors hover:text-pine">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a href="#contact" className="text-[15px] font-medium text-pine md:hidden">
            {d.nav.contact}
          </a>
          <a
            href={localePath(other)}
            hrefLang={other === "pt" ? "pt-BR" : "en"}
            lang={other === "pt" ? "pt-BR" : "en"}
            title={d.switchLanguage.title}
            className="rounded-full px-3 py-1 text-[15px] font-medium ring-1 ring-line transition-colors hover:ring-pine/60"
          >
            {d.switchLanguage.label}
          </a>
        </div>
      </div>
    </header>
  );
}
