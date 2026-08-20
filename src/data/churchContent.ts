/**
 * Per-church detail-page content — keyed by slug (FK -> churches.ts's
 * Church.slug). Directory fields already in churches.ts (id, country, name,
 * pastor, serviceTime, address, phone, email, estYear, secretary, isNew,
 * slug, photo, emblem) are NOT duplicated here — this module only carries
 * content unique to the flexible per-church detail-page template
 * (design-reference/uaecne-church-*.html).
 *
 * Every module is `| null` where a given church's page genuinely omits that
 * section. Every prose/label field that could carry Armenian text has a
 * sibling field suffixed `Hy`, typed to mirror its English counterpart's
 * shape. These stay `null` until Yeghia supplies real, verified Western
 * (Lebanese) Armenian copy directly — never machine-translated or guessed
 * (PROJECT_BRIEF.md rule 2). None are populated in this unit.
 *
 * Only two entries exist so far: FAEC Beirut and Syriac Bouchriyeh. The
 * route falls back to a directory-only rendering for any other slug.
 */

type Photo = {
  src: string;
  alt: string;
};

export type LeaderEntry = {
  name: string;
  nameHy: string | null;
  role: string;
  roleHy: string | null;
  photo: Photo | null;
};

export type HistorySection = {
  heading: string;
  headingHy: string | null;
  paragraphs: string[];
  paragraphsHy: string[] | null;
  // Emmanuel's history will use a side photo when built later (the .hsplit
  // CSS pattern in the reference files, unused by FAEC/Syriac); carried now
  // as a nullable field so the type doesn't need to change then. No
  // rendering logic for this exists yet — ChurchHistory.tsx does not read it
  // this unit.
  image: Photo | null;
};

export type SuccessionEntry = {
  name: string;
  nameHy: string | null;
  years: string;
  note: string | null;
  noteHy: string | null;
  isCurrent: boolean;
};

export type GalleryPhoto = Photo & { caption: string; captionHy: string | null };

export type SpecialProjectObjective = {
  title: string;
  titleHy: string | null;
  description: string;
  descriptionHy: string | null;
};

