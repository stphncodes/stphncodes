"use client";

import Image from "next/image";
import { ArrowUp, Github, Linkedin, Mail, Twitter } from "lucide-react";

import { navLinks, siteConfig, socialLinks } from "@/lib/site";
import { Magnetic } from "@/components/animations/magnetic";
import { cn } from "@/lib/utils";

const iconMap = {
  github: Github,
  twitter: Twitter,
  linkedin: Linkedin,
  mail: Mail,
} as const;

export function Footer() {
  const year = 2026; // Avoid hydration drift from runtime Date in this static build.

  return (
    <footer className="relative overflow-hidden border-t border-foreground/10">
      <div className="absolute inset-0 bg-dots opacity-30 mask-fade-b" />

      <div className="container relative py-16">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          {/* Brand block */}
          <div className="max-w-sm">
            <a
              href="#hero"
              aria-label={`${siteConfig.name} — back to top`}
              className="inline-block"
            >
              <Image
                src="/brand/logo.png"
                alt={siteConfig.name}
                width={1200}
                height={387}
                sizes="260px"
                className="h-auto w-[260px] max-w-full"
              />
            </a>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {siteConfig.tagline} A web, AI &amp; automation studio for
              business owners in Nigeria and worldwide.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((s) => {
                const Icon = iconMap[s.icon as keyof typeof iconMap];
                return (
                  <Magnetic key={s.label} strength={0.5}>
                    <a
                      href={s.href}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      aria-label={s.label}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 bg-foreground/[0.02] text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                    >
                      <Icon className="size-4" />
                    </a>
                  </Magnetic>
                );
              })}
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-10 sm:gap-16">
            <nav className="flex flex-col gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground/70">
                Navigate
              </span>
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l.label}
                </a>
              ))}
            </nav>
            <div className="flex flex-col gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground/70">
                Say hello
              </span>
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {siteConfig.email}
              </a>
              <span className="text-sm text-muted-foreground">
                {siteConfig.location}
              </span>
            </div>
          </div>
        </div>

        {/* Oversized wordmark */}
        <div
          aria-hidden
          className="pointer-events-none mt-12 select-none text-center font-display text-[18vw] font-bold leading-none tracking-tighter text-foreground/[0.03] lg:text-[14rem]"
        >
          STPHNCODES
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-foreground/10 pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {year} {siteConfig.name}. Crafted with Next.js, Framer Motion &amp; GSAP.
          </p>
          <a
            href="#hero"
            className={cn(
              "group inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
            )}
          >
            Back to top
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-foreground/10 transition-transform group-hover:-translate-y-0.5">
              <ArrowUp className="size-3.5" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
