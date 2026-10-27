import type { Metadata } from "next";
import { lang as rootLang } from "next/root-params";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import IconSymbols from "@/components/shared/IconSymbols";
import { LangProvider } from "@/lib/i18n/client";
import { HTML_LANG, LANGS, isLang } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import clientKeys from "@/i18n/client-keys.json";
import { fontVars } from "@/lib/fonts";
import { DEFAULT_SHARE_IMAGE, SITE_NAME, SITE_URL, shareImage } from "@/lib/site";
import { getSettings } from "@/lib/server/settings";
import "../globals.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

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

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const v = await rootLang();
  const lang = isLang(v) ? v : "en";
  // Client components only receive the few UI labels they use.
  const messages: Record<string, string> = {};
  if (lang === "hy") {
    const dict = getDictionary();
    for (const k of clientKeys as string[]) {
      const hit = dict.get(k);
      if (hit) messages[k] = hit;
    }
  }
  return (
    <html lang={HTML_LANG[lang]} className={fontVars} data-lang={lang}>
      <body>
        <IconSymbols />
        <LangProvider lang={lang} messages={messages}>
          <AnnouncementBar />
          <Header />
          <main>{children}</main>
          <Footer />
        </LangProvider>
      </body>
    </html>
  );
}
