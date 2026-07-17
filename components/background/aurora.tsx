"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

/**
 * Ambient animated aurora — large, slow-drifting blurred color blobs that give
 * the dark background depth. Purely decorative.
 */
export function Aurora({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      <motion.div
        className="glow-blob absolute -left-24 top-[-10%] h-[42rem] w-[42rem] rounded-full bg-primary/25"
        animate={{ x: [0, 60, -20, 0], y: [0, 40, -30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="glow-blob absolute right-[-10%] top-1/4 h-[36rem] w-[36rem] rounded-full bg-secondary/20"
        animate={{ x: [0, -50, 30, 0], y: [0, 60, 10, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="glow-blob absolute bottom-[-15%] left-1/3 h-[34rem] w-[34rem] rounded-full bg-blue-500/15"
        animate={{ x: [0, 40, -40, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
