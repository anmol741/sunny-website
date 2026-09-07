import { Suspense } from "react";
import type { Metadata } from "next";
import Container from "@/components/Container";
import ListingsExplorer from "@/components/ListingsExplorer";

export const metadata: Metadata = {
  title: "Listings | Sunny Chadha, REALTOR®",
  description:
    "Browse current listings in North Vancouver, West Vancouver, and the surrounding North Shore.",
};

// TODO(CJ): This page is built against mock data in /data/listings.json.
// Live MLS/IDX data requires a licensed feed (RESO/RETS via the local real
// estate board, or an IDX provider such as iHomefinder or Chime). Do not
// scrape MLS/realtor.ca listing data directly — it violates board terms.
// Replace `getAllListings()` in lib/listings.ts with a real data source
// before launch.
export default function ListingsPage() {
  return (
    <div className="py-16">
      <Container>
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            Listings
          </p>
          <h1 className="mt-2 font-serif text-4xl text-navy">
            Find Your Next Home
          </h1>
          <p className="mt-3 max-w-2xl text-navy/60">
            Search current listings across North Vancouver, West Vancouver,
            and the surrounding North Shore.
          </p>
        </div>

        <Suspense fallback={null}>
          <ListingsExplorer />
        </Suspense>
      </Container>
    </div>
  );
}
