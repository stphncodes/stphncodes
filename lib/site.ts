/**
 * Central site configuration — single source of truth for brand metadata,
 * navigation, and social links. Edit here to update everywhere.
 */

export const siteConfig = {
  name: "STPHNCODES",
  author: "Stephen",
  role: "Software Engineer",
  tagline: "Engineering intelligent, scalable systems.",
  description:
    "STPHNCODES — Stephen is a software engineer specializing in AI engineering, full-stack development, and scalable systems. Building with Python, JavaScript, Next.js, React, and Node.js.",
  url: "https://stphncodes.dev",
  email: "joshuamadu4@gmail.com",
  location: "Remote / Worldwide",
  keywords: [
    "Stephen",
    "STPHNCODES",
    "Software Engineer",
    "AI Engineer",
    "Machine Learning",
    "Next.js",
    "React",
    "Node.js",
    "Python",
    "Full-Stack",
    "TypeScript",
    "Portfolio",
  ],
} as const;

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Stack", href: "#stack" },
  { label: "Work", href: "#work" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
] as const;

export const socialLinks = [
  { label: "GitHub", href: "https://github.com", handle: "@stphncodes", icon: "github" },
  { label: "X", href: "https://x.com", handle: "@stphncodes", icon: "twitter" },
  { label: "LinkedIn", href: "https://linkedin.com", handle: "in/stphncodes", icon: "linkedin" },
  { label: "Email", href: "mailto:joshuamadu4@gmail.com", handle: "joshuamadu4@gmail.com", icon: "mail" },
] as const;
