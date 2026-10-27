import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
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
