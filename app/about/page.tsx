import type { Metadata } from "next";

import connectDB from "@/lib/db";

import Testimonial from "@/models/testimonial.model";

import AboutHero from "@/components/about/AboutHero";
import OurStory from "@/components/about/OurStory";
import MissionVision from "@/components/about/MissionVision";
import WhyChooseUs from "@/components/about/WhyChooseUs";
import JourneyTimeline from "@/components/about/JourneyTimeline";
import StatsSection from "@/components/about/StatsSection";
import CoreValues from "@/components/about/CoreValues";
import TeamSection from "@/components/about/TeamSection";
import TestimonialsPreview from "@/components/about/TestimonialsPreview";
import FAQSection from "@/components/about/FAQSection";
import CTASection from "@/components/about/CTASection";

export const metadata: Metadata = {
  title: "About Us | Altitude Escapes",
  description:
    "Discover the story behind Altitude Escapes. Learn about our mission, vision, experienced travel experts, and our passion for creating unforgettable Himalayan journeys.",

  keywords: [
    "About Altitude Escapes",
    "Luxury Travel Company",
    "Himachal Tours",
    "Himalayan Travel Experts",
    "Travel Agency",
    "Custom Tour Packages",
    "Adventure Travel",
    "Luxury Holidays",
  ],

  openGraph: {
    title: "About Altitude Escapes",
    description:
      "Meet the passionate team behind unforgettable Himalayan travel experiences.",

    images: [
      {
        url: "/images/about/about-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Altitude Escapes",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "About Altitude Escapes",
    description:
      "Luxury Himalayan travel experiences designed with passion and expertise.",
    images: ["/images/about/about-hero.jpg"],
  },
};

export default async function AboutPage() {
  await connectDB();

  const testimonials = await Testimonial.find({
    active: true,
    featured: true,
  })
    .sort({
      order: 1,
      createdAt: -1,
    })
    .limit(3)
    .lean();

  const serializedTestimonials = JSON.parse(
    JSON.stringify(testimonials)
  );

  return (
    <main className="overflow-x-hidden bg-white">

      <AboutHero />

      <OurStory />

      <MissionVision />

      <WhyChooseUs />

      <JourneyTimeline />

      <StatsSection />

      <CoreValues />

      <TeamSection />

      <TestimonialsPreview
        testimonials={serializedTestimonials}
      />

      <FAQSection />

      <CTASection />

    </main>
  );
}