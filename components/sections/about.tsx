"use client";

import { motion } from "framer-motion";

import { stats } from "@/lib/data";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/animations/reveal";
import { TextReveal } from "@/components/animations/text-reveal";

const codeLines = [
  { t: "const", n: " engineer ", o: "= {", c: "" },
  { t: "  focus:", n: "", o: " ", c: '"AI · cloud · scale",' },
  { t: "  loves:", n: "", o: " ", c: '"clean systems",' },
  { t: "  ships:", n: "", o: " ", c: "true," },
  { t: "}", n: "", o: "", c: "" },
];

export function About() {
  return (
    <section id="about" className="relative py-28 sm:py-36">
      <div className="container">
        <SectionHeading
          eyebrow="01 — About"
          title="Engineer at the edge of AI and the web"
          description="I build products where machine intelligence meets real users — obsessing over latency, reliability, and interfaces that feel alive."
          className="max-w-3xl"
        />

        <div className="mt-16 grid items-start gap-10 lg:grid-cols-[1.2fr_1fr]">
          {/* Narrative */}
          <Reveal direction="up" className="space-y-6">
            <p className="text-lg leading-relaxed text-foreground/90">
              <TextReveal text="I'm Stephen — a software engineer who turns ambitious ideas into production systems that scale." />
            </p>
            <p className="leading-relaxed text-muted-foreground">
              My work lives at the intersection of{" "}
              <span className="text-foreground">AI engineering</span>,{" "}
              <span className="text-foreground">cloud infrastructure</span>, and{" "}
              <span className="text-foreground">developer experience</span>. I care
              about the whole stack: from inference pipelines and vector search down
              to the pixels and micro-interactions users actually feel.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              When I&apos;m not shipping, I&apos;m exploring DevOps automation,
              distributed systems, and the next wave of agentic tooling — always
              chasing the line between fast and elegant.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 pt-4 sm:grid-cols-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="glass rounded-2xl p-4"
                >
                  <div className="font-display text-3xl font-bold text-gradient-primary">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </Reveal>

          {/* Code-style card */}
          <Reveal direction="left" delay={0.1}>
            <div className="glass-strong group relative overflow-hidden rounded-2xl p-1 shadow-glow-sm">
              <div className="rounded-xl bg-background/60 p-5 font-mono text-sm">
                <div className="mb-4 flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-red-400/80" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
                  <span className="h-3 w-3 rounded-full bg-green-400/80" />
                  <span className="ml-3 text-xs text-muted-foreground">
                    engineer.ts
                  </span>
                </div>
                <pre className="leading-relaxed">
                  {codeLines.map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                    >
                      <span className="text-violet-400">{line.t}</span>
                      <span className="text-sky-300">{line.n}</span>
                      <span className="text-muted-foreground">{line.o}</span>
                      <span className="text-emerald-300">{line.c}</span>
                    </motion.div>
                  ))}
                </pre>
              </div>
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl transition-opacity duration-500 group-hover:opacity-80" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
