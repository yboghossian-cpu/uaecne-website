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
  // Nullable — some references (Anjar) give a pastor's name ONLY in
  // Armenian script, with no English form anywhere in the document. In
  // that case `name` is null and `nameHy` carries the verified Armenian
  // verbatim; SuccessionList.tsx renders `name` when present, else falls
  // back to `nameHy`. This is a real, verified, source-accurate name shown
  // in its original script — not a placeholder or a gap. Additive: every
  // prior church already populates `name` with `nameHy: null`, unaffected.
  name: string | null;
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
export type GalleryPhoto = Photo & {
  caption: string | null;
  captionHy: string | null;
  // Small on-image provenance badge (e.g. "Church-approved render") for a
  // church-supplied AI-generated image — additive, null/omitted for every
  // real photograph. First used by Syriac Aleppo's 2 AI-render gallery
  // images.
  aiLabel?: string | null;
};

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
    established: string; // just the year/value, e.g. "1922" — component prepends "Established " by default
    establishedHy: string | null;
    // Optional override for the prefix word — defaults to "Established"
    // (every church before the Syria unit relies on that default; FAEC's
    // own reference literally says "Established 1922"). Bethel/Emmanuel's
    // mockups both say "Founded" instead.
    establishedLabel?: string;
    // Optional second dated value in the meta line (e.g. Emmanuel's
    // "Present church 1925", alongside "Founded 1852") — null/omitted for
    // every church with only one date.
    secondDate?: { label: string; value: string } | null;
    // Optional plain (non-bold) trailing text right after the bold
    // established year — e.g. Syriac's " (Urfa) · re-established in
    // Aleppo". Distinct from `secondDate` (a second labeled/bolded value);
    // this is unstructured trailing prose. Null/omitted for every church
    // without one.
    establishedSuffix?: string;
  };

  logo: Photo | null; // independently optional
  // Nullable — a church with no confirmed hero photo falls back to the
  // arched "photo pending" treatment in ChurchTopBlock, matching Schools/
  // Outreach's existing pattern. Every church built before the Syria unit
  // has a confirmed real photo, so this was `Photo` (always present)
  // until now.
  heroPhoto: Photo | null;
  factsBar: { label: string; labelHy: string | null; sub: string; subHy: string | null }[];

  about: {
    eyebrow: string;
    eyebrowHy: string | null;
    heading: string;
    headingHy: string | null;
    paragraphs: string[];
    paragraphsHy: string[] | null;
    // Both additive/optional — every church before the Syria unit omits
    // both, keeping ChurchAbout's existing default behavior (drop-cap on,
    // no pull-quote).
    dropcap?: boolean;
    pullQuote?: string | null;
    pullQuoteHy?: string | null;
    vacancyNote?: string | null;
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
  // Optional override for LeadershipGrid's eyebrow — defaults to "The
  // Ministry" when omitted (every church before the Syria unit relies on
  // that default). Bethel and Emmanuel's mockups both say "The Team."
  leadershipEyebrow?: string;
  // Optional italic note below the leadership grid (e.g. Syriac Aleppo's
  // "English spelling pending your confirmation..."). Null/omitted for
  // every other church.
  leadershipNote?: string | null;

  history: {
    eyebrow: string;
    eyebrowHy: string | null;
    heading: string;
    headingHy: string | null;
    sections: HistorySection[];
    // Additive/optional — every church before the Syria unit omits this,
    // unaffected. When true, the very first paragraph of the very first
    // section gets a first-letter drop cap (Bethel's mockup .dropcap).
    dropcapFirstParagraph?: boolean;
  } | null;

  programs: {
    // Nullable — Bethel's mockup has no eyebrow above "Ministries &
    // Activities" (just the heading), unlike every prior church's programs
    // section.
    eyebrow: string | null;
    eyebrowHy: string | null;
    heading: string;
    headingHy: string | null;
    items: string[];
    itemsHy: string[] | null;
  } | null;

  // Red-gradient band marking a single milestone moment (a year + heading
  // + one paragraph) — e.g. Bethel's 2021 renovation/rededication. Distinct
  // from `anniversary` (a numbered-years-of-service badge + scripture
  // verse) and `specialProject` (an eyebrow/heading/objectives-grid
  // initiative) — neither fits a single dated event. Null for churches
  // with no milestone content of this shape.
  milestone: {
    year: string;
    yearHy: string | null;
    heading: string;
    headingHy: string | null;
    body: string;
    bodyHy: string | null;
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
    // Additive — an unnamed summary line rendered after the entries (e.g.
    // Damascus's "Between 1930 and 2010, the church was served by thirteen
    // resident pastors." — a real, source-verified count with no names to
    // attach it to). Distinct from `note`, which renders above the entries.
    // Null/omitted for every church without one.
    footNote?: string | null;
    footNoteHy?: string | null;
  } | null;

  // Verified against Ashrafieh's reference (see the `Anniversary` type above)
  // — null for every church that doesn't have a centennial/anniversary
  // module of its own.
  anniversary: Anniversary | null;

  // Additive — a closing "Our Vision" statement band (red-gradient, eyebrow
  // + a single italic paragraph), distinct from the always-present `cta`
  // below. Neither MilestoneBand (year+heading+body) nor ChurchCTA
  // (heading+body, no eyebrow) fit this shape without inventing content the
  // reference doesn't have. First used by Damascus. Optional/omitted for
  // every church without one.
  vision?: {
    eyebrow: string;
    eyebrowHy: string | null;
    body: string;
    bodyHy: string | null;
  } | null;

  // Additive — a bordered "Worship Today" notice card (distinct from every
  // other module: not a pull-quote, not a vacancy pill, not a full section
  // with an eyebrow/heading pair) for an inactive church whose congregation
  // now worships elsewhere. `boldPhrase`, when non-null, is a verbatim
  // substring of `body` (e.g. a redirect church's name) rendered in bold —
  // matching the reference's own inline `<b>` emphasis — rather than
  // reformatting the paragraph into separate fields. First used by
  // Karaduran/Kaladouran. Optional/omitted for every church without one.
  worshipToday?: {
    heading: string;
    headingHy: string | null;
    body: string;
    bodyHy: string | null;
    boldPhrase: string | null;
  } | null;

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
    // Relabels the secretary row's key — default "Secretary" (every church
    // before the Syria unit relies on that default). Syriac Aleppo's
    // mockup calls the same row "Vice-Chair" instead (the named person
    // holds that office, not the secretary role).
    secretaryLabel?: string;
    address?: string;
    hideLocationCard?: boolean;
    // Real Facebook page link (label + full URL) — additive, only set
    // when the reference actually names one (Emmanuel's mockup, corrected
    // from the source doc's typo'd "facebo-ok"). Renders a real link, not
    // a dead href.
    facebook?: { label: string; url: string };
    // Renders "Pending" in place of a real phone/email value — for a
    // church whose reference explicitly marks contact details as
    // placeholders (e.g. the Syria churches), rather than showing
    // churches.ts's directory value as if it were confirmed. Distinct from
    // `email: null` (suppresses the row entirely) — this keeps the row
    // visible with an honest "not yet verified" state, matching
    // SchoolContactRow's existing `pending` treatment.
    phonePending?: boolean;
    emailPending?: boolean;
    // Optional italic disclaimer line at the bottom of the "Get in Touch"
    // card (e.g. "Contact details are placeholders until verified copy is
    // supplied."). Null/omitted renders nothing extra.
    note?: string;
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

    milestone: null,
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
    milestone: null,
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

    milestone: null,
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

    milestone: null,
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
    // paraphrased. logo is the real seal — byte-identical to the masthead
    // logo above (same church seal, not a distinct "100" graphic), which
    // originally read as a "double seal ~400px apart" problem under the
    // first side-by-side layout (logo: null then). Approved Variant D
    // (design-reference/uaecne-ashrafieh-anniversary-final.html) sets it in
    // a gold-ring roundel as one cell of a contained 3-column card (seal |
    // numeral+years | verse) — AnniversaryBand.tsx renders it there, not
    // beside the masthead.
    milestone: null,
    anniversary: {
      logo: {
        src: "/church-armenian-evangelical-church-ashrafieh-logo.jpg",
        alt: "100th Anniversary — Armenian Evangelical Church of Ashrafieh",
      },
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

  "armenian-evangelical-church-anjar": {
    slug: "armenian-evangelical-church-anjar",

    masthead: {
      locationLine: "Anjar, Bekaa, Lebanon",
      locationLineHy: null,
      established: "1941",
      establishedHy: null,
    },

    logo: {
      src: "/church-armenian-evangelical-church-anjar-logo.png",
      alt: "Armenian Evangelical Church of Anjar logo",
    },
    heroPhoto: {
      src: "/church-armenian-evangelical-church-anjar-hero.jpg",
      alt: "Armenian Evangelical Church of Anjar",
    },
    // Only church so far whose facts bar carries an actual clock time —
    // corroborated by churches.ts's own "Sundays 10:00-11:00" (see
    // OPEN_QUESTIONS provenance note), not the usual single-sourced value.
    factsBar: [
      { label: "Sundays · 10:00–11:00", labelHy: null, sub: "Worship Service", subHy: null },
      { label: "Anjar, Bekaa", labelHy: null, sub: "Lebanon", subHy: null },
      { label: "1941", labelHy: null, sub: "Founded", subHy: null },
    ],

    about: {
      eyebrow: "The Congregation",
      eyebrowHy: null,
      heading: "About This Church",
      headingHy: null,
      paragraphs: [
        "The Armenian Evangelical Church of Anjar, founded in 1941, has been a central hub for worship, education, and community support for Armenian refugees from Musa Dagh in Lebanon. It was established one year after the Armenian Evangelical School of Anjar, to serve the community that had fled Musa Dagh during the French Mandate period.",
        "Its first pastor, Rev. Aram Hadidian, came with the deported community and helped organize the fledgling congregation. In that same year, the church established the Christian Endeavor (“Chanits”) Society for youth, a Sunday school, and a women’s group — providing religious, educational, and cultural engagement for the community. Today the congregation continues in faithful ministry to the Armenian families of the Bekaa Valley under the leadership of Rev. Hagop Akbasharian. In August 2025, Pastor Asadour Mencherian joined the church as assistant pastor.",
      ],
      paragraphsHy: null,
    },

    pastorCard: {
      name: "Rev. Hagop Akbasharian",
      nameHy: null,
      role: "Pastor · Since 2013",
      roleHy: null,
      photo: {
        src: "/church-armenian-evangelical-church-anjar-pastor.jpg",
        alt: "Rev. Hagop Akbasharian",
      },
    },

    // Reference's leadership photos all have alt="" — using each person's
    // own name as alt text, same convention as Nor Marash/Ashrafieh.
    leadership: [
      {
        name: "Rev. Hagop Akbasharian",
        nameHy: null,
        role: "Pastor",
        roleHy: null,
        photo: {
          src: "/church-armenian-evangelical-church-anjar-leader-1.jpg",
          alt: "Rev. Hagop Akbasharian",
        },
      },
      {
        name: "Pastor Asadour Mencherian",
        nameHy: null,
        role: "Assistant Pastor",
        roleHy: null,
        photo: {
          src: "/church-armenian-evangelical-church-anjar-leader-2.jpg",
          alt: "Pastor Asadour Mencherian",
        },
      },
      {
        name: "Mr. Kevork Kerkezian",
        nameHy: null,
        role: "Board Member",
        roleHy: null,
        photo: {
          src: "/church-armenian-evangelical-church-anjar-leader-3.jpg",
          alt: "Mr. Kevork Kerkezian",
        },
      },
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

    history: {
      eyebrow: "Our Story",
      eyebrowHy: null,
      heading: "A History of Faith & Refuge",
      headingHy: null,
      sections: [
        {
          heading: "Founding and Early Years",
          headingHy: null,
          paragraphs: [
            "The Armenian Evangelical Church of Anjar was established in 1941, one year after the founding of the Armenian Evangelical School of Anjar, to serve the Armenian refugees who had fled Musa Dagh during the French Mandate period. Its first pastor, Rev. Aram Hadidian, came with the deported community and helped organize the fledgling congregation, establishing the Christian Endeavor (“Chanits”) Society, a Sunday school, and a women’s group.",
          ],
          paragraphsHy: null,
          image: null,
        },
        {
          heading: "Educational and Social Contributions",
          headingHy: null,
          paragraphs: [
            "The church played a pivotal role in education and social welfare. The Armenian Evangelical School expanded over the years to include kindergarten, elementary, intermediate, and secondary sections. By 1964, the school had 550 students and 29 teachers, growing to 650 students by 1970, and published the “Shiraz” yearbook. In addition to education, the church provided medical and social care to thousands displaced from Musa Dagh — in just ten months of 1950, 8,451 patients received care through church initiatives. Missionaries like Sister Hedwig Äenishänslin contributed significantly to both education and social services.",
          ],
          paragraphsHy: null,
          image: null,
        },
        {
          heading: "Community and Cultural Significance",
          headingHy: null,
          paragraphs: [
            "The church has been a spiritual and cultural anchor for the Armenian community in Anjar. It has commemorated heroes of the Musa Dagh resistance, such as Rev. Dikran Antreasian, whose remains were reinterred beside the church in 2002. The campus includes the Janbazian Hall and other facilities named in memory of notable community members. The church also honors the German and Swiss missionaries who served the community, including the re-erection of a historic clock tower on the 80th anniversary of Anjar. Despite challenges — including a fire that damaged the church in recent years — the congregation continues to maintain and restore the building.",
          ],
          paragraphsHy: null,
          image: null,
        },
        {
          heading: "Legacy",
          headingHy: null,
          paragraphs: [
            "The Armenian Evangelical Church of Anjar remains a central institution in the town, which itself was founded in 1939 to shelter Armenian refugees from Musa Dagh. It continues to provide spiritual guidance, educational opportunities, and social services — symbolizing survival, faith, and cultural preservation for generations of Armenians.",
          ],
          paragraphsHy: null,
          image: null,
        },
      ],
    },

    programs: {
      eyebrow: "Life of the Church",
      eyebrowHy: null,
      heading: "Running Programs",
      headingHy: null,
      items: [
        "Weekly Sunday Worship",
        "Sunday School (4–12 yrs)",
        "Teenagers Group (13–17 yrs)",
        "Youth Group (18+)",
        "Ladies Group",
        "Retreats & Camps",
        "Social Ministry",
        "DVBS — Daily Vacation Bible School",
        "Medical Ministry",
      ],
      itemsHy: null,
    },

    // Figures verbatim from the reference — not rounded or estimated.
    specialProject: {
      eyebrow: "Special Initiative",
      eyebrowHy: null,
      heading: "The “Hamegh” Project",
      headingHy: null,
      since: "Since 2022 · cultivating organic agricultural delicacies",
      sinceHy: null,
      objectives: [
        {
          title: "Decent Work & Employment",
          titleHy: null,
          description:
            "25 socially-secured, fair-wage jobs (60% women, 40% men), focusing on vulnerable groups, mothers, refugees, and individuals without formal diplomas.",
          descriptionHy: null,
        },
        {
          title: "Social Protection & Childcare",
          titleHy: null,
          description:
            "An on-site professional childcare facility integrated into the processing unit, removing employment barriers for working mothers.",
          descriptionHy: null,
        },
        {
          title: "Education Support",
          titleHy: null,
          description:
            "Net profits fund financial aid for vulnerable students — targeting 45 students by 2029 — at the Armenian Evangelical Secondary School in Anjar.",
          descriptionHy: null,
        },
        {
          title: "Local Economic Sustainability",
          titleHy: null,
          description:
            "A self-sustaining agricultural processing value chain in Anjar, scaling high-value organic goods while making use of local products.",
          descriptionHy: null,
        },
      ],
    },

    // Yeghia's ruling on the succession name model (site-wide, see
    // SuccessionEntry type comment): the reference's succession list is
    // written ONLY in Armenian script, with no English form anywhere in
    // the document itself. English spellings were supplied directly by
    // Yeghia entry-by-entry as each was independently confirmed — not
    // transliterated or guessed here: the current pastor and Raffi
    // Messerlian (OPEN_QUESTIONS #35) first; Sarmazian and Balabanian
    // confirmed later (2026-08-21) and reconciled with the same spellings
    // used on the AESSA school page's Directors Archive, where both people
    // also appear (see schoolContent.ts). The remaining 5 entries still
    // render their verified Armenian verbatim via nameHy, with name: null
    // (not a gap — a deliberate mixed-script decision; see OPEN_QUESTIONS)
    // until an English form is confirmed for them too. All 9 entries appear
    // exactly once in the reference — no duplicate rows despite the 1-year
    // overlap between Balabanian's and Messerlian's tenures (flagged
    // separately).
    succession: {
      eyebrow: "Those Who Served",
      eyebrowHy: null,
      heading: "Pastors of the Church",
      headingHy: null,
      note: null,
      noteHy: "Այնճարի հայ Աւետարանական եկեղեցւոյ ծառայած են՝",
      entries: [
        { name: null, nameHy: "Վերապատուելի Արամ Հատիտեան", years: "1939 – 1947", note: null, noteHy: null, isCurrent: false },
        { name: null, nameHy: "Քարոզիչ Մովսէս Մանուշակեան", years: "1947 – 1950", note: null, noteHy: null, isCurrent: false },
        { name: null, nameHy: "Վեր. Պեռնար Կէօքօզեան", years: "1950 – 1953", note: null, noteHy: null, isCurrent: false },
        { name: null, nameHy: "Վեր. Մարտիրոս Մարկանեան", years: "1953 – 1959", note: null, noteHy: null, isCurrent: false },
        { name: null, nameHy: "Պատ. Յովհաննէս Մելքոնեան", years: "1959 – 1966", note: null, noteHy: null, isCurrent: false },
        { name: "Rev. Hovhannes Sarmazian", nameHy: "Վեր. Յովհաննէս Սարմազեան", years: "1968 – 1990", note: null, noteHy: null, isCurrent: false },
        { name: "Rev. Nerses Balabanian", nameHy: "Վեր. Ներսէս Պալապանեան", years: "1990 – 1999", note: null, noteHy: null, isCurrent: false },
        { name: "Rev. Raffi Messerlian", nameHy: "Վեր. Րաֆֆի Մըսրլեան", years: "1998 – 2013", note: null, noteHy: null, isCurrent: false },
        { name: "Rev. Hagop Akbasharian", nameHy: "Վեր. Յակոբ Աքպաշարեան", years: "2013 – present", note: null, noteHy: null, isCurrent: true },
      ],
    },

    milestone: null,
    anniversary: null,
    gallery: null,

    cta: {
      heading: "Join Us in Worship",
      headingHy: null,
      body: "All are welcome at the Armenian Evangelical Church of Anjar. Come worship with us in the heart of the Bekaa Valley.",
      bodyHy: null,
    },

    // Address is a superset, not a conflict — reference's "Anjar, Bekaa
    // Valley, Lebanon" is a trivial paraphrase of churches.ts's "Anjar,
    // Bekaa, Lebanon", which additionally carries a real P.O. box the
    // reference omits. Kept from churches.ts as-is, no override — same
    // precedent as Ashrafieh. Phone/email/secretary all agree exactly.
    contactOverride: null,
  },

  // Syria — Aleppo. Built verbatim from
  // design-reference/uaecne-church-bethel-aleppo.html. ENGLISH-ONLY per
  // Yeghia's instruction: the mockup's Armenian masthead subtitle line
  // (".hy") is dropped entirely, and the Armenian pastors-succession list
  // is rendered in best-effort English transliteration (see the
  // succession `note` below) rather than Armenian script. Phone/email are
  // rendered as "Pending" (contactOverride) even though churches.ts has
  // values for them — the mockup itself explicitly marks them
  // placeholder/pending, which wins per rule 1 (verified reference over
  // directory guess). See OPEN_QUESTIONS for the full list of
  // pending-confirmation items.
  "armenian-evangelical-bethel-church-aleppo": {
    slug: "armenian-evangelical-bethel-church-aleppo",

    masthead: {
      locationLine: "Jabriye District, Aleppo, Syria",
      locationLineHy: null,
      established: "1923",
      establishedHy: null,
      establishedLabel: "Founded",
    },

    // No distinct logo/seal file exists in the source folder — the
    // mockup's own masthead circle is itself a photo (not a graphic
    // emblem), and no comparable file exists to use honestly in its place.
    // Rendered without a masthead logo, same as any other church with none
    // (e.g. Nor Marash).
    logo: null,
    heroPhoto: {
      src: "/church-bethel-aleppo-hero.jpg",
      alt: "Armenian Evangelical Bethel Church of Aleppo",
    },
    factsBar: [
      { label: "1923", labelHy: null, sub: "Founded", subHy: null },
      { label: "Jabriye, Aleppo", labelHy: null, sub: "Location", subHy: null },
      { label: "Sunday · pending", labelHy: null, sub: "Worship Service", subHy: null },
    ],

    about: {
      eyebrow: "The Church",
      eyebrowHy: null,
      heading: "About Bethel Church",
      headingHy: null,
      paragraphs: [
        "The Armenian Evangelical Bethel Church of Aleppo is a living witness to faith, perseverance, service, and hope. From a humble wooden structure established for refugees in the aftermath of the Armenian Genocide, it has grown into a spiritual home and a symbol of resilience for generations of Armenians in Aleppo.",
        "Through times of peace, displacement, war, reconstruction, and renewal, Bethel has continued to open its doors to its people — proclaiming faith, nurturing generations, serving the community, and bearing witness to the enduring power of hope. It stands within the family of the Union of the Armenian Evangelical Churches in the Near East (UAECNE).",
      ],
      paragraphsHy: null,
      dropcap: false,
      pullQuote:
        "For more than a century, Bethel has remained a living witness to faith, perseverance, service, and hope.",
      pullQuoteHy: null,
    },

    pastorCard: {
      name: "Rev. Dr. Haroutune Selimian",
      nameHy: null,
      role: "Pastor",
      roleHy: null,
      photo: {
        src: "/church-bethel-aleppo-pastor-selimian.jpg",
        alt: "Rev. Dr. Haroutune Selimian",
      },
    },

    leadership: [
      {
        name: "Rev. Dr. Haroutune Selimian",
        nameHy: null,
        role: "Pastor",
        roleHy: null,
        photo: { src: "/church-bethel-aleppo-pastor-selimian.jpg", alt: "Rev. Dr. Haroutune Selimian" },
      },
      {
        name: "Mr. Harout Khachadourian",
        nameHy: null,
        role: "Vice-Chairman, Joint Assembly",
        roleHy: null,
        photo: {
          src: "/church-bethel-aleppo-leader-khachadourian.jpg",
          alt: "Mr. Harout Khachadourian",
        },
      },
      {
        name: "Mrs. Araz Mansourian-Shahinian",
        nameHy: null,
        role: "Secretary",
        roleHy: null,
        photo: {
          src: "/church-bethel-aleppo-secretary-shahinian.jpg",
          alt: "Mrs. Araz Mansourian-Shahinian",
        },
      },
    ],
    leadershipEyebrow: "The Team",

    history: {
      eyebrow: "Our History",
      eyebrowHy: null,
      heading: "A Century of Faith in Aleppo",
      headingHy: null,
      dropcapFirstParagraph: true,
      sections: [
        {
          heading: null,
          headingHy: null,
          paragraphs: [
            "The history of the Armenian Evangelical Church movement formally began in 1846, when a number of godly people with a reform vision decided the time had come for Armenians to experience the Christian faith based on the direct teaching and preaching of the Bible as the sole reference of the church. This torch of faith is exemplified by the founding of the Armenian Evangelical Bethel Church in Aleppo.",
            "Most Armenian Evangelicals arrived in Syria as a result of the Genocide. The survivors who reached Aleppo settled in the Jabriye and Suleymaniye areas of the city under more than tragic conditions — but the need to survive made them regroup and start churches and schools. In this context, the Bethel Church was founded, its first members the surviving members of the Marash Armenian Evangelical churches: laborers, elderly, widows, and orphans.",
          ],
          paragraphsHy: null,
          image: null,
        },
        {
          heading: "From Camp Bethel to a Church of Stone",
          headingHy: null,
          paragraphs: [
            "Today's Bethel Church was once called the Camp Bethel Church, built in a refugee camp in a hacienda called al-Hamidiye. The American Missionary Board initiated the construction of a wooden hall for educational and religious purposes; some elderly still remember when the classrooms were separated by mere curtains. In 1922, Rev. Garabed Ketenjian was asked to be the pastor. By around 1932 the number of church attendants reached 1,600, and the leaders resolved to build a stone church.",
            "During 1932–1934, under Rev. Nerses Sarian, land was bought on the hill in the Jabriye area, upon which the Bethel Church stands to this day. In 1934 the foundation of the building was celebrated — a replica of the First Armenian Evangelical Church in Marash, twenty metres long and fifteen wide — finalized during Rev. Yeghia Kassouni's period (1935–1937), who also built the parsonage.",
          ],
          paragraphsHy: null,
          image: null,
        },
        {
          heading: "Service Through War and Renewal",
          headingHy: null,
          paragraphs: [
            "Rev. Aharon Shirajian played a major role in the building of Bethel and was also a founder of the Red Cross in Syria and of the Aleppo Armenian Home for the Elderly, and ran a center of refuge and healing for Armenian women who had suffered during the Genocide. Across the following decades, a steady succession of faithful pastors carried the church through the Second World War, waves of emigration, and the nationalization of Christian schools in the late 1960s.",
            "In 1992, Bethel welcomed a young pastor, Rev. Dr. Haroutune Selimian, who continues to serve to this day. During the Syrian war — with Aleppo a main battlefield from 2012 to 2017 — Bethel kept its doors open, and in his capacity as Head of the Armenian Evangelical Community in Syria, Rev. Selimian established humanitarian response structures for families whose homes had been struck, and for children, adults, and the vulnerable struggling to survive.",
            "On March 21, 2021, the Armenian Evangelical Bethel Church was renovated and rededicated — a new chapter of hope and renewed vitality for the Armenian faithful of Aleppo.",
          ],
          paragraphsHy: null,
          image: null,
        },
      ],
    },

    programs: {
      eyebrow: null,
      eyebrowHy: null,
      heading: "Ministries & Activities",
      headingHy: null,
      items: [
        "Sunday Worship Services",
        "Christian Education",
        "Women's Ministry",
        "“Young Knights”",
        "Christian Endeavor",
        "Community Activities",
        "Summer Bible School",
      ],
      itemsHy: null,
    },

    milestone: {
      year: "2021",
      yearHy: null,
      heading: "Renovated & Rededicated",
      headingHy: null,
      body: "On March 21, 2021, the Armenian Evangelical Bethel Church was renovated and rededicated — marking a new chapter of hope and renewed vitality in the life of the Armenian faithful of Aleppo. With renewed spirit, the church continues its mission under the pastoral leadership of Rev. Dr. Haroutune Selimian.",
      bodyHy: null,
    },

    specialProject: null,

    // Pastors' succession — best-effort English transliteration from the
    // mockup's own Western Armenian names (its own note reads "Names are
    // rendered in Western Armenian as supplied; English forms pending").
    // 5 of 17 names already have a confirmed English spelling directly
    // from the mockup's own History prose (Garabed Ketenjian, Nerses
    // Sarian, Yeghia Kassouni, Aharon Shirajian, Haroutune Selimian); the
    // rest are transliterated here for the first time, pending Union
    // confirmation — see OPEN_QUESTIONS. "Sarmazian"/"Khachadourian"
    // spellings reused from this page's own leadership grid / the
    // Anjar/AESSA succession precedent for consistency.
    succession: {
      eyebrow: "Archive",
      eyebrowHy: null,
      heading: "Pastors of Bethel Church",
      headingHy: null,
      note: "Those who have served the Armenian Evangelical Bethel Church since its founding. Names are shown in English (best-effort transliteration from the source Western Armenian); spellings not already confirmed elsewhere on the site are pending Union confirmation.",
      noteHy: null,
      entries: [
        { name: "Rev. Garabed Ketenjian", nameHy: null, years: "1922", note: null, noteHy: null, isCurrent: false },
        { name: "Rev. Nerses Sarian", nameHy: null, years: "1932 – 1934", note: null, noteHy: null, isCurrent: false },
        { name: "Rev. Yeghia Kassouni", nameHy: null, years: "1935 – 1937", note: null, noteHy: null, isCurrent: false },
        { name: "Rev. Misak Manoukian", nameHy: null, years: "—", note: null, noteHy: null, isCurrent: false },
        { name: "Rev. Aharon Shirajian", nameHy: null, years: "1923 – 1938", note: null, noteHy: null, isCurrent: false },
        { name: "Rev. Hovhannes Abkarian", nameHy: null, years: "1939 – 1947", note: null, noteHy: null, isCurrent: false },
        { name: "Rev. Nerses Khachadourian", nameHy: null, years: "1947 – 1949", note: null, noteHy: null, isCurrent: false },
        { name: "Rev. Dikran Andreasian", nameHy: null, years: "1949 – 1957", note: null, noteHy: null, isCurrent: false },
        { name: "Rev. Vahan Bedikian", nameHy: null, years: "1957 – 1963", note: null, noteHy: null, isCurrent: false },
        { name: "Rev. Yesayi Sarmazian", nameHy: null, years: "1963 –", note: null, noteHy: null, isCurrent: false },
        { name: "Rev. Bargev Abardian", nameHy: null, years: "1969 – 1972", note: null, noteHy: null, isCurrent: false },
        { name: "Rev. Manase Shnorhokian", nameHy: null, years: "1973 – 1975", note: null, noteHy: null, isCurrent: false },
        {
          name: "Rev. Hovhannes Sarmazian · Rev. Ardashes Kerpabian",
          nameHy: null,
          years: "1975 – 1978",
          note: null,
          noteHy: null,
          isCurrent: false,
        },
        { name: "Rev. Bargev Orjanian", nameHy: null, years: "1978 – 1981", note: null, noteHy: null, isCurrent: false },
        { name: "Rev. Hanna Sarmazian", nameHy: null, years: "1982 – 1988", note: null, noteHy: null, isCurrent: false },
        {
          name: "Mr. Melkon Melkonian (lay preacher)",
          nameHy: null,
          years: "1990 – 1992",
          note: null,
          noteHy: null,
          isCurrent: false,
        },
        {
          name: "Rev. Dr. Haroutune Selimian",
          nameHy: null,
          years: "1992 – present",
          note: null,
          noteHy: null,
          isCurrent: true,
        },
      ],
    },

    anniversary: null,

    gallery: {
      eyebrow: "Life at Bethel",
      eyebrowHy: null,
      heading: "Gallery",
      headingHy: null,
      photos: [
        {
          src: "/church-bethel-aleppo-gallery-worship.jpg",
          alt: "Worship inside Bethel Church",
          caption: null,
          captionHy: null,
        },
        {
          src: "/church-bethel-aleppo-gallery-night.jpg",
          alt: "Bethel Church at night",
          caption: null,
          captionHy: null,
        },
        {
          src: "/church-bethel-aleppo-gallery-dvbs.jpg",
          alt: "Summer Bible School at Bethel",
          caption: null,
          captionHy: null,
        },
        {
          src: "/church-bethel-aleppo-gallery-courtyard.jpg",
          alt: "Bethel Church courtyard gathering",
          caption: null,
          captionHy: null,
        },
      ],
    },

    cta: {
      heading: "A Living Witness in Aleppo",
      headingHy: null,
      body: "For more than a century, Bethel Armenian Evangelical Church has opened its doors to its people — proclaiming faith, nurturing generations, and bearing witness to the enduring power of hope, under the Union of the Armenian Evangelical Churches in the Near East.",
      bodyHy: null,
    },

    // Phone/email rendered as "Pending" even though churches.ts has
    // values — the approved mockup explicitly marks both placeholder
    // ("Placeholder — pending"), which wins per rule 1. Secretary's real
    // name is confirmed (matches the mockup's own leadership grid).
    contactOverride: {
      phonePending: true,
      emailPending: true,
      secretary: "Mrs. Araz Mansourian-Shahinian",
      note: "Contact details are placeholders until verified copy is supplied.",
    },
  },

  // Syria — Aleppo, church 2 of 9. Built verbatim from
  // design-reference/uaecne-church-emmanuel-aleppo.html. ENGLISH-ONLY per
  // Yeghia's instruction — the mockup's Armenian masthead subtitle line is
  // dropped entirely (no other Armenian content exists on this page).
  // Rev. Dr. Haroutune Selimian is Emmanuel's HONORARY pastor, not
  // resident — the About copy states plainly the church has no resident
  // pastor, and his role reads "Honorary Pastor" everywhere, never
  // "Pastor." His real photo is reused from Bethel (same real person,
  // same site) rather than duplicated. No pastors'-succession module
  // exists in this mockup at all — `succession: null`.
  "armenian-protestant-emmanuel-church-aleppo": {
    slug: "armenian-protestant-emmanuel-church-aleppo",

    masthead: {
      locationLine: "Azizieh District, Aleppo, Syria",
      locationLineHy: null,
      established: "1852",
      establishedHy: null,
      establishedLabel: "Founded",
      secondDate: { label: "Present church", value: "1925" },
    },

    // No distinct logo/seal file exists — the mockup's own masthead circle
    // is a generic cross icon, not a real institutional emblem. Rendered
    // without a masthead logo, same treatment as Bethel.
    logo: null,
    heroPhoto: {
      src: "/church-emmanuel-aleppo-hero.jpg",
      alt: "Armenian Evangelical Emmanuel Church of Aleppo",
    },
    factsBar: [
      { label: "1852", labelHy: null, sub: "Founded", subHy: null },
      { label: "Azizieh, Aleppo", labelHy: null, sub: "Location", subHy: null },
      { label: "Sunday · pending", labelHy: null, sub: "Worship Service", subHy: null },
    ],

    about: {
      eyebrow: "The Church",
      eyebrowHy: null,
      heading: "About Emmanuel Church",
      headingHy: null,
      paragraphs: [
        "The Armenian Evangelical Church of Aleppo was established in 1852, on the second Sunday of June, in the Mugharbalieh district, with six founding members. From those modest beginnings it grew into a stable congregation, and in 1925 the church welcomed its people into its newly constructed building in the Azizieh district, where Emmanuel Church stands today.",
        "Emmanuel Church continues its longstanding ministry of worship, Christian education, fellowship, and service. Although the church currently does not have a resident pastor, Rev. Dr. Haroutune Selimian — Head of the Armenian Protestant Community in Syria and Honorary Pastor of Emmanuel Church — regularly ministers the Word of God to the congregation during Sunday worship. It stands within the family of the Union of the Armenian Evangelical Churches in the Near East (UAECNE).",
      ],
      paragraphsHy: null,
      dropcap: false,
      pullQuote:
        "Faithful to its historic calling: to proclaim the Gospel, nurture Christian faith, strengthen fellowship, and serve the wider community.",
      pullQuoteHy: null,
    },

    pastorCard: {
      name: "Rev. Dr. Haroutune Selimian",
      nameHy: null,
      role: "Honorary Pastor",
      roleHy: null,
      photo: {
        src: "/church-bethel-aleppo-pastor-selimian.jpg",
        alt: "Rev. Dr. Haroutune Selimian",
      },
    },

    leadership: [
      {
        name: "Rev. Dr. Haroutune Selimian",
        nameHy: null,
        role: "Honorary Pastor",
        roleHy: null,
        photo: { src: "/church-bethel-aleppo-pastor-selimian.jpg", alt: "Rev. Dr. Haroutune Selimian" },
      },
      {
        name: "Mrs. Betty Hatem",
        nameHy: null,
        role: "Vice-Chairwoman",
        roleHy: null,
        photo: null,
      },
      {
        name: "Mrs. Tamar Kazanjian-Keoshgerian",
        nameHy: null,
        role: "Secretary",
        roleHy: null,
        photo: null,
      },
    ],
    leadershipEyebrow: "The Team",

    history: {
      eyebrow: "Our History",
      eyebrowHy: null,
      heading: "From Mugharbalieh to Azizieh",
      headingHy: null,
      dropcapFirstParagraph: true,
      sections: [
        {
          heading: null,
          headingHy: null,
          paragraphs: [
            "The Armenian Evangelical Church of Aleppo was established in 1852, on the second Sunday of June, in the Mugharbalieh district, with six founding members. In 1855 the church was reorganized with nine members, and during its early years worship services were held in a rented house in Mugharbalieh.",
            "Alongside the church, a small boys' primary school was established, operating at first with a single teacher. Despite these modest beginnings, the church gradually grew into a stable congregation of approximately fifty members.",
            "By the early 1920s, one of the principal concerns of the congregation was the construction of a permanent church building. On June 28, 1923, the foundation stone of the new church was laid during a special worship service. While construction was still underway, former members and those wishing to join were invited to register officially — and on that occasion 85 men and 115 women formally declared their membership.",
            "In 1925, Emmanuel Armenian Evangelical Church welcomed its congregation into its newly constructed building in the Azizieh district of Aleppo, beginning the year with a solemn New Year worship service attended by a large gathering of the faithful. In 1927, for the first time, the Administrative Council conducted a systematic census, recording 363 families — approximately 1,500 individuals from 20 different localities.",
          ],
          paragraphsHy: null,
          image: null,
        },
      ],
    },

    programs: {
      eyebrow: null,
      eyebrowHy: null,
      heading: "Ministries & Activities",
      headingHy: null,
      items: [
        "Sunday Worship Services",
        "Women's Ministry",
        "Youth Ministry",
        "Christian Endeavor",
        "Couples' Committee",
        "Christian Education",
      ],
      itemsHy: null,
    },

    milestone: {
      year: "1925",
      yearHy: null,
      heading: "A New Home in Azizieh",
      headingHy: null,
      body: "After decades in Mugharbalieh, the congregation entered its newly constructed church in the Azizieh district of Aleppo — the building where Emmanuel Church continues to worship and serve to this day.",
      bodyHy: null,
    },

    specialProject: null,
    succession: null,
    anniversary: null,

    gallery: {
      eyebrow: "Life at Emmanuel",
      eyebrowHy: null,
      heading: "Gallery",
      headingHy: null,
      photos: [
        {
          src: "/church-emmanuel-aleppo-gallery-interior.jpg",
          alt: "Emmanuel Church interior",
          caption: null,
          captionHy: null,
        },
        {
          src: "/church-emmanuel-aleppo-gallery-worship.jpg",
          alt: "Sunday worship at Emmanuel",
          caption: null,
          captionHy: null,
        },
        {
          src: "/church-emmanuel-aleppo-gallery-altar.jpg",
          alt: "Youth gathering at the altar",
          caption: null,
          captionHy: null,
        },
        {
          src: "/church-emmanuel-aleppo-gallery-womens.jpg",
          alt: "Women's ministry meeting",
          caption: null,
          captionHy: null,
        },
        {
          src: "/church-emmanuel-aleppo-gallery-vbs.jpg",
          alt: "Summer Bible School",
          caption: null,
          captionHy: null,
        },
        {
          src: "/church-emmanuel-aleppo-gallery-outing.jpg",
          alt: "Youth outing",
          caption: null,
          captionHy: null,
        },
      ],
    },

    cta: {
      heading: "Faith in Aleppo Since 1852",
      headingHy: null,
      body: "By the grace of God, Emmanuel Armenian Evangelical Church continues its mission — proclaiming the Gospel, nurturing Christian faith, strengthening fellowship, and serving its community, under the Union of the Armenian Evangelical Churches in the Near East.",
      bodyHy: null,
    },

    // Facebook is real (corrected from the source doc's typo'd
    // "facebo-ok"); phone/email/street address all pending per the
    // mockup's own placeholder language.
    contactOverride: {
      phonePending: true,
      emailPending: true,
      address: "Azizieh District, Aleppo, Syria",
      secretary: "Mrs. Tamar Kazanjian-Keoshgerian",
      facebook: {
        label: "emmanuel.church.official",
        url: "https://www.facebook.com/emmanuel.church.official/",
      },
      note: "Phone, email and street address pending verification.",
    },
  },

  // Syria — Aleppo, church 3 of 9. Built verbatim from
  // design-reference/uaecne-church-martyrs-aleppo.html. ENGLISH-ONLY per
  // Yeghia's instruction — the mockup's Armenian masthead subtitle line is
  // dropped entirely (no other Armenian content exists here; no succession
  // module either). Pastor Simon Der Sahagian's role reads "Pastor," never
  // "Rev." — the Armenian source itself says Պատ. (Pastor), and churches.ts
  // already agrees. Only 2 leadership cards (Pastor + Secretary) — the
  // source doc names no Vice-Chair, so none is fabricated. Both leaders
  // have real photos (no photo-pending here). Gallery is a plain 2-up grid
  // via the existing `ChurchGallery` (not the scroll+arrows
  // `ChurchGalleryLightbox`) per Yeghia's explicit instruction — note the
  // mockup's own script does implement click-to-zoom on its 2 photos, just
  // without scroll arrows (only 2 images); flagged, not silently resolved,
  // in OPEN_QUESTIONS.
  "armenian-evangelical-martyrs-church-aleppo": {
    slug: "armenian-evangelical-martyrs-church-aleppo",

    masthead: {
      locationLine: "Suleimaniyeh District, Aleppo, Syria",
      locationLineHy: null,
      established: "1931",
      establishedHy: null,
      establishedLabel: "Founded",
      secondDate: { label: "Present church", value: "1965" },
    },

    // No distinct logo/seal file exists — the mockup's own masthead circle
    // is a generic cross icon, not a real institutional emblem. Rendered
    // without a masthead logo, same treatment as Bethel/Emmanuel.
    logo: null,
    heroPhoto: {
      src: "/church-martyrs-aleppo-hero.jpg",
      alt: "Martyrs' Armenian Evangelical Church of Aleppo",
    },
    factsBar: [
      { label: "1931", labelHy: null, sub: "Founded", subHy: null },
      { label: "Suleimaniyeh, Aleppo", labelHy: null, sub: "Location", subHy: null },
      { label: "Sunday · pending", labelHy: null, sub: "Worship Service", subHy: null },
    ],

    about: {
      eyebrow: "The Church",
      eyebrowHy: null,
      heading: "About Martyrs' Church",
      headingHy: null,
      paragraphs: [
        "The roots of the Armenian Evangelical Martyrs Church reach back to 1865 and the Hayig district of Aintab. After the displacement of Aintab's Armenians in 1921, its people relocated to Aleppo — and in 1931, thirty-three families founded a congregation of their own, received that same year into the Union of the Armenian Evangelical Churches in the Near East (UAECNE).",
        "Throughout its history, the church has played an important role in the spiritual, moral, and cultural formation of generations. Through worship, Christian education, and its various ministries, it nurtures Christian faith and character, encourages a life of service, and preserves Armenian identity and heritage. Since 2011, its pastoral ministry has been entrusted to Pastor Simon Der Sahagian.",
      ],
      paragraphsHy: null,
      dropcap: false,
      pullQuote: "Named for the martyrs, the church has borne faithful witness in Aleppo for nearly a century.",
      pullQuoteHy: null,
    },

    pastorCard: {
      name: "Pastor Simon Der Sahagian",
      nameHy: null,
      role: "Pastor",
      roleHy: null,
      photo: {
        src: "/church-martyrs-aleppo-pastor.jpg",
        alt: "Pastor Simon Der Sahagian",
      },
    },

    leadership: [
      {
        name: "Pastor Simon Der Sahagian",
        nameHy: null,
        role: "Pastor",
        roleHy: null,
        photo: { src: "/church-martyrs-aleppo-pastor.jpg", alt: "Pastor Simon Der Sahagian" },
      },
      {
        name: "Mrs. Sarin Seraydarian-Aghayegian",
        nameHy: null,
        role: "Secretary",
        roleHy: null,
        photo: { src: "/church-martyrs-aleppo-secretary.jpg", alt: "Mrs. Sarin Seraydarian-Aghayegian" },
      },
    ],
    leadershipEyebrow: "The Team",

    history: {
      eyebrow: "Our History",
      eyebrowHy: null,
      heading: "From Aintab to Aleppo",
      headingHy: null,
      dropcapFirstParagraph: true,
      sections: [
        {
          heading: null,
          headingHy: null,
          paragraphs: [
            "The roots of the Armenian Evangelical Martyrs Church date back to 1865, when an Armenian Evangelical church was established in the Hayig district of Aintab, in present-day Turkey. In 1921, following the displacement of Aintab's Armenian population, members of the Hayig district church relocated to Aleppo, where they joined the Emmanuel Armenian Evangelical Church and worshipped until 1930.",
            "In 1931, thirty-three families expressed their desire to establish a congregation of their own and founded the Armenian Evangelical Martyrs Church of Aleppo. That same year, the church was officially received as a member of the UAECNE. During its early years, the congregation held worship in a courtyard building in the Christian district of Salibeh, moving in 1936 to the Armenian Red Cross building in the Suleimaniyeh district.",
            "In 1960, the church families resolved to establish a permanent place of worship and purchased a plot of land on Telephone Hawái Avenue in Suleimaniyeh. After several years of dedicated effort, the newly constructed church building was officially inaugurated on March 14, 1965.",
            "Among the devoted members who contributed significantly to the life and ministry of the church was Dr. Haroutune Nazarian (1907–2002), whose faithful service remains an important part of the congregation's history. Despite the emigration of many families during the 1980s, the Martyrs Church remained committed to its mission and continued its Christian witness and service within the Armenian community of Aleppo.",
          ],
          paragraphsHy: null,
          image: null,
        },
      ],
    },

    programs: {
      eyebrow: null,
      eyebrowHy: null,
      heading: "Ministries & Activities",
      headingHy: null,
      items: [
        "Sunday Worship & Sunday School",
        "Youth Ministry",
        "Summer Bible School (DVBS)",
        "Women's Ministry",
      ],
      itemsHy: null,
    },

    milestone: {
      year: "1965",
      yearHy: null,
      heading: "A Church of Their Own",
      headingHy: null,
      body: "On March 14, 1965, after years of dedicated effort, the newly constructed Martyrs' Church building on Telephone Hawái Avenue in Suleimaniyeh was officially inaugurated — the home where the congregation continues to worship today.",
      bodyHy: null,
    },

    specialProject: null,
    succession: null,
    anniversary: null,

    gallery: {
      eyebrow: "The Church",
      eyebrowHy: null,
      heading: "Gallery",
      headingHy: null,
      photos: [
        {
          src: "/church-martyrs-aleppo-gallery-interior.jpg",
          alt: "Martyrs' Church sanctuary interior",
          caption: null,
          captionHy: null,
        },
        {
          src: "/church-martyrs-aleppo-gallery-building.jpg",
          alt: "Martyrs' Church building, Suleimaniyeh",
          caption: null,
          captionHy: null,
        },
      ],
    },

    cta: {
      heading: "A Faithful Witness in Aleppo",
      headingHy: null,
      body: "Named in memory of the martyrs, the Armenian Evangelical Martyrs Church continues its ministry of worship, education, and service within the Armenian community of Aleppo, under the Union of the Armenian Evangelical Churches in the Near East.",
      bodyHy: null,
    },

    // Facebook is real; phone/email/street address all pending per the
    // mockup's own placeholder language. Secretary honorific: the English
    // source doc says "Mrs." (matching Տիկ.); an Armenian office-list gloss
    // elsewhere said "Miss" — using "Mrs." per the doc, flagged pending in
    // OPEN_QUESTIONS.
    contactOverride: {
      phonePending: true,
      emailPending: true,
      address: "Suleimaniyeh District, Aleppo, Syria",
      secretary: "Mrs. Sarin Seraydarian-Aghayegian",
      facebook: {
        label: "nahadagats.Church",
        url: "https://www.facebook.com/nahadagats.Church",
      },
      note: "Phone, email and street address pending verification.",
    },
  },

  // Syria — Aleppo, church 4 of 9 (closes Aleppo). Built verbatim from
  // design-reference/uaecne-church-syriac-aleppo.html. This whole page was
  // translated from an Armenian-only source — every name (Pastor Jirjis
  // Shemes, Father Youhanna Toro, Pastor Youssef Osta Jabbour, Miss Mary
  // Hakko) is an English-spelling placeholder pending Union confirmation,
  // flagged in OPEN_QUESTIONS. Pulpit is vacant — no pastorCard, and the
  // single leadership card is Miss Mary Hakko, Vice-Chairwoman. No
  // programs module (none in the source) and no milestone band (this
  // mockup has neither). Uses `ChurchGalleryLightbox` — 2 real photos +
  // 2 church-approved AI-render photos (kept, labeled, provenance logged).
  "syriac-evangelical-church-aleppo": {
    slug: "syriac-evangelical-church-aleppo",

    masthead: {
      locationLine: "Aleppo, Syria",
      locationLineHy: null,
      established: "1885",
      establishedHy: null,
      establishedLabel: "Founded",
      establishedSuffix: " (Urfa) · re-established in Aleppo",
    },

    // No distinct logo/seal file exists — mockup's own masthead circle is
    // a generic cross icon, not a real institutional emblem.
    logo: null,
    heroPhoto: {
      src: "/church-syriac-aleppo-hero.jpg",
      alt: "Syriac Evangelical Church of Aleppo",
    },
    factsBar: [
      { label: "1885", labelHy: null, sub: "Founded (Urfa)", subHy: null },
      { label: "Aleppo", labelHy: null, sub: "Location, Syria", subHy: null },
      { label: "Sunday · pending", labelHy: null, sub: "Worship Service", subHy: null },
    ],

    about: {
      eyebrow: "The Church",
      eyebrowHy: null,
      heading: "About the Syriac Evangelical Church",
      headingHy: null,
      paragraphs: [
        "Founded in 1885 in Urfa — by the grace of Jesus Christ and with the help of Armenian Evangelicals — the Syriac Evangelical Church was later re-established in Aleppo after its people were forced to flee the massacres against Christians. For well over a century it has borne faithful Christian witness within the community of Aleppo.",
        "Across its history the church has been served by devoted pastors, and its life continues through worship and fellowship.",
      ],
      paragraphsHy: null,
      dropcap: false,
      vacancyNote: "The church's pulpit is currently vacant.",
      pullQuote: "A church re-founded in exile, keeping faith alive across generations in Aleppo.",
      pullQuoteHy: null,
    },

    // Pulpit vacant — no pastor.
    pastorCard: null,

    leadership: [
      {
        name: "Miss Mary Hakko",
        nameHy: null,
        role: "Vice-Chairwoman",
        roleHy: null,
        photo: { src: "/church-syriac-aleppo-vicechair-hakko.jpg", alt: "Vice-Chairwoman" },
      },
    ],
    leadershipEyebrow: "The Team",
    leadershipNote:
      "English spelling pending your confirmation. The church's pulpit is currently vacant.",

    history: {
      eyebrow: "Our History",
      eyebrowHy: null,
      heading: "From Urfa to Aleppo",
      headingHy: null,
      dropcapFirstParagraph: true,
      sections: [
        {
          heading: null,
          headingHy: null,
          paragraphs: [
            "The Syriac Evangelical Church was founded in 1885 in Urfa, by the grace of Jesus Christ and with the help of Armenian Evangelicals. Its first pastor was Pastor Jirjis Shemes, through whose efforts a primary school was also built.",
            "The massacres committed against Christians forced the people to flee; reaching Aleppo, they re-established their church there.",
            "The first pastor of the church in Aleppo was Father Youhanna Toro, who served until 1974. In 1975 he was succeeded by Pastor Youssef Osta Jabbour, whose service continued until 2017. The church's pulpit is currently vacant.",
          ],
          paragraphsHy: null,
          image: null,
        },
      ],
    },

    programs: null,
    milestone: null,
    specialProject: null,
    anniversary: null,

    // Historic pastors archive — 3 named, not a full succession table.
    succession: {
      eyebrow: "Archive",
      eyebrowHy: null,
      heading: "Pastors of the Church",
      headingHy: null,
      note: "Those who have served the Syriac Evangelical Church. English name spellings pending confirmation.",
      noteHy: null,
      entries: [
        { name: "Pastor Jirjis Shemes", nameHy: null, years: "First pastor · Urfa", note: null, noteHy: null, isCurrent: false },
        { name: "Father Youhanna Toro", nameHy: null, years: "Served until 1974", note: null, noteHy: null, isCurrent: false },
        { name: "Pastor Youssef Osta Jabbour", nameHy: null, years: "1975 – 2017", note: null, noteHy: null, isCurrent: false },
      ],
    },

    gallery: {
      eyebrow: "The Church",
      eyebrowHy: null,
      heading: "Gallery",
      headingHy: null,
      photos: [
        {
          src: "/church-syriac-aleppo-gallery-building.jpg",
          alt: "Syriac Evangelical Church building",
          caption: null,
          captionHy: null,
        },
        {
          src: "/church-syriac-aleppo-gallery-womens.jpg",
          alt: "Women's meeting",
          caption: null,
          captionHy: null,
        },
        {
          src: "/church-syriac-aleppo-gallery-worship-ai.jpg",
          alt: "Congregation at worship",
          caption: null,
          captionHy: null,
          aiLabel: "Church-approved render",
        },
        {
          src: "/church-syriac-aleppo-gallery-children-ai.jpg",
          alt: "Children's gathering",
          caption: null,
          captionHy: null,
          aiLabel: "Church-approved render",
        },
      ],
    },

    cta: {
      heading: "Faith Kept Alive in Aleppo",
      headingHy: null,
      body: "Re-founded in exile and sustained across generations, the Syriac Evangelical Church continues its Christian witness within the community of Aleppo.",
      bodyHy: null,
    },

    // Facebook is real; phone/email/district/street all pending per the
    // mockup's own placeholder language — even though churches.ts has
    // values for phone/email, the mockup explicitly marks both pending
    // (same precedent as Bethel, rule 1). churches.ts's address
    // ("Assyrian Quarter, Aleppo, Syria") is more specific than the
    // mockup's plain "Aleppo, Syria" — kept matching the approved mockup
    // rather than silently substituting the directory's district name;
    // flagged in OPEN_QUESTIONS in case that's the missing district. The
    // contact row is relabeled "Vice-Chair" (not "Secretary") since Mary
    // Hakko holds that office, not the secretary role.
    contactOverride: {
      phonePending: true,
      emailPending: true,
      // Matches the approved mockup's own plain "Aleppo, Syria" — kept
      // consistent with the note below (which still says district/street
      // are pending) rather than showing churches.ts's more specific
      // "Assyrian Quarter, Aleppo, Syria" and contradicting that note.
      address: "Aleppo, Syria",
      secretary: "Miss Mary Hakko",
      secretaryLabel: "Vice-Chair",
      facebook: {
        label: "Syriac Evangelical Church",
        url: "https://www.facebook.com/share/1AQaGyyQnQ/",
      },
      note: "Phone, email, district and street pending verification.",
    },
  },

  // Syria — Damascus, church 5 of 9. Built verbatim from
  // design-reference/uaecne-church-damascus.html. Thin/sensitive page per
  // Yeghia's instruction: no pastor card, no leadership grid, no programs
  // module — the mockup has none of the three, and none is fabricated here.
  // English-only (the mockup itself is English-only; no Armenian content
  // exists to drop). The mockup's 3 embedded images are resized/recompressed
  // copies, not byte-identical to the source folder's full-res originals
  // (MD5s don't match) — each was matched to its real source file by visual
  // inspection instead: hero → "49209857_...n.jpg" (single pastor at
  // pulpit, numbered hymn board), gallery "Interior" → "20260128_131356.jpg"
  // (elevated two-pastor view, stained-glass cross windows), gallery
  // "Church gathering" → "49599555_...n.jpg" (congregation group photo,
  // exact match). Real full-res files copied into public/, never the
  // mockup's own lower-res embeds.
  "damascus-armenian-evangelical-church": {
    slug: "damascus-armenian-evangelical-church",

    masthead: {
      locationLine: "Damascus, Syria",
      locationLineHy: null,
      established: "1921",
      establishedHy: null,
      establishedLabel: "Founded",
    },

    // No distinct logo/seal file exists — mockup's own masthead circle is
    // a generic cross icon, not a real institutional emblem.
    logo: null,
    heroPhoto: {
      src: "/church-damascus-hero.jpg",
      alt: "Worship at the Damascus Armenian Evangelical Church",
    },
    factsBar: [
      { label: "1921", labelHy: null, sub: "Founded", subHy: null },
      { label: "Damascus, Syria", labelHy: null, sub: "Location", subHy: null },
      { label: "Sunday · pending", labelHy: null, sub: "Worship Service", subHy: null },
    ],

    about: {
      eyebrow: "The Church",
      eyebrowHy: null,
      heading: "About the Church",
      headingHy: null,
      paragraphs: [
        "The city of Damascus has long been a museum of historical events — and its Evangelical community, too, has known its own trials, its own faithful figures, and its own honors. Founded in the years of Armenian migration, the Damascus Armenian Evangelical Church has borne witness through a century of upheaval, endurance, and hope.",
        "Through war and emigration the congregation grew small, and for a time the church’s doors were closed; yet today it gathers again as a community of about fifteen Evangelical families, holding fast to its calling.",
      ],
      paragraphsHy: null,
      dropcap: false,
      pullQuote: "A small congregation keeping faith alive in the heart of Damascus.",
      pullQuoteHy: null,
    },

    // No pastor named anywhere in the mockup — none of the three modules
    // (pastor card, leadership grid, programs) is fabricated.
    pastorCard: null,
    leadership: null,
    programs: null,

    history: {
      eyebrow: "Our History",
      eyebrowHy: null,
      heading: "A Century in Damascus",
      headingHy: null,
      dropcapFirstParagraph: true,
      sections: [
        {
          heading: null,
          headingHy: null,
          paragraphs: [
            "The city of Damascus has been a museum of historical events, and so its Evangelical community, too, has had its own events, figures, and honors. In those years of migration it was not easy to keep records; but according to the information gathered, on August 26, 1922, Rev. Garabed Hasessian took up the pulpit of the Damascus Armenian Evangelical Church and served until November 1, 1923, after which Rev. Nerses Sarian took the pulpit.",
            "On Sundays, worship was held in the Arab Evangelical Church; there were also Sunday school, women’s worship services, and Bible studies. In the summer of 1925, more than half of the community emigrated to Beirut and America.",
            "Between 1930 and 2010, the church had thirteen resident pastors, along with periodic workers. In 2011 the war against Syria began, and much of the Armenian population emigrated to other countries; many families of the Damascus church left as well, and because of the country’s insecurity the church remained closed until 2020. Today the church has about fifteen Evangelical families.",
          ],
          paragraphsHy: null,
          image: null,
        },
      ],
    },

    milestone: null,
    specialProject: null,
    anniversary: null,

    // Early-pastors archive — 2 named entries plus an unnamed footer count,
    // both verbatim from the mockup. English name spellings pending
    // confirmation per the mockup's own note.
    succession: {
      eyebrow: "Archive",
      eyebrowHy: null,
      heading: "Early Pastors",
      headingHy: null,
      note: "The earliest recorded pastors of the Damascus Armenian Evangelical Church. English name spellings pending confirmation.",
      noteHy: null,
      entries: [
        {
          name: "Rev. Garabed Hasessian",
          nameHy: null,
          years: "Aug 1922 – Nov 1923",
          note: null,
          noteHy: null,
          isCurrent: false,
        },
        {
          name: "Rev. Nerses Sarian",
          nameHy: null,
          years: "from Nov 1923",
          note: null,
          noteHy: null,
          isCurrent: false,
        },
      ],
      footNote:
        "Between 1930 and 2010, the church was served by thirteen resident pastors.",
      footNoteHy: null,
    },

    vision: {
      eyebrow: "Our Vision",
      eyebrowHy: null,
      body: "To restore the Armenian Evangelical Church to its vitality, so that the Lord Jesus Christ may be proclaimed and the number of the saved may increase.",
      bodyHy: null,
    },

    gallery: {
      eyebrow: "The Church",
      eyebrowHy: null,
      heading: "Gallery",
      headingHy: null,
      photos: [
        {
          src: "/church-damascus-gallery-interior.jpg",
          alt: "Interior of the Damascus Armenian Evangelical Church",
          caption: null,
          captionHy: null,
        },
        {
          src: "/church-damascus-gallery-gathering.jpg",
          alt: "Church gathering",
          caption: null,
          captionHy: null,
        },
      ],
    },

    cta: {
      heading: "Join Us in Worship",
      headingHy: null,
      body: "All are welcome at the Damascus Armenian Evangelical Church — a small congregation keeping faith alive in the heart of Damascus.",
      bodyHy: null,
    },

    // Phone/email/district/street all pending per the mockup's own
    // placeholder language — nothing in churches.ts to conflict with, since
    // this is a new directory row with those same fields left blank.
    contactOverride: {
      phonePending: true,
      emailPending: true,
      note: "District, street address, phone, and email pending verification.",
    },
  },

  // Syria (Kessab) — Karaduran, church 6 of 9. Built verbatim from
  // design-reference/uaecne-church-karaduran-kessab.html. Keyed to
  // churches.ts's EXISTING `armenian-evangelical-church-of-kaladouran` row
  // (B-SY-09) — this is the same village the mockup calls "Karaduran," not
  // a new church; the directory's own spelling ("Kaladouran") is what
  // ChurchTopBlock's <h1> renders (from `church.name`, never this file),
  // same precedent as Bethel's directory/mockup name mismatch. Flagging the
  // spelling discrepancy rather than silently editing either source.
  // INACTIVE CHURCH: no resident pastor, worship moved to Holy Trinity in
  // 2014 — no `pastorCard`, no `leadership`, no `programs`, regardless of
  // churches.ts's own `pastor` field (which lists the shared visiting
  // pastor for all 4 Kessab churches; that field is only ever read by the
  // route's directory-only fallback branch, never by this full-content
  // render path, so it cannot leak a pastor onto this page). English doc,
  // no translation/pending-name issue. 2 real photos copied to
  // `public/church-karaduran-kessab-*`, matched to the mockup's own
  // embedded (recompressed) images by visual inspection, not MD5 (same
  // lesson as Damascus) — both are exact-content matches (same building
  // exterior, same sanctuary interior), no fabricated hero. New additive
  // `worshipToday` field + `WorshipTodayNotice` component built for the
  // mockup's bordered "Worship Today" callout — no existing primitive fits
  // a heading+paragraph notice card. Gallery: plain `ChurchGallery` (not
  // `ChurchGalleryLightbox`) — same call Yeghia made for Martyrs' Aleppo
  // despite that mockup's own click-to-zoom (item 77), and here
  // `ChurchGalleryLightbox` would additionally drop the mockup's real
  // photo caption entirely (it has no caption rendering) and show an
  // always-on "← Scroll for more →" hint that doesn't apply to a single
  // photo — `ChurchGallery` preserves the real caption text faithfully.
  "armenian-evangelical-church-of-kaladouran": {
    slug: "armenian-evangelical-church-of-kaladouran",

    masthead: {
      locationLine: "Karaduran, Kessab, Syria",
      locationLineHy: null,
      established: "1873",
      establishedHy: null,
      establishedLabel: "Founded",
      secondDate: { label: "Evangelical witness since", value: "1860" },
    },

    // No distinct logo/seal file exists — mockup's own masthead circle is
    // a generic cross icon, not a real institutional emblem.
    logo: null,
    heroPhoto: {
      src: "/church-karaduran-kessab-hero.jpg",
      alt: "Armenian Evangelical Church of Karaduran, Kessab",
    },
    factsBar: [
      { label: "1873", labelHy: null, sub: "Founded", subHy: null },
      { label: "Karaduran, Kessab", labelHy: null, sub: "Location", subHy: null },
      {
        label: "Holy Trinity, Kessab",
        labelHy: null,
        sub: "Worship Now Held At",
        subHy: null,
      },
    ],

    about: {
      eyebrow: "The Church",
      eyebrowHy: null,
      heading: "About the Church",
      headingHy: null,
      paragraphs: [
        "The Armenian Evangelical Church of Karaduran, Kessab, stands as a testimony to more than a century and a half of Armenian Evangelical presence, Christian witness, education, and service in the region. Its witness began as early as 1860, when Evangelical preachers from Kessab were sent to Karaduran to proclaim the Word of God — and in 1873 the church, together with a three-room school, was formally established.",
        "In its early years the community numbered about fifty-five families. Over time that number gradually declined, and the congregation was never able to sustain a permanent resident pastor; instead, various visiting pastors and preachers faithfully served it through the years.",
      ],
      paragraphsHy: null,
      dropcap: false,
      pullQuote:
        "A century and a half of faith, witness, and learning on the hills of Kessab.",
      pullQuoteHy: null,
    },

    // Inactive church — no resident pastor, no leadership, no programs.
    pastorCard: null,
    leadership: null,
    programs: null,

    worshipToday: {
      heading: "Worship Today",
      headingHy: null,
      body: "Since 2014, regular worship services are no longer held at the Church of Karaduran. The few remaining Armenian Evangelical families now worship with the Armenian Evangelical Holy Trinity Church in Kessab, where they continue to share in the spiritual life and fellowship of the church.",
      bodyHy: null,
      boldPhrase: "Armenian Evangelical Holy Trinity Church in Kessab",
    },

    history: {
      eyebrow: "Our History",
      eyebrowHy: null,
      heading: "A Witness Since 1860",
      headingHy: null,
      dropcapFirstParagraph: true,
      sections: [
        {
          heading: null,
          headingHy: null,
          paragraphs: [
            "The Armenian Evangelical witness in Karaduran began even before it had a church of its own. As early as 1860, Armenian Evangelical preachers from Kessab were sent to Karaduran to proclaim the Word of God and minister to the local population. These early missionary efforts laid the foundation for the formal establishment of the church thirteen years later.",
            "Following the establishment of the Armenian Evangelical Church in Kessab, the Armenian Evangelical Church of Karaduran — together with a school of three rooms — was established in 1873, serving the educational needs of the local community and reflecting the church's early commitment to both Christian ministry and education.",
            "In its early years the community comprised approximately 55 families. Over time, however, their number gradually declined, making it increasingly difficult to sustain an independent church ministry. As a result, the church did not have a permanent resident pastor; throughout its history, various visiting pastors and preachers served the congregation, providing preaching, pastoral care, and spiritual guidance.",
            "Since 2014, regular worship services have no longer been held at Karaduran, and the remaining families have joined the worship of the Armenian Evangelical Holy Trinity Church in Kessab — yet the church endures as a lasting testimony to generations of Armenian Evangelical faith and service in the region.",
          ],
          paragraphsHy: null,
          image: null,
        },
      ],
    },

    milestone: null,
    specialProject: null,
    anniversary: null,
    succession: null,

    gallery: {
      eyebrow: "The Church",
      eyebrowHy: null,
      heading: "Inside the Church",
      headingHy: null,
      photos: [
        {
          src: "/church-karaduran-kessab-interior.jpg",
          alt: "Interior of the Church of Karaduran",
          caption: "The sanctuary of the Armenian Evangelical Church of Karaduran, Kessab.",
          captionHy: null,
        },
      ],
    },

    cta: {
      heading: "A Lasting Testimony in Kessab",
      headingHy: null,
      body: "More than a century and a half of Armenian Evangelical presence, Christian witness, education, and service — the Church of Karaduran remains part of the enduring story of the Union of the Armenian Evangelical Churches in the Near East.",
      bodyHy: null,
    },

    // Facebook is real (a public group link, not a page); email suppressed
    // entirely — the mockup's own Get in Touch card has no email row at
    // all, and churches.ts's email is the shared visiting pastor's address,
    // not specific to this inactive church. Phone/street pending per the
    // mockup's own note; churches.ts's existing address (a village-level
    // descriptor, not a precise street address) is kept as-is, consistent
    // with Emmanuel Aleppo's precedent of showing a real regional address
    // alongside a still-pending-street note.
    contactOverride: {
      email: null,
      phonePending: true,
      facebook: {
        label: "Facebook group",
        url: "https://www.facebook.com/groups/255047687880778/",
      },
      note: "Phone and street pending verification.",
    },
  },
};
