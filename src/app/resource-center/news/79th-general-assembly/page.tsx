import type { Metadata } from "next";
import Image from "next/image";
import Medallion from "@/components/shared/Medallion";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "The 79th General Assembly — UAECNE",
};

const galleryPhotos = [
  "/ga79-gallery-1.jpg",
  "/ga79-gallery-2.jpg",
  "/ga79-gallery-3.jpg",
  "/ga79-gallery-4.jpg",
  "/ga79-gallery-5.jpg",
  "/ga79-gallery-6.jpg",
];

export default function GeneralAssembly79Page() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image
            src="/ga79-hero.jpg"
            alt=""
            fill
            priority
            className={styles.heroImg}
          />
          <div className={styles.heroOverlay} />
        </div>
        <div className={styles.heroInner}>
          <span className={styles.eyebrow}>Beirut · 21–22 June 2026</span>
          <h1 className={styles.heroHeading}>The 79th General Assembly</h1>
          <p className={styles.heroSub}>
            The Union of the Armenian Evangelical Churches in the Near East
            gathered in Beirut this June for its 79th General Assembly,
            marking the 180th anniversary of the Armenian Evangelical Church
            with worship, reflection, and renewed commitment to its mission
            across the region.
          </p>
        </div>
      </section>

      <article className={styles.article}>
        <div className={styles.wrap}>
          <div className={styles.openGrid}>
            <div className={styles.bannerCard}>
              <div className={styles.logoSlot}>
                <Image
                  src="/ga79-anniversary-logo.jpg"
                  alt="Armenian Evangelical Church 180th Anniversary, 1846–2026"
                  width={120}
                  height={120}
                  className={styles.logoImg}
                />
              </div>
              <div className={styles.eb}>180th Anniversary</div>
              <h2 className={styles.bannerCardHeading}>
                79th General Assembly Marks 180 Years
              </h2>
            </div>
            <div className={styles.leadText}>
              <p className={styles.dropcap}>
                The 79th General Assembly of the Union of the Armenian
                Evangelical Churches in the Near East took place on 21–22
                June 2026 at the First Armenian Evangelical Church in Beirut.
              </p>
              <p>
                The Celebratory Worship service on the first evening marked
                the 180th anniversary of the Armenian Evangelical Church,
                drawing not only members of the Armenian Evangelical
                community but also religious, political, and societal
                representatives of the Lebanese and Lebanese-Armenian
                community.
              </p>
            </div>
          </div>

          <div className={styles.prow}>
            <figure className={styles.figure}>
              <div className={styles.img}>
                <Image
                  src="/ga79-portrait-haidostian.jpg"
                  alt="Dr. Paul Haidostian"
                  fill
                  className={styles.photo}
                />
              </div>
              <figcaption>Dr. Paul Haidostian</figcaption>
            </figure>
            <div className={styles.ptext}>
              <p>
                In his sermon, the Union&apos;s Acting President, Rev. Dr.
                Paul Haidostian, introduced the General Assembly&apos;s
                theme, &ldquo;Freedom of Conscience and Responsible
                Faith.&rdquo;
              </p>
              <p>
                On Monday morning, pastors, delegates, and guests gathered
                for the plenary sessions. Forty voting members were in
                attendance, a third of them joining online from outside
                Lebanon. Following the opening worship and messages of
                greeting from churches, organizations, and individuals,
                attendees viewed a historical slideshow before beginning the
                day&apos;s work under an abbreviated agenda due to current
                regional conditions.
              </p>
            </div>
          </div>

          <div className={styles.prow}>
            <figure className={styles.figure}>
              <div className={styles.img}>
                <Image
                  src="/ga79-portrait-cholakian.jpg"
                  alt="Rev. Vicken Cholakian"
                  fill
                  className={styles.photo}
                />
              </div>
              <figcaption>Rev. Vicken Cholakian</figcaption>
            </figure>
            <div className={styles.ptext}>
              <p>
                The President&apos;s and Central Committee&apos;s reports
                reflected on God&apos;s providence throughout the year&apos;s
                activities. Despite difficult regional conditions, the
                Union&apos;s churches, schools, university, and institutions
                continued to serve as the hands and heart of Christ. The
                financial report likewise testified to the strength the
                UAECNE has drawn upon in its various endeavors, prompting
                reflection among delegates on how to deepen their spiritual
                and material participation in the Union&apos;s work.
              </p>
            </div>
          </div>

          <div className={styles.pull}>
            <Medallion size={170} className={`${styles.med} ${styles.medL}`} />
            <Medallion size={170} className={`${styles.med} ${styles.medR}`} />
            <p className={styles.q}>
              &ldquo;Freedom of Conscience and Responsible Faith.&rdquo;
            </p>
            <div className={styles.flourish} />
            <div className={styles.attr}>General Assembly Theme · 2026</div>
          </div>

          <p className={styles.standalone}>
            The Assembly remembered those who had departed in the previous
            year, honoring the legacy of pastoral and lay leaders who shaped
            the life of the Union. As at every General Assembly, new Central
            Committee members were elected for three-year terms of service.
          </p>

          <div className={styles.prow}>
            <figure className={styles.figure}>
              <div className={styles.img}>
                <Image
                  src="/ga79-portrait-selimian.jpg"
                  alt="Rev. Dr. Haroutune Selimian"
                  fill
                  className={styles.photo}
                />
              </div>
              <figcaption>Rev. Dr. Haroutune Selimian</figcaption>
            </figure>
            <div className={styles.ptext}>
              <p>
                The gathering concluded that evening with a Service of Holy
                Communion. Rev. Dr. Haroutune Selimian&apos;s sermon called
                Armenian Evangelical individuals and churches to active and
                faithful living, and Rev. Jirair Ghazarian officiated at the
                Lord&apos;s Table.
              </p>
            </div>
          </div>

          <div className={`${styles.prow} ${styles.prowWide}`}>
            <figure className={`${styles.figure} ${styles.figureWide}`}>
              <div className={`${styles.img} ${styles.imgWide}`}>
                <Image
                  src="/ga79-communion-wide.jpg"
                  alt="Communion — Lord's Table"
                  fill
                  className={styles.photo}
                />
              </div>
              <figcaption>
                Rev. Jirair Ghazarian officiated at the Lord&apos;s Table.
              </figcaption>
            </figure>
            <div className={styles.ptext}>
              <p>
                The 79th General Assembly concluded with the hope that the
                next gathering would take place fully in person.
              </p>
            </div>
          </div>
        </div>
      </article>

      <section className={styles.showcase}>
        <div className={styles.secHead}>
          <div className={styles.rule} />
          <h2 className={styles.secHeading}>Official Picture</h2>
        </div>
        <div className={styles.official}>
          <div className={styles.officialImg}>
            <Image
              src="/ga79-official-picture.jpg"
              alt="Official group photo — 180th Anniversary"
              fill
              className={styles.photo}
            />
          </div>
        </div>
      </section>

      <section className={styles.gallery}>
        <div className={styles.secHead}>
          <div className={styles.rule} />
          <h2 className={styles.secHeading}>Gallery</h2>
        </div>
        <div className={styles.grid}>
          {galleryPhotos.map((src) => (
            <div key={src} className={styles.tile}>
              <Image src={src} alt="" fill className={styles.photo} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
