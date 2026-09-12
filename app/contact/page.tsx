import type { Metadata } from "next";

import ContactHero from "@/components/contact/ContactHero";
import ContactIntro from "@/components/contact/ContactIntro";
import ContactMethods from "@/components/contact/ContactMethods";
import ContactForm from "@/components/contact/ContactForm";
import ContactAside from "@/components/contact/ContactAside";
import ContactTrust from "@/components/contact/ContactTrust";
import ContactFAQ from "@/components/contact/ContactFAQ";
import ContactCTA from "@/components/contact/ContactCTA";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/footer/Footer";

import { getActiveFAQs } from "@/lib/queries/faq.queries";
import { CONTACT_CONFIG } from "@/lib/config/contact";

const SITE_URL = CONTACT_CONFIG.site.url;

export const metadata: Metadata = {
  title: "Contact Us | The Musafir Diaries",

  description:
    "Get in touch with The Musafir Diaries to discuss your next journey, destination, travel dates, and Himalayan travel plans.",

  keywords: [
    "Contact The Musafir Diaries",
    "Himachal Travel Agency",
    "Himachal Travel Planner",
    "Shimla Travel Agency",
    "Himachal Tour Packages",
    "Spiti Valley Travel",
    "Manali Travel",
    "Himachal Trip Planning",
  ],

  alternates: {
    canonical: `${SITE_URL}/contact`,
  },

  openGraph: {
    title: "Contact Us | The Musafir Diaries",

    description:
      "Let's talk about where you're going. Start planning your next Himalayan journey with The Musafir Diaries.",

    url: `${SITE_URL}/contact`,

    siteName: "The Musafir Diaries",

    type: "website",

    images: [
      {
        url: `${SITE_URL}/images/home/hero/himalayan-hero.webp`,
        width: 1200,
        height: 630,
        alt: "The Musafir Diaries — Himalayan travel",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Contact Us | The Musafir Diaries",

    description:
      "Start a conversation about your next Himalayan journey with The Musafir Diaries.",

    images: [`${SITE_URL}/images/home/hero/himalayan-hero.webp`],
  },
};

export default async function ContactPage() {
  const faqs = await getActiveFAQs();

type ContactFAQData = {
  _id: unknown;
  question: string;
  answer: string;
  category?: string;
};

const faqItems = (faqs as ContactFAQData[])
  .slice(0, 5)
  .map((faq) => ({
    _id: String(faq._id),
    question: faq.question,
    answer: faq.answer,
    category: faq.category || "",
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",

    name: "Contact The Musafir Diaries",

    description:
      "Contact The Musafir Diaries to discuss travel plans, destinations, and Himalayan journeys.",

    url: `${SITE_URL}/contact`,

    isPartOf: {
      "@type": "WebSite",
      name: "The Musafir Diaries",
      url: SITE_URL,
    },
  };

  return (
    <>
    
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <main className="overflow-x-hidden bg-white">
        {/* Hero */}
        <ContactHero />

        {/* Introduction */}
        <ContactIntro />

        {/* Direct contact options */}
        <ContactMethods />

        {/* Main enquiry area */}
        <section className="bg-[#FAF9F5] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[1.55fr_0.75fr] lg:gap-10">
              <ContactForm />

              <ContactAside />
            </div>
          </div>
        </section>

        {/* How the conversation works */}
        <ContactTrust />

        {/* Existing CMS FAQs */}
        <ContactFAQ faqs={faqItems} />

        {/* Final conversion CTA */}
        <ContactCTA />
      </main>
     
    </>
  );
}