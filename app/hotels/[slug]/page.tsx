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

/* =========================================================
   TYPES
========================================================= */

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type HotelDestination = {
  _id?: string;
  name?: string;
  slug?: string;
  state?: string;
  city?: string;
};

type HotelData = {
  _id: string;
  name: string;
  slug: string;

  address: string;

  shortDescription: string;
  description: string;

  hotelType: string;
  starRating: number;

  country: string;
  area: string;
  city: string;
  state: string;
  fullAddress: string;

  heroImage: string;
  gallery: string[];

  roomTypes: Array<{
    _id?: string;
    name: string;
    description: string;
    occupancy: string;
    bedType: string;
  }>;

  amenities: string[];

  policies: {
    checkIn: string;
    checkOut: string;
    cancellation: string;
    childPolicy: string;
    other: string;
  };

  guestRating: number | null;
  reviewCount: number;

  featured: boolean;

  seoTitle: string;
  seoDescription: string;

  destination?: HotelDestination | null;
};
type FAQData = {
  _id: string;
  question: string;
  answer: string;
  category?: string;
};

/* =========================================================
   SITE CONFIG
========================================================= */

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.themusafirdiaries.com";

const SITE_NAME = "The Musafir Diaries";

const SITE_LOGO = `${SITE_URL.replace(
  /\/$/,
  "",
)}/icon-512.png`;

/* =========================================================
   HELPERS
========================================================= */

function getAbsoluteUrl(path: string) {
  if (
    path.startsWith("http://") ||
    path.startsWith("https://")
  ) {
    return path;
  }

  return `${SITE_URL.replace(
    /\/$/,
    "",
  )}/${path.replace(/^\//, "")}`;
}

/* =========================================================
   GET HOTEL
========================================================= */

