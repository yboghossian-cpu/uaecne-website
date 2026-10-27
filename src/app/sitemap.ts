import type { MetadataRoute } from "next";
import { churches } from "@/data/churches";
import { schools } from "@/data/schools";
import { campsContent, youthWorkContent, socialActionContent, boardingHomeContent } from "@/data/outreachContent";
import { haigazianContent, nestContent } from "@/data/higherEdContent";
import { SITE_URL } from "@/lib/site";

// Pages with real content only. The 21 nav-listed "Coming Soon"
// placeholders (Health Care, Partnerships) are left out until they get
// verified content — add them here when they do.
const STATIC_ROUTES = [
  "/",
  "/churches",
  "/schools",
  "/schools/education-council-lebanon",
  "/schools/education-council-syria",
  "/higher-education",
  "/outreach",
  "/leadership/central-committee",
  "/leadership/headquarters",
  "/resource-center/history",
  "/resource-center/news/79th-general-assembly",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    ...STATIC_ROUTES,
    ...churches.map((c) => `/churches/${c.slug}`),
    ...schools.map((s) => `/schools/${s.slug}`),
    ...[campsContent, youthWorkContent, socialActionContent, boardingHomeContent].map((o) => `/outreach/${o.slug}`),
    ...[haigazianContent, nestContent].map((h) => `/higher-education/${h.slug}`),
  ];
  return routes.map((path) => ({ url: `${SITE_URL}${path === "/" ? "" : path}` }));
}
