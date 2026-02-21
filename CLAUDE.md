# She Ships — Project Reference

## Project Overview

**She Ships** is a landing page and registration hub for a 48-hour Global Hackathon for women and multidisciplinary creators, celebrating International Women's Day.

- **Event dates:** March 6-8, 2026
- **Format:** 100% remote, limited to 200 participants worldwide
- **Organizers:** Inspiratech + Crafter Station
- **Live URL:** `https://she-ships.crafter.run`
- **GitHub:** `crafter-station/she.ships`
- **Contact:** `hello@sheship.com`
- **Registration (all roles):** `https://luma.com/ytl522gp`

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.1.6 (App Router) |
| UI | React 19.2.3 + TypeScript 5 |
| Styling | Tailwind CSS 4 (via `@tailwindcss/postcss`) |
| UI Primitives | Radix UI (accordion, dialog, dropdown, select, slot) |
| Animations | Motion 12.30.0 (Framer Motion alternative) |
| Component Variants | Class Variance Authority (CVA) |
| Icons | Lucide React 0.563.0 |
| Auth (disabled) | Clerk (`@clerk/nextjs` 6.37.1 — installed, commented out) |
| Globe (unused) | COBE 0.6.5 |
| Fonts | Space Grotesk Variable (titles), Space Mono (body) |
| Utilities | clsx + tailwind-merge → `cn()` in `lib/utils.ts` |

### Scripts

```bash
npm run dev    # Start dev server
npm run build  # Production build
npm start      # Start production server
npm run lint   # ESLint
```

---

## Project Structure

```
she.ships/
├── app/
│   ├── layout.tsx                # Root layout — metadata, fonts, LanguageProvider
│   ├── page.tsx                  # Home page — assembles all sections
│   ├── globals.css               # CSS variables, Tailwind imports, brutalist utilities
│   ├── favicon.ico
│   ├── judge/page.tsx            # Judge registration info page
│   ├── mentor/page.tsx           # Mentor registration info page
│   ├── speaker/page.tsx          # Speaker registration info page
│   └── sponsor/page.tsx          # Sponsor tiers and info page
│
├── components/
│   ├── sections/                 # Page-level section components
│   │   ├── nav.tsx               # Fixed nav — logo, links, GitHub badge, language switcher, CTAs
│   │   ├── hero.tsx              # Hero — pink manifesto + event card + "Build Ship Win"
│   │   ├── countdown.tsx         # Live countdown to March 8 (days/hours/min/sec)
│   │   ├── what-is-sheships.tsx  # Dark section — decorative SS graphic + event description
│   │   ├── event-info.tsx        # 3-card section (Remote, 48h, Who Participates) — NOT on home page
│   │   ├── agenda.tsx            # Purple timeline — kickoff, mentorship, coworking, showcase
│   │   ├── categories.tsx        # 6-card grid of project categories with tags
│   │   ├── faq.tsx               # Accordion FAQ using Radix Accordion
│   │   ├── organizers.tsx        # Organizer logos (Inspiratech + Crafter Station)
│   │   └── footer.tsx            # Multi-column footer with links + copyright
│   │
│   ├── ui/                       # Reusable UI primitives
│   │   ├── button.tsx            # Polymorphic button with CVA variants
│   │   ├── card.tsx              # Card with Header/Title/Description/Action/Content/Footer
│   │   ├── input.tsx             # Basic input component
│   │   └── badge.tsx             # Badge with CVA variants
│   │
│   ├── decorative/
│   │   ├── section-wrapper.tsx   # Layout wrapper with color variants + optional border/grid
│   │   └── grid-overlay.tsx      # Grid pattern background overlay
│   │
│   ├── shared/
│   │   ├── github-badge.tsx      # Animated badge fetching live GitHub star count
│   │   └── language-switcher.tsx # EN/ES toggle button
│   │
│   ├── logos/
│   │   └── crafter-station.tsx   # Crafter Station SVG logo component
│   │
│   └── providers/
│       └── clerk-language-provider.tsx  # Clerk auth provider (commented out in layout)
│
├── lib/
│   ├── utils.ts                  # cn() — clsx + tailwind-merge
│   └── i18n/
│       ├── context.tsx           # LanguageProvider + useTranslation() hook
│       ├── en.ts                 # English translations (source of truth for types)
│       └── es.ts                 # Spanish translations
│
├── public/
│   ├── og.png                    # Open Graph image (1200x630)
│   ├── og-twitter.png            # Twitter OG image
│   ├── favicon.ico
│   ├── apple-touch-icon.png
│   ├── crafter-logotipo.svg
│   ├── inspiratech-logotipo.png
│   └── communities/              # Community partner logos
│       ├── fof.svg
│       ├── inspiratech-logotipo.png
│       └── indies.png
│
├── package.json
├── tsconfig.json                 # target: ES2017, strict, @/* path alias
├── next.config.ts                # Minimal — default config
├── eslint.config.mjs             # Next.js core web vitals + TypeScript
└── postcss.config.mjs            # @tailwindcss/postcss
```

