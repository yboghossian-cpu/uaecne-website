/**
 * Outreach content — three sections under a new top-level nav item, each
 * with a genuinely different shape (a campsite with history + gallery vs.
 * a youth organization with a director + stats vs. a social-service
 * committee with program pillars + children's programs). Deliberately NOT
 * one uniform `Record<slug, SharedType>` — same rationale as
 * higherEdContent.ts. Each constant is separately typed; shared structural
 * pieces (Photo, StatCard, CTA) are factored out.
 *
 * Content verbatim from the three approved mockups (design-reference/
 * uaecne-camps-kchag.html, uaecne-youth-work.html,
 * uaecne-social-action-committee.html), cross-checked against their real
 * source docs ("History of KCHAG.txt", "CE and KCHAG.docx", "SAC.docx",
 * "SAC 2- Lena.docx") — all match the mockups exactly, with one deliberate
 * exception: the Social Action Committee's About paragraph is standardized
 * to "Social Action Committee" throughout (the source doc itself says "The
 * Social Work Center...", and a second source doc uses "AESAC" in its own
 * heading — both are names Yeghia explicitly ruled out in favor of the
 * page's own title, "Social Action Committee." A deliberate naming
 * standardization, not a content error — see OPEN_QUESTIONS).
 * Armenian (`*Hy`) fields stay null until verified Western Armenian copy
 * is supplied directly — never guessed.
 */

export type Photo = { src: string; alt: string };

export type StatCard = {
  number: string;
  caption: string;
  captionHy: string | null;
};

// Every mockup's CTA has an optional real link button (Youth Work
// cross-links to /outreach/camps; Camps and SAC have none).
export type OutreachCTA = {
  heading: string;
  headingHy: string | null;
  body: string;
  bodyHy: string | null;
  buttonLabel: string | null;
  buttonHref: string | null;
};

// ===================== CAMPS (KCHAG) =====================

export type CampsContent = {
  slug: string;
  title: string;
  titleHy: string | null;
  subtitlePlain: string;
  subtitleBold: string;
  heroPhoto: Photo | null;
  campsites: {
    label: string;
    paragraphs: string[];
  };
  history: {
    eyebrow: string;
    eyebrowHy: string | null;
    heading: string;
    headingHy: string | null;
    paragraphs: string[];
    paragraphsHy: string[] | null;
    milestones: StatCard[];
  };
  purpose: {
    eyebrow: string;
    eyebrowHy: string | null;
    body: string;
    bodyHy: string | null;
  };
  gallery: {
    eyebrow: string;
    eyebrowHy: string | null;
    heading: string;
    headingHy: string | null;
    photos: Photo[];
  };
  cta: OutreachCTA;
};

