"use client";

import { useScrollReveal } from "./useScrollReveal";
import styles from "./StatsRow.module.css";

const stats = [
  { number: "180", label: "Years of Heritage" },
  { number: "30+", label: "Churches" },
  { number: "9", label: "Countries Served" },
  { number: "12+", label: "Institutions" },
];

export default function StatsRow() {
  const { ref, visible } = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} data-visible={visible} className={styles.stats}>
      <div className={styles.grid}>
        {stats.map((stat) => (
          <div key={stat.label} className={styles.stat}>
            <span className={styles.number}>{stat.number}</span>
            <span className={styles.label}>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
