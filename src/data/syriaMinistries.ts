/**
 * Ministries of the Armenian Protestant Community in Syria — one shared
 * page shape for the Bethel Polyclinic, the Social Action Committee and
 * the Community Headquarters (route: /ministries/syria/[slug]).
 *
 * Sources (all supplied by the Community, 2026): the English docs in the
 * APCS Drive folder ("Bethel Poly Clinic.docx", "SOCIAL WORK.docx",
 * "THE HEADQUARTERS OF THE ARMENIAN PROTESTANT COMMUNITY IN SYRIA.docx")
 * and the Sep/Oct 2026 web forms. Text is taken from those documents;
 * only spacing and obvious typing slips are normalised. Names are spelled
 * as each source gives them — the Union is confirming a few spellings
 * (see the audit report).
 */

import type { SchoolContactRow, SchoolLeaderEntry } from "@/data/schoolContent";
import type { StatCard } from "@/data/outreachContent";

type Photo = { src: string; alt: string };

export type SyriaMinistryPage = {
  slug: string;
  crumbSection: string;
  title: string;
  subtitlePlain: string;
  subtitleBold: string;
  heroPhoto: Photo | null;
  heroIcon: string;
  intro: { label: string; paragraphs: string[] };
  verse?: { eyebrow: string; body: string } | null;
  sections: { label: string; paragraphs: string[] }[];
  stats?: { eyebrow: string | null; heading: string | null; cards: StatCard[] } | null;
  lists: { eyebrow: string; heading: string; items: string[] }[];
  people: SchoolLeaderEntry[] | null;
  contact: {
    addressLines: string[];
    rows: SchoolContactRow[];
    mapsUrl: string | null;
  };
  gallery: Photo[];
  cta: { heading: string; body: string };
};

const row = (key: string, value: string, href: string | null = null): SchoolContactRow => ({
  key,
  keyHy: null,
  value,
  valueHy: null,
  href,
});

const person = (name: string, role: string, photo: string | null): SchoolLeaderEntry => ({
  name,
  nameHy: null,
  role,
  roleHy: null,
  photo: photo ? { src: photo, alt: name } : null,
});

