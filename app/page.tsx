import { getAllCombos } from "@/lib/combo";
import { ComboCard } from "@/components/ComboCard";
import { BowlScore } from "@/components/BowlScore";

export default function HomePage() {
  const combos = getAllCombos();

  return (
    <div>
      <section className="text-center mb-10 rounded-3xl bg-cream border-4 border-cocoa/10 px-6 py-10">
        <p className="text-5xl mb-3">🥣✨🥣</p>
        <h1 className="wordmark text-4xl sm:text-5xl text-berry leading-none">
          Cereal Synergy
        </h1>
        <p className="mt-3 text-lg font-bold text-cocoa/70">
          Mixing cereals so you don&apos;t have to. Rated on the{" "}
          <BowlScore value={5} size="text-lg" /> scale.
        </p>
      </section>

      <div className="flex items-end justify-between mb-5">
        <div>
          <h2 className="wordmark text-2xl text-cocoa">Latest bowls</h2>
          <div className="rainbow-rule w-24 mt-1.5" />
        </div>
        <span className="text-sm font-bold text-cocoa/50">
          {combos.length} combo{combos.length === 1 ? "" : "s"}
        </span>
      </div>

      {combos.length === 0 ? (
        <div className="text-center py-16 text-cocoa/50">
          <div className="text-5xl mb-3">🥣</div>
          <p className="font-bold">No combos yet. Time to start mixing.</p>
        </div>
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
