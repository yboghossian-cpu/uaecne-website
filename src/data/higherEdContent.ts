/**
 * Higher Education content — three institutions under one Ministries
 * section, each with a genuinely different shape (a governing council vs.
 * two full academic institutions with different distinctive sections).
 * Deliberately NOT one uniform `Record<slug, SharedType>` like
 * churchContent/schoolContent — see OPEN_QUESTIONS/recon notes. Each
 * constant below is separately typed; only small structural pieces
 * (Photo, HistoryEntry, HigherEdCTA) are shared.
 *
 * Content verbatim from the three approved mockups (design-reference/
 * uaecne-educational-council.html, uaecne-haigazian-university.html,
 * uaecne-nest.html) and, for the Council, cross-checked against
 * "Educational Counci text.txt" and "Ms. Vartoug Balekjian.docx" — both
 * match the mockup exactly. Armenian (`*Hy`) fields stay null until
 * verified Western Armenian copy is supplied directly — never guessed.
 */

export type Photo = { src: string; alt: string };

export type HistoryEntry = {
  period: string;
  description: string;
  descriptionHy: string | null;
};

// Every mockup's CTA has a real link button (unlike ChurchCTA, which has
// none) — for Haigazian/NEST the button's own visible label names the
// institution's real public domain verbatim ("haigazian.edu.lb" /
// "thenest.edu.lb"), so the href uses that exact string, not a guessed
// URL. The Council's CTA links internally to the already-built /schools
// page — a real, existing route, not invented.
//
// `buttonLabel`/`buttonHref` are independently optional (both-or-neither
// in practice) — the Syria Educational Council's own CTA mockup has no
// button at all (matching ChurchCTA's plain heading+body shape), unlike
// every other Higher Education CTA. Omitting rather than inventing one.
export type HigherEdCTA = {
  heading: string;
  headingHy: string | null;
  body: string;
  bodyHy: string | null;
  buttonLabel?: string;
  buttonHref?: string;
};

// ===================== EDUCATION COUNCIL =====================

export type EducationCouncilContent = {
  heading: string;
  headingHy: string | null;
  subheading: string;
  subheadingHy: string | null;
  about: {
    eyebrow: string;
    eyebrowHy: string | null;
    heading: string;
    headingHy: string | null;
    paragraphs: string[];
    paragraphsHy: string[] | null;
  };
  structure: {
    eyebrow: string;
    eyebrowHy: string | null;
    heading: string;
    headingHy: string | null;
    cards: {
      number: string;
      title: string;
      titleHy: string | null;
      description: string;
      descriptionHy: string | null;
    }[];
  };
  secretary: {
    name: string;
    nameHy: string | null;
    role: string;
    roleHy: string | null;
    photo: Photo | null;
    phone: string;
    email: string;
  };
  cta: HigherEdCTA;
};

