import { getT } from "@/lib/i18n/server";
import Link from "next/link";
import { getSettings } from "@/lib/server/settings";
import styles from "./AnnouncementBar.module.css";

// Optional site-wide notice, switched on from Admin › Settings.
export default async function AnnouncementBar() {
  const tx = await getT();
  const { announcement } = getSettings();
  if (!announcement.enabled || !announcement.text.trim()) return null;
  const external = /^https?:\/\//.test(announcement.linkUrl);
  return (
    <div className={styles.bar} role="region" aria-label={tx("Announcement")}>
      <p className={styles.text}>
        {tx(announcement.text)}
        {announcement.linkUrl && announcement.linkLabel && (
          <>
            {" "}
            {external ? (
              <a href={announcement.linkUrl} className={styles.link} target="_blank" rel="noopener noreferrer">
                {tx(announcement.linkLabel)}
              </a>
            ) : (
              <Link href={announcement.linkUrl} className={styles.link}>
                {tx(announcement.linkLabel)}
              </Link>
            )}
          </>
        )}
      </p>
    </div>
  );
}
