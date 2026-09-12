import type { Metadata } from "next";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/footer/Footer";

import FAQHero from "@/components/faqs/FAQHero";
import FAQIntro from "@/components/faqs/FAQIntro";
import FAQFeatured from "@/components/faqs/FAQFeatured";
import FAQListing from "@/components/faqs/FAQListing";
import FAQCTA from "@/components/faqs/FAQCTA";

import {
  getActiveFAQs,
  getFeaturedFAQs,
  getFAQCategories,
} from "@/lib/queries/faq.queries";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://the-musafir-diaries.vercel.app";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | The Musafir Diaries",

  description:
    "Find answers about destinations, trip planning, bookings, stays and journeys with The Musafir Diaries.",

  alternates: {
    canonical: "/faqs",
  },

  openGraph: {
    title:
      "Frequently Asked Questions | The Musafir Diaries",

    description:
      "Everything you need to know before planning your journey with The Musafir Diaries.",

    url: `${SITE_URL}/faqs`,

    siteName: "The Musafir Diaries",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Frequently Asked Questions | The Musafir Diaries",

    description:
      "Answers about destinations, travel planning, bookings and stays with The Musafir Diaries.",
  },
};

export default async function FAQPage() {
  const [
    activeFAQs,
    featuredFAQs,
    categories,
  ] = await Promise.all([
    getActiveFAQs(),
    getFeaturedFAQs(5),
    getFAQCategories(),
  ]);

  const faqEntities = activeFAQs
    .filter(
      (faq: {
        question?: string;
        answer?: string;
      }) =>
        faq.question?.trim() &&
        faq.answer?.trim()
    )
    .map(
      (faq: {
        question: string;
        answer: string;
      }) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })
    );

  const jsonLd =
    faqEntities.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          name:
            "Frequently Asked Questions | The Musafir Diaries",
          description:
            "Frequently asked questions about travelling with The Musafir Diaries.",
          url: `${SITE_URL}/faqs`,
          mainEntity: faqEntities,
        }
      : {
          "@context": "https://schema.org",
          "@type": "WebPage",
          name:
            "Frequently Asked Questions | The Musafir Diaries",
          description:
            "Frequently asked questions about travelling with The Musafir Diaries.",
          url: `${SITE_URL}/faqs`,
        };

  return (
    <>
   

      <main>
        <FAQHero />

        <FAQIntro />

        {featuredFAQs.length > 0 && (
          <FAQFeatured faqs={featuredFAQs} />
        )}

        <FAQListing
          faqs={activeFAQs}
          categories={categories}
        />

        <FAQCTA />
      </main>

      

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
    </>
  );
}