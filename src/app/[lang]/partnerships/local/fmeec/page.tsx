import type { Metadata } from "next";
import ComingSoon from "@/components/shared/ComingSoon";

export const metadata: Metadata = {
  title: `FMEEC — UAECNE`,
};

export default function FmeecPage() {
  return <ComingSoon name="FMEEC" />;
}
