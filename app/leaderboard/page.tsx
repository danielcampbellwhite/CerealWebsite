import Link from "next/link";
import { getCombosByRating } from "@/lib/combo";
import { BowlScore } from "@/components/BowlScore";

export const dynamic = "force-dynamic";

export default async function LeaderboardPage() {
  const combos = await getCombosByRating();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black text-cocoa">Leaderboard</h1>
        <p className="text-cocoa/60 mt-1">
          Every combo ranked, best synergy to worst.
        </p>
      </div>

      {combos.length === 0 ? (
        <p className="text-cocoa/50">No combos to rank yet.</p>
      ) : (
        <ol className="space-y-2">
          {combos.map((combo, i) => (
            <li key={combo.id}>
              <Link
                href={`/combo/${combo.slug}`}
                className="flex items-center gap-4 bg-white rounded-xl px-4 py-3 border-2 border-berry/10 hover:border-berry/40 transition-colors"
              >
                <span className="text-lg font-black text-cocoa/30 w-8 text-center">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold truncate">{combo.title}</p>
                  <p className="text-sm text-cocoa/50 truncate">
                    {combo.cereals.join(" × ")}
                  </p>
                </div>
                <BowlScore value={combo.overallBowls} size="text-sm" />
              </Link>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
