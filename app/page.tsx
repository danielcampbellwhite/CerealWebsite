import { getAllCombos } from "@/lib/combo";
import { ComboCard } from "@/components/ComboCard";

// Always read fresh from the DB (combos change when you publish).
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const combos = await getAllCombos();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black text-cocoa">Latest bowls</h1>
        <p className="text-cocoa/60 mt-1">
          Fresh cereal experiments, newest first.
        </p>
      </div>

      {combos.length === 0 ? (
        <div className="text-center py-16 text-cocoa/50">
          <div className="text-5xl mb-3">🥣</div>
          <p>No combos yet. Time to start mixing.</p>
        </div>
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
