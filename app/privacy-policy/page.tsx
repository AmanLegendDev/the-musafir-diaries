import type { Metadata } from "next";

import PrivacyPage from "@/components/privacy-policy/PrivacyPage";
import { PRIVACY_CONFIG } from "@/lib/config/privacy";

const SITE_URL = PRIVACY_CONFIG.website;

export const metadata: Metadata = {
  title: "Privacy Policy | The Musafir Diaries",

  description:
    "Read the Privacy Policy of The Musafir Diaries and learn how we collect, use, share and protect information provided through our website and travel-related communications.",

  keywords: [
    "The Musafir Diaries Privacy Policy",
    "Travel Privacy Policy",
    "Himachal Travel Privacy",
    "Shimla Travel Privacy Policy",
    "Travel Website Privacy Policy",
  ],

  alternates: {
    canonical: `${SITE_URL}/privacy-policy`,
  },

  openGraph: {
    title: "Privacy Policy | The Musafir Diaries",

    description:
      "Learn how The Musafir Diaries handles information shared through its website and travel-related communications.",

    url: `${SITE_URL}/privacy-policy`,

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

    title: "Privacy Policy | The Musafir Diaries",

    description:
      "Learn how The Musafir Diaries handles personal information.",

    images: [
      `${SITE_URL}/images/home/hero/himalayan-hero.webp`,
    ],
  },
};

export default function PrivacyPolicyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",

    name: "Privacy Policy | The Musafir Diaries",

    description:
      "Privacy Policy for The Musafir Diaries.",

    url: `${SITE_URL}/privacy-policy`,

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

    dateModified: PRIVACY_CONFIG.lastUpdated,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <PrivacyPage />
    </>
  );
}