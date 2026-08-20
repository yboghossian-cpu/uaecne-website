import type { Metadata } from "next";
import { Cormorant_Garamond, IBM_Plex_Sans, Noto_Serif_Armenian } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import IconSymbols from "@/components/shared/IconSymbols";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant-garamond",
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
});

// Wired in for the church-template unit's first verified Armenian-script
// content (Anjar's succession list, sourced in Armenian only — see
// OPEN_QUESTIONS.md). Same weights the reference files' own Google Fonts
// URL already loads (wght@500;600), so real Armenian text renders in the
// intended typeface instead of an arbitrary system fallback.
const notoSerifArmenian = Noto_Serif_Armenian({
  subsets: ["armenian"],
  weight: ["500", "600"],
  variable: "--font-noto-serif-armenian",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Union of the Armenian Evangelical Churches in the Near East",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorantGaramond.variable} ${ibmPlexSans.variable} ${notoSerifArmenian.variable}`}
    >
      <body>
        <IconSymbols />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
