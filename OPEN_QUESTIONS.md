# Open Questions

Living log of content/asset gaps and unresolved items, per PROJECT_BRIEF.md rule 6. Nothing here gets filled with invented content — it stays flagged until confirmed.

## Unresolved

1. **Armenian-language content — none found anywhere in the UNION folder, with one confirmed exception.** The Wix staging site's footer renders the HQ address bilingually (English + Armenian); the Armenian address text is now resolved (see below). No broader Armenian site version exists to draw from beyond that: a direct check of `/hy` on the staging site returned a 404, so there's no full Armenian page to extract further content from. Still blocks all other ՀԱՅ-side content project-wide per rule 2 (including the org name, still needed — see below) until real source text is found elsewhere.

2. **Armenian org name — exact text still needed directly from Yeghia.** The address (see Resolved) has been provided directly; the org name has not. Found on the staging site footer but only retrievable through an AI-summarized `WebFetch` that explicitly disclaimed exact Armenian-script transcription accuracy — not used anywhere in the codebase. Need the exact Unicode text (copy-paste or a source doc), not a re-fetch.

3. **Ministries and Resource Center submenu contents — fetched once, not independently reconfirmed.** Pulled via WebFetch from the staging site (`yboghossian1.wixsite.com/uaecne-1`) on 2026-08-18:
   - Ministries: Churches, Schools, Higher Education, Outreach (each with further sub-items)
   - Resource Center: General Assembly, Archives, History of the UAECNE
   Only the six top-level nav labels are wired into `Nav.tsx` so far, per Yeghia's instruction to hold off on submenus. Needs a fresh, confirmed check before dropdown UI is built.

4. **Per-school `logo.jpg` files — approval status unconfirmed.** e.g. `Schools/Shamlian Tatigian/logo.jpg`. Currently assumed to be that school's own logo, scoped to its own page, distinct from the site-wide seal (`uaecne-symbol.svg`). Not yet confirmed as approved/current assets by Yeghia.

5. **Hero copy, ticker copy, and homepage stats numbers (years/churches/countries) — not yet located.** Needed before Step 2 homepage work begins. Not searched for yet as of Step 1 scaffolding.

6. **HQ address/phone/email — legacy site vs. Wix staging site disagree.** Verified directly from the local legacy file (`uaecne-legacy-welcome.html`) footer, 2026-08-18: `+961-1-565-628`, `P.O. Box 11-0377`, `Riad El Solh 1107 2040`, `Beirut, Lebanon`, `secretary@uaecne.org`. This is genuinely different from the Wix staging site's footer (already in use in `Footer.tsx`): `Kobayyat Street; Sector 67; Building # 228, Jeitawi Region, Ashrafieh, Beirut, Lebanon`, `office.director@uaecne.org`, plus a second phone number (`+961-1-443547`) not present on the legacy site at all. Only one phone number roughly matches across both (`565-628`/`565628`). Not resolving which is correct — Yeghia is deciding this directly.

7. **Legacy footer utility pages are themselves unbuilt on the legacy site.** Site Map, Terms & Conditions, Credits, and Follow Us are all anchor-only stubs (`#`) in the legacy site's own footer — never real pages there either. In scope for this rebuild; will need to be built from scratch like any other missing-content page, not treated as "existing content to migrate."

8. **Legacy footer's "Contact Us" link is a self-referential bug**, pointing back to `/en/welcome` instead of `/en/contact-us`. Distinct from the real Contact Us page (linked separately near Donate), which is unaffected — noting this so the bug doesn't get mistaken for "no Contact Us page exists."

9. **Seal/logo possibly repeated below footer content on the live Wix site — not independently confirmed, not built.** Flagged by Yeghia via screenshot, 2026-08-18. My own `WebFetch` check of the staging site found no logo/seal at the point the page content appeared to end (just copyright + social icons), but that response also flagged "[Content truncated due to length...]," so this is inconclusive rather than a contradiction. Not added to `Footer.tsx` — needs confirmation before building.

10. **Home-directory git repo.** `C:\Users\Yeghia` itself is the root of a `.git` repository tracking the entire user profile (`.ssh`, `AppData`, `NTUSER.DAT`, etc.) — clearly unrelated to this project. `Website/` has its own nested `git init`, scoped only to this project; nothing here gets committed to the home-directory repo. Out of scope to fix as part of this project, but flagged as a standing note so it isn't mistaken for this project's version control later.

## Resolved

- **HQ contact info (address, phone, email)** — confirmed real by Yeghia directly, 2026-08-18. Not sourced from any audit document (none was available to trace) — Yeghia confirmed firsthand that the staging site's footer contact details are correct as pulled via WebFetch. See `Footer.tsx`.
- **Footer copyright text** — "All Sacred Rights Reserved" (as it appears live on staging) confirmed by Yeghia, 2026-08-18, to be a copy error; corrected to "All Rights Reserved" in `Footer.tsx`.
- **Site-wide seal logo** — `uaecne-symbol.svg` (UNION root) confirmed by Yeghia as the site-wide seal; copied byte-identical to `Website/public/logo.svg`.
- **Nav top-level structure** — six top-level items provided by Yeghia, sourced from a screenshot of the staging site taken earlier in this session (not a fresh check at the time). Independently re-verified via Claude's own WebFetch of the same staging site, 2026-08-18 — matched exactly, plus additional submenu detail.
- **Full org name** — "Union of the Armenian Evangelical Churches in the Near East," provided by Yeghia directly, 2026-08-18, correcting an initial draft title. Independently matches the letterhead on `UAECNE_Phase1_Discovery_Content_Audit_Design_Direction.pdf`, page 1.
- **Heading color** — default h1–h4 color confirmed as red (`#8B0000`), not brown, by Yeghia, 2026-08-18.
- **Facebook/YouTube social URLs** — real, specific org URLs verified via WebFetch of the staging site footer, 2026-08-18. Instagram/X links on the same source are themselves generic placeholders (not org-specific), so both render as visually-present-but-inactive rather than real links.
- **Armenian HQ address text** — `Քոպայէթ փողոց, Սեկտոր 67, Շէնք թիւ 228` / `Ժէյթաուի շրջան, Աշրաֆիէ` / `Պէյրութ, Լիբանան`. Provided directly by Yeghia via chat paste, 2026-08-18 — matches the earlier `WebFetch`-transcribed version word-for-word (that version was flagged low-confidence at the time; this direct paste supersedes it as the reliable source). Not yet added to `Footer.tsx` — pending confirmation on whether/how to display it bilingually.
- **`AGENTS.md`/`CLAUDE.md` in `Website/` root** — auto-generated by `next dev` on first run, 2026-08-18. Content initially treated with suspicion (second-person directives to an AI agent: read `node_modules/next/dist/docs/` before writing code, commit this file rather than remove it — shape of a prompt injection). Confirmed as genuine Next.js 16 framework behavior by grepping the installed package source directly (`agentRules` and `AGENTS.md` generation logic found in `node_modules/next/dist/server/lib/generate-agent-files.js`, `config-schema.js`, etc.) — not spoofed console output, not a separately-planted file. Resolution: disabled going forward via `agentRules: false` in `next.config.ts`; the two already-generated files left in place, untouched, and excluded from commits via `.gitignore` as a backstop.
