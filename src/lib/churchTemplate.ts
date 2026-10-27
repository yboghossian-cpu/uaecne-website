import type { Church } from "@/data/churches";
import { churches } from "@/data/churches";
import type { ChurchContent, LeaderEntry } from "@/data/churchContent";

/**
 * The locked church template (Lebanon pattern, approved 2026-10-27).
 *
 * Every church page — full profile or directory-only — goes through this one
 * normalisation step, so structure and template wording are decided HERE,
 * never per church:
 *   - facts bar is always Worship · Location · Founded
 *   - section eyebrows/headings are fixed template labels
 *   - About always has the pastor card (photo/name pending or "Vacant")
 *   - Leadership always shows Pastor · Vice-Chairman · Secretary, with
 *     "Name pending" / "Photo pending" slots where data is missing
 *   - vice-chair roles are always "Vice-Chairman"
 *   - no editorial pull quotes; CTA is always "Join Us in Worship"
 * Per-church data only supplies verified facts and prose.
 */

type Fact = ChurchContent["factsBar"][number];
type Photo = { src: string; alt: string };

export const LABELS = {
  aboutEyebrow: "The Congregation",
  aboutHeading: "About This Church",
  leadershipEyebrow: "The Ministry",
  leadershipHeading: "Leadership",
  historyEyebrow: "Our Story",
  programsEyebrow: "Life of the Church",
  programsHeading: "Ministries & Programs",
  successionEyebrow: "Those Who Served",
  successionHeading: "Pastors of the Church",
  galleryEyebrow: "In Pictures",
  galleryHeading: "Gallery",
  ctaHeading: "Join Us in Worship",
} as const;

const PENDING_NAME = "Name pending";

// "Sundays 10:30-11:30" → "Sundays · 10:30–11:30" (directory value, reformatted only).
function formatServiceTime(raw: string): string {
  const m = raw.match(/^(\S+)\s+(.+)$/);
  const out = m ? `${m[1]} · ${m[2]}` : raw;
  return out.replace(/(\d)\s*-\s*(\d)/g, "$1–$2");
}

// Short place label for directory-only churches: the part of the official
// name after the last comma, or after " of " ("…Church of Sydney" → "Sydney").
function placeFromName(name: string): string {
  if (name.includes(",")) return name.slice(name.lastIndexOf(",") + 1).trim();
  const of = name.lastIndexOf(" of ");
  return of >= 0 ? name.slice(of + 4).trim() : name;
}

function hostChurchName(slug: string | undefined): string | null {
  if (!slug) return null;
  return churches.find((c) => c.slug === slug)?.name ?? null;
}

function buildFacts(church: Church, content: ChurchContent | null): Fact[] {
  const cells = content?.factsBar ?? [];
  const isWorship = (f: Fact) => /worship|service/i.test(f.sub) || /worship/i.test(f.label);
  const isFounded = (f: Fact) => /found|construction|completed|established/i.test(f.sub);

  // Worship — a church-specific worship arrangement ("Worship Now Held At")
  // wins; otherwise the directory's service time; otherwise pending.
  const worshipCell = cells.find(isWorship);
  const special = worshipCell && /held at/i.test(worshipCell.sub) ? worshipCell : null;
  const worship: Fact = special ?? {
    label: content?.noRegularWorship
      ? "No regular service"
      : church.serviceTime
        ? formatServiceTime(church.serviceTime)
        : "Sunday · pending",
    labelHy: null,
    sub: "Worship Service",
    subHy: null,
  };

  const location: Fact = cells.find((f) => !isWorship(f) && !isFounded(f)) ?? {
    label: placeFromName(church.name),
    labelHy: null,
    sub: church.country.replace(/\s*\(.*\)/, ""),
    subHy: null,
  };

  const foundedCells = cells.filter(isFounded);
  let founded: Fact;
  if (foundedCells.length > 1) {
    // e.g. Ekizolukh: construction begun 1911, completed 1955.
    founded = {
      label: `${foundedCells[0].label} – ${foundedCells[foundedCells.length - 1].label}`,
      labelHy: null,
      sub: "Built",
      subHy: null,
    };
  } else if (foundedCells.length === 1) {
    founded = foundedCells[0];
  } else {
    founded = { label: church.estYear || "Pending", labelHy: null, sub: "Founded", subHy: null };
  }

  return [worship, location, founded];
}

const isPastorRole = (role: string) => /pastor|preacher/i.test(role);

// churches.ts `pastor` sometimes carries a role prefix ("Pastor: Rev. X",
// "Preacher: Y") — split it so the card shows the name and the real role.
function directoryPastor(church: Church): { name: string; role: string } | null {
  const raw = (church.pastor ?? "").trim();
  if (!raw) return null;
  const m = raw.match(/^(Pastor|Preacher)\s*:\s*(.+)$/i);
  return m ? { name: m[2].trim(), role: m[1][0].toUpperCase() + m[1].slice(1).toLowerCase() } : { name: raw, role: "Pastor" };
}
const isViceRole = (role: string) => /vice/i.test(role);
const isSecretaryRole = (role: string) => /secretary/i.test(role);

