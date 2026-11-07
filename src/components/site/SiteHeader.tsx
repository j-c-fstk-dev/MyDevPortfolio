import { profile } from "@/data/portfolio";
import { container } from "./ui";

const links = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-mist/85 backdrop-blur-md">
      <div className={`${container} flex h-16 items-center justify-between gap-4`}>
        <a href="#top" className="text-lg font-bold tracking-tight [font-stretch:85%]">
          <span className="sm:hidden" aria-hidden>
            JC
          </span>
          <span className="sr-only sm:not-sr-only">{profile.name}</span>
        </a>
        <nav aria-label="Main">
          <ul className="flex items-center gap-4 text-[15px] sm:gap-8">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-ink/80 transition-colors hover:text-pine">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
