import { getT, type T } from "@/lib/i18n/server";
import styles from "./TickerBand.module.css";

const phrases = [
  "ROOTED IN FAITH SINCE 1846",
  "HEADQUARTERED IN BEIRUT",
  "SERVING THE NEAR EAST",
  "180 YEARS OF HERITAGE",
  "GLORY TO GOD ALONE",
  "UNION OF THE ARMENIAN EVANGELICAL CHURCHES IN THE NEAR EAST",
];

function TickerContent({ keyPrefix, tx }: { keyPrefix: string; tx: T }) {
  return (
    <>
      {phrases.map((phrase, i) => (
        <span key={`${keyPrefix}-${i}`} className={styles.item}>
          {tx(phrase)}
          <span aria-hidden="true"> • </span>
        </span>
      ))}
    </>
  );
}

export default async function TickerBand() {
  const tx = await getT();
  return (
    <div className={styles.ticker}>
      <div className={styles.track}>
        <TickerContent keyPrefix="a" tx={tx} />
        <span className={styles.duplicate} aria-hidden="true">
          <TickerContent keyPrefix="b" tx={tx} />
        </span>
      </div>
    </div>
  );
}
