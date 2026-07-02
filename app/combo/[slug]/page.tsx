import { notFound } from "next/navigation";
import Link from "next/link";
import { getComboBySlug, SUB_SCORES } from "@/lib/combo";
import { BowlScore } from "@/components/BowlScore";

export const dynamic = "force-dynamic";

export default async function ComboPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const combo = await getComboBySlug(slug);
  if (!combo) notFound();

  return (
    <article>
      <Link href="/" className="text-sm text-berry hover:underline">
        ← Back to feed
      </Link>

      <header className="mt-4">
        <h1 className="text-3xl font-black text-cocoa">{combo.title}</h1>
        <p className="text-lg text-cocoa/60 mt-1">{combo.cereals.join(" × ")}</p>
        <div className="mt-3 flex items-center gap-3">
          <BowlScore value={combo.overallBowls} size="text-2xl" />
          <span className="text-cocoa/60 font-semibold">
            {combo.overallBowls}/5 overall
          </span>
        </div>
      </header>

      {combo.photos.length > 0 && (
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {combo.photos.map((url, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={url}
              alt={`${combo.title} — photo ${i + 1}`}
              className="rounded-2xl w-full object-cover border-2 border-berry/10"
            />
          ))}
        </div>
      )}

      <section className="mt-8 grid gap-3 sm:grid-cols-2">
        {SUB_SCORES.map(({ key, label }) => (
          <div
            key={key}
            className="flex items-center justify-between bg-white rounded-xl px-4 py-3 border-2 border-berry/10"
          >
            <span className="font-semibold text-cocoa/80">{label}</span>
            <BowlScore value={combo[key]} size="text-base" />
          </div>
        ))}
      </section>

      {combo.notes && (
        <section className="mt-8 prose prose-cocoa max-w-none">
          <h2 className="text-xl font-bold text-cocoa mb-2">The verdict</h2>
          <p className="whitespace-pre-wrap leading-relaxed text-cocoa/90">
            {combo.notes}
          </p>
        </section>
      )}

      {combo.tags.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {combo.tags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              className="text-xs font-semibold bg-cream text-cocoa/70 rounded-full px-3 py-1 hover:text-berry"
            >
              #{tag}
            </Link>
          ))}
        </div>
      )}

      <p className="mt-8 text-sm text-cocoa/40">
        Reviewed {combo.createdAt.toLocaleDateString()}
      </p>
    </article>
  );
}
