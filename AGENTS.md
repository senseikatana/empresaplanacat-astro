# AGENTS.md

Empresa Plana (CA) website. Screens are designed in **Google Stitch** (project
`Dashboard Empresa Plana`, design system **"Empresa Plana - Branding"**) and
exported as HTML into `stitch-export/`, then transformed into Astro pages.

## Stack

- Astro 7 + `@astrojs/node` adapter
- Package manager: **bun** (`bun.lock` present)
- Node >= 22.12
- Styling: Tailwind via CDN (`cdn.tailwindcss.com`) + Geist + Material Symbols
  (no build-time Tailwind pipeline)

## Commands

Run everything from this directory:

- `bun install`
- `bun run dev` — dev server on port 4321
- `bun run build` — builds `dist/` (server entry + client assets)
- `bun run preview` — serves the production build

## Rendering mode

- `astro.config.mjs` sets `output: "static"` with the Node adapter
  (`mode: "standalone"`). Astro 7 removed `output: "hybrid"`; with an adapter,
  `static` now behaves the same way.
- **Every page must declare `export const prerender = false;`** — all routes are
  server-rendered on request; nothing is prerendered.

## Design system

Canonical tokens live in `src/assets/DESIGN.md` (mirror of the Stitch
"Empresa Plana - Branding" design system). Key facts:

- Brand colors: `deep-navy` `#013990`, `coastal-teal` `#13AEB8`,
  `energetic-orange` `#EB8E02` (CTAs only), background `#f8f9fa`.
- Font: Geist (400/600/700). Radius: `DEFAULT 0.25rem` / `lg 0.5rem` /
  `xl 0.75rem` / `full`. Ambient shadow `0px 4px 20px rgba(1,57,144,0.08)`.
- Spacing tokens: `margin-desktop 48px`, `margin-mobile 16px`, `gutter 24px`,
  `stack-sm/md/lg 8/16/32px`, `container-max 1280px`.

## Structure

- `src/layouts/BaseLayout.astro` — owns `<head>` (fonts, Tailwind CDN, the
  canonical `tailwind.config`, Material Symbols, shared utility styles) and the
  `<body>` wrapper. Pages only contribute body content via `<slot />`.
- `src/pages/*.astro` — one page per Stitch screen:
  `/rutas-horarios`, `/mobile`, `/donde-estamos`, `/home-variant-1`,
  `/donde-estamos-mobile`, `/home-variant-2`, `/servicios-discrecionales`,
  plus `/` (hub linking all screens).
- `stitch-export/` — raw exports from Stitch (HTML + PNG per screen). Use these
  as the source of truth when regenerating pages.
- `src/data/` — scraped content from the old Empresa Plana site.

## Gotchas

- The Tailwind CDN script and the `tailwind.config` inline script MUST stay
  `is:inline` and in that order in `BaseLayout.astro`, or styling breaks at
  runtime.
- `astro.config.mjs` must import from `astro/config` (not `astro/defineConfig`).
- `AGENTS.md` / `DESIGN.md` / `stitch-export/` live at the repo root of this
  project; do not nest another git repo here (`.git` already exists at root).
- Never commit `.env` (copy from `.env.example` when needed).

## Regenerating pages from Stitch

1. Re-export the updated screen HTML/PNG into `stitch-export/`.
2. Transform each HTML: strip `<head>`, keep `<body>` inner content, then wrap
   in `BaseLayout` with `export const prerender = false;`.
3. Run `bun run build` and verify all routes.
