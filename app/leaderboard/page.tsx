import Link from "next/link";
import { getCombosByRating } from "@/lib/combo";
import { BowlScore } from "@/components/BowlScore";

const MEDALS = ["🥇", "🥈", "🥉"];

export default function LeaderboardPage() {
  const combos = getCombosByRating();

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="wordmark text-3xl sm:text-4xl">🏆 Leaderboard</h1>
        <div className="brand-rule w-28 mt-2" />
        <p className="text-navy/60 font-bold mt-2">
          Every combo ranked, best synergy to worst.
        </p>
      </div>

      {combos.length === 0 ? (
        <p className="text-navy/50 font-bold">No combos to rank yet.</p>
      ) : (
        <ol className="space-y-2">
          {combos.map((combo, i) => (
            <li key={combo.slug}>
              <Link
                href={`/combo/${combo.slug}`}
                className="flex items-center gap-4 bg-white rounded-2xl px-4 py-3 border border-navy/10 hover:border-blue hover:-translate-y-0.5 transition-all shadow-sm"
              >
                <span className="w-9 text-center text-2xl font-display font-black text-navy/30">
                  {MEDALS[i] ?? i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-display font-black text-navy truncate">
                    {combo.title}
                  </p>
                  <p className="text-sm font-semibold text-navy/50 truncate">
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
