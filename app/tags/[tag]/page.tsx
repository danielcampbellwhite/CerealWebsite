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
        className="inline-block text-sm font-extrabold uppercase tracking-wide text-berry hover:underline"
      >
        ← Back to feed
      </Link>
      <h1 className="wordmark text-3xl sm:text-4xl text-grape mt-4">
        #{decoded}
      </h1>
      <div className="rainbow-rule w-24 mt-2 mb-8" />

      {combos.length === 0 ? (
        <p className="text-cocoa/50 font-bold">
          No combos tagged “{decoded}” yet.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {combos.map((combo) => (
            <ComboCard key={combo.slug} combo={combo} />
          ))}
        </div>
      )}
    </div>
  );
}
