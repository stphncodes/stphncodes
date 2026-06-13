"use client";

import { motion } from "framer-motion";

import { techStack, type TechItem } from "@/lib/data";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/animations/reveal";
import { cn } from "@/lib/utils";

// Visual config per orbit ring: radius (px), spin duration (s), direction.
const RINGS = [
  { radius: 96, duration: 26, reverse: false },
  { radius: 176, duration: 38, reverse: true },
  { radius: 256, duration: 54, reverse: false },
];

function OrbitRing({ index, items }: { index: number; items: TechItem[] }) {
  const ring = RINGS[index];
  if (!ring) return null;

  return (
    <>
      {/* Dashed guide circle */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/10"
        style={{ width: ring.radius * 2, height: ring.radius * 2 }}
      />

      {/* Rotating layer */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin-slow"
        style={{
          width: ring.radius * 2,
          height: ring.radius * 2,
          animationDuration: `${ring.duration}s`,
          animationDirection: ring.reverse ? "reverse" : "normal",
        }}
      >
        {items.map((item, i) => {
          const angle = (i / items.length) * Math.PI * 2;
          const x = Math.cos(angle) * ring.radius;
          const y = Math.sin(angle) * ring.radius;
          return (
            <div
              key={item.name}
              className="absolute left-1/2 top-1/2"
              style={{ transform: `translate(${x}px, ${y}px)` }}
            >
              {/* Counter-rotate so chips stay upright */}
              <div
                className="animate-spin-slow"
                style={{
                  animationDuration: `${ring.duration}s`,
                  animationDirection: ring.reverse ? "normal" : "reverse",
                }}
              >
                <div
                  className="group/chip flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border border-white/10 bg-background/70 px-3 py-1.5 backdrop-blur-md transition-transform duration-300 hover:scale-110"
                  style={{ boxShadow: `0 0 24px -8px ${item.color}` }}
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="whitespace-nowrap text-xs font-medium text-foreground/90">
                    {item.name}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export function TechStack() {
  const byRing = [0, 1, 2].map((r) => techStack.filter((t) => t.ring === r));

  return (
    <section id="stack" className="relative py-28 sm:py-36">
      <div className="container">
        <SectionHeading
          eyebrow="02 — Stack"
          title="A toolkit built for scale"
          description="Languages, frameworks, and platforms I reach for to ship reliable, intelligent products end-to-end."
          align="center"
          className="mx-auto"
        />

        <Reveal direction="none" className="mt-16 flex justify-center">
          <div className="relative flex aspect-square w-full max-w-[600px] scale-[0.62] items-center justify-center sm:scale-90 lg:scale-100">
            {/* Center core */}
            <div className="relative z-10 flex h-28 w-28 flex-col items-center justify-center rounded-full">
              <div className="absolute inset-0 animate-pulse-glow rounded-full bg-primary/30 blur-2xl" />
              <div className="glass-strong relative flex h-full w-full flex-col items-center justify-center rounded-full text-center shadow-glow">
                <span className="font-display text-lg font-bold text-gradient-primary">
                  STPHN
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  core
                </span>
              </div>
            </div>

            {byRing.map((items, i) => (
              <OrbitRing key={i} index={i} items={items} />
            ))}
          </div>
        </Reveal>

        {/* Legend */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
          {(
            [
              { label: "Languages", color: "#3b82f6" },
              { label: "Frameworks", color: "#22d3ee" },
              { label: "AI / ML", color: "#a855f7" },
              { label: "Platforms", color: "#fb923c" },
            ] as const
          ).map((l) => (
            <span key={l.label} className="inline-flex items-center gap-2">
              <span
                className={cn("h-2 w-2 rounded-full")}
                style={{ backgroundColor: l.color }}
              />
              {l.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
