import Link from "next/link";
import { getCombosByTag, getAllTags } from "@/lib/combo";
import { ComboCard } from "@/components/ComboCard";

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag }));
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  const combos = getCombosByTag(decoded);

  return (
    <div>
      <Link
        href="/"
        className="inline-block text-sm font-extrabold uppercase tracking-wide text-blue hover:underline"
      >
        ← Back to browse
      </Link>
      <h1 className="wordmark text-3xl sm:text-4xl mt-4">#{decoded}</h1>
      <div className="brand-rule w-24 mt-2 mb-8" />

      {combos.length === 0 ? (
        <p className="text-navy/50 font-bold">
          No combos tagged “{decoded}” yet.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {combos.map((combo) => (
            <ComboCard key={combo.slug} combo={combo} />
          ))}
        </div>
      )}
    </div>
  );
}
