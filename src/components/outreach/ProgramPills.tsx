import type { YouthWorkContent } from "@/data/outreachContent";
import styles from "./ProgramPills.module.css";

type ProgramPillsProps = {
  programs: YouthWorkContent["programs"];
};

// Flex-wrap pill list — "Programs & Activities," Youth Work-only.
export default function ProgramPills({ programs }: ProgramPillsProps) {
  return (
    <section className={styles.wrap}>
      <div className={styles.eyebrow}>{programs.eyebrow}</div>
      <h2 className={styles.heading}>{programs.heading}</h2>
      <div className={styles.list}>
        {programs.items.map((item, i) => (
          <span className={styles.pill} key={i}>
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
