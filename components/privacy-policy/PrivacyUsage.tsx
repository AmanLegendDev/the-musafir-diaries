import PrivacySection from "./PrivacySection";

const USES = [
  {
    number: "01",
    title: "Respond to enquiries",
    description:
      "To respond to your questions, understand your requirements and continue conversations you start with us.",
  },
  {
    number: "02",
    title: "Plan your journey",
    description:
      "To help us understand your destination, dates, traveller requirements and other preferences when planning a trip.",
  },
  {
    number: "03",
    title: "Provide requested services",
    description:
      "To coordinate travel-related services you ask us to arrange, such as accommodation, transportation or other trip components.",
  },
  {
    number: "04",
    title: "Communicate with you",
    description:
      "To send relevant information regarding your enquiry, booking or other interaction with The Musafir Diaries.",
  },
  {
    number: "05",
    title: "Improve our services",
    description:
      "To understand how our website and services are used and identify ways to make the travel experience clearer and better.",
  },
  {
    number: "06",
    title: "Protect our website and business",
    description:
      "To help maintain website security, prevent misuse, troubleshoot problems and meet applicable legal or regulatory requirements.",
  },
];

export default function PrivacyUsage() {
  return (
    <PrivacySection
      id="how-we-use-information"
      number="02"
      title="How We Use Your Information"
      intro="The information you share with us is used for genuine business and travel-related purposes."
      tone="cream"
    >
      <div className="grid gap-px overflow-hidden rounded-2xl border border-[#071A33]/10 bg-[#071A33]/10 sm:grid-cols-2 lg:grid-cols-3">
        {USES.map((item) => (
          <div
            key={item.number}
            className="bg-[#FAF9F5] p-6 sm:p-7 lg:p-8"
          >
            <span className="text-[10px] font-semibold tracking-[0.16em] text-[#087E8B]">
              {item.number}
            </span>

            <h3 className="mt-5 font-serif text-xl leading-tight tracking-[-0.02em] text-[#071A33]">
              {item.title}
            </h3>

            <p className="mt-3 text-sm leading-6 text-[#071A33]/50">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-8 max-w-3xl text-sm leading-7 text-[#071A33]/55 sm:text-base sm:leading-8">
        We aim to use personal information only for appropriate
        purposes connected with our business, your enquiries,
        requested services, website operation and our legal
        responsibilities.
      </p>
    </PrivacySection>
  );
}