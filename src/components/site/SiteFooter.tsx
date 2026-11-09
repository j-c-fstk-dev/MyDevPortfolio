import { getContent, type Locale } from "@/data/portfolio";
import { getDictionary } from "@/data/ui";
import MatrixButton from "./MatrixButton";
import { container } from "./ui";

export default function SiteFooter({ lang }: { lang: Locale }) {
  const { profile } = getContent(lang);
  const d = getDictionary(lang).footer;

  return (
    <footer data-tone="light" className="border-t border-line bg-mist py-10 text-ink">
      <div className={`${container} flex flex-col gap-6 text-[15px] text-lichen sm:flex-row sm:items-center sm:justify-between`}>
        <p>
          © {new Date().getFullYear()} {profile.name}. {d.builtWith}
        </p>
        <MatrixButton className="group inline-flex items-center gap-2 self-start rounded-full bg-[#0A0A0A] px-4 py-2 font-mono-matrix text-lg leading-none text-[#00FF00] ring-1 ring-[#00FF00]/30 transition-shadow hover:shadow-neon-green">
          <span aria-hidden>💊</span>
          {d.matrix}
        </MatrixButton>
      </div>
    </footer>
  );
}
