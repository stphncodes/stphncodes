export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background"
    >
      <div className="absolute inset-0 bg-grid mask-radial opacity-40" />

      <div className="relative flex flex-col items-center gap-8">
        {/* Orbit loader */}
        <div className="relative flex h-28 w-28 items-center justify-center">
          <div className="absolute inset-0 animate-pulse-glow rounded-full bg-primary/20 blur-2xl" />
          {/* Rotating rings */}
          <div className="absolute inset-0 animate-spin rounded-full border border-transparent border-t-primary [animation-duration:1.4s]" />
          <div className="absolute inset-2 animate-spin rounded-full border border-transparent border-b-secondary [animation-duration:2s] [animation-direction:reverse]" />
          {/* Core */}
          <div className="glass-strong relative flex h-16 w-16 items-center justify-center rounded-full">
            {/* eslint-disable-next-line @next/next/no-img-element -- loading.tsx renders before the app shell; keep it dependency-free */}
            <img
              src="/brand/mark.png"
              alt=""
              width={32}
              height={32}
              className="h-8 w-8 animate-pulse-glow object-contain"
            />
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <span className="font-display text-sm font-semibold tracking-[0.4em] text-gradient">
            STPHNCODES
          </span>
          {/* Progress shimmer bar */}
          <div className="relative h-0.5 w-40 overflow-hidden rounded-full bg-foreground/10">
            <div className="loader-sweep absolute inset-y-0 w-1/3 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            initializing interface
          </span>
        </div>
      </div>

      <span className="sr-only">Loading…</span>
    </div>
  );
}
