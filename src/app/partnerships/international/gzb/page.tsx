import type { Metadata } from "next";
import ComingSoon from "@/components/shared/ComingSoon";

export const metadata: Metadata = {
  title: `GZB — UAECNE`,
};

export default function GzbPage() {
  return <ComingSoon name="GZB" />;
}
