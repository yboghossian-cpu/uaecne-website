import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { churches } from "@/data/churches";
import { churchContent } from "@/data/churchContent";
import Medallion from "@/components/shared/Medallion";
import ChurchBreadcrumb from "@/components/church/ChurchBreadcrumb";
import ChurchTopBlock from "@/components/church/ChurchTopBlock";
import AnniversaryBand from "@/components/church/AnniversaryBand";
import ChurchAbout from "@/components/church/ChurchAbout";
import LeadershipGrid from "@/components/church/LeadershipGrid";
import ChurchHistory from "@/components/church/ChurchHistory";
import ChurchPrograms from "@/components/church/ChurchPrograms";
import SuccessionList from "@/components/church/SuccessionList";
import ChurchGallery from "@/components/church/ChurchGallery";
import ChurchContactSection from "@/components/church/ChurchContactSection";
import ChurchCTA from "@/components/church/ChurchCTA";
import styles from "./page.module.css";

type PageParams = { slug: string };

export function generateStaticParams() {
  return churches.map((church) => ({ slug: church.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const church = churches.find((c) => c.slug === slug);
  return { title: church ? `${church.name} — UAECNE` : "Church — UAECNE" };
}

export default async function ChurchDetailPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { slug } = await params;
  const church = churches.find((c) => c.slug === slug);

  // Should never actually trigger — every slug reaching this route was
  // generated from churches.ts's own 25 entries.
  if (!church) notFound();

  const content = churchContent[slug] ?? null;

  if (!content) {
    // 23 of 25 churches don't have a ChurchContent entry yet. Render the
    // real, already-verified directory data only — never invented prose,
    // never a 404.
    return (
      <>
        <ChurchBreadcrumb country={church.country} />
        <section className={styles.minimalTop}>
          <h1 className={styles.minimalHeading}>{church.name}</h1>
          <div className={styles.minimalMeta}>
            {church.address.split("\n")[0]}
            {church.estYear && (
              <>
                {" · Established "}
                <b className={styles.minimalEstYear}>{church.estYear}</b>
              </>
            )}
          </div>
          {church.pastor && (
            <p className={styles.minimalRow}>
              <span className={styles.minimalKey}>Pastor</span>
              {church.pastor}
            </p>
          )}
          {church.serviceTime && (
            <p className={styles.minimalRow}>
              <span className={styles.minimalKey}>Service Time</span>
              {church.serviceTime}
            </p>
          )}
        </section>
        <ChurchContactSection church={church} contactOverride={null} />
        <section className={styles.pending}>
          <Medallion size={64} className={styles.pendingGlyph} />
          <h2 className={styles.pendingHeading}>Full Page Content Coming Soon</h2>
          <p className={styles.pendingBody}>
            We&rsquo;re preparing a full profile for this church, including its
            history, leadership, and photos. The contact details above are
            accurate and up to date in the meantime.
          </p>
        </section>
      </>
    );
  }

  return (
    <>
      <ChurchBreadcrumb country={church.country} />
      <ChurchTopBlock
        church={church}
        masthead={content.masthead}
        logo={content.logo}
        heroPhoto={content.heroPhoto}
        factsBar={content.factsBar}
      />
      <AnniversaryBand anniversary={content.anniversary} />
      <ChurchAbout about={content.about} pastorCard={content.pastorCard} />
      <LeadershipGrid leaders={content.leadership} />
      <ChurchHistory history={content.history} />
      <ChurchPrograms programs={content.programs} />
      <SuccessionList succession={content.succession} />
      <ChurchGallery gallery={content.gallery} />
      <ChurchContactSection church={church} contactOverride={content.contactOverride} />
      <ChurchCTA cta={content.cta} />
    </>
  );
}