export type ChurchContent = {
  slug: string; // FK -> churches.ts Church.slug

  // Masthead meta line ("Kantari, Beirut, Lebanon · Established 1922") —
  // carries the reference file's own verified wording verbatim. Deliberately
  // NOT derived from churches.ts's address/estYear fields: those two sources
  // disagree on facts for at least FAEC (see OPEN_QUESTIONS.md — churches.ts
  // says "Clemenceau, Mexique Street" / "1922-1923", the Yeghia-approved
  // reference says "Kantari, Beirut, Lebanon" / "1922"). The reference is
  // authoritative for this template; churches.ts remains the source for the
  // separate render-time contact block only (address/phone).
  masthead: {
    locationLine: string;
    locationLineHy: string | null;
    established: string; // just the year/value, e.g. "1922" — component prepends "Established "
    establishedHy: string | null;
  };

  logo: Photo | null; // independently optional
  heroPhoto: Photo; // always present
  factsBar: { label: string; labelHy: string | null; sub: string; subHy: string | null }[];

  about: {
    eyebrow: string;
    eyebrowHy: string | null;
    heading: string;
    headingHy: string | null;
    paragraphs: string[];
    paragraphsHy: string[] | null;
  };

  pastorCard: {
    // independently optional — not every church has a usable pastor PHOTO
    name: string;
    nameHy: string | null;
    role: string;
    roleHy: string | null;
    photo: Photo;
  } | null;

  leadership: LeaderEntry[] | null;

  history: {
    eyebrow: string;
    eyebrowHy: string | null;
    heading: string;
    headingHy: string | null;
    sections: HistorySection[];
  } | null;

  programs: {
    eyebrow: string;
    eyebrowHy: string | null;
    heading: string;
    headingHy: string | null;
    items: string[];
    itemsHy: string[] | null;
  } | null;

  // Shape UNVERIFIED — neither FAEC nor Syriac uses this; not built this
  // unit (no SpecialProjectBand.tsx component exists).
  specialProject: {
    eyebrow: string;
    eyebrowHy: string | null;
    heading: string;
    headingHy: string | null;
    since: string | null;
    sinceHy: string | null;
    objectives: SpecialProjectObjective[];
  } | null;

  succession: {
    eyebrow: string;
    eyebrowHy: string | null;
    heading: string;
    headingHy: string | null;
    note: string | null;
    noteHy: string | null;
    entries: SuccessionEntry[];
  } | null;

  // Shape UNVERIFIED — neither FAEC nor Syriac uses this; not built this
  // unit (no AnniversaryBand.tsx component exists).
  anniversary: {
    eyebrow: string;
    eyebrowHy: string | null;
    heading: string;
    headingHy: string | null;
    body: string;
    bodyHy: string | null;
  } | null;

  gallery: {
    eyebrow: string;
    eyebrowHy: string | null;
    heading: string;
    headingHy: string | null;
    photos: GalleryPhoto[];
  } | null;

  cta: { heading: string; headingHy: string | null; body: string; bodyHy: string | null }; // always present

  // Contact info (address, phone, secretary, serviceTime, email) is read
  // from churches.ts's directory row at render time — NOT duplicated here.
  // This field exists only to patch specific contact fields that a
  // reference file's own supplied contact data genuinely conflicts with
  // churches.ts on (a source-data conflict, not a parallel contact system —
  // see OPEN_QUESTIONS.md #30 for Syriac's email, #31 for FAEC's address).
  // Render rule: start from churches.ts's contact fields, then spread
  // contactOverride on top when non-null — undefined/omitted keys fall
  // through to churches.ts's value; only set the keys that actually need
  // overriding.
  contactOverride: {
    email?: string;
    phone?: string;
    secretary?: string;
    address?: string;
  } | null;
};

