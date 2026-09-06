

import InquiryBenefits from "./InquiryBenefits";
import InquiryFAQ from "./InquiryFAQ";
import InquiryForm from "./InquiryForm";
import InquiryHero from "./InquiryHero";
import type { FAQItem } from "./types";



const faqs: FAQItem[] = [
  {
    question: "Is the inquiry free?",
    answer:
      "Yes. Submitting an inquiry is completely free.",
  },
  {
    question: "When will I receive a response?",
    answer:
      "Usually within 30 minutes during business hours.",
  },
  {
    question: "Can I customize my itinerary?",
    answer:
      "Absolutely. Every trip can be personalized.",
  },
  {
    question: "Do I need to pay now?",
    answer:
      "No. Payment is only required after you approve the itinerary.",
  },
];

export default function InquiryPage() {
  return (
    <>
      <InquiryHero
        title="Let's Plan Your Dream Himalayan Journey"
        subtitle="Tell us your travel preferences and our experts will craft a personalized itinerary just for you."
        backgroundImage="/images/inquiry/inquiry-hero.jpg"
      />

     <InquiryBenefits />

      <InquiryForm />

      <InquiryFAQ
        faqs={faqs}
      />
    </>
  );
}