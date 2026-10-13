
import type { Metadata } from "next";

import Hero from "@/components/home/Hero/Hero";
import Story from "@/components/home/story/StorySection";
import DestinationsSection, {
  type HomeDestination,
} from "@/components/home/destinations/DestinationsSection";
import FeaturedPackagesSection from "@/components/home/packages/FeaturedPackagesSection";
import type { HomePackage } from "@/components/home/packages/FeaturedPackagesGrid";
import TravelExperiencesSection from "@/components/home/experiences/TravelExperiencesSection";
import HotelsStaysSection from "@/components/home/hotels/HotelsStaysSection";
import type { HomeHotel } from "@/components/home/hotels/HotelsStaysGrid";
import WhyMusafirSection from "@/components/home/why-musafir/WhyMusafirSection";
import TestimonialsSection, {
  type HomeTestimonial,
} from "@/components/home/testimonials/TestimonialsSection";
import HowItWorksSection from "@/components/home/how-it-works/HowItWorksSection";
import JournalSection from "@/components/home/journal/JournalSection";
import type { HomeJournal } from "@/components/home/journal/JournalGrid";
import FAQSection from "@/components/home/faq/FAQSection";
import type { HomeFAQ } from "@/components/home/faq/FAQGrid";
import FinalCTASection from "@/components/home/final-cta/FinalCTASection";

import connectDB from "@/lib/db";

import Destination from "@/models/destination.model";
import Package from "@/models/package.model";
import Hotel from "@/models/hotel.model";
import Testimonial from "@/models/testimonial.model";
import Blog from "@/models/blog.model";
import FAQ from "@/models/faq.model";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.themusafirdiaries.com";

const SITE_NAME = "The Musafir Diaries";

const HOME_TITLE =
  "Himalayan Travel Packages & Trips | The Musafir Diaries";

const HOME_DESCRIPTION =
  "Explore thoughtfully curated Himalayan travel packages, customised trips, handpicked stays and local experiences across Himachal Pradesh and India with The Musafir Diaries.";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,

  keywords: [
    "Himalayan travel packages",
    "Himachal Pradesh travel packages",
    "Himachal Pradesh trips",
    "Himachal tour packages",
    "Shimla tour packages",
    "Manali tour packages",
    "Spiti Valley tour packages",
    "customised Himachal trips",
    "Himalayan holidays",
    "The Musafir Diaries",
  ],

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: SITE_NAME,
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: SITE_URL,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "The Musafir Diaries — Himalayan Travel Packages and Experiences",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "The Musafir Diaries — Himalayan Travel Packages and Experiences",
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default async function Home() {
  await connectDB();

  // Fetch homepage content concurrently.
  const [
    destinationsFromDB,
    packagesFromDB,
    hotelsFromDB,
    testimonialsFromDB,
    postsFromDB,
    faqsFromDB,
  ] = await Promise.all([
    Destination.find({
      status: "active",
      featured: true,
    })
      .sort({
        featuredOrder: 1,
        createdAt: -1,
      })
      .limit(3)
      .lean(),

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

  // Serialize MongoDB results for the homepage components.
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

  // Homepage structured data.
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/icon-512.png`,
          width: 512,
          height: 512,
        },
        image: `${SITE_URL}/og-image.jpg`,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: HOME_DESCRIPTION,
        publisher: {
          "@id": `${SITE_URL}/#organization`,
        },
        inLanguage: "en-IN",
      },
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/#featured-destinations`,
        name: "Featured Travel Destinations",
        itemListElement: destinations.map(
          (destination, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: destination.name,
            url: `${SITE_URL}/destinations/${destination.slug}`,
          }),
        ),
      },
      ...(faqs.length > 0
        ? [
            {
              "@type": "FAQPage",
              "@id": `${SITE_URL}/#homepage-faq`,
              mainEntity: faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <Hero />

      <Story />

      <DestinationsSection destinations={destinations} />

      <FeaturedPackagesSection packages={packages} />

      <TravelExperiencesSection />

      <HotelsStaysSection hotels={hotels} />

      <WhyMusafirSection />

      <HowItWorksSection />

      <TestimonialsSection testimonials={testimonials} />

      <JournalSection posts={posts} />

      <FAQSection faqs={faqs} />

      <FinalCTASection />
    </>
  );
}
