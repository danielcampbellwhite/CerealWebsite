import { DatabaseSync } from "node:sqlite";
import path from "node:path";
import fs from "node:fs";

// Cereal Synergy uses SQLite via Node's built-in `node:sqlite` module — no
// native binaries to install. For production (e.g. Postgres), swap this file
// and lib/combo.ts's queries; the rest of the app talks only to lib/combo.ts.

const DB_PATH =
  process.env.DATABASE_PATH ?? path.join(process.cwd(), "data", "cereal.db");

// Reuse one connection across hot reloads in dev.
const globalForDb = globalThis as unknown as { db?: DatabaseSync };

function createDb(): DatabaseSync {
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  const db = new DatabaseSync(DB_PATH);
  // WAL lets concurrent readers coexist; busy_timeout waits out brief locks
  // (e.g. parallel workers during `next build`) instead of erroring.
  db.exec("PRAGMA journal_mode = WAL; PRAGMA busy_timeout = 5000;");
  db.exec(`
    CREATE TABLE IF NOT EXISTS combos (
      id           TEXT PRIMARY KEY,
      slug         TEXT UNIQUE NOT NULL,
      title        TEXT NOT NULL,
      cereals      TEXT NOT NULL DEFAULT '[]',
      photos       TEXT NOT NULL DEFAULT '[]',
      notes        TEXT NOT NULL DEFAULT '',
      overallBowls INTEGER NOT NULL,
      taste        INTEGER NOT NULL,
      crunch       INTEGER NOT NULL,
      aftermilk    INTEGER NOT NULL,
      sogginess    INTEGER NOT NULL,
      tags         TEXT NOT NULL DEFAULT '[]',
      createdAt    TEXT NOT NULL,
      updatedAt    TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_combos_overall ON combos(overallBowls);
    CREATE INDEX IF NOT EXISTS idx_combos_created ON combos(createdAt);
  `);
  return db;
}

export const db = globalForDb.db ?? createDb();
if (process.env.NODE_ENV !== "production") globalForDb.db = db;
