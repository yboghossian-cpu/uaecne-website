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
            Union of the Armenian Evangelical Churches in the Near East
          </p>

          <div className={styles.contact}>
            <span>
              Kobayyat Street; Sector 67; Building # 228, Jeitawi Region,
              Ashrafieh, Beirut, Lebanon
            </span>
            <a href="tel:+9611443547">+961-1-443547</a>
            <a href="tel:+9611565628">+961-1-565628</a>
            <a href="mailto:office.director@uaecne.org">
              office.director@uaecne.org
            </a>
          </div>
        </div>

        <Image
          src="/logo.svg"
          alt=""
          width={96}
          height={96}
          className={styles.sealF}
        />

        <div className={styles.mirror}>
          <span className={styles.mirrorTag}>
            Western Armenian — verified copy pending
          </span>
          <br />
          Verified Western (Lebanese) Armenian copy will be placed here once
          supplied by Yeghia — never machine-translated, never Eastern
          Armenian.
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
