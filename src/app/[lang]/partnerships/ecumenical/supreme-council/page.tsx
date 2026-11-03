import { getT } from "@/lib/i18n/server";
import type { Metadata } from "next";
import Image from "next/image";
import Medallion from "@/components/shared/Medallion";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Supreme Council of Evangelical Community in Syria and Lebanon — UAECNE",
  description:
    "The Supreme Council includes all the Evangelical churches in Lebanon and Syria. It was established in 1937 and is mainly concerned with the civil rights of Evangelical church members and their representation in public life.",
};

// Source: UNION/3. Partnerships/1. Ecumenical Partners/1. Supreme Council/Content of page.txt
const MEMBERS = [
  "National Evangelical Synod in Syria and Lebanon",
  "Union of the Armenian Evangelical Churches in the Near East",
  "National Evangelical Church in Beirut",
  "Evangelical Synod of the Church of God in Lebanon and Syria",
  "All Saints Evangelical Episcopal Church in Beirut",
  "Convention of the Evangelical Baptist Churches in Lebanon",
  "Seventh-day Adventist Church in Lebanon",
  "National Evangelical Christian Alliance Church in Syria and Lebanon",
  "Council of the Evangelical Brethren Church in Lebanon and Syria",
  "General Synod of the Evangelical Church of the Nazarene in Lebanon",
  "Friends Evangelical Church in Lebanon",
  "Union of Evangelical Baptist Churches in Syria",
  "Free Evangelical Church",
  "National Evangelical Church in Bludan",
  "Council of the Biblical Evangelical Churches in Lebanon and Syria",
];

const ASSOCIATES = [
  "German-speaking Evangelical Community Church in Beirut",
  "Church of the French-speaking Evangelical Community in Beirut",
];

const OURS = "Union of the Armenian Evangelical Churches in the Near East";

export default async function SupremeCouncilPage() {
  const tx = await getT();

  return (
    <div className={styles.page}>
      <div className={styles.crumb}>
        <span>{tx("Partnerships")}</span>
        <span className={styles.sep} aria-hidden="true">
          ›
        </span>
        <span>{tx("Ecumenical Partners")}</span>
      </div>

      {/* ---------- masthead ---------- */}
      <header className={styles.masthead}>
        <Medallion size={260} className={styles.wm} />
        <div className={styles.mastText}>
          <p className={styles.eyebrow}>{tx("Ecumenical Partner")}</p>
          <h1 className={styles.heading}>{tx("Supreme Council of Evangelical Community in Syria and Lebanon")}</h1>
          <p className={styles.lead}>
            {tx("This Council includes all the Evangelical churches in Lebanon and Syria.")}
          </p>
        </div>
        <div className={styles.logoCard}>
          <Image
            src="/partner-supreme-council-logo.jpg"
            alt={tx("Emblem of the Supreme Council of the Evangelical Community in Syria and Lebanon")}
            width={1200}
            height={501}
            className={styles.logo}
            priority
          />
        </div>
      </header>

      {/* ---------- facts ---------- */}
      <div className={styles.facts}>
        <div className={styles.fact}>
          <span className={styles.factValue}>1937</span>
          <span className={styles.factLabel}>{tx("Established")}</span>
        </div>
        <div className={styles.fact}>
          <span className={styles.factValue}>{MEMBERS.length}</span>
          <span className={styles.factLabel}>{tx("Member church bodies")}</span>
        </div>
        <div className={styles.fact}>
          <span className={styles.factValue}>{ASSOCIATES.length}</span>
          <span className={styles.factLabel}>{tx("Associate members")}</span>
        </div>
        <div className={styles.fact}>
          <span className={`${styles.factValue} ${styles.factWord}`}>{tx("Lebanon & Syria")}</span>
          <span className={styles.factLabel}>{tx("Serving")}</span>
        </div>
      </div>

      {/* ---------- about + leadership ---------- */}
      <section className={styles.about}>
        <div className={styles.aboutText}>
          <h2 className={styles.h2}>{tx("About the Council")}</h2>
          <p>
            {tx(
              "The Supreme Council was established in 1937 and is mainly concerned with the affairs of Evangelical church members in Lebanon and Syria regarding their civil rights and safeguarding their representation in public life.",
            )}
          </p>
          <p>
            {tx(
              "Its current president is Rev. Joseph Kassab. Until his retirement in 2022 the secretary of its Executive Council was Rev. Mgrdich Karagoezian, who was replaced by Rev. Salim Sabounji.",
            )}
          </p>
        </div>
        <aside className={styles.people} aria-label={tx("Leadership")}>
          <div className={styles.person}>
            <span className={styles.role}>{tx("President")}</span>
            <span className={styles.name}>{tx("Rev. Joseph Kassab")}</span>
          </div>
          <div className={styles.person}>
            <span className={styles.role}>{tx("Secretary of the Executive Council")}</span>
            <span className={styles.name}>{tx("Rev. Salim Sabounji")}</span>
            <span className={styles.note}>{tx("Succeeded Rev. Mgrdich Karagoezian on his retirement in 2022")}</span>
          </div>
        </aside>
      </section>

      {/* ---------- member churches ---------- */}
      <section className={styles.members}>
        <div className={styles.membersHead}>
          <p className={styles.eyebrowCenter}>{tx("Member Churches")}</p>
          <h2 className={styles.h2Center}>{tx("The Supreme Council includes the following church bodies:")}</h2>
        </div>
        <ol className={styles.list}>
          {MEMBERS.map((m, i) => (
            <li key={m} className={m === OURS ? `${styles.item} ${styles.ours}` : styles.item}>
              <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
              <span className={styles.itemName}>{tx(m)}</span>
              {m === OURS && <span className={styles.badge}>{tx("Our Union")}</span>}
            </li>
          ))}
        </ol>
        <h3 className={styles.h3}>{tx("Associate members")}</h3>
        <ul className={styles.list}>
          {ASSOCIATES.map((m) => (
            <li key={m} className={`${styles.item} ${styles.assoc}`}>
              <span className={styles.num} aria-hidden="true">
                +
              </span>
              <span className={styles.itemName}>{tx(m)}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
