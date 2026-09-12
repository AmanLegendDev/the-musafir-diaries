import InquiryBenefits from "./InquiryBenefits";
import InquiryFAQ from "./InquiryFAQ";
import InquiryForm from "./InquiryForm";
import InquiryHero from "./InquiryHero";
import type { FAQItem } from "./types";

const faqs: FAQItem[] = [
  {
    question: "Is submitting an inquiry free?",
    answer:
      "Yes. You can submit an inquiry without making a payment. It simply gives us the details needed to understand your travel plans.",
  },
  {
    question: "Do I need to know my complete itinerary?",
    answer:
      "No. You can share whatever you already know — destination, approximate dates, group size, budget and the experiences you're interested in. The rest can be discussed as your plan takes shape.",
  },
  {
    question: "Can I request a customised trip?",
    answer:
      "You can share your preferences and requirements in the inquiry. The itinerary can then be discussed based on your destination, travel dates, group and requested experiences.",
  },
  {
    question: "What happens after I submit the inquiry?",
    answer:
      "Your inquiry is saved for review. The next conversation can cover your requirements, itinerary possibilities, availability and pricing before any final travel arrangement is made.",
  },
  {
    question: "Does submitting an inquiry confirm my trip?",
    answer:
      "No. An inquiry is a planning request, not a final booking confirmation. Any itinerary, availability, pricing and booking details will need to be discussed and confirmed separately.",
  },
];

export default function InquiryPage() {
  return (
    <main className="bg-[#FAF9F5] text-[#071A33]">
      <InquiryHero />

      <InquiryBenefits />

      <InquiryForm />

      <InquiryFAQ faqs={faqs} />
    </main>
  );
}