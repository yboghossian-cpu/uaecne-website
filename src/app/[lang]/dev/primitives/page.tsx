import { notFound } from "next/navigation";
import Medallion from "@/components/shared/Medallion";
import ArchFrame from "@/components/shared/ArchFrame";

// Temporary, unlinked verification route for Phase 2 Unit 2a.
// Not part of site navigation or any section — exists only so `npm run
// build` renders Medallion/ArchFrame and proves they compile. Safe to
// delete once the primitives are wired into real sections.
export default function PrimitivesDevPage() {
  // Gate out of production: this is a QA-only route, not real content.
  // Next's built-in notFound() makes it 404 at runtime once deployed,
  // while staying reachable in dev.
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return (
    <div style={{ padding: "3rem", display: "flex", gap: "2rem", flexWrap: "wrap" }}>
      <span style={{ color: "#8b0000" }}>
        <Medallion size={64} />
      </span>
      <div style={{ width: "260px" }}>
        <ArchFrame aspectRatio="4 / 3" label="Photo pending — Example">
          <Medallion />
        </ArchFrame>
      </div>
    </div>
  );
}
