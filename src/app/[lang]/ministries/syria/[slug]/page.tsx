import { getL } from "@/lib/i18n/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { syriaMinistries as syriaMinistries__en } from "@/data/syriaMinistries";
import { pageMetadata, summarize } from "@/lib/site";
import OutreachTopBlock from "@/components/outreach/OutreachTopBlock";
import RedLabelBlock from "@/components/outreach/RedLabelBlock";
import PullNote from "@/components/outreach/PullNote";
import StatSection from "@/components/outreach/StatSection";
import ProgramPills from "@/components/outreach/ProgramPills";
import OutreachCTA from "@/components/outreach/OutreachCTA";
import SchoolLeadershipGrid from "@/components/school/SchoolLeadershipGrid";
import SchoolContactSection from "@/components/school/SchoolContactSection";
import ChurchGalleryLightbox from "@/components/church/ChurchGalleryLightbox";

type PageParams = { slug: string };

export async function generateStaticParams() {
  const L = await getL();
  const syriaMinistries = L(syriaMinistries__en);
  return syriaMinistries.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const L = await getL();
  const syriaMinistries = L(syriaMinistries__en);
  const { slug } = await params;
  const page = syriaMinistries.find((m) => m.slug === slug);
  if (!page) return { title: "Syria — UAECNE" };
  return pageMetadata({
    title: `${page.title} — UAECNE`,
    description: summarize(page.intro.paragraphs[0]),
    image: page.heroPhoto?.src,
    path: `/ministries/syria/${slug}`,
  });
}

// One shared shape for the Community's ministries in Syria: top block,
// about, (verse), sections, figures, lists, people, contact, gallery, close.
export default async function SyriaMinistryPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const L = await getL();
  const syriaMinistries = L(syriaMinistries__en);
  const { slug } = await params;
  const page = syriaMinistries.find((m) => m.slug === slug);
  if (!page) notFound();

  return (
    <>
      <OutreachTopBlock
        crumbSection={page.crumbSection}
        crumbLabel={page.title.replace(" — Syria", "")}
        title={page.title}
        subtitlePlain={page.subtitlePlain}
        subtitleBold={page.subtitleBold}
        heroPhoto={page.heroPhoto}
        heroVariant="wide"
        heroIcon={page.heroIcon}
      />
      <RedLabelBlock label={page.intro.label} paragraphs={page.intro.paragraphs} />
      {page.verse && <PullNote eyebrow={page.verse.eyebrow} body={page.verse.body} />}
      {page.sections.map((section, i) => (
        <RedLabelBlock
          key={section.label}
          label={section.label}
          paragraphs={section.paragraphs}
          wash={i % 2 === 0}
        />
      ))}
      {page.stats && (
        <StatSection eyebrow={page.stats.eyebrow} heading={page.stats.heading} cards={page.stats.cards} />
      )}
      {page.lists.map((list) => (
        <ProgramPills
          key={list.heading}
          programs={{ eyebrow: list.eyebrow, eyebrowHy: null, heading: list.heading, headingHy: null, items: list.items }}
        />
      ))}
      <SchoolLeadershipGrid leaders={page.people} />
      <SchoolContactSection
        location={{ addressLines: page.contact.addressLines, addressLinesHy: null }}
        contactRows={page.contact.rows}
        schoolName={page.title}
        mapsUrl={page.contact.mapsUrl}
        social={page.social}
      />
      {page.gallery.length > 0 && (
        <ChurchGalleryLightbox
          gallery={{
            eyebrow: "In Pictures",
            eyebrowHy: null,
            heading: "Gallery",
            headingHy: null,
            photos: page.gallery.map((p) => ({ ...p, caption: null, captionHy: null })),
          }}
        />
      )}
      <OutreachCTA cta={{ heading: page.cta.heading, headingHy: null, body: page.cta.body, bodyHy: null, buttonLabel: null, buttonHref: null }} />
    </>
  );
}
