import styles from "./PullNote.module.css";

type PullNoteProps = {
  eyebrow: string;
  body: string;
};

// Centered italic paragraph — shared shape behind Camps' "Purpose" and
// SAC's "Syrian Refugees" strip.
export default function PullNote({ eyebrow, body }: PullNoteProps) {
  return (
    <section className={styles.wrap}>
      <div className={styles.eyebrow}>{eyebrow}</div>
      <p className={styles.body}>{body}</p>
    </section>
  );
}
