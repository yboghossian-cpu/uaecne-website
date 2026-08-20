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
  // Null when the reference has no <h3> for this block (e.g. Emmanuel's
  // founding narrative sits directly under the top-level history heading,
  // with no subsection heading of its own) — ChurchHistory.tsx renders no
  // <h3> in that case, just the paragraphs (and image, if present).
  heading: string | null;
  headingHy: string | null;
  paragraphs: string[];
  paragraphsHy: string[] | null;
  // When non-null, ChurchHistory.tsx renders this section as a 2-column
  // .hsplit (paragraphs left, image right at ≥720px, stacked on mobile) —
  // the reference files' side-photo history treatment (first used by
  // Emmanuel). Null for a section with no photo — plain paragraph layout,
  // unchanged from FAEC/Nor Marash.
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

// `caption` null when the reference has no per-photo caption text (e.g.
// Ashrafieh's "The Church Today" gallery — 2 photos, both with the same
// generic alt text, no individual captions like Syriac's 3-photo gallery
// has).
export type GalleryPhoto = Photo & { caption: string | null; captionHy: string | null };

// Verified against uaecne-church-ashrafieh-complete.html's .anniv section —
// a dedicated badge image, a two-line numeral+word heading, a date range,
// and a scripture quote with its own citation + editorial label. Does not
// fit a generic {eyebrow,heading,body} shape; holds exactly what's there.
export type Anniversary = {
  // Nullable — Ashrafieh's would-be badge was byte-identical to its own
  // masthead logo (the church reuses its regular seal, not a distinct
  // centennial badge), so it's null here and the band renders text-only,
  // centered. A future anniversary church with a genuinely distinct badge
  // image would populate this.
  logo: Photo | null;
  kicker: string; // "Celebrating Your Past · Investing in Your Future"
  kickerHy: string | null;
  numeral: string; // "100" — large numeral line
  label: string; // "Anniversary" — styled word beneath the numeral
  labelHy: string | null;
  years: string; // "1926 — 2026"
  verse: string; // scripture quote, verbatim — never paraphrased
  verseHy: string | null;
  verseRef: string; // "Philippians 1:6" — scripture citation
  verseRefHy: string | null;
  verseLabel: string; // "The Church's Golden Verse" — editorial, translatable
  verseLabelHy: string | null;
};

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

  // Verified against Ashrafieh's reference (see the `Anniversary` type above)
  // — null for every church that doesn't have a centennial/anniversary
  // module of its own.
  anniversary: Anniversary | null;

  // `eyebrow` null when the reference has no kicker line above the gallery
  // heading (e.g. Ashrafieh's "The Church Today" — just a decorative rule +
  // heading, no eyebrow text, unlike Syriac's "In Pictures" eyebrow).
  gallery: {
    eyebrow: string | null;
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
  // see OPEN_QUESTIONS.md #30 for Syriac's email, #31 for FAEC's address,
  // #34 for Nor Marash's email). Render rule: start from churches.ts's
  // contact fields, then spread contactOverride on top when non-null —
  // undefined/omitted keys fall through to churches.ts's value; only set
  // the keys that actually need overriding. `email: null` (explicit, not
  // omitted) suppresses the email row entirely rather than falling through
  // to churches.ts's value — used when churches.ts's email is known-wrong
  // (Nor Marash). `hideLocationCard: true` omits the whole "Our Location"
  // card when the reference has no address/location content at all for
  // that church (Nor Marash).
  contactOverride: {
    email?: string | null;
    phone?: string;
    secretary?: string;
    address?: string;
    hideLocationCard?: boolean;
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

  "armenian-evangelical-church-nor-marash": {
    slug: "armenian-evangelical-church-nor-marash",

    masthead: {
      locationLine: "Bourj Hammoud, Beirut, Lebanon",
      locationLineHy: null,
      established: "1934",
      establishedHy: null,
    },

    // Byte-identical to public/church-armenian-evangelical-church-nor-marash
    // -emblem.png (already tracked, from the Churches-index build) — reused
    // rather than shipping a duplicate file.
    logo: {
      src: "/church-armenian-evangelical-church-nor-marash-emblem.png",
      alt: "Nor Marash church logo",
    },
    heroPhoto: {
      src: "/church-armenian-evangelical-church-nor-marash-hero.jpg",
      alt: "Armenian Evangelical Church of Nor Marash",
    },
    factsBar: [
      { label: "Weekly Worship", labelHy: null, sub: "Sunday Service", subHy: null },
      { label: "Bourj Hammoud", labelHy: null, sub: "East of Beirut River", subHy: null },
      { label: "1934", labelHy: null, sub: "Founded", subHy: null },
    ],

    about: {
      eyebrow: "The Congregation",
      eyebrowHy: null,
      heading: "About This Church",
      headingHy: null,
      paragraphs: [
        "The Armenian Evangelical Church of Nor Marash is located in the Bourj Hammoud area east of the Beirut River, in a commercial and residential suburb with many Armenian homes and businesses. Next to the church stands the Armenian Evangelical Secondary School of Bourj Hammoud (also known as “Shamlian-Tatikian”), near a number of churches and agencies serving the Armenian community.",
        "Founded in 1934, the church holds weekly worship services and sustains children's, juniors', youth, couples', and women's ministries, led by Rev. Raffi Messerlian. The congregation traces its roots to the Marash survivors of the Armenian Genocide who founded the Nor (New) Marash neighborhood in Bourj Hammoud.",
      ],
      paragraphsHy: null,
    },

    pastorCard: {
      name: "Rev. Raffi Messerlian",
      nameHy: null,
      role: "Pastor · Since 2014",
      roleHy: null,
      photo: {
        src: "/church-armenian-evangelical-church-nor-marash-pastor.jpg",
        alt: "Rev. Raffi Messerlian",
      },
    },

    // Reference file's leadership photos all have alt="" — using each
    // person's own name as alt text instead (matches the accessibility
    // convention used everywhere else in this codebase; not invented
    // content, just the same name already shown in the visible caption).
    leadership: [
      {
        name: "Rev. Raffi Messerlian",
        nameHy: null,
        role: "Pastor",
        roleHy: null,
        photo: {
          src: "/church-armenian-evangelical-church-nor-marash-leader-1.jpg",
          alt: "Rev. Raffi Messerlian",
        },
      },
      {
        name: "Mr. Antranig Messerlian",
        nameHy: null,
        role: "Board Member",
        roleHy: null,
        photo: {
          src: "/church-armenian-evangelical-church-nor-marash-leader-2.jpg",
          alt: "Mr. Antranig Messerlian",
        },
      },
      {
        name: "Mrs. Takouhi Sarkissian",
        nameHy: null,
        role: "Board Member",
        roleHy: null,
        photo: {
          src: "/church-armenian-evangelical-church-nor-marash-leader-3.jpg",
          alt: "Mrs. Takouhi Sarkissian",
        },
      },
    ],

    history: {
      eyebrow: "Our Story",
      eyebrowHy: null,
      heading: "From Marash to Bourj Hammoud",
      headingHy: null,
      sections: [
        {
          heading: "Origins (1929–1934)",
          headingHy: null,
          paragraphs: [
            "Until the end of the 1920s, Armenians who survived the Genocide lived in refugee camps within the city limits of Beirut. In November 1929, after the Lebanese government's decision to dismantle those camps, Armenian communities were dispersed and began to establish new neighborhoods. The first was built by those from Marash, who, forming a compatriotic union, purchased a large plot of land in Bourj Hammoud on the east bank of the Beirut River and founded Nor (New) Marash. Between 1930 and 1932, over 2,000 Armenian families moved to the new neighborhood.",
            "Armenian Evangelical work began there in 1930, with a temporary wooden hall built for use as a kindergarten and evening prayer meetings. With the assistance of the Marash Compatriotic Union, the community obtained land and, on 29 June 1931, began construction of a school building; the Rev. Garabed Hassessian led prayers for the laying of its foundation. On 16 December 1934, the church was officially constituted in a solemn ceremony with 105 members and declared a new member of the Union.",
          ],
          paragraphsHy: null,
          image: null,
        },
        {
          heading: "Growth and Trials",
          headingHy: null,
          paragraphs: [
            "From January 1934 until the fall of 1942, Rev. Hassessian served as pastor and the church progressed in every way. By 1938 the number of families had grown to 177 (747 individuals), with two women's societies and expanding ministries. Through the repatriation years of 1946–1947, forty-two church families and former pastor Rev. Hassessian departed for Armenia. Rev. Aram Hadidian became pastor in 1947, guiding a period of renewal and building the parsonage in 1947 before retiring in 1962.",
          ],
          paragraphsHy: null,
          image: null,
        },
        {
          heading: "Rebuilding (1972–1983)",
          headingHy: null,
          paragraphs: [
            "In 1972 the church building was demolished to construct a new edifice; the ground floor, completed in 1973, was named the Hassessian Hall in honor of Rev. Avedis Hassessian's father. A clinic was opened in 1976. Construction of the new church began in 1980, and the structure was fully completed in 1983, when worship services began in the new sanctuary.",
          ],
          paragraphsHy: null,
          image: null,
        },
        {
          heading: "Recent Decades",
          headingHy: null,
          paragraphs: [
            "From 2000 to 2014, Rev. Mgrdich Karagoezian served as pastor through the arrangement of the Central Committee. The number of families, once as high as 500, currently stands at around 200. In September 2014, Rev. Raffi Messerlian began his ministry as church pastor, continuing the congregation's life of worship, education, and service.",
          ],
          paragraphsHy: null,
          image: null,
        },
      ],
    },

    programs: {
      eyebrow: "Life of the Church",
      eyebrowHy: null,
      heading: "Church Activities",
      headingHy: null,
      items: [
        "Sunday School",
        "Vacation Bible School",
        "Women's Union",
        "C.E. Youth Group",
        "C.E. Junior Youth",
        "Prayer Meetings",
      ],
      itemsHy: null,
    },

    specialProject: null,

    succession: {
      eyebrow: "Those Who Served",
      eyebrowHy: null,
      heading: "Pastors of the Church",
      headingHy: null,
      note: null,
      noteHy: null,
      entries: [
        { name: "Rev. Garabed Hassessian", nameHy: null, years: "1933 – 1942", note: null, noteHy: null, isCurrent: false },
        { name: "Rev. Sisag Manougian", nameHy: null, years: "1942 – 1943", note: null, noteHy: null, isCurrent: false },
        { name: "Pastor Assadour Sadakian", nameHy: null, years: "1943 – 1947", note: null, noteHy: null, isCurrent: false },
        { name: "Rev. Aram Hadidian", nameHy: null, years: "1947 – 1962", note: null, noteHy: null, isCurrent: false },
        { name: "Visiting pastors", nameHy: null, years: "1962 – 1964", note: null, noteHy: null, isCurrent: false },
        { name: "Rev. Abraham Jizmejian", nameHy: null, years: "1964 – 1969", note: null, noteHy: null, isCurrent: false },
        { name: "Rev. Hovhannes Agnerian", nameHy: null, years: "1969 – 1974", note: null, noteHy: null, isCurrent: false },
        { name: "Rev. Berdj Djambazian", nameHy: null, years: "1974 – 1980", note: null, noteHy: null, isCurrent: false },
        { name: "Rev. Apraham Sarkissian", nameHy: null, years: "1981 – 1998", note: null, noteHy: null, isCurrent: false },
        { name: "UAECNE Central Committee supervision", nameHy: null, years: "1998 – 2000", note: null, noteHy: null, isCurrent: false },
        { name: "Rev. Mgrdich Karagoezian", nameHy: null, years: "2000 – 2014", note: null, noteHy: null, isCurrent: false },
        { name: "Rev. Raffi Messerlian", nameHy: null, years: "2014 – present", note: null, noteHy: null, isCurrent: true },
      ],
    },

    anniversary: null,
    gallery: null,

    cta: {
      heading: "Join Us in Worship",
      headingHy: null,
      body: "All are welcome at the Armenian Evangelical Church of Nor Marash — rooted in the Marash community's story of survival and faith in Bourj Hammoud.",
      bodyHy: null,
    },

    // OPEN_QUESTIONS.md #25/#34: churches.ts's email (aessa68@gmail.com) is
    // the AESSA Anjar SCHOOL's address, not this church's — confirmed by
    // Yeghia. The reference file's own header comment correctly flags this
    // ("Email blank in source -> omitted"), but its body still renders the
    // email (a bug in the reference file itself, not a superseding truth —
    // see OPEN_QUESTIONS #34). Explicit null suppresses the email row
    // entirely rather than falling through to churches.ts's suspect value.
    // No "Our Location" card in the reference at all for this church.
    contactOverride: { email: null, hideLocationCard: true },
  },

  "armenian-evangelical-emmanuel-church-nor-amanos-dora": {
    slug: "armenian-evangelical-emmanuel-church-nor-amanos-dora",

    masthead: {
      locationLine: "Nor Amanos, Baouchrieh, Mount Lebanon",
      locationLineHy: null,
      established: "1970",
      establishedHy: null,
    },

    logo: null, // confirmed: no church logo, name-only masthead (like Syriac)
    heroPhoto: {
      src: "/church-armenian-evangelical-emmanuel-church-nor-amanos-dora-hero.jpg",
      alt: "Armenian Evangelical Emmanuel Church of Nor Amanos",
    },
    factsBar: [
      { label: "Sunday Worship", labelHy: null, sub: "Weekly Service", subHy: null },
      { label: "Nor Amanos", labelHy: null, sub: "Baouchrieh, Mount Lebanon", subHy: null },
      { label: "1970", labelHy: null, sub: "Founded", subHy: null },
    ],

    about: {
      eyebrow: "The Congregation",
      eyebrowHy: null,
      heading: "About This Church",
      headingHy: null,
      paragraphs: [
        "The Armenian Evangelical Emmanuel Church of Nor Amanos is located east of Beirut, in the Baouchrieh area of Mount Lebanon — a mixed commercial and residential section not far from Dawra, home to many Armenians and Armenian institutions. Founded in 1970 within the campus of the Torossian School, it is the newest of the Armenian Evangelical congregations in Lebanon.",
        "With God's grace, and alongside its Sunday worship services and Bible studies, the church carries a full range of ministries — for children, junior youth, youth, and young adults, as well as women's and sport ministries — and has become a lighthouse to its neighborhood. Since October 2023, Rev. Hovhannes Svadjian has served as pastor of the church.",
      ],
      paragraphsHy: null,
    },

    pastorCard: {
      name: "Rev. Hovhannes Svadjian",
      nameHy: null,
      role: "Pastor",
      roleHy: null,
      photo: {
        src: "/church-armenian-evangelical-emmanuel-church-nor-amanos-dora-pastor.jpg",
        alt: "Rev. Hovhannes Svadjian",
      },
    },

    leadership: [
      {
        name: "Rev. Hovhannes Svadjian",
        nameHy: null,
        role: "Pastor",
        roleHy: null,
        photo: {
          src: "/church-armenian-evangelical-emmanuel-church-nor-amanos-dora-leader-1.jpg",
          alt: "Rev. Hovhannes Svadjian",
        },
      },
      {
        name: "Ms. Ani Baboghlanian",
        nameHy: null,
        role: "Vice-Chair, Board of Trustees",
        roleHy: null,
        photo: {
          src: "/church-armenian-evangelical-emmanuel-church-nor-amanos-dora-leader-2.jpg",
          alt: "Ms. Ani Baboghlanian",
        },
      },
      {
        name: "Mrs. Ani Svadjian",
        nameHy: null,
        role: "Secretary",
        roleHy: null,
        photo: {
          src: "/church-armenian-evangelical-emmanuel-church-nor-amanos-dora-leader-3.jpg",
          alt: "Mrs. Ani Svadjian",
        },
      },
    ],

    // Structural note (see OPEN_QUESTIONS-adjacent discussion in this
    // session, not a numbered item): the reference has no <h3> for the
    // founding narrative — it sits directly under the top-level "The
    // Founding of Emmanuel Church" heading. Split into two null-heading
    // sections to match the reference's actual flow: the first two
    // paragraphs sit beside the side photo (.hsplit), the third paragraph
    // (the pulpit-dignitaries account) flows full-width below it, still
    // part of the same unheaded narrative, before "Through War and Crisis"
    // begins as a normal headed subsection.
    history: {
      eyebrow: "Our Story",
      eyebrowHy: null,
      heading: "The Founding of Emmanuel Church",
      headingHy: null,
      sections: [
        {
          heading: null,
          headingHy: null,
          paragraphs: [
            "Starting from the second half of the 1960s — after several years of worship services held in the homes of Armenian Evangelical families in the Nor Amanos area, and after years of dedication and visitation by Rev. & Mrs. Vahram Salibian — the founding worship service of the Armenian Evangelical Emmanuel Church took place on the morning of Sunday, 15 February 1970.",
            "Since the newly-organized congregation did not yet have its own building, worship services were held in the chapel of the Armenian Evangelical Peter & Elizabeth Torossian School. Representatives from the surrounding Armenian Evangelical churches filled the chapel that morning to show their solidarity with the newborn congregation.",
          ],
          paragraphsHy: null,
          image: {
            src: "/church-armenian-evangelical-emmanuel-church-nor-amanos-dora-history.jpg",
            alt: "Armenian Evangelical Emmanuel Church, street view",
          },
        },
        {
          heading: null,
          headingHy: null,
          paragraphs: [
            "On the pulpit were seated the President of the UAECNE, Rev. Hovhannes Aharonian; the Armenian Evangelical Community Head in Lebanon, Rev. Yenovk Hadidian; and the founding pastor of the Emmanuel Church, Rev. Vahram Salibian. After an inspiring hymn by the choir, a list of 18 communicant members was presented, the President of the Union read the official proclamation organizing the new church, and the congregation read the membership vow in unison.",
          ],
          paragraphsHy: null,
          image: null,
        },
        {
          heading: "Through War and Crisis",
          headingHy: null,
          paragraphs: [
            "During the Lebanese Civil War (1975–1990), when bombardments intensified and shells struck the area — and even the church building itself — the Emmanuel Church became a shelter for many families in the neighborhood. Together with the Armenian Evangelical P. & E. Torossian School, the church played a key role in promoting the Gospel and spreading education. With the closing of the Torossian School in September 2019 amid the financial crisis, the church lost its effective partner in mission and ministry.",
            "After the untimely death of Pastor Sevag Trashian, the church was led by its resilient lay leaders; with the support of the Union, God's guidance, and the prayers of its people, the Emmanuel Church survived the street disturbances, the Beirut Port explosion, and the economic and banking crises of Lebanon. Throughout its history, and by the power of the Holy Spirit, the church has produced many ministers — among them Rev. Dikran Youmoushakian, Rev. Dr. Avedis Boynerian, Rev. Dr. Krikor Youmoushakian, Rev. Hovhannes Svadjian, and Pastor George Sahili — as well as many teachers and community lay leaders.",
          ],
          paragraphsHy: null,
          image: null,
        },
      ],
    },

    programs: {
      eyebrow: "Church Life",
      eyebrowHy: null,
      heading: "Ministries & Programs",
      headingHy: null,
      items: [
        "Sunday Worship Services",
        "Bible Studies",
        "Children's Ministry",
        "Junior Youth Ministry",
        "Youth Ministry",
        "Young Adult Ministry",
        "Women's Ministry",
        "Sport Ministry",
      ],
      itemsHy: null,
    },

    specialProject: null,

    succession: {
      eyebrow: "Those Who Served",
      eyebrowHy: null,
      heading: "Pastors of the Church",
      headingHy: null,
      note: null,
      noteHy: null,
      // Rev. Hovhannes Svadjian appears twice — 2005–2014, then again
      // 2023–present after Pastor Sevag Trashian's 2014–2020 tenure and an
      // interim period. A real return to the post, not a duplicate to
      // dedupe. Only the 2023–present entry is isCurrent.
      entries: [
        { name: "Rev. Vahram Salibian", nameHy: null, years: "1970 – 1973", note: null, noteHy: null, isCurrent: false },
        { name: "Rev. Yessayi Sarmazian", nameHy: null, years: "1973 – 1980", note: null, noteHy: null, isCurrent: false },
        { name: "Visiting & interim pastors", nameHy: null, years: "1980 – 1983", note: null, noteHy: null, isCurrent: false },
        { name: "Rev. Mgrdich Karagoezian", nameHy: null, years: "1983 – 1999", note: null, noteHy: null, isCurrent: false },
        { name: "Rev. Nerses Balabanian", nameHy: null, years: "1999 – 2005", note: null, noteHy: null, isCurrent: false },
        { name: "Rev. Hovhannes Svadjian", nameHy: null, years: "2005 – 2014", note: null, noteHy: null, isCurrent: false },
        { name: "Pastor Sevag Trashian", nameHy: null, years: "2014 – 2020", note: null, noteHy: null, isCurrent: false },
        { name: "Rev. Hovhannes Svadjian", nameHy: null, years: "2023 – present", note: null, noteHy: null, isCurrent: true },
      ],
    },

    anniversary: null,
    gallery: null,

    cta: {
      heading: "Join Us in Worship",
      headingHy: null,
      body: "All are welcome at the Armenian Evangelical Emmanuel Church of Nor Amanos — a lighthouse to its neighborhood in the Baouchrieh area of Mount Lebanon.",
      bodyHy: null,
    },

    // OPEN_QUESTIONS.md #21 (pastor/secretary spelling), #36 (address
    // conflict): churches.ts's address adds a specific street/PO box not in
    // the reference and says "Beirut" where the reference says "Mount
    // Lebanon"; churches.ts's phone has only one of the reference's two
    // numbers; churches.ts's secretary spelling "Sevadjian" conflicts with
    // the reference's "Svadjian". Email matches churches.ts exactly
    // (aeecna@gmail.com) — no override needed for that field.
    contactOverride: {
      secretary: "Mrs. Ani Svadjian",
      address: "Nor Amanos, Baouchrieh, Mount Lebanon",
      phone: "(01) 241636 · 81 161 207",
    },
  },

  "armenian-evangelical-church-ashrafieh": {
    slug: "armenian-evangelical-church-ashrafieh",

    masthead: {
      locationLine: "Geitawi, Ashrafieh, Beirut, Lebanon",
      locationLineHy: null,
      established: "1926",
      establishedHy: null,
    },

    logo: {
      src: "/church-armenian-evangelical-church-ashrafieh-logo.jpg",
      alt: "Ashrafieh church logo",
    },
    heroPhoto: {
      src: "/church-armenian-evangelical-church-ashrafieh-hero.jpg",
      alt: "Armenian Evangelical Church of Ashrafieh",
    },
    factsBar: [
      { label: "Sunday Worship", labelHy: null, sub: "Weekly Service", subHy: null },
      { label: "Geitawi, Ashrafieh", labelHy: null, sub: "Beirut", subHy: null },
      { label: "1926", labelHy: null, sub: "Founded", subHy: null },
    ],

    // Verified against uaecne-church-ashrafieh-complete.html's .anniv
    // section (2026 centennial). Scripture quote is verbatim, not
    // paraphrased. logo: null (Yeghia's ruling) — the reference's badge
    // image was byte-identical to the masthead logo above (same church
    // seal, not a distinct "100" graphic), so the band renders text-only
    // rather than showing the same seal twice ~400px apart. The masthead
    // logo itself is unaffected — still used via ChurchContent.logo above.
    anniversary: {
      logo: null,
      kicker: "Celebrating Your Past · Investing in Your Future",
      kickerHy: null,
      numeral: "100",
      label: "Anniversary",
      labelHy: null,
      years: "1926 — 2026",
      verse:
        "Being confident of this, that he who began a good work in you will carry it on to completion until the day of Christ Jesus.",
      verseHy: null,
      verseRef: "Philippians 1:6",
      verseRefHy: null,
      verseLabel: "The Church's Golden Verse",
      verseLabelHy: null,
    },

    about: {
      eyebrow: "The Congregation",
      eyebrowHy: null,
      heading: "About This Church",
      headingHy: null,
      paragraphs: [
        "The Armenian Evangelical Church of Ashrafieh traces its beginnings to the Armenian refugee camps established in 1922, each bearing the name of its town in the homeland — Hajin, Aintab, Adana, Marash. In 1926 the church was formally organized, with Rev. Yenovk Hadidian as its founding pastor, who faithfully served the congregation until 1962. According to statistics from 1926, the church counted 1,500 members.",
        "For its first six years the congregation was known as the “Camp Armenian Evangelical Church.” In the spring of 1932, after moving to its new location in the Geitawi district, it became the Armenian Evangelical Church of Ashrafieh. Today, beyond Sunday worship, the church ministers to diverse needs across children's, youth, couples', women's, and men's ministries, under the leadership of Rev. Hrayr Cholakian.",
      ],
      paragraphsHy: null,
    },

    pastorCard: {
      name: "Rev. Hrayr Cholakian",
      nameHy: null,
      role: "Pastor · Since 2021",
      roleHy: null,
      photo: {
        src: "/church-armenian-evangelical-church-ashrafieh-pastor.jpg",
        alt: "Rev. Hrayr Cholakian",
      },
    },

    // Reference's leadership photos all have alt="" — using each person's
    // own name as alt text, same convention as Nor Marash.
    leadership: [
      {
        name: "Rev. Hrayr Cholakian",
        nameHy: null,
        role: "Pastor",
        roleHy: null,
        photo: {
          src: "/church-armenian-evangelical-church-ashrafieh-leader-1.jpg",
          alt: "Rev. Hrayr Cholakian",
        },
      },
      {
        name: "Mr. Garbis Deyirmenjian",
        nameHy: null,
        role: "Church Council Vice-Chair",
        roleHy: null,
        photo: {
          src: "/church-armenian-evangelical-church-ashrafieh-leader-2.jpg",
          alt: "Mr. Garbis Deyirmenjian",
        },
      },
      {
        name: "Mrs. Nora Ghougasian",
        nameHy: null,
        role: "Secretary",
        roleHy: null,
        photo: {
          src: "/church-armenian-evangelical-church-ashrafieh-leader-3.jpg",
          alt: "Mrs. Nora Ghougasian",
        },
      },
    ],

    history: {
      eyebrow: "Our Story",
      eyebrowHy: null,
      heading: "A Century of Faith & Education",
      headingHy: null,
      sections: [
        {
          heading: "Founding and Early Years",
          headingHy: null,
          paragraphs: [
            "Worship services were initially held under very modest circumstances, yet in these humble settings the church took shape and steadily grew into a strong and vibrant community. The church building was erected in 1932 through the generous donation of Rev. Henry Riggs, in memory of his wife and daughter, who had passed away while serving among Armenians in Kharpert (Harpoot), Turkey. In 1936, adjacent land was purchased and a parsonage built; the church bell was donated by the Swiss Friends of Armenia, represented by Mr. Karl Mayer and Mr. Jacob Künzler (“Papa” Künzler).",
            "The church played a vital role in education, continuing the Armenian Evangelical tradition from the Ottoman Empire. Between 1922 and 1926, Rev. Hadidian founded ten Armenian Evangelical schools, and by 1928 Sunday Schools across the churches enrolled 700 children. The Christian Endeavor Youth Association was founded in 1926 by Dr. Puzant Hadidian and Miss Puzantouhi Yardemian. By 1942 the church had achieved financial independence, no longer relying on aid from the Union. According to 1948–1949 statistics, the church had 312 families (1,156 parishioners), with a Sunday School of 642 students taught by 46 teachers.",
          ],
          paragraphsHy: null,
          image: null,
        },
        {
          heading: "War Years and Destruction",
          headingHy: null,
          paragraphs: [
            "During Lebanon's civil war, the church became a refuge for neighbors seeking shelter in its basement during heavy shelling. In times of relative calm, it served as a safe gathering place for youth. For sixteen years the church endured hardship yet continued its ministries with resilience — worship, Sunday School, youth groups, women's fellowship, and prayer meetings persisted whenever fighting subsided. Despite the losses, these became known as the “Miracle Years,” as God's people witnessed divine intervention and guidance.",
            "The August 4, 2020 Beirut port explosion caused catastrophic damage to the Ashrafieh church and its Central High School. Both buildings were repaired thanks to generous donations from overseas benefactors, alumni, and the Armenian Missionary Association of America (AMAA). Throughout its history, the church and its pastors have emphasized repentance, new birth in Christ, a life of prayer and service, and the proclamation of God's Word.",
          ],
          paragraphsHy: null,
          image: null,
        },
      ],
    },

    programs: {
      eyebrow: "Life of the Church",
      eyebrowHy: null,
      heading: "Ministries",
      headingHy: null,
      items: [
        "Sunday School for children",
        "Teens Ministry",
        "Youth Fellowship",
        "Couples Ministry",
        "Women's Fellowship",
        "Support for the Needy",
        "Bible Study for Men",
        "Bible Study for Young Women",
      ],
      itemsHy: null,
    },

    specialProject: null,

    succession: {
      eyebrow: "Those Who Served",
      eyebrowHy: null,
      heading: "Pastors of the Church",
      headingHy: null,
      note: null,
      noteHy: null,
      entries: [
        { name: "Rev. Yenovk Hadidian", nameHy: null, years: "1926 – 1962", note: null, noteHy: null, isCurrent: false },
        { name: "Rev. Vahram Salibian", nameHy: null, years: "1962 – 1966", note: null, noteHy: null, isCurrent: false },
        { name: "Rev. Hagop Sagherian", nameHy: null, years: "1967 – 1986", note: null, noteHy: null, isCurrent: false },
        { name: "Rev. Krikor Youmoushajekian", nameHy: null, years: "1986 – 1989", note: null, noteHy: null, isCurrent: false },
        { name: "Rev. Nishan Bakalian", nameHy: null, years: "1992 – 1995", note: null, noteHy: null, isCurrent: false },
        { name: "Rev. Soghomon Kilaghbian", nameHy: null, years: "1996 – 2018", note: null, noteHy: null, isCurrent: false },
        { name: "Rev. Hrayr Cholakian", nameHy: null, years: "2021 – present", note: null, noteHy: null, isCurrent: true },
      ],
    },

    // "The Church Today" — no eyebrow kicker, no per-photo captions in the
    // reference. Reference's alt text was a generic repeated "Ashrafieh
    // church" on both — replaced with distinct, honest descriptions after
    // actually looking at each photo (per Yeghia's instruction), not copied
    // from the source.
    gallery: {
      eyebrow: null,
      eyebrowHy: null,
      heading: "The Church Today",
      headingHy: null,
      photos: [
        {
          src: "/church-armenian-evangelical-church-ashrafieh-gallery-1.jpg",
          alt: "Sandstone corner of the church building with arched barred windows, seen from the gated courtyard entrance",
          caption: null,
          captionHy: null,
        },
        {
          src: "/church-armenian-evangelical-church-ashrafieh-gallery-2.jpg",
          alt: "The church's crenellated tower and arcaded colonnade, viewed through trees",
          caption: null,
          captionHy: null,
        },
      ],
    },

    cta: {
      heading: "Join Us in Worship",
      headingHy: null,
      body: "All are welcome at the Armenian Evangelical Church of Ashrafieh — celebrating a century of faith, education, and service in the heart of Beirut.",
      bodyHy: null,
    },

    // No churches.ts conflicts found for this church — pastor, address,
    // phone, email, secretary, and founding year all match the reference
    // exactly. Service time is the usual single-sourced/unverified value
    // (see OPEN_QUESTIONS #37) — no override mechanism exists for it.
    contactOverride: null,
  },
};
