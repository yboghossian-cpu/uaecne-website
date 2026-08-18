# UAECNE Website Rebuild — Project Brief

**Project root:** `C:\Users\Yeghia\Desktop\UNION\Website`
**Source content folder:** `C:\Users\Yeghia\Desktop\UNION` (parent folder — treat as the source of real content; reference whatever inventory, images, and documents already exist there. Do not duplicate or move those source files into `Website`; read from them as needed.)

This is a **separate, from-scratch rebuild**, distinct from the earlier Wix Studio manual-build project for the same client. Brand identity carries over from the current live site; layout is being redesigned mobile-first.

---

## Critical standing rules (do not deviate)

1. **Never invent, guess, or fabricate any content** — text, translations, contact info, names, addresses, service times, staff titles, anything. If something is missing or unclear, stop and flag it explicitly in `OPEN_QUESTIONS.md` rather than filling a placeholder that looks real.
2. **Bilingual: English (primary) + Western (Lebanese) Armenian (secondary) only** — never Eastern Armenian, never auto-translate. If Armenian text isn't already present in the UNION folder, flag it as missing. Do not attempt Armenian translation yourself, even as a draft.
3. **Every school page uses ONE unified template/component.** Every church page uses ONE unified template/component. Do not design pages individually.
4. **Do not delete, overwrite, or run destructive commands without showing the diff/plan first.** Git init if not already done; commit after each reviewed milestone so there's a rollback point.
5. **Work file-by-file.** Show the diff for each file before moving to the next — don't batch unrelated changes into one review.
6. **Maintain two living files at the project root:** `PROJECT_STATUS.md` (what's built, what's next) and `OPEN_QUESTIONS.md` (every content/asset gap flagged, unresolved).
7. **Design polish must never increase hosting or operating cost.** Visual/design quality may exceed the current live site — better spacing, typography refinement, layout quality, imagery treatment, etc. — but everything must run within the existing hosting plan (DigitalOcean VPS + Caddy + Backblaze B2 backups). Specifically:
   - **No paid fonts.** Google Fonts (free, self-hostable) only — Cormorant Garamond and IBM Plex Sans are both available there at no cost.
   - **No premium plugins, libraries, or paid npm packages** that require a subscription or license fee.
   - **No third-party paid services** — no paid CMS, no paid form/email-handling service, no paid analytics, no paid image CDN, no paid map API tier. If a feature (e.g. a contact form or map embed) needs a backend service, use a free-tier or self-hosted option and flag the choice for Yeghia's approval before wiring it in.
   - **Nothing that adds a new recurring cost line** beyond the ~$6/mo droplet and the existing Backblaze B2 backup storage. If a design idea requires one, stop and flag it as a decision for Yeghia rather than adding it silently.

---

## Verified brand system

Pulled live from the current site's DOM, computed styles, and the full-resolution logo image — **this supersedes any older style guide document that may exist in the UNION folder** (an older Phase 1 style guide exists from a prior project phase and contains outdated values; do not use it).

**Colors**
| Role | Hex |
|---|---|
| Deep red (primary) | `#8B0000` |
| Ivory background (primary) | `#FFFDF7` |
| Ivory wash (secondary, section backgrounds) | `#F7F2E9` |
| Gold (primary accent — buttons, dividers, icons) | `#C5A059` |
| Gold (secondary/decorative — scripture quotes, callouts, used sparingly) | `#D4AF37` |
| Dark brown text (on ivory/gold) | `#43311F` |
| Body text | `#1A1A1A` |

**Typography**
- Headings: **Cormorant Garamond** (weights 400/500/600/700) — confirmed the only serif heading font in live use.
- Do **not** use Cinzel — it appears in an older style-guide doc but is not actually used on the live site.
- UI/body/nav sans: **IBM Plex Sans** (fallback: system sans-serif).

**Logo**
Round seal — a dove descending over a radiant cross, above an open book, burgundy Armenian inscription around a gold ring border, ivory background. Locate the real logo file in the UNION folder (do not recreate it). If it's not there, flag it in `OPEN_QUESTIONS.md` — do not proceed with a placeholder shape presented as final.

