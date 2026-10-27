import { Cormorant_Garamond, IBM_Plex_Sans, Noto_Sans_Armenian, Noto_Serif_Armenian } from "next/font/google";

export const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant-garamond",
  display: "swap",
});

export const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
});

// Armenian script for headings (Cormorant has no Armenian glyphs).
export const notoSerifArmenian = Noto_Serif_Armenian({
  subsets: ["armenian"],
  weight: ["500", "600"],
  variable: "--font-noto-serif-armenian",
  display: "swap",
});

// Armenian script for body text (IBM Plex Sans has no Armenian glyphs).
export const notoSansArmenian = Noto_Sans_Armenian({
  subsets: ["armenian"],
  weight: ["400", "500", "600"],
  variable: "--font-noto-sans-armenian",
  display: "swap",
});

export const fontVars = [cormorantGaramond, ibmPlexSans, notoSerifArmenian, notoSansArmenian]
  .map((f) => f.variable)
  .join(" ");
