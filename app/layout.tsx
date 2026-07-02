import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cereal Synergy",
  description:
    "Two cereals. One bowl. Infinite science. Reviews of cereal combinations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <header className="bg-cream border-b-4 border-berry">
          <div className="max-w-4xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-3xl group-hover:-rotate-12 transition-transform">
                🥣
              </span>
              <span className="wordmark text-2xl sm:text-3xl text-berry">
                Cereal Synergy
              </span>
            </Link>
            <nav className="flex gap-2 text-sm font-extrabold uppercase tracking-wide">
              <Link
                href="/"
                className="px-3 py-1.5 rounded-full bg-white border-2 border-cocoa/10 hover:border-berry hover:text-berry transition-colors"
              >
                Feed
              </Link>
              <Link
                href="/leaderboard"
                className="px-3 py-1.5 rounded-full bg-white border-2 border-cocoa/10 hover:border-berry hover:text-berry transition-colors"
              >
                Leaderboard
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
          {children}
        </main>

        <footer className="mt-8">
          <div className="rainbow-rule" />
          <div className="bg-cream py-6 text-center">
            <p className="wordmark text-lg text-cocoa/70">
              Two cereals. One bowl. Infinite science.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