**Heritage facts**
- Founding year: **1846** (confirmed live, appears verbatim as "Faithfully Serving Since 1846")
- Tagline convention: **"180 years of heritage"** — confirmed live, and consistent with the 1846 founding year (2026 − 1846 = 180). Use 180, not "170 years" (which appears in an outdated proposal doc).

---

## Tech stack

**Assumption — confirm with Yeghia before scaffolding if a different stack is preferred:** Next.js (App Router), mobile-first responsive CSS, built for eventual Node hosting behind PM2 + Caddy. Use Next's built-in i18n routing (or a simple locale-prefixed route structure) for EN/HY rather than a third-party auto-translate service.

---

## Full site scope

Verified 2026-08-18 from a locally-saved copy of the legacy site (`uaecne-legacy-welcome.html`, in `OLD Website for Miissing data/`), by parsing every `<a href="...">` tag directly (120 total) and classifying each as a real page (distinct, non-`#` slug) or an anchor-only category header/dropdown toggle. **Not sourced from the Phase 1 discovery PDF or any network fetch** — that PDF's page map was found to be unreliable (internally inconsistent, missing the confirmed "Memberships" section) and is superseded by this inventory for scope purposes.

| Section | Real pages | Breakdown |
|---|---|---|
| Homepage | 1 | `/en/welcome` itself |
| Union Leadership | 2 | Central Committee, Headquarters — "Pastors" is an anchor-only stub (`#`), not a real page |
| Ministries → Churches | 22 | 6 Lebanon (individual) + 1 Syria index page (`syrian-churches`) + 8 Syria (individual) + 7 other-country index pages (Cyprus, Turkey, Egypt, Greece, Iraq, Iran, Australia) |
| Ministries → Schools | 5 | 2 Lebanon (individual: College, Central High School) + 3 index pages (Syria, Turkey, Iran) |
| Ministries → Higher Education | 3 | Haigazian University, NEST, Educational Council |
| Ministries → Outreach | 3 | Youth Work, Camps, Social Work |
| Ministries → Health Care | 5 | Old Age Homes, National Sanatorium Azounieh, Special Care Centers, Karageusian Foundation, Jinishian |
| Ministries → Publications | 6 | Tchanasser, Badanegan Artsakank, Louys (Upper Room), Family Bible Calendar, Soorhandak, Children's/other books |
| Ministries → Cultural | 2 | Armiss Conservatory (Aleppo), Choirs and Ensembles |
| Ministries → Countries | 9 | Confirmed genuinely distinct from Churches' country pages — every slug differs (e.g. `countries-syria` ≠ `syrian-churches`), all 9 checked individually |
| **Ministries subtotal** | **55** | |
| Partnerships → Ecumenical | 3 | Supreme Council, Armenian Apostolic Church, Armenian Catholic Church |
| Partnerships → Local | 3 | BSL (Bible Society), FMEEC, MECC |
| Partnerships → International | 9 | ACO, AMAA, CEU Int'l, Common Global Ministries Board (UCC/DOC), Danish Armenian Mission, Hilfsbund, GZB, WCRC, WCC — ACO and Hilfsbund are each one page; "2 branches" is text within that page's label, not two separate links |
| **Partnerships subtotal** | **15** | |
| Resource Center | 4 | History of the UAECNE, Armenian Protestantism in the Near East, News & Press Releases, Calendar — "Resources" is an anchor-only stub, not a real page |
| Donate | 3 | Why Donate?, Subject Areas, Donation Form |
| Contact Us | 1 | Real page (`/en/contact-us`), linked near the Donate section |
| **Total real content pages (incl. Homepage)** | **81** | |

