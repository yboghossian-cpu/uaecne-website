/**
 * Per-school detail-page content — keyed by slug (FK -> schools.ts's
 * School.slug). Directory fields already in schools.ts (id, country, name,
 * slug, photo, emblem) are NOT duplicated here — this module carries content
 * unique to the school detail-page template (design-reference/
 * uaecne-school-aec-reference.html, the locked design source of truth).
 *
 * Unlike churches.ts, schools.ts has NO contact/address/estYear/leadership
 * fields at all — so `location`, `contactRows`, `masthead`, `leadership`,
 * etc. here have no directory fallback and are wholly sourced from each
 * school's own verified reference material.
 *
 * Every module is `| null` where a school's page genuinely omits that
 * section. Every prose/label field that could carry Armenian text has a
 * sibling field suffixed `Hy`, typed to mirror its English counterpart's
 * shape. These stay `null` until Yeghia supplies real, verified Western
 * (Lebanese) Armenian copy directly — never machine-translated or guessed
 * (PROJECT_BRIEF.md rule 2). None are populated in this unit.
 *
 * Three entries exist so far: Armenian Evangelical College (AEC),
 * Shamlian-Tatikian, and AESSA (Anjar). The route falls back to a
 * directory-only "content pending" render for any other slug (Central
 * High, the only one left unbuilt).
 */

import type { ChurchContent } from "./churchContent";

type Photo = { src: string; alt: string };

// A leadership card's `name` is nullable — when a role has no verified
// person at all (e.g. AEC's Vice-Chair of the Council, absent from the
// source doc), SchoolLeadershipGrid renders an italic-gold "Name pending"
// label instead of inventing one. `photo` is independently nullable — a
// name can be verified (Shamlian-Tatikian's "Mrs. Kayane Tunberian, Current
// Principal") while no matching photo exists (the two candidate photos on
// file are labeled with different names — a real, flagged mismatch, not
// resolved by guessing) — that case renders the real name with an arched
// photo-pending frame, distinct from the "Name pending" case.
export type SchoolLeaderEntry = {
  name: string | null;
  nameHy: string | null;
  role: string;
  roleHy: string | null;
  photo: Photo | null;
};

// Shared shape for a single magazine-style woven photo/text row, rendered
// via the cross-imported `WhiteChurchFeature`. Reused across `splitRows`
// and Bethel Secondary School's section-scoped row groups below (introduced
// because Bethel's mockup interleaves these rows with other section
// content — chips, a second pull-quote, a bare language row — in a way one
// flat array can't represent; grouping by section keeps each group
// renderable as its own contiguous block in page.tsx).
export type SchoolSplitRow = {
  eyebrow: string;
  eyebrowHy: string | null;
  heading: string;
  headingHy: string | null;
  paragraphs: string[];
  paragraphsHy: string[] | null;
  photo: { src: string; alt: string; width: number; height: number };
  reverse: boolean;
  dropcapFirst: boolean;
};

export type SchoolContactRow = {
  key: string;
  keyHy: string | null;
  value: string;
  valueHy: string | null;
  href: string | null; // "mailto:..." link, or null for a plain-text row
  // True renders `value` in the reference's italic "pending" style (e.g.
  // phone/email genuinely not yet known) instead of the normal value
  // style — an honest "we don't have this yet," never an invented number
  // or address. Default false/undefined for a normal, real value.
  pending?: boolean;
};

export type SchoolContent = {
  slug: string; // FK -> schools.ts School.slug

  masthead: {
    locationLine: string;
    locationLineHy: string | null;
    // Optional italic tagline under the school name, per Shamlian-Tatikian's
    // own mockup (.shero .motto). Verbatim source copy only — never an
    // invented slogan. Null/omitted for every other school, which render
    // exactly as before.
    tagline?: string | null;
    taglineHy?: string | null;
    // Nullable — null when no founding year is confirmed enough to show
    // in the masthead line at all (Emmanuel al-Ressaleh's own mockup has
    // none here, carrying "Pending" in its facts bar instead); skips the
    // " · Founded X" clause entirely rather than rendering "Founded Pending."
    established: string | null; // just the year, e.g. "1923"
    establishedHy: string | null;
  };

  logo: Photo | null;
  // Nullable — a school with no verified building photo (AESSA) falls back
  // to an arched "photo pending" treatment in SchoolTopBlock, the same
  // visual language as the index card's placeholder and the leadership
  // grid's photo-pending frame, rather than a decorative crest graphic.
  heroPhoto: Photo | null;
  factsBar: { label: string; labelHy: string | null; sub: string; subHy: string | null }[]; // 4 cells, per uaecne-school-aec-reference.html's .facts

  about: {
    eyebrow: string;
    eyebrowHy: string | null;
    heading: string;
    headingHy: string | null;
    paragraphs: string[];
    paragraphsHy: string[] | null;
    // Nullable — a school's single strongest real line, verbatim. Omitted
    // (not invented) when no reference/source doc supplies one (Shamlian).
    pullQuote: string | null;
    pullQuoteHy: string | null;
    // Optional sub-headed prose blocks rendered after `paragraphs`, for a
    // mockup whose History section carries its own sub-heading ("A Brief
    // History" — Shamlian-Tatikian). Omitted for every other school, whose
    // About renders exactly as before.
    subsections?: {
      heading: string;
      headingHy: string | null;
      paragraphs: string[];
      paragraphsHy: string[] | null;
    }[] | null;
  };

  // Independently nullable from `leadership` below even though (for AEC)
  // it duplicates the same person — this mirrors the reference file's own
  // structure exactly, where the principal appears once beside About and
  // again in the Leadership grid.
  principalCard: {
    name: string | null;
    nameHy: string | null;
    role: string;
    roleHy: string | null;
    photo: Photo | null;
  } | null;

  // "Our Location" card — null when no verified address exists at all
  // (Shamlian-Tatikian's source doc gives no address).
  location: {
    addressLines: string[];
    addressLinesHy: string[] | null;
    // Optional descriptive landmark row (own row, own `ic-church` icon,
    // distinct from the address block) — e.g. "Beside the Holy Trinity
    // Armenian Evangelical Church." First needed by Kessab Martyrs School,
    // whose mockup has exactly this as a separate `.crow` in its Location
    // card, not folded into the address lines. Null/omitted for every
    // other school.
    landmark?: string | null;
  } | null;

  // "Get in Touch" card rows — null when no verified contact route exists
  // at all (Shamlian-Tatikian). When both `location` and `contactRows` are
  // null, SchoolContactSection renders nothing (whole section omitted).
  contactRows: SchoolContactRow[] | null;

  // Small italic footnote under the contact cards, recording genuinely
  // unresolved source discrepancies (Shamlian-Tatikian's principal-surname
  // conflict and its missing phone/email/street address). Omitted for every
  // other school, whose contact section renders exactly as before.
  contactNote?: string | null;
  contactNoteHy?: string | null;

  // Fixed 3 cards: Principal / Vice-Chair of the Council / Secretary.
  leadership: SchoolLeaderEntry[] | null;

  mission: {
    eyebrow: string;
    eyebrowHy: string | null;
    heading: string;
    headingHy: string | null;
    principles: {
      title: string;
      titleHy: string | null;
      description: string;
      descriptionHy: string | null;
    }[];
  } | null;

  // "Our Mission & Philosophy" — AESSA-shaped variant: a centered intro
  // quote + 4 icon-less value cards, per uaecne-school-anjar-template.html's
  // .mission/.val-grid. Deliberately NOT the same field as `mission` above
  // (AEC's 3 icon-arch principle cards) — the two designs differ in ways
  // (quote present, no icons, variable card count) that don't fit one
  // shape without hacking around the icon-arch component. Null for AEC and
  // Shamlian-Tatikian, which use `mission` (or nothing) instead.
  missionValues: {
    eyebrow: string;
    eyebrowHy: string | null;
    heading: string;
    headingHy: string | null;
    quote: string;
    quoteHy: string | null;
    values: {
      title: string;
      titleHy: string | null;
      description: string;
      descriptionHy: string | null;
    }[];
  } | null;

  // "Inclusive Support Services" — 3 icon-badge cards, no church/AEC
  // equivalent. `logo` non-null uses the school's own real program logo
  // image (Healing Harbour, Boarding Home); when null, `icon` names a
  // generic IconSymbols id instead (PEP — no real logo file exists for it).
  // Never invented: no logo file -> generic icon, never a fabricated mark.
  supportServices: {
    heading: string;
    headingHy: string | null;
    items: {
      title: string;
      titleHy: string | null;
      description: string;
      descriptionHy: string | null;
      logo: Photo | null;
      icon: string | null;
    }[];
  } | null;

  // "Signature Programs" — name + optional gold suffix note + description
  // rows, no pill (unlike academicHeritage's date-range pills). Same
  // logo-or-generic-icon rule as supportServices.
  signaturePrograms: {
    heading: string;
    headingHy: string | null;
    items: {
      name: string;
      nameHy: string | null;
      note: string | null;
      noteHy: string | null;
      description: string;
      descriptionHy: string | null;
      logo: Photo | null;
      icon: string | null;
    }[];
  } | null;

  // "Faith & Community" — 4 cards, each with an independently nullable
  // photo (none exist yet for any of the 4 scenes) falling back to the
  // same "photo pending" language used by the hero/index-card placeholder.
  // `closingNote` is the reference's italic "Partnership & Gratitude" line
  // beneath the card grid — nullable since not every school will have one.
  faithCommunity: {
    heading: string;
    headingHy: string | null;
    items: {
      title: string;
      titleHy: string | null;
      description: string;
      descriptionHy: string | null;
      photo: Photo | null;
    }[];
    closingNote: string | null;
    closingNoteHy: string | null;
  } | null;

  // Reuses ChurchContent's `succession` shape verbatim (not retyped) — it
  // already handles mixed English/verified-Armenian names (SuccessionList
  // falls back to `nameHy` when `name` is null), the exact requirement for
  // AESSA's Directors Archive, whose source doc gives most names only in
  // Armenian script. Rendered via the church SuccessionList component
  // directly, cross-imported rather than duplicated. Null for schools with
  // no directors-list content (AEC, Shamlian-Tatikian — both use the fixed
  // `leadership` 3-card grid only).
  directorsArchive: ChurchContent["succession"];

  academicHeritage: {
    eyebrow: string;
    eyebrowHy: string | null;
    heading: string;
    headingHy: string | null;
    eras: { period: string; description: string; descriptionHy: string | null }[];
  } | null;

  // Mailto-only inquiry card (PROJECT_BRIEF.md rule 7 — no backend/paid
  // form). Null when no verified school email exists at all (Shamlian).
  inquiry: {
    eyebrow: string;
    eyebrowHy: string | null;
    heading: string;
    headingHy: string | null;
    body: string;
    bodyHy: string | null;
    email: string;
    buttonLabel: string;
  } | null;

  // Nullable, additive — every other school still sets a real cta
  // (unaffected). Null for a school whose approved mockup has no CTA band
  // at all (Shamlian-Tatikian) — ChurchCTA renders nothing when null.
  cta: { heading: string; headingHy: string | null; body: string; bodyHy: string | null } | null;

  // Additive fields below — all null/omitted for AEC, Shamlian-Tatikian,
  // and AESSA, unaffected. First used by Aleppo College for Girls.

  // Magazine-style woven photo/text row for the About/Intro section itself
  // (ACG's mockup renders About as a photo+text split, not `SchoolAbout`'s
  // single-column-plus-optional-principal-card shape — see this field's
  // sibling `splitRows` below for the fuller reuse-decision comment).
  // Rendered in place of `SchoolAbout` when set — `about`/`principalCard`
  // above are still populated for data parity (principalCard stays null
  // here; the real principal card lives in `leadership` instead, matching
  // the mockup) but go unrendered, since ACG's mockup has no principal
  // card inline with About at all.
  introFeature?: {
    eyebrow: string;
    eyebrowHy: string | null;
    heading: string;
    headingHy: string | null;
    paragraphs: string[];
    paragraphsHy: string[] | null;
    photo: { src: string; alt: string; width: number; height: number };
  } | null;

  // Magazine-style woven photo/text rows for the "Student Life" vignettes
  // (Science, Technology, Library, Beyond the Classroom) — rendered later
  // than `introFeature`, after Leadership, matching the mockup's own
  // section order (About → Pull-quote → History → Leadership → these 4).
  // Reuses `WhiteChurchFeature` (cross-imported from `components/church`,
  // same established pattern as `ChurchCTA`/`SuccessionList`/
  // `ChurchBreadcrumb`) rather than a new component — its shape
  // (eyebrow+heading+paragraphs+photo, 2-col) already matched; it only
  // needed two new optional props (`reverse`, `dropcapFirst`), added this
  // unit. `photo.width`/`.height` are the real source photo's own pixel
  // dimensions (never invented) — `WhiteChurchFeature` needs them because
  // it renders the photo at its natural, uncropped aspect ratio rather
  // than a fixed box.
  splitRows?: SchoolSplitRow[] | null;

  // Bethel Secondary School's section-scoped row groups — see
  // `SchoolSplitRow`'s own comment for why these are separate fields
  // instead of more `splitRows` entries. Each renders as its own
  // contiguous `WhiteChurchFeature` block at a fixed point in page.tsx,
  // interleaved with `programChips`/`languages`/`pullQuoteBand2`/
  // `visionMission` to match the mockup's actual section boundaries.
  // Null/omitted for every other school.
  academicsRows?: SchoolSplitRow[] | null; // Languages, Reading & Research
  curriculumRows?: SchoolSplitRow[] | null; // Robotics, Achievement
  worshipRows?: SchoolSplitRow[] | null; // Morning worship (Christian Foundation)
  faithRows?: SchoolSplitRow[] | null; // Faith in Practice (after pullQuoteBand2)
  heritageRows?: SchoolSplitRow[] | null; // Montessori, Armenian Heritage

  // Standalone centered wash-band quote + attribution line — see
  // `SchoolPullQuoteBand`'s own comment for why this isn't `about.pullQuote`.
  pullQuoteBand?: {
    quote: string;
    quoteHy: string | null;
    attribution: string;
    attributionHy: string | null;
  } | null;

  // A second, independent pull-quote band, rendered further down the page
  // (not adjacent to the first). Kept as its own field rather than turning
  // `pullQuoteBand` into an array — only one school so far needs two at
  // all, and every existing entry's single `pullQuoteBand` stays untouched.
  // First needed by Bethel Secondary School's Proverbs 22:6 verse band,
  // separate from its About-adjacent quote.
  pullQuoteBand2?: {
    quote: string;
    quoteHy: string | null;
    attribution: string;
    attributionHy: string | null;
  } | null;

  // "Our History" with a real archival photo — drop-cap lead paragraph,
  // then a sepia-toned photo (with its own caption) beside further
  // paragraphs. See `SchoolVintageBand`'s own comment for why this is a
  // distinct shape from `splitRows`/`WhiteChurchFeature`.
  vintageBand?: {
    eyebrow: string;
    eyebrowHy: string | null;
    heading: string;
    headingHy: string | null;
    leadParagraph: string;
    leadParagraphHy: string | null;
    photo: { src: string; alt: string; width: number; height: number };
    photoCaption: string | null;
    photoCaptionHy: string | null;
    paragraphs: string[];
    paragraphsHy: string[] | null;
  } | null;

  // Three-language academic-programme row (red-gradient boxes) with a
  // one-line intro above it. See `SchoolLanguages`'s own comment — no
  // existing chip/pill primitive matched this color-block treatment.
  // `eyebrow`/`heading`/`intro` are independently nullable — null renders
  // the bare language-box row alone, no header, no wash-band background.
  // First needed by Bethel Secondary School, whose lang-row sits embedded
  // inside its own "Academics" split-row section rather than as ACG's
  // separate standalone wash section.
  languages?: {
    eyebrow: string | null;
    eyebrowHy: string | null;
    heading: string | null;
    headingHy: string | null;
    intro: string | null;
    introHy: string | null;
    items: { label: string; labelHy: string | null }[];
  } | null;

  // Icon-badge event cards ("Science Exhibition," "Kermesse," etc.). `icon`
  // is a shared `IconSymbols` sprite id (e.g. "#ic-flask") — never an
  // uploaded image, since none of these events has a real photo/logo.
  events?: {
    eyebrow: string;
    eyebrowHy: string | null;
    heading: string;
    headingHy: string | null;
    items: {
      icon: string;
      title: string;
      titleHy: string | null;
      description: string;
      descriptionHy: string | null;
    }[];
  } | null;

  // Full scrollable gallery + click-to-enlarge lightbox. Reuses
  // `ChurchGalleryLightbox` verbatim (cross-imported, same shape as
  // `ChurchContent["gallery"]`) — no school has ever needed a real
  // multi-photo gallery before this unit, so there was no school-side
  // primitive to check first; the church one already does exactly this.
  gallery?: ChurchContent["gallery"];

  // Centered eyebrow/heading above a wrapping row of red-left-accent pill
  // tags (program names, no description). See `SchoolProgramChips`'s own
  // comment — ACG's mockup has the identical `.chips`/`.chip` CSS class
  // but never references it in markup (confirmed dead there); Bethel
  // Secondary School's mockup is the first to actually use it. Null/omitted
  // for every other school.
  programChips?: {
    eyebrow: string;
    eyebrowHy: string | null;
    heading: string;
    headingHy: string | null;
    items: string[];
  } | null;

  // Plain 2-card Vision/Mission row (or more than 2, if a future school
  // needs it) — see `SchoolVisionMission`'s own comment for why this isn't
  // `missionValues` or `mission`. First used by Bethel Secondary School.
  visionMission?: {
    eyebrow: string;
    eyebrowHy: string | null;
    heading: string;
    headingHy: string | null;
    cards: { title: string; titleHy: string | null; body: string; bodyHy: string | null }[];
  } | null;
};

