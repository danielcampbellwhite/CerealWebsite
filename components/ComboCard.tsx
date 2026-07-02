import Link from "next/link";
import type { ComboView } from "@/lib/combo";
import { BowlScore } from "./BowlScore";

export function ComboCard({ combo }: { combo: ComboView }) {
  const cover = combo.photos[0];
  const cerealsLine = combo.cereals.join(" × ");
  // Avoid repeating the title when it's literally the cereals joined.
  const showCereals = cerealsLine !== combo.title;

  return (
    <Link
      href={`/combo/${combo.slug}`}
      className="group relative flex flex-col rounded-3xl overflow-hidden bg-white border border-navy/10 hover:border-blue transition-all hover:-translate-y-1 shadow-[0_6px_20px_-8px_rgba(18,35,79,0.25)]"
    >
      {/* Overall-score badge, corner-pinned. */}
      <span className="absolute top-3 right-3 z-10 flex items-baseline gap-0.5 rounded-full bg-gold text-navy font-display font-black text-sm px-3 py-1 border-2 border-white shadow-md">
        {combo.overallBowls}
        <span className="text-xs">/5</span>
      </span>

      <div className="aspect-[4/3] bg-cream overflow-hidden">
        {cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cover}
            alt={combo.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl opacity-30">
            🥣
          </div>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-display font-black text-lg leading-tight text-navy group-hover:text-blue">
          {combo.title}
        </h3>
        {showCereals && (
          <p className="text-sm font-semibold text-navy/45 mt-0.5">
            {cerealsLine}
          </p>
        )}
        <div className="mt-auto pt-2 flex items-center justify-between">
          <BowlScore value={combo.overallBowls} size="text-base" />
          {combo.tags.length > 0 && (
            <span className="text-xs font-bold text-blue">
              #{combo.tags[0]}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
