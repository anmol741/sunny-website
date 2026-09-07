import listingsData from "@/data/listings.json";
import type { Listing } from "@/lib/types";

const listings = listingsData as Listing[];

export function getAllListings(): Listing[] {
  return listings;
}

export function getFeaturedListings(): Listing[] {
  return listings.filter((l) => l.featured);
}

export function getListingBySlug(slug: string): Listing | undefined {
  return listings.find((l) => l.slug === slug);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(price);
}
