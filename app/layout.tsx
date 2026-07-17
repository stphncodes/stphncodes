import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";

import { siteConfig } from "@/lib/site";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { Cursor } from "@/components/cursor";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} · ${siteConfig.author}, ${siteConfig.role}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  creator: siteConfig.author,
  applicationName: siteConfig.name,
  category: "technology",
  alternates: { canonical: "/" },
  // Geo meta tags — help local/regional discovery (Abuja, Nigeria).
  other: {
    "geo.region": siteConfig.geo.regionCode,
    "geo.placename": siteConfig.geo.locality,
    "geo.position": siteConfig.geo.position,
    ICBM: siteConfig.geo.position.replace(";", ", "),
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: siteConfig.url,
    title: `${siteConfig.name} · ${siteConfig.author}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} · ${siteConfig.author}`,
    description: siteConfig.description,
    creator: "@stphncodes",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION in your env (Vercel/host) with the
  // token from Google Search Console to verify domain ownership. Omitted if unset.
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: `${siteConfig.author} James`,
  alternateName: siteConfig.name,
  url: siteConfig.url,
  email: siteConfig.email,
  jobTitle: siteConfig.role,
  description: siteConfig.description,
  address: {
    "@type": "PostalAddress",
    addressLocality: siteConfig.geo.locality,
    addressRegion: siteConfig.geo.region,
    addressCountry: siteConfig.geo.countryCode,
  },
  // Anchored in Nigeria, open to clients worldwide.
  homeLocation: {
    "@type": "Place",
    name: siteConfig.location,
  },
  areaServed: [
    { "@type": "Country", name: "Nigeria" },
    "Worldwide",
  ],
  knowsAbout: [
    "Full-Stack Web Development",
    "Automation",
    "Agentic AI",
    "Web Performance",
    "Next.js",
    "React",
    "Python",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${sans.variable} ${display.variable} ${mono.variable} font-sans`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <Cursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