export const syriaMinistries: SyriaMinistryPage[] = [
  {
    slug: "bethel-polyclinic",
    crumbSection: "Health Care › Syria",
    title: "Bethel Polyclinic",
    subtitlePlain: "Armenian Evangelical Bethel Church, Aleppo · ",
    subtitleBold: "Founded 2013",
    heroPhoto: { src: "/syria-polyclinic-hero.jpg", alt: "Bethel Polyclinic, Aleppo" },
    heroIcon: "ic-heart",
    intro: {
      label: "About the Polyclinic",
      paragraphs: [
        "During the difficult years of crisis in Syria, as violence and instability continued, families faced increasingly severe circumstances marked by fear, uncertainty, illness, and anxiety about the future. These conditions placed tremendous strain on family life. People therefore needed not only material assistance, but also spiritual support, moral encouragement, guidance, and comfort.",
        "Motivated by these needs, the Armenian Evangelical Bethel Church envisioned expanding the scope of its ministry and, in 2013, established the Bethel Polyclinic as a place where patients could receive medical consultations, treatment, and compassionate care.",
      ],
    },
    verse: null,
    sections: [
      {
        label: "Growing to Serve",
        paragraphs: [
          "Initially offering services in more than six medical specialties, the Bethel Polyclinic operated within the Bethel complex six days a week, responding to the healthcare needs of the wider Aleppo community and providing free medication to those in need.",
          "In 2020, the Bethel Polyclinic moved into its own dedicated facility, enabling it to broaden and further develop its services. Today, the Polyclinic operates six days a week and provides healthcare services across 28 medical specialties, continuing its mission of serving the community with accessible and compassionate medical care.",
        ],
      },
    ],
    stats: {
      eyebrow: null,
      heading: null,
      cards: [
        { number: "2013", caption: "Founded by the Bethel Church", captionHy: null },
        { number: "28", caption: "Medical specialties today", captionHy: null },
        { number: "6", caption: "Days a week", captionHy: null },
      ],
    },
    lists: [],
    people: [
      person("Mr. Joseph Touma", "Head of the Polyclinic", "/syria-polyclinic-joseph-touma.jpg"),
      person("Mrs. Garine Babachian", "Secretary", "/syria-polyclinic-garine-babachian.jpg"),
    ],
    contact: {
      addressLines: ["Telephon Hawai, near Faur hospital", "Aleppo, Syria"],
      rows: [
        row("Phone", "+963 21 4 666 500"),
        row("Facebook", "Bethel Polyclinic", "https://www.facebook.com/share/1Jog34pg9F/"),
        row("Website", "apcsy.org", "https://apcsy.org/"),
      ],
      mapsUrl: "https://maps.app.goo.gl/ziLNwX6ixNFpqLCX6",
    },
    gallery: [
      { src: "/syria-polyclinic-gallery-1.jpg", alt: "The Bethel Polyclinic team" },
      { src: "/syria-polyclinic-gallery-2.jpg", alt: "Patients at the reception" },
      { src: "/syria-polyclinic-gallery-3.jpg", alt: "A consultation" },
      { src: "/syria-polyclinic-gallery-4.jpg", alt: "Specialist care" },
      { src: "/syria-polyclinic-gallery-5.jpg", alt: "The medical team" },
      { src: "/syria-polyclinic-gallery-6.jpg", alt: "The pharmacy" },
      { src: "/syria-polyclinic-gallery-7.jpg", alt: "At the reception" },
      { src: "/syria-polyclinic-gallery-8.jpg", alt: "Medication for those in need" },
    ],
    cta: {
      heading: "Care With Compassion",
      body: "The Bethel Polyclinic continues its mission of serving the community with accessible and compassionate medical care.",
    },
  },
  {
    slug: "social-action-committee",
    crumbSection: "Outreach › Syria",
    title: "Social Action Committee — Syria",
    subtitlePlain: "The Armenian Protestant Community in Syria · ",
    subtitleBold: "Since 1990",
    heroPhoto: { src: "/syria-sac-hero.jpg", alt: "Social Action Committee distribution in Aleppo" },
    heroIcon: "ic-people",
    intro: {
      label: "About the Committee",
      paragraphs: [
        "The Social Action Committee of the Armenian Protestant Community in Syria, established in 1990, provides humanitarian, social, economic, and spiritual support to vulnerable Armenian families. Guided by Christian faith, compassion, and a commitment to human dignity, the Committee has assisted through emergency relief, food and medical assistance, educational scholarships, winter support, housing aid, and financial assistance.",
        "In response to Syria’s prolonged crisis, displacement, economic hardship, and the 2023 earthquake, it continues to implement life-sustaining relief programs alongside long-term empowerment initiatives, including vocational training, small-business support, youth leadership development, and childcare activities. Through partnerships with international organizations and individual donors, the Committee strives to strengthen resilience, promote self-reliance, and help families achieve a more dignified and sustainable future, remaining steadfast in its conviction that the Church is here to stay.",
      ],
    },
    verse: {
      eyebrow: "Micah 6:8",
      body: "“Do justly, love mercy, and walk humbly with your God.”",
    },
    sections: [
      {
        label: "Our History",
        paragraphs: [
          "Established in 1990, the Social Services Department of the Armenian Protestant Community in Syria has provided economic, social, and spiritual assistance to more than 1,000 needy Armenians.",
          "Today, it operates through a well-structured and reputable framework, supporting various segments of the Armenian community with the assistance of international organizations and individual donors. Our priority has always been to develop skills, create opportunities, and promote dignified living.",
        ],
      },
      {
        label: "Mission & Vision",
        paragraphs: [
          "Mission: Through relief, development, and spiritual uplift, we provide services that help families move beyond poverty toward personal and financial independence.",
          "Vision: A community in which every family has access to the necessary resources to attain a dignified quality of life, develop individual potential, and build a caring, self-sufficient, and harmonious society.",
        ],
      },
      {
        label: "Challenges",
        paragraphs: [
          "Over the past fourteen years, Syria has endured indescribable suffering. The peaceful protests that began in 2011 quickly escalated into a full-scale war, during which our people paid a heavy price. In February 2023, a devastating earthquake with a magnitude of 7.8 struck the border regions of Turkey and Syria, claiming more than 55,000 lives and leaving millions homeless. In December 2024, Syria entered a new political transition, bringing additional uncertainty and economic instability.",
          "Yet throughout these hardships, the Armenian Protestant Community in Syria has remained steadfast in its mission. Its churches, schools, and institutions continue to serve faithfully; the Armenian Evangelical Educational Council supports more than 1,750 students across six schools. Through humanitarian outreach, vocational training, and medical services, particularly through the Bethel Polyclinic, the Community continues to provide essential support to those most in need.",
        ],
      },
    ],
    stats: {
      eyebrow: null,
      heading: null,
      cards: [
        { number: "1990", caption: "Established", captionHy: null },
        { number: "1,000+", caption: "Needy Armenians assisted", captionHy: null },
        { number: "1,750+", caption: "Students across six schools", captionHy: null },
      ],
    },
    lists: [
      {
        eyebrow: "Core Values",
        heading: "What Guides Our Work",
        items: [
          "Effective Communication",
          "People-Oriented Service",
          "Compassion",
          "Accountability",
          "Faith and Christian Love",
          "Charity",
          "Competence",
        ],
      },
      {
        eyebrow: "Priority Areas",
        heading: "Where We Focus",
        items: [
          "Civil Society",
          "Community Development",
          "Economic Development",
          "Education",
          "Health",
          "Social Protection and Spiritual Uplift",
        ],
      },
      {
        eyebrow: "Life-Sustaining Programs",
        heading: "Emergency Relief",
        items: [
          "Food parcels",
          "Shopping coupons",
          "Welcome winter (clothes and shoes)",
          "Hygiene kits",
          "Household blankets",
          "Drinking water and water tanks",
          "Back to school (scholarships, school needs, teachers’ salaries)",
          "Support for Armenian university students",
          "House rent for displaced families",
          "Aid for living expenses",
          "Aid for electricity (generators)",
          "Support for widows and people who live alone",
          "Fuel",
          "Gas for cooking",
          "Winter clothes and school stationery for children",
          "Easter & Christmas gifts",
          "Visits to the Old People’s Home and the Armenian Orphanage",
          "Renovation",
          "Emergency food under siege",
          "Awarding teachers",
          "Medical supply",
          "“Bethel” Polyclinic",
          "Financial assistance for Damascus and Kessab families",
          "COVID-19 response",
          "Special attention for those over 70",
          "Collect & Donate",
        ],
      },
      {
        eyebrow: "Life-Empowering Programs",
        heading: "Rehabilitation & Development",
        items: [
          "Vocational training and toolkits for small businesses",
          "Small-enterprise financing",
          "Public lectures",
          "Leadership training for youth leaders and Sunday School teachers",
          "Retreats, camps and activities for families",
          "Child care programs (DVBS and more)",
          "Job opportunities for women",
          "Early Steps kindergarten program",
        ],
      },
    ],
    people: [person("Maria Bozyakalian", "Head of the Committee", "/syria-hq-maria-bozyakalian.jpg")],
    contact: {
      addressLines: ["Al-Kouds St.", "Aleppo, Syria"],
      rows: [
        row("Phone", "+963 21 4 666 700"),
        row("Website", "apcsy.org", "https://apcsy.org/"),
      ],
      mapsUrl: "https://maps.app.goo.gl/s7NsFY7j7VZXSt7p9",
    },
    gallery: [
      { src: "/syria-sac-gallery-1.jpg", alt: "Social Action Committee — Syria" },
      { src: "/syria-sac-gallery-2.jpg", alt: "Social Action Committee — Syria" },
      { src: "/syria-sac-gallery-3.jpg", alt: "Social Action Committee — Syria" },
      { src: "/syria-sac-gallery-4.jpg", alt: "Social Action Committee — Syria" },
      { src: "/syria-sac-gallery-5.jpg", alt: "Social Action Committee — Syria" },
      { src: "/syria-sac-gallery-6.jpg", alt: "Social Action Committee — Syria" },
      { src: "/syria-sac-gallery-7.jpg", alt: "Social Action Committee — Syria" },
      { src: "/syria-sac-gallery-8.jpg", alt: "Social Action Committee — Syria" },
      { src: "/syria-sac-gallery-9.jpg", alt: "Social Action Committee — Syria" },
      { src: "/syria-sac-gallery-10.jpg", alt: "Social Action Committee — Syria" },
    ],
    cta: {
      heading: "The Church Is Here to Stay",
      body: "“For the love of Christ compels us.” — 2 Corinthians 5:14",
    },
  },
  {
    slug: "community-headquarters",
    crumbSection: "Union Leadership › Syria",
    title: "Headquarters of the Armenian Protestant Community in Syria",
    subtitlePlain: "Aleppo · ",
    subtitleBold: "Since 1855",
    heroPhoto: { src: "/syria-hq-hero.jpg", alt: "Headquarters of the Armenian Protestant Community in Syria, Aleppo" },
    heroIcon: "ic-church",
    intro: {
      label: "Our Roots",
      paragraphs: [
        "The institutional roots of the Armenian Protestant Community in Syria date back to the mid-nineteenth century. By 1855, an organized Armenian Protestant community of approximately 50 members had developed in Aleppo.",
        "In its early years, the Community used rented premises on Mugharbalieh Street as a center for its activities. In 1868, with financial assistance from the Ottoman authorities, it acquired a property known as Beit Makhluta on Kastel Joura Street. Through the subsequent purchase of neighboring properties, the site was expanded and became an important center of Armenian Protestant community life in Aleppo before 1915. During this period, worship services were also held at the Ghazanchi Bazaar Prayer House.",
      ],
    },
    verse: null,
    sections: [
      {
        label: "Development of the Community Headquarters",
        paragraphs: [
          "In 1968, premises on the first floor of the building adjacent to the Armenian Evangelical Emmanuel Church were designated as the headquarters of the Armenian Protestant Community in Syria.",
          "Following the outbreak of the war in Syria, the security situation in Aleppo deteriorated dramatically. As fighting intensified, the Community headquarters found itself close to the front lines and could no longer function safely. The Community’s Executive Committee therefore decided to relocate its administrative activities temporarily to premises adjacent to the Armenian Evangelical Bethel Church. Bethel Church made available the premises above the shops constructed along the church frontage in the 1970s, allowing the Community’s administrative work and ministries to continue throughout the difficult years of the conflict.",
        ],
      },
      {
        label: "The New Community Headquarters",
        paragraphs: [
          "In 2020, under the leadership of Rev. Dr. Haroutune Selimian, Head of the Armenian Protestant Community in Syria, a project was launched to construct a new and larger headquarters capable of responding to the Community’s expanding ministries and administrative responsibilities.",
          "The project was realized with the substantial material and moral support of the Hungary Helps Program, supported by the Government of Hungary. The new center provided significantly expanded facilities, including offices, conference and meeting spaces, and areas serving the Community’s various ministries.",
          "The Hovhannes Khoja Haydostian Conference Hall commemorates an important Armenian Evangelical educator who served as director of Bethel School in Aleppo, contributing significantly to the education and formation of generations of students. The Soghomon Tehlirian Cultural Hall bears the name of Soghomon Tehlirian, who came from an Armenian Evangelical background and holds a significant place in modern Armenian history.",
        ],
      },
      {
        label: "The Headquarters Today",
        paragraphs: [
          "Today, the headquarters serves as the administrative center of the Armenian Protestant Community in Syria, coordinating its churches and its educational, social, medical, humanitarian, and community ministries.",
          "More than an administrative building, it serves as a gathering place for church leadership, conferences, meetings, cultural activities, visiting delegations, and community initiatives. It reflects the Community’s continuing commitment to faith, education, service, and Christian witness in Syria.",
        ],
      },
    ],
    stats: null,
    lists: [
      {
        eyebrow: "Within These Walls",
        heading: "The Three-Story Headquarters",
        items: [
          "Office of the Head of the Community",
          "Hovhannes Khoja Haydostian Conference Hall",
          "Community Assembly Hall",
          "Soghomon Tehlirian Cultural Hall",
          "Administrative and working offices",
        ],
      },
    ],
    people: [
      person("Rev. Dr. Haroutune Selimian", "Head of the Community", "/central-committee-haroutune-selimian.jpg"),
      person("Rita Minasian", "Community Secretary", "/syria-hq-rita-minasian.jpg"),
      person("Araz Mansourian-Shahinian", "Administrative Officer, Educational Council", "/syria-hq-araz-mansourian.jpg"),
      person("Maria Bozeagalian-Boshgezenian", "Administrative Officer, Social Services", "/syria-hq-maria-bozyakalian.jpg"),
      person("Maral Aghikian", "Accountant", "/syria-hq-maral-aghekian.jpg"),
      person("Lousin Abajian-Chilaposian", "Reports and Communications Officer", "/syria-hq-lousin-abajian.jpg"),
      person("Talar Tabbakh", "Assistant Administrative Officer, Educational Council", "/syria-hq-talar-tabbakh.jpg"),
    ],
    contact: {
      addressLines: ["P.O. Box 3833", "Aleppo, Syria"],
      rows: [
        row("Phone", "+963 21 4 666 700"),
        row("Fax", "+963 21 4 614 490"),
        row("Email", "apcsofficedirectorsyria@gmail.com", "mailto:apcsofficedirectorsyria@gmail.com"),
      ],
      mapsUrl: null,
    },
    gallery: [
      { src: "/syria-hq-gallery-1.jpg", alt: "Headquarters of the Armenian Protestant Community in Syria" },
      { src: "/syria-hq-gallery-2.jpg", alt: "Headquarters of the Armenian Protestant Community in Syria" },
      { src: "/syria-hq-gallery-3.jpg", alt: "Headquarters of the Armenian Protestant Community in Syria" },
      { src: "/syria-hq-gallery-4.jpg", alt: "Headquarters of the Armenian Protestant Community in Syria" },
      { src: "/syria-hq-gallery-5.jpg", alt: "Headquarters of the Armenian Protestant Community in Syria" },
      { src: "/syria-hq-gallery-6.jpg", alt: "Headquarters of the Armenian Protestant Community in Syria" },
      { src: "/syria-hq-gallery-7.jpg", alt: "Headquarters of the Armenian Protestant Community in Syria" },
      { src: "/syria-hq-gallery-8.jpg", alt: "Headquarters of the Armenian Protestant Community in Syria" },
      { src: "/syria-hq-gallery-9.jpg", alt: "Headquarters of the Armenian Protestant Community in Syria" },
      { src: "/syria-hq-gallery-10.jpg", alt: "Headquarters of the Armenian Protestant Community in Syria" },
      { src: "/syria-hq-gallery-11.jpg", alt: "Headquarters of the Armenian Protestant Community in Syria" },
    ],
    cta: {
      heading: "Faith, Education, Service",
      body: "The headquarters reflects the Community’s continuing commitment to faith, education, service, and Christian witness in Syria.",
    },
  },
];
