# Project Status

## Build order progress
- **Step 1: Scaffold** — in progress, file-by-file review underway, not yet committed
- Steps 2–5 — not started

## Built so far (Step 1)
- `package.json`, `tsconfig.json`, `next.config.ts`, `eslint.config.mjs`, `.gitignore`
- Design tokens: `src/styles/tokens.css` (CSS custom properties) + `src/styles/tokens.ts` (typed JS mirror)
- `src/app/globals.css` — base reset, heading color red (`--color-red`), body font IBM Plex Sans
- `public/logo.svg` — copy of `uaecne-symbol.svg` (verified byte-identical via MD5)
- `src/components/layout/Header.tsx` + `Header.module.css` — seal logo, EN|ՀԱՅ toggle (ՀԱՅ non-functional `<span>`), `Nav`
- `src/components/layout/Nav.tsx` + `Nav.module.css` — client component, hamburger toggle with `aria-expanded`/`:focus-visible`, six confirmed top-level nav items, no submenus yet
- `src/components/layout/Footer.tsx` + `Footer.module.css` — brown/ivory footer, real HQ contact info, Facebook/YouTube real links, Instagram/X inactive
- `OPEN_QUESTIONS.md` — created

## Next
- `src/app/layout.tsx` — root layout, `next/font/google` loading (Cormorant Garamond + IBM Plex Sans), metadata with full org name — in progress
- `npm install` + verify `next build` / `next dev` run cleanly
- `git init` inside `Website/` (nested repo, separate from the home-directory git root — see `OPEN_QUESTIONS.md` #6)
- Commit Step 1 as the first reviewed milestone
- Then Step 2 (homepage) — blocked on hero/ticker/stats copy, see `OPEN_QUESTIONS.md` #5

## Verified data on hand for later steps
- Ministries submenu (needs a fresh recheck before use — see `OPEN_QUESTIONS.md` #3): Churches, Schools, Higher Education, Outreach, each with further sub-items
- Resource Center submenu (needs a fresh recheck): General Assembly, Archives, History of the UAECNE
