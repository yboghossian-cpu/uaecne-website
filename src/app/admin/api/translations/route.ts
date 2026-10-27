import { getAdmin } from "@/lib/server/auth";
import { translationRows } from "@/lib/i18n/admin";

// Full translation list as JSON (for review outside the admin, or backup).
export async function GET() {
  if (!(await getAdmin())) return Response.json({ error: "Please sign in." }, { status: 401 });
  return Response.json(translationRows(), {
    headers: { "Content-Disposition": 'attachment; filename="uaecne-translations.json"' },
  });
}
