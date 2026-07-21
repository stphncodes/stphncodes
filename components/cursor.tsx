"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

import { useIsDesktop } from "@/hooks/use-media-query";

/**
 * A subtle glowing cursor follower for pointer devices. A small precise dot
 * tracks instantly; a larger soft ring trails with a spring and grows when
 * hovering interactive elements. Hidden on touch / small screens.
 */
export function Cursor() {
  const isDesktop = useIsDesktop();
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const ringX = useSpring(x, { stiffness: 220, damping: 26, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 220, damping: 26, mass: 0.6 });

  useEffect(() => {
    if (!isDesktop) return;

    // Position update is hot (fires per pixel) — keep it to just the motion
    // values. React bails out of the setVisible(true) re-render once visible.
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };

    // Hover detection only needs to run when the pointer crosses into a new
    // element, not on every pixel — mouseover fires on boundary changes.
    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setHovering(
        Boolean(target.closest('a, button, [data-cursor="hover"], input, textarea'))
      );
    };

    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.removeEventListener("mouseleave", leave);
    };
  }, [isDesktop, x, y]);

  if (!isDesktop) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary lg:block"
        style={{ x, y, opacity: visible ? 1 : 0 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/50 lg:block"
        style={{
          x: ringX,
          y: ringY,
          opacity: visible ? 1 : 0,
        }}
        animate={{
          width: hovering ? 56 : 30,
          height: hovering ? 56 : 30,
          backgroundColor: hovering
            ? "hsl(263 90% 65% / 0.12)"
            : "hsl(263 90% 65% / 0)",
        }}
        transition={{ type: "spring", stiffness: 250, damping: 25 }}
      />
    </>
  );
}
