import { getL } from "@/lib/i18n/server";
import Hero from "@/components/home/Hero";
import TickerBand from "@/components/home/TickerBand";
import StatsRow from "@/components/home/StatsRow";
import SacredLegacy from "@/components/home/SacredLegacy";
import MinistriesGrid from "@/components/home/MinistriesGrid";
import News from "@/components/home/News";
import SpiritualHeritage from "@/components/home/SpiritualHeritage";
import DonateBand from "@/components/home/DonateBand";
import { getHomepagePost, postHref } from "@/lib/server/posts";
import { getSettings } from "@/lib/server/settings";

export default async function Home() {
  // "Latest Updates" shows the featured (else newest) post from Admin › News.
  const L = await getL();
  const post = L(getHomepagePost());
  const { donateUrl } = getSettings();
  return (
    <>
      <Hero />
      <TickerBand />
      <StatsRow />
      <SacredLegacy />
      <MinistriesGrid />
      {post && (
        <News
          post={{
            title: post.title,
            kicker: post.kicker,
            tag: post.tag,
            excerpt: post.excerpt,
            cover: post.cover,
            coverAlt: post.cover_alt,
            href: postHref(post),
          }}
        />
      )}
      <SpiritualHeritage />
      <DonateBand donateUrl={donateUrl} />
    </>
  );
}
