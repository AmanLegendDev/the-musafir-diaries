import PrivacySection from "./PrivacySection";

const SHARING_CASES = [
  {
    title: "When you request a travel service",
    text: "Where necessary to arrange a service you have requested, relevant information may be shared with the appropriate travel or service provider.",
  },
  {
    title: "With trusted service providers",
    text: "We may use third-party providers that support website operation, communication, technology, payment processing or other legitimate business functions.",
  },
  {
    title: "When required by law",
    text: "Information may be disclosed where we believe disclosure is required by applicable law, regulation, legal process or a lawful request.",
  },
  {
    title: "To protect people or our business",
    text: "Information may be shared when reasonably necessary to investigate misuse, protect security, prevent fraud or protect the rights and safety of people or the business.",
  },
];

export default function PrivacySharing() {
  return (
    <PrivacySection
      id="how-we-share-information"
      number="03"
      title="How We Share Information"
      intro="We do not treat your personal information as something to sell. When information needs to be shared, the purpose should be connected to providing a service, operating our business or meeting a legitimate legal obligation."
    >
      <div className="space-y-0 divide-y divide-[#071A33]/10 border-y border-[#071A33]/10">
        {SHARING_CASES.map((item, index) => (
          <div
            key={item.title}
            className="grid gap-4 py-7 sm:grid-cols-[70px_1fr] sm:gap-8 sm:py-8"
          >
            <span className="text-[10px] font-semibold tracking-[0.16em] text-[#F59E0B]">
              {String(index + 1).padStart(2, "0")}
            </span>

            <div>
              <h3 className="font-serif text-xl tracking-[-0.02em] text-[#071A33] sm:text-2xl">
                {item.title}
              </h3>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-[#071A33]/55 sm:text-base sm:leading-8">
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl bg-[#071A33] px-6 py-7 text-white sm:px-8 sm:py-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8ED9DF]">
          Our approach
        </p>

        <p className="mt-3 max-w-3xl font-serif text-xl leading-relaxed tracking-[-0.015em] text-white/90 sm:text-2xl">
          We aim to share only the information that is reasonably
          needed for the relevant purpose.
        </p>
      </div>
    </PrivacySection>
  );
}