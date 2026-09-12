import { ArrowUpRight, Plus } from "lucide-react";

export type FeaturedFAQ = {
  _id: string;
  question: string;
  answer: string;
  category?: string;
  featured?: boolean;
  displayOrder?: number;
};

type Props = {
  faqs: FeaturedFAQ[];
};

function formatCategory(category?: string) {
  if (!category?.trim()) {
    return "Travel information";
  }

  return category
    .trim()
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default function FAQFeatured({ faqs }: Props) {
  if (!faqs.length) {
    return null;
  }

  const featured = faqs
    .filter((faq) => faq?.question && faq?.answer)
    .slice(0, 5);

  if (!featured.length) {
    return null;
  }

  return (
    <section className="bg-[#FAF9F5]">
      <div className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 sm:pb-20 lg:px-10 lg:pb-24">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          {/* Section heading */}
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[#F59E0B]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#087E8B]">
                Start here
              </span>
            </div>

            <h2 className="mt-6 max-w-md font-serif text-3xl leading-[1.08] tracking-[-0.035em] text-[#071A33] sm:text-4xl">
              A few questions travellers ask before they go.
            </h2>

            <p className="mt-5 max-w-sm text-sm leading-6 text-[#071A33]/45">
              These are some of the most important questions
              currently highlighted by our travel team.
            </p>
          </div>

          {/* Featured questions */}
          <div className="border-t border-[#071A33]/10">
            {featured.map((faq, index) => (
              <div
                key={faq._id}
                className="group border-b border-[#071A33]/10 py-6 sm:py-7"
              >
                <div className="flex items-start gap-4 sm:gap-6">
                  <span className="w-7 shrink-0 pt-1 text-xs font-medium tracking-[0.08em] text-[#071A33]/25">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-[#071A33]/35">
                      {formatCategory(faq.category)}
                    </p>

                    <h3 className="mt-2 max-w-2xl font-serif text-xl leading-[1.25] tracking-[-0.025em] text-[#071A33] transition-colors duration-300 group-hover:text-[#087E8B] sm:text-2xl">
                      {faq.question}
                    </h3>
                  </div>

                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#071A33]/10 text-[#071A33]/45 transition duration-300 group-hover:border-[#087E8B]/25 group-hover:bg-[#087E8B] group-hover:text-white"
                  >
                    <Plus className="h-4 w-4" />
                  </span>
                </div>

                {/* Small visual cue */}
                <div className="mt-4 ml-11 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#071A33]/25 opacity-0 transition duration-300 group-hover:opacity-100 sm:ml-[3.25rem]">
                  <span>Explore answer</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}