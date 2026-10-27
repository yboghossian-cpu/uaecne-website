import type { NextConfig } from "next";

// Public pages live under /en/... and /hy/... in the app; visitors see plain
// URLs. The language comes from the uaecne_lang cookie (see src/proxy.ts,
// which handles the ?lang= and /hy/... links that set it). Done as config
// rewrites — always internal — because a proxy rewrite behind the HTTPS
// front server (Caddy) was treated as an external https://localhost hop.
const PUBLIC = "(?!admin|media|_next|api|en(?:/|$)|hy(?:/|$)|favicon\\.ico|icon\\.png|apple-icon\\.png|robots\\.txt|sitemap\\.xml|.*\\.[a-zA-Z0-9]+$).+";
const hy = [{ type: "cookie" as const, key: "uaecne_lang", value: "hy" }];

const nextConfig: NextConfig = {
  agentRules: false,
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", has: hy, destination: "/hy" },
        { source: "/", destination: "/en" },
        { source: `/:path(${PUBLIC})`, has: hy, destination: "/hy/:path" },
        { source: `/:path(${PUBLIC})`, destination: "/en/:path" },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
  async redirects() {
    return [
      // Iran churches removed from the site (Yeghia, 2026-10-27).
      {
        source: "/churches/armenian-evangelical-sourp-hovhannes-church-tehran",
        destination: "/churches",
        permanent: true,
      },
      {
        source: "/churches/armenian-evangelical-hokeshounch-church-tehran",
        destination: "/churches",
        permanent: true,
      },
      {
        source: "/churches/armenian-evangelical-shnorhali-church-tehran",
        destination: "/churches",
        permanent: true,
      },
      {
        // Zvartnots moved from Health Care to Outreach (Yeghia, 2026-10-27).
        source: "/ministries/health-care/zvartnots",
        destination: "/outreach/zvartnots",
        permanent: true,
      },
      {
        source: "/higher-education/educational-council",
        destination: "/schools/education-council-lebanon",
        permanent: true,
      },
      {
        source: "/higher-education/syria-educational-council",
        destination: "/schools/education-council-syria",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
