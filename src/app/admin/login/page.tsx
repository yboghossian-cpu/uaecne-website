import { redirect } from "next/navigation";
import { getAdmin } from "@/lib/server/auth";
import LoginForm from "@/components/admin/LoginForm";
import styles from "@/components/admin/admin.module.css";

export default async function LoginPage() {
  if (await getAdmin()) redirect("/admin");
  return (
    <div className={styles.loginWrap}>
      <div className={styles.loginCard}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.svg" alt="" width={72} height={72} className={styles.loginLogo} />
        <h1 className={styles.loginTitle}>UAECNE Admin</h1>
        <LoginForm />
      </div>
    </div>
  );
}
