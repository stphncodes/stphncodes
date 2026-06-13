"use client";

import { useEffect, useState } from "react";

export interface MousePosition {
  x: number;
  y: number;
}

/**
 * Track the global mouse position (viewport coordinates).
 * Passive listener; cleans up on unmount.
 */
export function useMousePosition(): MousePosition {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handle = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", handle, { passive: true });
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  return position;
}
