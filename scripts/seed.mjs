import { DatabaseSync } from "node:sqlite";
import path from "node:path";
import fs from "node:fs";

// Seeds a few sample combos so the site isn't empty on first run.
// Photos use Unsplash placeholders — swap for your own uploads later.

const DB_PATH =
  process.env.DATABASE_PATH ?? path.join(process.cwd(), "data", "cereal.db");
fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });

const db = new DatabaseSync(DB_PATH);
db.exec(`
  CREATE TABLE IF NOT EXISTS combos (
    id TEXT PRIMARY KEY, slug TEXT UNIQUE NOT NULL, title TEXT NOT NULL,
    cereals TEXT NOT NULL DEFAULT '[]', photos TEXT NOT NULL DEFAULT '[]',
    notes TEXT NOT NULL DEFAULT '', overallBowls INTEGER NOT NULL,
    taste INTEGER NOT NULL, crunch INTEGER NOT NULL, aftermilk INTEGER NOT NULL,
    sogginess INTEGER NOT NULL, tags TEXT NOT NULL DEFAULT '[]',
    createdAt TEXT NOT NULL, updatedAt TEXT NOT NULL
  );
`);

const combos = [
  {
    slug: "frosted-flakes-x-cocoa-puffs",
    title: "Frosted Flakes × Cocoa Puffs",
    cereals: ["Frosted Flakes", "Cocoa Puffs"],
    photos: ["https://images.unsplash.com/photo-1521483451569-e33803c0330c?w=800&q=80"],
    notes:
      "The gateway synergy. Frosted Flakes bring the sugar backbone, Cocoa Puffs turn the milk into chocolate. Crunch holds up surprisingly well. A crowd-pleaser and a great starting point for the uninitiated.",
    overallBowls: 4, taste: 5, crunch: 4, aftermilk: 5, sogginess: 3,
    tags: ["chocolatey", "sweet", "beginner-friendly"],
  },
  {
    slug: "raisin-bran-x-lucky-charms",
    title: "Raisin Bran × Lucky Charms",
    cereals: ["Raisin Bran", "Lucky Charms"],
    photos: ["https://images.unsplash.com/photo-1614961233913-a5113a4a34ed?w=800&q=80"],
    notes:
      "An identity crisis in a bowl. The bran wants to be healthy, the marshmallows refuse. Texturally chaotic — soggy raisins next to crunchy marbits. Not a disaster, but not a synergy either. Two cereals sharing a bowl, not a mix.",
    overallBowls: 2, taste: 3, crunch: 2, aftermilk: 2, sogginess: 2,
    tags: ["fruity", "breakfast-crime", "chaotic"],
  },
  {
    slug: "cinnamon-toast-crunch-x-honey-nut-cheerios",
    title: "Cinnamon Toast Crunch × Honey Nut Cheerios",
    cereals: ["Cinnamon Toast Crunch", "Honey Nut Cheerios"],
    photos: ["https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?w=800&q=80"],
    notes:
      "Peak synergy. Cinnamon-sugar meets honey-oat and they simply belong together. The aftermilk is the best I've had — cinnamon honey nectar. Cheerios keep their crunch while CTC softens just enough. This is the platonic ideal of a mix.",
    overallBowls: 5, taste: 5, crunch: 5, aftermilk: 5, sogginess: 4,
    tags: ["cinnamon", "honey", "elite-tier"],
  },
];

const now = new Date("2026-07-01T09:00:00Z");
const insert = db.prepare(`
  INSERT INTO combos (id, slug, title, cereals, photos, notes, overallBowls,
    taste, crunch, aftermilk, sogginess, tags, createdAt, updatedAt)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  ON CONFLICT(slug) DO NOTHING
`);

combos.forEach((c, i) => {
  const ts = new Date(now.getTime() + i * 60000).toISOString();
  insert.run(
    `seed-${i + 1}`, c.slug, c.title,
    JSON.stringify(c.cereals), JSON.stringify(c.photos), c.notes,
    c.overallBowls, c.taste, c.crunch, c.aftermilk, c.sogginess,
    JSON.stringify(c.tags), ts, ts
  );
});

const count = db.prepare("SELECT COUNT(*) AS n FROM combos").get();
console.log(`Seeded. Combos in DB: ${count.n}`);
db.close();
