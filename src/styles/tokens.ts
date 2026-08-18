/**
 * Design tokens — typed JS/TS mirror of tokens.css, for contexts that can't
 * read CSS custom properties (e.g. metadata theme-color, canvas/SVG props).
 * Keep in sync with tokens.css by hand; values must match
 * PROJECT_BRIEF.md "Verified brand system" exactly.
 */

export const colors = {
  red: "#8B0000",
  ivory: "#FFFDF7",
  ivoryWash: "#F7F2E9",
  gold: "#C5A059",
  goldDecorative: "#D4AF37",
  brown: "#43311F",
  text: "#1A1A1A",
} as const;

export const fonts = {
  heading: "var(--font-heading)",
  body: "var(--font-body)",
} as const;
