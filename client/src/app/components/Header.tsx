"use client";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { signOut, signIn, useSession } from "next-auth/react";

export default function Header() {
  const { data: session, status } = useSession();
  return (
    <>
      <header className="p-4 border-b shadow-sm flex gap-6">
        <nav className="flex gap-4 items-center">
          <Link href="/" className="text-blue-600 hover:underline">
            Home
          </Link>
          <Link href="/auth" className="text-blue-600 hover:underline">
            Sign In
          </Link>
          <Link href="/search" className="text-blue-600 hover:underline">
            Search Test
          </Link>
          <Link href="/initialize" className="text-blue-600 hover:underline">
            Initialize
          </Link>
        </nav>

        {status === "loading" ? (
          <p>Loading...</p>
        ) : session ? (
          <>
            <span>Signed in as: {session.user?.email}</span>
            <button
              onClick={() => signOut()}
              className="ml-4 px-2 py-1 border rounded"
            >
              Sign out
            </button>
          </>
        ) : (
          <>
            <span>Not signed in</span>
            <button
              onClick={() => signIn("google")}
              className="ml-4 px-2 py-1 border rounded"
            >
              Sign in
            </button>
          </>
        )}
      </header>
      ;
    </>
  );
}
