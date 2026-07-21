"use client";

import { Check } from "lucide-react";

import { pricing, type PricingTier } from "@/lib/data";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/animations/reveal";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/animations/magnetic";

function PricingCard({ tier }: { tier: PricingTier }) {
  return (
    <div
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-2xl border p-7 backdrop-blur-xl transition-colors duration-300",
        tier.popular
          ? "border-primary/40 bg-card/80 shadow-glow-sm lg:-mt-4 lg:mb-4"
          : "border-white/10 bg-card/50 hover:border-white/20"
      )}
    >
      {tier.popular && (
        <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/20 via-secondary/10 to-transparent" />
      )}

      <div className="relative flex h-full flex-col">
        {tier.popular && (
          <span className="mb-4 inline-flex w-fit items-center rounded-full border border-primary/30 bg-primary/15 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-primary">
            Most Popular
          </span>
        )}
        <h3 className="font-display text-lg font-semibold tracking-tight">
          {tier.name}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">{tier.summary}</p>

        <div className="mt-6 flex flex-wrap items-end gap-x-2 gap-y-1">
          <span className="font-display text-4xl font-bold text-gradient-primary">
            {tier.price}
          </span>
          {tier.priceUsd && (
            <span className="pb-1 font-mono text-sm text-muted-foreground">
              {tier.priceUsd}
            </span>
          )}
        </div>

        <ul className="mt-6 flex-1 space-y-3 border-t border-white/10 pt-6">
          {tier.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2.5 text-sm text-foreground/80"
            >
              <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                <Check className="size-3" />
              </span>
              {feature}
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <Magnetic strength={0.4} className="block">
            <Button
              asChild
              variant={tier.popular ? "default" : "outline"}
              className="w-full"
            >
              <a href={tier.cta.href}>{tier.cta.label}</a>
            </Button>
          </Magnetic>
          {tier.note && (
            <p className="mt-3 text-center text-xs text-muted-foreground">
              {tier.note}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export function Pricing() {
  return (
    <section id="pricing" className="relative py-28 sm:py-36">
      {/* subtle dotted backdrop, faded toward edges */}
      <div className="pointer-events-none absolute inset-0 bg-dots mask-radial opacity-40" />

      <div className="container relative">
        <SectionHeading
          eyebrow="06 · Pricing"
          title="Pricing built around outcomes"
          description="Naira-first, with a USD equivalent for international clients. Clear scope, fixed starting points, no surprises. E-commerce, marketplaces, and standalone AI or automation are quoted to scope."
          align="center"
          className="mx-auto"
        />

        <div className="mx-auto mt-16 grid max-w-md gap-6 lg:max-w-5xl lg:grid-cols-3">
          {pricing.map((tier, i) => (
            <Reveal key={tier.name} direction="up" delay={i * 0.08} className="h-full">
              <PricingCard tier={tier} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
