import type { Metadata } from "next";

import ContactHero from "@/components/contact/ContactHero";
import ContactCards from "@/components/contact/ContactCards";
import ContactForm from "@/components/contact/ContactForm";
import OfficeInfo from "@/components/contact/OfficeInfo";
import WorkingHours from "@/components/contact/WorkingHours";
import MapSection from "@/components/contact/MapSection";
import ContactFAQ from "@/components/contact/ContactFAQ";
import CTASection from "@/components/contact/CTASection";

export const metadata: Metadata = {
  title: "Contact Us | Altitude Escapes",

  description:
    "Get in touch with Altitude Escapes. Contact our travel experts for personalized Himalayan tour packages, luxury vacations, adventure trips, and travel assistance.",

  keywords: [
    "Contact Altitude Escapes",
    "Travel Agency Contact",
    "Shimla Travel Agency",
    "Luxury Tour Booking",
    "Himachal Tour Packages",
    "Travel Experts",
    "Contact Travel Planner",
    "Altitude Escapes",
  ],

  openGraph: {
    title: "Contact Altitude Escapes",

    description:
      "Speak with our travel experts and start planning your unforgettable Himalayan adventure.",

    images: [
      {
        url: "/images/contact/contact-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Altitude Escapes Contact",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Contact Altitude Escapes",

    description:
      "Plan your dream Himalayan journey with our experienced travel consultants.",

    images: ["/images/contact/contact-hero.jpg"],
  },
};

export default function ContactPage() {
  return (
    <main className="overflow-x-hidden bg-white">

      <ContactHero />

      <ContactCards />

      <ContactForm />

      <OfficeInfo />

      <WorkingHours />

      <MapSection />

      <ContactFAQ />

      <CTASection />

    </main>
  );
}