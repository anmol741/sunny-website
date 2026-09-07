"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Listing } from "@/lib/types";
import { formatPrice } from "@/lib/listings";
import PropertyPhoto from "@/components/PropertyPhoto";

export default function PropertyCard({
  listing,
  index = 0,
}: {
  listing: Listing;
  index?: number;
}) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="group overflow-hidden rounded-xl border border-navy/10 bg-white shadow-sm hover:shadow-xl"
    >
      <Link href={`/listings/${listing.slug}`}>
        <div className="relative h-56 overflow-hidden">
          <div className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-110">
            <PropertyPhoto seed={index} className="h-full w-full" />
          </div>
          <span
            className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold tracking-wide text-white ${
              listing.status === "Active"
                ? "bg-accent"
                : listing.status === "Pending"
                  ? "bg-gold text-navy"
                  : "bg-navy/70"
            }`}
          >
            {listing.status}
          </span>
        </div>
        <div className="p-5">
          <p className="font-serif text-2xl text-navy">
            {formatPrice(listing.price)}
          </p>
          <p className="mt-1 text-sm text-navy/70">
            {listing.address}, {listing.city}
          </p>
          <div className="mt-3 flex items-center gap-4 text-sm text-navy/60">
            <span>{listing.beds} bd</span>
            <span>{listing.baths} ba</span>
            <span>{listing.sqft.toLocaleString()} sqft</span>
          </div>
          <p className="mt-3 text-xs uppercase tracking-wide text-navy/40">
            MLS® {listing.mlsNumber}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
