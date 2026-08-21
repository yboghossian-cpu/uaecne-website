import styles from "./SchoolFactsBar.module.css";

type Fact = {
  label: string;
  labelHy: string | null;
  sub: string;
  subHy: string | null;
};

type SchoolFactsBarProps = {
  facts: Fact[];
};

// Red-gradient 4-up strip directly under the hero photo — same visual
// shape as ChurchFactsBar (label + sub, gold-on-red), 4 columns instead of
// 3 per uaecne-school-aec-reference.html's .facts.
export default function SchoolFactsBar({ facts }: SchoolFactsBarProps) {
  return (
    <div className={styles.facts}>
      {facts.map((fact, i) => (
        <div className={styles.fact} key={i}>
          <div className={styles.label}>{fact.label}</div>
          <div className={styles.sub}>{fact.sub}</div>
        </div>
      ))}
    </div>
  );
}
