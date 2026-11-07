import type { Metadata, Viewport } from "next";
import { Inter, VT323 } from "next/font/google";
import "./globals.css";
import { SITE_URL, contact, profile } from "@/data/portfolio";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const vt323 = VT323({ subsets: ["latin"], weight: "400", variable: "--font-vt323", display: "swap" });

const title = `${profile.name} — ${profile.role}`;
const description = `${profile.role} · ${profile.tagline}. ${profile.availability}.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: `%s · ${profile.name}` },
  description,
  authors: [{ name: profile.name, url: SITE_URL }],
  keywords: [
    "full-stack developer",
    "freelance developer",
    "bug fixing",
    "app rescue",
    "Next.js",
    "React",
    "Web3",
    "Solidity",
    "Farcaster mini apps",
    "Brazil",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: SITE_URL,
    title,
    description,
    siteName: profile.name,
    images: [{ url: profile.photo, alt: profile.name }],
  },
  twitter: { card: "summary", title, description, images: [profile.photo] },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
};

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
  sameAs: [contact.github, contact.blog, contact.beregen],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${vt323.variable}`}>
      <body className="antialiased">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
