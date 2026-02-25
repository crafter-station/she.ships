# Components

UI layer for the She Ships landing page. All components are client-side (`"use client"`).

## Structure

```
sections/       Landing page sections — composed into app/page.tsx
badge/          3D interactive badge generator (Three.js + Rapier physics)
ui/             Reusable primitives (button, card, input, badge, encrypted-text)
decorative/     Layout wrappers (SectionWrapper) and overlays (GridOverlay)
shared/         Cross-cutting: GitHubBadge, LanguageSwitcher
logos/          SVG logo components (CrafterStation, MoralejaDesign)
providers/      Context providers (Clerk — disabled, Lenis smooth scroll)
```

## Key Components

### `sections/` — Page Sections
Each section is self-contained. Home page renders them in order: Nav → Hero → Countdown → WhatIsSheShips → Agenda → Categories → FAQ → Organizers → Footer.

- `hero.tsx` (388 lines) — Most complex section. Pink manifesto + event card + animated "Build Ship Win" text
- `nav.tsx` (187 lines) — Fixed nav with logo, links, GitHub badge, language switcher, CTAs
- Sub-pages (`/judge`, `/mentor`, `/speaker`, `/sponsor`) render their own Nav + Footer

### `badge/` — 3D Badge Feature (~1620 lines)
Interactive badge generator using Three.js (`@react-three/fiber`) + Rapier physics.

- `badge-scene.tsx` — Entry point, loaded via `next/dynamic` with `ssr: false`
- `band.tsx` (273 lines) — Lanyard physics simulation using meshline
- `badge-particles.tsx` (328 lines) — Particle rendering in 3D space
- `particle-panel.tsx` (659 lines) — UI panel with presets and AI prompt input
- Physics simulation lives in `lib/badge/particle-sim.ts` (pure function, no React/Three.js)

### `ui/` — Primitives
- `button.tsx` — CVA variants: `default`, `pink`, `purple`, `red`, `outline`, `ghost`. Supports `asChild` via Radix Slot
- `card.tsx` — Compound component: Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter
- `encrypted-text.tsx` — Animated text reveal effect

## Patterns

**Adding a new landing page section:**
1. Create component in `sections/` with `"use client"` directive
2. Use `<SectionWrapper variant="...">` for consistent spacing and theming
3. Get text from `useTranslation()` — add keys to `lib/i18n/en.ts` first, then `es.ts`
4. Import and place in `app/page.tsx` in the desired order

**Adding a new UI primitive:**
1. Create in `ui/` using CVA for variants
2. Apply `.brutalist-*` utility classes from `globals.css`
3. Support `asChild` via Radix Slot if the component needs polymorphism

## Contracts

- Section components must use `<SectionWrapper>` — never roll custom padding/max-width
- All buttons use CVA variants from `button.tsx` — don't create one-off button styles
- Badge/Three.js code must handle SSR: always use `next/dynamic` with `ssr: false`
- `@ts-ignore` on meshline JSX elements is intentional — don't remove

## Anti-patterns

- Don't import Three.js code from non-badge components
- Don't hardcode user-facing text — use `useTranslation()`
- Don't add `border-radius` — the brutalist style enforces `0` globally
