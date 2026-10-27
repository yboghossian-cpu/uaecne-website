import { getL, getT } from "@/lib/i18n/server";
import HomeStory from "@/components/home/HomeStory";
import { historyContent as historyContent__en } from "@/data/historyContent";
import { getAllChurchContent, getChurches } from "@/lib/server/content";
import { getHomepagePost, postHref } from "@/lib/server/posts";
import { getSettings } from "@/lib/server/settings";

// The countries named on the History page, with the photo of a church there.
const COUNTRY_KEYS: Record<string, string> = { "Syria (Kessab)": "Syria" };

export default async function Home() {
  const tx = await getT();
  const L = await getL();
  const history = L(historyContent__en);
  const post = L(getHomepagePost());
  const { donateUrl } = getSettings();

  // Churches (directory order), each with its own hero photo where one exists.
  const content = getAllChurchContent();
  const churchesEn = getChurches();
  const churches = L(churchesEn);
  const film = churches.map((c, i) => {
    const hero = content[c.slug]?.heroPhoto ?? (c.photo ? { src: c.photo, alt: c.name } : null);
    return {
      name: c.name,
      place: tx(COUNTRY_KEYS[churchesEn[i].country] ?? churchesEn[i].country),
      href: `/churches/${c.slug}`,
      photo: hero ? { src: hero.src, alt: c.name } : null,
    };
  });

  const byCountry = new Map<string, { n: number; photo: { src: string; alt: string } | null }>();
  churchesEn.forEach((c, i) => {
    const key = COUNTRY_KEYS[c.country] ?? c.country;
    const entry = byCountry.get(key) ?? { n: 0, photo: null };
    entry.n += 1;
    entry.photo = entry.photo ?? film[i].photo;
    byCountry.set(key, entry);
  });
  const countries = historyContent__en.geography.countries.map((name) => {
    const e = byCountry.get(name);
    return {
      name: tx(name),
      count: e ? (e.n === 1 ? tx("1 church") : tx("{n} churches").replace("{n}", String(e.n))) : null,
      photo: e?.photo ?? null,
    };
  });

  return (
    <HomeStory
      hero={{
        eyebrow: tx("Est. 1846"),
        titleA: tx("Faith, Unity &"),
        titleB: tx("Enduring Service"),
        subtitle: tx("The Union of the Armenian Evangelical Churches in the Near East"),
        photo: { src: "/hero-general-assembly.jpg", alt: tx("UAECNE General Assembly gathering") },
        yearsLabel: tx("Armenian Evangelical Church 180th Anniversary, 1846–2026"),
      }}
      ticker={[
        tx("ROOTED IN FAITH SINCE 1846"),
        tx("HEADQUARTERED IN BEIRUT"),
        tx("SERVING THE NEAR EAST"),
        tx("180 YEARS OF HERITAGE"),
        tx("GLORY TO GOD ALONE"),
        tx("UNION OF THE ARMENIAN EVANGELICAL CHURCHES IN THE NEAR EAST"),
      ]}
      legacy={{
        heading: tx("A Sacred Legacy Since 1846"),
        body: tx(
          "Founded in the historic heart of the Ottoman Empire and headquartered in the vibrant city of Beirut, the Union of the Armenian Evangelical Churches in the Near East has been a steadfast pillar of faith, education, and social service for over 180 years. Our journey is one of resilience and spiritual devotion, dedicated to preserving our rich Armenian heritage while fostering a modern Christian witness across borders.",
        ),
        quote: tx("“The Lord is my rock, my fortress and my deliverer; my God is my rock, in whom I take refuge.”"),
        quoteRef: tx("— Psalm 18:2"),
        photo: { src: "/sacred-legacy-faec-approved.jpeg", alt: tx("First Armenian Evangelical Church, Beirut") },
        navLabel: tx("Explore the Union"),
        links: [
          { href: "/resource-center/history", label: tx("Our History") },
          { href: "/churches", label: tx("Our Churches") },
          { href: "/schools", label: tx("Our Schools") },
        ],
      }}
      numbers={[
        { value: 180, suffix: "", label: tx("Years of Heritage"), photo: "/general-assembly-180.jpg" },
        { value: 30, suffix: "+", label: tx("Churches"), photo: "/church-first-armenian-evangelical-church-beirut-hero.jpg" },
        { value: 7, suffix: "", label: tx("Countries Served"), photo: "/ministry-cultural-heritage.jpeg" },
        { value: 12, suffix: "+", label: tx("Institutions"), photo: "/school-armenian-evangelical-college.jpeg" },
      ]}
      doors={{
        eyebrow: tx("What We Do"),
        heading: `${tx("Ministries Across the ")}${tx("Near East")}`,
        intro: tx(
          "From congregations of worship to schools, universities, and works of compassion — the Union serves communities across seven nations. Explore the ministries that carry its mission forward.",
        ),
        explore: tx("Explore"),
        items: [
          {
            title: tx("Churches"),
            description: tx("30+ congregations of worship across seven nations."),
            href: "/churches",
            photo: { src: "/ministry-churches.jpeg", alt: tx("Churches") },
          },
          {
            title: tx("Schools"),
            description: tx("Armenian Evangelical education from kindergarten to secondary."),
            href: "/schools",
            photo: { src: "/school-armenian-evangelical-college.jpeg", alt: tx("Schools") },
          },
          {
            title: tx("Higher Education"),
            description: tx("Haigazian University, NEST & the Educational Council."),
            href: "/higher-education",
            photo: { src: "/higher-ed-haigazian-hero.jpeg", alt: tx("Higher Education") },
          },
          {
            title: tx("Outreach"),
            description: tx("Camps, youth work & social action for the community."),
            href: "/outreach",
            photo: { src: "/ministry-outreach.jpg", alt: tx("Outreach") },
          },
        ],
      }}
      lands={{
        eyebrow: history.geography.eyebrow,
        heading: history.geography.heading,
        intro: history.geography.intro,
        map: history.geography.map,
        countries,
        link: { href: "/churches", label: tx("Our Churches") },
      }}
      film={{
        heading: tx("Our Churches"),
        link: { href: "/churches", label: tx("View all churches") },
        items: film,
        open: tx("Open"),
      }}
      news={
        post
          ? {
              eyebrow: tx("From the Union"),
              heading: tx("Latest Updates"),
              kicker: post.kicker,
              tag: post.tag,
              title: post.title,
              excerpt: post.excerpt,
              cover: post.cover ? { src: post.cover, alt: post.cover_alt } : null,
              href: postHref(post),
              cta: tx("Read the full story"),
            }
          : null
      }
      heritage={{
        verse: tx("“For where two or three gather in my name, there am I with them.”"),
        cite: tx("Matthew 18:20"),
        eyebrow: tx("Since 1846"),
        titleA: tx("Our Spiritual"),
        titleB: tx("Heritage"),
        body: tx(
          "Born in the Ottoman era as a movement of reform and renewal, the Union of the Armenian Evangelical Churches has been carried through generations of exile, endurance, and rebuilding — and lives today as a communion of faith across seven nations of the Near East.",
        ),
        invite: tx("Nearly two centuries of that story await."),
        cta: tx("Read the Full History"),
        photo: { src: "/spiritual-heritage-sanctuary.jpg", alt: tx("Sanctuary interior during a General Assembly session") },
      }}
      donate={{
        heading: tx("Support our Mission"),
        body: tx(
          "Your dedication and generosity empower the UAECNE to continue its vital work in spiritual growth, education, and compassionate outreach across the Near East. Join us in sustaining a heritage of faith since 1846.",
        ),
        label: tx("Donate Now"),
        url: donateUrl,
      }}
    />
  );
}