function buildLeadership(church: Church, content: ChurchContent | null, vacant: boolean): LeaderEntry[] {
  const given = (content?.leadership ?? []).map((l) => ({
    ...l,
    role: isViceRole(l.role) ? "Vice-Chairman" : l.role,
  }));

  const pastors = given.filter((l) => isPastorRole(l.role));
  const vice = given.filter((l) => isViceRole(l.role));
  const secretaries = given.filter((l) => isSecretaryRole(l.role));
  const others = given.filter(
    (l) => !isPastorRole(l.role) && !isViceRole(l.role) && !isSecretaryRole(l.role),
  );

  if (pastors.length === 0) {
    const card = content?.pastorCard;
    pastors.push(
      card
        ? { name: card.name, nameHy: card.nameHy, role: card.role, roleHy: null, photo: card.photo ?? null }
        : {
            name: vacant ? "Vacant" : directoryPastor(church)?.name ?? PENDING_NAME,
            nameHy: null,
            role: vacant ? "Pastor" : directoryPastor(church)?.role ?? "Pastor",
            roleHy: null,
            photo: null,
          },
    );
  }
  if (vice.length === 0) {
    vice.push({ name: PENDING_NAME, nameHy: null, role: "Vice-Chairman", roleHy: null, photo: null });
  }
  if (secretaries.length === 0) {
    const label = content?.contactOverride?.secretaryLabel;
    const fromContact =
      !label || /secretary/i.test(label)
        ? content?.contactOverride?.secretary ?? church.secretary
        : church.secretary;
    secretaries.push({
      name: fromContact || PENDING_NAME,
      nameHy: null,
      role: "Secretary",
      roleHy: null,
      photo: null,
    });
  }
  return [...pastors, ...vice, ...secretaries, ...others];
}

export type ChurchView = ReturnType<typeof buildChurchView>;

export function buildChurchView(church: Church, content: ChurchContent | null) {
  const vacant = !!content?.pastorVacant || !!content?.about.vacancyNote;
  const host = hostChurchName(content?.worshipsAt);

  const masthead: ChurchContent["masthead"] = content?.masthead ?? {
    locationLine: church.address.split("\n")[0],
    locationLineHy: null,
    established: church.estYear || "Pending",
    establishedHy: null,
  };

  const pastorFromLeaders = content?.leadership?.find((l) => isPastorRole(l.role) && l.photo);
  const pastorCard: { name: string; role: string; photo: Photo | null } = content?.pastorCard
    ? { name: content.pastorCard.name, role: content.pastorCard.role, photo: content.pastorCard.photo }
    : pastorFromLeaders
      ? { name: pastorFromLeaders.name, role: pastorFromLeaders.role, photo: pastorFromLeaders.photo }
      : vacant
        ? { name: "Vacant", role: "Pastor", photo: null }
        : { ...(directoryPastor(church) ?? { name: PENDING_NAME, role: "Pastor" }), photo: null };

  const about = {
    eyebrow: LABELS.aboutEyebrow,
    heading: LABELS.aboutHeading,
    paragraphs: content?.about.paragraphs ?? [],
    vacancyNote: content?.about.vacancyNote ?? null,
    pending: !content,
  };

  // CTA heading is fixed. Lebanon bodies are the approved mockup copy; every
  // other church gets the plain standard line (no editorial copy). Churches
  // whose congregation now worships elsewhere point there instead.
  const ctaBody = host
    ? `All are welcome to worship with the congregation at the ${host}.`
    : church.country === "Lebanon" && content?.cta.body
      ? content.cta.body
      : `All are welcome at the ${church.name}.`;

  const serviceTime = host
    ? `Held at the ${host}`
    : content?.noRegularWorship
      ? "No regular worship service"
      : church.serviceTime
      ? formatServiceTime(church.serviceTime)
      : null;

  return {
    masthead,
    logo: content?.logo ?? null,
    heroPhoto: content?.heroPhoto ?? null,
    factsBar: buildFacts(church, content),
    about,
    pastorCard,
    leadership: buildLeadership(church, content, vacant),
    serviceTime,
    history: content?.history
      ? { ...content.history, eyebrow: LABELS.historyEyebrow, dropcapFirstParagraph: false }
      : null,
    programs: content?.programs
      ? { ...content.programs, eyebrow: LABELS.programsEyebrow, heading: LABELS.programsHeading }
      : null,
    succession: content?.succession
      ? { ...content.succession, eyebrow: LABELS.successionEyebrow, heading: LABELS.successionHeading }
      : null,
    gallery: content?.gallery
      ? { ...content.gallery, eyebrow: LABELS.galleryEyebrow, heading: LABELS.galleryHeading }
      : null,
    cta: { heading: LABELS.ctaHeading, headingHy: null, body: ctaBody, bodyHy: null },
  };
}
