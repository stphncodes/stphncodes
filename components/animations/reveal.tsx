"use client";

import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right" | "none";

const offset: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 32 },
  down: { x: 0, y: -32 },
  left: { x: 32, y: 0 },
  right: { x: -32, y: 0 },
  none: { x: 0, y: 0 },
};

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Direction the content travels from. */
  direction?: Direction;
  /** Delay in seconds. */
  delay?: number;
  /** Duration in seconds. */
  duration?: number;
  /** Render as a different element if needed. */
  as?: "div" | "section" | "li" | "span";
  once?: boolean;
}

/**
 * Scroll-triggered reveal. Fades + slides content into view the first time it
 * enters the viewport. Built on Framer Motion's `whileInView`.
 */
export function Reveal({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.7,
  as = "div",
  once = true,
}: RevealProps) {
  const MotionTag = motion[as];
  const { x, y } = offset[direction];

  const variants: Variants = {
    hidden: { opacity: 0, x, y, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  };

  return (
    <MotionTag
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px" }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}
