import type { SchoolContent } from "@/data/schoolContent";
import styles from "./SchoolLanguages.module.css";

type SchoolLanguagesProps = {
  languages: SchoolContent["languages"];
};

// Centered eyebrow/heading + one intro line + a row of red-gradient
// language boxes ("English," "Arabic," "French"). No existing primitive
// fits — `ChurchPrograms` is a dot+label chip grid (no color-block
// treatment), and the mockup's own `.chips`/`.chip` CSS class is unused
// dead styling (never referenced in the markup) so it wasn't a real
// alternative shape to reuse either. Renders nothing when null. First
// used by Aleppo College for Girls's "Three Languages, One Curriculum."
//
// `eyebrow` doubles as the "bare" flag: when null, the header block and
// the wash-band/section padding are skipped entirely, leaving just the
// language-box row — Bethel Secondary School's lang-row sits embedded at
// the end of its own "Academics" section (no separate heading, no wash),
// unlike ACG's standalone section.
export default function SchoolLanguages({ languages }: SchoolLanguagesProps) {
  if (!languages) return null;

  const bare = languages.eyebrow === null;

  return (
    <section className={bare ? styles.bare : `${styles.wrap} wash-band`}>
      {!bare && (
        <div className={styles.centerHead}>
          <div className={styles.eyebrow}>{languages.eyebrow}</div>
          <h2 className={styles.heading}>{languages.heading}</h2>
        </div>
      )}
      {languages.intro && <p className={styles.intro}>{languages.intro}</p>}
      <div className={styles.row}>
        {languages.items.map((item, i) => (
          <div className={styles.lang} key={i}>
            <b>{item.label}</b>
            <span>Language</span>
          </div>
        ))}
      </div>
    </section>
  );
}
