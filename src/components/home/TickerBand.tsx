import styles from "./TickerBand.module.css";

const phrases = [
  "ROOTED IN FAITH SINCE 1846",
  "HEADQUARTERED IN BEIRUT",
  "SERVING THE NEAR EAST",
  "180 YEARS OF HERITAGE",
  "GLORY TO GOD ALONE",
  "UNION OF THE ARMENIAN EVANGELICAL CHURCHES IN THE NEAR EAST",
];

function TickerContent({ keyPrefix }: { keyPrefix: string }) {
  return (
    <>
      {phrases.map((phrase, i) => (
        <span key={`${keyPrefix}-${i}`} className={styles.item}>
          {phrase}
          <span aria-hidden="true"> • </span>
        </span>
      ))}
    </>
  );
}

export default function TickerBand() {
  return (
    <div className={styles.ticker}>
      <div className={styles.track}>
        <TickerContent keyPrefix="a" />
        <span className={styles.duplicate} aria-hidden="true">
          <TickerContent keyPrefix="b" />
        </span>
      </div>
    </div>
  );
}
