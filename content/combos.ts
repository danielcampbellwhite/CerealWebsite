import type { ComboInput } from "@/lib/combo";

// ─────────────────────────────────────────────────────────────────────────
//  Cereal Synergy — your reviews live here.
//
//  To add a combo: copy one block below, paste it at the TOP of the array,
//  and fill it in. Photos go in `public/photos/` — reference them as
//  "/photos/your-file.jpg". You can also paste a full https:// image URL.
//
//  Ratings are 1–5. `overall` is your final verdict (set it yourself — a mix
//  can score well on paper but just *feel* like a 3).
//
//  `slug` is optional; if you omit it, it's auto-generated from the title.
// ─────────────────────────────────────────────────────────────────────────

export const combos: ComboInput[] = [
  // ── Template — copy this to add a new review ─────────────────────────────
  // {
  //   title: "Cereal A × Cereal B",
  //   cereals: ["Cereal A", "Cereal B"],
  //   photos: ["/photos/my-bowl.jpg"],
  //   date: "2026-07-02",
  //   overall: 4,
  //   taste: 4,
  //   crunch: 4,
  //   aftermilk: 3,
  //   sogginess: 3,
  //   tags: ["chocolatey"],
  //   notes: `Your verdict here.`,
  // },

  {
    title: "Cinnamon Toast Crunch × Honey Nut Cheerios",
    cereals: ["Cinnamon Toast Crunch", "Honey Nut Cheerios"],
    photos: [
      "https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?w=800&q=80",
    ],
    date: "2026-07-01",
    overall: 5,
    taste: 5,
    crunch: 5,
    aftermilk: 5,
    sogginess: 4,
    tags: ["cinnamon", "honey", "elite-tier"],
    notes: `Peak synergy. Cinnamon-sugar meets honey-oat and they simply belong together. The aftermilk is the best I've had — cinnamon honey nectar. Cheerios keep their crunch while CTC softens just enough. This is the platonic ideal of a mix.`,
  },
  {
    title: "Frosted Flakes × Cocoa Puffs",
    cereals: ["Frosted Flakes", "Cocoa Puffs"],
    photos: [
      "https://images.unsplash.com/photo-1521483451569-e33803c0330c?w=800&q=80",
    ],
    date: "2026-06-28",
    overall: 4,
    taste: 5,
    crunch: 4,
    aftermilk: 5,
    sogginess: 3,
    tags: ["chocolatey", "sweet", "beginner-friendly"],
    notes: `The gateway synergy. Frosted Flakes bring the sugar backbone, Cocoa Puffs turn the milk into chocolate. Crunch holds up surprisingly well. A crowd-pleaser and a great starting point for the uninitiated.`,
  },
  {
    title: "Raisin Bran × Lucky Charms",
    cereals: ["Raisin Bran", "Lucky Charms"],
    photos: [
      "https://images.unsplash.com/photo-1614961233913-a5113a4a34ed?w=800&q=80",
    ],
    date: "2026-06-25",
    overall: 2,
    taste: 3,
    crunch: 2,
    aftermilk: 2,
    sogginess: 2,
    tags: ["fruity", "breakfast-crime", "chaotic"],
    notes: `An identity crisis in a bowl. The bran wants to be healthy, the marshmallows refuse. Texturally chaotic — soggy raisins next to crunchy marbits. Not a disaster, but not a synergy either. Two cereals sharing a bowl, not a mix.`,
  },
];