export const campsContent: CampsContent = {
  slug: "camps",
  title: "Camps",
  titleHy: null,
  subtitlePlain: "The Christian Endeavour Summer Center · ",
  subtitleBold: "KCHAG",

  // Real photo — MD5-confirmed from "KCHAG church main.jpeg".
  heroPhoto: { src: "/outreach-camps-hero.jpeg", alt: "KCHAG chapel and campsite" },

  campsites: {
    label: "KCHAG\nCampsites",
    paragraphs: [
      "KCHAG is a campsite located in Monteverdi, Lebanon and in Kessab, Syria, belonging to the Union of the Armenian Evangelical Churches in the Near East.",
      "The management of the campsites is entrusted to the Christian Endeavour Union.",
      "KCHAG operates under the administration of the KCHAG Committee, assigned by the CE Union Executive Committee.",
    ],
  },

  history: {
    eyebrow: "Our Story",
    eyebrowHy: null,
    heading: "A Rich Past, A Great Future",
    headingHy: null,
    paragraphs: [
      "In 1949, several young visionaries carried out a long-awaited dream by purchasing five beautiful hillside acres just outside Beirut and hosting the first youth conference at the Christian Endeavor Summer Center (KCHAG). Over 100 young men and women enthusiastically attended, pitching tents until buildings were constructed.",
      "By 1960, KCHAG boasted over 30 buildings, including a chapel, dining hall, snack shop, and sports field — a vibrant life that became the heartbeat of the Armenian Evangelical community. Dozens of children's and youth camps, women's conferences, church retreats, and educational programs were planned annually by Armenian and non-Armenian evangelical churches and sister organizations alike.",
      "The 1975 civil war and the three decades that followed interrupted and damaged KCHAG in a major way. Since 2002, cleanup and renovation has started at a slow pace. It is time to dedicate more time, resources and efforts. KCHAG has had a rich past. By faith and work, it can also have a great future for ministry and community development.",
    ],
    paragraphsHy: null,
    milestones: [
      { number: "1949", caption: "Founded — five hillside acres, first youth conference", captionHy: null },
      { number: "1960", caption: "Over 30 buildings — the heartbeat of the community", captionHy: null },
      { number: "2002", caption: "Renovation begins — rebuilding for the future", captionHy: null },
    ],
  },

  purpose: {
    eyebrow: "Purpose",
    eyebrowHy: null,
    body: "The campsites serve as the venue for the CE Union's summer camps and various activities throughout the year — bringing together Armenian Evangelical youth from across Lebanon and Syria for spiritual growth, fellowship, and community building.",
    bodyHy: null,
  },

  // No real gallery photos exist yet — all 6 slots render "photo pending",
  // matching the mockup exactly (never invented).
  gallery: {
    eyebrow: "Life at KCHAG",
    eyebrowHy: null,
    heading: "Gallery",
    headingHy: null,
    photos: [],
  },

  cta: {
    heading: "By Faith and Work",
    headingHy: null,
    body: "KCHAG has had a rich past. By faith and work, it can also have a great future for ministry and community development — a place of spiritual growth and fellowship for generations of Armenian Evangelical youth.",
    bodyHy: null,
    buttonLabel: null,
    buttonHref: null,
  },
};

// ===================== YOUTH WORK (CE UNION) =====================

export type YouthWorkContent = {
  slug: string;
  title: string;
  titleHy: string | null;
  subtitlePlain: string;
  subtitleBold: string;
  heroPhoto: Photo | null;
  about: {
    eyebrow: string;
    eyebrowHy: string | null;
    heading: string;
    headingHy: string | null;
    paragraphs: string[];
    paragraphsHy: string[] | null;
  };
  director: {
    name: string;
    photo: Photo | null;
  };
  ceUnion: {
    label: string;
    paragraphs: string[];
  };
  stats: StatCard[];
  programs: {
    eyebrow: string;
    eyebrowHy: string | null;
    heading: string;
    headingHy: string | null;
    items: string[];
  };
  cta: OutreachCTA;
};

