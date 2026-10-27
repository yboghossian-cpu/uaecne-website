import type { Metadata } from "next";
import { Cormorant_Garamond, IBM_Plex_Sans, Noto_Serif_Armenian } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import SiteChrome from "@/components/layout/SiteChrome";
import IconSymbols from "@/components/shared/IconSymbols";
import { DEFAULT_SHARE_IMAGE, SITE_NAME, SITE_URL, shareImage } from "@/lib/site";
import { getSettings } from "@/lib/server/settings";
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

export function generateMetadata(): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: SITE_NAME,
    // Default: the homepage hero copy ("Est. 1846" + the hero subline);
    // editable from Admin › Settings.
    description: getSettings().seo.defaultDescription,
    // Pages without their own openGraph block inherit this; og:title and
    // og:description then fall back to each page's own <title>/description.
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_US",
      images: [{ url: shareImage(DEFAULT_SHARE_IMAGE), width: 1200 }],
    },
    twitter: { card: "summary_large_image" },
  };
}

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
        <SiteChrome
          header={
            <>
              <AnnouncementBar />
              <Header />
            </>
          }
          footer={<Footer />}
        >
          {children}
        </SiteChrome>
      </body>
    </html>
  );
}
