import type { School } from "@/data/schools";
import type {
  SchoolContent,
  SchoolContactRow,
  SchoolLeaderEntry,
  SchoolSplitRow,
} from "@/data/schoolContent";

/**
 * The locked school template (approved 2026-10-27) — same spine as the
 * church template (src/lib/churchTemplate.ts):
 *
 *   Top (masthead · hero · facts Founded/Grades/Location)
 *   → About + principal card → Contact → Leadership
 *   → the school's own content blocks, in one fixed order
 *   → Principals archive → Gallery → closing band
 *
 * Structure and template wording are decided HERE, never per school.
 * Per-school data only supplies verified facts, prose and photos.
 * Quote bands render only for scripture / the school's motto; editorial
 * pull quotes and custom closing headlines are not rendered.
 */

type Fact = SchoolContent["factsBar"][number];

export const SCHOOL_LABELS = {
  aboutEyebrow: "The School",
  aboutHeading: "About the School",
  archiveEyebrow: "Those Who Served",
  galleryEyebrow: "In Pictures",
  galleryHeading: "Gallery",
  ctaHeading: "Visit the School",
} as const;

const isPending = (s: string) => /^pending$/i.test(s.trim());

function buildFacts(content: SchoolContent): Fact[] {
  const cells = content.factsBar;
  const fact = (label: string, sub: string): Fact => ({ label, labelHy: null, sub, subHy: null });

  // Founded — first dated "founded/established" cell with a real year.
  const foundedCell =
    cells.find((f) => /found|establish/i.test(f.sub) && !isPending(f.label)) ??
    null;
  const founded = foundedCell ?? fact(content.masthead.established ?? "Pending", "Founded");

  // Grades — the cell describing the school's levels.
  const gradesCell = cells.find((f) => /\bKG\b|grade|secondary|elementary|kindergarten/i.test(`${f.label} ${f.sub}`));
  const grades = gradesCell ?? fact("Pending", "Grade Levels");

  // Location — an explicit location cell, else the masthead's own line.
  const locationCell =
    cells.find((f) => /location/i.test(f.sub)) ??
    cells.find((f) => f !== foundedCell && f !== gradesCell && !/\d/.test(f.label) && /,|beirut|lebanon|syria/i.test(`${f.label} ${f.sub}`));
  const place = content.masthead.locationLine.split(",").map((p) => p.trim());
  const location = locationCell ?? fact(place.slice(-2).join(", "), "Location");

  return [founded, grades, location];
}

const isPrincipalRole = (r: string) => /principal|director/i.test(r);
const isChairRole = (r: string) => /chair/i.test(r);
const isSecretaryRole = (r: string) => /secretary/i.test(r);

function buildLeadership(content: SchoolContent): SchoolLeaderEntry[] {
  const given = (content.leadership ?? []).map((l) => ({
    ...l,
    role: isChairRole(l.role) ? "Chair of Council" : l.role,
  }));
  const pending = (role: string): SchoolLeaderEntry => ({ name: null, nameHy: null, role, roleHy: null, photo: null });

  const principals = given.filter((l) => isPrincipalRole(l.role));
  const chairs = given.filter((l) => isChairRole(l.role));
  const secretaries = given.filter((l) => isSecretaryRole(l.role));
  const others = given.filter((l) => !isPrincipalRole(l.role) && !isChairRole(l.role) && !isSecretaryRole(l.role));

  if (principals.length === 0) {
    const card = content.principalCard;
    principals.push(card ? { ...card } : pending("Principal"));
  }
  if (chairs.length === 0) chairs.push(pending("Chair of Council"));
  if (secretaries.length === 0) secretaries.push(pending("Secretary"));
  return [...principals, ...chairs, ...secretaries, ...others];
}

