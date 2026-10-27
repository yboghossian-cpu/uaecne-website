import MediaLibrary from "@/components/admin/MediaLibrary";
import styles from "@/components/admin/admin.module.css";

export default function MediaPage() {
  return (
    <>
      <div className={styles.pageHead}>
        <div>
          <h1 className={styles.title}>Media</h1>
          <p className={styles.subtitle}>Upload photos and PDFs, then use them on any page or post.</p>
        </div>
      </div>
      <MediaLibrary />
    </>
  );
}
