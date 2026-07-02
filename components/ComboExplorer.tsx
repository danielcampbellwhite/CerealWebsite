"use client";

import { useMemo, useState } from "react";
import type { ComboView } from "@/lib/combo";
import { ComboCard } from "./ComboCard";

export function ComboExplorer({
  combos,
  allTags,
  allCereals,
}: {
  combos: ComboView[];
  allTags: string[];
  allCereals: string[];
}) {
  const [query, setQuery] = useState("");
  const [cereal, setCereal] = useState("");
  const [activeTags, setActiveTags] = useState<string[]>([]);

  function toggleTag(tag: string) {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  function clearAll() {
    setQuery("");
    setCereal("");
    setActiveTags([]);
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return combos.filter((c) => {
      // Text search across title, cereals, and tags.
      if (q) {
        const haystack = [c.title, ...c.cereals, ...c.tags]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      // Must use the chosen cereal.
      if (cereal && !c.cereals.includes(cereal)) return false;
      // Must carry every active tag.
      if (activeTags.length && !activeTags.every((t) => c.tags.includes(t)))
        return false;
      return true;
    });
  }, [combos, query, cereal, activeTags]);

  const hasFilters = query.trim() || cereal || activeTags.length > 0;

  return (
    <section>
      {/* ── Controls ─────────────────────────────────────────────── */}
      <div className="rounded-3xl bg-white border border-navy/10 p-4 sm:p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-navy/40">
              🔍
            </span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search combos, cereals, tags…"
              className="w-full rounded-full border-2 border-navy/10 focus:border-blue outline-none pl-9 pr-4 py-2.5 font-semibold text-navy placeholder:text-navy/40"
            />
          </div>
          <select
            value={cereal}
            onChange={(e) => setCereal(e.target.value)}
            className="rounded-full border-2 border-navy/10 focus:border-blue outline-none px-4 py-2.5 font-semibold text-navy bg-white"
          >
            <option value="">All cereals</option>
            {allCereals.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Tag chips */}
        {allTags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {allTags.map((tag) => {
              const on = activeTags.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`text-xs font-extrabold rounded-full px-3 py-1.5 border-2 transition-colors ${
                    on
                      ? "bg-blue text-white border-blue"
                      : "bg-white text-navy/70 border-navy/10 hover:border-blue hover:text-blue"
                  }`}
                >
                  #{tag}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Result meta ──────────────────────────────────────────── */}
      <div className="mt-5 mb-4 flex items-center justify-between">
        <p className="text-sm font-bold text-navy/50">
          {filtered.length} combo{filtered.length === 1 ? "" : "s"}
          {hasFilters ? " match" : ""}
        </p>
        {hasFilters && (
          <button
            onClick={clearAll}
            className="text-sm font-extrabold text-blue hover:underline"
          >
            Clear filters ✕
          </button>
        )}
      </div>

      {/* ── Results ──────────────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-navy/50">
          <div className="text-5xl mb-3">🥣</div>
          <p className="font-bold">No combos match those filters.</p>
          <button
            onClick={clearAll}
            className="mt-3 text-blue font-extrabold hover:underline"
          >
            Reset
          </button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((combo) => (
            <ComboCard key={combo.slug} combo={combo} />
          ))}
        </div>
      )}
    </section>
  );
}
