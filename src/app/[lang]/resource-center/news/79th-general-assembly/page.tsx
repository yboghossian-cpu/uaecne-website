import { getT } from "@/lib/i18n/server";
import type { Metadata } from "next";
import GaStory from "./GaStory";

export const metadata: Metadata = {
  title: "The 79th General Assembly — UAECNE",
  description:
    "The Union of the Armenian Evangelical Churches in the Near East gathered in Beirut, 21–22 June 2026, for its 79th General Assembly, marking the 180th anniversary of the Armenian Evangelical Church.",
};

// Intrinsic sizes of the gallery photos (public/ga79-gallery-N.jpg).
const SIZES: [number, number][] = [
  [1067, 1600], [1600, 921], [1600, 1067], [1067, 1600], [1600, 1067], [1600, 1067], [1600, 1067], [1600, 1067],
  [1600, 1098], [1600, 1067], [1600, 1067], [1600, 1250], [1600, 1067], [1600, 923], [1600, 1067], [1600, 1067],
  [1600, 886], [1600, 1067], [1600, 1067], [1600, 1067], [1067, 1600], [1600, 1067], [1600, 1067], [1600, 1067],
  [1600, 1304], [1600, 1041],
];

export default async function GeneralAssembly79Page() {
  const tx = await getT();
  const g = (n: number, alt: string) => ({ src: `/ga79-gallery-${n}.jpg`, alt, w: SIZES[n - 1][0], h: SIZES[n - 1][1] });
  const sanctuary = tx("The sanctuary of the First Armenian Evangelical Church");
  const plenaryAlt = tx("During the plenary sessions");
  const atGa = tx("At the 79th General Assembly");

  return (
    <GaStory
      hero={{
        eyebrow: tx("Beirut · 21–22 June 2026"),
        title: tx("The 79th General Assembly"),
        sub: tx(
          "The Union of the Armenian Evangelical Churches in the Near East gathered in Beirut this June for its 79th General Assembly, marking the 180th anniversary of the Armenian Evangelical Church with worship, reflection, and renewed commitment to its mission across the region.",
        ),
        photo: { src: "/ga79-hero.jpg", alt: sanctuary, w: 2400, h: 1600 },
        logo: { src: "/ga79-anniversary-logo.jpg", alt: tx("Armenian Evangelical Church 180th Anniversary, 1846–2026"), w: 2813, h: 2813 },
        anniversary: tx("Armenian Evangelical Church 180th Anniversary, 1846–2026"),
      }}
      lead={{
        p1: tx(
          "The 79th General Assembly of the Union of the Armenian Evangelical Churches in the Near East took place on 21–22 June 2026 at the First Armenian Evangelical Church in Beirut.",
        ),
        p2: tx(
          "The Celebratory Worship service on the first evening marked the 180th anniversary of the Armenian Evangelical Church, drawing not only members of the Armenian Evangelical community but also religious, political, and societal representatives of the Lebanese and Lebanese-Armenian community.",
        ),
      }}
      worship={{
        time: tx("Evening of 21 June"),
        heading: tx("Celebratory Worship"),
        person: {
          name: tx("Rev. Dr. Paul Haidostian"),
          photo: { src: "/ga79-portrait-haidostian.jpg", alt: tx("Rev. Dr. Paul Haidostian"), w: 560, h: 700 },
        },
        text: tx(
          "In his sermon, the Union’s Acting President, Rev. Dr. Paul Haidostian, introduced the General Assembly’s theme, “Freedom of Conscience and Responsible Faith.”",
        ),
        photos: [g(21, sanctuary), { src: "/ga79-hero.jpg", alt: sanctuary, w: 2400, h: 1600 }, g(19, sanctuary)],
      }}
      theme={{
        label: tx("General Assembly Theme · 2026"),
        quote: tx("Freedom of Conscience and Responsible Faith"),
        attr: tx("Introduced by Rev. Dr. Paul Haidostian"),
      }}
      plenary={{
        time: tx("Morning of 22 June"),
        heading: tx("Plenary Sessions"),
        text: tx(
          "On Monday morning, pastors, delegates, and guests gathered for the plenary sessions. Forty voting members were in attendance, a third of them joining online from outside Lebanon. Following the opening worship and messages of greeting from churches, organizations, and individuals, attendees viewed a historical slideshow before beginning the day’s work under an abbreviated agenda due to current regional conditions.",
        ),
        stats: [
          { value: "40", label: tx("voting members in attendance") },
          { value: "⅓", label: tx("joined online from outside Lebanon") },
        ],
        person: {
          name: tx("Rev. Vicken Cholakian"),
          photo: { src: "/ga79-portrait-cholakian.jpg", alt: tx("Rev. Vicken Cholakian"), w: 560, h: 700 },
        },
        reports: tx(
          "The President’s and Central Committee’s reports reflected on God’s providence throughout the year’s activities. Despite difficult regional conditions, the Union’s churches, schools, university, and institutions continued to serve as the hands and heart of Christ. The financial report likewise testified to the strength the UAECNE has drawn upon in its various endeavors, prompting reflection among delegates on how to deepen their spiritual and material participation in the Union’s work.",
        ),
        photos: [2, 6, 3, 14, 5, 20, 7, 9, 16, 10, 8, 26, 11, 15].map((n) => g(n, plenaryAlt)),
      }}
      remembrance={tx(
        "The Assembly remembered those who had departed in the previous year, honoring the legacy of pastoral and lay leaders who shaped the life of the Union. As at every General Assembly, new Central Committee members were elected for three-year terms of service.",
      )}
      communion={{
        time: tx("Evening of 22 June"),
        heading: tx("Holy Communion"),
        person: {
          name: tx("Rev. Dr. Haroutune Selimian"),
          photo: { src: "/ga79-portrait-selimian.jpg", alt: tx("Rev. Dr. Haroutune Selimian"), w: 560, h: 700 },
        },
        text: tx(
          "The gathering concluded that evening with a Service of Holy Communion. Rev. Dr. Haroutune Selimian’s sermon called Armenian Evangelical individuals and churches to active and faithful living, and Rev. Jirair Ghazarian officiated at the Lord’s Table.",
        ),
        feature: { src: "/ga79-communion-wide.jpg", alt: tx("Communion — Lord’s Table"), w: 1500, h: 1000 },
        caption: tx("Rev. Jirair Ghazarian officiated at the Lord’s Table."),
        photos: [],
      }}
      closing={tx("The 79th General Assembly concluded with the hope that the next gathering would take place fully in person.")}
      official={{
        eyebrow: tx("Commemoration"),
        heading: tx("Official Picture"),
        photo: { src: "/ga79-official-picture.jpg", alt: tx("Official group photo — 180th Anniversary"), w: 1400, h: 775 },
      }}
      gallery={{
        eyebrow: tx("In Pictures"),
        heading: tx("Gallery"),
        photos: SIZES.map((_, i) => g(i + 1, atGa)),
      }}
      labels={{
        open: tx("Open"),
        close: tx("Close"),
        previous: tx("Previous"),
        next: tx("Next"),
        photoOf: tx("{n} of {total}"),
      }}
    />
  );
}
