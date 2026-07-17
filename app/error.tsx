"use client";

import { useEffect } from "react";
import { RotateCcw, TriangleAlert } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Hook this up to your error reporting service (Sentry, etc.).
    console.error(error);
  }, [error]);

  return (
    <main className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div className="absolute inset-0 bg-grid mask-radial opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/40 to-background" />

      <div className="relative z-10 flex flex-col items-center">
        <span className="glass mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-xs text-red-300">
          <TriangleAlert className="size-3.5" />
          runtime exception
        </span>

        <h1 className="font-display text-4xl font-semibold tracking-tight text-gradient sm:text-5xl">
          Something broke in the matrix
        </h1>

        <p className="mt-4 max-w-md text-balance text-muted-foreground">
          An unexpected error interrupted the render. You can try again. If it
          persists, the issue is on my end.
        </p>

        {error.digest && (
          <code className="mt-4 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-muted-foreground">
            ref: {error.digest}
          </code>
        )}

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button size="lg" onClick={reset}>
            <RotateCcw className="size-4" />
            Try again
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="/">Go home</a>
          </Button>
        </div>
      </div>
    </main>
  );
}
