import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import PublicForm from "@/components/forms/PublicForm";
import { getSettings, telHref } from "@/lib/server/settings";
import { pageMetadata } from "@/lib/site";
import styles from "../formPage.module.css";

export const metadata: Metadata = pageMetadata({
  title: "Contact — UAECNE",
  description: "Contact the head office of the Union of the Armenian Evangelical Churches in the Near East.",
  path: "/contact",
});

export default function ContactPage() {
  const { contact } = getSettings();
  return (
    <>
      <PageHero title="Contact" subtitle="Get in touch with the UAECNE head office in Beirut." />
      <section className={styles.wrap}>
        <aside className={styles.info}>
          <p className={styles.eyebrow}>Head Office</p>
          <h2 className={styles.infoHeading}>Union of the Armenian Evangelical Churches in the Near East</h2>
          <address className={styles.address}>
            {contact.addressEn.map((line, i) => (
              <span key={i}>{line}</span>
            ))}
          </address>
          {contact.email && (
            <p className={styles.line}>
              <span className={styles.lineLabel}>Email</span>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </p>
          )}
          {contact.phones.length > 0 && (
            <p className={styles.line}>
              <span className={styles.lineLabel}>Phone</span>
              {contact.phones.map((p) => (
                <a key={p} href={telHref(p)}>
                  {p}
                </a>
              ))}
            </p>
          )}
        </aside>
        <div className={styles.card}>
          <h2 className={styles.cardHeading}>Send us a message</h2>
          <PublicForm form="contact" />
        </div>
      </section>
    </>
  );
}
