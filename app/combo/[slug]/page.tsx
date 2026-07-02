import { notFound } from "next/navigation";
import Link from "next/link";
import { getComboBySlug, getAllSlugs, SUB_SCORES } from "@/lib/combo";
import { BowlScore } from "@/components/BowlScore";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default async function ComboPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const combo = getComboBySlug(slug);
  if (!combo) notFound();

  return (
    <article>
      <Link
        href="/"
        className="inline-block text-sm font-extrabold uppercase tracking-wide text-berry hover:underline"
      >
        ← Back to feed
      </Link>

      <header className="mt-4">
        <h1 className="wordmark text-3xl sm:text-4xl text-cocoa leading-tight">
          {combo.title}
        </h1>
        <p className="text-lg font-bold text-cocoa/50 mt-1">
          {combo.cereals.join(" × ")}
        </p>
        <div className="mt-4 inline-flex items-center gap-3 rounded-full bg-honey/30 border-2 border-honey px-4 py-2">
          <BowlScore value={combo.overallBowls} size="text-2xl" />
          <span className="font-display font-black text-cocoa">
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
              className="rounded-3xl w-full object-cover border-4 border-cocoa/10"
            />
          ))}
        </div>
      )}

      <section className="mt-8 grid gap-3 sm:grid-cols-2">
        {SUB_SCORES.map(({ key, label }) => (
          <div
            key={key}
            className="flex items-center justify-between bg-white rounded-2xl px-4 py-3 border-4 border-cocoa/10"
          >
            <span className="font-extrabold text-cocoa/80">{label}</span>
            <BowlScore value={combo[key]} size="text-base" />
          </div>
        ))}
      </section>

      {combo.notes && (
        <section className="mt-8">
          <h2 className="wordmark text-2xl text-cocoa mb-1">The verdict</h2>
          <div className="rainbow-rule w-20 mb-3" />
          <p className="whitespace-pre-wrap leading-relaxed text-lg text-cocoa/90">
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
              className="text-xs font-extrabold bg-grape/10 text-grape rounded-full px-3 py-1.5 hover:bg-grape hover:text-white transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
      )}

      <p className="mt-8 text-sm font-bold text-cocoa/40">
        Reviewed {combo.createdAt.toLocaleDateString()}
      </p>
    </article>
  );
}