export const churchContent: Record<string, ChurchContent> = {
  "first-armenian-evangelical-church-beirut": {
    slug: "first-armenian-evangelical-church-beirut",

    masthead: {
      locationLine: "Kantari, Beirut, Lebanon",
      locationLineHy: null,
      established: "1922",
      establishedHy: null,
    },

    logo: {
      src: "/church-first-armenian-evangelical-church-beirut-logo.png",
      alt: "First Armenian Evangelical Church logo",
    },
    heroPhoto: {
      src: "/church-first-armenian-evangelical-church-beirut-hero.jpg",
      alt: "First Armenian Evangelical Church of Beirut",
    },
    factsBar: [
      { label: "Sunday Worship", labelHy: null, sub: "Weekly Service", subHy: null },
      { label: "Kantari, Beirut", labelHy: null, sub: "Mexique Street", subHy: null },
      { label: "1922", labelHy: null, sub: "Founded", subHy: null },
    ],

    about: {
      eyebrow: "The Congregation",
      eyebrowHy: null,
      heading: "About This Church",
      headingHy: null,
      paragraphs: [
        "Established in 1922, the First Armenian Evangelical Church of Beirut is located in the historic Kantari sector of western Beirut. Over the past century, the church has developed an integrated approach to education and spiritual life, working in close partnership with the Armenian Evangelical College and Haigazian University to form a central hub for Armenian Evangelical ministry in the region.",
        "The church operates through a collaborative network of ministry leaders, staff, and volunteers who share the responsibility of congregational care and community outreach — focusing on intergenerational support, spiritual development, and practical service to the surrounding neighborhood. Its ministry sectors include Children & Junior Ministries, Youth & Young Adult Ministries, and Women's Ministry. The congregation and its diverse programs are currently pastored by Rev. Jirair Ghazarian.",
      ],
      paragraphsHy: null,
    },

    pastorCard: {
      name: "Rev. Jirair Ghazarian",
      nameHy: null,
      role: "Pastor",
      roleHy: null,
      photo: {
        src: "/church-first-armenian-evangelical-church-beirut-pastor.jpg",
        alt: "Rev. Jirair Ghazarian",
      },
    },

    leadership: [
      {
        name: "Rev. Jirair Ghazarian",
        nameHy: null,
        role: "Pastor",
        roleHy: null,
        photo: {
          src: "/church-first-armenian-evangelical-church-beirut-leader-1.jpg",
          alt: "Rev. Jirair Ghazarian",
        },
      },
      {
        name: "Ms. Ani Boujikanian",
        nameHy: null,
        role: "Vice-Chair of the Council",
        roleHy: null,
        photo: {
          src: "/church-first-armenian-evangelical-church-beirut-leader-2.jpg",
          alt: "Ms. Ani Boujikanian",
        },
      },
      {
        name: "Mrs. Lena Basmajian",
        nameHy: null,
        role: "Secretary",
        roleHy: null,
        photo: {
          src: "/church-first-armenian-evangelical-church-beirut-leader-3.jpg",
          alt: "Mrs. Lena Basmajian",
        },
      },
    ],

    history: {
      eyebrow: "Our Story",
      eyebrowHy: null,
      heading: "A Century of Faith in Beirut",
      headingHy: null,
      sections: [
        {
          heading: "The Formative Years",
          headingHy: null,
          paragraphs: [
            "The origins of the First Armenian Evangelical Church of Beirut trace back to 1914, when worship services were held in the Dale Memorial Hall of the Presbyterian Mission Church under the leadership of Rev. Parsegh Donigian and Mr. Apraham Sarrafian. In early 1922, a governing board was established under the chairmanship of Rev. Haroutune Nokhoudian, and that same year Rev. Yenovk Hadidian was formally invited to pastor the Armenian Evangelical community of Lebanon.",
            "From 1922 to 1926, Rev. Hadidian shepherded a congregation that gathered in two locations: the Dale Memorial Hall and a tent in the Karantina refugee camp. He was succeeded by Rev. Yenovk Goekgoezian (1927–1946), under whose leadership the church grew and eventually divided into three regional congregations in Beirut: Ashrafieh, Nor Marash, and the City (\"Kaghak\") churches. In 1930, the name First Armenian Evangelical Church was formally adopted for the congregation worshiping in the City.",
          ],
          paragraphsHy: null,
          image: null,
        },
        {
          heading: "A New Location and Years of Flourishing",
          headingHy: null,
          paragraphs: [
            "In 1946, a committee was formed to identify land and raise funds for a church building. On October 30, 1948, a 3,110-square-meter plot on Mexique Street was purchased from the Swiss Friends of Armenia, under the pastoral leadership of Rev. Garabed Tilkian (1946–1967). On June 24, 1951, the cornerstone was laid in an official ceremony with an open-air worship service. Designed by Armenian-American architect Henry Kuljian of Philadelphia, the building was completed in 1952. By 1960, the congregation had grown to 200 families.",
          ],
          paragraphsHy: null,
          image: null,
        },
        {
          heading: "The Lebanese Civil War Years (1975–1991)",
          headingHy: null,
          paragraphs: [
            "The Lebanese Civil War brought sweeping change to nearly every aspect of life in Lebanon. Located in the heart of Beirut, the church suddenly found itself on the \"west side\" of the city, and within a few short years saw a sharp decline in membership as families relocated to the \"east side\" or emigrated abroad. Those who remained ensured that the church and the Armenian Evangelical College continued their work — serving not only Armenian Evangelicals, but anyone in the vicinity of the church.",
            "It was Rev. Hovhaness Karjian who carried the greatest share of this responsibility. Together with his wife Rebecca and their four children, he relocated to Beirut from Aleppo after the war had begun. Living in the church parsonage, they cared for the church and its school — welcoming refugees who sought shelter in the school building, looking after students unable to return home due to shelling, and shepherding a congregation deeply in need of encouragement. During these years both the church and the College buildings sustained direct missile strikes and extensive damage, yet the church's faithful servants pressed forward with rebuilding, standing as one of only a few Armenian churches in the area.",
          ],
          paragraphsHy: null,
          image: null,
        },
        {
          heading: "Post–Civil War Years (1992–Present)",
          headingHy: null,
          paragraphs: [
            "Following the cessation of hostilities, and despite reduced membership, the church continued nearly all of its central activities: Sunday school, the Christian Endeavor teen and youth groups, women's ministry, prayer meetings, and cultural events. The sanctuary became a preferred venue for concerts, including those of the Armenian Evangelical \"Armiss\" Choir. In 2000 the church established the \"Rainbow Nursery\" day care, which grew to serve Armenian, Lebanese, and foreign families before closing in 2020 amid the pandemic and Lebanon's economic crisis. In 2006 a group of young people founded the Armenian Cultural Association.",
            "We give thanks to God that the church, sustained by its small but faithful and active membership, continues to this day to be a beacon of hope and life within the diverse community of this part of Beirut.",
          ],
          paragraphsHy: null,
          image: null,
        },
      ],
    },

    programs: null,
    specialProject: null,

    succession: {
      eyebrow: "Those Who Served",
      eyebrowHy: null,
      heading: "Pastors of the Church",
      headingHy: null,
      note: null,
      noteHy: null,
      entries: [
        { name: "Rev. Yenovk Hadidian", nameHy: null, years: "1922 – 1926", note: null, noteHy: null, isCurrent: false },
        { name: "Rev. Yenovk Guekguezian", nameHy: null, years: "1927 – 1946", note: null, noteHy: null, isCurrent: false },
        { name: "Rev. Garabed Tilkian", nameHy: null, years: "1946 – 1967", note: null, noteHy: null, isCurrent: false },
        { name: "Rev. Robert Sarkissian", nameHy: null, years: "1967 – 1970", note: "(assistant)", noteHy: null, isCurrent: false },
        { name: "Rev. Soghomon Nuyujukian", nameHy: null, years: "1967 – 1974", note: null, noteHy: null, isCurrent: false },
        { name: "Rev. Ardashes Kerbabian", nameHy: null, years: "1974 – 1976", note: null, noteHy: null, isCurrent: false },
        { name: "Rev. Manuel Jinbashian", nameHy: null, years: "1978 – 1979", note: null, noteHy: null, isCurrent: false },
        { name: "Rev. Hovhannes Karjian", nameHy: null, years: "1979 – 1988, 1991 – 1995", note: null, noteHy: null, isCurrent: false },
        { name: "Rev. Hagop Sagherian", nameHy: null, years: "1988 – 1991", note: null, noteHy: null, isCurrent: false },
        { name: "Rev. Hovhannes Sevadjian", nameHy: null, years: "1995 – 2005", note: null, noteHy: null, isCurrent: false },
        { name: "Rev. Hagop Sarkissian", nameHy: null, years: "2007 – 2010", note: null, noteHy: null, isCurrent: false },
        { name: "Rev. Hrayr Cholakian", nameHy: null, years: "2011 – 2021", note: null, noteHy: null, isCurrent: false },
        { name: "Rev. Jirair Ghazarian", nameHy: null, years: "2021 – present", note: null, noteHy: null, isCurrent: true },
      ],
    },

    anniversary: null,
    gallery: null,

    cta: {
      heading: "Join Us in Worship",
      headingHy: null,
      body: "All are welcome at the First Armenian Evangelical Church of Beirut — a beacon of hope and life in the heart of the city for over a century.",
      bodyHy: null,
    },

    // OPEN_QUESTIONS.md #31: churches.ts's address ("Clemenceau, Mexique
    // Street... / P.O.Box 11-2508, Riad el Solh") conflicts with the
    // reference file's own "Our Location" card. Verbatim from
    // uaecne-church-faec-beirut-complete.html: `Mexique Street, Kantari,
    // Beirut, Lebanon` — no P.O. box in the reference's location card, so
    // none is added here.
    contactOverride: { address: "Mexique Street, Kantari, Beirut, Lebanon" },
  },

  "syriac-evangelical-church-sed-el-bouchrieh": {
    slug: "syriac-evangelical-church-sed-el-bouchrieh",

    masthead: {
      locationLine: "Bouchriyeh, Lebanon",
      locationLineHy: null,
      established: "1966",
      establishedHy: null,
    },

    logo: null,
    heroPhoto: {
      src: "/church-syriac-evangelical-church-sed-el-bouchrieh-hero.jpg",
      alt: "Syriac Evangelical Church of Bouchriyeh",
    },
    factsBar: [
      { label: "Sunday Worship", labelHy: null, sub: "Weekly Service", subHy: null },
      { label: "Bouchriyeh", labelHy: null, sub: "Lebanon", subHy: null },
      { label: "1966", labelHy: null, sub: "Founded", subHy: null },
    ],

    about: {
      eyebrow: "The Congregation",
      eyebrowHy: null,
      heading: "About This Church",
      headingHy: null,
      paragraphs: [
        "The Syriac Evangelical Church is a small congregation in the Bouchriyeh area of Lebanon. Its members love the Lord Jesus and serve Him in different ways. The church's goal is to serve the Lord Jesus and to deliver the Good News to the surrounding families.",
        "The congregation is pastored by Rev. Salim Sabounji.",
      ],
      paragraphsHy: null,
    },

    pastorCard: {
      name: "Rev. Salim Sabounji",
      nameHy: null,
      role: "Pastor",
      roleHy: null,
      photo: {
        src: "/church-syriac-evangelical-church-sed-el-bouchrieh-pastor.jpg",
        alt: "Rev. Salim Sabounji",
      },
    },

    leadership: null,
    history: null,

    programs: {
      eyebrow: "Church Life",
      eyebrowHy: null,
      heading: "Church Services",
      headingHy: null,
      items: [
        "Sunday Worship Service",
        "Sunday School for Children",
        "Junior Youth Group",
        "Scout Meeting",
        "Ladies Meeting — biweekly, Wednesdays",
      ],
      itemsHy: null,
    },

    specialProject: null,
    succession: null,
    anniversary: null,

    gallery: {
      eyebrow: "In Pictures",
      eyebrowHy: null,
      heading: "Gallery",
      headingHy: null,
      photos: [
        {
          src: "/church-syriac-evangelical-church-sed-el-bouchrieh-gallery-1.jpg",
          alt: "Historic view of the Syriac Evangelical Church",
          caption: "Historic view of the church",
          captionHy: null,
        },
        {
          src: "/church-syriac-evangelical-church-sed-el-bouchrieh-gallery-2.jpg",
          alt: "The sanctuary of the Syriac Evangelical Church",
          caption: "The sanctuary",
          captionHy: null,
        },
        {
          src: "/church-syriac-evangelical-church-sed-el-bouchrieh-gallery-3.jpg",
          alt: "The Syriac Evangelical Church façade",
          caption: "The church façade",
          captionHy: null,
        },
      ],
    },

    cta: {
      heading: "Join Us in Worship",
      headingHy: null,
      body: "All are welcome at the Syriac Evangelical Church of Bouchriyeh — a small congregation serving the Lord and its neighbors with love.",
      bodyHy: null,
    },

    // OPEN_QUESTIONS.md #30: the reference file's own supplied contact doc
    // uses this email; churches.ts's syriac.evan.church@gmail.com conflicts
    // and is treated as suspect, not authoritative.
    contactOverride: { email: "syriac-evangelical-church@hotmail.com" },
  },
};
