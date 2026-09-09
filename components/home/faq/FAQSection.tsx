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
          </div>
        </div>
      </div>
    </section>
  );
}