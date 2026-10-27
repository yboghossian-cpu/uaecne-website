/** An institution's official online presence, shown under "Our Location".
 *  Every link must be the institution's own verified account. */
export type SocialLinks = {
  website?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  x?: string;
  tiktok?: string;
  linkedin?: string;
};

export const SOCIAL_ORDER: { key: keyof SocialLinks; label: string; icon: string }[] = [
  { key: "facebook", label: "Facebook", icon: "#ic-fb" },
  { key: "instagram", label: "Instagram", icon: "#ic-ig" },
  { key: "youtube", label: "YouTube", icon: "#ic-yt" },
  { key: "x", label: "X", icon: "#ic-x" },
  { key: "tiktok", label: "TikTok", icon: "#ic-tiktok" },
  { key: "linkedin", label: "LinkedIn", icon: "#ic-in" },
  { key: "website", label: "Website", icon: "#ic-globe" },
];

export function hasSocial(s: SocialLinks | null | undefined): s is SocialLinks {
  return Boolean(s && SOCIAL_ORDER.some((o) => (s[o.key] ?? "").trim()));
}
