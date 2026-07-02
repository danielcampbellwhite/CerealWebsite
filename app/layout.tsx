import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cereal Synergy",
  description: "Two cereals. One bowl. Infinite science. Reviews of cereal combinations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <header className="border-b-2 border-berry/20 bg-cream">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-baseline gap-2">
              <span className="text-2xl">🥣</span>
              <span className="text-2xl font-black text-berry tracking-tight">
                Cereal Synergy
              </span>
            </Link>
            <nav className="flex gap-4 text-sm font-semibold">
              <Link href="/" className="hover:text-berry">Feed</Link>
              <Link href="/leaderboard" className="hover:text-berry">Leaderboard</Link>
            </nav>
          </div>
        </header>

        <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
          {children}
        </main>

        <footer className="border-t-2 border-berry/10 py-6 text-center text-sm text-cocoa/60">
          <p>Two cereals. One bowl. Infinite science.</p>
        </footer>
      </body>
    </html>
  );
}
