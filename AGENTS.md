# AGENTS.md

## Project

She Ships — landing page and registration hub for a 48-hour women's hackathon. Next.js 16 App Router, React 19, TypeScript 5, Tailwind CSS 4.

## Setup & Commands

```bash
npm install
npm run dev      # Dev server
npm run build    # Production build (use to verify changes)
npm run lint     # ESLint (core-web-vitals + TypeScript)
```

No test runner is configured. Use `npm run build` as the primary verification step — the build runs TypeScript type-checking.

## Project Structure

```
app/              Routes (App Router)
  page.tsx        Home — assembles section components
  badge/          3D interactive badge generator
  judge|mentor|speaker|sponsor/   Info pages
  api/            API routes
components/
  sections/       Page-level sections (hero, nav, faq, etc.)
  badge/          Badge feature (3D scene, form, particles)
  ui/             Reusable primitives (button, card, input, badge)
  decorative/     Layout wrappers and overlays
  shared/         Cross-cutting components
lib/
  utils.ts        cn() — clsx + tailwind-merge
  i18n/           Translations (en.ts is source of truth for types)
  badge/          Badge logic (particle config, physics sim, types)
public/           Static assets (OG images, fonts, 3D models)
```

## Code Conventions

- **Import alias:** `@/*` maps to project root (`import { cn } from "@/lib/utils"`)
- **Client components:** All section/shared components use `"use client"`
- **Styling:** Neobrutalism — no border-radius, 3-4px black borders, offset shadows. Use `.brutalist-*` utility classes from `globals.css`
- **Variants:** Use CVA (class-variance-authority) for component variants
- **Fonts:** Title font via `font-[family-name:var(--font-title)]`, body font set globally as Space Mono
- **i18n:** All user-facing text goes through `useTranslation()` hook. English (`en.ts`) is the type source; Spanish (`es.ts`) must match the same shape
- **Colors:** Use CSS variable-based Tailwind classes (`bg-primary-pink`, `text-secondary-purple`, etc.) defined in `globals.css`

## Key Patterns

- Wrap page sections in `<SectionWrapper variant="...">` for consistent spacing/theming
- UI buttons use CVA variants: `default`, `pink`, `purple`, `red`, `outline`, `ghost`
- Registration CTAs all link to `https://luma.com/ytl522gp`
- The badge feature uses Three.js (`@react-three/fiber`) with Rapier physics — `badge-scene.tsx` is the entry point, loaded via `next/dynamic` with `ssr: false`
- Particle physics simulation lives in `lib/badge/particle-sim.ts` as a pure function (no React/Three.js dependencies)

## Things to Watch

- Clerk auth is installed but disabled — provider is commented out in `layout.tsx`
- `globals.css` uses `@theme inline` to expose CSS variables to Tailwind 4
- Three.js components use `@ts-ignore` for meshline JSX elements — this is intentional
- The badge 3D scene is desktop-only (`hidden md:block`)

## Intent Layer

**Before modifying code in a subdirectory, read its AGENTS.md first** to understand local patterns and invariants.

- **Components**: `components/AGENTS.md` — UI sections, badge feature, shared primitives, decorative wrappers

### Global Invariants

- All user-facing text must go through `useTranslation()` — never hardcode strings
- Neobrutalism style must be consistent: no border-radius, black borders, offset shadows
- `en.ts` is the type source of truth for i18n — `es.ts` must match the same shape
- Registration CTAs always link to `https://luma.com/ytl522gp`
