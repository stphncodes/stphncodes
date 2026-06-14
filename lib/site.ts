/**
 * Central site configuration — single source of truth for brand metadata,
 * navigation, and social links. Edit here to update everywhere.
 */

export const siteConfig = {
  name: "STPHNCODES",
  author: "Stephen",
  role: "Software Engineer",
  tagline: "Building the web, automating the rest.",
  description:
    "STPHNCODES — Stephen James is a software engineer in Abuja, Nigeria, available worldwide. Specializing in full-stack web development, automation, and agentic AI with Next.js, React, Python, and TypeScript. Available for projects, contracts, and collaboration.",
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
    "Software Engineer",
    "Software Engineer Nigeria",
    "Software Developer Abuja",
    "Web Developer Nigeria",
    "Web Developer Abuja",
    "Hire Developer Nigeria",
    "Freelance Developer Nigeria",
    "Automation",
    "Agentic AI",
    "AI Agents",
    "Next.js",
    "React",
    "Vite",
    "Node.js",
    "Python",
    "Full-Stack",
    "TypeScript",
    "Nigeria",
    "Abuja",
    "Portfolio",
  ],
} as const;

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Stack", href: "#stack" },
  { label: "Work", href: "#work" },
  { label: "Journey", href: "#journey" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
] as const;

export const socialLinks = [
  { label: "GitHub", href: "https://github.com", handle: "@stphncodes", icon: "github" },
  { label: "X", href: "https://x.com", handle: "@stphncodes", icon: "twitter" },
  { label: "LinkedIn", href: "https://linkedin.com", handle: "in/stphncodes", icon: "linkedin" },
  { label: "Email", href: "mailto:stphncodes@gmail.com", handle: "stphncodes@gmail.com", icon: "mail" },
] as const;
