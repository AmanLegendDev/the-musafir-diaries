import type { Metadata } from "next";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/footer/Footer";

import TestimonialsHero from "@/components/testimonials/TestimonialsHero";
import TestimonialsIntro from "@/components/testimonials/TestimonialsIntro";
import FeaturedTestimonials from "@/components/testimonials/FeaturedTestimonials";
import TestimonialRatingStrip from "@/components/testimonials/TestimonialRatingStrip";
import TestimonialsListing from "@/components/testimonials/TestimonialsListing";
import TestimonialsCTA from "@/components/testimonials/TestimonialsCTA";

import {
  getActiveTestimonials,
  getFeaturedTestimonials,
} from "@/lib/queries/testimonial.queries";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://the-musafir-diaries.vercel.app";

export const metadata: Metadata = {
  title: "Guest Stories | The Musafir Diaries",
  description:
    "Read stories and experiences shared by travellers who explored the mountains with The Musafir Diaries.",
  alternates: {
    canonical: "/testimonials",
  },
  openGraph: {
    title: "Guest Stories | The Musafir Diaries",
    description:
      "Discover real traveller experiences and memories from journeys with The Musafir Diaries.",
    url: `${SITE_URL}/testimonials`,
    siteName: "The Musafir Diaries",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Guest Stories | The Musafir Diaries",
    description:
      "Real stories from travellers who journeyed with The Musafir Diaries.",
  },
};

export default async function TestimonialsPage() {
  const [testimonials, featuredTestimonials] =
    await Promise.all([
      getActiveTestimonials(),
      getFeaturedTestimonials(4),
    ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Guest Stories | The Musafir Diaries",
    description:
      "Traveller stories and experiences from The Musafir Diaries.",
    url: `${SITE_URL}/testimonials`,
    isPartOf: {
      "@type": "WebSite",
      name: "The Musafir Diaries",
      url: SITE_URL,
    },
  };

  return (
    <>
    

      <main>
        <TestimonialsHero />

        <TestimonialsIntro />

        {featuredTestimonials.length > 0 && (
          <FeaturedTestimonials
            testimonials={featuredTestimonials}
          />
        )}

        <TestimonialRatingStrip
          testimonials={testimonials}
        />

        <TestimonialsListing
          testimonials={testimonials}
        />

        <TestimonialsCTA />
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