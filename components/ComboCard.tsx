import Link from "next/link";
import type { ComboView } from "@/lib/combo";
import { BowlScore } from "./BowlScore";

export function ComboCard({ combo }: { combo: ComboView }) {
  const cover = combo.photos[0];
  return (
    <Link
      href={`/combo/${combo.slug}`}
      className="group relative block rounded-3xl overflow-hidden bg-white border-4 border-cocoa/10 hover:border-berry transition-all hover:-translate-y-1 shadow-[0_4px_0_rgba(67,41,28,0.08)]"
    >
      {/* Overall-score badge, corner-pinned. */}
      <span className="absolute top-3 right-3 z-10 flex items-center gap-0.5 rounded-full bg-honey text-cocoa font-display font-black text-sm px-3 py-1 border-2 border-white shadow">
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

      <div className="p-4">
        <h3 className="font-display font-black text-lg leading-tight group-hover:text-berry">
          {combo.title}
        </h3>
        <p className="text-sm font-semibold text-cocoa/50 mt-0.5">
          {combo.cereals.join(" × ")}
        </p>
        <div className="mt-2 flex items-center justify-between">
          <BowlScore value={combo.overallBowls} size="text-base" />
          {combo.tags.length > 0 && (
            <span className="text-xs font-bold text-grape">
              #{combo.tags[0]}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