async function getHotelBySlug(
  slug: string,
): Promise<HotelData | null> {
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

/* =========================================================
   GET HOTEL FAQS
========================================================= */

async function getHotelFAQs(
  hotelId: string,
): Promise<FAQData[]> {
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

/* =========================================================
   GET RELATED HOTELS
========================================================= */

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

/* =========================================================
   DYNAMIC METADATA
========================================================= */

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const hotel =
    await getHotelBySlug(slug);

  /*
   * -------------------------------------------------------
   * Invalid hotel
   * -------------------------------------------------------
   */

  if (!hotel) {
    return {
      title:
        "Stay Not Found | The Musafir Diaries",

      description:
        "The stay you are looking for could not be found.",

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

  const canonicalUrl =
    getAbsoluteUrl(
      `/hotels/${hotel.slug}`,
    );

  const hotelImage = hotel.heroImage
    ? getAbsoluteUrl(hotel.heroImage)
    : getAbsoluteUrl("/og-image.jpg");

  return {
    metadataBase: new URL(SITE_URL),

    title,

    description,

    keywords: [
      hotel.name,
      `${hotel.name} ${destinationName}`,
      `${destinationName} hotels`,

      ...(hotel.hotelType
        ? [
            `${hotel.hotelType} ${destinationName}`,
          ]
        : []),

      "Himalayan stays",
      "Himachal Pradesh stays",
      SITE_NAME,
    ],

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      type: "website",

      locale: "en_IN",

      siteName: SITE_NAME,

      title,

      description,

      url: canonicalUrl,

      images: [
        {
          url: hotelImage,

          width: 1200,

          height: 630,

          alt: `${hotel.name} | ${SITE_NAME}`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",

      title,

      description,

      images: [hotelImage],
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
}

/* =========================================================
   PAGE
========================================================= */

export default async function HotelDetailPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const hotel =
    await getHotelBySlug(slug);

  /*
   * -------------------------------------------------------
   * Not found
   * -------------------------------------------------------
   */

  if (!hotel) {
    return <HotelNotFound />;
  }

  const destination =
    hotel.destination;

  const destinationName =
    destination?.name ||
    hotel.city ||
    "Himachal Pradesh";

  const destinationSlug =
    destination?.slug || "";

  /*
   * -------------------------------------------------------
   * Supporting content
   * -------------------------------------------------------
   *
   * FAQs and related hotels are independent queries,
   * therefore they are fetched in parallel.
   */

  const [
    faqs,
    relatedHotels,
  ] = await Promise.all([
    getHotelFAQs(
      String(hotel._id),
    ),

    destination?._id
      ? getRelatedHotels(
          String(destination._id),
          hotel.slug,
        )
      : Promise.resolve([]),
  ]);

  const hotelUrl =
    getAbsoluteUrl(
      `/hotels/${hotel.slug}`,
    );

  const hotelImage = hotel.heroImage
    ? getAbsoluteUrl(
        hotel.heroImage,
      )
    : getAbsoluteUrl(
        "/og-image.jpg",
      );

  const overviewHotel = {
    name: hotel.name,
    shortDescription:
      hotel.shortDescription || "",
    description:
      hotel.description || "",
    area: hotel.area || "",
    address:
      hotel.address || "",
    city: hotel.city || "",
    state: hotel.state || "",
    country:
      hotel.country || "",
    starRating:
      hotel.starRating || 0,
    hotelType:
      hotel.hotelType || "hotel",
    guestRating:
      hotel.guestRating ?? null,
    reviewCount:
      hotel.reviewCount || 0,
    destination: {
      name:
        hotel.destination?.name ||
        destinationName,
      slug:
        hotel.destination?.slug ||
        destinationSlug || "",
      state:
        hotel.destination?.state ||
        hotel.state || "",
    },
  };

  const heroHotel: HotelData & {
    destination: HotelDestination;
  } = {
    ...hotel,
    destination: {
      _id:
        hotel.destination?._id ||
        "",
      name:
        hotel.destination?.name ||
        destinationName,
      slug:
        hotel.destination?.slug ||
        destinationSlug || "",
      state:
        hotel.destination?.state ||
        hotel.state || "",
      city: hotel.city || "",
    },
  };

  /* =======================================================
     HOTEL SCHEMA
  ======================================================== */

  const hotelSchema: Record<
    string,
    unknown
  > = {
    "@type": "Hotel",

    "@id": `${hotelUrl}#hotel`,

    name: hotel.name,

    url: hotelUrl,

    description:
      hotel.seoDescription?.trim() ||
      hotel.shortDescription ||
      undefined,

    image: [
      hotelImage,
      ...(hotel.gallery || [])
        .filter(Boolean)
        .map((image) =>
          getAbsoluteUrl(image),
        ),
    ],

    ...(hotel.hotelType
      ? {
          additionalType:
            hotel.hotelType,
        }
      : {}),

    ...(hotel.starRating
      ? {
          starRating: {
            "@type":
              "Rating",

            ratingValue:
              hotel.starRating,
          },
        }
      : {}),

    ...(hotel.fullAddress ||
    hotel.city ||
    hotel.state ||
    hotel.country
      ? {
          address: {
            "@type":
              "PostalAddress",

            ...(hotel.fullAddress
              ? {
                  streetAddress:
                    hotel.fullAddress,
                }
              : {}),

            ...(hotel.city
              ? {
                  addressLocality:
                    hotel.city,
                }
              : {}),

            ...(hotel.state
              ? {
                  addressRegion:
                    hotel.state,
                }
              : {}),

            ...(hotel.country
              ? {
                  addressCountry:
                    hotel.country,
                }
              : {}),
          },
        }
      : {}),

    ...(hotel.guestRating &&
    hotel.reviewCount
      ? {
          aggregateRating: {
            "@type":
              "AggregateRating",

            ratingValue:
              hotel.guestRating,

            reviewCount:
              hotel.reviewCount,
          },
        }
      : {}),

    ...(destination?.name
      ? {
          containedInPlace: {
            "@type":
              "Place",

            name:
              destination.name,

            ...(destinationSlug
              ? {
                  url: getAbsoluteUrl(
                    `/destinations/${destinationSlug}`,
                  ),
                }
              : {}),
          },
        }
      : {}),
  };

  /* =======================================================
     WEB PAGE SCHEMA
  ======================================================== */

  const webPageSchema = {
    "@type": "WebPage",

    "@id": `${hotelUrl}#webpage`,

    url: hotelUrl,

    name: hotel.name,

    description:
      hotel.seoDescription?.trim() ||
      hotel.shortDescription ||
      `Discover ${hotel.name} in ${destinationName}.`,

    isPartOf: {
      "@type": "WebSite",

      "@id": `${SITE_URL}/#website`,

      name: SITE_NAME,

      url: SITE_URL,
    },

    primaryImageOfPage: {
      "@type":
        "ImageObject",

      url: hotelImage,
    },

    mainEntity: {
      "@id": `${hotelUrl}#hotel`,
    },

    breadcrumb: {
      "@id": `${hotelUrl}#breadcrumb`,
    },

    inLanguage: "en-IN",
  };

  /* =======================================================
     WEBSITE SCHEMA
  ======================================================== */

  const websiteSchema = {
    "@type": "WebSite",

    "@id": `${SITE_URL}/#website`,

    name: SITE_NAME,

    url: SITE_URL,

    publisher: {
      "@type":
        "Organization",

      "@id": `${SITE_URL}/#organization`,

      name: SITE_NAME,

      url: SITE_URL,

      logo: {
        "@type":
          "ImageObject",

        url: SITE_LOGO,

        width: 512,

        height: 512,
      },
    },

    inLanguage: "en-IN",
  };

  /* =======================================================
     BREADCRUMB SCHEMA
  ======================================================== */

  const breadcrumbItems = [
    {
      "@type": "ListItem",

      position: 1,

      name: "Home",

      item: SITE_URL,
    },

    {
      "@type": "ListItem",

      position: 2,

      name: "Hotels & Stays",

      item: getAbsoluteUrl(
        "/hotels",
      ),
    },
  ];

  if (
    destination?.name &&
    destinationSlug
  ) {
    breadcrumbItems.push({
      "@type": "ListItem",

      position: 3,

      name: destination.name,

      item: getAbsoluteUrl(
        `/destinations/${destinationSlug}`,
      ),
    });
  }

  breadcrumbItems.push({
    "@type": "ListItem",

    position:
      destination?.name &&
      destinationSlug
        ? 4
        : 3,

    name: hotel.name,

    item: hotelUrl,
  });

  const breadcrumbSchema = {
    "@type":
      "BreadcrumbList",

    "@id": `${hotelUrl}#breadcrumb`,

    itemListElement:
      breadcrumbItems,
  };

  /* =======================================================
     FAQ SCHEMA
  ======================================================== */

  const validFAQs = faqs.filter(
    (faq) =>
      faq.question?.trim() &&
      faq.answer?.trim(),
  );

  const faqSchema =
    validFAQs.length > 0
      ? {
          "@type":
            "FAQPage",

          "@id": `${hotelUrl}#faq`,

          mainEntity:
            validFAQs.map(
              (faq) => ({
                "@type":
                  "Question",

                name:
                  faq.question.trim(),

                acceptedAnswer: {
                  "@type":
                    "Answer",

                  text:
                    faq.answer.trim(),
                },
              }),
            ),
        }
      : null;

  /* =======================================================
     COMBINED STRUCTURED DATA
  ======================================================== */

  const structuredData = {
    "@context":
      "https://schema.org",

    "@graph": [
      websiteSchema,

      hotelSchema,

      webPageSchema,

      breadcrumbSchema,

      ...(faqSchema
        ? [faqSchema]
        : []),
    ],
  };

  return (
    <>
      {/* =====================================================
          STRUCTURED DATA
      ====================================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              structuredData,
            ),
        }}
      />

      <main className="min-h-screen bg-[#FAF9F5]">
        {/* ===================================================
            CINEMATIC HOTEL HERO
        ==================================================== */}

        <div className="relative">
          <div className="absolute inset-x-0 top-0 z-30">
            <HotelBreadcrumb
              hotelName={
                hotel.name
              }
              destinationName={
                destinationName
              }
              destinationSlug={
                destinationSlug
              }
            />
          </div>

          <HotelHero
            hotel={heroHotel}
          />
        </div>

        {/* ===================================================
            LOCAL NAVIGATION
        ==================================================== */}

        <HotelSectionNav
          hotelSlug={
            hotel.slug
          }
        />

        {/* ===================================================
            OVERVIEW
        ==================================================== */}

        <HotelOverview
          hotel={{
            ...hotel,
            guestRating: hotel.guestRating ?? undefined,
          }}
        />

        {/* ===================================================
            AMENITIES
        ==================================================== */}

        <HotelAmenities
          amenities={
            hotel.amenities || []
          }
        />

        {/* ===================================================
            ROOM TYPES
        ==================================================== */}

        <HotelRooms
          roomTypes={
            hotel.roomTypes || []
          }
        />

        {/* ===================================================
            POLICIES
        ==================================================== */}

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

        {/* ===================================================
            GALLERY
        ==================================================== */}

        <HotelGallery
          heroImage={
            hotel.heroImage
          }
          gallery={
            hotel.gallery || []
          }
          hotelName={
            hotel.name
          }
        />

        {/* ===================================================
            FAQ
        ==================================================== */}

        <HotelFAQs
          faqs={faqs}
          hotelName={
            hotel.name
          }
        />

        {/* ===================================================
            RELATED HOTELS
        ==================================================== */}

        <RelatedHotels
          hotels={
            relatedHotels
          }
          destinationName={
            destinationName
          }
          currentHotelSlug={
            hotel.slug
          }
        />

        {/* ===================================================
            FINAL CTA
        ==================================================== */}

        <HotelCTA
          hotelName={
            hotel.name
          }
          hotelSlug={
            hotel.slug
          }
          destinationName={
            destinationName
          }
        />
      </main>
    </>
  );
}