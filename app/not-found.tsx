import Link from "next/link";
import { Home, TerminalSquare } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Aurora } from "@/components/background/aurora";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      <Aurora />
      <div className="absolute inset-0 bg-grid mask-radial opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/40 to-background" />

      <div className="relative z-10 flex flex-col items-center">
        <span className="glass mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-xs text-muted-foreground">
          <TerminalSquare className="size-3.5 text-primary" />
          error · route not found
        </span>

        <h1 className="font-display text-[clamp(5rem,22vw,14rem)] font-bold leading-none tracking-tighter text-gradient-primary">
          404
        </h1>

        <p className="mt-4 max-w-md font-mono text-sm text-muted-foreground">
          <span className="text-emerald-300">$</span> cd{" "}
          <span className="text-foreground">{"<the-page-you-wanted>"}</span>
          <br />
          <span className="text-red-400">
            bash: no such file or directory
          </span>
        </p>

        <p className="mt-6 max-w-md text-balance text-muted-foreground">
          This path drifted off into deep space. Let&apos;s get you back to
          known coordinates.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/">
              <Home className="size-4" />
              Return home
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/#contact">Report the glitch</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
