import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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
        <header className="bg-white">
          <div className="max-w-5xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <Image
                src="/logo.png"
                alt="Cereal Synergy logo"
                width={48}
                height={48}
                priority
                className="rounded-full group-hover:rotate-6 transition-transform"
              />
              <span className="wordmark text-2xl sm:text-3xl">
                Cereal Synergy
              </span>
            </Link>
            <nav className="flex gap-2 text-sm font-extrabold uppercase tracking-wide">
              <Link
                href="/"
                className="px-3 py-1.5 rounded-full text-navy/70 hover:text-white hover:bg-blue transition-colors"
              >
                Browse
              </Link>
              <Link
                href="/leaderboard"
                className="px-3 py-1.5 rounded-full text-navy/70 hover:text-white hover:bg-blue transition-colors"
              >
                Leaderboard
              </Link>
            </nav>
          </div>
          <div className="h-1.5 bg-gradient-to-r from-gold to-blue" />
        </header>

        <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
          {children}
        </main>

        <footer className="mt-8">
          <div className="rainbow-rule" />
          <div className="bg-white py-6 text-center">
            <p className="wordmark text-lg">
              Two cereals. One bowl. Infinite science.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
