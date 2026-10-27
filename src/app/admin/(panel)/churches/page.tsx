import EntryList from "@/components/admin/EntryList";

export default async function Page({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  return <EntryList kind="church" q={q} />;
}
