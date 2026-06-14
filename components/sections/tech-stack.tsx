"use client";

import { motion } from "framer-motion";

import { techStack, type TechItem } from "@/lib/data";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/animations/reveal";

// Ordered category groups → rendered as labeled bento panels.
const GROUPS: { key: TechItem["category"]; label: string; accent: string }[] = [
  { key: "language", label: "Languages", accent: "#0ea5e9" },
  { key: "framework", label: "Frameworks", accent: "#22d3ee" },
  { key: "ai", label: "Agentic AI", accent: "#a855f7" },
  { key: "platform", label: "Platforms", accent: "#fb923c" },
];

function TechCard({ item, index }: { item: TechItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.21, 0.47, 0.32, 0.98] }}
      whileHover={{ y: -4 }}
      className="group/card relative flex items-center gap-3 overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 backdrop-blur-sm transition-colors duration-300 hover:border-white/20"
      style={{ ["--accent" as string]: item.color }}
    >
      {/* Accent glow that blooms on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
        style={{
          background: `radial-gradient(120px 80px at 0% 50%, ${item.color}22, transparent 70%)`,
        }}
      />

      {/* Status dot with its own glow */}
      <span className="relative flex h-2.5 w-2.5 shrink-0">
        <span
          className="absolute inline-flex h-full w-full rounded-full opacity-60 blur-[3px] transition-opacity duration-300 group-hover/card:opacity-100"
          style={{ backgroundColor: item.color }}
        />
        <span
          className="relative inline-flex h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: item.color }}
        />
      </span>

      <span className="relative text-sm font-medium text-foreground/90 transition-colors duration-300 group-hover/card:text-foreground">
        {item.name}
      </span>

      {/* Left accent bar slides in on hover */}
      <span
        aria-hidden
        className="absolute left-0 top-1/2 h-0 w-[3px] -translate-y-1/2 rounded-full transition-all duration-300 group-hover/card:h-2/3"
        style={{ backgroundColor: item.color }}
      />
    </motion.div>
  );
}

function GroupPanel({
  label,
  accent,
  items,
}: {
  label: string;
  accent: string;
  items: TechItem[];
}) {
  return (
    <div className="group/panel relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-md sm:p-6">
      {/* Panel ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-30 blur-3xl transition-opacity duration-500 group-hover/panel:opacity-60"
        style={{ backgroundColor: accent }}
      />

      <div className="relative mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: accent }}
          />
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground/80">
            {label}
          </h3>
        </div>
        <span className="font-mono text-[11px] text-muted-foreground">
          {String(items.length).padStart(2, "0")}
        </span>
      </div>

      <div className="relative grid grid-cols-2 gap-2.5">
        {items.map((item, i) => (
          <TechCard key={item.name} item={item} index={i} />
        ))}
      </div>
    </div>
  );
}

export function TechStack() {
  const groups = GROUPS.map((g) => ({
    ...g,
    items: techStack.filter((t) => t.category === g.key),
  })).filter((g) => g.items.length > 0);

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

        <Reveal direction="up" className="mt-16">
          <div className="grid gap-5 sm:grid-cols-2">
            {groups.map((g) => (
              <GroupPanel
                key={g.key}
                label={g.label}
                accent={g.accent}
                items={g.items}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
