import type { ReactNode } from "react";
import Container from "@/components/Container";
import SectionReveal from "@/components/SectionReveal";
import CTAButton from "@/components/CTAButton";

export default function AdvicePageLayout({
  eyebrow,
  title,
  intro,
  children,
  ctaText,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
  ctaText?: string;
}) {
  return (
    <div className="py-16">
      <Container className="max-w-3xl">
        <SectionReveal>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            {eyebrow}
          </p>
          <h1 className="mt-2 font-serif text-4xl text-navy">{title}</h1>
          <p className="mt-4 text-lg text-navy/60">{intro}</p>
        </SectionReveal>

        <SectionReveal delay={0.08} className="prose-navy mt-10 space-y-8">
          {children}
        </SectionReveal>

        <SectionReveal delay={0.12}>
          <div className="mt-14 rounded-2xl bg-navy p-8 text-center text-white">
            <p className="font-serif text-2xl">
              {ctaText ?? "Have questions about your next move?"}
            </p>
            <p className="mt-2 text-white/70">
              Reach out for a no-obligation conversation about your goals.
            </p>
            <div className="mt-6">
              <CTAButton href="/contact">Talk to Sunny</CTAButton>
            </div>
          </div>
        </SectionReveal>
      </Container>
    </div>
  );
}