export const educationCouncilContent: EducationCouncilContent = {
  heading: "The Educational Council",
  headingHy: null,
  subheading: "Union of the Armenian Evangelical Churches in the Near East",
  subheadingHy: null,

  about: {
    eyebrow: "About the Council",
    eyebrowHy: null,
    heading: "Guiding Armenian Evangelical Education",
    headingHy: null,
    paragraphs: [
      "The Educational Council of the UAECNE operates within the Union by following up on the mission of the Armenian Evangelical schools in Lebanon.",
      "The Armenian Evangelical schools share the common goal of equipping students with a quality Christian Armenian education, adhering to the governmental curriculum, and enhancing their Armenian identity and Evangelical heritage.",
    ],
    paragraphsHy: null,
  },

  structure: {
    eyebrow: "Composition",
    eyebrowHy: null,
    heading: "How the Council Is Formed",
    headingHy: null,
    cards: [
      {
        number: "7",
        title: "Members",
        titleHy: null,
        description:
          "The Council consists of seven members guiding the mission of the Armenian Evangelical schools.",
        descriptionHy: null,
      },
      {
        number: "3",
        title: "Year Terms",
        titleHy: null,
        description:
          "Members are elected during the General Assembly of the Union for a renewable three-year term.",
        descriptionHy: null,
      },
      {
        number: "+1",
        title: "Coordinator",
        titleHy: null,
        description:
          "The Council may hire a coordinator to execute its decisions and represent it when needed.",
        descriptionHy: null,
      },
    ],
  },

  // Real photo, phone, and email — MD5-confirmed copied from "Ms. Vartoug
  // Balekjian Photo.jpg" / "Ms. Vartoug Balekjian.docx". No Council logo
  // exists anywhere in the source folder — the hero/index use a generic
  // seal icon instead (see OPEN_QUESTIONS: Council logo pending).
  secretary: {
    name: "Ms. Vartoug Balekjian",
    nameHy: null,
    role: "Council Secretary",
    roleHy: null,
    photo: { src: "/higher-ed-council-secretary.jpg", alt: "Ms. Vartoug Balekjian" },
    phone: "70-12 93 47",
    email: "vartougbalekjian@gmail.com",
  },

  cta: {
    heading: "The Schools We Serve",
    headingHy: null,
    body: "The Educational Council follows up on the mission of the Armenian Evangelical schools of Lebanon — equipping students with a quality Christian Armenian education.",
    bodyHy: null,
    buttonLabel: "View the Schools",
    buttonHref: "/schools",
  },
};

// ===================== SHARED INSTITUTION SHAPE =====================
// Haigazian and NEST are both full academic institutions and share this
// core shape (masthead+seal, hero, facts bar, About+President+pull-quote,
// history timeline, CTA) — rendered via the shared components in
// src/components/highered/. Each also carries its own bespoke sections
// (typed separately below, not part of this shared shape).

type InstitutionCore = {
  slug: string;
  masthead: {
    heading: string;
    headingHy: string | null;
    locationLine: string;
    locationLineHy: string | null;
    established: string;
  };
  logo: Photo | null;
  heroPhoto: Photo | null;
  factsBar: { label: string; labelHy: string | null; sub: string; subHy: string | null }[];
  about: {
    eyebrow: string;
    eyebrowHy: string | null;
    heading: string;
    headingHy: string | null;
    paragraphs: string[];
    paragraphsHy: string[] | null;
    pullQuote: string | null;
    pullQuoteHy: string | null;
  };
  president: {
    name: string;
    nameHy: string | null;
    role: string;
    roleHy: string | null;
    photo: Photo | null;
  };
  history: {
    eyebrow: string;
    eyebrowHy: string | null;
    heading: string;
    headingHy: string | null;
    entries: HistoryEntry[];
  };
  cta: HigherEdCTA;
};

// ===================== HAIGAZIAN UNIVERSITY =====================

export type HaigazianContent = InstitutionCore & {
  motto: {
    eyebrow: string;
    eyebrowHy: string | null;
    plain1: string;
    highlighted: string;
    plain2: string;
    sub: string;
    subHy: string | null;
  };
  faculties: {
    eyebrow: string;
    eyebrowHy: string | null;
    heading: string;
    headingHy: string | null;
    schools: { name: string; items: string[] }[];
    degrees: string[];
  };
  classBand: {
    kicker: string;
    heading: string;
    headingHy: string | null;
    photo: Photo;
  };
};

