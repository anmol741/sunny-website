import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionReveal from "@/components/SectionReveal";
import ListingGallery from "@/components/ListingGallery";
import MapEmbed from "@/components/MapEmbed";
import LeadForm from "@/components/LeadForm";
import { getAllListings, getListingBySlug, formatPrice } from "@/lib/listings";

export function generateStaticParams() {
  return getAllListings().map((l) => ({ slug: l.slug }));
}

export async function generateMetadata(
  props: PageProps<"/listings/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const listing = getListingBySlug(slug);
  if (!listing) return {};

  return {
    title: `${listing.address}, ${listing.city} | Sunny Chadha, REALTOR®`,
    description: listing.description,
  };
}

export default async function ListingDetailPage(
  props: PageProps<"/listings/[slug]">,
) {
  const { slug } = await props.params;
  const listing = getListingBySlug(slug);

  if (!listing) notFound();

  const allListings = getAllListings();
  const seedOffset = allListings.findIndex((l) => l.slug === slug) * 10;

  const facts: [string, string][] = [
    ["Price", formatPrice(listing.price)],
    ["MLS® Number", listing.mlsNumber],
    ["Status", listing.status],
    ["Property Type", listing.propertyType],
    ["Bedrooms", String(listing.beds)],
    ["Bathrooms", String(listing.baths)],
    ["Square Footage", `${listing.sqft.toLocaleString()} sqft`],
    ["Lot Size", listing.lotSize ?? "—"],
    ["Year Built", listing.yearBuilt ? String(listing.yearBuilt) : "—"],
  ];

  return (
    <div className="py-12">
      <Container>
        <SectionReveal>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            {listing.status} &middot; MLS® {listing.mlsNumber}
          </p>
          <h1 className="mt-2 font-serif text-3xl text-navy sm:text-4xl">
            {listing.address}
          </h1>
          <p className="mt-1 text-navy/60">
            {listing.city}, {listing.province} {listing.postalCode}
          </p>
        </SectionReveal>

        <SectionReveal delay={0.06} className="mt-8">
          <ListingGallery photoCount={listing.photoCount} seedOffset={seedOffset} />
        </SectionReveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-3">
          <div className="space-y-10 lg:col-span-2">
            <SectionReveal>
              <p className="font-serif text-3xl text-navy">
                {formatPrice(listing.price)}
              </p>
              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-navy/60">
                <span>{listing.beds} bedrooms</span>
                <span>{listing.baths} bathrooms</span>
                <span>{listing.sqft.toLocaleString()} sqft</span>
                {listing.lotSize ? <span>{listing.lotSize} lot</span> : null}
              </div>
            </SectionReveal>

            <SectionReveal>
              <h2 className="font-serif text-xl text-navy">Description</h2>
              <p className="mt-3 leading-relaxed text-navy/70">
                {listing.description}
              </p>
            </SectionReveal>

            <SectionReveal>
              <h2 className="font-serif text-xl text-navy">Key Facts</h2>
              <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
                {facts.map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-xs uppercase tracking-wide text-navy/40">
                      {label}
                    </dt>
                    <dd className="mt-0.5 text-sm font-medium text-navy">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </SectionReveal>

            <SectionReveal>
              <h2 className="font-serif text-xl text-navy">Features</h2>
              <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
                {listing.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-sm text-navy/70"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {f}
                  </li>
                ))}
              </ul>
            </SectionReveal>

            <SectionReveal>
              <h2 className="font-serif text-xl text-navy">Location</h2>
              <div className="mt-4">
                <MapEmbed
                  lat={listing.lat}
                  lng={listing.lng}
                  address={`${listing.address}, ${listing.city}`}
                />
              </div>
            </SectionReveal>
          </div>

          <SectionReveal className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
              <p className="font-serif text-xl text-navy">
                Request a Showing
              </p>
              <p className="mt-1 mb-5 text-sm text-navy/60">
                Sunny typically responds within a few hours.
              </p>
              <LeadForm
                formType="showing"
                listingAddress={`${listing.address}, ${listing.city}`}
                listingMls={listing.mlsNumber}
                compact
              />
            </div>
          </SectionReveal>
        </div>
      </Container>
    </div>
  );
}
