"use client";

import { ArrowUpRight } from "lucide-react";

import { projects, type Project } from "@/lib/data";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/animations/reveal";
import { TiltCard } from "@/components/animations/tilt-card";
import { Badge } from "@/components/ui/badge";

function ProjectCard({ project }: { project: Project }) {
  return (
    <TiltCard className="group h-full" intensity={8}>
      <a
        href={project.href}
        className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-card/60 p-6 backdrop-blur-xl transition-colors duration-300 hover:border-white/20"
      >
        {/* Signature gradient glow */}
        <div
          className={cn(
            "pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100",
            project.gradient
          )}
        />

        <div
          className="relative flex h-full flex-col"
          style={{ transform: "translateZ(40px)" }}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-2">
              <Badge variant="muted">{project.category}</Badge>
              <span className="font-mono text-xs text-muted-foreground">
                {project.year}
              </span>
            </div>
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-muted-foreground transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
            </span>
          </div>

          <h3 className="mt-6 font-display text-3xl font-semibold tracking-tight">
            {project.title}
          </h3>

          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-foreground/70"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </a>
    </TiltCard>
  );
}

export function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="work" className="relative py-28 sm:py-36">
      <div className="container">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="03 — Work"
            title="Selected projects"
            description="A few systems I've designed and shipped — spanning AI platforms, developer tooling, and realtime systems."
            className="max-w-2xl"
          />
        </div>

        {/* Featured row */}
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {featured.map((project, i) => (
            <Reveal key={project.id} direction="up" delay={i * 0.08}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        {/* Secondary row */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {rest.map((project, i) => (
            <Reveal key={project.id} direction="up" delay={i * 0.08}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
