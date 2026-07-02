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

## Adding a review (it's all in code)

1. Put your bowl photo(s) in **`public/photos/`** (e.g. `public/photos/ctc-cheerios.jpg`).
2. Open **`content/combos.ts`** and copy the template block to the top of the array.
3. Fill it in — reference photos as `"/photos/ctc-cheerios.jpg"` (or paste a full `https://` URL).
4. Save. The feed, combo page, leaderboard, and tag pages all update automatically.

```ts
{
  title: "Cinnamon Toast Crunch × Honey Nut Cheerios",
  cereals: ["Cinnamon Toast Crunch", "Honey Nut Cheerios"],
  photos: ["/photos/ctc-cheerios.jpg"],
  date: "2026-07-02",
  overall: 5,               // your final verdict, 1–5
  taste: 5, crunch: 5, aftermilk: 5, sogginess: 4,
  tags: ["cinnamon", "honey"],
  notes: `Peak synergy. The aftermilk is the best I've had...`,
}
```

The URL slug is auto-generated from the title (override with an optional `slug` field).

## Tech stack

- **Next.js 15** (App Router) + **TypeScript** — fully static output
- **Tailwind CSS v4**
- No database, no backend: reviews are a typed data file, so hosting is free and simple.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

## Scripts

| Script          | What it does               |
| --------------- | -------------------------- |
| `npm run dev`   | Start the dev server       |
| `npm run build` | Production (static) build  |
| `npm run start` | Serve the production build |

## Pages

| Route           | Description                               |
| --------------- | ----------------------------------------- |
| `/`             | Home feed — latest combos, newest first   |
| `/combo/[slug]` | Full review: photos, bowl scores, verdict |
| `/leaderboard`  | Every combo ranked, best synergy to worst |
| `/tags/[tag]`   | Combos matching a tag                     |

## Roadmap

- **M1 — Scaffold + public site** ✅
- **Deploy** — push to Vercel (or any static host); no config needed
- Later: comments, cereal "pantry" pages, combo randomizer, milk-type field, aggregate stats
