import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  async redirects() {
    return [
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
