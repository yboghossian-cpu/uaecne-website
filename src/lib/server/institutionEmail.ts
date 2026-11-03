import "server-only";
import { getChurch, getChurchContent, getSchool, getSchoolContent } from "./content";

/**
 * Where a church's or school's "Send a Message" form is delivered: the same
 * email address(es) its own contact card shows on the page. Resolved on the
 * server from the slug only, so the form can never be pointed at an address
 * the page doesn't list.
 */

export type InstitutionKind = "church" | "school";

const EMAIL_RE = /^[^\s@<>,;"]+@[^\s@<>,;"]+\.[^\s@<>,;"]+$/;

const clean = (list: (string | null | undefined)[]) =>
  [...new Set(list.map((e) => (e ?? "").trim().toLowerCase()).filter((e) => EMAIL_RE.test(e)))];

export function churchEmails(slug: string): string[] {
  const church = getChurch(slug);
  if (!church) return [];
  const override = getChurchContent(slug)?.contactOverride ?? null;
  if (override?.emailPending) return [];
  // Same rule as ChurchContactSection: an explicit override (even null) wins.
  const field =
    override && Object.prototype.hasOwnProperty.call(override, "email") ? override.email : church.email;
  return clean((field ?? "").split("\n"));
}

export function schoolEmails(slug: string): string[] {
  const rows = getSchoolContent(slug)?.contactRows ?? [];
  return clean(
    rows
      .filter((r) => !r.pending && (r.key === "Email" || !!r.href?.startsWith("mailto:")))
      .map((r) => (r.href?.startsWith("mailto:") ? r.href.slice(7).split("?")[0] : r.value)),
  );
}

export function institution(kind: InstitutionKind, slug: string): { name: string; emails: string[] } | null {
  if (kind === "church") {
    const c = getChurch(slug);
    return c ? { name: c.name, emails: churchEmails(slug) } : null;
  }
  const s = getSchool(slug);
  return s ? { name: s.name, emails: schoolEmails(slug) } : null;
}
