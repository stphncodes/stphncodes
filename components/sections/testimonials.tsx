"use client";

import { Quote } from "lucide-react";

import { testimonials, type Testimonial } from "@/lib/data";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/animations/reveal";

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="glass group relative flex h-full flex-col rounded-2xl p-6 transition-colors duration-300 hover:border-white/20">
      <Quote className="size-7 text-primary/40" />

      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/80">
        “{testimonial.quote}”
      </blockquote>

      <figcaption className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
        {/* Avatar placeholder — swap for a real photo when available */}
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] font-mono text-sm text-muted-foreground">
          {testimonial.initials}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">
            {testimonial.name}
          </p>
          <p className="truncate text-xs text-muted-foreground">
            {testimonial.role}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  return (
    <section id="testimonials" className="relative py-28 sm:py-36">
      <div className="container">
        <SectionHeading
          eyebrow="07 — Testimonials"
          title="What clients say"
          description="A snapshot of the kind of results clients see. The layout below is ready to swap in genuine feedback."
          className="max-w-2xl"
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <Reveal key={i} direction="up" delay={i * 0.08} className="h-full">
              <TestimonialCard testimonial={testimonial} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
