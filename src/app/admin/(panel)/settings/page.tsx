import SettingsForm from "@/components/admin/SettingsForm";
import { getSettings } from "@/lib/server/settings";
import { mailConfigured } from "@/lib/server/mail";
import styles from "@/components/admin/admin.module.css";

export default function SettingsPage() {
  return (
    <>
      <div className={styles.pageHead}>
        <div>
          <h1 className={styles.title}>Settings</h1>
          <p className={styles.subtitle}>Site-wide details shown in the header, footer and contact page.</p>
        </div>
      </div>
      <SettingsForm settings={getSettings()} mailOn={mailConfigured()} />
    </>
  );
}
