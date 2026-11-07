import { notFound } from "next/navigation";
import About from "@/components/site/About";
import Contact from "@/components/site/Contact";
import Experience from "@/components/site/Experience";
import Hero from "@/components/site/Hero";
import ModeSwitcher from "@/components/site/ModeSwitcher";
import Services from "@/components/site/Services";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import Work from "@/components/site/Work";
import { isLocale } from "@/data/portfolio";
import { getDictionary } from "@/data/ui";

// Rebuild once a day so the "Recently on GitHub" list stays current.
export const revalidate = 86400;

export default async function Page({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const d = getDictionary(lang);

  return (
    <ModeSwitcher>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-pine focus:px-4 focus:py-2 focus:text-on-pine"
      >
        {d.skipToContent}
      </a>
      <SiteHeader lang={lang} />
      <main id="main">
        <Hero lang={lang} />
        <Services lang={lang} />
        <Work lang={lang} />
        <Experience lang={lang} />
        <About lang={lang} />
        <Contact lang={lang} />
      </main>
      <SiteFooter lang={lang} />
    </ModeSwitcher>
  );
}
