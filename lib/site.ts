/**
 * Central site configuration — single source of truth for brand metadata,
 * navigation, and social links. Edit here to update everywhere.
 */

export const siteConfig = {
  name: "STPHNCODES",
  author: "Stephen",
  role: "Web · AI · Automation",
  tagline:
    "Websites, AI agents & automation that turn your online presence into revenue.",
  description:
    "STPHNCODES is Stephen James's studio in Abuja, Nigeria, available worldwide. I help business owners build a real online presence and turn it into revenue with high-converting websites, custom AI agents, and workflow automation, built on Next.js, React, and the Claude API.",
  url: "https://www.cloudwithstephen.com",
  email: "stphncodes@gmail.com",
  location: "Abuja, Nigeria",
  // Structured geo — single source for geo meta tags + JSON-LD address.
  // Region code is ISO 3166-2 (NG-FC = Federal Capital Territory); position is lat;long.
  geo: {
    locality: "Abuja",
    region: "Federal Capital Territory",
    regionCode: "NG-FC",
    country: "Nigeria",
    countryCode: "NG",
    position: "9.0765;7.3986",
  },
  keywords: [
    "Stephen",
    "Stephen James",
    "STPHNCODES",
    "Web Design Agency Nigeria",
    "Web Development Agency Abuja",
    "Business Website Nigeria",
    "E-commerce Website Nigeria",
    "AI Automation Agency Nigeria",
    "AI Agent Development",
    "Chatbot Development Nigeria",
    "Workflow Automation",
    "CRM Automation",
    "Hire Web Developer Nigeria",
    "Freelance Developer Nigeria",
    "Agentic AI",
    "Claude API",
    "Next.js",
    "React",
    "TypeScript",
    "Nigeria",
    "Abuja",
  ],
} as const;

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
] as const;

export const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/stphncodes",
    handle: "@stphncodes",
    icon: "github",
  },
  {
    label: "X",
    href: "https://x.com/stphncodes",
    handle: "@stphncodes",
    icon: "twitter",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/stephenjams/",
    handle: "in/stphncodes",
    icon: "linkedin",
  },
  {
    label: "Email",
    href: "mailto:stphncodes@gmail.com",
    handle: "stphncodes@gmail.com",
    icon: "mail",
  },
] as const;
