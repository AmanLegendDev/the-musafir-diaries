import type { Metadata } from "next";

import TermsPage from "@/components/terms/TermsPage";
import { TERMS_CONFIG } from "@/lib/config/terms";

const SITE_URL = TERMS_CONFIG.website;

export const metadata: Metadata = {
  title: "Terms & Conditions | The Musafir Diaries",

  description:
    "Read the Terms & Conditions of The Musafir Diaries covering enquiries, bookings, pricing, payments, cancellations, itineraries, accommodation, transportation and travel conditions.",

  keywords: [
    "The Musafir Diaries Terms and Conditions",
    "Travel Terms and Conditions",
    "Himachal Travel Terms",
    "Shimla Travel Terms",
    "Travel Booking Terms",
    "Himachal Tour Terms",
  ],

  alternates: {
    canonical: `${SITE_URL}/terms-and-conditions`,
  },

  openGraph: {
    title: "Terms & Conditions | The Musafir Diaries",

    description:
      "Terms covering travel enquiries, bookings, payments, cancellations, itineraries and related travel services.",

    url: `${SITE_URL}/terms-and-conditions`,

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

    title: "Terms & Conditions | The Musafir Diaries",

    description:
      "Read the Terms & Conditions for The Musafir Diaries.",

    images: [
      `${SITE_URL}/images/home/hero/himalayan-hero.webp`,
    ],
  },
};

export default function TermsAndConditionsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",

    name: "Terms & Conditions | The Musafir Diaries",

    description:
      "Terms and Conditions for The Musafir Diaries.",

    url: `${SITE_URL}/terms-and-conditions`,

    isPartOf: {
      "@type": "WebSite",
      name: "The Musafir Diaries",
      url: SITE_URL,
    },

    publisher: {
      "@type": "Organization",
      name: "The Musafir Diaries",
      url: SITE_URL,
    },

    dateModified: TERMS_CONFIG.lastUpdated,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <TermsPage />
    </>
  );
}