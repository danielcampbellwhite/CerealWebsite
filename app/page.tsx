import Image from "next/image";
import { getAllCombos, getAllTags, getAllCereals } from "@/lib/combo";
import { ComboExplorer } from "@/components/ComboExplorer";
import { BowlScore } from "@/components/BowlScore";

export default function HomePage() {
  const combos = getAllCombos();
  const tags = getAllTags();
  const cereals = getAllCereals();

  return (
    <div>
      <section className="mb-10 rounded-3xl bg-white border border-navy/10 shadow-sm overflow-hidden">
        <div className="grid sm:grid-cols-[auto_1fr] items-center gap-6 p-6 sm:p-8">
          <Image
            src="/logo.png"
            alt="Cereal Synergy logo"
            width={160}
            height={160}
            priority
            className="mx-auto rounded-full w-32 h-32 sm:w-40 sm:h-40"
          />
          <div className="text-center sm:text-left">
            <h1 className="wordmark text-4xl sm:text-5xl leading-none">
              Cereal Synergy
            </h1>
            <p className="mt-3 text-lg font-bold text-navy/70">
              Mixing cereals so you don&apos;t have to. Every combo photographed,
              reviewed, and rated on the{" "}
              <span className="whitespace-nowrap">
                <BowlScore value={5} size="text-lg" />
              </span>{" "}
              scale.
            </p>
            <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-x-6 gap-y-1 text-sm font-extrabold text-navy/50">
              <span>{combos.length} combos</span>
              <span>{cereals.length} cereals tested</span>
              <span>{tags.length} tags</span>
            </div>
          </div>
        </div>
        <div className="brand-rule" />
      </section>

      <div className="mb-5">
        <h2 className="wordmark text-2xl">Browse the bowls</h2>
        <div className="brand-rule w-24 mt-1.5" />
      </div>

      <ComboExplorer combos={combos} allTags={tags} allCereals={cereals} />
    </div>
  );
}
