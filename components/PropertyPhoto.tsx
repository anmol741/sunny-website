const GRADIENTS = [
  "from-[#0B1F3A] via-[#1E4FA3] to-[#3d6bc4]",
  "from-[#12315c] via-[#0B1F3A] to-[#1a2f52]",
  "from-[#1E4FA3] via-[#12315c] to-[#0B1F3A]",
  "from-[#0B1F3A] via-[#2c4a7c] to-[#C9A961]",
];

// TODO(CJ): Replace with real MLS listing photos once the IDX/RETS feed is connected.
// Do not scrape realtor.ca or MLS photos directly — see /listings TODO comment.
export default function PropertyPhoto({
  seed = 0,
  className = "",
  label,
}: {
  seed?: number;
  className?: string;
  label?: string;
}) {
  const gradient = GRADIENTS[seed % GRADIENTS.length];

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br ${gradient} ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-10 w-10 text-white/25 sm:h-14 sm:w-14"
        aria-hidden="true"
      >
        <path
          d="M3 11.5 12 4l9 7.5"
          stroke="currentColor"
          strokeWidth={1.4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.5 10v9a1 1 0 0 0 1 1H10v-5.5h4V20h3.5a1 1 0 0 0 1-1v-9"
          stroke="currentColor"
          strokeWidth={1.4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {label ? (
        <span className="absolute bottom-2 right-2 rounded-full bg-black/25 px-2.5 py-1 text-[10px] uppercase tracking-wide text-white/70 backdrop-blur-sm">
          {label}
        </span>
      ) : null}
    </div>
  );
}
