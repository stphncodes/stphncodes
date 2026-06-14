"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ArrowDown, Sparkles } from "lucide-react";

import { siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/animations/magnetic";
import { TiltCard } from "@/components/animations/tilt-card";
import { Aurora } from "@/components/background/aurora";
import { ParticleField } from "@/components/background/particle-field";

// Swap this for your real photo (drop a file in /public and point here).
const PROFILE_IMAGE = "/profile.jpg";

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
          "[data-hero='photo']",
          { y: 40, opacity: 0, scale: 0.92, duration: 1 },
          "-=0.9"
        )
        .from(
          "[data-hero='sub']",
          { y: 24, opacity: 0, duration: 0.8 },
          "-=0.7"
        )
        .from(
          "[data-hero='cta'] > *",
          { y: 20, opacity: 0, duration: 0.6, stagger: 0.12 },
          "-=0.5"
        )
        .from("[data-hero='scroll']", { opacity: 0, duration: 0.6 }, "-=0.2");
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Layered background */}
      <Aurora />
      <div className="absolute inset-0 bg-grid mask-radial opacity-60" />
      <ParticleField className="opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/0 to-background" />

      <motion.div
        style={{ y, opacity, scale }}
        className="container relative z-10 grid items-center gap-12 py-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-0"
      >
        {/* ── Left: copy ── */}
        <div className="order-2 flex flex-col items-center text-center lg:order-1 lg:items-start lg:text-left">
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
          <h1 className="font-display text-[clamp(2.6rem,8vw,6.5rem)] font-bold leading-[0.92] tracking-tight">
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
            <span className="font-medium text-foreground">
              {siteConfig.role}
            </span>{" "}
            crafting fast, scalable products — from{" "}
            <span className="text-foreground">full-stack web</span> to{" "}
            <span className="text-foreground">automation &amp; agentic AI</span>.
          </p>

          {/* CTAs */}
          <div
            data-hero="cta"
            className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
          >
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
        </div>

        {/* ── Right: portrait ── */}
        <div
          data-hero="photo"
          className="group order-1 mx-auto w-full max-w-[300px] sm:max-w-[360px] lg:order-2 lg:max-w-[420px]"
        >
          <TiltCard intensity={8} className="rounded-[2rem]">
            {/* Glow halo behind the frame */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-6 rounded-[3rem] bg-gradient-to-tr from-primary/30 via-fuchsia-500/20 to-cyan-400/30 opacity-60 blur-3xl transition-opacity duration-500 group-hover:opacity-90"
            />

            {/* Spinning conic gradient ring */}
            <div className="relative rounded-[2rem] p-[1.5px]">
              <div
                aria-hidden
                className="absolute inset-0 animate-spin-slow rounded-[2rem] opacity-80"
                style={{
                  background:
                    "conic-gradient(from 0deg, hsl(var(--primary)), #a855f7, #22d3ee, hsl(var(--primary)))",
                }}
              />

              {/* Photo */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-[calc(2rem-1.5px)] bg-card">
                <Image
                  src={PROFILE_IMAGE}
                  alt={siteConfig.author}
                  fill
                  priority
                  sizes="(max-width: 1024px) 360px, 420px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Depth gradient at the base */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent"
                />
              </div>
            </div>

            {/* Floating glass chip: role */}
            <div
              className="glass absolute -left-5 bottom-10 hidden items-center gap-2 rounded-2xl px-3.5 py-2 text-xs font-medium shadow-glow-sm sm:flex"
              style={{ transform: "translateZ(60px)" }}
            >
              <Sparkles className="size-3.5 text-primary" />
              {siteConfig.role}
            </div>

            {/* Floating glass chip: location */}
            <div
              className="glass absolute -right-4 top-8 hidden items-center gap-2 rounded-2xl px-3.5 py-2 text-xs font-medium text-muted-foreground sm:flex"
              style={{ transform: "translateZ(40px)" }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {siteConfig.location}
            </div>
          </TiltCard>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <a
        data-hero="scroll"
        href="#about"
        aria-label="Scroll to about"
        className="group absolute bottom-8 left-1/2 z-10 inline-flex -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground"
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
