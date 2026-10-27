import { requireAdmin } from "@/lib/server/auth";
import PasswordForm from "@/components/admin/PasswordForm";
import { logout } from "../../actions";
import styles from "@/components/admin/admin.module.css";

export default async function AccountPage() {
  const admin = await requireAdmin();
  return (
    <>
      <div className={styles.pageHead}>
        <div>
          <h1 className={styles.title}>Account</h1>
          <p className={styles.subtitle}>Signed in as {admin.username}.</p>
        </div>
        <form action={logout}>
          <button className={styles.btnGhost}>Sign out</button>
        </form>
      </div>
      <section className={styles.card}>
        <h2 className={styles.cardTitle}>Change password</h2>
        <PasswordForm />
      </section>
    </>
  );
}
