"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

import { processSteps } from "@/lib/data";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/animations/reveal";

export function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 60%", "end 60%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <section id="process" className="relative py-28 sm:py-36">
      <div className="container">
        <SectionHeading
          eyebrow="04 · Process"
          title="How we work together"
          description="A simple, proven path from first call to a site that keeps paying off, long after launch."
          className="max-w-2xl"
        />

        <div ref={timelineRef} className="relative mt-16 pl-8 sm:pl-10">
          {/* Track */}
          <div className="absolute left-[7px] top-2 h-full w-px bg-foreground/10 sm:left-[11px]" />
          {/* Animated fill */}
          <motion.div
            style={{ scaleY: progress }}
            className="absolute left-[7px] top-2 h-full w-px origin-top bg-gradient-to-b from-primary via-secondary to-primary sm:left-[11px]"
          />

          <div className="flex flex-col gap-12">
            {processSteps.map((item, i) => (
              <Reveal key={item.step} direction="left" delay={i * 0.05}>
                <div className="relative">
                  {/* Node */}
                  <span className="absolute -left-8 top-1.5 flex h-4 w-4 items-center justify-center sm:-left-10">
                    <span className="absolute h-4 w-4 animate-pulse-glow rounded-full bg-primary/40 blur-[6px]" />
                    <span className="relative h-3 w-3 rounded-full border-2 border-primary bg-background" />
                  </span>

                  <div className="glass group rounded-2xl p-6 transition-colors duration-300 hover:border-foreground/20">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="font-display text-xl font-semibold">
                        {item.title}
                      </h3>
                      <span className="font-mono text-xs uppercase tracking-wider text-primary">
                        Step {item.step}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {item.points.map((p) => (
                        <li
                          key={p}
                          className="flex items-center gap-2 rounded-full border border-foreground/10 bg-foreground/[0.03] px-3 py-1 text-xs text-foreground/75"
                        >
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
