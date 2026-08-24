import type { ChurchContent } from "@/data/churchContent";
import styles from "./WorshipTodayNotice.module.css";

type WorshipTodayNoticeProps = {
  notice: ChurchContent["worshipToday"];
};

// Bordered ivory card inside a wash section — an honest "here's where
// worship actually happens now" notice for an inactive church, distinct
// from `ChurchAbout`'s small `vacancyNote` pill (a single-sentence status,
// not a paragraph with its own heading) and from every full section module
// (no eyebrow, no h2). Renders nothing when null. `boldPhrase`, when set,
// is a verbatim substring of `body` rendered in bold — matching the
// reference's own inline emphasis, not a separate invented field.
export default function WorshipTodayNotice({ notice }: WorshipTodayNoticeProps) {
  if (!notice) return null;

  const parts = notice.boldPhrase ? notice.body.split(notice.boldPhrase) : null;

  return (
    <section className={styles.wrap}>
      <div className={styles.card}>
        <h4 className={styles.heading}>{notice.heading}</h4>
        <p className={styles.body}>
          {parts ? (
            <>
              {parts[0]}
              <b>{notice.boldPhrase}</b>
              {parts[1]}
            </>
          ) : (
            notice.body
          )}
        </p>
      </div>
    </section>
  );
}
