// src/data/headquarters.ts
// -----------------------------------------------------------------------------
// UAECNE Head Office (Union Leadership → Headquarters) page data.
//
// SOURCE: "About HQ.rtf" (Union-supplied). Personnel roster, offices, phone
// numbers, address, and contact details are transcribed verbatim from that
// document. Names are the Union's own romanizations (treated as verified).
//
// DISCIPLINE: Do not invent, guess, or add members/titles/offices without a
// verified source. Missing data stays null / "pending". `photo: null` renders
// an explicit placeholder avatar — never a broken image or an invented file.
// -----------------------------------------------------------------------------

export type HqMember = {
  name: string;
  /** Job title from the source doc. Use "Role pending" when the doc gives none. */
  title: string;
  /** Flat /public path, or null when no verified photo exists yet. */
  photo: string | null;
  email: string | null;
  /** true → render title in the muted "pending" style. */
  pending?: boolean;
};

export type HqOffice = {
  office: string;
  /** Office phone line(s), or null. */
  phone: string | null;
  members: HqMember[];
};

export type HqFact = { value: string; label: string };

export const headquartersHero = {
  photo: "/headquarters-building.jpg",
  alt: "UAECNE Headquarters building, Geitawi, Beirut",
  caption: "UAECNE Head Office · Beirut",
} as const;

export const headquartersFacts: HqFact[] = [
  { value: "1846", label: "Established" },
  { value: "Geitawi, Beirut", label: "Location" },
  { value: "Head Office", label: "Character" },
  { value: "UAECNE", label: "The Union" },
];

/** Physical spaces the building houses (from the source doc's opening paragraph). */
export const headquartersHouses: string[] = [
  "President’s Office",
  "Personnel Offices",
  "Reception Hall",
  "Meeting Room",
  "Educational Council Office",
  "Publication Office",
  "Court of First Appeals",
  "Christian Endeavor Office",
  "Residences",
];

/** Head Office personnel, grouped by office, in source-document order. */
export const headquartersOffices: HqOffice[] = [
  {
    office: "Union Office",
    phone: "01-565628 · 01-443547",
    members: [
      { name: "Rev. Salim Sabounji", title: "Office Director", photo: "/headquarters-salim-sabounji.jpg", email: "office.director@uaecne.org" },
      { name: "Mrs. Maral Ishkhanian", title: "Secretary", photo: "/headquarters-maral-ishkhanian.jpg", email: "Secretary@uaecne.org" },
      { name: "Mrs. Juliette Zoulikian", title: "Accountant", photo: "/headquarters-juliette-zoulikian.jpg", email: null },
      { name: "Mr. Nishan Nalbandian", title: "Office Assistant", photo: "/headquarters-nishan-nalbandian.jpg", email: null },
      { name: "Mr. Dikran Arzoian", title: "Janitor", photo: null, email: null },
      { name: "Mrs. Tina Motokian", title: "Office Cleaner", photo: null, email: null },
    ],
  },
  {
    office: "Church Relations",
    phone: null,
    members: [
      { name: "Rev. Nishan Bakalian", title: "Relations & Coordinator", photo: "/headquarters-nishan-bakalian.jpg", email: null },
    ],
  },
  {
    office: "Publication Office",
    phone: "01-565931",
    members: [
      { name: "Mrs. Rozette Alemian", title: "Office Director", photo: null, email: null },
      { name: "Mrs. Ani Basset", title: "Typographer", photo: null, email: null },
      { name: "Mrs. Helen Topeian", title: "Secretary & Typesetter", photo: null, email: null },
    ],
  },
  {
    office: "Educational Council Office",
    phone: null,
    members: [
      { name: "Ms. Vartoug Balekjian", title: "Council Coordinator", photo: "/headquarters-vartoug-balekjian.jpg", email: null },
    ],
  },
  {
    office: "Court Office",
    phone: null,
    members: [
      { name: "Rev. Hrayr Cholakian", title: "Court Chair", photo: "/headquarters-hrayr-cholakian.jpg", email: null },
    ],
  },
  {
    office: "Christian Endeavor Office",
    phone: "01-565930",
    members: [
      { name: "Pastor Datev Basmajian", title: "Youth Worker", photo: "/headquarters-datev-basmajian.jpg", email: null },
      { name: "Mrs. Nayri Agishian", title: "Secretary", photo: null, email: null },
      { name: "Ms. Aline Tahazian", title: "Children & Media Coordinator", photo: null, email: null },
    ],
  },
  {
    // Listed in the source doc with no office and no title — flagged pending.
    office: "Also at the Head Office",
    phone: null,
    members: [
      { name: "Dr. Yervant Kassouny", title: "Role pending", photo: null, email: null, pending: true },
    ],
  },
];

export const headquartersContact = {
  addressLines: ["Kobayyat Street, Sector 67", "Building #228, Jeitawi Region", "Ashrafieh, Beirut, Lebanon"],
  mapUrl:
    "https://www.google.com/maps/place/Union+of+the+Armenian+Evangelical+Churches+in+the+Near+East/data=!4m2!3m1!1s0x0:0x2fa51ff5fccfc88e?sa=X&ved=1t:2428&ictx=111",
  email: "office.director@uaecne.org",
  phones: ["+961-1-443547", "+961-1-565628"],
  facebook: "https://www.facebook.com/UAECNE",
  youtube: "https://www.youtube.com/channel/UCuK0j_A_Wx0oyNYvWJv5Ngg",
} as const;
