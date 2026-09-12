import PrivacySection from "./PrivacySection";

const INFORMATION_GROUPS = [
  {
    title: "Information you provide",
    items: [
      "Your name and contact details.",
      "Email address and phone or WhatsApp number.",
      "Preferred destination, travel dates and traveller details.",
      "Information included in an enquiry, message or other communication.",
      "Details you choose to provide when discussing a trip, accommodation or travel service.",
    ],
  },
  {
    title: "Travel-related information",
    items: [
      "Your destination preferences and approximate travel plans.",
      "Group size or traveller requirements that you choose to share.",
      "Preferences or requests that help us understand the journey you are considering.",
    ],
  },
  {
    title: "Information collected automatically",
    items: [
      "Basic technical information about how you interact with our website may be collected through standard web technologies.",
      "This may include browser, device, approximate usage and website interaction information, depending on the technologies active on the website.",
    ],
  },
];

export default function PrivacyInformation() {
  return (
    <PrivacySection
      id="information-we-collect"
      number="01"
      title="Information We Collect"
      intro="We collect information that helps us understand your enquiry, communicate with you and provide the travel-related services you request."
    >
      <div className="space-y-10">
        {INFORMATION_GROUPS.map((group) => (
          <div key={group.title}>
            <h3 className="font-serif text-xl tracking-[-0.02em] text-[#071A33] sm:text-2xl">
              {group.title}
            </h3>

            <ul className="mt-5 space-y-3">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm leading-7 text-[#071A33]/55 sm:text-base"
                >
                  <span className="mt-[0.8rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#087E8B]" />

                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="border-l-2 border-[#F59E0B]/60 bg-[#FAF9F5] px-5 py-5 sm:px-6">
          <p className="text-sm leading-7 text-[#071A33]/60">
            Please avoid sharing information that is not necessary
            for your enquiry. If particularly sensitive information
            is relevant to your travel arrangements, we will handle
            it only as needed for the purpose for which it was
            provided.
          </p>
        </div>
      </div>
    </PrivacySection>
  );
}