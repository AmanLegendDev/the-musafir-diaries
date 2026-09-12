import type { Metadata } from "next";


import Footer from "@/components/layout/footer/Footer";
import AboutPage from "@/components/about/AboutPage";

import { getAboutFAQs } from "@/lib/queries/about.queries";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://the-musafir-diaries.vercel.app";

export const metadata: Metadata = {
  title: "About The Musafir Diaries | Shimla & Himachal Travel",

  description:
    "Learn about The Musafir Diaries, a Shimla-based travel business built around meaningful journeys, real travel experiences, and thoughtful exploration across Himachal Pradesh.",

  keywords: [
    "About The Musafir Diaries",
    "Shimla Travel Company",
    "Shimla Travel Agency",
    "Himachal Travel",
    "Himachal Travel Company",
    "Himachal Trip Planning",
    "Himachal Pradesh Travel",
    "Spiti Valley Travel",
    "Manali Travel",
    "Shimla Travel",
  ],

  alternates: {
    canonical: `${SITE_URL}/about`,
  },

  openGraph: {
    title: "About The Musafir Diaries | Shimla & Himachal Travel",

    description:
      "A travel business from Shimla, built around meaningful journeys and real experiences across Himachal Pradesh.",

    url: `${SITE_URL}/about`,

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

    title: "About The Musafir Diaries | Shimla & Himachal Travel",

    description:
      "Discover the story, values and vision behind The Musafir Diaries.",

    images: [
      `${SITE_URL}/images/home/hero/himalayan-hero.webp`,
    ],
  },
};

export default async function AboutRoute() {
  const faqs = await getAboutFAQs(5);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",

    name: "About The Musafir Diaries",

    description:
      "Learn about The Musafir Diaries, a Shimla-based travel business built around meaningful journeys and real travel experiences across Himachal Pradesh.",

    url: `${SITE_URL}/about`,

    isPartOf: {
      "@type": "WebSite",
      name: "The Musafir Diaries",
      url: SITE_URL,
    },

    mainEntity: {
      "@type": "Organization",
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

      

      <AboutPage faqs={faqs} />

     
    </>
  );
}