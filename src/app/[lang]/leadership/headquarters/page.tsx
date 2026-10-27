import { getT, getL } from "@/lib/i18n/server";
import type { Metadata } from "next";
import Image from "next/image";
import Medallion from "@/components/shared/Medallion";
import styles from "./page.module.css";
import {
  headquartersHero as headquartersHero__en,
  headquartersFacts as headquartersFacts__en,
  headquartersHouses as headquartersHouses__en,
  headquartersOffices as headquartersOffices__en,
  headquartersContact as headquartersContact__en,
} from "@/data/headquarters";

export const metadata: Metadata = {
  title: "Headquarters — UAECNE",
  description:
    "The UAECNE Head Office in the Geitawi section of Beirut — the administrative and spiritual centre of the Union of the Armenian Evangelical Churches in the Near East.",
};

export default async function HeadquartersPage() {
  const L = await getL();
  const headquartersContact = L(headquartersContact__en);
  const headquartersHero = L(headquartersHero__en);
  const headquartersFacts = L(headquartersFacts__en);
  const headquartersHouses = L(headquartersHouses__en);
  const headquartersOffices = L(headquartersOffices__en);
  const tx = await getT();
  const c = headquartersContact;

  return (
    <>
      {/* hero */}
      <section className={styles.chero}>
        <svg className={styles.medBg} aria-hidden="true">
          <use href="#med" />
        </svg>
        <div className={styles.cheroInner}>
          <div className={styles.crumb}>
            {tx("Union Leadership ")}<span>›</span>{tx(" Headquarters")}
          </div>
          <div className={styles.masthead}>
            <h1>{tx("Headquarters")}</h1>
          </div>
          <p className={styles.tagline}>
            {tx("The Union’s home in Beirut")}
          </p>
          <div className={styles.heroArt}>
            <div className={styles.arch}>
              <Image
                src={headquartersHero.photo}
                alt={headquartersHero.alt}
                fill
                className={styles.heroImg}
                sizes="(max-width: 760px) 100vw, 1080px"
                priority
              />
              <span className={styles.phTag}>{headquartersHero.caption}</span>
            </div>
          </div>
        </div>
      </section>

      {/* facts */}
      <section className={styles.facts}>
        <div className={styles.factsGrid}>
          {headquartersFacts.map((f) => (
            <div className={styles.fact} key={f.label}>
              <div className={styles.val}>{f.value}</div>
              <div className={styles.lbl}>{f.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* about */}
      <section className={styles.section}>
        <div className={styles.aboutTxt}>
          <div className={styles.eyebrowDot}>{tx("The Head Office")}</div>
          <h2>{tx("The Heart of the Union")}</h2>
          <p>
            {(() => { const t = tx("The UAECNE Headquarters, located in the Geitawi section of Beirut, Lebanon, serves as the administrative and spiritual centre of the Union of the Armenian Evangelical Churches in the Near East."); return <><span className={styles.dropcap}>{t.charAt(0)}</span>{t.slice(1)}</>; })()}
          </p>
          <p>
            {tx("Within its walls it houses the President’s office, personnel offices, a reception hall, and a meeting room, alongside the Educational Council office, the Publication office, the Court of First Appeals, the Christian Endeavor office, and residences.")}
          </p>
          <div className={styles.pullquote}>
            <p>{tx("One house from which a Union spanning seven countries is served.")}</p>
          </div>
        </div>
      </section>

      {/* what it houses */}
      <section className={`${styles.section} ${styles.wash}`}>
        <div className={styles.washInner}>
          <div className={styles.centerHead}>
            <div className={styles.eb}>{tx("Within These Walls")}</div>
            <h2>{tx("What the Headquarters Houses")}</h2>
            <div className={styles.flourish}>
              <span className={styles.ln} />
              <Medallion size={22} className={styles.med} />
              <span className={styles.ln} />
            </div>
          </div>
          <div className={styles.officesGrid}>
            {headquartersHouses.map((name) => (
              <div className={styles.office} key={name}>
<span className={styles.oDot} />
                <b>{name}</b>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* team */}
      <section className={styles.section}>
        <div className={styles.centerHead}>
          <div className={styles.eb}>{tx("At the Head Office")}</div>
          <h2>{tx("Our Team")}</h2>
          <div className={styles.flourish}>
            <span className={styles.ln} />
            <Medallion size={22} className={styles.med} />
            <span className={styles.ln} />
          </div>
        </div>

        {headquartersOffices.map((group) => (
          <div className={styles.orgGroup} key={group.office}>
            <div className={styles.orgHead}>
              <h4>{group.office}</h4>
              <span className={styles.rule} />
              {group.phone && (
                <span className={styles.ophone}>
                  <svg>
                    <use href="#ic-phone" />
                  </svg>
                  {group.phone}
                </span>
              )}
            </div>
            <div className={styles.roster}>
              {group.members.map((m) => (
                <div className={styles.rperson} key={m.name}>
                  <div className={styles.rpic}>
                    {m.photo ? (
                      <Image src={m.photo} alt={m.name} fill className={styles.rphoto} sizes="64px" />
                    ) : (
                      <span className={styles.glyph}>
                        <svg>
                          <use href="#ic-user" />
                        </svg>
                      </span>
                    )}
                  </div>
                  <div className={styles.rinfo}>
                    <b>{m.name}</b>
                    <div className={m.pending ? `${styles.role} ${styles.pend}` : styles.role}>
                      {m.title}
                    </div>
                    {m.email && <div className={styles.mail}>{m.email}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* contact */}
      <section className={styles.section}>
        <div className={styles.centerHead}>
          <div className={styles.eb}>{tx("Reach Us")}</div>
          <h2>{tx("Contact the Head Office")}</h2>
        </div>
        <div className={styles.contactWrap}>
          <div className={styles.contactGrid}>
            <div className={styles.cbox}>
              <h4>
                <svg>
                  <use href="#ic-pin" />
                </svg>{" "}
                {tx("Address")}
              </h4>
              <p className={styles.addrLine}>
                {c.addressLines.map((line, i) => (
                  <span key={line}>
                    {line}
                    {i < c.addressLines.length - 1 && <br />}
                  </span>
                ))}
              </p>
              <a className={styles.mapBtn} href={c.mapUrl} target="_blank" rel="noopener noreferrer">
                <svg>
                  <use href="#ic-pin" />
                </svg>{" "}
                {tx("View on Google Maps")}
              </a>
            </div>
            <div className={styles.cbox}>
              <h4>
                <svg>
                  <use href="#ic-mail" />
                </svg>{" "}
                {tx("Office")}
              </h4>
              <div className={styles.crow}>
                <svg>
                  <use href="#ic-mail" />
                </svg>
                <div>
                  <span className={styles.k}>{tx("Email")}</span>
                  <a href={`mailto:${c.email}`}>{c.email}</a>
                </div>
              </div>
              <div className={styles.crow}>
                <svg>
                  <use href="#ic-phone" />
                </svg>
                <div>
                  <span className={styles.k}>{tx("Phone")}</span>
                  <a href={`tel:${c.phones[0].replace(/[^+\d]/g, "")}`}>{c.phones[0]}</a> ·{" "}
                  <a href={`tel:${c.phones[1].replace(/[^+\d]/g, "")}`}>{c.phones[1]}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
