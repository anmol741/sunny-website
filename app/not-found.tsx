import Container from "@/components/Container";
import CTAButton from "@/components/CTAButton";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center py-16">
      <Container className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
          404
        </p>
        <h1 className="mt-2 font-serif text-4xl text-navy">
          Page Not Found
        </h1>
        <p className="mx-auto mt-4 max-w-md text-navy/60">
          The page you&apos;re looking for doesn&apos;t exist or may have
          moved.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <CTAButton href="/">Back Home</CTAButton>
          <CTAButton href="/listings" variant="ghost">
            View Listings
          </CTAButton>
        </div>
      </Container>
    </div>
  );
}
