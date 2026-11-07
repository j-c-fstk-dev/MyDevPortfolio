import About from "@/components/site/About";
import Contact from "@/components/site/Contact";
import Experience from "@/components/site/Experience";
import Hero from "@/components/site/Hero";
import ModeSwitcher from "@/components/site/ModeSwitcher";
import Services from "@/components/site/Services";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import Work from "@/components/site/Work";

export default function Page() {
  return (
    <ModeSwitcher>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-pine focus:px-4 focus:py-2 focus:text-on-pine"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Services />
        <Work />
        <Experience />
        <About />
        <Contact />
      </main>
      <SiteFooter />
    </ModeSwitcher>
  );
}
