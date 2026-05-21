# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> Next.js 16 + Tailwind v4. **Read `AGENTS.md` first** — Next 16 has breaking changes from prior versions, and Tailwind v4 uses inline `@theme` in CSS instead of `tailwind.config.ts`. Check `node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md` if anything looks unfamiliar.

## Source of truth

`IIG_Website_Implementation_Spec.md` is the binding build spec — color tokens, fonts, per-section copy, animation behavior, the contact API contract, Resend/Calendly wiring. Treat it as authoritative. The spec calls for **one** animated element (the hero canvas) and static everything else; don't add more.

Specific copy in the spec (hero H1, service card bodies, badge list, stats numbers, about copy) is used verbatim. Numbers like `45+ Active Interfaces` and `78+ Sites Supported` are factual, not placeholders.

## Brand assets

Brand assets live **outside this repo** at `/Users/dustinsayes/IIG/Brand/` (sibling to `web-iig/`):
- `IIG_Brand_Style_Guide.md` — canonical brand voice/color/typography. Cross-check against the spec if anything looks off.
- `IIG_Logo_1_trans_bkg.png` — full logo (Nav). Already copied to `public/`.
- `IIG_Small_Logo_trans_bkg.png` — monogram (Footer + About watermark). Already copied to `public/`.

## Architecture

Single-page Next 16 App Router site. `src/app/page.tsx` composes `Nav → Hero → Services → Expertise → About → Contact → Footer`. All components live under `src/components/`. The only server code is `src/app/api/contact/route.ts` (Resend → `dustin@iig-corp.com`).

Design tokens are defined in `src/app/globals.css` via Tailwind v4 `@theme` — `--color-navy`, `--color-blue-signal`, `--color-steel`, `--color-offwhite`, `--color-iig-border`, plus `--font-display` (Playfair), `--font-sans` (Inter), `--font-mono` (JetBrains). Use as `bg-navy`, `text-blue-signal`, `font-display`, etc. Note: the spec's `border` token is exposed as `iig-border` to avoid clashing with Tailwind's built-in `border-*` utilities.

Shared constants (Calendly URL, LinkedIn URL, contact email) live in `src/lib/links.ts` — update there, not in individual components.

## Non-obvious constraints

- **Hero canvas honors `prefers-reduced-motion` and `document.hidden`** (`src/components/Hero.tsx`). Reduced motion → static nodes, no animation. Hidden tab → skip frames. Don't remove either branch.
- **No third-party scripts** beyond Calendly via `window.open` (target=_blank). No analytics, no embedded widgets.
- **Resend sender:** currently `dustin@iig-corp.com` (not `noreply@`) because the `noreply@iig-corp.com` address isn't set up. If you change the `from:` address, the domain still needs to be verified in Resend.
- **LinkedIn icon is inline SVG**, not Lucide — `lucide-react` v1+ removed all brand icons (trademark). If you reach for `<Linkedin />`, it won't exist; see the `LinkedinIcon` defined inside `Footer.tsx`.
- **`border` color token is renamed to `iig-border`** in the theme (see above). Use `border-iig-border` for the spec's `#E2E8F0` border color.

## Environment

`.env.local` holds `RESEND_API_KEY`. Mirror it in Vercel Project Settings for production. No other env vars.

## Commands

- `npm run dev` — Turbopack dev (default in Next 16; no flag needed)
- `npm run build` — production build
- `npm run lint` — ESLint (Next 16 removed `next lint`; the script runs `eslint` directly)
- `npm start` — serve the production build