export const haigazianContent: HaigazianContent = {
  slug: "haigazian-university",

  masthead: {
    heading: "Haigazian University",
    headingHy: null,
    locationLine: "Rue Mexique, Kantari, Beirut, Lebanon",
    locationLineHy: null,
    established: "1955",
  },

  // Real seal — MD5-confirmed from "Haigazian-University-LOGO.png".
  logo: { src: "/higher-ed-haigazian-logo.png", alt: "Haigazian University seal" },
  // Real campus photo — MD5-confirmed from "Haigazian University Building
  // Main.jpeg"; visibly shows the same seal on the building itself.
  heroPhoto: { src: "/higher-ed-haigazian-hero.jpeg", alt: "Haigazian University campus building" },

  factsBar: [
    { label: "1955", labelHy: null, sub: "Founded", subHy: null },
    { label: "Kantari, Beirut", labelHy: null, sub: "Campus", subHy: null },
    { label: "Liberal Arts", labelHy: null, sub: "American Model", subHy: null },
    { label: "English", labelHy: null, sub: "Instruction", subHy: null },
  ],

  about: {
    eyebrow: "The Institution",
    eyebrowHy: null,
    heading: "About the University",
    headingHy: null,
    paragraphs: [
      "Haigazian University is a private institution of higher education in Kantari, Beirut, founded in 1955 by the Union of the Armenian Evangelical Churches in the Near East and the Armenian Missionary Association of America. Rooted in the Armenian Evangelical heritage and following the American liberal arts educational model, the University provides undergraduate and graduate education in English to students from diverse backgrounds.",
      "Named in honor of Armenian educator Rev. Dr. Armenag Haigazian, the University combines academic excellence, ethical leadership, and service with the preservation and advancement of Armenian heritage within the multicultural context of Lebanon.",
    ],
    paragraphsHy: null,
    pullQuote:
      "“Inspired by the Armenian Evangelical heritage and following the American liberal arts educational model, Haigazian University’s mission is to promote academic excellence.”",
    pullQuoteHy: null,
  },

  // Real portrait — MD5-confirmed from "Rev. Dr. Paul Haidostian
  // President.jpg".
  president: {
    name: "Rev. Dr. Paul Ara Haidostian",
    nameHy: null,
    role: "President",
    roleHy: null,
    photo: { src: "/higher-ed-haigazian-president.jpg", alt: "Rev. Dr. Paul Ara Haidostian" },
  },

  history: {
    eyebrow: "Heritage",
    eyebrowHy: null,
    heading: "A Seventy-Year Journey",
    headingHy: null,
    entries: [
      {
        period: "1955",
        description:
          "Founded in Beirut on October 17, 1955 as Haigazian College — an American-style liberal arts college established by the UAECNE and the AMAA, beginning with 43 students. Named for Rev. Dr. Armenag Haigazian (1870–1921), Armenian Evangelical theologian and educator.",
        descriptionHy: null,
      },
      {
        period: "1966–1971",
        description:
          "Recognized as an institution of higher learning by the Lebanese Ministry of Education (1966); its BA and BS degrees were recognized as equivalent to the Lebanese licence (1971).",
        descriptionHy: null,
      },
      {
        period: "1992–1996",
        description:
          "Became Haigazian University College in 1992; by Lebanese decree of December 28, 1996, the institution was authorized to bear the name Haigazian University and to offer graduate programs.",
        descriptionHy: null,
      },
      {
        period: "1997–2010",
        description:
          "After relocating during the Lebanese war, classes returned to the original Kantari campus in 1997. The Heritage Building, acquired in a 2004 expansion, was inaugurated in 2010.",
        descriptionHy: null,
      },
    ],
  },

  motto: {
    eyebrow: "The University Motto",
    eyebrowHy: null,
    plain1: "Truth, ",
    highlighted: "Freedom,",
    plain2: " Service",
    sub: "Borne on the university seal — a calling to knowledge, liberty, and service to Lebanon and the world.",
    subHy: null,
  },

  faculties: {
    eyebrow: "Academics",
    eyebrowHy: null,
    heading: "Schools & Faculties",
    headingHy: null,
    schools: [
      {
        name: "School of Arts & Sciences",
        items: [
          "Faculty of Sciences",
          "Faculty of Social & Behavioral Sciences",
          "Faculty of Humanities",
        ],
      },
      {
        name: "School of Business",
        items: ["Faculty of Business Administration & Economics"],
      },
    ],
    degrees: ["BA", "BBA", "BS", "MA", "MBA", "Teaching Diplomas"],
  },

  // Real event photo — MD5-confirmed from "haigazian-Class2026.jpg";
  // visibly reads "CLASS OF 2026" and "HAIGAZIAN UNIVERSITY 1955" on the
  // stage banners.
  classBand: {
    kicker: "Student Life",
    heading: "Class of 2026",
    headingHy: null,
    photo: {
      src: "/higher-ed-haigazian-class-2026.jpg",
      alt: "Haigazian University Class of 2026 graduation",
    },
  },

  // "Only Armenian university in the Diaspora" kept as the mockup's own
  // attributed self-description ("Haigazian describes itself as..."), not
  // asserted as verified fact by us. No enrollment figure — omitted, not
  // invented (never present in the source).
  cta: {
    heading: "An Armenian University in the Diaspora",
    headingHy: null,
    body: "Haigazian describes itself as the only Armenian university in the Diaspora — a Lebanese institution, open to students of all backgrounds, sustained by the Armenian Evangelical community and the Union of the Armenian Evangelical Churches in the Near East.",
    bodyHy: null,
    buttonLabel: "Visit haigazian.edu.lb",
    buttonHref: "https://haigazian.edu.lb",
  },
};

