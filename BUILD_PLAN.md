# Church Template — Build Plan

This is the planning document for the church-template unit (`PROJECT_BRIEF.md`
build-order step 3: per-church detail pages at `/churches/[slug]`). The
approved churches-first pair for the initial build is **FAEC Beirut** +
**Syriac Bouchriyeh** — chosen because between them they cover both ends of
the section-matrix optionality range (FAEC is content-rich: logo, leadership,
pastor card, history, succession; Syriac is minimal: fixed block, services
list, pastor card, gallery, CTA — see deliverable 2 below for the corrected
matrix).

**Nothing has been built yet.** This document is planning only. The
recommended next step — build the template + wire these two churches + extract
only their images + screenshot at 375px + one commit — is explicitly **not
started** and is pending a separate go-ahead from Yeghia.

No files under `src/components/church/` or `src/app/churches/[slug]/` exist.
`src/data/churches.ts` and `public/` were not touched as part of this planning
step.

---

## 1. `ChurchContent` type

Keyed by `slug`, a string FK matching `churches.ts`'s `Church.slug`. Directory
fields already in `churches.ts` (id, country, name, pastor, serviceTime,
address, phone, email, estYear, secretary, isNew, slug, photo, emblem) are
**not** duplicated here — this type only carries content unique to the
per-church detail-page template (`design-reference/uaecne-church-*.html`).

