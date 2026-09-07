"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export default function SearchBar({ dark = false }: { dark?: boolean }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (type) params.set("type", type);
    router.push(`/listings${params.toString() ? `?${params.toString()}` : ""}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex w-full max-w-2xl flex-col gap-3 rounded-2xl p-3 shadow-xl sm:flex-row ${
        dark ? "bg-white/95" : "bg-white"
      }`}
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Location, postal code, or MLS#"
        className="flex-1 rounded-xl border border-navy/10 px-4 py-3 text-sm text-navy outline-none placeholder:text-navy/40 focus:border-accent"
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="rounded-xl border border-navy/10 px-4 py-3 text-sm text-navy outline-none focus:border-accent"
      >
        <option value="">Any Type</option>
        <option value="Single Family">Single Family</option>
        <option value="Condo">Condo</option>
        <option value="Townhouse">Townhouse</option>
        <option value="Land">Land</option>
      </select>
      <button
        type="submit"
        className="rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-light"
      >
        Search
      </button>
    </form>
  );
}
