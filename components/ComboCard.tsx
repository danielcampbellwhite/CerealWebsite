import Link from "next/link";
import type { ComboView } from "@/lib/combo";
import { BowlScore } from "./BowlScore";

export function ComboCard({ combo }: { combo: ComboView }) {
  const cover = combo.photos[0];
  return (
    <Link
      href={`/combo/${combo.slug}`}
      className="group block rounded-2xl overflow-hidden bg-white border-2 border-berry/10 hover:border-berry/40 transition-colors shadow-sm"
    >
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
        <h2 className="font-bold text-lg leading-tight group-hover:text-berry">
          {combo.title}
        </h2>
        <p className="text-sm text-cocoa/60 mt-0.5">
          {combo.cereals.join(" × ")}
        </p>
        <div className="mt-2 flex items-center justify-between">
          <BowlScore value={combo.overallBowls} size="text-base" />
          {combo.tags.length > 0 && (
            <span className="text-xs text-cocoa/50">#{combo.tags[0]}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
