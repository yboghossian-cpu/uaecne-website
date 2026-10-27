import type { SocialLinks } from "@/lib/social";
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

export type KchagPhoto = { src: string; alt: string; w: number; h: number };

/** The KCHAG page's scroll story — one chapter per period, using the
 *  Union's own photo folders (Historic, Church Bell, Dining Hall Old, WAR,
 *  Renovation After War, and the 2026 shoot). All text below is taken from
 *  the KCHAG history the Union supplied; nothing is added to it. */
export type KchagStory = {
  wordmark: string;
  heroLine: string;
  heroPlaces: string;
  heroPhoto: KchagPhoto;
  scrollHint: string;
  founding: {
    year: string;
    title: string;
    body: string;
    caption: string;
    photos: KchagPhoto[];
  };
  bell: { title: string; photos: KchagPhoto[] };
  growth: { year: string; title: string; body: string; stat: string; statLabel: string; photos: KchagPhoto[] };
  war: { year: string; title: string; body: string; hint: string; photos: KchagPhoto[] };
  rebuild: {
    year: string;
    title: string;
    body: string;
    before: KchagPhoto;
    after: KchagPhoto;
    beforeLabel: string;
    afterLabel: string;
    sliderLabel: string;
    photos: KchagPhoto[];
  };
  today: { title: string; body: string; hero: KchagPhoto; arch: KchagPhoto; aerial: KchagPhoto; photos: KchagPhoto[] };
};

export type CampsContent = {
  story: KchagStory;
  // Official website / social accounts ("Follow Us" band).
  social?: SocialLinks;
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
  // Programme at KCHAG Kessab (reports from the Armenian Protestant
  // Community in Syria, APCS Drive "KCHAG Camps 2026", English sections).
  kessab: {
    eyebrow: string;
    eyebrowHy: string | null;
    heading: string;
    headingHy: string | null;
    intro: string;
    introHy: string | null;
    eras: BoardingHomeEra[];
  } | null;
  cta: OutreachCTA;
};

const k = (name: string, w: number, h: number, alt: string): KchagPhoto => ({ src: `/kchag/${name}.jpg`, alt, w, h });

