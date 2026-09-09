import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/Container";
import SectionReveal from "@/components/SectionReveal";
import TestimonialCard from "@/components/TestimonialCard";
import CTAButton from "@/components/CTAButton";
import { testimonials } from "@/data/testimonials";

const GOOGLE_REVIEWS_URL = "https://maps.app.goo.gl/sxxTHyhpYRRkWc9UA?g_st=iwb";

export const metadata: Metadata = {
  title: "Testimonials | Sunny Chadha, REALTOR®",
  description:
    "What buyers and sellers say about working with Sunny Chadha, REALTOR® with Century 21 Coastal Realty Ltd.",
};

export default function TestimonialsPage() {
  return (
    <div className="py-16">
      <Container>
        <SectionReveal className="max-w-2xl">
          <div className="flex items-center gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
              Testimonials
            </p>
            <Image
              src="/logo.jpeg"
              alt="Sunny Chadha credential badge"
              width={88}
              height={88}
              className="h-20 w-20 rounded-full object-cover"
            />
          </div>
          <h1 className="mt-2 font-serif text-4xl text-navy">
            What Clients Say
          </h1>
          <p className="mt-4 text-lg text-navy/60">
            Real experiences from buyers and sellers Sunny has worked with
            across the North Shore.
          </p>
        </SectionReveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <SectionReveal key={t.id} delay={(i % 6) * 0.06}>
              <TestimonialCard t={t} />
            </SectionReveal>
          ))}
        </div>

        <SectionReveal delay={0.1} className="mt-14 text-center">
          <p className="font-serif text-2xl text-navy">
            Ready to write your own story?
          </p>
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm font-medium text-accent hover:underline"
          >
            Read more reviews on Google
          </a>
          <div className="mt-6">
            <CTAButton href="/contact">Get in Touch</CTAButton>
          </div>
        </SectionReveal>
      </Container>
    </div>
  );
}