export const youthWorkContent: YouthWorkContent = {
  slug: "youth-work",
  title: "Youth Work",
  titleHy: null,
  subtitlePlain: "The Christian Endeavour Union · ",
  subtitleBold: "Armenian Evangelical Youth",

  // No real group photo exists yet — photo-pending fallback.
  heroPhoto: null,

  about: {
    eyebrow: "The Ministry",
    eyebrowHy: null,
    heading: "About the CE Union",
    headingHy: null,
    paragraphs: [
      "CE joint programs are directed by Pastor Datev Basmajian, who organizes camps, retreats, trainings, seminars, sports events, social and media ministry, and Christmas and Easter events.",
      "CE members participate in weekly meetings in their respective churches, as well as joint programs including camps, retreats, trainings, seminars, sports events, social and media ministry, and Christmas and Easter events. The objective of the CE Union is to educate youth spiritually, mentally, emotionally, and physically — helping them become mature and responsible citizens.",
    ],
    paragraphsHy: null,
  },

  // Real photo — reused from the already-tracked, MD5-identical
  // public/central-committee-datev-basmajian.jpg (not re-copied). Name
  // only, no title/role shown on the card, matching the mockup exactly.
  director: {
    name: "Pastor Datev Basmajian",
    photo: { src: "/central-committee-datev-basmajian.jpg", alt: "Pastor Datev Basmajian" },
  },

  ceUnion: {
    label: "Christian\nEndeavour Union",
    paragraphs: [
      "The Christian Endeavour Union of the Armenian Evangelical Churches in Syria (est. 1934) and Lebanon is a church youth organization operating under the umbrella of the UAECNE, responsible for carrying on youth work for juniors and young adults across five Armenian Evangelical churches and schools in Lebanon.",
      "The CE Union is affiliated with the World Christian Endeavor (WCE) and has a board member who participates in their annual international meetings. The Executive Committee consists of 12 members, 7 from Lebanon and 5 from Syria, elected during the CE General Assembly held annually in November.",
    ],
  },

  stats: [
    { number: "1934", caption: "Established in Syria & Lebanon", captionHy: null },
    { number: "12", caption: "Executive Committee members — 7 Lebanon, 5 Syria", captionHy: null },
    { number: "WCE", caption: "Affiliated with the World Christian Endeavor", captionHy: null },
  ],

  programs: {
    eyebrow: "What the CE Union Does",
    eyebrowHy: null,
    heading: "Programs & Activities",
    headingHy: null,
    items: [
      "Camps",
      "Retreats",
      "Trainings",
      "Seminars",
      "Sports Events",
      "Social & Media Ministry",
      "Christmas & Easter Events",
      "Weekly Church Meetings",
    ],
  },

  // "Visit KCHAG Camps" button removed 2026-08-26 — buttonLabel/buttonHref
  // null matches Camps' and SAC's own cta blocks exactly (OutreachCTA
  // renders no button and no wrapping element when both are null).
  cta: {
    heading: "Educating Youth in Faith and Life",
    headingHy: null,
    body: "The CE Union brings together Armenian Evangelical youth across Lebanon and Syria — and its summer camps are held at KCHAG, the Christian Endeavour Summer Center.",
    bodyHy: null,
    buttonLabel: null,
    buttonHref: null,
  },
};

// ===================== SOCIAL ACTION COMMITTEE =====================

export type SocialActionContent = {
  slug: string;
  title: string;
  titleHy: string | null;
  subtitlePlain: string;
  subtitleBold: string;
  heroPhoto: Photo | null;
  about: {
    eyebrow: string;
    eyebrowHy: string | null;
    heading: string;
    headingHy: string | null;
    paragraphs: string[];
    paragraphsHy: string[] | null;
    pullQuote: string;
    pullQuoteHy: string | null;
  };
  impact: {
    eyebrow: string;
    eyebrowHy: string | null;
    heading: string;
    headingHy: string | null;
    stats: StatCard[];
  };
  pillars: {
    eyebrow: string;
    eyebrowHy: string | null;
    heading: string;
    headingHy: string | null;
    rows: {
      kicker: string;
      title: string;
      body: string;
      bullets: string[];
      photo: Photo | null;
      reversed: boolean;
    }[];
  };
  children: {
    eyebrow: string;
    eyebrowHy: string | null;
    heading: string;
    headingHy: string | null;
    intro: string;
    introHy: string | null;
    cards: {
      title: string;
      schedule: string;
      description: string;
      photo: Photo | null;
    }[];
  };
  refugees: {
    eyebrow: string;
    eyebrowHy: string | null;
    body: string;
    bodyHy: string | null;
  };
  cta: OutreachCTA;
};

