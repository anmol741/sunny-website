"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getAllListings } from "@/lib/listings";
import PropertyCard from "@/components/PropertyCard";
import SectionReveal from "@/components/SectionReveal";
import type { Listing } from "@/lib/types";

const PROPERTY_TYPES: Listing["propertyType"][] = [
  "Single Family",
  "Condo",
  "Townhouse",
  "Land",
];

const PRICE_MAX = 4000000;

export default function ListingsExplorer() {
  const searchParams = useSearchParams();
  const allListings = useMemo(() => getAllListings(), []);

  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [propertyType, setPropertyType] = useState(
    searchParams.get("type") ?? "",
  );
  const [maxPrice, setMaxPrice] = useState(PRICE_MAX);
  const [beds, setBeds] = useState(0);
  const [baths, setBaths] = useState(0);

  const filtered = useMemo(() => {
    return allListings.filter((l) => {
      const haystack =
        `${l.address} ${l.city} ${l.postalCode} ${l.mlsNumber}`.toLowerCase();
      if (query && !haystack.includes(query.toLowerCase())) return false;
      if (propertyType && l.propertyType !== propertyType) return false;
      if (l.price > maxPrice) return false;
      if (beds && l.beds < beds) return false;
      if (baths && l.baths < baths) return false;
      return true;
    });
  }, [allListings, query, propertyType, maxPrice, beds, baths]);

  return (
    <>
      <div className="rounded-2xl border border-navy/10 bg-white p-5 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-navy/50">
              Location / MLS#
            </label>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="City, address, or MLS#"
              className="w-full rounded-lg border border-navy/15 px-3 py-2.5 text-sm text-navy outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-navy/50">
              Property Type
            </label>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full rounded-lg border border-navy/15 px-3 py-2.5 text-sm text-navy outline-none focus:border-accent"
            >
              <option value="">Any Type</option>
              {PROPERTY_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-navy/50">
              Min Beds
            </label>
            <select
              value={beds}
              onChange={(e) => setBeds(Number(e.target.value))}
              className="w-full rounded-lg border border-navy/15 px-3 py-2.5 text-sm text-navy outline-none focus:border-accent"
            >
              {[0, 1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n === 0 ? "Any" : `${n}+`}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-navy/50">
              Min Baths
            </label>
            <select
              value={baths}
              onChange={(e) => setBaths(Number(e.target.value))}
              className="w-full rounded-lg border border-navy/15 px-3 py-2.5 text-sm text-navy outline-none focus:border-accent"
            >
              {[0, 1, 2, 3, 4].map((n) => (
                <option key={n} value={n}>
                  {n === 0 ? "Any" : `${n}+`}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-navy/50">
              Max Price
            </label>
            <select
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full rounded-lg border border-navy/15 px-3 py-2.5 text-sm text-navy outline-none focus:border-accent"
            >
              <option value={PRICE_MAX}>Any Price</option>
              {[800000, 1000000, 1500000, 2000000, 3000000].map((p) => (
                <option key={p} value={p}>
                  Under ${(p / 1_000_000).toFixed(1)}M
                </option>
              ))}
            </select>
          </div>
        </div>

        {query || propertyType || beds || baths || maxPrice < PRICE_MAX ? (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setPropertyType("");
              setMaxPrice(PRICE_MAX);
              setBeds(0);
              setBaths(0);
            }}
            className="mt-4 text-xs font-medium text-accent hover:underline"
          >
            Clear all filters
          </button>
        ) : null}
      </div>

      <p className="mb-6 mt-8 text-sm text-navy/50">
        {filtered.length} {filtered.length === 1 ? "listing" : "listings"}{" "}
        found
      </p>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-navy/20 bg-white py-16 text-center text-navy/50">
          No listings match your search. Try adjusting your filters.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((listing, i) => (
            <SectionReveal key={listing.slug} delay={(i % 6) * 0.06}>
              <PropertyCard listing={listing} index={i} />
            </SectionReveal>
          ))}
        </div>
      )}
    </>
  );
}
