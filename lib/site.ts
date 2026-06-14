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
    "STPHNCODES — Stephen is a software engineer specializing in full-stack web development, automation, and agentic AI. Building with JavaScript, TypeScript, Python, Next.js, React, and Vite.",
  url: "https://www.cloudwithstephen.com",
  email: "joshuamadu4@gmail.com",
  location: "Remote / Worldwide",
  keywords: [
    "Stephen",
    "STPHNCODES",
    "Software Engineer",
    "Web Developer",
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
