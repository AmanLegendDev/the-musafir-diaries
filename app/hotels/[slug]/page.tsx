import type { Metadata } from "next";

import HotelBreadcrumb from "@/components/hotels/detail/HotelBreadcrumb";
import HotelHero from "@/components/hotels/detail/HotelHero";
import HotelSectionNav from "@/components/hotels/detail/HotelSectionNav";
import HotelOverview from "@/components/hotels/detail/HotelOverview";
import HotelAmenities from "@/components/hotels/detail/HotelAmenities";
import HotelRooms from "@/components/hotels/detail/HotelRooms";
import HotelPolicies from "@/components/hotels/detail/HotelPolicies";
import HotelGallery from "@/components/hotels/detail/HotelGallery";
import HotelFAQs from "@/components/hotels/detail/HotelFAQs";
import RelatedHotels from "@/components/hotels/detail/RelatedHotels";
import HotelCTA from "@/components/hotels/detail/HotelCTA";
import HotelNotFound from "@/components/hotels/detail/HotelNotFound";

import connectDB from "@/lib/db";
import Hotel from "@/models/hotel.model";
import FAQ from "@/models/faq.model";

import "@/models/destination.model";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

async function getHotelBySlug(slug: string) {
  await connectDB();

  const hotel = await Hotel.findOne({
    slug: slug.toLowerCase(),
    status: "active",
  })
    .populate(
      "destination",
      "name slug state city",
    )
    .lean();

  if (!hotel) {
    return null;
  }

  return JSON.parse(
    JSON.stringify(hotel),
  );
}

async function getHotelFAQs(hotelId: string) {
  await connectDB();

  const faqs = await FAQ.find({
    hotel: hotelId,
    status: "active",
  })
    .sort({
      featured: -1,
      displayOrder: 1,
      createdAt: -1,
    })
    .limit(8)
    .lean();

  return JSON.parse(
    JSON.stringify(faqs),
  );
}

async function getRelatedHotels(
  destinationId: string,
  currentSlug: string,
) {
  await connectDB();

  const hotels = await Hotel.find({
    destination: destinationId,
    slug: {
      $ne: currentSlug,
    },
    status: "active",
  })
    .sort({
      featured: -1,
      displayOrder: 1,
      createdAt: -1,
    })
    .limit(3)
    .lean();

  return JSON.parse(
    JSON.stringify(hotels),
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const hotel = await getHotelBySlug(slug);

  if (!hotel) {
    return {
      title: "Stay Not Found | The Musafir Diaries",
      description:
        "The stay you're looking for could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const destinationName =
    hotel.destination?.name ||
    hotel.city ||
    "Himachal Pradesh";

  const title =
    hotel.seoTitle?.trim() ||
    `${hotel.name} | ${destinationName} | The Musafir Diaries`;

  const description =
    hotel.seoDescription?.trim() ||
    hotel.shortDescription ||
    `Discover ${hotel.name} in ${destinationName} with The Musafir Diaries.`;

  return {
    title,
    description,

    keywords: [
      hotel.name,
      `${hotel.name} ${destinationName}`,
      `${destinationName} hotels`,
      `${hotel.hotelType} ${destinationName}`,
      "Himachal Pradesh stays",
      "The Musafir Diaries",
    ],

    alternates: {
      canonical: `/hotels/${hotel.slug}`,
    },

    openGraph: {
      title,
      description,
      type: "website",
      url: `/hotels/${hotel.slug}`,
      siteName: "The Musafir Diaries",
      images: hotel.heroImage
        ? [
            {
              url: hotel.heroImage,
              alt: hotel.name,
            },
          ]
        : undefined,
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: hotel.heroImage
        ? [hotel.heroImage]
        : undefined,
    },
  };
}

export default async function HotelDetailPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const hotel = await getHotelBySlug(slug);

  if (!hotel) {
    return <HotelNotFound />;
  }

  const destination = hotel.destination;

  const destinationName =
    destination?.name ||
    hotel.city ||
    "Himachal Pradesh";

  const destinationSlug =
    destination?.slug || "";

  /*
   * Supporting content.
   * Both requests are independent, so fetch them in parallel.
   */
  const [faqs, relatedHotels] =
    await Promise.all([
      getHotelFAQs(String(hotel._id)),

      destination?._id
        ? getRelatedHotels(
            String(destination._id),
            hotel.slug,
          )
        : Promise.resolve([]),
    ]);

  return (
    <main className="min-h-screen bg-[#FAF9F5]">
      {/* ================================================================ */}
      {/* CINEMATIC HOTEL HERO                                             */}
      {/* ================================================================ */}

      <div className="relative">
        {/* Breadcrumb overlay — same treatment as Destination detail */}
        <div className="absolute inset-x-0 top-0 z-30">
          <HotelBreadcrumb
            hotelName={hotel.name}
            destinationName={destinationName}
            destinationSlug={destinationSlug}
          />
        </div>

        <HotelHero hotel={hotel} />
      </div>

      {/* ================================================================ */}
      {/* HOTEL LOCAL NAVIGATION                                           */}
      {/* ================================================================ */}

      <HotelSectionNav
        hotelSlug={hotel.slug}
      />

      {/* ================================================================ */}
      {/* OVERVIEW                                                          */}
      {/* ================================================================ */}

      <HotelOverview hotel={hotel} />

      {/* ================================================================ */}
      {/* AMENITIES                                                         */}
      {/* ================================================================ */}

      <HotelAmenities
        amenities={hotel.amenities || []}
      />

      {/* ================================================================ */}
      {/* ROOM TYPES                                                        */}
      {/* ================================================================ */}

      <HotelRooms
        roomTypes={hotel.roomTypes || []}
      />

      {/* ================================================================ */}
      {/* POLICIES                                                          */}
      {/* ================================================================ */}

      <HotelPolicies
        policies={
          hotel.policies || {
            checkIn: "",
            checkOut: "",
            cancellation: "",
            childPolicy: "",
            other: "",
          }
        }
      />

      {/* ================================================================ */}
      {/* GALLERY                                                           */}
      {/* ================================================================ */}

      <HotelGallery
        heroImage={hotel.heroImage}
        gallery={hotel.gallery || []}
        hotelName={hotel.name}
      />

      {/* ================================================================ */}
      {/* FAQ                                                               */}
      {/* ================================================================ */}

      <HotelFAQs
        faqs={faqs}
        hotelName={hotel.name}
      />

      {/* ================================================================ */}
      {/* RELATED HOTELS                                                    */}
      {/* ================================================================ */}

      <RelatedHotels
        hotels={relatedHotels}
        destinationName={destinationName}
        currentHotelSlug={hotel.slug}
      />

      {/* ================================================================ */}
      {/* FINAL CTA                                                         */}
      {/* ================================================================ */}

      <HotelCTA
        hotelName={hotel.name}
        hotelSlug={hotel.slug}
        destinationName={destinationName}
      />
    </main>
  );
}