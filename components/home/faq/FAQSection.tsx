import Link from "next/link";
import { ArrowRight } from "lucide-react";

import FAQHeader from "./FAQHeader";
import FAQGrid, { type HomeFAQ } from "./FAQGrid";

interface FAQSectionProps {
  faqs: HomeFAQ[];
}

export default function FAQSection({
  faqs,
}: FAQSectionProps) {
  if (faqs.length === 0) return null;

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-32"
    >
      {/* Soft ambient details */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-[#087E8B]/[0.045] blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#F59E0B]/[0.045] blur-3xl"
      />

      {/* Top editorial line */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-[#071A33]/10"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          {/* Header */}
          <div className="lg:col-span-4">
            <FAQHeader />
          </div>

          {/* Questions */}
          <div className="lg:col-span-8">
            <FAQGrid faqs={faqs} />

            {/* FAQ CTA */}
            <div className="mt-12 flex justify-start sm:mt-14 lg:mt-16">
              <Link
                href="/faq"
                className="group inline-flex items-center gap-4 text-sm font-semibold tracking-[0.02em] text-[#071A33] transition-colors duration-200 hover:text-[#087E8B] focus:outline-none focus:ring-4 focus:ring-[#087E8B]/10"
              >
                <span className="relative pb-1">
                  View all FAQs

                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 h-px w-full origin-left bg-[#071A33]/30 transition-transform duration-300 group-hover:scale-x-0"
                  />
                </span>

                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#071A33]/15 bg-white transition-all duration-200 group-hover:border-[#087E8B]/40 group-hover:bg-[#087E8B] group-hover:text-white">
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                    strokeWidth={1.7}
                  />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}