// ===================== NEAR EAST SCHOOL OF THEOLOGY =====================

export type NestContent = InstitutionCore & {
  sponsors: {
    eyebrow: string;
    eyebrowHy: string | null;
    heading: string;
    headingHy: string | null;
    intro: string;
    introHy: string | null;
    churches: { name: string; highlighted: boolean }[];
    note: string;
    noteHy: string | null;
  };
  degrees: {
    eyebrow: string;
    eyebrowHy: string | null;
    heading: string;
    headingHy: string | null;
    items: { abbr: string; name: string }[];
    footnote: string;
    footnoteHy: string | null;
  };
  leadership: {
    eyebrow: string;
    eyebrowHy: string | null;
    heading: string;
    headingHy: string | null;
    people: {
      name: string;
      nameHy: string | null;
      role: string;
      roleHy: string | null;
      photo: Photo | null;
    }[];
  };
};

export const nestContent: NestContent = {
  slug: "near-east-school-of-theology",

  masthead: {
    heading: "Near East School of Theology",
    headingHy: null,
    locationLine: "Sourati Street, Hamra, Beirut, Lebanon",
    locationLineHy: null,
    established: "1932",
  },

  // Real seal — MD5-confirmed from "NEST-logo.png".
  logo: { src: "/higher-ed-nest-logo.png", alt: "Near East School of Theology seal" },
  // Real building photo — MD5-confirmed from "NEST Main.webp"; visibly
  // labeled "NEAR EAST SCHOOL OF THEOLOGY" on the entrance. The mockup
  // itself only had a photo-pending hero because this file wasn't sourced
  // yet at the time — now resolved, no placeholder needed.
  heroPhoto: { src: "/higher-ed-nest-hero.webp", alt: "Near East School of Theology building entrance" },

  factsBar: [
    { label: "1932", labelHy: null, sub: "Established", subHy: null },
    { label: "1835", labelHy: null, sub: "Heritage Traced To", subHy: null },
    { label: "Hamra, Beirut", labelHy: null, sub: "Ras Beirut", subHy: null },
    { label: "Interconfessional", labelHy: null, sub: "Protestant", subHy: null },
  ],

  // No motto and no enrollment figure exist anywhere in the NEST mockup —
  // both omitted, never invented.
  about: {
    eyebrow: "The Institution",
    eyebrowHy: null,
    heading: "About the School",
    headingHy: null,
    paragraphs: [
      "The Near East School of Theology (NEST) is an interconfessional Protestant institution of higher theological education in Beirut, Lebanon. Formed in 1932 through the merger of the School for Religious Workers in Beirut and the School of Religion in Athens, NEST traces its heritage of Protestant theological education in the Near East to 1835.",
      "Located in Ras Beirut near the American University of Beirut, the School prepares men and women for Christian ministry through theological education, spiritual formation, pastoral training, and leadership development — and serves as a resource center for the churches and the wider community.",
    ],
    paragraphsHy: null,
    pullQuote:
      "“An interconfessional Protestant Seminary rooted in the historic Christian faith and in the traditions of the Protestant Reformation.”",
    pullQuoteHy: null,
  },

  // Real photo — MD5-confirmed from "Dr. Martin Accad.webp".
  president: {
    name: "Dr. Martin Accad",
    nameHy: null,
    role: "President",
    roleHy: null,
    photo: { src: "/higher-ed-nest-president.webp", alt: "Dr. Martin Accad" },
  },

  history: {
    eyebrow: "Heritage",
    eyebrowHy: null,
    heading: "Nearly Two Centuries of Theological Education",
    headingHy: null,
    entries: [
      {
        period: "1835",
        description:
          "Rev. William Thomson founds what the School describes as the first Protestant seminary in the region, in Beirut — the root of NEST's theological heritage.",
        descriptionHy: null,
      },
      {
        period: "1843–1866",
        description:
          "The seminary moves to Abey (Abeih), Mount Lebanon, under Dr. Cornelius Van Dyck, noted for translating the Bible into Arabic. The Syrian Protestant College — now the American University of Beirut — grew out of the Abey Seminary in 1866.",
        descriptionHy: null,
      },
      {
        period: "1932",
        description:
          "NEST is formally established on November 11, 1932, through the merger of the School for Religious Workers in Beirut and the School of Religion in Athens, with Gaius Greenslade as Principal and Loutfi Levonian as Dean.",
        descriptionHy: null,
      },
      {
        period: "1966–1971",
        description:
          "Recognized by the Lebanese Ministry of Education as an Institution of Higher Learning (1966); NEST moves into its present purpose-built campus in Ras Beirut in 1971.",
        descriptionHy: null,
      },
    ],
  },

  sponsors: {
    eyebrow: "Ecumenical Foundation",
    eyebrowHy: null,
    heading: "Four Sponsoring Churches",
    headingHy: null,
    intro:
      "NEST is jointly sponsored by four Protestant church bodies of the region — a distinctive interconfessional partnership in theological education.",
    introHy: null,
    churches: [
      { name: "National Evangelical Synod of Syria and Lebanon", highlighted: false },
      { name: "Union of the Armenian Evangelical Churches in the Near East", highlighted: true },
      { name: "Diocese of Jerusalem of the Episcopal Church", highlighted: false },
      { name: "Evangelical Lutheran Church in Jordan and the Holy Land", highlighted: false },
    ],
    note: "The Union of the Armenian Evangelical Churches in the Near East joined as a sponsoring body in 1945.",
    noteHy: null,
  },

  degrees: {
    eyebrow: "Academics",
    eyebrowHy: null,
    heading: "Degrees & Programs",
    headingHy: null,
    items: [
      { abbr: "B.Th.", name: "Bachelor of Theology" },
      { abbr: "B.Th.C.E.", name: "Bachelor of Theology in Christian Education" },
      { abbr: "M.Div.", name: "Master of Divinity" },
      { abbr: "M.A.C.E.", name: "Master of Christian Education" },
      { abbr: "S.T.M.", name: "Master of Sacred Theology" },
      { abbr: "Dip.", name: "Diploma in Theological Studies" },
    ],
    footnote:
      "The Bachelor in Christian Education (B.A.C.E.) is granted by Haigazian University, with which NEST cooperates for part of the program. NEST also maintains cross-registration with the American University of Beirut and the Lebanese American University.",
    footnoteHy: null,
  },

  // Real photo MD5-confirmed — "Dr. Martin Accad.webp" (reused from the
  // About/President card above). Dr. Rima Nasrallah van Saane's entry was
  // removed 2026-08-26 — she has left NEST.
  leadership: {
    eyebrow: "Leadership",
    eyebrowHy: null,
    heading: "Office of the President",
    headingHy: null,
    people: [
      {
        name: "Dr. Martin Accad",
        nameHy: null,
        role: "President · Professor of Islam and Christian-Muslim Relations",
        roleHy: null,
        photo: { src: "/higher-ed-nest-president.webp", alt: "Dr. Martin Accad" },
      },
    ],
  },

  cta: {
    heading: "A Shared Ministry of Formation",
    headingHy: null,
    body: "The Union of the Armenian Evangelical Churches in the Near East is one of four church bodies that sponsor the Near East School of Theology — a shared commitment to preparing servants for the Church across the region.",
    bodyHy: null,
    buttonLabel: "Visit thenest.edu.lb",
    buttonHref: "https://thenest.edu.lb",
  },
};

