import styles from "./ChurchFactsBar.module.css";

type Fact = {
  label: string;
  labelHy: string | null;
  sub: string;
  subHy: string | null;
};

type ChurchFactsBarProps = {
  facts: Fact[];
};

// Red-gradient 3-up strip directly under the hero photo.
export default function ChurchFactsBar({ facts }: ChurchFactsBarProps) {
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
