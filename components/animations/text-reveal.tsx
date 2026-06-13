"use client";

import { motion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
  /** Stagger between words, in seconds. */
  stagger?: number;
  delay?: number;
  once?: boolean;
}

const container = (stagger: number, delay: number): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

const word: Variants = {
  hidden: { opacity: 0, y: "0.6em", rotateX: 40 },
  visible: {
    opacity: 1,
    y: "0em",
    rotateX: 0,
    transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

/**
 * Word-by-word kinetic text reveal. Each word animates up + un-rotates on a
 * staggered timeline as the block scrolls into view.
 */
export function TextReveal({
  text,
  className,
  stagger = 0.06,
  delay = 0,
  once = true,
}: TextRevealProps) {
  const words = text.split(" ");

  return (
    <motion.span
      className={cn("inline-block", className)}
      style={{ perspective: 800 }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-60px" }}
      variants={container(stagger, delay)}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className="inline-block overflow-hidden pb-[0.1em]">
          <motion.span className="inline-block" variants={word} aria-hidden>
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
