import TermsSection from "./TermsSection";

const PRICING_POINTS = [
  {
    title: "Prices shown on the website",
    text: "Prices displayed on the website are provided for the relevant package or service and may be subject to availability, selected options and the final arrangements agreed with the traveller.",
  },
  {
    title: "What the price includes",
    text: "Inclusions and exclusions should be reviewed carefully before confirming a journey. Services not specifically identified as included should not be assumed to be part of the package.",
  },
  {
    title: "Price changes before confirmation",
    text: "Travel prices may change because of supplier availability, accommodation rates, transportation costs, seasonal conditions or other operational factors before a booking is confirmed.",
  },
  {
    title: "Taxes and additional charges",
    text: "Any applicable taxes, fees, permits, activities, personal expenses or other charges should be understood from the specific quotation or booking information provided for your journey.",
  },
];

export default function TermsPricing() {
  return (
    <TermsSection
      id="pricing"
      number="02"
      title="Pricing & Inclusions"
      intro="Travel pricing depends on the services selected, availability and the arrangements required for a particular journey."
      tone="cream"
    >
      <div className="grid gap-4 md:grid-cols-2">
        {PRICING_POINTS.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-[#071A33]/10 bg-white p-6 sm:p-8"
          >
            <h3 className="font-serif text-xl tracking-[-0.02em] text-[#071A33] sm:text-2xl">
              {item.title}
            </h3>

            <p className="mt-4 text-sm leading-7 text-[#071A33]/55 sm:text-base sm:leading-8">
              {item.text}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-8 max-w-3xl text-sm leading-7 text-[#071A33]/55 sm:text-base sm:leading-8">
        Where a personalised quotation is provided, the terms,
        inclusions and price communicated in that quotation should
        be reviewed alongside these general Terms & Conditions.
      </p>
    </TermsSection>
  );
}