import CTAButton from "@/components/CTAButton";

// TODO(CJ): Swap the placeholder monogram below for Sunny's real headshot
// once photo assets are provided.
export default function AgentIntroCard() {
  return (
    <div className="flex flex-col items-center gap-8 rounded-2xl border border-navy/10 bg-white p-8 shadow-sm sm:flex-row sm:p-10">
      <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-navy to-accent font-serif text-4xl text-white">
        SC
      </div>
      <div className="text-center sm:text-left">
        <p className="font-serif text-2xl text-navy">Sunny Chadha</p>
        <p className="mt-1 text-sm font-medium uppercase tracking-wide text-accent">
          REALTOR®
        </p>
        <p className="mt-3 max-w-md text-sm text-navy/60">
          Century 21 Coastal Realty Ltd. — serving North Vancouver, West
          Vancouver, and the surrounding Lower Mainland.
        </p>
        <div className="mt-4 flex flex-col gap-1 text-sm text-navy/70 sm:flex-row sm:gap-6">
          <a href="tel:+16045551234" className="hover:text-accent">
            (604) 555-1234
          </a>
          <a
            href="mailto:sunny.chadha@century21.ca"
            className="hover:text-accent"
          >
            sunny.chadha@century21.ca
          </a>
        </div>
        <div className="mt-6">
          <CTAButton href="/about" variant="ghost">
            Meet Sunny
          </CTAButton>
        </div>
      </div>
    </div>
  );
}
