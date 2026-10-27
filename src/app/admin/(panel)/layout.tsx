import { requireAdmin } from "@/lib/server/auth";
import { requireDb } from "@/lib/server/db";
import AdminNav from "@/components/admin/AdminNav";
import { logout } from "../actions";
import styles from "@/components/admin/admin.module.css";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin();
  const { n } = requireDb().prepare("SELECT COUNT(*) AS n FROM submissions WHERE status = 'new'").get() as {
    n: number;
  };
  return (
    <div className={styles.shell}>
      <aside className={styles.side}>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- separate root layout / file download: full page load */}
        <a href="/admin" className={styles.brand}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="" />
          <span>
            <span className={styles.brandText}>UAECNE</span>
            <span className={styles.brandSub}>Website admin</span>
          </span>
        </a>
        <AdminNav unread={n} />
        <div className={styles.sideFoot}>
          <span>Signed in as {admin.username}</span>
          <a href="/" target="_blank" rel="noopener">
            View website ↗
          </a>
          <form action={logout}>
            <button className={styles.linkButton}>Sign out</button>
          </form>
        </div>
      </aside>
      <div className={styles.main}>{children}</div>
    </div>
  );
}
