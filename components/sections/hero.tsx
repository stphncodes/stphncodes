"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ArrowDown, Sparkles } from "lucide-react";

import { siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/animations/magnetic";
import { Aurora } from "@/components/background/aurora";
import { ParticleField } from "@/components/background/particle-field";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: root,
    offset: ["start start", "end start"],
  });

  // Parallax + fade as the hero scrolls away.
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.15,
      });

      tl.from("[data-hero='badge']", { y: 20, opacity: 0, duration: 0.7 })
        .from(
          "[data-hero='line'] .hero-word",
          { yPercent: 120, opacity: 0, duration: 1, stagger: 0.08 },
          "-=0.3"
        )
        .from(
          "[data-hero='sub']",
          { y: 24, opacity: 0, duration: 0.8 },
          "-=0.6"
        )
        .from(
          "[data-hero='cta'] > *",
          { y: 20, opacity: 0, duration: 0.6, stagger: 0.12 },
          "-=0.5"
        )
        .from(
          "[data-hero='scroll']",
          { opacity: 0, duration: 0.6 },
          "-=0.2"
        );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="hero"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      {/* Layered background */}
      <Aurora />
      <div className="absolute inset-0 bg-grid mask-radial opacity-60" />
      <ParticleField className="opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/0 to-background" />

      <motion.div
        style={{ y, opacity, scale }}
        className="container relative z-10 flex flex-col items-center text-center"
      >
        {/* Availability badge */}
        <div
          data-hero="badge"
          className="glass mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-muted-foreground"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Available for select projects
        </div>

        {/* Headline */}
        <h1 className="font-display text-[clamp(2.8rem,11vw,8.5rem)] font-bold leading-[0.92] tracking-tight">
          <span data-hero="line" className="block overflow-hidden">
            <span className="hero-word inline-block text-gradient">STPHN</span>
            <span className="hero-word inline-block text-gradient-primary">
              CODES
            </span>
          </span>
        </h1>

        <p
          data-hero="sub"
          className="mt-7 max-w-xl text-balance text-base text-muted-foreground sm:text-lg md:text-xl"
        >
          I&apos;m {siteConfig.author}, a{" "}
          <span className="font-medium text-foreground">{siteConfig.role}</span>{" "}
          crafting fast, scalable products — from{" "}
          <span className="text-foreground">full-stack web</span> to{" "}
          <span className="text-foreground">automation &amp; agentic AI</span>.
        </p>

        {/* CTAs */}
        <div data-hero="cta" className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Magnetic>
            <Button asChild size="lg">
              <a href="#work">
                <Sparkles className="size-4" />
                View my work
              </a>
            </Button>
          </Magnetic>
          <Magnetic>
            <Button asChild size="lg" variant="outline">
              <a href="#contact">Get in touch</a>
            </Button>
          </Magnetic>
        </div>

        {/* Scroll cue */}
        <a
          data-hero="scroll"
          href="#about"
          aria-label="Scroll to about"
          className="group mt-16 inline-flex flex-col items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground"
        >
          Scroll
          <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/15 p-1">
            <motion.span
              className="h-2 w-1 rounded-full bg-primary"
              animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </a>
      </motion.div>

      {/* Bottom scroll arrow accent */}
      <motion.div
        aria-hidden
        style={{ opacity }}
        className="pointer-events-none absolute bottom-8 right-8 hidden text-muted-foreground/60 lg:block"
      >
        <ArrowDown className="size-5 animate-bounce" />
      </motion.div>
    </section>
  );
}
