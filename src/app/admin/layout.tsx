import type { Metadata } from "next";
import { getDb } from "@/lib/server/db";
import styles from "@/components/admin/admin.module.css";

export const metadata: Metadata = {
  title: "Admin — UAECNE",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
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