export const campsContent: CampsContent = {
  slug: "camps",
  story: {
    wordmark: "KCHAG",
    heroLine: "The Christian Endeavour Summer Center",
    heroPlaces: "Monteverdi, Lebanon and Kessab, Syria",
    heroPhoto: k("hero-aerial", 2400, 1800, "KCHAG from above — the campsite among the pines"),
    scrollHint: "Scroll to begin",
    founding: {
      year: "1949",
      title: "A long-awaited dream",
      body: "In 1949, several young visionaries carried out a long-awaited dream by purchasing five beautiful hillside acres just outside Beirut and hosting the first youth conference at the Christian Endeavor Summer Center (KCHAG). Over 100 young men and women enthusiastically attended, pitching tents until buildings were constructed.",
      caption: "“Christian Endeavour’s First Conference — KCHAG 1949”, as written on the original photograph",
      photos: [
        k("1949-first-conference", 2000, 1454, "The first Christian Endeavour conference at KCHAG, 1949 — group photograph"),
        k("1949-tents-group", 1130, 773, "Campers gathered in front of the tents"),
        k("early-rock", 1364, 965, "A rock painted with the name KCHAG"),
        k("early-cross-sepia", 908, 1269, "A wooden cross on the hillside at sunset"),
        k("1949-tents-group-2", 944, 599, "A group of campers beside the tents"),
        k("early-portrait", 723, 1068, "A man standing on a path among the young trees"),
        k("early-hillside-gathering", 645, 695, "Campers walking down the hillside"),
      ],
    },
    bell: {
      title: "The chapel bell",
      photos: [
        k("bell-close", 1567, 1600, "The KCHAG bell hanging in its wooden frame"),
        k("bell-group", 452, 700, "Three men holding the bell"),
        k("bell-pines", 1091, 752, "Two men beside the bell among the pines"),
        k("early-cross-hill", 1600, 1531, "The wooden cross among the pines"),
      ],
    },
    growth: {
      year: "1960",
      title: "The heartbeat of the community",
      body: "By 1960, KCHAG boasted over 30 buildings, including a chapel, dining hall, snack shop, sports field, and a vibrant life that became the heartbeat of the Armenian Evangelical community. Dozens of children's and youth camps, women's conferences, church retreats, and educational programs were planned annually by Armenian and non-Armenian evangelical churches and sister organizations alike.",
      stat: "30+",
      statLabel: "buildings by 1960",
      photos: [
        k("dining-2", 1500, 1002, "Children at a meal in the dining hall"),
        k("dining-1", 1261, 626, "Campers around the dining hall tables"),
        k("dining-3", 988, 687, "Girls smiling around a dining table"),
        k("dining-counter", 1269, 854, "The serving counter of the old dining hall"),
      ],
    },
    war: {
      year: "1975",
      title: "Interrupted",
      body: "The 1975 civil war and the three decades that followed interrupted and damaged KCHAG in a major way.",
      hint: "Move across the photographs to light them",
      photos: [
        k("war-chapel", 1472, 903, "The chapel during the war years"),
        k("war-building", 1800, 1200, "A damaged two-storey building among the pines"),
        k("war-hall-interior", 1600, 1070, "The empty interior of a damaged hall"),
        k("war-beds", 1600, 1254, "Bare bed frames in a ruined dormitory"),
        k("war-arcade", 1600, 1070, "A long arcaded building, abandoned"),
        k("war-graffiti", 1600, 1200, "A damaged cabin covered in graffiti"),
        k("war-room", 1417, 949, "A ruined room with broken furniture"),
        k("war-foundation", 1800, 1200, "The rubble of a building's foundations"),
        k("war-house", 1134, 759, "A damaged house with broken windows"),
        k("war-porch", 1600, 1070, "A cabin porch overlooking the valley"),
      ],
    },
    rebuild: {
      year: "2002",
      title: "Rebuilding",
      body: "Since 2002, cleanup and renovation has started at a slow pace.",
      before: k("war-chapel", 1472, 903, "The chapel during the war years"),
      after: k("today-chapel-front", 1800, 1200, "The chapel today"),
      beforeLabel: "The war years",
      afterLabel: "Today",
      sliderLabel: "Move over the photograph to see the chapel today",
      photos: [
        k("reno-volunteers", 1600, 1202, "Volunteers in front of a cabin under renovation"),
        k("reno-hall-works", 1600, 1067, "Renovation works inside the hall"),
        k("reno-chapel-works", 1600, 1067, "Works around the chapel"),
        k("reno-cross", 841, 1260, "Fixing the cross on the chapel facade"),
        k("reno-hall-floor", 1600, 1200, "The hall with its new floor"),
        k("reno-cabin-2", 1600, 1067, "A rebuilt cabin with a tiled roof"),
        k("reno-interior", 1600, 1067, "A renovated room"),
        k("reno-cabin-3", 1600, 1067, "A rebuilt cabin among the pines"),
        k("reno-hall", 1600, 1067, "The renovated hall"),
        k("reno-entrance", 1600, 1067, "A renovated entrance"),
        k("reno-terrace", 1800, 1200, "The terrace overlooking the coast"),
        k("reno-chapel-crowd", 1618, 1080, "A crowd gathered at the renovated chapel"),
        k("reno-bell-arches", 1800, 1200, "The bell beneath the chapel arches"),
        k("reno-chapel-group", 1800, 1362, "A group in front of the renovated chapel"),
      ],
    },
    today: {
      title: "A great future",
      body: "It is time to dedicate more time, resources and efforts. KCHAG has had a rich past. By faith and work, it can also have a great future for ministry and community development.",
      hero: k("today-lamps-sunset", 2400, 1600, "Lamps along the KCHAG path at sunset, above the coast"),
      arch: k("today-arch-view", 1800, 1200, "The pines and the valley seen through the chapel arch"),
      aerial: k("today-aerial", 2400, 1800, "The chapel and the camp tent from above"),
      photos: [
        k("today-chapel-side", 1800, 1200, "The chapel in the evening light"),
        k("today-grounds", 1800, 1200, "The camp grounds among the pines"),
        k("today-chapel-front", 1800, 1200, "The chapel facade"),
      ],
    },
  },
  // KCHAG's official site and accounts (linked from kchag.org).
  social: {
    facebook: "https://www.facebook.com/KCHAGLebanon",
    instagram: "https://www.instagram.com/kchag_lebanon/",
    website: "https://www.kchag.org/",
  },
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
      "By 1960, KCHAG boasted over 30 buildings, including a chapel, dining hall, snack shop, sports field, and a vibrant life that became the heartbeat of the Armenian Evangelical community. Dozens of children's and youth camps, women's conferences, church retreats, and educational programs were planned annually by Armenian and non-Armenian evangelical churches and sister organizations alike.",
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
    body: "The CE Union's summer camps and other activities take place in KCHAG.",
    bodyHy: null,
  },

  // Real photos from the CE Union Drive folders (CE/KCHAG, CE/Camps).
  gallery: {
    eyebrow: "Life at KCHAG",
    eyebrowHy: null,
    heading: "Gallery",
    headingHy: null,
    photos: [
      { src: "/outreach-camps-gallery-1.jpg", alt: "Life at KCHAG" },
      { src: "/outreach-camps-gallery-2.jpg", alt: "Life at KCHAG" },
      { src: "/outreach-camps-gallery-3.jpg", alt: "Life at KCHAG" },
      { src: "/outreach-camps-gallery-4.jpg", alt: "Life at KCHAG" },
      { src: "/outreach-camps-gallery-5.jpg", alt: "Life at KCHAG" },
      { src: "/outreach-camps-gallery-6.jpg", alt: "Life at KCHAG" },
      { src: "/outreach-camps-gallery-7.jpg", alt: "Life at KCHAG" },
      { src: "/outreach-camps-gallery-8.jpg", alt: "Life at KCHAG" },
      { src: "/outreach-camps-gallery-9.jpg", alt: "Life at KCHAG" },
      { src: "/outreach-camps-gallery-10.jpg", alt: "Life at KCHAG" },
    ],
  },

  kessab: {
    eyebrow: "KCHAG Kessab",
    eyebrowHy: null,
    heading: "Summer 2026 in Kessab",
    headingHy: null,
    intro: "Retreats and conferences held in Kessab in 2026 by the Armenian Evangelical Churches of Syria, under the auspices of Rev. Dr. Haroutune Selimian, Head of the Armenian Protestant Community in Syria.",
    introHy: null,
    eras: [
      { title: "Youth Retreat", titleHy: null, range: "8–13 August 2026", description: "“Let Us Awake, Let Us Walk Together” (Ephesians 5:14-20). Organized by the Executive Committee of Christian Endeavor of the Armenian Evangelical Churches of Syria; 28 youth from Aleppo and Kessab, with Mrs. Sevan Der Sahagian as general leader and messages by Pastor Simon Der Sahagian.", descriptionHy: null },
      { title: "Children’s Retreat", titleHy: null, range: "17–20 August 2026", description: "“Little Hands, Big Deeds” (John 6:1-14). Organized by the Sunday Schools of the Armenian Evangelical Churches of Syria; 38 children from Aleppo and Kessab, with Mrs. Aline Khatchadourian as general leader, 13 leaders, and messages by Mrs. Sevan Der Sahagian.", descriptionHy: null },
      { title: "Women’s Joint Retreat", titleHy: null, range: "20–24 August 2026", description: "“For I know the plans I have for you, declares the Lord” (Jeremiah 29:11). Organized by the Women’s Board of the Armenian Evangelical Churches; 50 women from Aleppo and Kessab, led by Mrs. Armig Boziakalian, with biblical messages by Pastor Shant Agishian.", descriptionHy: null },
      { title: "Family Retreat", titleHy: null, range: "2026", description: "“Let Us Wake Up and Walk Together,” based on the story of Noah (Genesis 6–9); around 60 participants, with Bible studies led by Rev. Dr. Haroutune Selimian.", descriptionHy: null },
      { title: "C.E. Youth Retreat", titleHy: null, range: "From 3 September 2026", description: "A three-day journey based on Matthew 14:22–33, under the spiritual leadership of Rev. Dr. Haroutune Selimian, with a youth kermess in the courtyard of the Armenian Evangelical School of Kessab on Friday, September 4.", descriptionHy: null },
      { title: "Teachers’ Training Conference", titleHy: null, range: "7–9 September 2026", description: "The teachers of the schools of the Armenian Protestant Community in Syria gathered in Kessab for professional development, spiritual renewal and fellowship, opening with worship at the Holy Trinity Church.", descriptionHy: null },
    ],
  },

  cta: {
    heading: "By Faith and Work",
    headingHy: null,
    body: "KCHAG has had a rich past. By faith and work, it can also have a great future for ministry and community development.",
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
  gallery: {
    eyebrow: string;
    eyebrowHy: string | null;
    heading: string;
    headingHy: string | null;
    photos: Photo[];
  };
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

  // Real photo from the CE Union Drive folder (CE/Trainings).
  heroPhoto: { src: "/outreach-youth-work-hero.jpg", alt: "Christian Endeavour Union youth" },

  gallery: {
    eyebrow: "CE in Action",
    eyebrowHy: null,
    heading: "Gallery",
    headingHy: null,
    photos: [
      { src: "/outreach-youth-work-gallery-1.jpg", alt: "Christian Endeavour Union activities" },
      { src: "/outreach-youth-work-gallery-2.jpg", alt: "Christian Endeavour Union activities" },
      { src: "/outreach-youth-work-gallery-3.jpg", alt: "Christian Endeavour Union activities" },
      { src: "/outreach-youth-work-gallery-4.jpg", alt: "Christian Endeavour Union activities" },
      { src: "/outreach-youth-work-gallery-5.jpg", alt: "Christian Endeavour Union activities" },
      { src: "/outreach-youth-work-gallery-6.jpg", alt: "Christian Endeavour Union activities" },
      { src: "/outreach-youth-work-gallery-7.jpg", alt: "Christian Endeavour Union activities" },
      { src: "/outreach-youth-work-gallery-8.jpg", alt: "Christian Endeavour Union activities" },
      { src: "/outreach-youth-work-gallery-9.jpg", alt: "Christian Endeavour Union activities" },
      { src: "/outreach-youth-work-gallery-10.jpg", alt: "Christian Endeavour Union activities" },
    ],
  },

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

  cta: {
    heading: "Upholding Human Dignity",
    headingHy: null,
    body: "Through comprehensive social and relief programs, the Social Action Committee serves the most vulnerable — the elderly, families, children, and refugees — as the social arm of the Union of the Armenian Evangelical Churches in the Near East.",
    bodyHy: null,
    buttonLabel: null,
    buttonHref: null,
  },
};

