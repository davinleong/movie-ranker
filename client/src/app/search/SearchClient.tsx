"use client";
import { useEffect, useState } from "react";
import { Movie } from "@/types/movie";

export default function SearchClient() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const MOVIE_API_URL = process.env.MOVIE_API_URL || "http://localhost:3001";

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${MOVIE_API_URL}/search?q=${encodeURIComponent(query)}`
        );
        console.log("Raw response:", res);
        if (!res.ok) throw new Error("Fetch failed");
        const data = await res.json();
        setResults(data.results || []);
      } catch (err) {
        console.error(err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    // Debounce: wait 300ms after last keystroke before fetching
    const debounce = setTimeout(fetchData, 300);

    return () => clearTimeout(debounce); // cleanup on query change
  }, [query]);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div className="justify-items-left">
        <h1>Search Page</h1>
        <p>This page is used to test searches</p>
      </div>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {/* fetch info from localhost */}
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 rounded"
        />
        {loading && <p>Loading...</p>}
        {!loading && results.length === 0 && query && <p>No results found.</p>}
        <ul>
          {results.map((movie) => (
            <li key={movie.id}>
              {movie.title} ({movie.release_date?.slice(0, 4)}){" "}
              {/* {movie.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={`${movie.title} poster`}
                />
              )} */}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}