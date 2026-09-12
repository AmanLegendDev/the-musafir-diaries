import { getActiveFAQs } from "@/lib/queries/faq.queries";

export type AboutFAQ = {
  _id: string;
  question: string;
  answer: string;
  category?: string;
};

export async function getAboutFAQs(limit = 5): Promise<AboutFAQ[]> {
  const faqs = await getActiveFAQs();

  return faqs.slice(0, limit).map(
    (faq: {
      _id: unknown;
      question: string;
      answer: string;
      category?: string;
    }) => ({
      _id: String(faq._id),
      question: faq.question,
      answer: faq.answer,
      category: faq.category || "",
    }),
  );
}