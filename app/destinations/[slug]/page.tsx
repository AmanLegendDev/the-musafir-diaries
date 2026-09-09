import type { Metadata } from "next";
import { notFound } from "next/navigation";

import connectDB from "@/lib/db";

import Destination from "@/models/destination.model";
import Package from "@/models/package.model";
import Hotel from "@/models/hotel.model";
import FAQ from "@/models/faq.model";

import Breadcrumb from "@/components/destinations/detail/DestinationBreadcrumb";
import DestinationHero from "@/components/destinations/detail/DestinationHero";
import DestinationSectionNav from "@/components/destinations/detail/DestinationSectionNav";
import DestinationOverview from "@/components/destinations/detail/DestinationOverview";
import DestinationPackages from "@/components/destinations/detail/DestinationPackages";
import DestinationStays from "@/components/destinations/detail/DestinationStays";
import DestinationExperiences from "@/components/destinations/detail/DestinationExperiences";
import DestinationGallery from "@/components/destinations/detail/DestinationGallery";
import DestinationFAQs from "@/components/destinations/detail/DestinationFAQ";
import DestinationCTA from "@/components/destinations/detail/DestinationCTA";

import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/footer";

interface DestinationPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.themusafirdiaries.com";

async function getDestination(slug: string) {
  await connectDB();

  return Destination.findOne({
    slug: slug.toLowerCase(),
    status: "active",
  }).lean();
}

export async function generateMetadata({
  params,
}: DestinationPageProps): Promise<Metadata> {
  const { slug } = await params;

  const destination = await getDestination(slug);

  if (!destination) {
    return {
      title: "Destination Not Found | The Musafir Diaries",
      description:
        "The destination you are looking for could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title =
    destination.seoTitle ||
    `${destination.name} | The Musafir Diaries`;

  const description =
    destination.seoDescription ||
    destination.shortDescription ||
    `Explore ${destination.name} with The Musafir Diaries.`;

  const canonicalUrl = `${SITE_URL}/destinations/${destination.slug}`;

  return {
    title,
    description,

    keywords: [
      destination.name,
      destination.city,
      destination.state,
      destination.country,
      "Himachal travel",
      "Himalayan travel",
      "The Musafir Diaries",
    ].filter(Boolean),

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "The Musafir Diaries",
      images: destination.heroImage
        ? [
            {
              url: destination.heroImage,
              width: 1200,
              height: 630,
              alt: destination.name,
            },
          ]
        : undefined,
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: destination.heroImage
        ? [destination.heroImage]
        : undefined,
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function DestinationPage({
  params,
}: DestinationPageProps) {
  const { slug } = await params;

  /*
   * Resolve destination first.
   * Everything else depends on its MongoDB ObjectId.
   */
  const destination = await getDestination(slug);

  if (!destination) {
    notFound();
  }

  /*
   * Related destination data.
   * All three queries are independent, so run them in parallel.
   */
  const [packagesFromDB, hotelsFromDB, faqsFromDB] =
    await Promise.all([
      Package.find({
        destination: destination._id,
        status: "active",
      })
        .sort({
          featured: -1,
          createdAt: -1,
        })
        .limit(6)
        .lean(),

      Hotel.find({
        destination: destination._id,
        status: "active",
      })
        .sort({
          featured: -1,
          displayOrder: 1,
          createdAt: -1,
        })
        .limit(6)
        .lean(),

      FAQ.find({
        destination: destination._id,
        status: "active",
      })
        .sort({
          featured: -1,
          displayOrder: 1,
          createdAt: -1,
        })
        .limit(8)
        .lean(),
    ]);

  /*
   * Convert MongoDB/ObjectId values into serializable
   * plain objects before passing data to components.
   */
  const destinationData = JSON.parse(
    JSON.stringify(destination)
  );

  const packages = JSON.parse(
    JSON.stringify(packagesFromDB)
  );

  const hotels = JSON.parse(
    JSON.stringify(hotelsFromDB)
  );

  const faqs = JSON.parse(
    JSON.stringify(faqsFromDB)
  );

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#FAF9F5] pt-[100px]">
   <div className="relative">
  <div className="absolute inset-x-0 top-0 z-30">
    <Breadcrumb
      destinationName={destinationData.name}
    />
  </div>

  <DestinationHero
    destination={destinationData}
  />
</div>

        {/* Local destination navigation */}
        <DestinationSectionNav
          destinationSlug={destinationData.slug}
        />

        {/* Destination overview */}
        <DestinationOverview
          destination={destinationData}
        />

        {/* Destination journeys */}
        <DestinationPackages
          packages={packages}
          destinationName={destinationData.name}
        />

        {/* Destination stays */}
        <DestinationStays
          hotels={hotels}
          destinationName={destinationData.name}
        />

        {/* Editorial experiences */}
        <DestinationExperiences
          destination={destinationData}
        />

        {/* Destination gallery */}
        <DestinationGallery
          heroImage={destinationData.heroImage}
          gallery={destinationData.gallery}
          destinationName={destinationData.name}
        />

        {/* Destination FAQs */}
        <DestinationFAQs
          faqs={faqs}
          destinationName={destinationData.name}
        />

        {/* Final CTA */}
        <DestinationCTA
          destinationName={destinationData.name}
          destinationSlug={destinationData.slug}
        />
      </main>

      <Footer />
    </>
  );
}