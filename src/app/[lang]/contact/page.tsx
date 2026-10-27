import { getT, getLang } from "@/lib/i18n/server";
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

export default async function ContactPage() {
  const tx = await getT();
  const { contact } = getSettings();
  const lang = await getLang();
  return (
    <>
      <PageHero title={tx("Contact")} subtitle={tx("Get in touch with the UAECNE head office in Beirut.")} />
      <section className={styles.wrap}>
        <aside className={styles.info}>
          <p className={styles.eyebrow}>{tx("Head Office")}</p>
          <h2 className={styles.infoHeading}>{tx("Union of the Armenian Evangelical Churches in the Near East")}</h2>
          <address className={styles.address}>
            {(lang === "hy" ? contact.addressHy : contact.addressEn).map((line, i) => (
              <span key={i}>{line}</span>
            ))}
          </address>
          {contact.email && (
            <p className={styles.line}>
              <span className={styles.lineLabel}>{tx("Email")}</span>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </p>
          )}
          {contact.phones.length > 0 && (
            <p className={styles.line}>
              <span className={styles.lineLabel}>{tx("Phone")}</span>
              {contact.phones.map((p) => (
                <a key={p} href={telHref(p)}>
                  {p}
                </a>
              ))}
            </p>
          )}
        </aside>
        <div className={styles.card}>
          <h2 className={styles.cardHeading}>{tx("Send us a message")}</h2>
          <PublicForm form="contact" />
        </div>
      </section>
    </>
  );
}