export const socialActionContent: SocialActionContent = {
  slug: "social-action-committee",
  title: "Social Action Committee",
  titleHy: null,
  subtitlePlain: "The Social Arm of the Union · ",
  subtitleBold: "Serving the Most Vulnerable",

  // No real photo exists yet — photo-pending fallback (mockup's tall
  // 21:9 hero aspect).
  heroPhoto: null,

  // NAMING STANDARDIZATION (Yeghia-approved, 2026-08-21): the source doc
  // ("SAC.docx") says "The Social Work Center of the Union..."; a second
  // source doc ("SAC 2- Lena.docx") uses "AESAC" in its own heading.
  // Standardized to "Social Action Committee" throughout, matching the
  // page's own title — a deliberate naming correction, not a content
  // error. See OPEN_QUESTIONS.
  about: {
    eyebrow: "About the Committee",
    eyebrowHy: null,
    heading: "The Social Arm of the Union",
    headingHy: null,
    paragraphs: [
      "The Social Action Committee of the Union of the Armenian Evangelical Churches in the Near East, based in Lebanon, is a humanitarian institution dedicated to supporting the most vulnerable groups. It serves as the social arm of the Union, committed to serving both the Church and the wider community.",
      "The Committee works to support society through comprehensive social and relief programs — providing healthcare services, promoting the education of children from low-income families, and caring for needy families and elderly individuals and couples.",
    ],
    paragraphsHy: null,
    pullQuote: "Through these efforts, it seeks to uphold human dignity and contribute to improving quality of life.",
    pullQuoteHy: null,
  },

  impact: {
    eyebrow: "Care in Action",
    eyebrowHy: null,
    heading: "Reaching Those in Need",
    headingHy: null,
    stats: [
      { number: "250+", caption: "Families receiving food vouchers and cash support", captionHy: null },
      { number: "0–4", caption: "Milk and diaper contribution for young children", captionHy: null },
      { number: "Syria", caption: "Continued support for Syrian refugees in Lebanon", captionHy: null },
    ],
  },

  pillars: {
    eyebrow: "Programs in Action",
    eyebrowHy: null,
    heading: "How We Serve",
    headingHy: null,
    rows: [
      {
        kicker: "Program One",
        title: "The Elderly",
        body: "Monthly, comprehensive support for impoverished elderly individuals and couples.",
        bullets: [
          "Financial assistance and emergency interventions — rent, utilities, funeral expenses",
          "Healthcare: prescribed medications for chronic illness, diagnostic tests, hospitalization",
          "Sponsoring institutional care at CAHL (Elderly Home) and the Azounieh Armenian Sanatorium",
          "Home maintenance, counseling by a professional psychotherapist, and home visits",
          "Diapers and pads for the bedridden, food vouchers, and gifts at Christmas and Easter",
        ],
        photo: null,
        reversed: false,
      },
      {
        kicker: "Program Two",
        title: "Caring for the Families",
        body: "A holistic approach that searches the root causes of the issues families face.",
        bullets: [
          "Financial support with follow-ups and home visits; rent contribution during hardship",
          "Children's wellbeing — encouraging school enrollment and the Afternoon Study Room",
          "Home care, emergency renovations, hospitalization, and diagnostic tests",
          "Food vouchers and cash for 250+ families; milk and diapers for children aged 0–4",
          "Psychotherapy for Lebanese citizens and Syrian refugees; men's and mothers' Bible studies",
        ],
        photo: null,
        reversed: true,
      },
    ],
  },

  children: {
    eyebrow: "Nurturing the Next Generation",
    eyebrowHy: null,
    heading: "Children's Programs",
    headingHy: null,
    intro:
      "Nurturing the physical, spiritual, psychological, social, and mental growth of children — providing a safe and spiritually comforting environment away from negative influences.",
    introHy: null,
    cards: [
      {
        title: "Afternoon Study Room",
        schedule: "Oct–June · Mon–Fri · 15:00–18:00",
        description:
          "Tutoring and study space for students with learning difficulties or without suitable space to study at home.",
        photo: null,
      },
      {
        title: "Playground",
        schedule: "Saturdays · 8:30–13:00",
        description:
          "Armenian children from different backgrounds gather to worship and play, led by volunteer leaders.",
        photo: null,
      },
      {
        title: "Daily Vacation Bible School",
        schedule: "Five weeks · Summer",
        description: "Worship, Christian social-life guidance, games, and general-knowledge sessions for children.",
        photo: null,
      },
    ],
  },

  refugees: {
    eyebrow: "Standing With the Displaced",
    eyebrowHy: null,
    body: "SAC continues to support the remaining Syrian refugees who are still living in Lebanon — extending care beyond borders and community.",
    bodyHy: null,
  },

  cta: {
    heading: "Upholding Human Dignity",
    headingHy: null,
    body: "Through comprehensive social and relief programs, the Social Action Committee serves the most vulnerable — the elderly, families, children, and refugees — as the social arm of the Union of the Armenian Evangelical Churches in the Near East.",
    bodyHy: null,
    buttonLabel: null,
    buttonHref: null,
  },
};
