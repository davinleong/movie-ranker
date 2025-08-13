import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Movie Ranker",
  description: "Rank your favorite movies with Movie Ranker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="p-4 border-b shadow-sm flex gap-6">
          <h1 className="text-xl font-bold flex-shrink-0">Movie Ranker</h1>
          <nav className="flex gap-4 items-center">
            <Link href="/auth" className="text-blue-600 hover:underline">
              Sign In
            </Link>
            <Link href="/search" className="text-blue-600 hover:underline">
              Search
            </Link>
          </nav>
        </header>

        <main>{children}</main>
      </body>
    </html>
  );
}
