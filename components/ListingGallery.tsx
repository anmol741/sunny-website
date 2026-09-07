"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PropertyPhoto from "@/components/PropertyPhoto";

export default function ListingGallery({
  photoCount,
  seedOffset,
}: {
  photoCount: number;
  seedOffset: number;
}) {
  const [active, setActive] = useState(0);
  const photos = Array.from({ length: photoCount });

  return (
    <div>
      <div className="relative h-72 overflow-hidden rounded-2xl sm:h-[420px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <PropertyPhoto
              seed={seedOffset + active}
              className="h-full w-full"
              label={`Photo ${active + 1} of ${photoCount}`}
            />
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          onClick={() => setActive((a) => (a - 1 + photoCount) % photoCount)}
          aria-label="Previous photo"
          className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-navy backdrop-blur transition hover:bg-white"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
            <path
              d="m15 6-6 6 6 6"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => setActive((a) => (a + 1) % photoCount)}
          aria-label="Next photo"
          className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-navy backdrop-blur transition hover:bg-white"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
            <path
              d="m9 6 6 6-6 6"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="mt-3 flex justify-center gap-2">
        {photos.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`View photo ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              i === active ? "w-6 bg-accent" : "w-1.5 bg-navy/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