// Armenian Evangelical Boarding Home of Anjar — verbatim from
// design-reference/uaecne-boarding-home-anjar.html. Placed under Outreach
// (route + breadcrumb) per Yeghia's explicit ruling, 2026-08-21 — the
// mockup's own crumb read "Ministries › Schools › Lebanon," but Yeghia
// directed both the route AND the crumb text to move under Outreach
// instead (see OPEN_QUESTIONS). Given its own separately-typed constant
// (not forced into schoolContent.ts's SchoolContent shape) since 3 of its
// sections — History, Leadership, Mission — don't fit that shape's
// existing fields (named-era timeline vs. bare date-range period; narrative
// leadership cards vs. a fixed role+photo grid; icon-badge mission cards
// with an intro line vs. either icon-less or fixed-icon existing fields).
export type BoardingHomeEra = {
  title: string;
  titleHy: string | null;
  range: string;
  description: string;
  descriptionHy: string | null;
};

export type BoardingHomeLeadershipCard = {
  tag: string;
  tagHy: string | null;
  heading: string;
  headingHy: string | null;
  body: string;
  bodyHy: string | null;
  current?: boolean;
};

export type BoardingHomeCommitment = {
  icon: string; // IconSymbols id
  title: string;
  titleHy: string | null;
  description: string;
  descriptionHy: string | null;
};

