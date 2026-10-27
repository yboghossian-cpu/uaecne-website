import { getLang, getT } from "@/lib/i18n/server";
import Image from "next/image";
import Link from "next/link";
import Nav from "./Nav";
import LangSwitch from "./LangSwitch";
import { getSettings } from "@/lib/server/settings";
import styles from "./Header.module.css";

export default async function Header() {
  const tx = await getT();
  const { donateUrl, armenianLive } = getSettings();
  const lang = await getLang();
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logoLink} aria-label={tx("Home")}>
          <Image
            src="/logo.svg"
            alt={tx("Union of the Armenian Evangelical Churches in the Near East")}
            width={48}
            height={48}
            priority
          />
        </Link>

        <div className={styles.controls}>
          <LangSwitch lang={lang} enabled={armenianLive} />
          <Nav />
          {donateUrl ? (
            <a href={donateUrl} className={styles.donateButton} target="_blank" rel="noopener noreferrer">
              {tx("Donate")}
            </a>
          ) : (
            <span role="button" aria-disabled="true" className={styles.donateButton}>
              {tx("Donate")}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
