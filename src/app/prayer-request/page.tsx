import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import PublicForm from "@/components/forms/PublicForm";
import { pageMetadata } from "@/lib/site";
import styles from "../formPage.module.css";

export const metadata: Metadata = pageMetadata({
  title: "Prayer Request — UAECNE",
  description: "Send a prayer request to the Union of the Armenian Evangelical Churches in the Near East.",
  path: "/prayer-request",
});

export default function PrayerRequestPage() {
  return (
    <>
      <PageHero title="Prayer Request" subtitle="Share your prayer request with the Union." />
      <section className={`${styles.wrap} ${styles.single}`}>
        <div className={styles.card}>
          <h2 className={styles.cardHeading}>Your prayer request</h2>
          <PublicForm form="prayer" />
        </div>
      </section>
    </>
  );
}
