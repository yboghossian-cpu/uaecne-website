import type { Metadata } from "next";
import ComingSoon from "@/components/shared/ComingSoon";

export const metadata: Metadata = {
  title: `WCRC — UAECNE`,
};

export default function WcrcPage() {
  return <ComingSoon name="WCRC" />;
}
