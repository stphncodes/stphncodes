"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Initializes Lenis smooth scrolling and wires it into GSAP's ScrollTrigger,
 * so GSAP-driven scroll animations stay perfectly in sync with the smooth
 * scroll position. Respects `prefers-reduced-motion`.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    // Expose the instance so UI (e.g. the mobile menu) can lock/unlock scroll.
    // Cast through `unknown` because lenis globally augments `Window.lenis`
    // with its own debug shape, which doesn't overlap with the Lenis instance.
    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    // Drive Lenis from GSAP's ticker for a single, synchronized RAF loop.
    lenis.on("scroll", ScrollTrigger.update);

    const onRaf = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onRaf);
    gsap.ticker.lagSmoothing(0);

    // Allow anchor links + buttons to scroll smoothly via Lenis.
    const handleAnchorClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement)?.closest(
        'a[href^="#"], [data-scroll-to]'
      );
      if (!target) return;

      const hash =
        target.getAttribute("href") ?? `#${target.getAttribute("data-scroll-to")}`;
      if (!hash || hash === "#") return;

      const el = document.querySelector(hash);
      if (el) {
        event.preventDefault();
        lenis.scrollTo(el as HTMLElement, { offset: -80, duration: 1.3 });
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      gsap.ticker.remove(onRaf);
      lenis.destroy();
      delete (window as unknown as { lenis?: Lenis }).lenis;
    };
  }, []);

  return <>{children}</>;
}