---

## Pages & Routes

### `/` — Home (Landing Page)
**File:** `app/page.tsx`
Renders sections in order: Nav → Hero → Countdown → WhatIsSheShips → Agenda → Categories → FAQ → Organizers → Footer

### `/judge` — Judge Info
**File:** `app/judge/page.tsx`
Red hero + 3 brutalist cards: Review Projects, Provide Feedback, Celebrate Builders

### `/mentor` — Mentor Info
**File:** `app/mentor/page.tsx`
Purple hero + 3 brutalist cards: Guide & Support, Office Hours, Inspire

### `/speaker` — Speaker Info
**File:** `app/speaker/page.tsx`
Light pink hero + 3 brutalist cards: Keynote Talk, Workshop, Panel Discussion

### `/sponsor` — Sponsor Info
**File:** `app/sponsor/page.tsx`
Pink hero + 3 sponsorship tiers (Platinum $2,500 / Gold $1,500 / Silver $500) + custom packages CTA

---

## Design System

### Aesthetic: Neobrutalism

- **Border radius:** `0` everywhere (`* { border-radius: 0 !important; }`)
- **Borders:** 3-4px solid black
- **Shadows:** Offset black shadows (4-8px), shift on hover/active
- **Typography:** Bold, uppercase, tight tracking
- **Scrollbar:** Custom brutalist-styled scrollbar

### CSS Utility Classes (`globals.css`)

| Class | Effect |
|---|---|
| `.brutalist-border` | 3px solid black border |
| `.brutalist-shadow` | 6px 6px black shadow |
| `.brutalist-shadow-sm` | 4px 4px black shadow |
| `.brutalist-shadow-lg` | 8px 8px black shadow |
| `.brutalist-card` | Border + shadow + hover translate effect |
| `.brutalist-button` | Border + shadow + hover/active translate + bold uppercase |
| `.grid-overlay` | Grid line background pattern |
| `.data-label` | 11px uppercase monospace label |

### Color Palette

**Primary:**
- Pink: `#ff2d78` (`--primary-pink`)
- Black: `#1a1a1a` (`--primary-black`)
- Cream: `#faf5f0` (`--primary-cream`)

**Secondary:**
- Purple: `#8b5cf6` (`--secondary-purple`)
- Light Pink: `#ffb3d0` (`--secondary-light-pink`)
- Red: `#ff6b6b` (`--secondary-red`)

**Accent:**
- Sunny Yellow: `#ffd23f` (`--sunny-yellow`)

**Neutrals:**
- Dark: `#2d2d2d` (`--neutral-dark`)
- Gray: `#6b7280` (`--neutral-gray`)
- Light: `#f3f4f6` (`--neutral-light`)

**Legacy aliases** (map to same values): `--rose-coral`, `--deep-rose`, `--warm-beige`, `--charcoal`, `--off-white`, `--muted-gold`, `--warm-gray`, `--grid-gray`, `--hot-pink`

### Tailwind Theme (via `@theme inline` in `globals.css`)

All CSS variables are exposed as Tailwind colors: `bg-primary-pink`, `text-secondary-purple`, `bg-sunny-yellow`, etc.

### Fonts

- **Title:** `--font-title` → `"Space Grotesk Variable", sans-serif` — used via `font-[family-name:var(--font-title)]`
- **Body:** `--font-body` → `"Space Mono", monospace` — set on `body`

### SectionWrapper Variants

`components/decorative/section-wrapper.tsx` — wraps sections with consistent padding (`px-6 py-20 md:py-28 lg:py-32`, max-w-7xl) and color:

| Variant | Classes |
|---|---|
| `cream` | `bg-primary-cream text-primary-black` |
| `pink` | `bg-primary-pink text-primary-black` |
| `purple` | `bg-secondary-purple text-white` |
| `lightPink` | `bg-secondary-light-pink text-primary-black` |
| `red` | `bg-secondary-red text-white` |
| `dark` | `bg-primary-black text-white` |
| `light` | `bg-neutral-light text-primary-black` |

Props: `variant`, `grid` (adds GridOverlay), `bordered` (adds top+bottom 4px border), `className`, `id`

### Button Variants (`components/ui/button.tsx`)

Built with CVA. All buttons get `.brutalist-button` base class.

**Variants:** `default` (black), `pink`, `purple`, `red`, `outline` (white), `ghost`
**Sizes:** `default` (h-11), `sm` (h-9), `lg` (h-14), `icon` (size-11)
**Props:** Supports `asChild` via Radix `Slot.Root` for polymorphic rendering

---

## Internationalization (i18n)

### Architecture

Context-based system in `lib/i18n/`:

