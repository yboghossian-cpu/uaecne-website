import type { Metadata } from "next";
import ComingSoon from "@/components/shared/ComingSoon";

export const metadata: Metadata = {
  title: `BSL (Bible Society) — UAECNE`,
};

export default function BslPage() {
  return <ComingSoon name="BSL (Bible Society)" />;
}
