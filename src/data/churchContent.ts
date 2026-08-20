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
};
