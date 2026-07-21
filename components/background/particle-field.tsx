"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

interface ParticleFieldProps {
  className?: string;
  /** Approximate particle count at 1080p; scales with viewport area (capped). */
  density?: number;
  color?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

// Hard limits so the O(n²) constellation pass never explodes on large displays.
const MAX_PARTICLES = 80;
const LINK_DIST = 120;
const LINK_DIST_SQ = LINK_DIST * LINK_DIST;
const ATTRACT_DIST_SQ = 160 * 160;

/**
 * Lightweight canvas particle field with cursor-reactive drift and
 * proximity-linked constellation lines. Skipped on touch/small screens and
 * reduced-motion, DPR-capped, and paused whenever the canvas is off-screen or
 * the tab is hidden so it costs nothing once the hero scrolls away.
 */
export function ParticleField({
  className,
  density = 55,
  color = "168, 130, 255",
}: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    // Canvas particle sims are expensive relative to phone GPUs and add little
    // on a small screen — skip them entirely there.
    if (window.matchMedia("(max-width: 768px)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let raf = 0;
    let running = false;
    let inView = false;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -9999, y: -9999 };
    let rect = canvas.getBoundingClientRect();
    const fill = `rgba(${color}, 0.8)`;

    const seed = () => {
      const scaled = Math.round((density * (width * height)) / (1920 * 1080));
      const count = Math.min(MAX_PARTICLES, Math.max(24, scaled));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.4,
      }));
    };

    const resize = () => {
      const parent = canvas.parentElement;
      width = parent?.clientWidth ?? window.innerWidth;
      height = parent?.clientHeight ?? window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      rect = canvas.getBoundingClientRect();
      seed();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = fill;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Gentle attraction toward the cursor (squared-distance gate; sqrt only
        // when actually in range).
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dsq = dx * dx + dy * dy;
        if (dsq < ATTRACT_DIST_SQ && dsq > 0.01) {
          const inv = 0.015 / Math.sqrt(dsq);
          p.vx += dx * inv;
          p.vy += dy * inv;
        }

        // Damp velocity + wrap around edges.
        p.vx *= 0.99;
        p.vy *= 0.99;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Constellation links — compare squared distance first, take the sqrt only
      // for the handful of pairs that are close enough to draw.
      ctx.lineWidth = 0.6;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dsq = dx * dx + dy * dy;
          if (dsq < LINK_DIST_SQ) {
            const d = Math.sqrt(dsq);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${color}, ${0.12 * (1 - d / LINK_DIST)})`;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(draw);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };
    // Only animate when the canvas is on-screen and the tab is visible.
    const sync = () => {
      if (inView && !document.hidden) start();
      else stop();
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onScroll = () => {
      rect = canvas.getBoundingClientRect();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        sync();
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    resize();

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseout", onMouseLeave);
    document.addEventListener("visibilitychange", sync);

    return () => {
      stop();
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseout", onMouseLeave);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [density, color]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("absolute inset-0 h-full w-full", className)}
    />
  );
}