// ===================== SYRIA EDUCATIONAL COUNCIL =====================
// A 4th, genuinely different branch (governing body for Syria's 6 schools,
// not a Lebanon-shaped council and not a school-detail page) — its own
// type, not squeezed into EducationCouncilContent or SchoolContent. Content
// verbatim from design-reference/syria-educational-council.html,
// cross-checked against "ՍՈՒՐԻՈՅ ՀԱՅ ԱՒԵՏԱՐԱՆԱԿԱՆ ԿՐԹԱԿԱՆ ԽՈՐՀՈՒՐԴ.docx" —
// every section matched exactly, including all 4 "Areas of Work" and the
// full 4-person leadership roster (independently verified against the
// docx, not taken from the mockup alone — see OPEN_QUESTIONS). `location`/
// `contactRows` are typed to match SchoolContent's own shape exactly
// (imported, not duplicated) so SchoolContactSection can be reused as-is.

import type { SchoolContent, SchoolContactRow } from "./schoolContent";

export type SyriaEducationalCouncilContent = {
  slug: string;
  heading: string;
  headingHy: string | null;
  subheading: string;
  subheadingHy: string | null;
  metaLine: string;
  metaLineHy: string | null;
  logo: Photo | null;

  factsBar: { label: string; labelHy: string | null; sub: string; subHy: string | null }[];

  overview: {
    eyebrow: string;
    eyebrowHy: string | null;
    heading: string;
    headingHy: string | null;
    paragraphs: string[];
    paragraphsHy: string[] | null;
  };

  // Same shape as SchoolContent["visionMission"] — rendered via the
  // cross-imported SchoolVisionMission component, unmodified.
  missionVision: {
    eyebrow: string;
    eyebrowHy: string | null;
    heading: string;
    headingHy: string | null;
    cards: { title: string; titleHy: string | null; body: string; bodyHy: string | null }[];
  };

  areas: {
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
  };

  schools: {
    eyebrow: string;
    eyebrowHy: string | null;
    heading: string;
    headingHy: string | null;
    items: { city: string; name: string; href: string; crest: Photo | null }[];
  };

  roster: {
    eyebrow: string;
    eyebrowHy: string | null;
    heading: string;
    headingHy: string | null;
    photo: Photo | null;
    photoCaption: string | null;
    photoCaptionHy: string | null;
    people: { name: string; nameHy: string | null; role: string; roleHy: string | null }[];
  };

  location: SchoolContent["location"];
  contactRows: SchoolContactRow[] | null;

  cta: HigherEdCTA;
};