- **`context.tsx`** — `LanguageProvider` wraps the app, provides `useTranslation()` hook
- **`en.ts`** — English translations (exports `Translations` type)
- **`es.ts`** — Spanish translations (typed as `Translations`)

### Hook: `useTranslation()`

```typescript
const { t, locale, setLocale, toggleLocale } = useTranslation();
// t — translation object (t.nav.join, t.hero.description, etc.)
// locale — "en" | "es"
// setLocale — set specific locale
// toggleLocale — switch between en/es
```

### Storage & Behavior

- Locale stored in `localStorage` (key: `"locale"`)
- Updates `document.documentElement.lang` on change
- Default: `"en"`
- Toggle button in nav shows opposite language code (shows "ES" when in English)

### Translation Key Structure

```
t.nav         — Navigation labels and CTA buttons
t.hero        — Hero section (tagline, headline, description, date, CTAs)
t.countdown   — Countdown labels and tagline
t.eventInfo   — Event details (headline, paragraphs, where/duration/who cards)
t.whatYouCanBuild — Build items list (not currently used on home page)
t.agenda      — Schedule slots (time, title, description)
t.categories  — Project category cards (title, description) + section headlines
t.faq         — FAQ items (question, answer) + section headlines
t.organizers  — Organizer section labels
t.footer      — Footer links and descriptions
```

---

## Key Patterns & Conventions

### Component Patterns
- All section and shared components use `"use client"` directive
- Root layout (`app/layout.tsx`) wraps children in `<LanguageProvider>`
- Sub-pages (judge, mentor, speaker, sponsor) each render their own `<Nav />` and `<Footer />`
- Sections use `<SectionWrapper>` for consistent spacing and theming
- UI components use CVA for variant management and Radix `Slot` for polymorphism (`asChild`)

### Import Alias
- `@/*` maps to project root (configured in `tsconfig.json`)
- Example: `import { cn } from "@/lib/utils"`

### Font Usage
- Title font applied inline: `className="font-[family-name:var(--font-title)]"`
- Body font set globally on `<body>` via CSS

### Link Conventions
- All registration/application CTAs → `https://luma.com/ytl522gp`
- Internal nav links use anchor hashes: `#event-info`, `#agenda`, `#categories`, `#faq`
- Smooth scrolling enabled via `html { scroll-behavior: smooth; }`

### GitHub Badge
- Fetches star count from `https://api.github.com/repos/crafter-station/she.ships`
- Animated reveal using Motion spring animation
- Links to the GitHub repository

---

## External Integrations

| Service | Usage | URL/Config |
|---|---|---|
| **Luma** | Event registration for all roles | `https://luma.com/ytl522gp` |
| **GitHub API** | Live star count for badge | `https://api.github.com/repos/crafter-station/she.ships` |
| **Clerk** | Auth (disabled) | Installed packages, provider commented out in layout |

---

## Sponsor Tiers (hardcoded in `app/sponsor/page.tsx`)

| Tier | Price | Key Benefits |
|---|---|---|
| Platinum | $2,500 | Naming rights, main logo, 10-min keynote, named award category |
| Gold | $1,500 | Featured logo, 40-45 min talk/workshop, participant DB access |
| Silver | $500 | Logo on landing page, mention during event, logo on brochures |

Custom packages available via contact.

---

## Category Colors & Tags (hardcoded in `components/sections/categories.tsx`)

| Category | Color | Tags |
|---|---|---|
| Apps & Tools | `#5B9A8B` (teal) | web app, mobile, saas |
| AI-Powered | `#E76F51` (coral) | chatbot, automation, ml |
| Creative Projects | `#5B9A8B` (teal) | comic, art, zine |
| Design & UX | `#F4E04D` (yellow) | figma, prototype, ui |
| Educational | `#A8BCEE` (light blue) | course, tutorial, tool |
| Developer Tools | `#E76F51` (coral) | library, api, framework |

---

## Metadata & SEO (`app/layout.tsx`)

```
Title: "She Ships | Where Women Build and Ship"
Description: "Join women builders shipping real products with AI-native tools."
metadataBase: https://she-ships.crafter.run
OG image: /og.png (1200x630)
Twitter card: summary_large_image → /og-twitter.png
Favicon: /favicon.ico
Apple touch icon: /apple-touch-icon.png
```

---

## Unused / Commented-Out Code

- **Clerk auth** — `@clerk/nextjs`, `@clerk/localizations`, `@clerk/themes` are installed. `ClerkLanguageProvider` exists in `components/providers/clerk-language-provider.tsx` but is commented out in `app/layout.tsx`
- **COBE** — Globe visualization library installed but not imported anywhere
- **`event-info.tsx`** — Alternative section component (3-card layout with icons) exists but is not rendered on the home page
- **`whatYouCanBuild`** — Translation key exists in both en.ts and es.ts but no component renders it
