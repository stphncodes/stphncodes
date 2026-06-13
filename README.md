# STPHNCODES — Portfolio

A futuristic, cinematic, AI-engineer-themed portfolio for **Stephen** (`STPHNCODES`).
Built with a focus on premium feel, smooth motion, and production-grade code.

## ✨ Highlights

- **Next.js 15** (App Router) + **React 19** + **TypeScript** (strict)
- **Tailwind CSS** design system with a cinematic dark theme & glassmorphism
- **shadcn/ui** primitives (Button, Card, Badge — `new-york` style)
- **Lenis** smooth scrolling, synced with **GSAP ScrollTrigger**
- **Framer Motion** + **GSAP** for layered, performant animations
- Animated hero with a canvas **particle constellation** + glowing grid
- **Orbiting** tech-stack visualization
- Project cards with **parallax 3D tilt** + cursor glare
- Scroll-linked **experience timeline**
- **Terminal-style** contact form
- Custom glowing **cursor**, magnetic buttons, word-by-word text reveals
- SEO: metadata, Open Graph, JSON-LD, sitemap, robots, manifest
- Fully responsive + `prefers-reduced-motion` aware

## 🚀 Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build       # production build
npm run start       # serve the production build
npm run lint        # eslint
npm run type-check  # tsc --noEmit
```

## 🗂 Project structure

```
app/                  # App Router: layout, page, SEO routes (sitemap/robots/manifest)
  globals.css         # design tokens + Tailwind layers + utilities
components/
  animations/         # Reveal, TextReveal, Magnetic, TiltCard
  background/         # Aurora blobs, canvas ParticleField
  providers/          # SmoothScroll (Lenis + GSAP)
  sections/           # Hero, About, TechStack, Projects, Experience, Contact, Footer
  ui/                 # shadcn primitives (button, card, badge)
  cursor.tsx          # custom cursor follower
  navbar.tsx          # floating glass nav
  section-heading.tsx # shared section header
hooks/                # useMediaQuery, useMousePosition, useActiveSection
lib/                  # site config, dummy data, utils (cn)
```

## ✏️ Customizing

- **Brand / SEO / socials** → `lib/site.ts`
- **Projects, tech stack, experience, stats** → `lib/data.ts`
- **Colors / radius / fonts** → CSS variables in `app/globals.css` + `tailwind.config.ts`
- **Contact submission** → wire the `handleSubmit` block in
  `components/sections/contact.tsx` to your API or form service.

## ⚡ Performance & a11y

- Canvas DPR is capped at 2× and the loop pauses on `visibilitychange`.
- All motion is disabled under `prefers-reduced-motion: reduce`.
- Fonts are loaded with `next/font` (`display: swap`, self-hosted).
- `optimizePackageImports` is enabled for `framer-motion` and `lucide-react`.

---

Built with Next.js, Framer Motion & GSAP.
