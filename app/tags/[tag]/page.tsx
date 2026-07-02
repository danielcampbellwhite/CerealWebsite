import Link from "next/link";
import { getAllCombos } from "@/lib/combo";
import { ComboCard } from "@/components/ComboCard";

export const dynamic = "force-dynamic";

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  const combos = (await getAllCombos()).filter((c) =>
    c.tags.includes(decoded)
  );

  return (
    <div>
      <Link href="/" className="text-sm text-berry hover:underline">
        ← Back to feed
      </Link>
      <h1 className="text-3xl font-black text-cocoa mt-4 mb-8">
        #{decoded}
      </h1>

      {combos.length === 0 ? (
        <p className="text-cocoa/50">No combos tagged “{decoded}” yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {combos.map((combo) => (
            <ComboCard key={combo.id} combo={combo} />
          ))}
        </div>
      )}
    </div>
  );
}
