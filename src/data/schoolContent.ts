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
 * Only two entries exist so far: Armenian Evangelical College (AEC) and
 * Shamlian-Tatikian. The route falls back to a directory-only "content
 * pending" render for any other slug (Central High, AESSA/Anjar).
 */

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
  heroPhoto: Photo;
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

    mission: null,
    academicHeritage: null,

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
};