Notes:
- **"Memberships" does not exist anywhere on the legacy site** (zero occurrences in the parsed file) — confirmed Wix-staging-only, per rule 2 (include Wix-only additions).
- **Legacy Schools → Lebanon has only 2 items**; the Wix staging site's other 2 (Secondary School Anjar, Shamlian-Tatikian) don't exist in the legacy file — Wix-only additions, included per rule 2.
- **The legacy site's own footer utility pages — Site Map, Terms & Conditions, Credits, Follow Us — are themselves unbuilt/anchor-only (`#`) on the legacy site.** They're in scope for this rebuild but will need real pages/stubs built from scratch, same treatment as any other missing-content page (see Content & Design Strategy below).
- **The legacy footer's "Contact Us" link is a self-referential bug** (points back to `/en/welcome`, not to `/en/contact-us`) — distinct from the real, separate Contact Us page linked near Donate, which is not affected.

## Content & Design Strategy

Confirmed 2026-08-18. Applies to all 81 pages in the scope above, for Step 2 onward. **Does not by itself authorize building beyond what Step 5 already scoped (homepage + one church template + one school template) — that checkpoint still requires Yeghia's explicit confirmation before proceeding further.**

**Content-sourcing priority, per page:**
1. Local UNION folder files — use if more complete/detailed than the Wix staging site's current text.
2. Wix staging site — use its current text if the page is already built there.
3. Legacy site's own text — usable, but every page sourced this way **must** be flagged in `OPEN_QUESTIONS.md` as "sourced from legacy site text, unconfirmed/outdated — needs Yeghia's review before launch." Never presented as final, reviewed content.
4. Nothing available anywhere — build the actual page/route with content that visibly reads as pending (a styled placeholder, not invented prose). Log in `OPEN_QUESTIONS.md`. Never invented copy, per rule 1.

**Applies to every page regardless of source:**
- Visual design stays Wix-derived.
- Missing photos get a styled treatment built from the seal/logo motif, not a gray box — must stay visibly distinguishable as a placeholder. Flag missing photos in `OPEN_QUESTIONS.md`.
- Break up long text — pull quotes, cards, section breaks, varied typography. No walls of paragraph text.
- Add tasteful motion/animation (scroll reveals, hover states, transitions). Free/open-source only, per rule 7 — flag any new dependency before installing.

---

## Build order

### 1. Scaffold
Project structure, a design-tokens file encoding the exact colors/fonts above, base layout with header/nav/footer shell. Show this structure before writing page content.

### 2. Homepage
Mobile-first, this exact section order:
- **a. Header** — seal logo left, EN | ՀԱՅ toggle + hamburger menu right
- **b. Hero** — centered Cormorant Garamond headline "Faith, unity and enduring service" (or the real approved hero copy if it exists in UNION — flag if it doesn't), thin gold rule, subtext
- **c. Scrolling ticker band** — deep red background, small caps/tracked text, e.g. "180 years of heritage • Glory to God alone • [union name]" — use real copy, not invented
- **d. Stats row** — three-column, ivory background, gold-divided — years / churches / countries, Cormorant Garamond numerals
- **e. Ministries grid** — 2-column card grid (Churches, Schools, Outreach, Publications, etc. — full list should match the site's actual ministry categories, not just these four)
- **f. News section** — latest item(s), pending real content
- **g. Donate band** — gold background, dark brown text, red CTA button
- **h. Footer** — brown background, ivory text, HQ contact info (flag if placeholder), social icons, copyright

### 3. Unified CHURCH page template
Single reusable component: back/breadcrumb → hero (church name + country, deep-red gradient overlay on photo) → three-up quick-facts strip (service times / address / phone) → About/history section → pastor card (photo, name, title) → photo grid → map embed → footer.

Populate one real church's data as the first test case, sourced only from verified content already gathered — check whether previously-approved content blocks exist in the UNION folder or prior project files before asking Yeghia to resupply anything already on hand.

### 4. Unified SCHOOL page template
Same discipline: back/breadcrumb → hero → three-up quick-facts (students / founded / contact) → About section → programs list → principal card → photo grid → enrollment CTA band → footer.

### 5. Stop and review
Stop after these three are built and reviewed with Yeghia before building out remaining page types or the full church/school roster.

---

## Process

After each numbered step, **pause and show what was built** (diff + a way to preview it) before continuing to the next step. Do not proceed through multiple build-order steps without review in between.
