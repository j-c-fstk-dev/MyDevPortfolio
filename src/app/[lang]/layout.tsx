import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, VT323 } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { SITE_URL, getContent, isLocale, localePath, locales } from "@/data/portfolio";
import { getDictionary } from "@/data/ui";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  axes: ["opsz", "wdth"],
  display: "swap",
});
const vt323 = VT323({ subsets: ["latin"], weight: "400", variable: "--font-vt323", display: "swap" });

// Only /en (served at /) and /pt exist; anything else is a 404.
export const dynamicParams = false;
export const generateStaticParams = () => locales.map((lang) => ({ lang }));

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { profile } = getContent(lang);
  const description = getDictionary(lang).meta.description;
  const title = `${profile.name} — ${profile.role}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: `%s · ${profile.name}` },
    description,
    authors: [{ name: profile.name, url: SITE_URL }],
    alternates: {
      canonical: localePath(lang),
      languages: { en: localePath("en"), "pt-BR": localePath("pt"), "x-default": localePath("en") },
    },
    openGraph: {
      type: "profile",
      url: localePath(lang),
      locale: lang === "pt" ? "pt_BR" : "en_US",
      title,
      description,
      siteName: profile.name,
      images: [{ url: profile.photo, alt: profile.name }],
    },
    twitter: { card: "summary", title, description, images: [profile.photo] },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#EDF1EE" },
    { media: "(prefers-color-scheme: dark)", color: "#0E1A18" },
  ],
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const { profile, contact } = getContent(lang);

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    alternateName: profile.legalName,
    jobTitle: profile.role,
    url: SITE_URL,
    image: profile.photo,
    email: `mailto:${contact.email}`,
    address: { "@type": "PostalAddress", addressCountry: "BR" },
    knowsLanguage: ["pt-BR", "en"],
    sameAs: [contact.github, contact.blog, contact.beregen],
  };

  return (
    <html lang={lang === "pt" ? "pt-BR" : "en"} className={`${bricolage.variable} ${vt323.variable}`}>
      <body className="antialiased">
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </body>
    </html>
  );
}
