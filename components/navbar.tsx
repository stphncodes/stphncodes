"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";

import { navLinks, siteConfig } from "@/lib/site";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/animations/magnetic";

const sectionIds = navLinks.map((l) => l.href.replace("#", ""));

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const active = useActiveSection(sectionIds);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98], delay: 0.2 }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={cn(
          "flex w-full max-w-3xl items-center justify-between rounded-full px-3 py-2 transition-all duration-500",
          scrolled
            ? "glass-strong shadow-glow-sm"
            : "border border-transparent bg-transparent"
        )}
      >
        {/* Brand */}
        <a
          href="#hero"
          className="group flex items-center gap-2 pl-2 font-display text-sm font-semibold tracking-tight"
        >
          <span className="relative flex h-7 w-7 items-center justify-center rounded-lg bg-primary/15 text-primary">
            <span className="absolute inset-0 animate-pulse-glow rounded-lg bg-primary/20 blur-md" />
            <span className="relative font-mono text-xs">{"</>"}</span>
          </span>
          <span className="text-gradient">{siteConfig.name}</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = active === link.href.replace("#", "");
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={cn(
                    "relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-white/[0.07]"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-2">
          <Magnetic className="hidden sm:inline-flex">
            <Button asChild size="sm" className="rounded-full">
              <a href="#contact">Let&apos;s talk</a>
            </Button>
          </Magnetic>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="flex h-9 w-9 items-center justify-center rounded-full text-foreground/80 transition-colors hover:bg-white/[0.06] md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="absolute left-4 right-4 top-20 z-40 md:hidden"
          >
            <ul className="glass-strong flex flex-col gap-1 rounded-2xl p-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/[0.06] hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-1">
                <Button asChild className="w-full rounded-xl">
                  <a href="#contact" onClick={() => setOpen(false)}>
                    Let&apos;s talk
                  </a>
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
