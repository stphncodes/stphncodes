"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Small mono label, e.g. "01 · About". */
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
}

/**
 * Consistent section header: a monospace eyebrow chip, a large display title,
 * and an optional description. Animates in on scroll.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className
      )}
    >
      <motion.span
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-primary"
      >
        <span className="h-px w-8 bg-primary/60" />
        {eyebrow}
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className="font-display text-4xl font-semibold tracking-tight text-gradient sm:text-5xl"
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className={cn(
            "max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
