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
  } | null;

  // "Get in Touch" card rows — null when no verified contact route exists
  // at all (Shamlian-Tatikian). When both `location` and `contactRows` are
  // null, SchoolContactSection renders nothing (whole section omitted).
  contactRows: SchoolContactRow[] | null;

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

  cta: { heading: string; headingHy: string | null; body: string; bodyHy: string | null }; // always present

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
        role: "Vice-Chair of the Council",
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
    },

    // Both already tracked in public/ from the schools index build; logo.jpg
    // MD5-confirmed byte-identical to the tracked emblem file.
    logo: {
      src: "/school-shamlian-tatikian-emblem.jpg",
      alt: "Shamlian-Tatikian Secondary School seal",
    },
    heroPhoto: {
      src: "/school-shamlian-tatikian.jpeg",
      alt: "Armenian Evangelical Shamlian-Tatikian Secondary School",
    },

    factsBar: [
      { label: "1934", labelHy: null, sub: "Founded", subHy: null },
      { label: "250", labelHy: null, sub: "Students", subHy: null },
      { label: "Bourj Hammoud", labelHy: null, sub: "Beirut Suburb", subHy: null },
      { label: "Armenian Evangelical", labelHy: null, sub: "Tradition", subHy: null },
    ],

    // Verbatim (lightly joined for paragraph flow) from "Arm. Evang.
    // Sgamlian School - History.docx" — no independent Mission or Academic
    // Heritage content exists in the source, so those two sections are
    // omitted below rather than filled with invented text.
    about: {
      eyebrow: "The Institution",
      eyebrowHy: null,
      heading: "About the School",
      headingHy: null,
      paragraphs: [
        "The Armenian Evangelical Secondary School in Bourj Hammoud — known as the Shamlian-Tatikian Secondary School — is one of four secondary schools owned and operated by the Union of Armenian Evangelical Churches in the Near East. The school began its educational ministry in 1934 with kindergarten and elementary classes only; today it serves 250 students across the kindergarten, elementary, and secondary divisions.",
        "The surrounding neighborhood, Nor Marash — the first Armenian street in Beirut — was established in Bourj Hammoud in 1929 by Armenians who had arrived from Cilicia, Anatolia, and other regions following the Armenian Genocide of 1915. As the school grew, Rev. Aram Hadidian expanded the elementary department to six grades in 1936, added four intermediate grades in 1950, and the secondary division received official accreditation from the Lebanese government in 1958.",
        "In 1964, through the generous donation of Mr. and Mrs. G. Shamlian and their son, Mr. G. Tatikian, the school constructed a modern new building bearing their name. Hundreds of graduates now live and work around the world, sustained by an active Alumni association in both Lebanon and the United States. Alongside the Lebanese governmental curriculum, the school teaches the Bible, holds daily morning chapels and spiritual retreats, and preserves Armenian identity through the teaching of Armenian language and history.",
      ],
      paragraphsHy: null,
      pullQuote: null,
      pullQuoteHy: null,
    },

    // Name verified verbatim from the source doc's own principal list
    // ("Mrs. Kayane Tunberian (Current Principal)"). Photo intentionally
    // NOT set — the two current-day staff photos on file are labeled "Mrs.
    // Tamar — Secretary" and "Mrs. Kayane Messerian," neither matching this
    // name; using either would be a guess. Renders with a real name and an
    // arched photo-pending frame — flagged in OPEN_QUESTIONS, not resolved.
    principalCard: {
      name: "Mrs. Kayane Tunberian",
      nameHy: null,
      role: "Principal",
      roleHy: null,
      photo: null,
    },

    // No address found anywhere in the source doc.
    location: null,
    // No email/phone found anywhere in the source doc.
    contactRows: null,

    leadership: [
      { name: "Mrs. Kayane Tunberian", nameHy: null, role: "Principal", roleHy: null, photo: null },
      { name: null, nameHy: null, role: "Vice-Chair of the Council", roleHy: null, photo: null },
      { name: null, nameHy: null, role: "Secretary", roleHy: null, photo: null },
    ],

    directorsArchive: null,
    mission: null,
    academicHeritage: null,
    missionValues: null,
    supportServices: null,
    signaturePrograms: null,
    faithCommunity: null,

    // No verified email exists for this school — Inquiry section omitted
    // entirely rather than guessing an address.
    inquiry: null,

    // No reference/source text supplies closing copy for this school (no
    // design mockup exists for it specifically) — written in the same
    // house-style editorial convention already used for every church CTA
    // (see churchContent.ts), anchored only to verified facts (founding
    // year, location, the Union). Not a verbatim source quote.
    cta: {
      heading: "A Legacy of Faith & Learning",
      headingHy: null,
      body: "The Armenian Evangelical Shamlian-Tatikian Secondary School continues nine decades of Christian education and Armenian identity for the students of Bourj Hammoud.",
      bodyHy: null,
    },
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
      { name: null, nameHy: null, role: "Vice-Chair of the Council", roleHy: null, photo: null },
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
};