export type BoardingHomeContent = {
  slug: string;
  title: string;
  titleHy: string | null;
  subline: string;
  sublineHy: string | null;
  location: string;
  locationHy: string | null;
  founded: string;
  logo: Photo;
  heroPhoto: Photo | null; // stays null — no building photo exists yet

  factsBar: { label: string; sub: string }[]; // 4 cells, per the mockup's .facts

  about: {
    eyebrow: string;
    eyebrowHy: string | null;
    heading: string;
    headingHy: string | null;
    paragraphs: string[];
    paragraphsHy: string[] | null;
    displayLine: string | null; // the gold-rule pull-line beneath the prose — null until a sourced line exists
    displayLineHy: string | null;
  };

  director: {
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
    intro: string;
    introHy: string | null;
    eras: BoardingHomeEra[];
  };

  leadership: {
    eyebrow: string;
    eyebrowHy: string | null;
    heading: string;
    headingHy: string | null;
    intro: string;
    introHy: string | null;
    cards: BoardingHomeLeadershipCard[];
  };

  mission: {
    eyebrow: string;
    eyebrowHy: string | null;
    heading: string;
    headingHy: string | null;
    // Split into 3 parts (not one string) so the mockup's bolded middle
    // clause can render as real JSX rather than dangerouslySetInnerHTML —
    // same discipline as YouthWorkAbout's renderParagraph.
    introPrefix: string;
    introBold: string;
    introSuffix: string;
    introHy: string | null;
    commitments: BoardingHomeCommitment[];
  };

  closing: {
    paragraphs: string[]; // first plain, second the italic "lead" line
    paragraphsHy: string[] | null;
  };

  contact: {
    eyebrow: string;
    eyebrowHy: string | null;
    heading: string;
    headingHy: string | null;
    location: string;
    locationHy: string | null;
    directorLabel: string;
    // Official website / social accounts, shown under "Location".
    social?: SocialLinks;
    director: string;
    note: string;
    noteHy: string | null;
  };

  cta: OutreachCTA;
};

