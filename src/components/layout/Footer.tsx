import Image from "next/image";
import styles from "./Footer.module.css";

const social = [
  { label: "Facebook", href: "https://www.facebook.com/UAECNE" },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCuK0j_A_Wx0oyNYvWJv5Ngg",
  },
];

const socialInactive = ["Instagram", "X"];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.cols}>
        <div className={styles.contactCol}>
          <p className={styles.headOffice}>UAECNE — Head Office</p>
          <p className={styles.orgName}>
            Union of the Armenian Evangelical Churches in the Near East, Est.
            1846
          </p>

          <div className={styles.contact}>
            <span>Kobayyat Street; Sector 67; Building # 228</span>
            <span>Jeitawi Region, Ashrafieh</span>
            <span>Beirut, Lebanon</span>
            <a href="mailto:office.director@uaecne.org">
              office.director@uaecne.org
            </a>
            <span className={styles.phones}>
              <a href="tel:+9611443547">+961-1-443547</a>
              <a href="tel:+9611565628">+961-1-565628</a>
            </span>
          </div>
        </div>

        <Image
          src="/logo.svg"
          alt=""
          width={96}
          height={96}
          className={styles.sealF}
        />

        {/* Verified Western Armenian copy, supplied and approved — reproduced
            verbatim, never machine-translated, never Eastern Armenian. */}
        <div
          className={`${styles.contactCol} ${styles.armenianCol}`}
          lang="hyw"
        >
          <p className={styles.headOffice}>ՄԱՀԱԵՄ — Կեդրոնական Գրասենեակ</p>
          <p className={styles.orgName}>
            Մերձաւոր Արեւելքի Հայ Աւետարանական Եկեղեցիներու Միութիւն, Հիմն.
            1846
          </p>

          <div className={styles.contact}>
            <span>Քոպայէթ փողոց, Սեկտոր 67, Շէնք թիւ 228</span>
            <span>Ժէյթաուի շրջան, Աշրաֆիէ</span>
            <span>Պէյրութ, Լիբանան</span>
            <a href="mailto:office.director@uaecne.org">
              office.director@uaecne.org
            </a>
            <span className={styles.phones}>
              <a href="tel:+9611443547">+961-1-443547</a>
              <a href="tel:+9611565628">+961-1-565628</a>
            </span>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <ul className={styles.social}>
          {social.map((item) => (
            <li key={item.label}>
              <a href={item.href} target="_blank" rel="noopener noreferrer">
                {item.label}
              </a>
            </li>
          ))}
          {socialInactive.map((label) => (
            <li key={label}>
              <span className={styles.socialInactive} aria-disabled="true">
                {label}
              </span>
            </li>
          ))}
        </ul>

        <p className={styles.copyright}>
          © {year} UAECNE. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
