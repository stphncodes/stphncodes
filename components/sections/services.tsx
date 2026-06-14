"use client";

import { Bot, Check, Globe, Layers } from "lucide-react";

import { services, type Service } from "@/lib/data";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/animations/reveal";
import { TiltCard } from "@/components/animations/tilt-card";
import { Badge } from "@/components/ui/badge";

const iconMap = {
  globe: Globe,
  bot: Bot,
  layers: Layers,
} as const;

function ServiceCard({ service }: { service: Service }) {
  const Icon = iconMap[service.icon];
  return (
    <TiltCard className="group h-full" intensity={8}>
      <div
        className={cn(
          "relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card/60 p-7 backdrop-blur-xl transition-colors duration-300",
          service.featured
            ? "border-primary/30 hover:border-primary/50"
            : "border-white/10 hover:border-white/20"
        )}
      >
        {/* Signature gradient glow */}
        <div
          className={cn(
            "pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100",
            service.gradient
          )}
        />

        <div
          className="relative flex h-full flex-col"
          style={{ transform: "translateZ(40px)" }}
        >
          <div className="flex items-start justify-between gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-primary transition-colors duration-300 group-hover:border-primary/40">
              <Icon className="size-5" />
            </span>
            {service.featured && <Badge>Best value</Badge>}
          </div>

          <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight">
            {service.title}
          </h3>

          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
            {service.tagline}
          </p>

          <div className="mt-6 border-t border-white/10 pt-5">
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground/70">
              Includes
            </span>
            <ul className="mt-3 space-y-2">
              {service.includes.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2.5 text-sm text-foreground/80"
                >
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Check className="size-3" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}

export function Services() {
  return (
    <section id="offer" className="relative py-28 sm:py-36">
      <div className="container">
        <SectionHeading
          eyebrow="05 — What I offer"
          title="Services built to ship"
          description="From a polished website to a custom AI agent — pick a lane, or take the full package and let the two work together."
          className="max-w-2xl"
        />

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.title} direction="up" delay={i * 0.08}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
