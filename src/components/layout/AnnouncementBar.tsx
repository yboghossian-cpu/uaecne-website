import Link from "next/link";
import { getSettings } from "@/lib/server/settings";
import styles from "./AnnouncementBar.module.css";

// Optional site-wide notice, switched on from Admin › Settings.
export default function AnnouncementBar() {
  const { announcement } = getSettings();
  if (!announcement.enabled || !announcement.text.trim()) return null;
  const external = /^https?:\/\//.test(announcement.linkUrl);
  return (
    <div className={styles.bar} role="region" aria-label="Announcement">
      <p className={styles.text}>
        {announcement.text}
        {announcement.linkUrl && announcement.linkLabel && (
          <>
            {" "}
            {external ? (
              <a href={announcement.linkUrl} className={styles.link} target="_blank" rel="noopener noreferrer">
                {announcement.linkLabel}
              </a>
            ) : (
              <Link href={announcement.linkUrl} className={styles.link}>
                {announcement.linkLabel}
              </Link>
            )}
          </>
        )}
      </p>
    </div>
  );
}
