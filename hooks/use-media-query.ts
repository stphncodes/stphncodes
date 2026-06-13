"use client";

import { useEffect, useState } from "react";

/**
 * Subscribe to a CSS media query and return whether it currently matches.
 * SSR-safe: returns `false` until mounted on the client.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = (event: MediaQueryListEvent) => setMatches(event.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}

/** Convenience hooks built on top of useMediaQuery. */
export const useIsDesktop = () => useMediaQuery("(min-width: 1024px)");
export const usePrefersReducedMotion = () =>
  useMediaQuery("(prefers-reduced-motion: reduce)");
