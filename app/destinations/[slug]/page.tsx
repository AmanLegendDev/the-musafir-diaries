import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  getDestinationBySlug,
  getRelatedDestinations,
} from "@/lib/queries/destination.queries";

import Breadcrumb from "@/components/destinations/detail/Breadcrumb";
import DestinationGallery from "@/components/destinations/detail/DestinationGallery";
import DestinationOverview from "@/components/destinations/detail/DestinationOverview";
import DestinationHighlights from "@/components/destinations/detail/DestinationHighlights";
import DestinationInfo from "@/components/destinations/detail/DestinationInfo";
import DestinationFAQ from "@/components/destinations/detail/DestinationFAQ";
import RelatedDestinations from "@/components/destinations/detail/RelatedDestinations";
import DestinationCTA from "@/components/destinations/detail/DestinationCTA";
import { Footer } from "@/components/footer";

interface DestinationPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: DestinationPageProps): Promise<Metadata> {
  const { slug } = await params;

  const destination = await getDestinationBySlug(slug);

  if (!destination) {
    return {
      title: "Destination Not Found | Altitude Escapes",
      description:
        "The destination you are looking for could not be found.",
    };
  }

  return {
    title:
      destination.seoTitle ||
      `${destination.name} | Altitude Escapes`,

    description:
      destination.seoDescription ||
      destination.shortDescription,

    keywords: [
      destination.name,
      destination.city,
      destination.state,
      destination.country,
      "Luxury Travel",
      "Himachal Tour",
      "Altitude Escapes",
    ],

    openGraph: {
      title:
        destination.seoTitle ||
        destination.name,

      description:
        destination.seoDescription ||
        destination.shortDescription,

      images: [
        {
          url: destination.heroImage,
          width: 1200,
          height: 630,
          alt: destination.name,
        },
      ],

      type: "website",
    },

    twitter: {
      card: "summary_large_image",

      title:
        destination.seoTitle ||
        destination.name,

      description:
        destination.seoDescription ||
        destination.shortDescription,

      images: [destination.heroImage],
    },
  };
}

export default async function DestinationPage({
  params,
}: DestinationPageProps) {
  const { slug } = await params;

  const destination =
    await getDestinationBySlug(slug);

  if (!destination) {
    notFound();
  }

  const relatedDestinations =
    await getRelatedDestinations(
      destination.state,
      destination.slug
    );


      return (
   <main className="min-h-screen bg-slate-50 pt-22 lg:pt-28">

      {/* Breadcrumb */}

      <Breadcrumb
        destination={destination.name}
      />

      {/* Gallery */}

      <DestinationGallery
        heroImage={destination.heroImage}
        gallery={destination.gallery}
        destinationName={destination.name}
      />

      {/* Overview */}

      <DestinationOverview
        description={destination.description}
        country={destination.country}
        state={destination.state}
        city={destination.city}
        altitude={destination.altitude}
        bestTime={destination.bestTime}
        duration={destination.duration}
        startingPrice={destination.startingPrice}
        rating={destination.rating}
        reviewCount={destination.reviewCount}
      />

      {/* Highlights */}

      <DestinationHighlights
        city={destination.city}
        state={destination.state}
        country={destination.country}
        altitude={destination.altitude}
        bestTime={destination.bestTime}
        duration={destination.duration}
        rating={destination.rating}
      />

      {/* Travel Information */}

      <DestinationInfo
        country={destination.country}
        state={destination.state}
        city={destination.city}
        altitude={destination.altitude}
        bestTime={destination.bestTime}
        duration={destination.duration}
      />

      {/* FAQ */}

      <DestinationFAQ
        name={destination.name}
        bestTime={destination.bestTime}
        duration={destination.duration}
        country={destination.country}
        state={destination.state}
        city={destination.city}
        startingPrice={destination.startingPrice}
      />

      {/* Related Destinations */}

      <RelatedDestinations
        destinations={relatedDestinations}
      />

      {/* CTA */}

      <DestinationCTA
        destinationName={destination.name}
      />
      <Footer/>

    </main>
  );
}