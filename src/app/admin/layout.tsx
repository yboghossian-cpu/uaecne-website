import type { Metadata } from "next";
import { getDb } from "@/lib/server/db";
import IconSymbols from "@/components/shared/IconSymbols";
import { fontVars } from "@/lib/fonts";
import styles from "@/components/admin/admin.module.css";
import "../globals.css";

export const metadata: Metadata = {
  title: "Admin — UAECNE",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

// The admin has its own root layout (the public site's lives under /[lang]).
export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVars}>
      <body>
        <IconSymbols />
        <AdminBody>{children}</AdminBody>
      </body>
    </html>
  );
}

function AdminBody({ children }: { children: React.ReactNode }) {
  if (!getDb()) {
    return (
      <div className={styles.loginWrap}>
        <div className={styles.loginCard}>
          <h1 className={styles.loginTitle}>Admin unavailable</h1>
          <p>
            The admin portal runs on the UAECNE production server. This copy of the website (a preview) has no database,
            so editing is switched off here.
          </p>
        </div>
      </div>
    );
  }
  return <>{children}</>;
}
