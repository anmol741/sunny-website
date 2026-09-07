// TODO(CJ/Anmol): Set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in your environment to
// enable the live map embed. See README.md for setup details.
export default function MapEmbed({
  lat,
  lng,
  address,
}: {
  lat: number;
  lng: number;
  address: string;
}) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div className="flex h-72 flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-navy/20 bg-neutral text-center text-navy/50">
        <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none">
          <path
            d="M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11Z"
            stroke="currentColor"
            strokeWidth={1.4}
          />
          <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth={1.4} />
        </svg>
        <p className="max-w-xs text-sm">
          Map preview unavailable — set{" "}
          <code className="text-xs">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> to
          enable.
        </p>
      </div>
    );
  }

  return (
    <iframe
      title={`Map showing ${address}`}
      className="h-72 w-full rounded-2xl border-0"
      loading="lazy"
      allowFullScreen
      src={`https://www.google.com/maps/embed/v1/view?key=${apiKey}&center=${lat},${lng}&zoom=14`}
    />
  );
}
