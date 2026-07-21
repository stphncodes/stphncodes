"use client";

import { motion } from "framer-motion";

import { stats } from "@/lib/data";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/animations/reveal";
import { TextReveal } from "@/components/animations/text-reveal";
import { TiltCard } from "@/components/animations/tilt-card";

const codeLines = [
  { t: "const", n: " studio ", o: "= {", c: "" },
  { t: "  builds:", n: "", o: " ", c: '"web · ai · automation",' },
  { t: "  goal:", n: "", o: " ", c: '"presence → revenue",' },
  { t: "  serves:", n: "", o: " ", c: '"business owners",' },
  { t: "}", n: "", o: "", c: "" },
];

const focus = [
  "Web Development",
  "Agentic AI",
  "Automation",
  "E-commerce",
  "Lead Capture",
];

export function About() {
  return (
    <section id="about" className="relative py-28 sm:py-36">
      {/* subtle dotted backdrop, faded toward edges */}
      <div className="pointer-events-none absolute inset-0 bg-dots mask-radial opacity-40" />

      <div className="container relative">
        <SectionHeading
          eyebrow="01 · About"
          title="More than a website, a system that grows your business"
          description="I build the websites, AI agents, and automations that help business owners get found, earn trust, and turn visitors into paying customers."
          className="max-w-3xl"
        />

        <div className="mt-16 grid items-start gap-6 lg:grid-cols-12">
          {/* Narrative */}
          <Reveal direction="up" className="lg:col-span-7">
            <div className="glass relative h-full overflow-hidden rounded-3xl p-7 sm:p-9">
              <p className="text-lg leading-relaxed text-foreground/90">
                <TextReveal text="I'm Stephen. I help business owners build a real online presence and turn it into revenue." />
              </p>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                A great{" "}
                <span className="text-foreground">website</span> opens the
                door, it&apos;s how customers find you and decide to trust you.
                From there, a custom{" "}
                <span className="text-foreground">AI agent</span> and{" "}
                <span className="text-foreground">automation</span> compound its
                value: capturing leads, booking clients, and running the
                busywork while you sleep.
              </p>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                Recently I built{" "}
                <span className="text-foreground">
                  Toyota Nigeria&apos;s Pre-Owned Cars
                </span>{" "}
                marketplace end-to-end, 2,000+ inspected vehicles with search,
                inspection badges, warranty, and verified history, serving
                customers right across Nigeria.
              </p>

              {/* Focus pills */}
              <div className="mt-7 flex flex-wrap gap-2">
                {focus.map((item, i) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    className="rounded-full border border-foreground/10 bg-foreground/[0.04] px-3 py-1.5 text-xs font-medium text-foreground/80 transition-colors hover:border-primary/40 hover:text-foreground"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>

              <div className="pointer-events-none absolute -bottom-16 -left-10 h-48 w-48 rounded-full bg-secondary/15 blur-3xl" />
            </div>
          </Reveal>

          {/* Code-style 3D tilt card */}
          <Reveal direction="left" delay={0.1} className="lg:col-span-5">
            <TiltCard className="group" intensity={8}>
              <div className="glass-strong relative overflow-hidden rounded-3xl p-1 shadow-glow-sm">
                <div className="rounded-[1.4rem] bg-background/70 p-5 font-mono text-sm">
                  <div className="mb-4 flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-red-400/80" />
                    <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
                    <span className="h-3 w-3 rounded-full bg-green-400/80" />
                    <span className="ml-3 text-xs text-muted-foreground">
                      studio.ts
                    </span>
                  </div>
                  <pre
                    className="leading-relaxed"
                    style={{ transform: "translateZ(40px)" }}
                  >
                    {codeLines.map((line, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                      >
                        <span className="text-blue-400">{line.t}</span>
                        <span className="text-sky-300">{line.n}</span>
                        <span className="text-muted-foreground">{line.o}</span>
                        <span className="text-emerald-300">{line.c}</span>
                      </motion.div>
                    ))}
                  </pre>

                  {/* live status row */}
                  <div className="mt-5 flex items-center gap-2 border-t border-foreground/10 pt-4 text-xs">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                    </span>
                    <span className="text-muted-foreground">
                      Available for new projects, from{" "}
                      <span className="text-foreground">Nigeria, worldwide</span>
                    </span>
                  </div>
                </div>
                <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl transition-opacity duration-500 group-hover:opacity-80" />
              </div>
            </TiltCard>
          </Reveal>

          {/* Stats bento */}
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:col-span-12">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={cn(
                  "group glass relative overflow-hidden rounded-2xl p-5",
                  "transition-colors duration-300 hover:border-primary/30"
                )}
              >
                <div className="font-display text-4xl font-bold text-gradient-primary">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {stat.label}
                </div>
                <div className="pointer-events-none absolute inset-x-0 -bottom-px h-px scale-x-0 bg-gradient-to-r from-transparent via-primary/60 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
