"use client";

import styles from "./Header.module.css";

// EN | ՀԱՅ switch. Remembers the choice in a cookie and reloads the page in
// that language (the address stays the same). When the Armenian version is
// not yet public, ՀԱՅ stays greyed out for visitors; someone previewing in
// Armenian can always switch back to English.
export default function LangSwitch({ lang, enabled }: { lang: "en" | "hy"; enabled: boolean }) {
  const go = (to: "en" | "hy") => {
    if (to === lang) return;
    document.cookie = `uaecne_lang=${to}; path=/; max-age=31536000; samesite=lax`;
    window.location.reload();
  };
  const hyActive = enabled || lang === "hy";
  return (
    <div className={styles.langToggle} role="group" aria-label="Language / Լեզու">
      <button
        type="button"
        className={`${styles.langBtn} ${lang === "en" ? styles.langActive : ""}`}
        aria-pressed={lang === "en"}
        lang="en"
        onClick={() => go("en")}
      >
        EN
      </button>
      <span aria-hidden="true">|</span>
      {hyActive ? (
        <button
          type="button"
          className={`${styles.langBtn} ${lang === "hy" ? styles.langActive : ""}`}
          aria-pressed={lang === "hy"}
          lang="hyw"
          onClick={() => go("hy")}
        >
          ՀԱՅ
        </button>
      ) : (
        <span className={styles.langInactive} aria-disabled="true" lang="hyw">
          ՀԱՅ
        </span>
      )}
    </div>
  );
}
