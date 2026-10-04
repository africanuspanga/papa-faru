<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Papa Faru Bureau de Change — Website

Marketing + indicative-rates website for **Papa Faru Bureau de Change**, a physical
foreign exchange bureau at Mayfair Plaza, Mwai Kibaki Rd, Dar es Salaam.

This is a companion site to **L&S Forex Bureau** and **Desderia Bureau de Change** —
one agency commissions and reviews all three together, so design-system feedback
usually applies to all three at once. See the sibling repos:
- L&S: https://github.com/africanuspanga/l-s-forex-bureau (local: `~/L&S Forex Bureau/web`, port 3000)
- Desderia: https://github.com/africanuspanga/desderia-forex (local: `~/Desderia Forex `, port 3002)

## Stack

Next.js 16 (App Router, Turbopack) + React 19 + TypeScript + Tailwind CSS v4.
No database — rates come from `src/lib/rates.ts` (Bank of Tanzania reference import,
same pattern as L&S but without the admin/publish workflow).

## Commands

```bash
npm run dev -- -p 3001   # dev server (this site's assigned port — see sibling repos above)
npm run build
npm run start
```

## Brand

Black `#0a0a0a` / white / red `#d41a22` (`red-dark` `#a8121a`, `red-soft` `#fdeceb`).
Fonts: Bevan (`font-display`, single weight, headlines only) + Hanken Grotesk (`font-sans`) + IBM Plex Mono (`font-mono`, board digits/phone). Real logo/favicon
assets in `public/logo.png` and `src/app/icon.png` (from `public/Papa Faru Logo.png` /
`Papa Faru Favicon.png` — keep those two originals, don't delete).

## Session handover — 2026-10-04 (design round 3)

Agency feedback round 3: "all three still look too AI-generic". Root cause: the three
sites were one template with different colours (same photo hero + calculator card, same
rate-card grid, same eyebrow labels, same gradient CTA box). Each site was rebuilt around
its own signature device taken from a real bureau. **Keep the three distinct: don't
port a component's shape from one sibling site to another.** Full rationale is in the
Claude memory `feedback-forex-sites-sameness`.

**Papa Faru signature: the shop-window split-flap rate board.**
- `src/components/RateBoard.tsx` — one flap tile per character, CSS flip-in on load
  (`.flap*` in `globals.css`, disabled under reduced motion). Used in the hero (6 majors)
  and on `/rates` (all currencies).
- Home = Hero + board → `FaruStory` ("faru = rhino" dictionary entry, rhino mark from the
  logo in `public/rhino-mark.png` / `rhino-mark-white.png`) → `CounterSection` (red band,
  dark "counter display" calculator) → `VisitSection` (also the whole `/contact` page).
- Buttons are squared (3px) with 2px borders; eyebrow = red caps after a short bar.
- Removed: WhyChoose, VisitCta, RatesSection, RateCard, emoji flags.
- Rates ≥10 used to round to whole shillings (KES showed 20/21). Now <100 → 2 decimals.
- Fallback BoT means in `lib/currencies.ts` refreshed to 4 Oct 2026; live BoT fetch
  confirmed working that day (transaction date 04-Oct-26).
