import Hero from "@/components/home/Hero/Hero";
import Story from "@/components/home/story/StorySection";

import DestinationsSection from "@/components/home/destinations/DestinationsSection";
import FeaturedPackagesSection from "@/components/home/packages/FeaturedPackagesSection";
import TravelExperiencesSection from "@/components/home/experiences/TravelExperiencesSection";

import HotelsStaysSection from "@/components/home/hotels/HotelsStaysSection";
import WhyMusafirSection from "@/components/home/why-musafir/WhyMusafirSection";

import TestimonialsSection from "@/components/home/testimonials/TestimonialsSection";

import JournalSection from "@/components/home/journal/JournalSection";
import FAQSection from "@/components/home/faq/FAQSection";
import FinalCTASection from "@/components/home/final-cta/FinalCTASection";

import connectDB from "@/lib/db";

import Destination from "@/models/destination.model";
import Package from "@/models/package.model";
import Hotel from "@/models/hotel.model";
import Testimonial from "@/models/testimonial.model";
import Blog from "@/models/blog.model";
import FAQ from "@/models/faq.model";

import type { HomeDestination } from "@/components/home/destinations/DestinationsSection";
import type { HomePackage } from "@/components/home/packages/FeaturedPackagesGrid";
import type { HomeHotel } from "@/components/home/hotels/HotelsStaysGrid";
import type { HomeTestimonial } from "@/components/home/testimonials/TestimonialsSection";
import type { HomeJournal } from "@/components/home/journal/JournalGrid";
import type { HomeFAQ } from "@/components/home/faq/FAQGrid";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.themusafirdiaries.com";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "The Musafir Diaries | Coming Soon",

  description:
    "The Musafir Diaries is crafting a beautiful new travel experience from Shimla, Himachal Pradesh.",

  alternates: {
    canonical: SITE_URL,
  },

  openGraph: {
    title: "The Musafir Diaries | Coming Soon",

    description:
      "A new travel experience is being crafted. The Musafir Diaries — Explore • Experience • Memories.",

    url: SITE_URL,

    siteName: "The Musafir Diaries",

    type: "website",
  },
};

export default async function Home() {
  console.time("🏠 HOME TOTAL");

  // ─────────────────────────────────────
  // DATABASE CONNECTION
  // ─────────────────────────────────────

  console.time("🔌 DB CONNECT");

  await connectDB();

  console.timeEnd("🔌 DB CONNECT");

  // ─────────────────────────────────────
  // HOMEPAGE DATA
  // All independent queries run in parallel
  // ─────────────────────────────────────

  console.time("🗄️ HOME QUERIES");

  const [
    destinationsFromDB,
    packagesFromDB,
    hotelsFromDB,
    testimonialsFromDB,
    postsFromDB,
    faqsFromDB,
  ] = await Promise.all([
    // ───────────────────────────────────
    // DESTINATIONS
    // ───────────────────────────────────

    Destination.find({
      status: "active",
    })
      .sort({
        featured: -1,
        featuredOrder: 1,
        createdAt: -1,
      })
      .lean(),

    // ───────────────────────────────────
    // FEATURED PACKAGES
    // ───────────────────────────────────

    Package.find({
      status: "active",
      featured: true,
    })
      .populate("destination", "_id name slug")
      .sort({
        createdAt: -1,
      })
      .limit(3)
      .lean(),

    // ───────────────────────────────────
    // FEATURED HOTELS
    // ───────────────────────────────────

    Hotel.find({
      status: "active",
      featured: true,
    })
      .populate("destination", "_id name slug")
      .sort({
        displayOrder: 1,
        createdAt: -1,
      })
      .limit(3)
      .lean(),

    // ───────────────────────────────────
    // FEATURED TESTIMONIALS
    // ───────────────────────────────────

    Testimonial.find({
      active: true,
      featured: true,
    })
      .sort({
        order: 1,
        createdAt: -1,
      })
      .limit(3)
      .lean(),

    // ───────────────────────────────────
    // FEATURED JOURNAL POSTS
    // ───────────────────────────────────

    Blog.find({
      status: "published",
      featured: true,
    })
      .populate("category", "_id name slug")
      .sort({
        publishedAt: -1,
        createdAt: -1,
      })
      .limit(3)
      .lean(),

    // ───────────────────────────────────
    // FEATURED FAQS
    // ───────────────────────────────────

    FAQ.find({
      status: "active",
      featured: true,
    })
      .sort({
        displayOrder: 1,
        createdAt: -1,
      })
      .limit(6)
      .lean(),
  ]);

  console.timeEnd("🗄️ HOME QUERIES");

  // ─────────────────────────────────────
  // SERIALIZE MONGODB DATA
  // ─────────────────────────────────────

  console.time("🔄 SERIALIZE");

  const destinations = JSON.parse(
    JSON.stringify(destinationsFromDB),
  ) as HomeDestination[];

  const packages = JSON.parse(
    JSON.stringify(packagesFromDB),
  ) as HomePackage[];

  const hotels = JSON.parse(
    JSON.stringify(hotelsFromDB),
  ) as HomeHotel[];

  const testimonials = JSON.parse(
    JSON.stringify(testimonialsFromDB),
  ) as HomeTestimonial[];

  const posts = JSON.parse(
    JSON.stringify(postsFromDB),
  ) as HomeJournal[];

  const faqs = JSON.parse(
    JSON.stringify(faqsFromDB),
  ) as HomeFAQ[];

  console.timeEnd("🔄 SERIALIZE");

  // ─────────────────────────────────────
  // DATA COUNTS
  // ─────────────────────────────────────

  console.log("📊 HOME DATA:", {
    destinations: destinations.length,
    packages: packages.length,
    hotels: hotels.length,
    testimonials: testimonials.length,
    posts: posts.length,
    faqs: faqs.length,
  });

  console.timeEnd("🏠 HOME TOTAL");

  // ─────────────────────────────────────
  // HOMEPAGE
  // Navbar + Footer are already provided
  // globally by app/layout.tsx
  // ─────────────────────────────────────

  return (
    <>
      <Hero />

      <Story />

      <DestinationsSection destinations={destinations} />

      <FeaturedPackagesSection packages={packages} />

      <TravelExperiencesSection />

      <HotelsStaysSection hotels={hotels} />

      <WhyMusafirSection />

      <TestimonialsSection testimonials={testimonials} />

      <JournalSection posts={posts} />

      <FAQSection faqs={faqs} />

      <FinalCTASection />
    </>
  );
}