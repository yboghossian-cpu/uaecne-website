import Link from "next/link";
import { getChurches, getSchools, getAllChurchContent, getAllSchoolContent, isBuiltIn } from "@/lib/server/content";
import { requireDb } from "@/lib/server/db";
import NewEntryForm from "./NewEntryForm";
import styles from "./admin.module.css";

export default function EntryList({ kind, q }: { kind: "church" | "school"; q?: string }) {
  const list = kind === "church" ? getChurches() : getSchools();
  const content = kind === "church" ? getAllChurchContent() : getAllSchoolContent();
  const db = requireDb();
  const edited = new Set(
    (
      db.prepare("SELECT key FROM docs WHERE collection IN (?, ?)").all(`${kind}-dir`, `${kind}-page`) as {
        key: string;
      }[]
    ).map((r) => r.key),
  );
  const plural = kind === "church" ? "churches" : "schools";
  const filtered = q ? list.filter((e) => `${e.name} ${e.country}`.toLowerCase().includes(q.toLowerCase())) : list;
  const countries = [...new Set(list.map((e) => e.country))];

  return (
    <>
      <div className={styles.pageHead}>
        <div>
          <h1 className={styles.title}>{kind === "church" ? "Churches" : "Schools"}</h1>
          <p className={styles.subtitle}>
            Click a {kind} to edit its page: text, leaders, contacts, service times and photos.
          </p>
        </div>
        <form className={styles.row}>
          <input
            name="q"
            defaultValue={q}
            placeholder={`Search ${plural}…`}
            className={`${styles.input} ${styles.search}`}
          />
        </form>
      </div>
      <section className={styles.card}>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Country</th>
                <th>Page</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {filtered.map((e) => (
                <tr key={e.slug}>
                  <td>
                    <Link href={`/admin/${plural}/${e.slug}`}>{e.name}</Link>
                  </td>
                  <td className={styles.muted}>{e.country}</td>
                  <td>
                    {content[e.slug] ? (
                      <span className={styles.pillGreen}>Full page</span>
                    ) : (
                      <span className={styles.pillGrey}>Directory only</span>
                    )}{" "}
                    {edited.has(e.slug) && <span className={styles.pillGold}>Edited</span>}{" "}
                    {!isBuiltIn(kind, e.slug) && <span className={styles.pill}>Added</span>}
                  </td>
                  <td>
                    <a href={`/${plural}/${e.slug}`} target="_blank" rel="noopener" className={styles.muted}>
                      View ↗
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className={styles.card}>
        <h2 className={styles.cardTitle}>Add a {kind}</h2>
        <NewEntryForm kind={kind} countries={countries} />
      </section>
    </>
  );
}
