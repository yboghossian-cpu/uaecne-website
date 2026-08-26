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
import SpecialProjectBand from "@/components/church/SpecialProjectBand";
import SuccessionList from "@/components/church/SuccessionList";
import ChurchGallery from "@/components/church/ChurchGallery";
import ChurchGalleryLightbox from "@/components/church/ChurchGalleryLightbox";
import ChurchContactSection from "@/components/church/ChurchContactSection";
import ChurchCTA from "@/components/church/ChurchCTA";
import MilestoneBand from "@/components/church/MilestoneBand";
import VisionBand from "@/components/church/VisionBand";
import WorshipTodayNotice from "@/components/church/WorshipTodayNotice";
import WhiteChurchFeature from "@/components/church/WhiteChurchFeature";
import MilestoneTimeline from "@/components/church/MilestoneTimeline";
import styles from "./page.module.css";

// Slugs whose approved mockup has a real click-to-enlarge lightbox (see
// ChurchGalleryLightbox's own comment) — every other church keeps the
// plain, non-lightbox ChurchGallery.
const LIGHTBOX_GALLERY_SLUGS = new Set([
  "armenian-evangelical-bethel-church-aleppo",
  "armenian-protestant-emmanuel-church-aleppo",
  "syriac-evangelical-church-aleppo",
  "armenian-evangelical-holy-trinity-church-kessab",
  // Added 2026-08-26 — these 3 had real gallery photos but were never
  // added to this set, so they silently fell through to the plain,
  // non-clickable ChurchGallery (a per-page omission, not a missing
  // capability: ChurchGalleryLightbox already existed and was already
  // proven working on the 4 churches above).
  "armenian-evangelical-church-ashrafieh",
  "armenian-evangelical-martyrs-church-aleppo",
  "armenian-evangelical-church-of-keorkuneh",
]);

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

  // "Syria (Kessab)" is a display-grouping value, not real crumb text (see
  // churches/page.tsx's own `countryDisplayLabel` for the same split) — the
  // Kessab churches' own mockups show a 4th crumb segment ("Ministries ›
  // Churches › Syria › Kessab"), not a combined 3rd segment.
  const breadcrumbCountry = church.country === "Syria (Kessab)" ? "Syria" : church.country;
  const breadcrumbSubregion = church.country === "Syria (Kessab)" ? "Kessab" : null;

  if (!content) {
    // 23 of 25 churches don't have a ChurchContent entry yet. Render the
    // real, already-verified directory data only — never invented prose,
    // never a 404.
    return (
      <>
        <ChurchBreadcrumb country={breadcrumbCountry} subregion={breadcrumbSubregion} />
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
      <ChurchBreadcrumb country={breadcrumbCountry} subregion={breadcrumbSubregion} />
      <ChurchTopBlock
        church={church}
        masthead={content.masthead}
        logo={content.logo}
        heroPhoto={content.heroPhoto}
        factsBar={content.factsBar}
      />
      <AnniversaryBand anniversary={content.anniversary} />
      <ChurchAbout
        about={content.about}
        pastorCard={content.pastorCard}
        dropcap={content.about.dropcap}
        pullQuote={content.about.pullQuote}
        vacancyNote={content.about.vacancyNote}
      />
      <WorshipTodayNotice notice={content.worshipToday} />
      <ChurchContactSection church={church} contactOverride={content.contactOverride} />
      <LeadershipGrid
        leaders={content.leadership}
        eyebrow={content.leadershipEyebrow}
        note={content.leadershipNote}
      />
      <ChurchHistory history={content.history} />
      <WhiteChurchFeature feature={content.feature} />
      <MilestoneTimeline timeline={content.timeline} />
      <WorshipTodayNotice notice={content.kchag} variant="gold" />
      <ChurchPrograms programs={content.programs} />
      <SpecialProjectBand specialProject={content.specialProject} />
      <SuccessionList succession={content.succession} />
      <MilestoneBand milestone={content.milestone} />
      <VisionBand vision={content.vision} />
      {LIGHTBOX_GALLERY_SLUGS.has(slug) ? (
        <ChurchGalleryLightbox gallery={content.gallery} />
      ) : (
        <ChurchGallery gallery={content.gallery} />
      )}
      <ChurchCTA cta={content.cta} />
    </>
  );
}
