# 🥣 Cereal Synergy

> Two cereals. One bowl. Infinite science.

A blog for reviewing cereal *combinations* — mix two (or more) cereals, photograph
the bowl, and rate how well they go together.

Each **combo** review has:

- The cereals in the mix (e.g. _Frosted Flakes × Cocoa Puffs_)
- One or more photos of the bowl
- An overall rating on a **1–5 🥣 bowls** scale
- Four sub-scores (each 1–5): **Taste**, **Crunch longevity**, **Aftermilk**, **Sogginess resistance**
- Written verdict + tags

## Tech stack

- **Next.js 15** (App Router) + **TypeScript**
- **SQLite** via Node's built-in [`node:sqlite`](https://nodejs.org/api/sqlite.html) — no native binaries to install
- **Tailwind CSS v4**

## Getting started

```bash
npm install
cp .env.example .env      # then edit values
npm run db:seed           # create + seed data/cereal.db with sample combos
npm run dev               # http://localhost:3000
```

## Scripts

| Script            | What it does                                   |
| ----------------- | ---------------------------------------------- |
| `npm run dev`     | Start the dev server                           |
| `npm run build`   | Production build                               |
| `npm run start`   | Serve the production build                     |
| `npm run db:seed` | Create/seed the SQLite database                |
| `npm run db:reset`| Delete and re-seed the database                |

## Pages

| Route            | Description                              |
| ---------------- | ---------------------------------------- |
| `/`              | Home feed — latest combos, newest first  |
| `/combo/[slug]`  | Full review: photos, bowl scores, verdict|
| `/leaderboard`   | Every combo ranked, best synergy to worst|
| `/tags/[tag]`    | Combos matching a tag                    |

## Roadmap

- **M1 — Scaffold + public site** ✅ _(data model, home feed, combo pages, leaderboard, tags)_
- **M3 — Admin** — password login + create/edit form with photo upload (Cloudinary)
- **M4 — Filtering & polish**
- **M5 — Deploy** (Vercel; swap SQLite for hosted Postgres)

Later: comments, cereal "pantry" pages, combo randomizer, milk-type field, aggregate stats.

## Data layer notes

SQLite has no array type, so list fields (`cereals`, `photos`, `tags`) are stored as
JSON strings and parsed in `lib/combo.ts`. The whole app reads data only through
`lib/combo.ts`, so moving to Postgres later means changing just that file and `lib/db.ts`.
