import Image from "next/image";
import Link from "next/link";
import { getSettings, telHref } from "@/lib/server/settings";
import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();
  const { contact, social: links } = getSettings();
  const socialAll = [
    { label: "Facebook", href: links.facebook },
    { label: "YouTube", href: links.youtube },
    { label: "Instagram", href: links.instagram },
    { label: "X", href: links.x },
  ];
  const social = socialAll.filter((s) => s.href);
  const socialInactive = socialAll.filter((s) => !s.href).map((s) => s.label);
  const contactBlock = (lines: string[]) => (
    <div className={styles.contact}>
      {lines.map((line, i) => (
        <span key={i}>{line}</span>
      ))}
      {contact.email && <a href={`mailto:${contact.email}`}>{contact.email}</a>}
      {contact.phones.length > 0 && (
        <span className={styles.phones}>
          {contact.phones.map((p) => (
            <a key={p} href={telHref(p)}>
              {p}
            </a>
          ))}
        </span>
      )}
    </div>
  );

  return (
    <footer className={styles.footer}>
      <div className={styles.cols}>
        <div className={styles.contactCol}>
          <p className={styles.headOffice}>UAECNE — Head Office</p>
          <p className={styles.orgName}>
            Union of the Armenian Evangelical Churches in the Near East
          </p>

          {contactBlock(contact.addressEn)}
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
            Մերձաւոր Արեւելքի Հայ Աւետարանական Եկեղեցիներու Միութիւն
          </p>

          {contactBlock(contact.addressHy)}
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.linksRow}>
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

        <ul className={styles.social}>
          <li>
            <Link href="/news">News &amp; Events</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          <li>
            <Link href="/prayer-request">Prayer Request</Link>
          </li>
        </ul>
        </div>

        <p className={styles.copyright}>
          © {year} UAECNE. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
