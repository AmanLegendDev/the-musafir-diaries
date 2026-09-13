import ContentCard from "./ContentCard";
import type {
  DashboardStats,
} from "@/lib/dashboard/dashboard-data";

interface Props {
  content: DashboardStats["content"];
}

export default function ContentOverview({
  content,
}: Props) {
  return (
    <section>
      <div className="mb-5">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#087E8B]">
          Content
        </p>

        <h2 className="mt-1 text-2xl font-bold tracking-tight text-[#071A33]">
          Manage your content
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Everything that powers the customer-facing experience.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <ContentCard
          type="destinations"
          count={content.destinations}
        />

        <ContentCard
          type="packages"
          count={content.packages}
        />

        <ContentCard
          type="hotels"
          count={content.hotels}
        />

        <ContentCard
          type="categories"
          count={content.categories}
        />

        <ContentCard
          type="blogs"
          count={content.blogs}
        />

        <ContentCard
          type="faqs"
          count={content.faqs}
        />

        <ContentCard
          type="testimonials"
          count={content.testimonials}
        />
      </div>
    </section>
  );
}