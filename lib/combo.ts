import { combos as rawCombos } from "@/content/combos";

// Combos are authored in code (content/combos.ts). This module normalizes
// that authoring format into the shape the UI uses, and exposes lookups.

// What you write in content/combos.ts:
export type ComboInput = {
  title: string;
  /** Optional — auto-derived from the title if omitted. */
  slug?: string;
  cereals: string[];
  /** "/photos/foo.jpg" (file in public/) or a full https:// URL. */
  photos: string[];
  /** ISO date, e.g. "2026-07-02". */
  date: string;
  overall: number;
  taste: number;
  crunch: number;
  aftermilk: number;
  sogginess: number;
  tags: string[];
  notes: string;
};

// What the UI consumes:
export type ComboView = {
  slug: string;
  title: string;
  cereals: string[];
  photos: string[];
  notes: string;
  overallBowls: number;
  taste: number;
  crunch: number;
  aftermilk: number;
  sogginess: number;
  tags: string[];
  createdAt: Date;
};

export const SUB_SCORES = [
  { key: "taste", label: "Taste" },
  { key: "crunch", label: "Crunch longevity" },
  { key: "aftermilk", label: "Aftermilk" },
  { key: "sogginess", label: "Sogginess resistance" },
] as const;

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/×/g, "x")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function toView(input: ComboInput): ComboView {
  return {
    slug: input.slug ?? slugify(input.title),
    title: input.title,
    cereals: input.cereals,
    photos: input.photos,
    notes: input.notes,
    overallBowls: input.overall,
    taste: input.taste,
    crunch: input.crunch,
    aftermilk: input.aftermilk,
    sogginess: input.sogginess,
    tags: input.tags,
    createdAt: new Date(input.date),
  };
}

const ALL: ComboView[] = rawCombos.map(toView);

export function getAllCombos(): ComboView[] {
  return [...ALL].sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );
}

export function getCombosByRating(): ComboView[] {
  return [...ALL].sort(
    (a, b) =>
      b.overallBowls - a.overallBowls ||
      b.createdAt.getTime() - a.createdAt.getTime()
  );
}

export function getComboBySlug(slug: string): ComboView | undefined {
  return ALL.find((c) => c.slug === slug);
}

export function getAllSlugs(): string[] {
  return ALL.map((c) => c.slug);
}

export function getAllTags(): string[] {
  return [...new Set(ALL.flatMap((c) => c.tags))];
}

export function getCombosByTag(tag: string): ComboView[] {
  return getAllCombos().filter((c) => c.tags.includes(tag));
}
