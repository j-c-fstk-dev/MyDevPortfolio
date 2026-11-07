import { profile } from "@/data/portfolio";
import MatrixButton from "./MatrixButton";
import { container } from "./ui";

export default function SiteFooter() {
  return (
    <footer className="border-t border-line py-10">
      <div className={`${container} flex flex-col gap-6 text-[15px] text-lichen sm:flex-row sm:items-center sm:justify-between`}>
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with Next.js and Tailwind CSS.
        </p>
        <MatrixButton className="group inline-flex items-center gap-2 self-start rounded-full bg-[#0A0A0A] px-4 py-2 font-mono-matrix text-lg leading-none text-[#00FF00] ring-1 ring-[#00FF00]/30 transition-shadow hover:shadow-neon-green">
          <span aria-hidden>💊</span>
          Prefer the Matrix version?
        </MatrixButton>
      </div>
    </footer>
  );
}
