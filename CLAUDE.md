# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

STPHNCODES — a single-page, cinematic portfolio site for Stephen (AI-focused Software Engineer). Next.js 15 (App Router) + React 19 + TypeScript (strict), styled with Tailwind and animated heavily with Framer Motion + GSAP.

## Commands

```bash
npm run dev         # dev server at http://localhost:3000
npm run build       # production build
npm run start       # serve production build
npm run type-check  # tsc --noEmit — use this as the main correctness gate
npm run lint        # next lint
```

There is **no test suite**. `npm run type-check` is the primary verification step before considering a change done.

Linting note: ESLint is intentionally decoupled from install (registry version conflict on `@typescript-eslint/scope-manager@8.61.0`) and `eslint.ignoreDuringBuilds` is `true` in `next.config.mjs`. `npm run lint` may fail until eslint + `eslint-config-next` are re-added with pinned versions. Don't treat a lint failure as a code regression without checking this first.

## Architecture

**Single page, composed of sections.** `app/page.tsx` renders `Navbar` + a `<main>` of ordered sections (`Hero → About → TechStack → Projects → Experience → Contact`) + `Footer`. There are no routes beyond the home page; the other files in `app/` are SEO/metadata route handlers (`sitemap.ts`, `robots.ts`, `manifest.ts`) and the standard `error.tsx` / `loading.tsx` / `not-found.tsx`.

**Server vs client.** RSC is the default (`components.json` `rsc: true`). Any component using motion, hooks, browser APIs, or canvas is marked `"use client"`. `app/layout.tsx` stays a server component and injects fonts, full SEO metadata, JSON-LD Person schema, and the global `<Cursor />` + `<SmoothScroll>` wrapper.

**Smooth scroll is global and singleton.** `components/providers/smooth-scroll.tsx` wraps the whole app. It creates one Lenis instance, drives it from GSAP's ticker (single synchronized RAF loop), wires Lenis into `ScrollTrigger.update`, and intercepts clicks on `a[href^="#"]` / `[data-scroll-to]` for smooth anchor scrolling (with `-80px` offset for the fixed navbar). The Lenis instance is exposed on `window.lenis` so other UI (e.g. mobile menu) can lock/unlock scroll. **All scroll-linked GSAP animations depend on this being mounted.**

**`prefers-reduced-motion` is a hard gate.** SmoothScroll early-returns (no Lenis, no GSAP) when reduced motion is set, and individual animations check it too. When adding motion, always provide a reduced-motion fallback — don't assume Lenis/ScrollTrigger are running.

**Content is data-driven, currently dummy.** Everything editable lives in two files, separate from presentation:
- `lib/site.ts` — brand, `navLinks` (hash anchors), `socialLinks`, all SEO/metadata strings. Single source of truth consumed by `layout.tsx`, navbar, footer, and the SEO routes.
- `lib/data.ts` — `techStack`, `projects`, `experience`, `stats`, with typed interfaces. Marked "replace with real content / CMS fetch when ready." `TechItem.ring` drives the orbiting tech-stack layout; `Project.gradient` holds Tailwind gradient classes for card glow.

When changing site text/links/projects, edit these data files rather than hardcoding into components.

**Section ids ↔ nav anchors must stay in sync.** Nav highlighting uses `hooks/use-active-section.ts` (IntersectionObserver, `-45%` top/bottom rootMargin) against the section ids. The hashes in `navLinks` (`#about`, `#stack`, `#work`, `#journey`, `#contact`) must match the `id` attributes on the corresponding section elements.

**Reusable building blocks:**
- `components/animations/` — `Reveal` (scroll fade+slide via Framer `whileInView`), `TextReveal`, `Magnetic`, `TiltCard`. Prefer these over hand-rolling animation.
- `components/background/` — `Aurora` (gradient blobs), `ParticleField` (canvas; DPR capped at 2×, pauses on `visibilitychange`).
- `components/ui/` — shadcn `new-york` primitives (button/card/badge), zinc base, CSS variables.
- `hooks/` — `useMediaQuery`, `useMousePosition`, `useActiveSection`.

## Conventions

- Import alias `@/*` maps to repo root (e.g. `@/lib/utils`, `@/components/...`). Use it instead of relative paths.
- Use `cn()` from `lib/utils.ts` (clsx + tailwind-merge) for conditional classes.
- Design tokens are CSS variables in `app/globals.css`; colors/radius/fonts are wired through `tailwind.config.ts` (`hsl(var(--...))`). Custom keyframes/animations (`float`, `pulse-glow`, `marquee`, `shimmer`, `spin-slow`, `border-beam`) and `shadow-glow`/`shadow-glow-sm` live there — reuse them rather than adding inline animation.
- Fonts via `next/font/google` as CSS variables: `--font-sans` (Inter), `--font-display` (Space Grotesk), `--font-mono` (JetBrains Mono). The app is dark-mode-only (`<html className="dark">`).
- `next.config.mjs` strips `console.*` (except error/warn) in production and enables `optimizePackageImports` for `framer-motion` and `lucide-react`.
