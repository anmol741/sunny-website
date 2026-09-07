import type { Testimonial } from "@/lib/types";

export default function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
      <div className="mb-3 flex gap-0.5 text-gold">
        {Array.from({ length: t.rating }).map((_, i) => (
          <svg key={i} viewBox="0 0 20 20" className="h-4 w-4 fill-current">
            <path d="M10 1.5l2.6 5.6 6.2.6-4.6 4.2 1.3 6.1L10 15l-5.5 3 1.3-6.1L1.2 7.7l6.2-.6z" />
          </svg>
        ))}
      </div>
      <p className="flex-1 text-sm leading-relaxed text-navy/75">
        &ldquo;{t.quote}&rdquo;
      </p>
      <div className="mt-5 border-t border-navy/10 pt-4">
        <p className="text-sm font-semibold text-navy">{t.name}</p>
        <p className="text-xs text-navy/50">{t.location}</p>
      </div>
    </div>
  );
}
