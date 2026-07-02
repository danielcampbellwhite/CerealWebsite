import { db } from "./db";

// SQLite has no array type, so list fields (cereals/photos/tags) are stored as
// JSON strings. These helpers convert a raw DB row into a friendly UI shape.

export type ComboRow = {
  id: string;
  slug: string;
  title: string;
  cereals: string;
  photos: string;
  notes: string;
  overallBowls: number;
  taste: number;
  crunch: number;
  aftermilk: number;
  sogginess: number;
  tags: string;
  createdAt: string;
  updatedAt: string;
};

export type ComboView = {
  id: string;
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

function parseList(raw: string): string[] {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}

function toView(row: ComboRow): ComboView {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    cereals: parseList(row.cereals),
    photos: parseList(row.photos),
    notes: row.notes,
    overallBowls: row.overallBowls,
    taste: row.taste,
    crunch: row.crunch,
    aftermilk: row.aftermilk,
    sogginess: row.sogginess,
    tags: parseList(row.tags),
    createdAt: new Date(row.createdAt),
  };
}

export const SUB_SCORES = [
  { key: "taste", label: "Taste" },
  { key: "crunch", label: "Crunch longevity" },
  { key: "aftermilk", label: "Aftermilk" },
  { key: "sogginess", label: "Sogginess resistance" },
] as const;

export async function getAllCombos(): Promise<ComboView[]> {
  const rows = db
    .prepare("SELECT * FROM combos ORDER BY createdAt DESC")
    .all() as ComboRow[];
  return rows.map(toView);
}

export async function getCombosByRating(): Promise<ComboView[]> {
  const rows = db
    .prepare(
      "SELECT * FROM combos ORDER BY overallBowls DESC, createdAt DESC"
    )
    .all() as ComboRow[];
  return rows.map(toView);
}

export async function getComboBySlug(
  slug: string
): Promise<ComboView | null> {
  const row = db
    .prepare("SELECT * FROM combos WHERE slug = ?")
    .get(slug) as ComboRow | undefined;
  return row ? toView(row) : null;
}
