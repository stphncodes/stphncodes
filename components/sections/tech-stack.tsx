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
  SiReactquery,
  SiClaude,
  SiLangchain,
  SiLanggraph,
  SiOpenai,
  SiN8N,
  SiZapier,
  SiMake,
  SiSupabase,
  SiPostgresql,
  SiVercel,
} from "react-icons/si";

import { techStack } from "@/lib/data";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/animations/reveal";

// Real brand logo + official brand color per tech. Dark-on-black brands
// (Next.js, LangChain, OpenAI…) are mapped to white so they read on the dark UI.
const ICONS: Record<string, { Icon: IconType; brand: string }> = {
  TypeScript: { Icon: SiTypescript, brand: "#3178C6" },
  JavaScript: { Icon: SiJavascript, brand: "#F7DF1E" },
  Python: { Icon: SiPython, brand: "#3776AB" },
  React: { Icon: SiReact, brand: "#61DAFB" },
  "Next.js": { Icon: SiNextdotjs, brand: "#ffffff" },
  "Node.js": { Icon: SiNodedotjs, brand: "#5FA04E" },
  TanStack: { Icon: SiReactquery, brand: "#FF4154" },
  Vite: { Icon: SiVite, brand: "#646CFF" },
  Claude: { Icon: SiClaude, brand: "#D97757" },
  OpenAI: { Icon: SiOpenai, brand: "#ffffff" },
  LangChain: { Icon: SiLangchain, brand: "#ffffff" },
  LangGraph: { Icon: SiLanggraph, brand: "#f97316" },
  n8n: { Icon: SiN8N, brand: "#EA4B71" },
  Zapier: { Icon: SiZapier, brand: "#FF4F00" },
  Make: { Icon: SiMake, brand: "#8B5CF6" },
  Supabase: { Icon: SiSupabase, brand: "#3ECF8E" },
  PostgreSQL: { Icon: SiPostgresql, brand: "#4169E1" },
  Vercel: { Icon: SiVercel, brand: "#ffffff" },
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
      className="group/logo relative flex aspect-square flex-col items-center justify-center gap-3 rounded-2xl border border-foreground/[0.08] bg-foreground/[0.02] backdrop-blur-sm transition-colors duration-300 hover:border-foreground/20"
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
          title="A modern web, AI & automation stack"
          description="The in-demand tools I build with, from Claude-powered AI agents and n8n automations to the web frameworks behind fast, reliable products that scale."
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
