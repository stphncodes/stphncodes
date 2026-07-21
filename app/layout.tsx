import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";

import { siteConfig, socialLinks } from "@/lib/site";
import { services } from "@/lib/data";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { Cursor } from "@/components/cursor";
import { ChatWidget } from "@/components/chat/chat-widget";
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
    default: "Websites, AI Agents & Automation in Nigeria | STPHNCODES",
    template: `%s | ${siteConfig.name}`,
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
    title: "Websites, AI Agents & Automation in Nigeria | STPHNCODES",
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "Websites, AI Agents & Automation in Nigeria | STPHNCODES",
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

// Social profiles Google can use to corroborate identity (E-E-A-T).
const sameAs = socialLinks
  .filter((s) => s.href.startsWith("http"))
  .map((s) => s.href);

const businessId = `${siteConfig.url}/#business`;
const personId = `${siteConfig.url}/#stephen`;
const websiteId = `${siteConfig.url}/#website`;
const imageUrl = `${siteConfig.url}/opengraph-image`;
const [lat, lng] = siteConfig.geo.position.split(";");

const address = {
  "@type": "PostalAddress",
  addressLocality: siteConfig.geo.locality,
  addressRegion: siteConfig.geo.region,
  addressCountry: siteConfig.geo.countryCode,
};

const areaServed = [
  { "@type": "Country", name: "Nigeria" },
  { "@type": "AdministrativeArea", name: "Abuja (FCT)" },
  "Worldwide",
];

// Schema graph: the studio (ProfessionalService) for service/local ranking,
// the founder (Person), and the WebSite — cross-linked by @id.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": businessId,
      name: siteConfig.name,
      alternateName: `${siteConfig.author} James`,
      url: siteConfig.url,
      image: imageUrl,
      logo: imageUrl,
      email: siteConfig.email,
      description: siteConfig.description,
      priceRange: "₦150,000 - ₦3,000,000+",
      currenciesAccepted: "NGN, USD",
      address,
      geo: {
        "@type": "GeoCoordinates",
        latitude: lat,
        longitude: lng,
      },
      areaServed,
      founder: { "@id": personId },
      sameAs,
      knowsAbout: [
        "Web Development",
        "Business Websites",
        "E-commerce Development",
        "Agentic AI",
        "AI Agents & Chatbots",
        "Workflow Automation",
        "CRM Integration",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services",
        itemListElement: services.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.title,
            description: service.tagline,
            areaServed,
            provider: { "@id": businessId },
          },
        })),
      },
    },
    {
      "@type": "Person",
      "@id": personId,
      name: `${siteConfig.author} James`,
      alternateName: siteConfig.name,
      url: siteConfig.url,
      email: siteConfig.email,
      jobTitle: "Web, AI & Automation Developer",
      description: siteConfig.description,
      address,
      worksFor: { "@id": businessId },
      sameAs,
      knowsAbout: [
        "Web Development",
        "Agentic AI",
        "Workflow Automation",
        "Next.js",
        "React",
        "Claude API",
      ],
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: siteConfig.url,
      name: siteConfig.name,
      description: siteConfig.description,
      publisher: { "@id": businessId },
      inLanguage: "en",
    },
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
        <ChatWidget />
      </body>
    </html>
  );
}