export const schoolContent: Record<string, SchoolContent> = {
  "armenian-evangelical-college": {
    slug: "armenian-evangelical-college",

    masthead: {
      locationLine: "Mexique Street, Beirut, Lebanon",
      locationLineHy: null,
      established: "1923",
      establishedHy: null,
    },

    // Both files below are already tracked in public/ (from the schools
    // index build) and MD5-confirmed byte-identical to the source files in
    // Schools/Armenian Evangelical College/ — reused, not duplicated.
    logo: {
      src: "/school-armenian-evangelical-college-emblem.jpeg",
      alt: "Armenian Evangelical College seal",
    },
    heroPhoto: {
      src: "/school-armenian-evangelical-college.jpeg",
      alt: "Armenian Evangelical College building",
    },

    factsBar: [
      { label: "1923", labelHy: null, sub: "Founded", subHy: null },
      { label: "Secondary", labelHy: null, sub: "Grade Levels", subHy: null },
      { label: "Beirut", labelHy: null, sub: "Central District", subHy: null },
      { label: "Armenian Evangelical", labelHy: null, sub: "Tradition", subHy: null },
    ],

    about: {
      eyebrow: "The Institution",
      eyebrowHy: null,
      heading: "About the College",
      headingHy: null,
      paragraphs: [
        "The Armenian Evangelical College is the first Armenian secondary school established in the Diaspora following the Armenian Genocide. Founded to the glory of God and in service to succeeding generations of Armenians and Lebanese, the College remains steadfast in its commitment to academic excellence, Christian values, and community service.",
        "Today, the Armenian Evangelical College remains the only Armenian school located in Beirut's central administrative district, continuing its historic mission of educating Armenian and Lebanese youth.",
      ],
      paragraphsHy: null,
      pullQuote:
        "The first Armenian secondary school established in the Diaspora following the Armenian Genocide.",
      pullQuoteHy: null,
    },

    principalCard: {
      name: "Dr. Armen Urneshlian",
      nameHy: null,
      role: "Principal",
      roleHy: null,
      photo: {
        src: "/school-armenian-evangelical-college-principal.jpg",
        alt: "Dr. Armen Urneshlian",
      },
    },

    location: {
      addressLines: [
        "Mexique Street, Beirut, Lebanon",
        "Elizabeth Webb & Philibosian Buildings, Central District",
      ],
      addressLinesHy: null,
    },

    contactRows: [
      {
        key: "Principal's Office",
        keyHy: null,
        value: "principal@aecbeirut.edu.lb",
        valueHy: null,
        href: "mailto:principal@aecbeirut.edu.lb",
      },
      {
        key: "Secretary's Office",
        keyHy: null,
        value: "secretary@aecbeirut.edu.lb",
        valueHy: null,
        href: "mailto:secretary@aecbeirut.edu.lb",
      },
      {
        key: "Secretary",
        keyHy: null,
        value: "Vera Topakian",
        valueHy: null,
        href: null,
      },
    ],

    // Vice-Chair of the Council: no name found anywhere in the source .odt
    // — OPEN_QUESTIONS flagged, never guessed. Real photo confirmed genuine
    // (Nikon D500 EXIF, no AI-generation markers) for both other entries.
    leadership: [
      {
        name: "Dr. Armen Urneshlian",
        nameHy: null,
        role: "Principal",
        roleHy: null,
        photo: {
          src: "/school-armenian-evangelical-college-principal.jpg",
          alt: "Dr. Armen Urneshlian",
        },
      },
      {
        name: null,
        nameHy: null,
        role: "Chair of Council",
        roleHy: null,
        photo: null,
      },
      {
        name: "Vera Topakian",
        nameHy: null,
        role: "Secretary",
        roleHy: null,
        photo: {
          src: "/school-armenian-evangelical-college-secretary.jpg",
          alt: "Vera Topakian",
        },
      },
    ],

    directorsArchive: null,
    missionValues: null,
    supportServices: null,
    signaturePrograms: null,
    faithCommunity: null,

    mission: {
      eyebrow: "Our Mission",
      eyebrowHy: null,
      heading: "Three Principles of Education",
      headingHy: null,
      principles: [
        {
          title: "Well-Rounded Individuals",
          titleHy: null,
          description:
            "Forming well-rounded individuals through a comprehensive, multifaceted education that nurtures intellectual, personal, and social development.",
          descriptionHy: null,
        },
        {
          title: "National Responsibility",
          titleHy: null,
          description:
            "Fostering a strong sense of national responsibility by cultivating Armenian identity, awareness, and cultural consciousness.",
          descriptionHy: null,
        },
        {
          title: "Christian Character",
          titleHy: null,
          description:
            "Strengthening Christian character by transmitting and preserving the values and heritage of the Armenian Evangelical tradition.",
          descriptionHy: null,
        },
      ],
    },

    academicHeritage: {
      eyebrow: "A Century of Learning",
      eyebrowHy: null,
      heading: "Academic Heritage",
      headingHy: null,
      eras: [
        {
          period: "1921–1923",
          description:
            "Founded from Miss Elizabeth Webb's American high school for Armenian girls (1921) and, in October 1923, a new high school for boys with 56 students under Mr. Bedros Kardzayr — graduating its first class in 1927.",
          descriptionHy: null,
        },
        {
          period: "1933–1950",
          description:
            "Reorganized as The Armenian Evangelical High School for Boys and Girls under Miss Jenny Jilson, brought under the First Armenian Evangelical Church in 1943, and officially renamed the Armenian Evangelical College in 1950.",
          descriptionHy: null,
        },
        {
          period: "1952–1971",
          description:
            "Relocated to its present Mexique Street premises in the Elizabeth Webb Building (1952); the Yeprem and Martha Philibosian Building — home of AEC to this day — was inaugurated in 1971.",
          descriptionHy: null,
        },
        {
          period: "2023",
          description:
            "Celebrated its centennial with commemorative events in Beirut and Los Angeles, honoring a century of educational excellence, faith, and service.",
          descriptionHy: null,
        },
      ],
    },

    inquiry: {
      eyebrow: "Admissions & Enquiries",
      eyebrowHy: null,
      heading: "Make an Inquiry",
      headingHy: null,
      body: "Interested in the Armenian Evangelical College? Send us a message and our office will respond.",
      bodyHy: null,
      email: "secretary@aecbeirut.edu.lb",
      buttonLabel: "Email the College",
    },

    cta: {
      heading: "A Century of Faith & Learning",
      headingHy: null,
      body: "The Armenian Evangelical College remains committed to preserving the vision of its founders — quality education rooted in faith, values, and excellence — while embracing innovation for the generations to come.",
      bodyHy: null,
    },
  },

  "armenian-evangelical-shamlian-tatikian-secondary-school": {
    slug: "armenian-evangelical-shamlian-tatikian-secondary-school",

    masthead: {
      locationLine: "Bourj Hammoud, Beirut, Lebanon",
      locationLineHy: null,
      established: "1934",
      establishedHy: null,
      tagline: "Educating Bourj Hammoud's Armenians since 1934",
      taglineHy: null,
    },

    // Both already tracked in public/ from the schools index build. The two
    // files supplied for this rebuild are MD5-identical to what is already
    // committed, so they are reused rather than duplicated:
    //   logo.jpg                  91457a19... == school-shamlian-tatikian-emblem.jpg
    //   Shamelian School Hero.jpeg d048b275... == school-shamlian-tatikian.jpeg
    logo: {
      src: "/school-shamlian-tatikian-emblem.jpg",
      alt: "Shamlian-Tatikian Secondary School seal",
    },
    // Low-resolution source (640x393) — the only building photo supplied.
    // Used as-is rather than upscaled.
    heroPhoto: {
      src: "/school-shamlian-tatikian.jpeg",
      alt: "Armenian Evangelical Shamlian-Tatikian Secondary School",
    },

    factsBar: [
      { label: "1934", labelHy: null, sub: "Established", subHy: null },
      { label: "KG – Secondary", labelHy: null, sub: "Three Divisions", subHy: null },
      { label: "Bourj Hammoud", labelHy: null, sub: "Beirut, Lebanon", subHy: null },
      { label: "250", labelHy: null, sub: "Students", subHy: null },
    ],

    // All copy verbatim from the approved mockup
    // (design-reference/uaecne-school-shamlian-tatikian.html), which carries
    // the approved English text of "Arm. Evang. Sgamlian School - History.docx".
    about: {
      eyebrow: "Our Story",
      eyebrowHy: null,
      heading: "Our History",
      headingHy: null,
      paragraphs: [
        "The Armenian Evangelical Secondary School in Bourj Hammoud — known as the Shamlian-Tatikian Secondary School — is one of the four secondary schools owned and operated by the Union of the Armenian Evangelical Churches in the Near East. It stands in Bourj Hammoud, in the north-eastern suburbs of Beirut, and began its educational ministry in 1934 with kindergarten and elementary classes. Today it serves 250 students across its kindergarten, elementary, and secondary divisions.",
      ],
      paragraphsHy: null,
      pullQuote: null,
      pullQuoteHy: null,
      subsections: [
        {
          heading: "A Brief History",
          headingHy: null,
          paragraphs: [
            "Nor Marash — the first Armenian street in Beirut — was established in Bourj Hammoud in 1929, settled by Armenians who had come from Cilicia, Anatolia, and beyond in the years after the Armenian Genocide of 1915. As the quarter grew, its families were eager to raise cultural institutions and churches alongside their modest homes. Among the first schools to open in Beirut was the Armenian Evangelical School — at first a kindergarten and two elementary classes, its first branch in Achrafieh, established through the initiative of the Nor Marash Armenian Evangelical Church.",
            "Over the years the Armenian Evangelical Shamlian-Tatikian Secondary School grew into an independent institution, distinct from that original school of the 1930s. In 1936, Rev. Aram Hadidian expanded the elementary department to six grades; in 1950 he added the four intermediate grades; and in 1958 the secondary division received official accreditation from the Lebanese government.",
            "In 1964, through the generous gift of Mr. and Mrs. G. Shamlian and their son, Mr. G. Tatikian, the school built a modern new building — and took the name it carries today. Hundreds have since graduated and gone out across the world, and the school keeps an active alumni association in both Lebanon and the United States.",
          ],
          paragraphsHy: null,
        },
      ],
    },

    // Surname per the school's own history document. The supplied photo file
    // is named "Mrs. Kayane Messerian" — the mockup shows the document's
    // spelling and flags the conflict in `contactNote` below rather than
    // resolving it. Pending Union confirmation.
    principalCard: {
      name: "Mrs. Kayane Tunberian",
      nameHy: null,
      role: "Principal",
      roleHy: null,
      photo: {
        src: "/school-shamlian-tatikian-principal.jpeg",
        alt: "Mrs. Kayane Tunberian, Principal",
      },
    },

    // Only the district is known; no street address was supplied.
    location: {
      addressLines: ["Bourj Hammoud, Beirut, Lebanon"],
      addressLinesHy: null,
    },

    // Neither a phone number nor an email was supplied — rendered in the
    // reference's italic "pending" style, never invented.
    contactRows: [
      { key: "Phone", keyHy: null, value: "pending", valueHy: null, href: null, pending: true },
      { key: "Email", keyHy: null, value: "pending", valueHy: null, href: null, pending: true },
    ],

    contactNote:
      "Current principal's surname appears as “Tunberian” in the school's history document and as “Messerian” on the supplied photo — shown here as the document gives it, pending Union confirmation. Phone, email, and full street address were not supplied. Principal-succession spellings pending confirmation.",
    contactNoteHy: null,

    // The mockup's Leadership section carries exactly these two people — no
    // Vice-Chair is named in it, so none is rendered.
    leadership: [
      {
        name: "Mrs. Kayane Tunberian",
        nameHy: null,
        role: "Principal",
        roleHy: null,
        photo: {
          src: "/school-shamlian-tatikian-principal.jpeg",
          alt: "Mrs. Kayane Tunberian, Principal",
        },
      },
      {
        name: "Mrs. Tamar",
        nameHy: null,
        role: "Secretary",
        roleHy: null,
        photo: {
          src: "/school-shamlian-tatikian-secretary.jpeg",
          alt: "Mrs. Tamar, Secretary",
        },
      },
    ],

    // 14 names, verbatim from the mockup's archive panel. No years are given
    // for any of the thirteen past principals — the mockup renders an em dash
    // in that column, so `years` carries the same, never an invented date.
    directorsArchive: {
      eyebrow: "Archive",
      eyebrowHy: null,
      heading: "Principals of the School",
      headingHy: null,
      note: "Compiled from the school's record; English spellings to be confirmed.",
      noteHy: null,
      entries: [
        { name: "Mr. H. Boujikanian", nameHy: null, years: "—", note: null, noteHy: null, isCurrent: false },
        { name: "Mr. P. Yeghyayian", nameHy: null, years: "—", note: null, noteHy: null, isCurrent: false },
        { name: "Rev. Loutfi Haidostian", nameHy: null, years: "—", note: null, noteHy: null, isCurrent: false },
        { name: "Rev. Apraham Jizmejian", nameHy: null, years: "—", note: null, noteHy: null, isCurrent: false },
        { name: "Mrs. J. Merjanian", nameHy: null, years: "—", note: null, noteHy: null, isCurrent: false },
        { name: "Badveli Z. Ilanjian", nameHy: null, years: "—", note: null, noteHy: null, isCurrent: false },
        { name: "Rev. E. Darakjian", nameHy: null, years: "—", note: null, noteHy: null, isCurrent: false },
        { name: "Mr. Aram Boulghurjian", nameHy: null, years: "—", note: null, noteHy: null, isCurrent: false },
        { name: "Mr. Aram Sarkissian", nameHy: null, years: "—", note: null, noteHy: null, isCurrent: false },
        { name: "Mr. Yesayi Yesayian", nameHy: null, years: "—", note: null, noteHy: null, isCurrent: false },
        { name: "Rev. Mgerdich Karageuzian", nameHy: null, years: "—", note: null, noteHy: null, isCurrent: false },
        { name: "Rev. Hrayr Cholakian", nameHy: null, years: "—", note: null, noteHy: null, isCurrent: false },
        { name: "Miss Vartoug Balekjian", nameHy: null, years: "—", note: null, noteHy: null, isCurrent: false },
        { name: "Mrs. Kayane Tunberian", nameHy: null, years: "Present", note: null, noteHy: null, isCurrent: true },
      ],
    },

    mission: null,

    academicHeritage: {
      eyebrow: "Curriculum",
      eyebrowHy: null,
      heading: "Academic Life",
      headingHy: null,
      eras: [
        {
          period: "Lebanese National Curriculum",
          description: "The school follows the official Lebanese government curriculum set by the Ministry of Education.",
          descriptionHy: null,
        },
        {
          period: "Kindergarten to Secondary",
          description: "A full journey across the kindergarten, elementary, and secondary divisions.",
          descriptionHy: null,
        },
        {
          period: "Accredited Secondary · 1958",
          description: "The secondary division has held official Lebanese government accreditation since 1958.",
          descriptionHy: null,
        },
        {
          period: "Armenian Language & History",
          description: "Armenian language and history are taught throughout, to preserve the students' Armenian identity.",
          descriptionHy: null,
        },
      ],
    },

    missionValues: null,
    supportServices: null,
    signaturePrograms: null,

    // No photographs exist for any of these four scenes — each renders the
    // shared "Photo pending" frame, exactly as the mockup shows.
    faithCommunity: {
      heading: "Faith & Community",
      headingHy: null,
      items: [
        {
          title: "Daily Morning Chapel",
          titleHy: null,
          description: "As a faith-based school, every day begins with worship in the morning chapel.",
          descriptionHy: null,
          photo: null,
        },
        {
          title: "Bible & Christian Formation",
          titleHy: null,
          description: "The Christian curriculum includes the teaching of the Bible, alongside spiritual retreats for the students.",
          descriptionHy: null,
          photo: null,
        },
        {
          title: "Armenian Identity",
          titleHy: null,
          description: "Armenian language and history are woven through school life, keeping students rooted in their heritage.",
          descriptionHy: null,
          photo: null,
        },
        {
          title: "An Alumni Family",
          titleHy: null,
          description: "Graduates span the world; the school's alumni associations in Lebanon and the United States keep the family close.",
          descriptionHy: null,
          photo: null,
        },
      ],
      closingNote: null,
      closingNoteHy: null,
    },

    // No verified email exists for this school — Inquiry section omitted
    // entirely rather than guessing an address.
    inquiry: null,

    // The approved mockup has no CTA band at all. `cta` is now nullable
    // (see the type above) specifically for this case — no invented
    // house-style copy, no leftover prior-build text.
    cta: null,
  },

  "armenian-evangelical-secondary-school-anjar": {
    slug: "armenian-evangelical-secondary-school-anjar",

    // Founding-year conflict, not resolved here (see OPEN_QUESTIONS): AESSA's
    // own source doc and its own approved design mockup both say 1942
    // ("Established: 1942"). The already-committed Anjar CHURCH page states
    // the church was "founded in 1941, one year after the Armenian
    // Evangelical School of Anjar" — implying ~1940. Using AESSA's own
    // stated year here since it's this school's own primary source; the
    // church page is untouched.
    masthead: {
      locationLine: "Anjar, Bekaa Valley, Lebanon",
      locationLineHy: null,
      established: "1942",
      establishedHy: null,
    },

    // Already tracked in public/ (schools index build), MD5-confirmed
    // byte-identical to "Arm Evan Sec School Anjar Logo.jpg" — reused, not
    // duplicated.
    logo: {
      src: "/school-anjar-emblem.jpg",
      alt: "Armenian Evangelical Secondary School of Anjar seal",
    },
    // No building photo exists anywhere in the source folder (confirmed:
    // logo + 3 program-logo images + 2 staff headshots only) — renders the
    // arched photo-pending fallback in SchoolTopBlock (template amendment A).
    heroPhoto: null,

    factsBar: [
      { label: "1942", labelHy: null, sub: "Founded", subHy: null },
      { label: "KG – Secondary", labelHy: null, sub: "Ages 3–18", subHy: null },
      { label: "Anjar, Bekaa", labelHy: null, sub: "Location", subHy: null },
      { label: "Armenian Evangelical", labelHy: null, sub: "Tradition", subHy: null },
    ],

    // Verbatim from design-reference/uaecne-school-anjar-FULL.html's About
    // section (the full-page reference, supersedes the earlier partial
    // build) — two paragraphs: opening quote + tagline sentence, then the
    // four-fold mission statement.
    about: {
      eyebrow: "The Institution",
      eyebrowHy: null,
      heading: "About the School",
      headingHy: null,
      paragraphs: [
        "“Accepted and Appreciated, Valued and Respected” — the Armenian Evangelical Secondary School of Anjar (AESSA) provides a nurturing environment where children are supported in their growth and loved. The school where education meets innovation and inclusion, AESSA serves the children of Anjar and the Bekaa Valley.",
        "Its mission is four-fold: to provide a safe environment for children in need of social, psychological, and medical support; to deliver educational care through an inclusive and high-quality academic program; to engage children in the Armenian and Lebanese community; and to instill Christian values and a personal relationship with God.",
      ],
      paragraphsHy: null,
      pullQuote: "We plant seeds, but harvest responsibility, identity, and hope.",
      pullQuoteHy: null,
    },

    // Role label is "School Director" (his real title everywhere in the
    // source), not the generic "Principal" — the field was already
    // per-school free text, no type change needed (template amendment B
    // turned out to require no code change; see report). Photo reused
    // verbatim from the Anjar CHURCH's own tracked file (MD5-identical) —
    // not re-imported.
    principalCard: {
      name: "Rev. Hagop Akbasharian",
      nameHy: null,
      role: "School Director",
      roleHy: null,
      photo: {
        src: "/church-armenian-evangelical-church-anjar-leader-1.jpg",
        alt: "Rev. Hagop Akbasharian",
      },
    },

    // Verbatim from uaecne-school-anjar-FULL.html's Contact section. Real
    // values: location, Secretary (Ms. Sevan Apelian, matching the church's
    // own board secretary). Phone and email are honestly unverified — the
    // reference itself shows them as "Pending," not a fabricated number or
    // address — rendered in the italic pending style, never invented.
    location: {
      addressLines: ["Anjar, Bekaa Valley, Lebanon"],
      addressLinesHy: null,
    },
    contactRows: [
      { key: "Phone", keyHy: null, value: "Pending", valueHy: null, href: null, pending: true },
      { key: "Email", keyHy: null, value: "Pending", valueHy: null, href: null, pending: true },
      {
        key: "Secretary",
        keyHy: null,
        value: "Ms. Sevan Apelian",
        valueHy: null,
        href: null,
      },
    ],

    leadership: [
      {
        name: "Rev. Hagop Akbasharian",
        nameHy: null,
        role: "School Director",
        roleHy: null,
        photo: {
          src: "/church-armenian-evangelical-church-anjar-leader-1.jpg",
          alt: "Rev. Hagop Akbasharian",
        },
      },
      { name: null, nameHy: null, role: "Chair of Council", roleHy: null, photo: null },
      {
        name: "Ms. Sevan Apelian",
        nameHy: null,
        role: "Secretary",
        roleHy: null,
        photo: {
          src: "/church-armenian-evangelical-church-anjar-leader-4.jpg",
          alt: "Ms. Sevan Apelian",
        },
      },
    ],

    // Directors Archive — reuses the church SuccessionList component
    // directly (rendered from src/app/schools/[slug]/page.tsx), since it
    // already handles exactly this mix of verified-English and
    // verified-Armenian-only names. Source: "Armenian Evangelical Secondary
    // School Anjar (1).docx" (Armenian text, verbatim) cross-checked against
    // the school's own approved mockup. All 7 English spellings are now
    // Yeghia-verified (2026-08-21) — names 2-5 were initially withheld
    // pending confirmation (the mockup itself flagged them "to be
    // confirmed"), now supplied directly and reconciled with the Anjar
    // church's own succession list (see churchContent.ts's Sarmazian/
    // Balabanian entries, updated alongside this one). nameHy kept for all
    // 7 from the docx's own verbatim Armenian.
    directorsArchive: {
      eyebrow: "Archive",
      eyebrowHy: null,
      heading: "Directors of the Armenian Evangelical School of Anjar",
      headingHy: null,
      note: "Directors of the school since 1947.",
      noteHy: null,
      entries: [
        {
          name: "Sister Hedwig Äenishänslin",
          nameHy: "Քոյր Հետուիկ Էնիսհէնսլին",
          years: "1947 – 1971",
          note: null,
          noteHy: null,
          isCurrent: false,
        },
        {
          name: "Rev. Hagop Janbazian",
          nameHy: "Վեր. Յակոբ Ճանպազեան",
          years: "1971 – 1975",
          note: null,
          noteHy: null,
          isCurrent: false,
        },
        {
          name: "Rev. Manasé Shnorhokian",
          nameHy: "Վեր. Մանասէ Շնորհոքեան",
          years: "1975 – 1976",
          note: null,
          noteHy: null,
          isCurrent: false,
        },
        {
          // Matches the Anjar church's own succession entry for this
          // person, updated to the same confirmed English spelling — see
          // churchContent.ts.
          name: "Rev. Hovhannes Sarmazian",
          nameHy: "Վեր. Յովհաննէս Սարմազեան",
          years: "1976 – 1990",
          note: null,
          noteHy: null,
          isCurrent: false,
        },
        {
          // Matches the Anjar church's own succession entry for this
          // person, updated to the same confirmed English spelling — see
          // churchContent.ts.
          name: "Rev. Nerses Balabanian",
          nameHy: "Վեր. Ներսէս Պալապանեան",
          years: "1990 – 1998",
          note: null,
          noteHy: null,
          isCurrent: false,
        },
        {
          name: "Rev. Raffi Messerlian",
          nameHy: "Վեր. Րաֆֆի Մըսրլեան",
          years: "1998 – 2014",
          note: null,
          noteHy: null,
          isCurrent: false,
        },
        {
          name: "Rev. Hagop Akbasharian",
          nameHy: "Վեր. Յակոբ Աքպաշարեան",
          years: "2014 – present",
          note: null,
          noteHy: null,
          isCurrent: true,
        },
      ],
    },

    // AEC-style icon-arch mission not used for this school — see
    // `missionValues` below (AESSA's own shape: quote + icon-less cards).
    mission: null,

    // Verbatim from the docx's "Academic Excellence & Innovation" section.
    // Reuses the same SchoolAcademics component as AEC — the pill just
    // holds a theme label here instead of a date range, a content
    // difference the component doesn't care about. The reference's
    // decorative side-crest SVG is intentionally not reproduced (no
    // informational value); the standard eyebrow+heading header is kept
    // instead of the reference's bare `<h3>`, for site-wide consistency.
    academicHeritage: {
      eyebrow: "Academic Excellence",
      eyebrowHy: null,
      heading: "Academic Excellence & Innovation",
      headingHy: null,
      eras: [
        {
          period: "Four Cycles of Education",
          description:
            "We offer a complete educational journey from Kindergarten through Secondary levels for students aged three to eighteen.",
          descriptionHy: null,
        },
        {
          period: "Trilingual Environment",
          description:
            "Our curriculum is delivered in a trilingual format to prepare students for a global future.",
          descriptionHy: null,
        },
        {
          period: "VEX Robotics",
          description:
            "AESSA is a leader in innovation, with our elementary division recently ranking second in the national VEX Robotics competition.",
          descriptionHy: null,
        },
        {
          period: "School of Peace Education",
          description:
            "We integrate peace education into our classes, encouraging students to say “no to war, yes to life” through hands-on activities and symbolic displays.",
          descriptionHy: null,
        },
      ],
    },

    // "Our Mission & Philosophy" — verbatim from the docx/reference. Intro
    // quote + 4 icon-less value cards (new shape, see `missionValues` type
    // comment — does not reuse the icon-arch `mission` field above).
    missionValues: {
      eyebrow: "Purpose",
      eyebrowHy: null,
      heading: "Our Mission & Philosophy",
      headingHy: null,
      quote:
        "“Accepted and Appreciated, Valued and Respected” — AESSA provides a nurturing environment where children are supported in their growth and loved.",
      quoteHy: null,
      values: [
        {
          title: "Safe Environment",
          titleHy: null,
          description:
            "Provide a safe environment for children in need of social, psychological, and medical support.",
          descriptionHy: null,
        },
        {
          title: "Educational Care",
          titleHy: null,
          description:
            "Deliver educational care through an inclusive and high-quality academic program.",
          descriptionHy: null,
        },
        {
          title: "Engage Children",
          titleHy: null,
          description:
            "Engage children in the Armenian and Lebanese community by empowering them and teaching cultural values and heritage.",
          descriptionHy: null,
        },
        {
          title: "Christian Values",
          titleHy: null,
          description:
            "Instill Christian values and a personal relationship with God through sharing His love and grace.",
          descriptionHy: null,
        },
      ],
    },

    // "Inclusive Support Services" — verbatim. Healing Harbour and Boarding
    // Home both use their real logo files (MD5-confirmed, copied to
    // public/); PEP has no real logo file anywhere in the source folder,
    // so it uses a generic IconSymbols icon instead — never invented.
    supportServices: {
      heading: "Inclusive Support Services",
      headingHy: null,
      items: [
        {
          // Renamed from "Boarding Shelter" — the school's own real logo
          // file ("Armenian Evangelical boarding Home Logo.jpeg") confirms
          // "Boarding Home" is the institution's actual name. Kept as
          // "Boarding Home" even though uaecne-school-anjar-FULL.html
          // (2026-08-21) still labels this card "Boarding Shelter" — a
          // printed logo is a stronger source than a mockup label written
          // before the real logo file was located; flagged in
          // OPEN_QUESTIONS in case this reading is wrong.
          title: "Boarding Home",
          titleHy: null,
          description:
            "A sanctuary (est. 1947) for orphans and children from unsafe environments or victims of violence, ensuring they receive proper care and education regardless of their financial status.",
          descriptionHy: null,
          logo: {
            src: "/school-aessa-boarding-home-logo.jpeg",
            alt: "Armenian Evangelical Boarding Home logo",
          },
          icon: null,
        },
        {
          title: "Personalized Educational Program (PEP)",
          titleHy: null,
          description:
            "A specialized curriculum tailored to the needs of students with special needs, supported by dedicated resource centers.",
          descriptionHy: null,
          logo: null,
          icon: "ic-book",
        },
        {
          title: "Healing Harbour",
          titleHy: null,
          description:
            "A dedicated mental health center focusing on the psychological well-being of our community.",
          descriptionHy: null,
          logo: {
            src: "/school-aessa-healing-harbour-logo.jpeg",
            alt: "Healing Harbour logo",
          },
          icon: null,
        },
      ],
    },

    // "Signature Programs" — verbatim. WeNEEDle uses its real logo file
    // (MD5-confirmed); Seeds of Hope and Student Life & Clubs have no real
    // logo file, so they use a generic mark instead.
    signaturePrograms: {
      heading: "Signature Programs",
      headingHy: null,
      items: [
        {
          name: "Seeds of Hope",
          nameHy: null,
          note: "(Agroecology)",
          noteHy: null,
          description:
            "This unique program transforms theoretical education into practice. Students spend one period a week in the classroom and another with “hands-on” experience in our functional greenhouses. The program uses interactive e-curricula and e-books to teach sustainable farming, composting, and environmental responsibility in Western Armenian.",
          descriptionHy: null,
          logo: null,
          icon: "ic-leaf",
        },
        {
          name: "WeNEEDle",
          nameHy: null,
          note: "& Creative Arts",
          noteHy: null,
          description:
            "Our students engage in traditional needling, embroidery, mosaic-making, and cooking, preserving our cultural identity while developing practical skills.",
          descriptionHy: null,
          logo: {
            src: "/school-aessa-weneedle-logo.jpg",
            alt: "WeNEEDle logo",
          },
          icon: null,
        },
        {
          name: "Student Life",
          nameHy: null,
          note: "& Clubs",
          noteHy: null,
          description:
            "We foster talent through our student band, sound group, and various clubs, including sports, environment, and chess.",
          descriptionHy: null,
          logo: null,
          icon: "ic-leaf",
        },
      ],
    },

    // "Faith & Community" — verbatim, including "Our Team" (the "staff of
    // 38" detail isn't shown anywhere else on the page). None of the 4
    // scenes have a real photo anywhere in the source — all four render
    // the "photo pending" fallback.
    faithCommunity: {
      heading: "Faith & Community",
      headingHy: null,
      items: [
        {
          title: "Daily Devotion",
          titleHy: null,
          description:
            "Every day begins with prayer in our morning chapels, where we worship through singing hymns and listening to the Word.",
          descriptionHy: null,
          photo: null,
        },
        {
          title: "Traditions & Celebrations",
          titleHy: null,
          description:
            "Our calendar is filled with meaningful events, including Christmas programs, Easter celebrations, and Mother's Day tributes.",
          descriptionHy: null,
          photo: null,
        },
        {
          title: "Community Impact",
          titleHy: null,
          description:
            "AESSA benefits over 200 families annually, promoting healthy eating habits and social responsibility.",
          descriptionHy: null,
          photo: null,
        },
        {
          title: "Our Team",
          titleHy: null,
          description:
            "Led by School Director and Pastor Rev. Hagop Akbasharian, our staff of 38 dedicated professionals equips tomorrow's leaders.",
          descriptionHy: null,
          photo: null,
        },
      ],
      closingNote:
        "Partnership & Gratitude — together with our global partners, we share blessings and experience God's grace in action.",
      closingNoteHy: null,
    },

    // The reference (uaecne-school-anjar-FULL.html) shows a "Make an
    // Inquiry" section, but its own button has no real destination
    // (href="#") — the SAME file's own Contact card admits "Email:
    // Pending." Building a working mailto button would mean inventing an
    // address that doesn't exist. Kept omitted, same as Shamlian-Tatikian
    // (project rule 7) — flagged in OPEN_QUESTIONS for Yeghia's ruling once
    // a real school email exists.
    inquiry: null,

    // Verbatim from uaecne-school-anjar-FULL.html's CTA section.
    cta: {
      heading: "A Legacy of Learning in Anjar",
      headingHy: null,
      body: "Since 1942, the Armenian Evangelical Secondary School of Anjar has planted seeds of faith, knowledge, and hope — equipping generations of children under the Union of the Armenian Evangelical Churches in the Near East.",
      bodyHy: null,
    },
  },

  // Aleppo College for Girls (Syria) — the first non-Lebanon school built,
  // and the first to use the additive "magazine" fields below. Verbatim
  // from design-reference/uaecne-school-aleppo-college-girls.html
  // throughout, including all contact details.
  "aleppo-college-for-girls": {
    slug: "aleppo-college-for-girls",

    // The mockup's own masthead line carries two founding facts ("Girls'
    // Section founded 1923 · roots in Aintab, 1876"), more than the fixed
    // "{locationLine} · Founded {established}" template can hold in one
    // field — kept simple here (1923, the Girls' Section's own founding,
    // matching the facts-bar cell below) since the Aintab/1876 lineage is
    // fully carried, verbatim, by the facts bar's own first cell and the
    // About/History prose. No 1923-vs-1924 conflict exists anywhere in the
    // verified source — every mention (masthead, facts bar, footer) says
    // 1923; flagged in OPEN_QUESTIONS in case a different source was meant.
    masthead: {
      locationLine: "Taha Hussein Street, Aleppo, Syria",
      locationLineHy: null,
      established: "1923",
      establishedHy: null,
    },

    // Real ACG seal, used as approved by Yeghia directly ("use the emblems
    // as is, they are all approved") despite its AI-generated-style
    // appearance (flagged transparently in OPEN_QUESTIONS for the record,
    // not withheld).
    logo: {
      src: "/school-aleppo-college-for-girls-emblem.png",
      alt: "Aleppo College for Girls logo",
    },
    heroPhoto: {
      src: "/school-aleppo-college-for-girls-hero.jpg",
      alt: "Aleppo College for Girls campus",
    },

    factsBar: [
      { label: "1876", labelHy: null, sub: "Founded (Aintab)", subHy: null },
      { label: "1923", labelHy: null, sub: "Girls' Section, Aleppo", subHy: null },
      { label: "Grades 7–12", labelHy: null, sub: "Today", subHy: null },
      { label: "3 Languages", labelHy: null, sub: "EN · AR · FR", subHy: null },
    ],

    // Required field, kept populated (same real text as `introFeature`
    // below, verbatim) for data parity even though `<SchoolAbout>` is not
    // rendered for this school — see `introFeature`'s own comment on the
    // type for why. `pullQuote` stays null here: the mockup's real pull
    // quote is a separate standalone wash-band (`pullQuoteBand` below),
    // not this field's inline-after-paragraphs rendering.
    about: {
      eyebrow: "The School",
      eyebrowHy: null,
      heading: "A School with a Living Heritage",
      headingHy: null,
      paragraphs: [
        "The Aleppo College for Girls carries one of the oldest and proudest names in Armenian Evangelical education. Its story begins not in Aleppo but in Aintab, where in 1876 the American Board of Commissioners for Foreign Missions founded the Central Turkey College to serve the region's large Christian Armenian population.",
        "In 1923, the Girls' Section was established in Aleppo, continuing that mission on new soil. Today it stands on Taha Hussein Street — girls' and boys' sections divided by a stone wall — under the sponsorship of the Armenian Evangelical Educational Council of Syria, and continues its unbroken work with devotion.",
      ],
      paragraphsHy: null,
      pullQuote: null,
      pullQuoteHy: null,
    },

    // No principal card beside About in this mockup — the Principal
    // appears once, in the Leadership grid below.
    principalCard: null,

    // "Our Location" card. The mockup's P.O. Box appears as a second line
    // within the same card (its own separate `.crow` row, not a second
    // address block) — folded into `addressLines` here since
    // SchoolContactSection's location card renders one address block, not
    // a distinct P.O.-Box row type; both lines are real, verbatim facts.
    location: {
      addressLines: ["Taha Hussein Street, Aleppo, Syria", "P.O. Box 3833"],
      addressLinesHy: null,
    },

    // All verified, real (not pending) — P.O. Box, phones, fax, email,
    // Facebook, and Instagram straight from the mockup's own Contact
    // section. Facebook/Instagram reuse the shared `ic-fb`/new `ic-ig`
    // IconSymbols ids via SchoolContactSection's ROW_ICON map, extended
    // this unit (Fax/Facebook/Instagram added) — the first school contact
    // card to need them.
    contactRows: [
      {
        key: "Phone",
        keyHy: null,
        value: "+963 21 2 687 502 · +963 21 2 687 520",
        valueHy: null,
        href: null,
      },
      {
        key: "Fax",
        keyHy: null,
        value: "+963 21 2 641 145",
        valueHy: null,
        href: null,
      },
      {
        key: "Email",
        keyHy: null,
        value: "acg.aleppo.college@gmail.com",
        valueHy: null,
        href: "mailto:acg.aleppo.college@gmail.com",
      },
      {
        key: "Facebook",
        keyHy: null,
        value: "ACG — Aleppo College for Girls",
        valueHy: null,
        href: "https://m.facebook.com/406116339489727",
      },
      {
        key: "Instagram",
        keyHy: null,
        value: "acg.aleppo",
        valueHy: null,
        href: "https://instagram.com/acg.aleppo",
      },
    ],

    // Exactly 2 cards, matching the mockup's own `.lead-grid` (Principal,
    // Secretary) — no third "Vice-Chair of the Council" card invented; the
    // other 3 schools' fixed-3-card pattern isn't a hard requirement of
    // `SchoolLeadershipGrid`, which simply maps whatever array it's given.
    // Both spellings (Tamar Soghoyan, Elma Khachadurian) are shown as
    // supplied, pending Union confirmation per the mockup's own footer
    // note — flagged again in OPEN_QUESTIONS.
    leadership: [
      {
        name: "Miss Tamar Soghoyan",
        nameHy: null,
        role: "Principal",
        roleHy: null,
        photo: {
          src: "/school-aleppo-college-for-girls-principal.jpg",
          alt: "Miss Tamar Soghoyan",
        },
      },
      {
        name: "Mrs. Elma Khachadurian",
        nameHy: null,
        role: "Secretary",
        roleHy: null,
        photo: {
          src: "/school-aleppo-college-for-girls-secretary.jpg",
          alt: "Mrs. Elma Khachadurian",
        },
      },
    ],

    directorsArchive: null,
    mission: null,
    missionValues: null,
    academicHeritage: null,
    supportServices: null,
    signaturePrograms: null,
    faithCommunity: null,

    // No "Make an Inquiry" section exists in this mockup (unlike AEC) —
    // the Contact card's real mailto already covers enquiries; omitted
    // rather than invented.
    inquiry: null,

    cta: {
      heading: "Educating Generations Since 1876",
      headingHy: null,
      body: "From its founding in Aintab to its enduring work in Aleppo, the Aleppo College for Girls continues to nurture minds and character — a proud institution of the Armenian Evangelical Educational Council of Syria, within the Union of the Armenian Evangelical Churches in the Near East.",
      bodyHy: null,
    },

    // About/Intro woven row — rendered via `WhiteChurchFeature` with
    // `reverse` (text-left/photo-right) in place of `<SchoolAbout>` for
    // this school; see page.tsx's own comment for why. Photo is the
    // classroom scene the mockup itself uses for this row (not the hero
    // photo, which is reused only in the Gallery).
    introFeature: {
      eyebrow: "The School",
      eyebrowHy: null,
      heading: "A School with a Living Heritage",
      headingHy: null,
      paragraphs: [
        "The Aleppo College for Girls carries one of the oldest and proudest names in Armenian Evangelical education. Its story begins not in Aleppo but in Aintab, where in 1876 the American Board of Commissioners for Foreign Missions founded the Central Turkey College to serve the region's large Christian Armenian population.",
        "In 1923, the Girls' Section was established in Aleppo, continuing that mission on new soil. Today it stands on Taha Hussein Street — girls' and boys' sections divided by a stone wall — under the sponsorship of the Armenian Evangelical Educational Council of Syria, and continues its unbroken work with devotion.",
      ],
      paragraphsHy: null,
      photo: {
        src: "/school-aleppo-college-for-girls-classroom.jpg",
        alt: "A lesson in progress at Aleppo College for Girls",
        width: 5472,
        height: 3648,
      },
    },

    // The 4 "Student Life" woven rows (Science, Technology, Library,
    // Beyond the Classroom). All 4 use `reverse: false` — including
    // Technology and Beyond the Classroom, whose mockup markup uses a
    // `.split.rev` class. Verified from the mockup's own CSS
    // (`.split.rev .txt{order:2}.split.rev .ph{order:1}`): that override
    // forces photo-left/text-right for `.rev` rows too, identical to the
    // non-`.rev` rows' natural DOM order — so all 4 rows render the SAME
    // visual layout (photo left, text right) in the source, and
    // `reverse: false` (WhiteChurchFeature's own photo-left default) is
    // the correct match for every one of them, not an inconsistency.
    splitRows: [
      {
        eyebrow: "Science",
        eyebrowHy: null,
        heading: "In the Laboratory",
        headingHy: null,
        paragraphs: [
          "In the science laboratories, students move from the page to the microscope — examining specimens, exploring anatomy, and testing what they learn with their own hands. Discovery is treated not as a subject to memorize, but as a habit to practise.",
          "The school's annual student science exhibition gives that curiosity a stage, where the girls present their own investigations to the wider community.",
        ],
        paragraphsHy: null,
        photo: {
          src: "/school-aleppo-college-for-girls-microscope.jpg",
          alt: "A student at the microscope",
          width: 5472,
          height: 3648,
        },
        reverse: false,
        dropcapFirst: false,
      },
      {
        eyebrow: "Technology",
        eyebrowHy: null,
        heading: "In the Computer Lab",
        headingHy: null,
        paragraphs: [
          "Alongside the sciences, students build the digital skills a modern education demands — working through the computer lab in small, focused groups, learning together as they go.",
          "It is one more way the school keeps pace with a changing world while holding to its founding standards.",
        ],
        paragraphsHy: null,
        photo: {
          src: "/school-aleppo-college-for-girls-computer-lab.jpg",
          alt: "Students working in the computer lab",
          width: 5472,
          height: 3648,
        },
        reverse: false,
        dropcapFirst: false,
      },
      {
        eyebrow: "The Library",
        eyebrowHy: null,
        heading: "A Room Full of Years",
        headingHy: null,
        paragraphs: [
          "The school's library is among its quiet treasures — wooden shelves lined with decades of volumes, including English and American literature collections gathered across the college's long history.",
          "Here students read, research, and sit with books that have passed through many hands before theirs — a tangible link to the generations who studied in these same rooms.",
        ],
        paragraphsHy: null,
        photo: {
          src: "/school-aleppo-college-for-girls-library.jpg",
          alt: "The school library",
          width: 5472,
          height: 3648,
        },
        reverse: false,
        dropcapFirst: false,
      },
      {
        eyebrow: "Beyond the Classroom",
        eyebrowHy: null,
        heading: "Field, Garden & Community",
        headingHy: null,
        paragraphs: [
          "Learning at Aleppo College reaches well past the classroom walls. On the school's wide green sports field, students play and compete; in the grounds, they gather each season to harvest the campus olive trees — a small tradition that ties them to the land and to one another.",
          "Together with the assembly hall's events, these moments build the fellowship and character the school has always valued.",
        ],
        paragraphsHy: null,
        photo: {
          src: "/school-aleppo-college-for-girls-sports.jpg",
          alt: "Students on the sports field",
          width: 5472,
          height: 3648,
        },
        reverse: false,
        dropcapFirst: false,
      },
    ],

    pullQuoteBand: {
      quote:
        "From Aintab to Aleppo, the school has never ceased its work — preserving a high standard of learning, and improving year after year.",
      quoteHy: null,
      attribution: "The Aleppo College for Girls",
      attributionHy: null,
    },

    vintageBand: {
      eyebrow: "Our History",
      eyebrowHy: null,
      heading: "From the Central Turkey College",
      headingHy: null,
      leadParagraph:
        "Founded in Aintab between 1874 and 1876 as the Central Turkey College, the institution was established within the Ottoman Empire by the American Board of Commissioners for Foreign Missions (ABCFM). Aleppo College granted tenth-grade high-school diplomas, and until 1964 offered eleventh- and twelfth-grade freshman and sophomore courses in the arts, engineering, and medicine — a remarkable breadth for its time.",
      leadParagraphHy: null,
      photo: {
        src: "/school-aleppo-college-for-girls-vintage.jpg",
        alt: "Students of Aleppo College for Girls, earlier generations",
        width: 1080,
        height: 719,
      },
      photoCaption: "Earlier generations of students — from the school's archives.",
      photoCaptionHy: null,
      paragraphs: [
        "Through revolutions of history and generations of change, the Girls' Section carried its founders' vision forward in Aleppo. What began as a mission college became a cornerstone of Armenian learning and identity in Syria.",
        "The school sustains that inheritance today through a specialist teaching staff and a tireless team — maintaining a high standard of education and improving its quality year after year, a bridge between a proud past and a hopeful future.",
      ],
      paragraphsHy: null,
    },

    languages: {
      eyebrow: "Academics",
      eyebrowHy: null,
      heading: "Three Languages, One Curriculum",
      headingHy: null,
      intro:
        "Grades 7 through 12 follow the Syrian Ministry of Education's national programme, taught across three languages:",
      introHy: null,
      items: [
        { label: "English", labelHy: null },
        { label: "Arabic", labelHy: null },
        { label: "French", labelHy: null },
      ],
    },

    // Icons: #ic-flask and #ic-cart are new this unit; #ic-heart already
    // existed in the shared IconSymbols sprite.
    events: {
      eyebrow: "Through the Year",
      eyebrowHy: null,
      heading: "Life at the College",
      headingHy: null,
      items: [
        {
          icon: "#ic-flask",
          title: "Science Exhibition",
          titleHy: null,
          description: "An annual student showcase of investigations and experiments.",
          descriptionHy: null,
        },
        {
          icon: "#ic-cart",
          title: "Kermesse",
          titleHy: null,
          description: "The school's traditional fair, bringing the community together.",
          descriptionHy: null,
        },
        {
          icon: "#ic-heart",
          title: "Charity Bazaar",
          titleHy: null,
          description: "A charitable sale-and-exhibition in the spirit of service.",
          descriptionHy: null,
        },
      ],
    },

    // 13 photos, verbatim alt text from the mockup's own gallery figures.
    // 7 of these (Campus building, Classroom lesson, Microscope work,
    // Computer lab, Library, Sports field, Vintage class photo) reuse the
    // exact same source files already used above (About/Science/Technology/
    // Library/Beyond-the-Classroom/History) — the mockup's own gallery
    // duplicates them too (confirmed by MD5-matching the mockup's 23
    // embedded images down to 16 distinct files). The other 6 are gallery-
    // only photos with no other home on the page.
    gallery: {
      eyebrow: "Gallery",
      eyebrowHy: null,
      heading: "Life at Aleppo College for Girls",
      headingHy: null,
      photos: [
        {
          src: "/school-aleppo-college-for-girls-hero.jpg",
          alt: "Campus building",
          caption: null,
          captionHy: null,
        },
        {
          src: "/school-aleppo-college-for-girls-classroom.jpg",
          alt: "Classroom lesson",
          caption: null,
          captionHy: null,
        },
        {
          src: "/school-aleppo-college-for-girls-microscope.jpg",
          alt: "Microscope work",
          caption: null,
          captionHy: null,
        },
        {
          src: "/school-aleppo-college-for-girls-gallery-anatomy.jpg",
          alt: "Anatomy lesson",
          caption: null,
          captionHy: null,
        },
        {
          src: "/school-aleppo-college-for-girls-computer-lab.jpg",
          alt: "Computer lab",
          caption: null,
          captionHy: null,
        },
        {
          src: "/school-aleppo-college-for-girls-gallery-group-computer.jpg",
          alt: "Group computer work",
          caption: null,
          captionHy: null,
        },
        {
          src: "/school-aleppo-college-for-girls-library.jpg",
          alt: "Library",
          caption: null,
          captionHy: null,
        },
        {
          src: "/school-aleppo-college-for-girls-gallery-reading.jpg",
          alt: "Reading in the library",
          caption: null,
          captionHy: null,
        },
        {
          src: "/school-aleppo-college-for-girls-sports.jpg",
          alt: "Sports field",
          caption: null,
          captionHy: null,
        },
        {
          src: "/school-aleppo-college-for-girls-gallery-olive-harvest.jpg",
          alt: "Olive harvest",
          caption: null,
          captionHy: null,
        },
        {
          src: "/school-aleppo-college-for-girls-gallery-heritage-classroom.jpg",
          alt: "Heritage classroom",
          caption: null,
          captionHy: null,
        },
        {
          src: "/school-aleppo-college-for-girls-gallery-gate.jpg",
          alt: "School gate and signage",
          caption: null,
          captionHy: null,
        },
        {
          src: "/school-aleppo-college-for-girls-vintage.jpg",
          alt: "Vintage class photo",
          caption: null,
          captionHy: null,
        },
      ],
    },
  },

  // Armenian Evangelical Bethel Secondary School (Aleppo, Syria) — 2nd
  // Syria school, verbatim from design-reference/bethel-secondary-school.html
  // throughout. Cross-checked against "ՀԱՅ ԱՒԵՏԱՐԱՆԱԿԱՆ ԲԵԹԷԼ ԵՐԿՐՈՐԴԱԿԱՆ
  // ՎԱՐԺԱՐԱՆ.docx" (Armenian source + an English contact-details page) —
  // the docx corroborates every contact detail and the principal's name
  // exactly, and additionally supplies 2 individual student exam results
  // (2023-2024, 2024-2025) that the mockup itself doesn't mention; kept out
  // of this build since the mockup is the verified locked source (see
  // OPEN_QUESTIONS for the note).
  "bethel-secondary-school": {
    slug: "bethel-secondary-school",

    masthead: {
      locationLine: "Aleppo, Syria",
      locationLineHy: null,
      established: "1923",
      establishedHy: null,
    },

    // "Approved Logo.png" — filename itself states approval; used as the
    // real seal, same "use the emblems as is" instruction already applied
    // to ACG.
    logo: {
      src: "/school-bethel-secondary-school-emblem.png",
      alt: "Armenian Evangelical Bethel Secondary School crest",
    },
    heroPhoto: {
      src: "/school-bethel-secondary-school-hero.jpg",
      alt: "The Bethel school building in Aleppo",
    },

    factsBar: [
      { label: "1923", labelHy: null, sub: "Founded", subHy: null },
      { label: "KG – Grade 12", labelHy: null, sub: "Full Cycle", subHy: null },
      { label: "Baccalaureate", labelHy: null, sub: "State-Certified", subHy: null },
      { label: "Aleppo, Syria", labelHy: null, sub: "Location", subHy: null },
    ],

    // Required field, kept populated (same real text as `introFeature`,
    // verbatim) for type parity even though `<SchoolAbout>` isn't rendered
    // for this school — same reasoning as ACG's own `about` field.
    about: {
      eyebrow: "The School",
      eyebrowHy: null,
      heading: "One of Syria's Oldest Armenian Schools",
      headingHy: null,
      paragraphs: [
        "Founded in Aleppo in 1923, the Armenian Evangelical Bethel Secondary School is one of the oldest and most deeply rooted educational institutions of Syria's Armenian community. It was established in the years after the Armenian Genocide, during the rebuilding of a displaced people — conceived as an educational, national, and spiritual centre for the families who were building new lives, and a part of the community's rebirth.",
        "In its earliest years the school served around two hundred students. Today it educates children from kindergarten through the final year of secondary school, carrying that founding mission into its second century.",
      ],
      paragraphsHy: null,
      pullQuote: null,
      pullQuoteHy: null,
    },

    principalCard: null,

    // The docx's own "Mailing Address: P.O Box 3833" confirms this is a
    // real, correct value — not a copy-paste artifact from ACG's identical
    // P.O. box (both are real Armenian Evangelical Aleppo institutions;
    // presumably a shared regional box). Flagged in OPEN_QUESTIONS anyway
    // since the coincidence is worth a record.
    location: {
      addressLines: ["Aleppo, Syria", "P.O. Box 3833"],
      addressLinesHy: null,
    },

    // All verified, real (not pending). Facebook has no href in the
    // mockup's own markup (name-only, unlike ACG's linked Facebook) — kept
    // as a plain, non-linked value rather than inventing a URL.
    contactRows: [
      {
        key: "Phone",
        keyHy: null,
        value: "+963 21 4 659 530",
        valueHy: null,
        href: null,
      },
      {
        key: "Fax",
        keyHy: null,
        value: "+963 21 4 614 490",
        valueHy: null,
        href: null,
      },
      {
        key: "Email",
        keyHy: null,
        value: "schoolbethel23@gmail.com",
        valueHy: null,
        href: "mailto:schoolbethel23@gmail.com",
      },
      {
        key: "Facebook",
        keyHy: null,
        value: "Armenian Evng Bethel School",
        valueHy: null,
        href: null,
      },
      {
        key: "Instagram",
        keyHy: null,
        value: "bethel_sec_school",
        valueHy: null,
        href: "https://instagram.com/bethel_sec_school",
      },
    ],

    // 3 cards, matching the mockup's own `.lead-grid` exactly (Principal,
    // Chair of Council — pending, Secretary). "Chair of Council" is this
    // school's own free-text role label, not "Vice-Chair of the Council."
    // Both real names shown as supplied, pending Union confirmation per
    // the mockup's own footer note.
    leadership: [
      {
        name: "Mrs. Lousin Abajian Chilaposhian",
        nameHy: null,
        role: "Principal",
        roleHy: null,
        photo: {
          src: "/school-bethel-secondary-school-principal.jpg",
          alt: "Mrs. Lousin Abajian Chilaposhian",
        },
      },
      {
        name: null,
        nameHy: null,
        role: "Chair of Council",
        roleHy: null,
        photo: null,
      },
      {
        name: "Miss Lousig Emirkhanian",
        nameHy: null,
        role: "Secretary",
        roleHy: null,
        photo: {
          src: "/school-bethel-secondary-school-secretary.png",
          alt: "Miss Lousig Emirkhanian",
        },
      },
    ],

    directorsArchive: null,
    mission: null,
    missionValues: null,
    academicHeritage: null,
    supportServices: null,
    signaturePrograms: null,
    faithCommunity: null,

    // No "Make an Inquiry" section in this mockup (same as ACG) — the
    // Contact card's real mailto already covers enquiries.
    inquiry: null,

    cta: {
      heading: "Educating Generations Since 1923",
      headingHy: null,
      body: "For more than a century, the Armenian Evangelical Bethel Secondary School has served Aleppo's Armenian community in the spirit of excellence, service, and faith — an institution of the Armenian Evangelical Educational Council of Syria, within the Union of the Armenian Evangelical Churches in the Near East.",
      bodyHy: null,
    },

    // About/Intro woven row — rendered via `WhiteChurchFeature` with
    // `reverse` in place of `<SchoolAbout>`, same pattern as ACG.
    introFeature: {
      eyebrow: "The School",
      eyebrowHy: null,
      heading: "One of Syria's Oldest Armenian Schools",
      headingHy: null,
      paragraphs: [
        "Founded in Aleppo in 1923, the Armenian Evangelical Bethel Secondary School is one of the oldest and most deeply rooted educational institutions of Syria's Armenian community. It was established in the years after the Armenian Genocide, during the rebuilding of a displaced people — conceived as an educational, national, and spiritual centre for the families who were building new lives, and a part of the community's rebirth.",
        "In its earliest years the school served around two hundred students. Today it educates children from kindergarten through the final year of secondary school, carrying that founding mission into its second century.",
      ],
      paragraphsHy: null,
      photo: {
        src: "/school-bethel-secondary-school-classroom.jpg",
        alt: "Secondary students in class at Bethel",
        width: 1280,
        height: 960,
      },
    },

    pullQuoteBand: {
      quote:
        "For more than a century, Bethel has remained faithful to its educational, national, and Christian mission — raising generations in a spirit of excellence, service, and faith.",
      quoteHy: null,
      attribution: "Armenian Evangelical Bethel Secondary School",
      attributionHy: null,
    },

    pullQuoteBand2: {
      quote: "Train up a child in the way he should go, and when he is old he will not depart from it.",
      quoteHy: null,
      attribution: "Proverbs 22:6 · The school's guiding verse",
      attributionHy: null,
    },

    vintageBand: {
      eyebrow: "Our History",
      eyebrowHy: null,
      heading: "From 1923 to a Full Secondary School",
      headingHy: null,
      leadParagraph:
        "The school's first principal, Mr. Hovhannes Haytoshtian, led the institution until 1941. In the decades that followed, a succession of principals carried its mission forward. Between 1944 and 1955 the school taught up to the ninth grade — and for one year the tenth — and after 1955 continued with kindergarten and elementary sections.",
      leadParagraphHy: null,
      photo: {
        src: "/school-bethel-secondary-school-vintage.jpg",
        alt: "The Bethel school community gathered together",
        width: 1280,
        height: 960,
      },
      photoCaption: "The Bethel school community.",
      photoCaptionHy: null,
      paragraphs: [
        "A turning point came in 2000, when the Armenian Evangelical Educational Council resolved to expand the school to offer a complete secondary education. With that decision, Bethel became the first Armenian Evangelical institution to teach from kindergarten through the twelfth grade.",
        "The seventh grade opened in 2004–2005, followed by the eighth and ninth; the secondary section in 2008–2009; and the twelfth grade in 2009–2010. A second floor was added in the same period — six new classrooms, administrative offices, chemistry and science laboratories, and a computer lab.",
      ],
      paragraphsHy: null,
    },

    // Languages + Reading & Research — the mockup's own "A Rigorous,
    // Multilingual Education" section. Both use `reverse: false`: Reading
    // & Research's `.split.rev` markup, per the same CSS-order-override
    // math confirmed on ACG (`.split.rev .txt{order:2}.split.rev
    // .ph{order:1}`), renders photo-left/text-right identically to the
    // non-`.rev` Languages row — not a real reversal.
    academicsRows: [
      {
        eyebrow: "Languages",
        eyebrowHy: null,
        heading: "Taught in Three Languages",
        headingHy: null,
        paragraphs: [
          "Bethel follows the Syrian national curriculum and grants officially recognised certificates at every level, from kindergarten to the secondary Baccalaureate. Alongside the Arabic of the state programme, students study English and French from their earliest years, with an emphasis on genuine fluency.",
        ],
        paragraphsHy: null,
        photo: {
          src: "/school-bethel-secondary-school-french-lesson.jpg",
          alt: "A French lesson in progress",
          width: 1280,
          height: 960,
        },
        reverse: false,
        dropcapFirst: false,
      },
      {
        eyebrow: "Reading & Research",
        eyebrowHy: null,
        heading: "In the Library",
        headingHy: null,
        paragraphs: [
          "In the school library, students read, research, and work with sources first-hand — building the habits of study and curiosity that carry them through their later years.",
        ],
        paragraphsHy: null,
        photo: {
          src: "/school-bethel-secondary-school-library.jpg",
          alt: "Students reading in the Bethel library",
          width: 5184,
          height: 3456,
        },
        reverse: false,
        dropcapFirst: false,
      },
    ],

    // Bare mode (no header, no wash) — embedded at the end of the
    // Academics section, unlike ACG's standalone "Three Languages, One
    // Curriculum" section. See `SchoolLanguages`'s own comment.
    languages: {
      eyebrow: null,
      eyebrowHy: null,
      heading: null,
      headingHy: null,
      intro: null,
      introHy: null,
      items: [
        { label: "English", labelHy: null },
        { label: "Arabic", labelHy: null },
        { label: "French", labelHy: null },
      ],
    },

    programChips: {
      eyebrow: "Beyond the Curriculum",
      eyebrowHy: null,
      heading: "Where Curiosity Comes Alive",
      headingHy: null,
      items: ["Robotics", "Magic Math", "Science Fair", "Montessori (KG)", "Science Olympiad", "Recitation & Debate"],
    },

    // Robotics + Achievement, inside the same "Beyond the Curriculum"
    // section as the chips above. Achievement's `.split.rev` renders
    // photo-left the same as Robotics's non-`.rev` row — same CSS-order
    // math as `academicsRows`, `reverse: false` for both.
    curriculumRows: [
      {
        eyebrow: "Innovation",
        eyebrowHy: null,
        heading: "Robotics & the Science Fair",
        headingHy: null,
        paragraphs: [
          "Beyond the state programme, Bethel runs modern enrichment tracks — Robotics, Magic Math, and a science strand that treats discovery as a habit to practise. Its annual Science Fair gives students a stage to present their own investigations, and welcomes the wider circle of Aleppo's Armenian schools.",
        ],
        paragraphsHy: null,
        photo: {
          src: "/school-bethel-secondary-school-robotics.jpg",
          alt: "Students at a robotics and science activity",
          width: 5472,
          height: 3648,
        },
        reverse: false,
        dropcapFirst: false,
      },
      {
        eyebrow: "Achievement",
        eyebrowHy: null,
        heading: "A Record of Results",
        headingHy: null,
        paragraphs: [
          "Bethel is known for its academic standards. In recent years its students have earned outstanding results in the national Baccalaureate examinations — a testament to the school's consistent pursuit of excellence and the dedication of its teaching staff.",
        ],
        paragraphsHy: null,
        photo: {
          src: "/school-bethel-secondary-school-exam.jpg",
          alt: "Students sitting an examination",
          width: 5712,
          height: 4284,
        },
        reverse: false,
        dropcapFirst: false,
      },
    ],

    // "Christian Foundation" section's first row.
    worshipRows: [
      {
        eyebrow: "Every Morning",
        eyebrowHy: null,
        heading: "A Day That Begins in Worship",
        headingHy: null,
        paragraphs: [
          "Christian formation is inseparable from Bethel's identity and mission. Every school day opens with a shared time of worship, so that students' spiritual lives are nurtured alongside their intellectual and moral growth.",
        ],
        paragraphsHy: null,
        photo: {
          src: "/school-bethel-secondary-school-worship.jpg",
          alt: "Students gathered for morning worship",
          width: 4080,
          height: 3060,
        },
        reverse: false,
        dropcapFirst: false,
      },
    ],

    // "Faith in Practice" row, after the Proverbs 22:6 band
    // (`pullQuoteBand2`). `.split.rev` — same CSS-order math, `reverse: false`.
    faithRows: [
      {
        eyebrow: "Faith in Practice",
        eyebrowHy: null,
        heading: "A Living Community of Faith",
        headingHy: null,
        paragraphs: [
          "Worship, prayer, and Christian witness are woven through the life of the school — not a subject set apart, but the ground on which everything else is built.",
        ],
        paragraphsHy: null,
        photo: {
          src: "/school-bethel-secondary-school-prayer.jpg",
          alt: "Children in prayer",
          width: 4080,
          height: 3060,
        },
        reverse: false,
        dropcapFirst: false,
      },
    ],

    // "Heritage & the Early Years" section. Identity's `.split.rev` — same
    // CSS-order math, `reverse: false`.
    heritageRows: [
      {
        eyebrow: "Kindergarten",
        eyebrowHy: null,
        heading: "A Montessori Start",
        headingHy: null,
        paragraphs: [
          "In the kindergarten, Bethel draws on Montessori principles — nurturing independence, creativity, and the first sparks of critical thinking, so that a child's earliest experience of school is one of discovery.",
        ],
        paragraphsHy: null,
        photo: {
          src: "/school-bethel-secondary-school-kindergarten.jpg",
          alt: "Young children in a Bethel kindergarten class",
          width: 1280,
          height: 960,
        },
        reverse: false,
        dropcapFirst: false,
      },
      {
        eyebrow: "Identity",
        eyebrowHy: null,
        heading: "Rooted in Armenian Heritage",
        headingHy: null,
        paragraphs: [
          "From their first years, children are immersed in Armenian language, faith, and heritage — carried in song, in costume, and in the commemorations that bind each generation to the ones before it.",
        ],
        paragraphsHy: null,
        photo: {
          src: "/school-bethel-secondary-school-heritage-dress.jpg",
          alt: "Children in Armenian traditional dress at a heritage celebration",
          width: 3000,
          height: 4000,
        },
        reverse: false,
        dropcapFirst: false,
      },
    ],

    visionMission: {
      eyebrow: "Our Purpose",
      eyebrowHy: null,
      heading: "Vision & Mission",
      headingHy: null,
      cards: [
        {
          title: "Vision",
          titleHy: null,
          body: "To raise a generation that is academically strong, morally responsible, firmly grounded in Christian values, conscious of its national identity, and devoted to the service of society.",
          bodyHy: null,
        },
        {
          title: "Mission",
          titleHy: null,
          body: "To provide a complete education in a safe, caring, and Christian environment — upholding high academic standards and developing each student's knowledge, skills, and values, so they can meet the challenges of a changing world while preserving their Armenian identity and Armenian Evangelical spiritual heritage.",
          bodyHy: null,
        },
      ],
    },

    // Icons: #ic-trophy is new this unit; #ic-flask and #ic-book already
    // existed (ic-flask from ACG, ic-book from AESSA's PEP card).
    events: {
      eyebrow: "Through the Year",
      eyebrowHy: null,
      heading: "Life at Bethel",
      headingHy: null,
      items: [
        {
          icon: "#ic-flask",
          title: "Science Fair",
          titleHy: null,
          description: "An annual showcase of student investigations, open to Aleppo's Armenian schools.",
          descriptionHy: null,
        },
        {
          icon: "#ic-book",
          title: "Spelling Bee",
          titleHy: null,
          description: "The school's English spelling competition — \"Spell to Excel.\"",
          descriptionHy: null,
        },
        {
          icon: "#ic-trophy",
          title: "Inter-School Competitions",
          titleHy: null,
          description: "Recitation, reading, theatre, and debate, alongside the Science Olympiad.",
          descriptionHy: null,
        },
      ],
    },

    // 13 photos, verbatim alt text from the mockup's own gallery figures.
    // 6 reuse the exact same source files already used above (school
    // building, classroom, French lesson, morning worship, prayer,
    // heritage dress) — the mockup's own gallery duplicates them too, same
    // pattern already confirmed on ACG. The other 7 are gallery-only
    // photos with no other home on the page.
    gallery: {
      eyebrow: "Gallery",
      eyebrowHy: null,
      heading: "Life at Bethel School",
      headingHy: null,
      photos: [
        {
          src: "/school-bethel-secondary-school-hero.jpg",
          alt: "The school building",
          caption: null,
          captionHy: null,
        },
        {
          src: "/school-bethel-secondary-school-gallery-classroom-lesson.jpg",
          alt: "A classroom lesson",
          caption: null,
          captionHy: null,
        },
        {
          src: "/school-bethel-secondary-school-classroom.jpg",
          alt: "Secondary students in class",
          caption: null,
          captionHy: null,
        },
        {
          src: "/school-bethel-secondary-school-french-lesson.jpg",
          alt: "A French lesson",
          caption: null,
          captionHy: null,
        },
        {
          src: "/school-bethel-secondary-school-gallery-spelling-bee.jpg",
          alt: "Bethel Spelling Bee",
          caption: null,
          captionHy: null,
        },
        {
          src: "/school-bethel-secondary-school-gallery-spelling-bee-ceremony.jpg",
          alt: "Spelling Bee certificate ceremony",
          caption: null,
          captionHy: null,
        },
        {
          src: "/school-bethel-secondary-school-gallery-research.jpg",
          alt: "Students at a research activity",
          caption: null,
          captionHy: null,
        },
        {
          src: "/school-bethel-secondary-school-worship.jpg",
          alt: "Morning worship",
          caption: null,
          captionHy: null,
        },
        {
          src: "/school-bethel-secondary-school-prayer.jpg",
          alt: "Children in prayer",
          caption: null,
          captionHy: null,
        },
        {
          src: "/school-bethel-secondary-school-gallery-pageant.jpg",
          alt: "A Christian pageant",
          caption: null,
          captionHy: null,
        },
        {
          src: "/school-bethel-secondary-school-gallery-choir.jpg",
          alt: "Choir performance with Armenian flags",
          caption: null,
          captionHy: null,
        },
        {
          src: "/school-bethel-secondary-school-heritage-dress.jpg",
          alt: "Kindergarten heritage performance",
          caption: null,
          captionHy: null,
        },
        {
          src: "/school-bethel-secondary-school-gallery-celebration-prep.jpg",
          alt: "Students preparing a school celebration",
          caption: null,
          captionHy: null,
        },
      ],
    },
  },

  // Armenian Evangelical Emmanuel School, known today by its licensed name
  // "Al Ressaleh School" (Aleppo, Syria) — 3rd Syria school, verbatim from
  // design-reference/emmanuel-al-ressaleh-school.html, cross-checked against
  // "Հայ-Աւետարանական-Էմմանուէլ-Վարժարան.docx". Unusually well
  // cross-checked already: the mockup's own footer note independently
  // flags both real discrepancies the docx itself contains (founding year
  // 1925 vs. "(1926)"; principal spelling "Malatyos" vs. "Malateous") —
  // see the founding-year/spelling OPEN_QUESTIONS item for this school.
  "emmanuel-al-ressaleh-school": {
    slug: "emmanuel-al-ressaleh-school",

    // No founding year in the masthead meta line at all — see
    // `masthead.established`'s own type comment (new this unit). The facts
    // bar below carries "Pending" for Founding Year instead, matching the
    // mockup exactly.
    masthead: {
      locationLine: "Aleppo College Compound, Aleppo, Syria",
      locationLineHy: null,
      established: null,
      establishedHy: null,
    },

    // "9.png" — an AI-generated-style shield crest (glossy 3D render,
    // same tell-tale style as ACG's own logo), used as-supplied per
    // Yeghia's standing "use the emblems as is" ruling — flagged here for
    // the record, not withheld.
    logo: {
      src: "/school-emmanuel-al-ressaleh-emblem.png",
      alt: "Al Ressaleh School crest",
    },
    heroPhoto: {
      src: "/school-emmanuel-al-ressaleh-hero.jpg",
      alt: "The Emmanuel (Al Ressaleh) School building in Aleppo",
    },

    factsBar: [
      { label: "Pending", labelHy: null, sub: "Founding Year", subHy: null },
      { label: "1976", labelHy: null, sub: "Established in Aleppo", subHy: null },
      { label: "KG – Grade 6", labelHy: null, sub: "Kindergarten & Elementary", subHy: null },
      { label: "Aleppo, Syria", labelHy: null, sub: "Location", subHy: null },
    ],

    // Required field, kept populated (same real text as `introFeature`,
    // verbatim) for type parity even though `<SchoolAbout>` isn't rendered
    // for this school — same reasoning as ACG/Bethel's own `about` field.
    about: {
      eyebrow: "The School",
      eyebrowHy: null,
      heading: "Emmanuel, Known Today as Al Ressaleh",
      headingHy: null,
      paragraphs: [
        "The Armenian Evangelical Emmanuel School — known today by its licensed name, Al Ressaleh School — has served the Armenian community of Aleppo for close to a century. It began its work in Jabal al-Nahr and, in 1976, moved to the Aleppo College compound, where it has remained ever since.",
        "Today the school teaches children from kindergarten through the sixth grade — a small, close school giving its pupils a grounded and caring start to their education.",
      ],
      paragraphsHy: null,
      pullQuote: null,
      pullQuoteHy: null,
    },

    principalCard: null,

    // Docx confirms: "Mailing Address: P.O Box 3833" — a THIRD school
    // (after ACG and Bethel) sharing this exact box, strengthening the
    // "shared regional Union box" reading over a copy-paste artifact.
    location: {
      addressLines: ["Aleppo College Compound, Aleppo, Syria", "P.O. Box 3833"],
      addressLinesHy: null,
    },

    // All verified, real (not pending). No Fax row — the docx's own info
    // sheet leaves Fax blank, and the mockup correctly omits the row
    // entirely rather than inventing a value.
    contactRows: [
      {
        key: "Phone",
        keyHy: null,
        value: "+963 21 2 687 701 · +963 21 2 687 290",
        valueHy: null,
        href: null,
      },
      {
        key: "Email",
        keyHy: null,
        value: "alressaleh@gmail.com",
        valueHy: null,
        href: "mailto:alressaleh@gmail.com",
      },
      {
        key: "Facebook",
        keyHy: null,
        value: "Al Ressaleh School",
        valueHy: null,
        href: "https://www.facebook.com/alressaleh.eschool/",
      },
      {
        key: "Instagram",
        keyHy: null,
        value: "alressaleh",
        valueHy: null,
        href: "https://instagram.com/alressaleh",
      },
    ],

    // 3 cards, matching the mockup's own `.lead-grid` exactly (Principal,
    // License-Holder's Representative, Secretary). "License-Holder's
    // Representative" is this school's own free-text role — Miss Mary
    // Hakko, the same person named on Syriac Evangelical Church of
    // Aleppo's own page as Vice-Chairwoman (a plausible shared-leadership
    // case across Aleppo's Armenian Evangelical institutions, not
    // independently investigated further). Both name spellings shown as
    // supplied, pending Union confirmation per the mockup's own footer note.
    leadership: [
      {
        name: "Mrs. Sadiqa Malatyos",
        nameHy: null,
        role: "Principal",
        roleHy: null,
        photo: {
          src: "/school-emmanuel-al-ressaleh-principal.jpg",
          alt: "Mrs. Sadiqa Malatyos",
        },
      },
      {
        name: "Miss Mary Hakko",
        nameHy: null,
        role: "License-Holder's Representative",
        roleHy: null,
        photo: {
          src: "/school-emmanuel-al-ressaleh-owner-rep.jpg",
          alt: "Miss Mary Hakko",
        },
      },
      {
        name: "Mrs. Sina Abaze",
        nameHy: null,
        role: "Secretary",
        roleHy: null,
        photo: {
          src: "/school-emmanuel-al-ressaleh-secretary.jpg",
          alt: "Mrs. Sina Abaze",
        },
      },
    ],

    directorsArchive: null,
    mission: null,
    missionValues: null,
    academicHeritage: null,
    supportServices: null,
    signaturePrograms: null,
    faithCommunity: null,

    // No "Make an Inquiry" section in this mockup (same as ACG/Bethel) —
    // the Contact card's real mailto already covers enquiries.
    inquiry: null,

    cta: {
      heading: "A Caring Start for Aleppo's Children",
      headingHy: null,
      body: "The Armenian Evangelical Emmanuel School — Al Ressaleh — continues its quiet, faithful work in Aleppo, an institution of the Armenian Evangelical Educational Council of Syria, within the Union of the Armenian Evangelical Churches in the Near East.",
      bodyHy: null,
    },

    // About/Intro woven row — rendered via `WhiteChurchFeature` with
    // `reverse` in place of `<SchoolAbout>`, same pattern as ACG/Bethel
    // (this mockup's About row is also authored text-first, no `.rev`
    // class, so it renders text-left/photo-right — the genuine reversal
    // relative to WhiteChurchFeature's photo-left default).
    introFeature: {
      eyebrow: "The School",
      eyebrowHy: null,
      heading: "Emmanuel, Known Today as Al Ressaleh",
      headingHy: null,
      paragraphs: [
        "The Armenian Evangelical Emmanuel School — known today by its licensed name, Al Ressaleh School — has served the Armenian community of Aleppo for close to a century. It began its work in Jabal al-Nahr and, in 1976, moved to the Aleppo College compound, where it has remained ever since.",
        "Today the school teaches children from kindergarten through the sixth grade — a small, close school giving its pupils a grounded and caring start to their education.",
      ],
      paragraphsHy: null,
      photo: {
        src: "/school-emmanuel-al-ressaleh-classroom.jpg",
        alt: "A welcome to Al Ressaleh School classroom",
        width: 5472,
        height: 3648,
      },
    },

    pullQuoteBand: {
      quote:
        "From its founding to this day, the school works to give its children a high standard of learning — preparing them to step into the wider arena of life more capable and more ready.",
      quoteHy: null,
      attribution: "Armenian Evangelical Emmanuel School",
      attributionHy: null,
    },

    // No sepia filter in this mockup's own vintage-band CSS (same as
    // Bethel, unlike ACG) — `sepia={false}` at the call site.
    vintageBand: {
      eyebrow: "Our History",
      eyebrowHy: null,
      heading: "From Jabal al-Nahr to Aleppo",
      headingHy: null,
      leadParagraph:
        "Emmanuel School began its mission in Jabal al-Nahr, under its first principal, Mr. Matteos Matteosian. In 1976 it moved to the Aleppo College compound in Aleppo and settled there; its principal in those years was Hermine Abajian, followed by four more principals in the decades that came after.",
      leadParagraphHy: null,
      photo: {
        src: "/school-emmanuel-al-ressaleh-grounds.jpg",
        alt: "The school grounds in Aleppo",
        width: 5472,
        height: 3648,
      },
      photoCaption: "The school grounds in Aleppo.",
      photoCaptionHy: null,
      paragraphs: [
        "The school opened with two sections — a kindergarten and the first four elementary grades. At the end of the 1990s it expanded to include the fifth and sixth grades, the shape it keeps today.",
        "Through every change, Emmanuel has carried its founding purpose forward: a small, close school giving Aleppo's Armenian children a steady and caring start.",
      ],
      paragraphsHy: null,
    },

    // 4 woven rows (Kindergarten, Play, Grades 1-6, Computer Room). All use
    // `reverse: false` — Play's and Computer's `.split.rev` markup renders
    // photo-left the same as Kindergarten's/Grades-1-6's non-`.rev` rows,
    // same CSS-order-override math already confirmed on ACG and Bethel
    // (`.split.rev .txt{order:2}.split.rev .ph{order:1}` neutralizes the
    // DOM reversal rather than producing one).
    splitRows: [
      {
        eyebrow: "Kindergarten",
        eyebrowHy: null,
        heading: "In the Kindergarten",
        headingHy: null,
        paragraphs: [
          "The youngest children begin here, in bright classrooms full of colour, story, and song. It is where the school's smallest pupils take their first steps — learning to read, to count, and to belong.",
        ],
        paragraphsHy: null,
        photo: {
          src: "/school-emmanuel-al-ressaleh-kindergarten.jpg",
          alt: "Children in the kindergarten",
          width: 5472,
          height: 3648,
        },
        reverse: false,
        dropcapFirst: false,
      },
      {
        eyebrow: "Play",
        eyebrowHy: null,
        heading: "Room to Play and Grow",
        headingHy: null,
        paragraphs: [
          "A garden playground of slides, swings, and climbing frames — framed by the school's own bright pencil fence — gives the children space to run, play, and simply be children between their lessons.",
        ],
        paragraphsHy: null,
        photo: {
          src: "/school-emmanuel-al-ressaleh-playground.jpg",
          alt: "Children in the playground",
          width: 5472,
          height: 3648,
        },
        reverse: false,
        dropcapFirst: false,
      },
      {
        eyebrow: "Grades 1–6",
        eyebrowHy: null,
        heading: "Building the Foundations",
        headingHy: null,
        paragraphs: [
          "Through the elementary grades, lessons build the foundations of reading, writing, and number — the school working, in its own words, to prepare each child for the wider arena of life ahead.",
        ],
        paragraphsHy: null,
        photo: {
          src: "/school-emmanuel-al-ressaleh-elementary.jpg",
          alt: "An elementary class in progress",
          width: 5472,
          height: 3648,
        },
        reverse: false,
        dropcapFirst: false,
      },
      {
        eyebrow: "Technology",
        eyebrowHy: null,
        heading: "In the Computer Room",
        headingHy: null,
        paragraphs: [
          "Even the younger classes step into the computer room, gathering in small groups around the laptops to learn their first digital skills — one more way the school keeps pace with a changing world.",
        ],
        paragraphsHy: null,
        photo: {
          src: "/school-emmanuel-al-ressaleh-computer-room.jpg",
          alt: "Students in the computer room",
          width: 5472,
          height: 3648,
        },
        reverse: false,
        dropcapFirst: false,
      },
    ],

    // Icons: #ic-compass is new this unit; #ic-flask (ACG) and #ic-trophy
    // (Bethel) both reused as-is.
    events: {
      eyebrow: "Beyond the Classroom",
      eyebrowHy: null,
      heading: "Through the Year",
      headingHy: null,
      items: [
        {
          icon: "#ic-flask",
          title: "Science Exhibitions",
          titleHy: null,
          description: "Students present their work and discoveries to the wider school community.",
          descriptionHy: null,
        },
        {
          icon: "#ic-trophy",
          title: "Competitions",
          titleHy: null,
          description: "Friendly contests that encourage the pupils to stretch and shine.",
          descriptionHy: null,
        },
        {
          icon: "#ic-compass",
          title: "Cultural & Historical Trips",
          titleHy: null,
          description: "Excursions that connect the children to their history and heritage.",
          descriptionHy: null,
        },
      ],
    },

    // 11 photos, verbatim alt text from the mockup's own gallery figures.
    // 5 reuse the exact same source files already used above (school
    // building, school grounds, kindergarten, elementary lesson, computer
    // room) — the mockup's own gallery duplicates them too, same pattern
    // confirmed on ACG/Bethel. The other 4 (plus the About/Intro photo,
    // reused once more here as "Young pupils reading") are gallery-only or
    // cross-reused photos, all real, matched by visual inspection.
    gallery: {
      eyebrow: "Gallery",
      eyebrowHy: null,
      heading: "Life at Emmanuel School",
      headingHy: null,
      photos: [
        {
          src: "/school-emmanuel-al-ressaleh-hero.jpg",
          alt: "The school building",
          caption: null,
          captionHy: null,
        },
        {
          src: "/school-emmanuel-al-ressaleh-grounds.jpg",
          alt: "The school grounds",
          caption: null,
          captionHy: null,
        },
        {
          src: "/school-emmanuel-al-ressaleh-gallery-kg-reading.jpg",
          alt: "Kindergarten reading",
          caption: null,
          captionHy: null,
        },
        {
          src: "/school-emmanuel-al-ressaleh-kindergarten.jpg",
          alt: "A kindergarten class",
          caption: null,
          captionHy: null,
        },
        {
          src: "/school-emmanuel-al-ressaleh-classroom.jpg",
          alt: "Young pupils reading",
          caption: null,
          captionHy: null,
        },
        {
          src: "/school-emmanuel-al-ressaleh-playground.jpg",
          alt: "The playground",
          caption: null,
          captionHy: null,
        },
        {
          src: "/school-emmanuel-al-ressaleh-gallery-play.jpg",
          alt: "Children at play",
          caption: null,
          captionHy: null,
        },
        {
          src: "/school-emmanuel-al-ressaleh-gallery-indoor-play.jpg",
          alt: "Indoor play area",
          caption: null,
          captionHy: null,
        },
        {
          src: "/school-emmanuel-al-ressaleh-gallery-classroom-2.jpg",
          alt: "An elementary classroom",
          caption: null,
          captionHy: null,
        },
        {
          src: "/school-emmanuel-al-ressaleh-elementary.jpg",
          alt: "Elementary lesson",
          caption: null,
          captionHy: null,
        },
        {
          src: "/school-emmanuel-al-ressaleh-computer-room.jpg",
          alt: "The computer room",
          caption: null,
          captionHy: null,
        },
      ],
    },
  },

  // Damascus Armenian Evangelical "Kenats" (Life) School, licensed today as
  // Al-Hayat Private School — 4th Syria school, verbatim from
  // design-reference/damascus-kenats-al-hayat-school.html, cross-checked
  // against "Դամասկոսի Հայ Աւետարանական Վարժարան.docx". Like Emmanuel
  // al-Ressaleh, the mockup's own footer note already flags both real
  // discrepancies its docx contains (see items below) — this build
  // independently confirmed both, plus one the docx alone couldn't:
  // Principal Mrs. Talab's own desk nameplate (visible in her own photo)
  // reads "ميساء وجيهة طلب" (Maysaa Wajiha Talab), directly confirming the
  // mockup's third name variant as real, not invented. No gallery and no
  // events section exist in this mockup (confirmed: its own lightbox
  // script only wires up `.split`/`.vintage-band` photos, no `.gal`
  // selector at all) — both stay null/omitted, not built.
  "damascus-kenats-al-hayat-school": {
    slug: "damascus-kenats-al-hayat-school",

    masthead: {
      locationLine: "Old Damascus, Syria",
      locationLineHy: null,
      established: "1923",
      establishedHy: null,
    },

    // "logo.png" — an AI-generated-style crest (same illustrated-book/quill
    // tell as other Syria schools' logos), used as-supplied per Yeghia's
    // standing "use the emblems as is" ruling — flagged, not withheld.
    logo: {
      src: "/school-damascus-kenats-al-hayat-emblem.png",
      alt: "Kenats / Al-Hayat School crest",
    },
    heroPhoto: {
      src: "/school-damascus-kenats-al-hayat-hero.jpg",
      alt: "Pupils gathered in the school's old-Damascus courtyard",
    },

    factsBar: [
      { label: "1923", labelHy: null, sub: "Founded", subHy: null },
      { label: "1950", labelHy: null, sub: "Present Building", subHy: null },
      { label: "KG & Elementary", labelHy: null, sub: "Kindergarten & Primary", subHy: null },
      { label: "Damascus, Syria", labelHy: null, sub: "Location", subHy: null },
    ],

    // Required field, kept populated (same real text as `introFeature`,
    // verbatim) for type parity even though `<SchoolAbout>` isn't rendered
    // for this school — same reasoning as ACG/Bethel/Emmanuel's own `about`.
    about: {
      eyebrow: "The School",
      eyebrowHy: null,
      heading: "The School of Life in Damascus",
      headingHy: null,
      paragraphs: [
        "The Damascus Armenian Evangelical School — known in Armenian as the Kenats, or “Life,” School, and licensed today as Al-Hayat Private School — has taught the children of Damascus for close to a century. It grew from a single crowded room in 1923 into a settled home for learning in the old city, and has been part of the life of the Armenian Evangelical community of Damascus ever since.",
        "Today, under Principal Mrs. Maysa Talab, it teaches children through the kindergarten and elementary years, in the same spirit of faith and learning on which it was founded.",
      ],
      paragraphsHy: null,
      pullQuote: null,
      pullQuoteHy: null,
    },

    principalCard: null,

    location: {
      addressLines: ["Old Damascus, Syria", "P.O. Box 718"],
      addressLinesHy: null,
    },

    // All verified, real (not pending). No Instagram, no Fax — neither
    // exists anywhere in the docx, and the mockup correctly has neither row.
    contactRows: [
      {
        key: "Phone",
        keyHy: null,
        value: "+963 11 5 442 401",
        valueHy: null,
        href: null,
      },
      {
        key: "Email",
        keyHy: null,
        value: "mayssaatalab@gmail.com",
        valueHy: null,
        href: "mailto:mayssaatalab@gmail.com",
      },
      {
        key: "Facebook",
        keyHy: null,
        value: "Al-Hayat / Kenats School",
        valueHy: null,
        href: "https://m.facebook.com/340286466160005",
      },
    ],

    // Only 1 card — the mockup's own `.lead-grid` has just one person, no
    // Vice-Chair/Secretary equivalent named anywhere in the source.
    leadership: [
      {
        name: "Mrs. Maysa Talab",
        nameHy: null,
        role: "Principal",
        roleHy: null,
        photo: {
          src: "/school-damascus-kenats-al-hayat-principal.jpg",
          alt: "Mrs. Maysa Talab",
        },
      },
    ],

    directorsArchive: null,
    mission: null,
    missionValues: null,
    academicHeritage: null,
    supportServices: null,
    signaturePrograms: null,
    faithCommunity: null,

    // No "Make an Inquiry" section in this mockup — the Contact card's
    // real mailto already covers enquiries.
    inquiry: null,

    cta: {
      heading: "Teaching the Children of Damascus Since 1923",
      headingHy: null,
      body: "The Damascus Armenian Evangelical — Kenats — School continues its unbroken work in the old city, under the care of the Armenian Evangelical Community of Syria, within the Union of the Armenian Evangelical Churches in the Near East.",
      bodyHy: null,
    },

    // About/Intro woven row — rendered via `WhiteChurchFeature` with
    // `reverse` in place of `<SchoolAbout>`, same pattern as every other
    // magazine-style Syria school (text-first DOM, no `.rev` class, so it
    // renders text-left/photo-right — the genuine reversal relative to
    // WhiteChurchFeature's photo-left default).
    introFeature: {
      eyebrow: "The School",
      eyebrowHy: null,
      heading: "The School of Life in Damascus",
      headingHy: null,
      paragraphs: [
        "The Damascus Armenian Evangelical School — known in Armenian as the Kenats, or “Life,” School, and licensed today as Al-Hayat Private School — has taught the children of Damascus for close to a century. It grew from a single crowded room in 1923 into a settled home for learning in the old city, and has been part of the life of the Armenian Evangelical community of Damascus ever since.",
        "Today, under Principal Mrs. Maysa Talab, it teaches children through the kindergarten and elementary years, in the same spirit of faith and learning on which it was founded.",
      ],
      paragraphsHy: null,
      photo: {
        src: "/school-damascus-kenats-al-hayat-community.jpg",
        alt: "The school community in the courtyard",
        width: 1017,
        height: 588,
      },
    },

    pullQuoteBand: {
      quote:
        "Built on Christian principles — and on the conviction that every child should be raised in faith, in learning, and in conscience.",
      quoteHy: null,
      attribution: "The Kenats School, Damascus",
      attributionHy: null,
    },

    // No sepia filter in this mockup's own vintage-band CSS (same as
    // Bethel/Emmanuel, unlike ACG) — `sepia={false}` at the call site.
    vintageBand: {
      eyebrow: "Our History",
      eyebrowHy: null,
      heading: "From One Room, in 1923",
      headingHy: null,
      leadParagraph:
        "The school opened in 1923 under Rev. Karapet Hasessian — a single large room where forty or fifty children crowded onto a few benches, some sitting, some kneeling to use them as desks. A year later, in 1924, the Evangelical community rented a large house in the Abbara quarter of the old city, and the school moved there with two hundred and fifty pupils; Rev. Sarian taught the Bible, and Mr. Dikran Mesropian served as its director.",
      leadParagraphHy: null,
      photo: {
        src: "/school-damascus-kenats-al-hayat-lesson.jpg",
        alt: "A lesson at the Kenats School",
        width: 1080,
        height: 648,
      },
      photoCaption: "A lesson at the Kenats School.",
      photoCaptionHy: null,
      paragraphs: [
        "In 1950, with the help of the Armenian Evangelical Community of Syria, the community built the school's own present building — under the leadership of Rev. Harutiun Baleozian and the initiative of Rev. Yenovk Haditian, with some fifty Evangelical families gathered around it.",
        "For decades Mrs. Anoush Serobian carried the school forward, until 1992, grounding it in Christian principle and a strong sense of Armenian identity — and earning the Union's medal of honour and the title of veteran principal. Through every year since 1923, the school has never ceased its work.",
      ],
      paragraphsHy: null,
    },

    // No other split rows, no languages/chips/events/gallery — this
    // mockup has none of those sections at all (confirmed: no `.gal` or
    // `.events` markup anywhere in the source file).
    splitRows: null,
    languages: null,
    programChips: null,
    visionMission: null,
    events: null,
    gallery: null,
  },

  // Syriac Evangelical School (Aleppo, Syria) — licensed today as the
  // "New Testament Private School" (مدرسة العهد الجديد الخاصة, confirmed
  // directly on the school's own entrance signage, matching the docx's
  // English info sheet) — 5th Syria school, verbatim from
  // design-reference/syriac-evangelical-school.html, cross-checked against
  // "Սուրիանի-Աւետարանական-Վարժարան (1).docx". Same pattern as Emmanuel/
  // Damascus: the mockup's own footer note pre-flags its real
  // discrepancies (name-spelling variants; no email/address supplied) —
  // independently confirmed against the docx, plus the entrance-sign photo
  // corroborates the phone number and Arabic name exactly.
  "syriac-evangelical-school": {
    slug: "syriac-evangelical-school",

    masthead: {
      locationLine: "Aleppo, Syria",
      locationLineHy: null,
      established: "1932",
      establishedHy: null,
    },

    // "logo.png" — an AI-generated-style crest (same illustrated-book/
    // glossy-3D tell as other Syria schools' logos, same 5625×5625 canvas
    // as ACG's and Damascus's), used as-supplied per Yeghia's standing
    // "use the emblems as is" ruling — flagged, not withheld.
    logo: {
      src: "/school-syriac-evangelical-emblem.png",
      alt: "Syriac Evangelical School crest",
    },
    heroPhoto: {
      src: "/school-syriac-evangelical-hero.jpg",
      alt: "Students gathered in the school courtyard",
    },

    factsBar: [
      { label: "1932", labelHy: null, sub: "Founded", subHy: null },
      { label: "1981", labelHy: null, sub: "Rebuilt in Stone", subHy: null },
      { label: "KG – Grade 6", labelHy: null, sub: "Kindergarten & Elementary", subHy: null },
      { label: "Aleppo, Syria", labelHy: null, sub: "Location", subHy: null },
    ],

    // Required field, kept populated (same real text as `introFeature`,
    // verbatim) for type parity even though `<SchoolAbout>` isn't rendered
    // for this school — same reasoning as every other magazine-style
    // Syria school.
    about: {
      eyebrow: "The School",
      eyebrowHy: null,
      heading: "A Home for Learning in Aleppo",
      headingHy: null,
      paragraphs: [
        "The Syriac Evangelical School has taught the children of Aleppo since 1932. It opened in the simplest of conditions — a kindergarten and an elementary school — and in 1981 was rebuilt in stone. Under the sponsorship of the Educational Council of the Armenian Evangelical Community of Syria, it has carried on its work without interruption from its founding day to this one.",
        "Today it teaches children from kindergarten through the sixth grade, with a single, steady aim: to give them a high standard of learning.",
      ],
      paragraphsHy: null,
      pullQuote: null,
      pullQuoteHy: null,
    },

    principalCard: null,

    // No P.O. Box/mailing address exists anywhere in the docx — the
    // mockup's own footer note says so explicitly ("No email or mailing
    // address was supplied"), and the location card correctly has no
    // P.O. Box row at all (contrast ACG/Bethel/Emmanuel/Damascus, all of
    // which have one).
    location: {
      addressLines: ["Aleppo, Syria"],
      addressLinesHy: null,
    },

    // All verified, real (not pending). No email at all in the source
    // (docx and mockup agree). Instagram is name-only, no link — the
    // mockup's own markup is a plain `<span>`, not an `<a href>` (its
    // footer note: "Instagram link pending") — matching the plain-value
    // render already established for Bethel's Facebook row (item 93).
    contactRows: [
      {
        key: "Phone",
        keyHy: null,
        value: "+963 21 2 211 782",
        valueHy: null,
        href: null,
      },
      {
        key: "Facebook",
        keyHy: null,
        value: "Syriac Evangelical School",
        valueHy: null,
        href: "https://m.facebook.com/174255656048829",
      },
      {
        key: "Instagram",
        keyHy: null,
        value: "Syriac Evangelical School",
        valueHy: null,
        href: null,
      },
    ],

    // 2 cards, matching the mockup's own `.lead-grid` exactly (Principal,
    // Secretary — no Chair/Vice-Chair equivalent named anywhere). Both
    // names shown as supplied, pending Union confirmation per the
    // mockup's own footer note (Der Artinian-Hallajian also written
    // "DerArtinian Halladjian" in the school's own records).
    leadership: [
      {
        name: "Mrs. Arousiag Der Artinian-Hallajian",
        nameHy: null,
        role: "Principal",
        roleHy: null,
        photo: {
          src: "/school-syriac-evangelical-principal.jpg",
          alt: "Mrs. Arousiag Der Artinian-Hallajian",
        },
      },
      {
        name: "Mrs. Badriye Nshan",
        nameHy: null,
        role: "Secretary",
        roleHy: null,
        photo: {
          src: "/school-syriac-evangelical-secretary.jpg",
          alt: "Mrs. Badriye Nshan",
        },
      },
    ],

    directorsArchive: null,
    mission: null,
    missionValues: null,
    academicHeritage: null,
    supportServices: null,
    signaturePrograms: null,
    faithCommunity: null,

    // No "Make an Inquiry" section in this mockup, and no email to build
    // one from anyway.
    inquiry: null,

    cta: {
      heading: "Teaching the Children of Aleppo Since 1932",
      headingHy: null,
      body: "The Syriac Evangelical School continues its unbroken work in Aleppo, under the sponsorship of the Educational Council of the Armenian Evangelical Community of Syria, within the Union of the Armenian Evangelical Churches in the Near East.",
      bodyHy: null,
    },

    // About/Intro woven row — rendered via `WhiteChurchFeature` with
    // `reverse` in place of `<SchoolAbout>`, same pattern as every other
    // magazine-style Syria school.
    introFeature: {
      eyebrow: "The School",
      eyebrowHy: null,
      heading: "A Home for Learning in Aleppo",
      headingHy: null,
      paragraphs: [
        "The Syriac Evangelical School has taught the children of Aleppo since 1932. It opened in the simplest of conditions — a kindergarten and an elementary school — and in 1981 was rebuilt in stone. Under the sponsorship of the Educational Council of the Armenian Evangelical Community of Syria, it has carried on its work without interruption from its founding day to this one.",
        "Today it teaches children from kindergarten through the sixth grade, with a single, steady aim: to give them a high standard of learning.",
      ],
      paragraphsHy: null,
      photo: {
        src: "/school-syriac-evangelical-classroom.jpg",
        alt: "An elementary class in progress",
        width: 1280,
        height: 719,
      },
    },

    pullQuoteBand: {
      quote: "Walk as children of light.",
      quoteHy: null,
      attribution: "Ephesians 5:8 · the school's motto",
      attributionHy: null,
    },

    // No sepia filter in this mockup's own vintage-band CSS (same as
    // Bethel/Emmanuel/Damascus, unlike ACG) — `sepia={false}` at the call
    // site.
    vintageBand: {
      eyebrow: "Our History",
      eyebrowHy: null,
      heading: "Unbroken Since 1932",
      headingHy: null,
      leadParagraph:
        "From its beginnings in 1932, the school has been shaped by a succession of dedicated directors — Bier Arslan, then Andranik Injejikian, then Mrs. Sonali Ghazal, and today Mrs. Arousiag Der Artinian-Hallajian, with Mrs. Badriye Nshan as secretary.",
      leadParagraphHy: null,
      photo: {
        src: "/school-syriac-evangelical-staff.jpg",
        alt: "The staff of the Syriac Evangelical School",
        width: 1280,
        height: 719,
      },
      photoCaption: "The staff of the Syriac Evangelical School.",
      photoCaptionHy: null,
      paragraphs: [
        "Rebuilt in stone in 1981, the school grew from very modest beginnings into a settled home for learning in Aleppo — and through every year since 1932 it has never once closed its doors.",
        "It remains a small, close school under the care of the Armenian Evangelical Community of Syria, giving each new generation a grounded and caring start.",
      ],
      paragraphsHy: null,
    },

    // 4 woven rows (Kindergarten, Play, Grades 1-6, Computer Room). All use
    // `reverse: false` — Play's and Computer's `.split.rev` markup renders
    // photo-left the same as the non-`.rev` rows, same confirmed
    // CSS-order-override math as every other Syria school.
    splitRows: [
      {
        eyebrow: "Kindergarten",
        eyebrowHy: null,
        heading: "A Room of Small Discoveries",
        headingHy: null,
        paragraphs: [
          "The youngest children begin in a bright room of hands-on materials, puzzles, and a wall map of the world — where learning is something to touch, build, and explore before it is ever written down.",
        ],
        paragraphsHy: null,
        photo: {
          src: "/school-syriac-evangelical-kindergarten.jpg",
          alt: "A kindergarten activity room",
          width: 1280,
          height: 719,
        },
        reverse: false,
        dropcapFirst: false,
      },
      {
        eyebrow: "Play",
        eyebrowHy: null,
        heading: "Room to Play",
        headingHy: null,
        paragraphs: [
          "Just outside the classrooms, a bright play corridor — slides, alphabet walls, and low benches — gives the little ones space to move and play between their lessons.",
        ],
        paragraphsHy: null,
        photo: {
          src: "/school-syriac-evangelical-play-corridor.jpg",
          alt: "The kindergarten play corridor",
          width: 1280,
          height: 719,
        },
        reverse: false,
        dropcapFirst: false,
      },
      {
        eyebrow: "Grades 1–6",
        eyebrowHy: null,
        heading: "Steady Foundations",
        headingHy: null,
        paragraphs: [
          "Through the elementary grades, lessons build the foundations of reading, writing, number, and language — the school holding, year after year, to its single aim of a high standard of learning.",
        ],
        paragraphsHy: null,
        photo: {
          src: "/school-syriac-evangelical-elementary.jpg",
          alt: "An elementary classroom",
          width: 1280,
          height: 960,
        },
        reverse: false,
        dropcapFirst: false,
      },
      {
        eyebrow: "Technology",
        eyebrowHy: null,
        heading: "In the Computer Room",
        headingHy: null,
        paragraphs: [
          "In the computer room, the children gather around the screens to take their first steps in coding and digital skills — one of the ways the school reaches beyond the ordinary lesson.",
        ],
        paragraphsHy: null,
        photo: {
          src: "/school-syriac-evangelical-computer-room.jpg",
          alt: "Students in the computer room",
          width: 1280,
          height: 718,
        },
        reverse: false,
        dropcapFirst: false,
      },
    ],

    languages: null,
    programChips: null,
    visionMission: null,

    // Icons: #ic-news is new this unit; #ic-flask (ACG) and #ic-book
    // (AESSA/Bethel) both reused as-is.
    events: {
      eyebrow: "Beyond the Classroom",
      eyebrowHy: null,
      heading: "Through the Year",
      headingHy: null,
      items: [
        {
          icon: "#ic-flask",
          title: "Science Exhibitions",
          titleHy: null,
          description: "Students present their experiments and discoveries to the school community.",
          descriptionHy: null,
        },
        {
          icon: "#ic-book",
          title: "Spelling Bee",
          titleHy: null,
          description: "A lively English spelling competition among the pupils.",
          descriptionHy: null,
        },
        {
          icon: "#ic-news",
          title: "Student Newspaper",
          titleHy: null,
          description: "The children produce and publish their own electronic newspaper.",
          descriptionHy: null,
        },
      ],
    },

    // 10 photos, verbatim alt text from the mockup's own gallery figures.
    // 7 reuse the exact same source files already used above (assembly,
    // classroom, staff, kindergarten, play corridor, elementary, computer
    // room) — the mockup's own gallery duplicates them too, same pattern
    // confirmed on every prior Syria school. The other 3 (entrance,
    // courtyard, geography board) are gallery-only photos with no other
    // home on the page.
    gallery: {
      eyebrow: "Gallery",
      eyebrowHy: null,
      heading: "Life at the Syriac Evangelical School",
      headingHy: null,
      photos: [
        {
          src: "/school-syriac-evangelical-gallery-entrance.jpg",
          alt: "The school entrance",
          caption: null,
          captionHy: null,
        },
        {
          src: "/school-syriac-evangelical-hero.jpg",
          alt: "Morning assembly in the courtyard",
          caption: null,
          captionHy: null,
        },
        {
          src: "/school-syriac-evangelical-gallery-courtyard.jpg",
          alt: "Students in the courtyard",
          caption: null,
          captionHy: null,
        },
        {
          src: "/school-syriac-evangelical-classroom.jpg",
          alt: "An elementary class",
          caption: null,
          captionHy: null,
        },
        {
          src: "/school-syriac-evangelical-elementary.jpg",
          alt: "A younger class",
          caption: null,
          captionHy: null,
        },
        {
          src: "/school-syriac-evangelical-computer-room.jpg",
          alt: "The computer room",
          caption: null,
          captionHy: null,
        },
        {
          src: "/school-syriac-evangelical-play-corridor.jpg",
          alt: "The play corridor",
          caption: null,
          captionHy: null,
        },
        {
          src: "/school-syriac-evangelical-kindergarten.jpg",
          alt: "The kindergarten activity room",
          caption: null,
          captionHy: null,
        },
        {
          src: "/school-syriac-evangelical-staff.jpg",
          alt: "The school staff",
          caption: null,
          captionHy: null,
        },
        {
          src: "/school-syriac-evangelical-gallery-geography.jpg",
          alt: "A geography lesson at the board",
          caption: null,
          captionHy: null,
        },
      ],
    },
  },

  // Armenian Evangelical Martyrs' School, Kessab — 6th Syria school, and
  // the first with `country: "Syria (Kessab)"` (mirrors the church
  // pattern exactly — see schools.ts, schools/page.tsx, and
  // schools/[slug]/page.tsx's own comments for the subregion mechanism).
  // Built verbatim from design-reference/kessab-martyrs-school.html,
  // cross-checked against
  // "Քեսապի-Հայ-Աւետարանական-Նահատակաց-Վարժարան.docx" — the mockup's own
  // footer note again pre-flags its real discrepancies (name spelling;
  // no email/address supplied). One historical fact ties directly to
  // already-committed church data: the docx and mockup both state that
  // Karaduran, Ekizolukh, and Korkune once had their own schools beside
  // their churches — the same three villages whose CHURCHES are already
  // built as inactive, worship redirected to Holy Trinity (items 81-83).
  // The Martyrs' School is now the only Armenian Evangelical school still
  // operating anywhere in Kessab, having in effect absorbed that role —
  // see the OPEN_QUESTIONS cross-reference item for this school.
  "kessab-martyrs-school": {
    slug: "kessab-martyrs-school",

    masthead: {
      locationLine: "Kessab, Syria",
      locationLineHy: null,
      established: "1852",
      establishedHy: null,
    },

    // "logo.png" — an AI-generated-style crest (same 5625×5625-canvas,
    // glossy-3D tell as every other Syria school logo this unit), used
    // as-supplied per Yeghia's standing "use the emblems as is" ruling —
    // flagged, not withheld.
    logo: {
      src: "/school-kessab-martyrs-emblem.png",
      alt: "Kessab Martyrs' School crest",
    },
    heroPhoto: {
      src: "/school-kessab-martyrs-hero.jpg",
      alt: "A lesson at the Martyrs' School in Kessab",
    },

    factsBar: [
      { label: "1852", labelHy: null, sub: "Founded", subHy: null },
      { label: "1980", labelHy: null, sub: "Unified", subHy: null },
      { label: "KG & Elementary", labelHy: null, sub: "Kindergarten & Primary", subHy: null },
      { label: "Kessab, Syria", labelHy: null, sub: "Location", subHy: null },
    ],

    // Required field, kept populated (same real text as `introFeature`,
    // verbatim) for type parity even though `<SchoolAbout>` isn't rendered
    // for this school — same reasoning as every other magazine-style
    // Syria school.
    about: {
      eyebrow: "The School",
      eyebrowHy: null,
      heading: "A School in the Heart of Kessab",
      headingHy: null,
      paragraphs: [
        "The Armenian Evangelical Martyrs' School has stood in Kessab since 1852, teaching beside the Armenian Evangelical Holy Trinity Church. For more than a century and a half it has been one of the living symbols of Kessab's Armenian community — and today it is the only Armenian Evangelical school still operating in the town.",
        "It teaches children through the kindergarten and elementary years, carrying forward a mission that many of the surrounding villages once shared — and holding to a single conviction: that an Armenian school is a cornerstone of Armenian identity, language, and Christian faith.",
      ],
      paragraphsHy: null,
      pullQuote: null,
      pullQuoteHy: null,
    },

    principalCard: null,

    // No P.O. Box/mailing address exists anywhere in the docx — the
    // mockup's own footer note says so explicitly ("No email or mailing
    // address was supplied"). `landmark` (new this unit) carries the
    // school's real physical relationship to Holy Trinity Church, exactly
    // as the mockup's own separate `.crow` row states it — not folded
    // into `addressLines`.
    location: {
      addressLines: ["Kessab, Syria"],
      addressLinesHy: null,
      landmark: "Beside the Holy Trinity Armenian Evangelical Church",
    },

    // All verified, real (not pending). No email, no Instagram — neither
    // exists anywhere in the docx, and the mockup correctly has neither row.
    contactRows: [
      {
        key: "Phone",
        keyHy: null,
        value: "+963 17 7 710 603",
        valueHy: null,
        href: null,
      },
      {
        key: "Facebook",
        keyHy: null,
        value: "Armenian Evangelical Martyrs' School, Kessab",
        valueHy: null,
        href: "https://m.facebook.com/431277543565887",
      },
    ],

    // Only 1 card — the mockup's own `.lead-grid` has just one person, no
    // Vice-Chair/Secretary equivalent named anywhere in the source. Name
    // shown as supplied ("Jnev Boujikian"), pending Union confirmation —
    // the docx's own separate info-sheet table spells it "Jnev Boujekian,"
    // per the mockup's own footer note.
    leadership: [
      {
        name: "Miss Jnev Boujikian",
        nameHy: null,
        role: "Principal",
        roleHy: null,
        photo: {
          src: "/school-kessab-martyrs-principal.jpg",
          alt: "Miss Jnev Boujikian",
        },
      },
    ],

    directorsArchive: null,
    mission: null,
    missionValues: null,
    academicHeritage: null,
    supportServices: null,
    signaturePrograms: null,
    faithCommunity: null,

    // No "Make an Inquiry" section in this mockup, and no email to build
    // one from anyway.
    inquiry: null,

    cta: {
      heading: "A Living Symbol of Kessab's Armenians",
      headingHy: null,
      body: "Through displacement and return, the Martyrs' School has taught the children of Kessab since 1852 — that each may grow a conscious, dignified Armenian and a faithful Christian, keeping language, faith, and identity. It stands beside the Holy Trinity Armenian Evangelical Church, within the Union of the Armenian Evangelical Churches in the Near East.",
      bodyHy: null,
    },

    // About/Intro woven row — rendered via `WhiteChurchFeature` with
    // `reverse` in place of `<SchoolAbout>`, same pattern as every other
    // magazine-style Syria school.
    introFeature: {
      eyebrow: "The School",
      eyebrowHy: null,
      heading: "A School in the Heart of Kessab",
      headingHy: null,
      paragraphs: [
        "The Armenian Evangelical Martyrs' School has stood in Kessab since 1852, teaching beside the Armenian Evangelical Holy Trinity Church. For more than a century and a half it has been one of the living symbols of Kessab's Armenian community — and today it is the only Armenian Evangelical school still operating in the town.",
        "It teaches children through the kindergarten and elementary years, carrying forward a mission that many of the surrounding villages once shared — and holding to a single conviction: that an Armenian school is a cornerstone of Armenian identity, language, and Christian faith.",
      ],
      paragraphsHy: null,
      photo: {
        src: "/school-kessab-martyrs-kindergarten.jpg",
        alt: "A kindergarten class, with the town of Kessab beyond the window",
        width: 2560,
        height: 1920,
      },
    },

    pullQuoteBand: {
      quote: "All Scripture is God-breathed.",
      quoteHy: null,
      attribution: "2 Timothy 3:16",
      attributionHy: null,
    },

    // No sepia filter in this mockup's own vintage-band CSS (same as
    // Bethel/Emmanuel/Damascus/Syriac, unlike ACG) — `sepia={false}` at
    // the call site.
    vintageBand: {
      eyebrow: "Our History",
      eyebrowHy: null,
      heading: "Since 1852 — and Still Standing",
      headingHy: null,
      leadParagraph:
        "Founded in 1852 in the heart of Kessab, the Martyrs' School soon grew beyond a single village. From 1908 it kept a boarding section, giving shelter and schooling to children who came from distant villages and districts; for years it also ran a secondary section, becoming one of the most important centres of learning in Kessab and the lands around it.",
      leadParagraphHy: null,
      photo: {
        src: "/school-kessab-martyrs-community.jpg",
        alt: "Pupils of the Martyrs' School, Kessab",
        width: 1021,
        height: 581,
      },
      photoCaption: "Pupils of the Martyrs' School, Kessab.",
      photoCaptionHy: null,
      paragraphs: [
        "Its story has not been an easy one. The repatriation of 1947, and the emigration of the decades that followed, thinned both the community and the school's rolls. And through its long history the school lived through the displacements of Kessab — in 1909, in 1915, and again in 2014 — its building damaged and, each time, rebuilt when the people of Kessab returned home.",
        "The Armenian Evangelical communities of Karaduran, Ekizolukh, and Korkune once kept schools of their own beside their churches. Today the Martyrs' School is the last of them still open — a living symbol of Kessab's Armenians, teaching on in faith, dedication, and hope.",
      ],
      paragraphsHy: null,
    },

    // 2 woven rows (Kindergarten, Community). Community's `.split.rev`
    // markup renders photo-left the same as Kindergarten's non-`.rev`
    // row, same confirmed CSS-order math as every other Syria school —
    // `reverse: false` for both. The Kindergarten photo is deliberately
    // the same file used by `introFeature` above — the mockup's own
    // "In the Kindergarten" row uses a plain "A kindergarten class" alt
    // (no window/town detail), matching the same real photo reused, not
    // a distinct one invented to avoid repetition.
    splitRows: [
      {
        eyebrow: "The Early Years",
        eyebrowHy: null,
        heading: "In the Kindergarten",
        headingHy: null,
        paragraphs: [
          "The school's youngest children begin here — learning their first letters and numbers, and celebrating the seasons of the Christian year together in bright, decorated rooms.",
        ],
        paragraphsHy: null,
        photo: {
          src: "/school-kessab-martyrs-kindergarten.jpg",
          alt: "A kindergarten class",
          width: 2560,
          height: 1920,
        },
        reverse: false,
        dropcapFirst: false,
      },
      {
        eyebrow: "A Close Community",
        eyebrowHy: null,
        heading: "Teachers and Children Together",
        headingHy: null,
        paragraphs: [
          "Small and close, the Martyrs' School is a community as much as a classroom — its teachers and pupils sharing the crafts, feasts, and quiet daily work that hold a small mountain school together.",
        ],
        paragraphsHy: null,
        photo: {
          src: "/school-kessab-martyrs-community.jpg",
          alt: "Teachers and pupils together",
          width: 1088,
          height: 596,
        },
        reverse: false,
        dropcapFirst: false,
      },
    ],

    languages: null,
    programChips: null,
    visionMission: null,

    // No Events section in this mockup — confirmed absent (only About,
    // History, Leadership, Student Life, Gallery, and Contact exist).
    events: null,

    // 6 photos, verbatim alt text from the mockup's own gallery figures.
    // 4 reuse the exact same source files already used above (hero,
    // kindergarten, community/vintage-band, community/split) — the
    // mockup's own gallery duplicates them too, same pattern confirmed on
    // every prior Syria school. The other 2 (Christmas, elementary) are
    // gallery-only photos with no other home on the page.
    gallery: {
      eyebrow: "Gallery",
      eyebrowHy: null,
      heading: "Life at the Martyrs' School",
      headingHy: null,
      photos: [
        {
          src: "/school-kessab-martyrs-hero.jpg",
          alt: "An elementary lesson",
          caption: null,
          captionHy: null,
        },
        {
          src: "/school-kessab-martyrs-kindergarten.jpg",
          alt: "A kindergarten class",
          caption: null,
          captionHy: null,
        },
        {
          src: "/school-kessab-martyrs-gallery-outdoors.jpg",
          alt: "Pupils outdoors in Kessab",
          caption: null,
          captionHy: null,
        },
        {
          src: "/school-kessab-martyrs-community.jpg",
          alt: "Teachers and pupils",
          caption: null,
          captionHy: null,
        },
        {
          src: "/school-kessab-martyrs-gallery-christmas.jpg",
          alt: "A kindergarten class at Christmas",
          caption: null,
          captionHy: null,
        },
        {
          src: "/school-kessab-martyrs-gallery-elementary.jpg",
          alt: "An elementary class",
          caption: null,
          captionHy: null,
        },
      ],
    },
  },
};
