import Image from "next/image";
import Link from "next/link";
import Nav from "./Nav";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logoLink} aria-label="Home">
          <Image
            src="/logo.svg"
            alt="Union of the Armenian Evangelical Churches in the Near East"
            width={48}
            height={48}
            priority
          />
        </Link>

        <div className={styles.controls}>
          <div className={styles.langToggle} aria-label="Language">
            <span className={styles.langActive} aria-current="true">
              EN
            </span>
            <span aria-hidden="true">|</span>
            <span className={styles.langInactive} aria-disabled="true">
              ՀԱՅ
            </span>
          </div>
          <Nav />
        </div>
      </div>
    </header>
  );
}
