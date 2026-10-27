import EntryEditor from "@/components/admin/EntryEditor";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ tab?: string }>;
}) {
  const { slug } = await params;
  const { tab } = await searchParams;
  return <EntryEditor kind="church" slug={slug} tab={tab === "card" ? "card" : "page"} />;
}
