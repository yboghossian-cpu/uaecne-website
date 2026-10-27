import { getT } from "@/lib/i18n/server";
import { SOCIAL_ORDER, hasSocial, type SocialLinks as Links } from "@/lib/social";
import styles from "./SocialLinks.module.css";

// "Follow Us" row placed under the Location details on every institution
// page. Renders nothing when the institution has no verified accounts.
export default async function SocialLinks({ social, name }: { social: Links | null | undefined; name: string }) {
  const tx = await getT();
  if (!hasSocial(social)) return null;
  const items = SOCIAL_ORDER.filter((o) => (social[o.key] ?? "").trim());
  return (
    <div className={styles.wrap}>
      <span className={styles.key}>{tx("Follow Us")}</span>
      <ul className={styles.list}>
        {items.map((o) => (
          <li key={o.key}>
            <a
              href={social[o.key]}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.pill}
              aria-label={`${name} · ${o.label}`}
            >
              <svg className={styles.icon} aria-hidden="true">
                <use href={o.icon} />
              </svg>
              {tx(o.label)}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
