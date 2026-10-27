import type { Metadata } from "next";
import Image from "next/image";
import Medallion from "@/components/shared/Medallion";
import Ga79Gallery from "./Ga79Gallery";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "The 79th General Assembly — UAECNE",
  description:
    "The Union of the Armenian Evangelical Churches in the Near East gathered in Beirut, 21–22 June 2026, for its 79th General Assembly, marking the 180th anniversary of the Armenian Evangelical Church.",
};

export default function GeneralAssembly79Page() {
  return (
    <div className={styles.pg}>
      {/* HERO */}
      <header className={styles.heroWrap}>
        <Image src="/ga79-hero.jpg" alt="" fill className={styles.heroImg} sizes="100vw" priority />
        <div className={styles.heroOverlay} />
        <span className={`${styles.corner} ${styles.tl}`} />
        <span className={`${styles.corner} ${styles.br}`} />
        <div className={styles.heroInner}>
          <div className={styles.heroEyebrow}>Beirut · 21–22 June 2026</div>
          <h1 className={styles.heroTitle}>The 79th General Assembly</h1>
          <p className={styles.heroSub}>
            The Union of the Armenian Evangelical Churches in the Near East gathered in Beirut this
            June for its 79th General Assembly, marking the 180th anniversary of the Armenian
            Evangelical Church with worship, reflection, and renewed commitment to its mission across
            the region.
          </p>
        </div>
      </header>

      {/* OPENING / ANNIVERSARY */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.openGrid}>
            <div className={styles.plate}>
              <div className={styles.plateLogo}>
                <Image
                  src="/ga79-anniversary-logo.jpg"
                  alt="Armenian Evangelical Church 180th Anniversary, 1846–2026"
                  fill
                  sizes="110px"
                />
              </div>
              <div className={styles.plateEyebrow}>180th Anniversary</div>
              <p className={styles.plateTitle}>
                79th General Assembly
                <br />
                Marks 180 Years
              </p>
            </div>
            <div className={styles.leadCol}>
              <p>
                <span className={styles.dropcap}>T</span>he 79th General Assembly of the Union of the
                Armenian Evangelical Churches in the Near East took place on 21–22 June 2026 at the
                First Armenian Evangelical Church in Beirut.
              </p>
              <p>
                The Celebratory Worship service on the first evening marked the 180th anniversary of
                the Armenian Evangelical Church, drawing not only members of the Armenian Evangelical
                community but also religious, political, and societal representatives of the Lebanese
                and Lebanese-Armenian community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HAIDOSTIAN ROW */}
      <section className={styles.section} style={{ paddingTop: 0 }}>
        <div className={styles.row}>
          <div className={styles.rowFrame}>
            <figure>
              <div className={styles.frame}>
                <div className={styles.inner}>
                  <Image src="/ga79-portrait-haidostian.jpg" alt="Dr. Paul Haidostian" fill sizes="210px" />
                </div>
              </div>
              <figcaption>Dr. Paul Haidostian</figcaption>
            </figure>
          </div>
          <div className={styles.rowText}>
            <p className={styles.lede}>
              In his sermon, the Union’s Acting President, Rev. Dr. Paul Haidostian, introduced the
              General Assembly’s theme, “Freedom of Conscience and Responsible Faith.”
            </p>
            <p>
              On Monday morning, pastors, delegates, and guests gathered for the plenary sessions.
              Forty voting members were in attendance, a third of them joining online from outside
              Lebanon. Following the opening worship and messages of greeting from churches,
              organizations, and individuals, attendees viewed a historical slideshow before beginning
              the day’s work under an abbreviated agenda due to current regional conditions.
            </p>
          </div>
        </div>
      </section>

      {/* CHOLAKIAN ROW */}
      <section className={styles.section} style={{ paddingTop: 0 }}>
        <div className={styles.row}>
          <div className={styles.rowFrame}>
            <figure>
              <div className={styles.frame}>
                <div className={styles.inner}>
                  <Image src="/ga79-portrait-cholakian.jpg" alt="Rev. Vicken Cholakian" fill sizes="210px" />
                </div>
              </div>
              <figcaption>Rev. Vicken Cholakian</figcaption>
            </figure>
          </div>
          <div className={styles.rowText}>
            <p>
              The President’s and Central Committee’s reports reflected on God’s providence throughout
              the year’s activities. Despite difficult regional conditions, the Union’s churches,
              schools, university, and institutions continued to serve as the hands and heart of
              Christ. The financial report likewise testified to the strength the UAECNE has drawn upon
              in its various endeavors, prompting reflection among delegates on how to deepen their
              spiritual and material participation in the Union’s work.
            </p>
          </div>
        </div>
      </section>

      {/* THEME BAND */}
      <section className={styles.themeBand}>
        <Medallion size={210} className={`${styles.med} ${styles.l}`} />
        <Medallion size={210} className={`${styles.med} ${styles.r}`} />
        <div className={styles.themeInner}>
          <div className={styles.lead}>General Assembly Theme · 2026</div>
          <p className={styles.themeQuote}>
            <span className={styles.qm}>“</span>Freedom of Conscience and Responsible Faith
            <span className={styles.qm}>”</span>
          </p>
          <div className={styles.themeAttr}>Introduced by Rev. Dr. Paul Haidostian</div>
        </div>
      </section>

      {/* SOLO PARAGRAPH */}
      <section className={styles.section}>
        <div className={styles.soloPara}>
          <div className={styles.flourish}>
            <span className={styles.ln} />
            <span className={styles.dia} />
            <Medallion size={30} className={styles.med} />
            <span className={styles.dia} />
            <span className={`${styles.ln} ${styles.r}`} />
          </div>
          <p>
            The Assembly remembered those who had departed in the previous year, honoring the legacy of
            pastoral and lay leaders who shaped the life of the Union. As at every General Assembly, new
            Central Committee members were elected for three-year terms of service.
          </p>
        </div>
      </section>

      {/* SELIMIAN ROW */}
      <section className={styles.section} style={{ paddingTop: 0 }}>
        <div className={styles.row}>
          <div className={styles.rowFrame}>
            <figure>
              <div className={styles.frame}>
                <div className={styles.inner}>
                  <Image src="/ga79-portrait-selimian.jpg" alt="Rev. Dr. Haroutune Selimian" fill sizes="210px" />
                </div>
              </div>
              <figcaption>Rev. Dr. Haroutune Selimian</figcaption>
            </figure>
          </div>
          <div className={styles.rowText}>
            <p>
              The gathering concluded that evening with a Service of Holy Communion. Rev. Dr. Haroutune
              Selimian’s sermon called Armenian Evangelical individuals and churches to active and
              faithful living, and Rev. Jirair Ghazarian officiated at the Lord’s Table.
            </p>
          </div>
        </div>
      </section>

      {/* COMMUNION FEATURE */}
      <section className={styles.section} style={{ paddingTop: 0 }}>
        <div className={styles.feature}>
          <figure>
            <div className={styles.fFrame}>
              <div className={styles.inner}>
                <Image src="/ga79-communion-wide.jpg" alt="Communion — Lord’s Table" fill sizes="(max-width: 760px) 100vw, 900px" />
              </div>
            </div>
            <figcaption>Rev. Jirair Ghazarian officiated at the Lord’s Table.</figcaption>
          </figure>
        </div>
      </section>

      {/* CONCLUDING LINE */}
      <section className={styles.section} style={{ paddingTop: 0 }}>
        <div className={styles.concl}>
          <div className={styles.flourish}>
            <span className={styles.ln} />
            <Medallion size={30} className={styles.med} />
            <span className={`${styles.ln} ${styles.r}`} />
          </div>
          <p>
            The 79th General Assembly concluded with the hope that the next gathering would take place
            fully in person.
          </p>
        </div>
      </section>

      {/* OFFICIAL PICTURE */}
      <section className={`${styles.section} ${styles.official}`}>
        <div className={styles.centerHead}>
          <div className={styles.eyebrow}>Commemoration</div>
          <h2>Official Picture</h2>
        </div>
        <div className={styles.officialFrame}>
          <div className={styles.inner}>
            <Image
              src="/ga79-official-picture.jpg"
              alt="Official group photo — 180th Anniversary"
              fill
              sizes="(max-width: 760px) 100vw, 960px"
            />
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className={styles.section}>
        <div className={styles.centerHead}>
          <div className={styles.eyebrow}>In Pictures</div>
          <h2>Gallery</h2>
        </div>
        <Ga79Gallery />
      </section>
    </div>
  );
}
