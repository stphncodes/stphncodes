"use client";

import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiNextdotjs,
  SiReact,
  SiVite,
  SiNodedotjs,
  SiFastapi,
  SiLangchain,
  SiLanggraph,
  SiOpenai,
  SiN8N,
  SiPostgresql,
  SiRedis,
  SiGraphql,
} from "react-icons/si";

import { techStack } from "@/lib/data";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/animations/reveal";

// Real brand logo + official brand color per tech. Dark-on-black brands
// (Next.js, LangChain, OpenAI…) are mapped to white so they read on the dark UI.
const ICONS: Record<string, { Icon: IconType; brand: string }> = {
  Python: { Icon: SiPython, brand: "#3776AB" },
  JavaScript: { Icon: SiJavascript, brand: "#F7DF1E" },
  TypeScript: { Icon: SiTypescript, brand: "#3178C6" },
  "Next.js": { Icon: SiNextdotjs, brand: "#ffffff" },
  React: { Icon: SiReact, brand: "#61DAFB" },
  Vite: { Icon: SiVite, brand: "#646CFF" },
  "Node.js": { Icon: SiNodedotjs, brand: "#5FA04E" },
  FastAPI: { Icon: SiFastapi, brand: "#009688" },
  LangChain: { Icon: SiLangchain, brand: "#ffffff" },
  LangGraph: { Icon: SiLanggraph, brand: "#ffffff" },
  OpenAI: { Icon: SiOpenai, brand: "#ffffff" },
  n8n: { Icon: SiN8N, brand: "#EA4B71" },
  PostgreSQL: { Icon: SiPostgresql, brand: "#4169E1" },
  Redis: { Icon: SiRedis, brand: "#FF4438" },
  GraphQL: { Icon: SiGraphql, brand: "#E10098" },
};

function TechLogo({ name, index }: { name: string; index: number }) {
  const entry = ICONS[name];
  if (!entry) return null;
  const { Icon, brand } = entry;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.035, ease: [0.21, 0.47, 0.32, 0.98] }}
      whileHover={{ y: -4 }}
      className="group/logo relative flex aspect-square flex-col items-center justify-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm transition-colors duration-300 hover:border-white/20"
      style={{ ["--brand" as string]: brand }}
    >
      {/* Brand glow that blooms on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover/logo:opacity-100"
        style={{ boxShadow: `inset 0 0 40px -16px ${brand}, 0 0 32px -10px ${brand}` }}
      />

      {/* Grayscale by default → brand color on hover */}
      <Icon className="h-9 w-9 text-foreground/35 transition-colors duration-300 group-hover/logo:[color:var(--brand)] sm:h-10 sm:w-10" />

      <span className="text-xs font-medium text-muted-foreground transition-colors duration-300 group-hover/logo:text-foreground">
        {name}
      </span>
    </motion.div>
  );
}

export function TechStack() {
  return (
    <section id="stack" className="relative py-28 sm:py-36">
      <div className="container">
        <SectionHeading
          eyebrow="02 · Stack"
          title="A toolkit built for scale"
          description="Languages, frameworks, and platforms I reach for to ship reliable, intelligent products end-to-end."
          align="center"
          className="mx-auto"
        />

        <Reveal direction="up" className="mt-16">
          <div className="mx-auto grid max-w-4xl grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4 md:grid-cols-5">
            {techStack.map((item, i) => (
              <TechLogo key={item.name} name={item.name} index={i} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
