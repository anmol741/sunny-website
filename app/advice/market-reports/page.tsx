import type { Metadata } from "next";
import Link from "next/link";
import AdvicePageLayout from "@/components/AdvicePageLayout";
import NewsCard from "@/components/NewsCard";
import { newsArticles } from "@/data/news";

export const metadata: Metadata = {
  title: "Market Reports | Sunny Chadha, REALTOR®",
  description:
    "Regular updates on North Shore real estate pricing trends and inventory.",
};

export default function MarketReportsPage() {
  const reports = newsArticles.filter((a) => a.category === "Market Report");

  return (
    <AdvicePageLayout
      eyebrow="Get Advice"
      title="Market Reports"
      intro="Regular, plain-language updates on pricing trends, inventory, and what they mean for buyers and sellers on the North Shore."
      ctaText="Want a report tailored to your street?"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {reports.map((r, i) => (
          <NewsCard key={r.slug} article={r} index={i} />
        ))}
      </div>
      <p className="text-sm text-navy/50">
        Looking for more neighbourhood coverage? Visit the full{" "}
        <Link href="/news" className="text-accent underline underline-offset-2">
          Neighbourhood News
        </Link>{" "}
        archive.
      </p>
    </AdvicePageLayout>
  );
}
