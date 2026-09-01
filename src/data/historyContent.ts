// Content for the UAECNE History page (Resource Center > History of the
// UAECNE), verbatim from design-reference/uaecne-history.html — the
// project's identity "crown jewel" page. Armenian fields intentionally
// omitted (none verified yet, per PROJECT_BRIEF.md rule 2).

export type TieLink = {
  label: string;
  href: string;
};

export type Pillar = {
  kick: string;
  title: string;
  paragraphs: string[];
  icon: string; // IconSymbols id for the photo-pending arched slot
  ties: TieLink[];
};

export type MemberOrg = {
  ab: string;
  name: string;
  blurb: string;
};

export const historyContent = {
  crumb: "Resource Center › History of the UAECNE",
  seal: {
    src: "/history-seal.svg",
    alt: "UAECNE seal",
  },
  kicker: "The Union of the Armenian Evangelical Churches in the Near East",
  title: "A Heritage of Faith, Service & Witness",
  estabLine: "Rooted in the 19th-century evangelical renewal",

  opening: {
    eyebrow: "Who We Are",
    lead: "The Union of the Armenian Evangelical Churches in the Near East is a vibrant Christian fellowship that forms an integral part of the Protestant witness in the Middle East.",
    paragraphs: [
      "Tracing its roots to the evangelical renewal movement that emerged among Armenians in the early nineteenth century, the UAECNE — as a constituent body of the worldwide Armenian Evangelical Church — seeks to bear faithful witness to the Gospel of Jesus Christ through worship, education, discipleship, service, and community engagement.",
      "Through its network of congregations, the Union nurtures the spiritual life of individuals and families through regular worship services, Bible study, pastoral care, and a wide range of ministries. Most churches maintain active Sunday Schools for children, Christian Endeavor programs for youth and young adults, women’s fellowships, and various publications that support spiritual growth. At the heart of all these ministries is the commitment to proclaim the saving message of Jesus Christ to all people, while maintaining a special ministry among Armenian communities.",
    ],
  },

  geography: {
    eyebrow: "One Fellowship, Nine Lands",
    heading: "Across the Near East & Beyond",
    intro:
      "The UAECNE serves Armenian Evangelical communities spread across a broad geographical region — bound by one faith across borders and generations.",
    map: {
      src: "/history-map-nine-lands.png",
      alt: "Map of the nine countries served by the UAECNE",
    },
    countries: [
      "Lebanon",
      "Syria",
      "Turkey",
      "Egypt",
      "Iran",
      "Greece",
      "Cyprus",
      "Australia",
    ],
  },

  pillarsHead: {
    eyebrow: "The Work of the Union",
    heading: "Ministries That Span Generations",
  },

  pillars: [
    {
      kick: "Education",
      title: "A Defining Strength",
      icon: "ic-history-edu",
      paragraphs: [
        "Education has long been one of the defining strengths of the Armenian Evangelical tradition. Across the Near East — particularly in Lebanon and Syria — the churches have established and sustained a network of schools from kindergarten through secondary levels, seeking academic excellence alongside the holistic formation of students as responsible citizens and individuals of faith.",
        "In Beirut, the UAECNE owns Haigazian University, the only Armenian university in the Diaspora, and shares in the ownership and mission of the Near East School of Theology — one of the region’s leading institutions for theological education.",
      ],
      ties: [
        { label: "Explore our Schools", href: "/schools" },
        { label: "Higher Education", href: "/higher-education" },
      ],
    },
    {
      kick: "Compassion",
      title: "Service With Dignity",
      icon: "ic-heart",
      paragraphs: [
        "The Union’s commitment to Christian service extends beyond church and classroom. In Beirut, it operates the Christian Association for the Armenian Home (CAHL) — an elderly care home, a residence for the visually impaired, and educational services for children with learning challenges — serving all with dignity, regardless of denomination.",
        "In a spirit of ecumenical cooperation, the Azounieh Sanatorium stands as a longstanding partnership with the Armenian Catholicosate of Cilicia; and in Aleppo, the community works alongside Armenian Catholic and Apostolic partners at the Old Peoples’ Home and the Arevig Center for children with disabilities.",
      ],
      ties: [],
    },
    {
      kick: "Social Outreach",
      title: "Compassion in Times of Trial",
      icon: "ic-history-outreach",
      paragraphs: [
        "Through its Social Action Center in Beirut, the UAECNE provides medical support, humanitarian aid, counseling, emergency relief, spiritual care, and community development to a large number of vulnerable individuals and families. Similar ministries are carried out in Aleppo and wherever needs arise.",
        "Through war, displacement, economic hardship, and regional instability, these ministries stand as tangible expressions of Christian compassion and solidarity.",
      ],
      ties: [{ label: "Explore Outreach", href: "/outreach" }],
    },
    {
      kick: "Children & Youth",
      title: "Nurturing Generations",
      icon: "ic-history-youth",
      paragraphs: [
        "The UAECNE is particularly recognized for its commitment to children and youth. Through camps, conferences, leadership training, retreats, and year-round activities, generations of young people have been nurtured in faith, character, and service.",
        "The Union operates two KCHAG camp centers — one in Beirut, Lebanon, and another in Kessab, Syria — cherished spaces for spiritual formation, fellowship, and recreation for thousands of young people over the years.",
      ],
      ties: [{ label: "Explore Camps & Youth Work", href: "/outreach/camps" }],
    },
  ] satisfies Pillar[],

  quote: {
    text: "To glorify God by nurturing communities of faith, promoting human dignity, and serving society with hope, compassion, and excellence.",
    source: "The Mission of the Union",
  },

  partnersHead: {
    eyebrow: "Partnership & Communion",
    heading: "Bound to the Wider Church",
    intro:
      "The Union’s ministry is strengthened by enduring partnerships and active participation in the worldwide Christian and ecumenical movement.",
  },

  partners: [
    {
      ab: "AMAA",
      name: "Armenian Missionary Association of America",
      blurb:
        "Established 1918 — a missionary arm of the global Armenian Evangelical movement and a longstanding partner in education, church ministry, and humanitarian work.",
    },
    {
      ab: "AEWC",
      name: "Armenian Evangelical World Council",
      blurb:
        "Bringing together the regional Armenian Evangelical Unions worldwide, together with the AMAA and the Philibosian Foundation.",
    },
    {
      ab: "WCC",
      name: "World Council of Churches",
      blurb:
        "A founding member — contributing to Christian witness and theological dialogue worldwide.",
    },
    {
      ab: "WCRC",
      name: "World Communion of Reformed Churches",
      blurb: "A founding member of the global Reformed communion.",
    },
    {
      ab: "MECC",
      name: "Middle East Council of Churches",
      blurb:
        "A founding member — joining in regional peacebuilding and cooperative ministry.",
    },
    {
      ab: "FMEEC",
      name: "Fellowship of Middle East Evangelical Churches",
      blurb: "A founding member of the regional evangelical fellowship.",
    },
  ] satisfies MemberOrg[],

  governance: {
    eyebrow: "How the Union Is Led",
    heading: "Governance & Leadership",
    intro:
      "The highest governing authority of the UAECNE is its Annual General Assembly, bringing together representatives of its member churches to provide spiritual leadership and strategic direction.",
    cards: [
      {
        n: "1",
        t: "President",
        p: "Elected by the General Assembly to give spiritual leadership to the Union and its ministries.",
      },
      {
        n: "12",
        t: "Central Committee",
        p: "A twelve-member committee entrusted with strategic direction and oversight of the Union’s ministries and institutions.",
      },
    ],
  },

  closing: {
    text: "Grounded in the Gospel and inspired by a rich heritage, the Union of the Armenian Evangelical Churches in the Near East continues to serve as a dynamic expression of faith, education, service, and Christian witness.",
    place: "Headquartered in Beirut, Lebanon",
  },
};