// Phone and Email rows always present (pending when not supplied), so every
// "Get in Touch" card has the same core rows; other real rows follow.
function buildContactRows(content: SchoolContent): SchoolContactRow[] {
  const rows = content.contactRows ?? [];
  const pendingRow = (key: string): SchoolContactRow => ({
    key,
    keyHy: null,
    value: "pending",
    valueHy: null,
    href: null,
    pending: true,
  });
  const isPhone = (r: SchoolContactRow) => r.key === "Phone";
  // Any mailto row counts as an email (e.g. "Principal's Office").
  const isEmail = (r: SchoolContactRow) => r.key === "Email" || !!r.href?.startsWith("mailto:");
  const phone = rows.filter(isPhone);
  const email = rows.filter(isEmail);
  const rest = rows.filter((r) => !isPhone(r) && !isEmail(r));
  return [
    ...(phone.length ? phone : [pendingRow("Phone")]),
    ...(email.length ? email : [pendingRow("Email")]),
    ...rest,
  ];
}

// Scripture reference ("Ephesians 5:8") or the school's motto only.
function scriptureOnly<T extends { attribution: string } | null | undefined>(band: T): T | null {
  if (!band) return null;
  return /\d+:\d+|motto|verse/i.test(band.attribution) ? band : null;
}

export function buildSchoolView(school: School, content: SchoolContent) {
  // A Syria-style intro row that only repeats the About text is folded into
  // About; its photo moves to the gallery so nothing real is lost. An intro
  // with its own text (Central High's history) stays as a content row.
  const intro = content.introFeature ?? null;
  const introRepeatsAbout =
    !!intro && JSON.stringify(intro.paragraphs) === JSON.stringify(content.about.paragraphs);
  const introRow: SchoolSplitRow | null =
    intro && !introRepeatsAbout ? { ...intro, reverse: true, dropcapFirst: false } : null;

  const galleryPhotos = [
    ...(intro && introRepeatsAbout
      ? [{ src: intro.photo.src, alt: intro.photo.alt, caption: null, captionHy: null }]
      : []),
    ...(content.gallery?.photos ?? []),
  ];

  const principal =
    content.principalCard ??
    (content.leadership ?? []).find((l) => isPrincipalRole(l.role)) ??
    null;

  const photoRows: SchoolSplitRow[] = [
    ...(introRow ? [introRow] : []),
    ...(content.splitRows ?? []),
    ...(content.academicsRows ?? []),
    ...(content.curriculumRows ?? []),
    ...(content.worshipRows ?? []),
    ...(content.faithRows ?? []),
    ...(content.heritageRows ?? []),
  ].map((row) => ({ ...row, dropcapFirst: false }));

  return {
    masthead: {
      locationLine: content.masthead.locationLine,
      locationLineHy: content.masthead.locationLineHy,
      established: content.masthead.established,
      establishedHy: content.masthead.establishedHy,
    },
    logo: content.logo,
    heroPhoto: content.heroPhoto,
    factsBar: buildFacts(content),
    about: {
      ...content.about,
      eyebrow: SCHOOL_LABELS.aboutEyebrow,
      heading: SCHOOL_LABELS.aboutHeading,
      pullQuote: null,
      pullQuoteHy: null,
    },
    principalCard: {
      name: principal?.name ?? null,
      nameHy: principal?.nameHy ?? null,
      role: principal?.role ?? "Principal",
      roleHy: null,
      photo: principal?.photo ?? null,
    },
    location: content.location,
    mapsUrl: content.mapsUrl ?? null,
    contactRows: buildContactRows(content),
    contactNote: content.contactNote ?? null,
    leadership: buildLeadership(content),
    quoteBand: scriptureOnly(content.pullQuoteBand),
    quoteBand2: scriptureOnly(content.pullQuoteBand2),
    photoRows,
    directorsArchive: content.directorsArchive
      ? { ...content.directorsArchive, eyebrow: SCHOOL_LABELS.archiveEyebrow }
      : null,
    gallery: galleryPhotos.length
      ? {
          eyebrow: SCHOOL_LABELS.galleryEyebrow,
          eyebrowHy: null,
          heading: SCHOOL_LABELS.galleryHeading,
          headingHy: null,
          photos: galleryPhotos,
        }
      : null,
    cta: {
      heading: SCHOOL_LABELS.ctaHeading,
      headingHy: null,
      body: `All are welcome at the ${school.name}.`,
      bodyHy: null,
    },
  };
}