export const syriaEducationalCouncilContent: SyriaEducationalCouncilContent = {
  slug: "syria-educational-council",

  heading: "Armenian Evangelical Educational Council",
  headingHy: null,
  subheading: "Community of Syria",
  subheadingHy: null,
  metaLine: "Governing the six Armenian Evangelical schools of Syria · Aleppo",
  metaLineHy: null,

  // "1.png" — an AI-generated-style crest (same 5625×5625-canvas,
  // glossy-3D tell as every Syria school logo this unit), used as-supplied
  // per Yeghia's standing "use the emblems as is" ruling — flagged, not
  // withheld.
  logo: { src: "/higher-ed-syria-council-emblem.png", alt: "Educational Council crest" },

  factsBar: [
    { label: "6", labelHy: null, sub: "Schools", subHy: null },
    { label: "4", labelHy: null, sub: "In Aleppo", subHy: null },
    { label: "1", labelHy: null, sub: "In Damascus", subHy: null },
    { label: "1", labelHy: null, sub: "In Kessab", subHy: null },
  ],

  overview: {
    eyebrow: "Overview",
    eyebrowHy: null,
    heading: "The Highest Body for Our Schools",
    headingHy: null,
    paragraphs: [
      "The Educational Council of the Armenian Evangelical Community of Syria is the highest body responsible for the community's education. It shapes educational policy, sets strategic direction, and oversees its schools — six in all: four in Aleppo, one in Damascus, and one in Kessab. Together these schools carry forward an educational mission more than a century old.",
    ],
    paragraphsHy: null,
  },

  missionVision: {
    eyebrow: "Our Purpose",
    eyebrowHy: null,
    heading: "Mission & Vision",
    headingHy: null,
    cards: [
      {
        title: "Mission",
        titleHy: null,
        body: "To ensure a high standard of education grounded in Christian, national, and universal human values — raising conscious, responsible, capable, and service-minded generations, ready to contribute to the community and to the life of the homeland.",
        bodyHy: null,
      },
      {
        title: "Vision",
        titleHy: null,
        body: "To create a modern, safe, and inspiring educational environment in which knowledge, moral values, creative thinking, and social responsibility grow — strengthening the community's schools as pillars of Syria's educational and cultural life.",
        bodyHy: null,
      },
    ],
  },

  // All 4 areas independently confirmed against the docx's own 4 headed
  // sections (Academic Oversight / Administrative & Organizational
  // Management / Economic Management / Institutional Development) —
  // matched point-for-point, not paraphrased from the mockup alone.
  areas: {
    eyebrow: "What the Council Does",
    eyebrowHy: null,
    heading: "Four Areas of Work",
    headingHy: null,
    items: [
      {
        icon: "#ic-book",
        title: "Academic Oversight",
        titleHy: null,
        description: "Setting educational policy and strategy, monitoring teaching quality, improving curricula, and developing teachers.",
        descriptionHy: null,
      },
      {
        icon: "#ic-gear",
        title: "Administration",
        titleHy: null,
        description: "Keeping the schools running well, and coordinating buildings, materials, and technical needs.",
        descriptionHy: null,
      },
      {
        icon: "#ic-coins",
        title: "Financial Management",
        titleHy: null,
        description: "Financial planning and oversight, and the effective distribution of resources across the schools.",
        descriptionHy: null,
      },
      {
        icon: "#ic-growth",
        title: "Institutional Development",
        titleHy: null,
        description: "Long-term strategy, and strengthening the educational, cultural, and social role of the schools.",
        descriptionHy: null,
      },
    ],
  },

  // Hrefs verified against the 6 live school routes already built this
  // session — not invented slugs. Crests reused from each school's own
  // already-committed emblem file, not duplicated.
  schools: {
    eyebrow: "Under the Council",
    eyebrowHy: null,
    heading: "The Six Schools",
    headingHy: null,
    items: [
      {
        city: "Aleppo",
        name: "Armenian Evangelical Bethel Secondary School",
        href: "/schools/bethel-secondary-school",
        crest: { src: "/school-bethel-secondary-school-emblem.png", alt: "" },
      },
      {
        city: "Aleppo",
        name: "Aleppo College for Girls",
        href: "/schools/aleppo-college-for-girls",
        crest: { src: "/school-aleppo-college-for-girls-emblem.png", alt: "" },
      },
      {
        city: "Aleppo",
        name: "Syriac Evangelical School",
        href: "/schools/syriac-evangelical-school",
        crest: { src: "/school-syriac-evangelical-emblem.png", alt: "" },
      },
      {
        city: "Aleppo",
        name: "Armenian Evangelical Emmanuel School (Al Ressaleh)",
        href: "/schools/emmanuel-al-ressaleh-school",
        crest: { src: "/school-emmanuel-al-ressaleh-emblem.png", alt: "" },
      },
      {
        city: "Kessab",
        name: "Armenian Evangelical Martyrs' School",
        href: "/schools/kessab-martyrs-school",
        crest: { src: "/school-kessab-martyrs-emblem.png", alt: "" },
      },
      {
        city: "Damascus",
        name: "Armenian Evangelical Kenats (Life) School",
        href: "/schools/damascus-kenats-al-hayat-school",
        crest: { src: "/school-damascus-kenats-al-hayat-emblem.png", alt: "" },
      },
    ],
  },

  // Real photo of the actual 4 roster members, in the Council's own
  // office (a real wooden seal reading "ARMENIAN PROTESTANT COMMUNITY IN
  // SYRIA" is visible on the wall) — not the mockup's own lower-quality
  // embedded copy. Individual name labels aren't attached to the group
  // photo itself (matching the mockup's own footer note: "shown without
  // individual name labels, as the source did not identify who is who"),
  // but the 4 names below are independently confirmed by the docx.
  roster: {
    eyebrow: "Leadership",
    eyebrowHy: null,
    heading: "The Educational Council",
    headingHy: null,
    photo: {
      src: "/higher-ed-syria-council-roster.jpg",
      alt: "The Syria Armenian Evangelical Educational Council",
    },
    photoCaption: "The Educational Council, at the Armenian Evangelical Community of Syria.",
    photoCaptionHy: null,
    people: [
      {
        name: "Rev. Dr. Haroutune Selimian",
        nameHy: null,
        role: "President & License-Holder of the Schools",
        roleHy: null,
      },
      {
        name: "Mrs. Araz Mansourian-Shahinian",
        nameHy: null,
        role: "Secretary",
        roleHy: null,
      },
      {
        name: "Miss Dalar Tabbakh",
        nameHy: null,
        role: "Assistant Secretary",
        roleHy: null,
      },
      {
        name: "Mrs. Maria Bozayagalian",
        nameHy: null,
        role: "Representative Member",
        roleHy: null,
      },
    ],
  },

  // P.O. Box 3833 — the same box already shared by ACG/Bethel/Emmanuel al
  // Ressaleh (OPEN_QUESTIONS items 90/98). This is very likely the reason:
  // it's this Council's own office box, and those are 3 of the 4 Aleppo
  // schools it governs. Logged as a likely resolution, not asserted fact —
  // see OPEN_QUESTIONS.
  location: {
    addressLines: ["Aleppo, Syria", "P.O. Box 3833"],
    addressLinesHy: null,
  },

  // All verified, real (not pending). Per the mockup's own footer note,
  // the source contact table had the President's Email/Cellphone rows
  // swapped — confirmed directly in the docx (Email field held a phone
  // number, Cellphone field held an email address). The office contact
  // block below is used throughout instead of that swapped personal row.
  contactRows: [
    {
      key: "Phone",
      keyHy: null,
      value: "+963 21 4 666 700",
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
      value: "apcsofficedirectorsyria@gmail.com",
      valueHy: null,
      href: "mailto:apcsofficedirectorsyria@gmail.com",
    },
    {
      key: "Facebook",
      keyHy: null,
      value: "Armenian Evangelical Educational Council in Syria",
      valueHy: null,
      href: "https://www.facebook.com/profile.php?id=100064268012369",
    },
  ],

  // No button in this mockup's own CTA (unlike every other Higher
  // Education page) — `buttonLabel`/`buttonHref` genuinely omitted, not
  // invented (HigherEdCTA's type made optional this unit to support this).
  cta: {
    heading: "One Council, Six Schools, One Mission",
    headingHy: null,
    body: "Together, these six institutions continue the Armenian Evangelical Community of Syria's educational mission of more than a century — raising conscious, educated generations who keep their national identity and are guided by Christian values. The Council serves them all, within the Union of the Armenian Evangelical Churches in the Near East.",
    bodyHy: null,
  },
};
