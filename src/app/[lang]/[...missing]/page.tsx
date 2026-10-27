import { notFound } from "next/navigation";

// Any unknown address inside the public site shows the branded 404
// (src/app/[lang]/not-found.tsx) with the normal header and footer.
export default function Missing() {
  notFound();
}
