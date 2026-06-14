"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

import { experience } from "@/lib/data";
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
    <section id="journey" className="relative py-28 sm:py-36">
      <div className="container">
        <SectionHeading
          eyebrow="04 — Journey"
          title="Experience timeline"
          description="The path so far — building, leading, and scaling across startups and studios."
          className="max-w-2xl"
        />

        <div ref={timelineRef} className="relative mt-16 pl-8 sm:pl-10">
          {/* Track */}
          <div className="absolute left-[7px] top-2 h-full w-px bg-white/10 sm:left-[11px]" />
          {/* Animated fill */}
          <motion.div
            style={{ scaleY: progress }}
            className="absolute left-[7px] top-2 h-full w-px origin-top bg-gradient-to-b from-primary via-secondary to-primary sm:left-[11px]"
          />

          <div className="flex flex-col gap-12">
            {experience.map((item, i) => (
              <Reveal key={item.company + item.period} direction="left" delay={i * 0.05}>
                <div className="relative">
                  {/* Node */}
                  <span className="absolute -left-8 top-1.5 flex h-4 w-4 items-center justify-center sm:-left-10">
                    <span className="absolute h-4 w-4 animate-pulse-glow rounded-full bg-primary/40 blur-[6px]" />
                    <span className="relative h-3 w-3 rounded-full border-2 border-primary bg-background" />
                  </span>

                  <div className="glass group rounded-2xl p-6 transition-colors duration-300 hover:border-white/20">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="font-display text-xl font-semibold">
                        {item.role}
                      </h3>
                      <span className="font-mono text-xs uppercase tracking-wider text-primary">
                        {item.period}
                      </span>
                    </div>
                    <p className="mt-1 text-sm font-medium text-foreground/80">
                      {item.companyHref ? (
                        <a
                          href={item.companyHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline-offset-4 transition-colors hover:text-primary hover:underline"
                        >
                          {item.company}
                        </a>
                      ) : (
                        item.company
                      )}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {item.highlights.map((h) => (
                        <li
                          key={h}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                          {h}
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
