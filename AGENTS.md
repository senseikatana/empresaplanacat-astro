# AGENTS.md

Empresa Plana (CA) website. Screens are designed in **Google Stitch** (project
`Dashboard Empresa Plana`, design system **"Empresa Plana - Branding"**) and
exported as HTML into `stitch-export/`, then transformed into Astro pages.

## Stack

- Astro 7 + `@astrojs/node` adapter + `@astrojs/react` (islands)
- Package manager: **bun** (`bun.lock` present)
- Node >= 22.12
- Styling: **Tailwind CSS v4 build-time** via `@tailwindcss/vite` (no CDN) +
  Geist + Material Symbols. Theme lives in `src/styles/global.css` (`@theme`
  block mirroring `src/assets/DESIGN.md`; brand colors exposed as CSS custom
  properties in `:root`).

## Commands

Run everything from this directory:

- `bun install`
- `bun run dev` — dev server on port 4321
- `bun run build` — builds `dist/` (server entry + client assets)
- `bun run preview` — serves the production build

## Rendering mode

- `astro.config.mjs` sets `output: "server"` with the Node adapter
  (`mode: "standalone"`). Astro 7 removed `output: "hybrid"`; `server` renders
  every route on request.
- All pages declare `export const prerender = false;` (redundant but explicit
  in server mode). The only client-side code is the `BusTrackingPanel` React
  island (`client:load`).
- Client-side prefetching is enabled (`prefetch: { prefetchAll: true }`).

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
  `/rastreig` (bus tracking demo), plus `/` (hub linking all screens).
- `stitch-export/` — raw exports from Stitch (HTML + PNG per screen). Use these
  as the source of truth when regenerating pages.
- `src/config/i18n/` — all site copy (ES/EN/CA) in `es.json` / `en.json` /
  `ca.json` (406 keys, identical shape). Includes pages, about, full legal
  texts (notice, cookies, privacy) and the bus-tracking UI, formerly scraped
  into `src/data/`.

## Bus tracking (Glovo-style)

- `src/components/BusTrackingPanel.tsx` — React island (`client:load`) with
  report buttons (passed / on time / late / early / not passed / cancelled),
  escalation progress and a review (stars) form. Receives `t` (the
  `busTracking` dictionary) and `stops` from the page.
- Demo page: `/rastreig` (`src/pages/rastreig.astro`), linked from the hub.
- API (server-rendered, `prerender = false`):
  - `GET|POST /api/bus-tracking/reports` — submit/list stop reports.
  - `GET|POST /api/bus-tracking/reviews` — submit/list reviews.
- `src/lib/tracking-store.ts` — JSON file persistence (`.data/bus-tracking.json`,
  git-ignored; override path with `BUS_TRACKING_DATA_FILE`). Escalation: after
  `ESCALATION_THRESHOLD` (3) negative reports on a line, an escalation record
  is created (company + driver coordinator notified). Swap this store for
  Supabase when real persistence is needed.

## Gotchas

- Design tokens live ONLY in `src/styles/global.css` (`@theme`) — add colors,
  spacing, fonts or text sizes there, never ad-hoc `bg-[#...]` values.
- `BaseLayout.astro` imports `../styles/global.css`; do not remove that import
  or styling breaks.
- `astro.config.mjs` must import from `astro/config` (not `astro/defineConfig`)
  and wire `tailwindcss()` from `@tailwindcss/vite` under `vite.plugins`.
- `AGENTS.md` / `DESIGN.md` / `stitch-export/` live at the repo root of this
  project; do not nest another git repo here (`.git` already exists at root).
- Never commit `.env` (copy from `.env.example` when needed).

## Regenerating pages from Stitch

1. Re-export the updated screen HTML/PNG into `stitch-export/`.
2. Transform each HTML: strip `<head>`, keep `<body>` inner content, then wrap
   in `BaseLayout` with `export const prerender = false;`.
3. Run `bun run build` and verify all routes.