export const boardingHomeContent: BoardingHomeContent = {
  slug: "boarding-home-anjar",
  title: "Armenian Evangelical Boarding Home of Anjar",
  titleHy: null,
  subline: "A family-like residential home and school for children of the Near East Diaspora.",
  sublineHy: null,
  location: "Anjar, Bekaa Valley, Lebanon",
  locationHy: null,
  founded: "1947",
  logo: {
    src: "/school-aessa-boarding-home-logo.jpeg",
    alt: "Armenian Evangelical Boarding Home of Anjar logo",
  },
  heroPhoto: null,

  factsBar: [
    { label: "1947", sub: "Founded" },
    { label: "Anjar, Bekaa Valley", sub: "Location" },
    { label: "Home & School", sub: "Character" },
    { label: "UAECNE", sub: "Affiliation" },
  ],

  about: {
    eyebrow: "The Institution",
    eyebrowHy: null,
    heading: "A Home in the Bekaa Valley",
    headingHy: null,
    paragraphs: [
      "Nestled against the historic backdrop of the Bekaa Valley in the unique Armenian village of Anjar, the Armenian Evangelical Boarding Home stands as a beacon of hope, resilience, and unwavering Christian service.",
      "It is the only school in the Near East Diaspora that uniquely combines comprehensive residential care with a high-standard academic curriculum — and it holds a cherished place within the family of the Union of the Armenian Evangelical Churches in the Near East (UAECNE).",
    ],
    paragraphsHy: null,
    displayLine: null, // removed 2026-10-13: not in the source docx (see OPEN_QUESTIONS)
    displayLineHy: null,
  },

  director: {
    name: "Mrs. Nanor Kelenjian Akbasharian",
    nameHy: null,
    role: "Boarding Home Director",
    roleHy: null,
    // Real photo sent by Mrs. Nanor (WhatsApp "UNION website", 20/10/2026, 00003507).
    photo: { src: "/outreach-boarding-home-director-nanor-akbasharian.jpg", alt: "Mrs. Nanor Kelenjian Akbasharian" },
  },

  history: {
    eyebrow: "Our History",
    eyebrowHy: null,
    heading: "Faith, Struggle & Perseverance",
    headingHy: null,
    intro:
      "The history of our institution is deeply intertwined with the remarkable faith, struggle, and perseverance of the people of Musa Dagh.",
    introHy: null,
    eras: [
      {
        title: "The Exodus",
        titleHy: null,
        range: "1939 – 1940",
        description:
          "Following the historic mass departure of the Armenians from Musa Dagh and their eventual settlement in the dusty plains of Anjar in 1939, the community immediately prioritized the future of its children.",
        descriptionHy: null,
      },
      {
        title: "Birth of the Mission",
        titleHy: null,
        range: "1947",
        description:
          "Responding to intense post-war vulnerability, poverty, and the presence of numerous orphans across the region, Sister Hedwig Äenishänslin — a devoted missionary of the Swiss-German Hilfsbund mission who had previously served refugees in Greece — came to Anjar. Working tirelessly under harsh, desert-like conditions, she began educational and relief work from a single room.",
        descriptionHy: null,
      },
      {
        title: "Growth & Expansion",
        titleHy: null,
        range: "1950s – Present",
        description:
          "Under Sister Hedwig’s leadership, alongside fellow missionaries like Sisters Mary Rock and Anna Nitsche, the Boarding Home steadily grew, opening its doors to an initial group of students from Beirut, Zahle, Kessab, Damascus, Egypt and Jordan.",
        descriptionHy: null,
      },
    ],
  },

  leadership: {
    eyebrow: "Stewardship",
    eyebrowHy: null,
    heading: "Leadership",
    headingHy: null,
    intro:
      "The administration and spiritual guidance of the school have been shaped by dedicated missionaries, educators, and pastors since its founding.",
    introHy: null,
    cards: [
      {
        tag: "The Founder",
        tagHy: null,
        heading: "Sister Hedwig Äenishänslin",
        headingHy: null,
        body: "Pioneering Swiss-German missionary who laid the foundational stone of the school and boarding department, guiding its expansion from a single-room operation into a full secondary and residential institution — alongside fellow missionaries Sister Mary Rock and Sister Anna Nitsche.",
        bodyHy: null,
      },
      {
        tag: "The Handover · 2013",
        tagHy: null,
        heading: "From Hilfsbund to UAECNE",
        headingHy: null,
        body: "Leadership transitioned through various directors from the Christlicher Hilfsbund im Orient in collaboration with UAECNE. In 2013, the Swiss-German Hilfsbund officially handed over full management to the Armenian Evangelical Churches in the Near East, placing the institution directly under local church leadership and securing its ongoing mission.",
        bodyHy: null,
      },
      {
        tag: "Today",
        tagHy: null,
        heading: "Current Leadership",
        headingHy: null,
        body: "The boarding department is directed by Mrs. Nanor Kelenjian Akbasharian, operating in coordination with the Executive Committee.",
        bodyHy: null,
        current: true,
      },
    ],
  },

  mission: {
    eyebrow: "Purpose",
    eyebrowHy: null,
    heading: "Our Mission",
    headingHy: null,
    introPrefix: "True to the mission and heritage of the Armenian Evangelical Church, ",
    introBold:
      "our doors are open to children from diverse backgrounds, low socio-economic statuses, and challenging family environments",
    introSuffix: " — without regard to denominational affiliations.",
    introHy: null,
    commitments: [
      {
        icon: "ic-home",
        title: "A Safe Haven",
        titleHy: null,
        description:
          "A secure, nurturing, and family-like residential environment where children experiencing social, emotional, or physical vulnerabilities can find healing, psychological support, and love.",
        descriptionHy: null,
      },
      {
        icon: "ic-book",
        title: "Academic Excellence",
        titleHy: null,
        description:
          "Rigorous educational programs that meet official government requirements, incorporating personalized remedial programs, modern digital tools, and language support to bridge any educational gaps.",
        descriptionHy: null,
      },
      {
        icon: "ic-mission-cross",
        title: "Christian Faith & Values",
        titleHy: null,
        description:
          "Guiding students toward a personal relationship with Jesus Christ, cultivating grace, empathy, and lifelong service through daily worship, Bible study, and Christian fellowship.",
        descriptionHy: null,
      },
    ],
  },

  closing: {
    paragraphs: [
      "Today, the Armenian Evangelical Boarding Home of Anjar continues to adapt to the pressing needs of the modern world. Under the guidance of dedicated educators, compassionate caregivers, and church leadership, our boarders do not merely survive — they thrive, grow, and step out into the world as confident, compassionate, and faithful individuals.",
      "We invite you to uphold the Boarding Home in your prayers and support, partnering with us as we continue to shape futures, heal hearts, and preserve our shared Christian and national heritage in the Near East.",
    ],
    paragraphsHy: null,
  },

  contact: {
    eyebrow: "Reach Us",
    eyebrowHy: null,
    heading: "Contact",
    headingHy: null,
    location: "Anjar, Bekaa Valley, Lebanon",
    locationHy: null,
    directorLabel: "Director:",
    social: { facebook: "https://www.facebook.com/kisherotig.anjar/" },
    director: "Mrs. Nanor Kelenjian Akbasharian",
    note: "Direct contact details for the Boarding Home are being confirmed and will be published once verified.",
    noteHy: null,
  },

  cta: {
    heading: "A Home Since 1947",
    headingHy: null,
    body: "For generations, the Armenian Evangelical Boarding Home of Anjar has sheltered, taught, and nurtured children of the Near East Diaspora — a living witness of Christian service under the Union of the Armenian Evangelical Churches in the Near East.",
    bodyHy: null,
    buttonLabel: null,
    buttonHref: null,
  },
};
