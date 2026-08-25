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
    established: string; // just the year, e.g. "1923"
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
  splitRows?: {
    eyebrow: string;
    eyebrowHy: string | null;
    heading: string;
    headingHy: string | null;
    paragraphs: string[];
    paragraphsHy: string[] | null;
    photo: { src: string; alt: string; width: number; height: number };
    reverse: boolean;
    dropcapFirst: boolean;
  }[] | null;

  // Standalone centered wash-band quote + attribution line — see
  // `SchoolPullQuoteBand`'s own comment for why this isn't `about.pullQuote`.
  pullQuoteBand?: {
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
  languages?: {
    eyebrow: string;
    eyebrowHy: string | null;
    heading: string;
    headingHy: string | null;
    intro: string;
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
};