Every module is `| null` where the section matrix (deliverable 2) shows it can
be entirely absent for a given church. Every prose/label field that could
carry Armenian text has a sibling field suffixed `Hy`, typed `string | null`
(or `string[] | null` to mirror its English counterpart's shape). These stay
`null` until Yeghia supplies real, verified Western Armenian copy directly —
never machine-translated or guessed (project rule 2). None are populated in
this step.

```typescript
type Photo = {
  src: string;
  alt: string;
};

export type LeaderEntry = {
  name: string;
  nameHy: string | null;
  role: string;
  roleHy: string | null;
  photo: Photo | null; // FAEC's three leadership entries all have real
                        // photos; typed optional since not guaranteed for
                        // every future church
};

export type HistorySection = {
  heading: string; // e.g. "The Formative Years"
  headingHy: string | null;
  paragraphs: string[];
  paragraphsHy: string[] | null;
};

export type SuccessionEntry = {
  name: string;
  nameHy: string | null;
  years: string; // e.g. "1922 – 1926", "2021 – present"
  note: string | null; // e.g. "(assistant)" — Rev. Robert Sarkissian, FAEC
  noteHy: string | null;
  isCurrent: boolean; // renders in red/bold per the reference file's
                       // `.succ.current` rule
};

export type GalleryPhoto = Photo & {
  caption: string;
  captionHy: string | null;
};

export type SpecialProjectObjective = {
  title: string;
  titleHy: string | null;
  description: string;
  descriptionHy: string | null;
};

export type ChurchContent = {
  slug: string; // FK -> churches.ts Church.slug

  // ── Fixed top block (present on every church page per the template) ──
  logo: Photo | null; // masthead circular logo next to the h1 — FAEC reuses
                       // the Armenian Evangelical College logo (see
                       // OPEN_QUESTIONS.md #26); Syriac has none (name-only
                       // masthead)
  heroPhoto: Photo; // always present — the wide hero banner image
  factsBar: {
    label: string;
    labelHy: string | null;
    sub: string;
    subHy: string | null;
  }[]; // 3-up facts strip under the hero (service time / location / founded
       // year, formatted for display). Largely derivable from churches.ts's
       // serviceTime/address/estYear but kept as explicit content since the
       // reference files hand-format these differently per church (e.g.
       // FAEC splits "Kantari, Beirut" / "Mexique Street" across label/sub)

  // ── About ──
  about: {
    eyebrow: string;
    eyebrowHy: string | null;
    heading: string;
    headingHy: string | null;
    paragraphs: string[]; // first paragraph renders with a drop-cap
    paragraphsHy: string[] | null;
  };

  // Standalone pastor photo card next to About. Present for BOTH FAEC and
  // Syriac in the actual reference-file bodies — see deliverable 2 for a
  // discrepancy note (Syriac's file comment claims no pastor card exists,
  // but its body has one). Typed nullable for churches that genuinely omit
  // it.
  pastorCard: {
    name: string;
    nameHy: string | null;
    role: string; // "Pastor"
    roleHy: string | null;
    photo: Photo;
  } | null;

  // ── Leadership grid — null when the church has no leadership module ──
  leadership: LeaderEntry[] | null;

  // ── History — null when the church has no history module ──
  history: {
    eyebrow: string;
    eyebrowHy: string | null;
    heading: string;
    headingHy: string | null;
    sections: HistorySection[]; // FAEC: 4 subsections (h3 + paragraphs each)
  } | null;

  // ── Programs / church-life list — null when absent (e.g. FAEC has none;
  // Syriac's "Church Services" list populates this) ──
  programs: {
    eyebrow: string;
    eyebrowHy: string | null;
    heading: string;
    headingHy: string | null;
    items: string[];
    itemsHy: string[] | null;
  } | null;

  // ── Special-project band (e.g. a named building/relief project) — not
  // present in either FAEC or Syriac; shape is a best-effort inference from
  // the template's unused `.project` CSS block in both files. VERIFY against
  // a church that actually uses this module (one of the other four
  // reference files) before building it. ──
  specialProject: {
    eyebrow: string;
    eyebrowHy: string | null;
    heading: string;
    headingHy: string | null;
    since: string | null; // italic "Since ____"-style line
    sinceHy: string | null;
    objectives: SpecialProjectObjective[];
  } | null;

  // ── Pastors' succession list — null when absent (Syriac has none; FAEC
  // has 13 entries) ──
  succession: {
    eyebrow: string;
    eyebrowHy: string | null;
    heading: string;
    headingHy: string | null;
    note: string | null; // reference CSS defines an optional
                          // Armenian-set `.succession .note` line; unused in
                          // FAEC's actual body — kept nullable
    noteHy: string | null;
    entries: SuccessionEntry[];
  } | null;

  // ── Anniversary band — not present in either FAEC or Syriac, and no CSS
  // rule for it exists in these two reference files (it must live in one of
  // the other four church files — Anjar, Ashrafieh, Nor Marash, or
  // Emmanuel — not read this step). Shape below is a PLACEHOLDER inferred
  // from the specialProject/cta bands' general pattern. CONFIRM against the
  // actual source file before building. ──
  anniversary: {
    eyebrow: string;
    eyebrowHy: string | null;
    heading: string;
    headingHy: string | null;
    body: string;
    bodyHy: string | null;
  } | null;

  // ── Photo gallery — null when absent (FAEC has none; Syriac has 3) ──
  gallery: {
    eyebrow: string;
    eyebrowHy: string | null;
    heading: string;
    headingHy: string | null;
    photos: GalleryPhoto[];
  } | null;

  // ── Closing CTA — always present ──
  cta: {
    heading: string;
    headingHy: string | null;
    body: string;
    bodyHy: string | null;
  };
};
```

---

## 2. Real content mapping — FAEC Beirut + Syriac Bouchriyeh

Read directly from `design-reference/uaecne-church-faec-beirut-complete.html`
(347 lines excluding embedded base64) and
`design-reference/uaecne-church-syriac-bouchriyeh.html` (335 lines), not from
the recon summary. Both files' embedded photos are base64 — not extracted or
inspected pixel-by-pixel this step, only their `alt` text / captions / role
in the layout are recorded below.

### IMPORTANT correction to the recon's section matrix

The recon said Syriac has **no pastor card** ("Pastor is named only in
Syriac's About-section prose, not a standalone card"). Reading the actual
file body contradicts this: Syriac's `<section class="about">` **does**
contain a `.pastor-card` div with a photo, "Rev. Salim Sabounji," and "Pastor"
— structurally identical to FAEC's pastor card. Notably, the Syriac file's own
top-of-file HTML comment claims "NO pastor card (per Yeghia: name pastor in
About text only — only photo is a pulpit shot)" — i.e. the file's comment and
its actual body disagree with each other. Per this step's instruction to read
real file content over any summary, **the body wins**: `pastorCard` is
non-null for Syriac. Flagging this prominently since it changes the
`ChurchContent` optionality for this field versus what was assumed going in.

Everything else in the recon's matrix checks out against direct reading:
Syriac genuinely has no logo, no leadership section, no history section, no
succession list, no special-project band, and no anniversary band. Its
"services list" is the template's `.programs` section (headed "Church
Services"), which is why `programs` (not a new field) is what Syriac
populates.

### FAEC Beirut (`first-armenian-evangelical-church-beirut`)

| `ChurchContent` field | Value | Notes |
|---|---|---|
| `logo` | AEC logo image, alt "First Armenian Evangelical Church logo" | Reused Armenian Evangelical College mark — see OPEN_QUESTIONS #26 |
| `heroPhoto` | alt "First Armenian Evangelical Church of Beirut" | Wide banner, exterior/building |
| `factsBar` | "Sunday Worship" / "Weekly Service" · "Kantari, Beirut" / "Mexique Street" · "1922" / "Founded" | 3 facts |
| `about.eyebrow` | "The Congregation" | |
| `about.heading` | "About This Church" | |
| `about.paragraphs` | 2 paragraphs (first has drop-cap): (1) "Established in 1922, the First Armenian Evangelical Church of Beirut is located in the historic Kantari sector of western Beirut. Over the past century, the church has developed an integrated approach to education and spiritual life, working in close partnership with the Armenian Evangelical College and Haigazian University to form a central hub for Armenian Evangelical ministry in the region." (2) "The church operates through a collaborative network of ministry leaders, staff, and volunteers who share the responsibility of congregational care and community outreach — focusing on intergenerational support, spiritual development, and practical service to the surrounding neighborhood. Its ministry sectors include Children & Junior Ministries, Youth & Young Adult Ministries, and Women's Ministry. The congregation and its diverse programs are currently pastored by Rev. Jirair Ghazarian." | |
| `pastorCard` | Rev. Jirair Ghazarian, "Pastor," photo | Non-null |
| `leadership` | 3 entries: Rev. Jirair Ghazarian (Pastor), Ms. Ani Boujikanian (Vice-Chair of the Council), Mrs. Lena Basmajian (Secretary) — all with photos | Non-null |
| `history.eyebrow` | "Our Story" | |
| `history.heading` | "A Century of Faith in Beirut" | |
| `history.sections` | 4 subsections: "The Formative Years" (2 ¶), "A New Location and Years of Flourishing" (1 ¶), "The Lebanese Civil War Years (1975–1991)" (2 ¶), "Post–Civil War Years (1992–Present)" (2 ¶) | Non-null; real prose covers 1914 founding through present, architect Henry Kuljian, civil-war account of Rev. Hovhaness Karjian, Rainbow Nursery (2000–2020), Armenian Cultural Association (2006) |
| `programs` | — | **null** — FAEC has no programs/services-list module |
| `specialProject` | — | **null** |
| `succession.eyebrow` | "Those Who Served" | |
| `succession.heading` | "Pastors of the Church" | |
| `succession.entries` | 13 entries, Rev. Yenovk Hadidian (1922–1926) through Rev. Jirair Ghazarian (2021–present, `isCurrent: true`); includes Rev. Robert Sarkissian with `note: "(assistant)"`, 1967–1970 | Non-null. Note: entry "Rev. Hovhannes Sevadjian" (1995–2005) appears here — same spelling issue flagged for the modern Emmanuel Nor Amanos pastor, see OPEN_QUESTIONS #21; this succession-list entry is historical FAEC content, not the Emmanuel church, so it's left as-is verbatim |
| `anniversary` | — | **null** |
| `gallery` | — | **null** — FAEC has no gallery module |
| `cta.heading` | "Join Us in Worship" | |
| `cta.body` | "All are welcome at the First Armenian Evangelical Church of Beirut — a beacon of hope and life in the heart of the city for over a century." | |

### Syriac Bouchriyeh (`syriac-evangelical-church-sed-el-bouchrieh`)

| `ChurchContent` field | Value | Notes |
|---|---|---|
| `logo` | — | **null** — name-only masthead, no logo image in the title row |
| `heroPhoto` | alt "Syriac Evangelical Church of Bouchriyeh" | |
| `factsBar` | "Sunday Worship" / "Weekly Service" · "Bouchriyeh" / "Lebanon" · "1966" / "Founded" | 1966 sourced from a building inscription, not the text doc — see OPEN_QUESTIONS #24 |
| `about.eyebrow` | "The Congregation" | |
| `about.heading` | "About This Church" | |
| `about.paragraphs` | 2 short paragraphs: (1) "The Syriac Evangelical Church is a small congregation in the Bouchriyeh area of Lebanon. Its members love the Lord Jesus and serve Him in different ways. The church's goal is to serve the Lord Jesus and to deliver the Good News to the surrounding families." (2) "The congregation is pastored by Rev. Salim Sabounji." | |
| `pastorCard` | Rev. Salim Sabounji, "Pastor," photo | **Non-null** — see the correction note above; contradicts the recon's earlier assumption |
| `leadership` | — | **null** |
| `history` | — | **null** |
| `programs.eyebrow` | "Church Life" | |
| `programs.heading` | "Church Services" | |
| `programs.items` | "Sunday Worship Service," "Sunday School for Children," "Junior Youth Group," "Scout Meeting," "Ladies Meeting — biweekly, Wednesdays" | Non-null, 5 items |
| `specialProject` | — | **null** |
| `succession` | — | **null** |
| `anniversary` | — | **null** |
| `gallery.eyebrow` | "In Pictures" | |
| `gallery.heading` | "Gallery" | |
| `gallery.photos` | 3: alt "Historic view of the Syriac Evangelical Church" / caption "Historic view of the church"; alt "The sanctuary of the Syriac Evangelical Church" / caption "The sanctuary"; alt "The Syriac Evangelical Church façade" / caption "The church façade" | Non-null. File's own comment describes these as real photos: historic B&W exterior, interior sanctuary, pastor at pulpit |
| `cta.heading` | "Join Us in Worship" | |
| `cta.body` | "All are welcome at the Syriac Evangelical Church of Bouchriyeh — a small congregation serving the Lord and its neighbors with love." | |

### Contact-card fields — not part of `ChurchContent`

Both churches' "Our Location" / "Get in Touch" contact cards are fully
derivable from `churches.ts` fields already (address, phone, email,
secretary) — no new content type needed. One nuance: FAEC's contact card
splits a general email and a separate "Pastor Email" row
(`faec@terra.net.lb` / `faec.pastor@gmail.com`); `churches.ts`'s single
`email` field for FAEC already stores both, newline-separated
(`"faec.pastor@gmail.com\nfaec@terra.net.lb"`), so the future
`ContactSection` component can split on `\n` to render both rows without a
new field. Syriac's file has no "Pastor Email" or "Secretary" row — consistent
with `churches.ts`'s blank `secretary: ""` for that church — but it does use a
different email address (`syriac-evangelical-church@hotmail.com`) than
`churches.ts`'s `syriac.evan.church@gmail.com`. This email mismatch is a
genuine discrepancy worth Yeghia's attention but is **not** one of this
step's frozen 10 `OPEN_QUESTIONS.md` entries — noting it here only, not
logged separately, per the explicit scope given for this step.

### Emmanuel / Nor Marash guardrails (forward-looking, not used by FAEC/Syriac)

- Neither FAEC nor Syriac's file references Emmanuel Nor Amanos or Nor Marash
  in passing, so no normalization was actually needed this step. Documenting
  the rule anyway for consistency once those two churches are built:
  **"Svadjian"** (not "Sevadjian") is the confirmed-correct spelling for the
  Emmanuel Nor Amanos pastor per Yeghia; `churches.ts` currently has
  "Sevadjian" and needs an eventual update (OPEN_QUESTIONS #21). Nor Marash's
  email field must stay blank when that church is built — the reference file
  states the sheet's `aessa68@gmail.com` value was explicitly "not the
  church's" (OPEN_QUESTIONS #25); `churches.ts`'s current filled-in value is
  suspect, not authoritative.

---

## 3. Component tree — `src/components/church/` (proposed, not created)

```
src/components/church/
├── ChurchBreadcrumb.tsx        NEW — no breadcrumb component exists anywhere
│                                     in the codebase yet. Renders
│                                     "Ministries › Churches › {country}"
│                                     from churches.ts's existing `country`
│                                     field; no new content needed.
│
├── ChurchTopBlock.tsx           NEW — masthead: optional circular `logo`
│   ├── (logo image)                  image, h1 name, meta line (location ·
│   └── ChurchFactsBar.tsx  NEW       established year). Plain rounded-photo
│                                     treatment (border-radius, shadow,
│                                     object-fit: cover) — NOT the arched
│                                     ArchFrame primitive; this template's
│                                     hero/pastor/leadership/gallery photos
│                                     are all plain rounded rectangles, a
│                                     different visual language from the
│                                     arch motif used on the homepage.
│                                     ChurchFactsBar is the 3-up red gradient
│                                     strip under the hero photo.
│
├── ChurchAbout.tsx              NEW — eyebrow/heading/drop-cap paragraphs +
│                                     optional PastorCard side-by-side grid
│                                     (single-column when pastorCard is null,
│                                     per the reference CSS's `.about-grid.solo`
│                                     rule — not exercised by FAEC or Syriac
│                                     since both have a pastor card, but
│                                     needed for future churches without one)
│
├── PastorCard.tsx                NEW — small reusable photo+name+role card;
│                                      shared shape with LeadershipGrid's
│                                      person cards but sized/positioned
│                                      differently per the reference CSS
│                                      (`.pastor-card` vs `.person`)
│
├── LeadershipGrid.tsx            NEW — renders `leadership` when non-null;
│                                      omitted entirely when null (Syriac)
│
├── ChurchHistory.tsx             NEW — renders `history.sections` as
│                                      repeating h3+paragraphs blocks; omitted
│                                      when null (Syriac)
│
├── ChurchPrograms.tsx            NEW — renders `programs.items` as a
│                                      bulleted/icon list; omitted when null
│                                      (FAEC)
│
├── SpecialProjectBand.tsx        NEW — not exercised by FAEC/Syriac (both
│                                      null); build only once a church that
│                                      uses it is read directly, per the
│                                      "verify before building" note on the
│                                      type
│
├── SuccessionList.tsx            NEW — renders `succession.entries`,
│                                      highlighting the `isCurrent` row;
│                                      omitted when null (Syriac)
│
├── AnniversaryBand.tsx           NEW — not exercised by FAEC/Syriac; same
│                                      "verify before building" caveat as
│                                      SpecialProjectBand — the shape in the
│                                      type is inferred, not sourced
│
├── ChurchGallery.tsx             NEW — renders `gallery.photos` as a
│                                      responsive figure grid with captions;
│                                      omitted when null (FAEC)
│
├── ChurchContactSection.tsx      NEW — two cards ("Our Location" /
│                                      "Get in Touch") built entirely from
│                                      existing `churches.ts` fields
│                                      (address, phone, email split on \n,
│                                      secretary) — no new content type
│
└── ChurchCTA.tsx                  NEW — closing "Join Us in Worship" band;
                                       always rendered

REUSE Medallion         — decorative background medallion, same pattern as
                           churches/page.module.css's `.med`/`.medLeft`/
                           `.medRight` corner placement, if the top block or
                           any band wants the same watermark treatment
REUSE IconSymbols        — sprite already mounted app-wide; needs new symbol
                           IDs added for pin/phone/mail/user/dot (contact-row
                           and programs-list icons) — none of the current
                           `#ic-*` set covers these; #ic-church can be reused
                           for the church-specific placeholder glyph pattern
                           already used on the churches index page
REUSE useScrollReveal    — client hook, for the same fade/slide-in treatment
                           already used elsewhere on scroll into view
REUSE churches/page.module.css's
  `.pic`/`.picPending`/`.glyph`/`.glyphIcon`/`.glyphCaption` pattern
                         — the existing "real photo OR icon+caption
                           placeholder" treatment used on the churches index
                           cards is the right model for hero/pastor/
                           leadership/gallery photo slots here too (plain
                           rounded rectangle, not ArchFrame's arch shape)
```

### Preparatory step: `--color-line` token

`src/styles/tokens.css` currently defines `--color-red`, `--color-red-deep`,
`--color-red-dark`, `--color-ivory`, `--color-ivory-wash`, `--color-gold`,
`--color-gold-decorative` — no `--color-line` token yet. All six church
reference files use `--line: rgba(67,49,31,.16)` for hairline borders
throughout (contact-card row dividers, succession-list row dividers, footer
border, etc.). Adding `--color-line: rgba(67, 49, 31, 0.16);` to
`src/styles/tokens.css` (matching the existing `--color-*` naming convention)
is a preparatory step the eventual template build will need — not done this
step, since no code files are being touched.

---

## 4. Route + image-extraction plan (convention only — nothing created)

### Route

- `src/app/churches/[slug]/page.tsx` — dynamic route matching the existing
  link target already emitted by `src/app/churches/page.tsx`
  (`href={\`/churches/${church.slug}\`}`), which currently 404s.
- `generateStaticParams()` returning `churches.map(c => ({ slug: c.slug }))`
  from `src/data/churches.ts`, so all 25 directory entries get a static
  route slot even though only FAEC and Syriac will have real `ChurchContent`
  data initially.
- A church-content lookup module (e.g. `src/data/churchContent.ts`) exporting
  a `Record<string, ChurchContent>` or similar, keyed by slug — populated only
  for `first-armenian-evangelical-church-beirut` and
  `syriac-evangelical-church-sed-el-bouchrieh` in the first real build pass.
  For any other slug, the page should render the directory-only fields
  (name, pastor, address, etc. from `churches.ts`) with the flexible modules
  simply absent, rather than erroring — since 23 of the 25 churches won't
  have `ChurchContent` entries yet.
- `notFound()` for any slug not present in `churches.ts` at all.

### `public/` image-naming convention

Existing convention is flat kebab-case prefixed by content type:
`church-{slug}.{ext}` for the directory photo, `church-{slug}-emblem.{ext}`
for the small index-card emblem (confirmed via `public/church-*` glob: e.g.
`church-first-armenian-evangelical-church-beirut.jpg`,
`church-armenian-evangelical-church-ashrafieh-emblem.png`), and the parallel
`school-{slug}.{ext}` / `school-{slug}-emblem.{ext}` pattern for schools.

Proposed extension for per-church detail-page images, keeping the same
`church-{slug}-{part}` shape:

| Image type | Proposed filename |
|---|---|
| Masthead logo (detail page only, distinct from index `emblem`) | `church-{slug}-logo.{ext}` |
| Hero banner photo | `church-{slug}-hero.{ext}` |
| Pastor card photo | `church-{slug}-pastor.{ext}` |
| Leadership person photo (per person) | `church-{slug}-leader-{n}.{ext}` (1-indexed, in the order they appear in `leadership`) |
| History side-image (if a church uses the `.hsplit` module) | `church-{slug}-history.{ext}` |
| Gallery photo (per photo) | `church-{slug}-gallery-{n}.{ext}` (1-indexed) |

For FAEC specifically: `church-first-armenian-evangelical-church-beirut-logo.png`,
`-hero.jpg`, `-pastor.jpg`, `-leader-1.jpg`/`-leader-2.jpg`/`-leader-3.jpg`.
For Syriac: `church-syriac-evangelical-church-sed-el-bouchrieh-hero.jpg`,
`-pastor.jpg`, `-gallery-1.jpg`/`-gallery-2.jpg`/`-gallery-3.jpg` (no logo —
`logo` is null for this church).

No extraction happens this step — the base64 payloads inside the reference
HTML files were stripped out of the copies read for this plan and never
decoded or saved as image files.

---

## Status

Planning only. Deliverables 1–4 above are the finalized plan. 10 new
one-line entries were added to `OPEN_QUESTIONS.md`'s `## Unresolved` list
(items 20–29). The recommended next step — building the template components,
wiring FAEC + Syriac, extracting only their images, screenshotting at 375px,
and one commit — is **not started** and needs a separate go-ahead.
