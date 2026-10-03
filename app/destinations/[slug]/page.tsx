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

interface DestinationPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.themusafirdiaries.com";

const SITE_NAME = "The Musafir Diaries";

async function getDestination(slug: string) {
  await connectDB();

  return Destination.findOne({
    slug: slug.toLowerCase(),
    status: "active",
  }).lean();
}

/* =========================================================
   DYNAMIC SEO METADATA
========================================================= */

export async function generateMetadata({
  params,
}: DestinationPageProps): Promise<Metadata> {
  const { slug } = await params;

  const destination = await getDestination(slug);

  /*
   * Invalid / unavailable destination:
   * Never allow a soft 404 page to be indexed.
   */
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
    destination.seoTitle?.trim() ||
    `${destination.name} Travel Guide & Tour Packages | The Musafir Diaries`;

  const description =
    destination.seoDescription?.trim() ||
    destination.shortDescription?.trim() ||
    `Explore ${destination.name} with The Musafir Diaries through curated travel packages, stays and experiences.`;

  const canonicalUrl =
    `${SITE_URL}/destinations/${destination.slug}`;

  const imageAlt =
    `${destination.name} travel experience | The Musafir Diaries`;

  return {
    metadataBase: new URL(SITE_URL),

    title,

    description,

    keywords: [
      `${destination.name} travel`,
      `${destination.name} tour packages`,
      `${destination.name} travel packages`,
      `${destination.name} tourism`,
      `${destination.name} holiday packages`,
      destination.city,
      destination.state,
      destination.country,
      "Himalayan travel",
      "India travel",
      "The Musafir Diaries",
    ].filter(Boolean),

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

      images: destination.heroImage
        ? [
            {
              url: destination.heroImage,
              width: 1200,
              height: 630,
              alt: imageAlt,
            },
          ]
        : [
            {
              url: "/og-image.jpg",
              width: 1200,
              height: 630,
              alt: `${SITE_NAME} — ${destination.name}`,
            },
          ],
    },

    twitter: {
      card: "summary_large_image",

      title,

      description,

      images: destination.heroImage
        ? [destination.heroImage]
        : ["/og-image.jpg"],
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
   DESTINATION PAGE
========================================================= */

export default async function DestinationPage({
  params,
}: DestinationPageProps) {
  const { slug } = await params;

  /*
   * ---------------------------------------------------------
   * 1. Resolve destination
   * ---------------------------------------------------------
   */

  const destination = await getDestination(slug);

  if (!destination) {
    notFound();
  }

  /*
   * ---------------------------------------------------------
   * 2. Related content
   * ---------------------------------------------------------
   *
   * All queries depend only on destination._id,
   * so they can safely run in parallel.
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
   * ---------------------------------------------------------
   * 3. Serialize MongoDB data
   * ---------------------------------------------------------
   */

  const destinationData = JSON.parse(
    JSON.stringify(destination),
  );

  const packages = JSON.parse(
    JSON.stringify(packagesFromDB),
  );

  const hotels = JSON.parse(
    JSON.stringify(hotelsFromDB),
  );

  const faqs = JSON.parse(
    JSON.stringify(faqsFromDB),
  );

  /*
   * ---------------------------------------------------------
   * 4. Canonical URL
   * ---------------------------------------------------------
   */

  const canonicalUrl =
    `${SITE_URL}/destinations/${destinationData.slug}`;

  /*
   * ---------------------------------------------------------
   * 5. Destination image
   * ---------------------------------------------------------
   */

  const destinationImage =
    destinationData.heroImage || `${SITE_URL}/og-image.jpg`;

  /*
   * ---------------------------------------------------------
   * 6. Destination structured data
   * ---------------------------------------------------------
   *
   * @graph:
   * - TouristDestination
   * - BreadcrumbList
   * - ItemList for packages
   * - ItemList for stays
   * - FAQPage when destination FAQs exist
   */

  const packageItems = packages.map(
    (
      item: {
        name?: string;
        slug?: string;
      },
      index: number,
    ) => ({
      "@type": "ListItem",

      position: index + 1,

      name: item.name,

      url: item.slug
        ? `${SITE_URL}/packages/${item.slug}`
        : undefined,
    }),
  );

  const hotelItems = hotels.map(
    (
      item: {
        name?: string;
        slug?: string;
      },
      index: number,
    ) => ({
      "@type": "ListItem",

      position: index + 1,

      name: item.name,

      url: item.slug
        ? `${SITE_URL}/hotels/${item.slug}`
        : undefined,
    }),
  );

  const structuredData = {
    "@context": "https://schema.org",

    "@graph": [
      /*
       * =====================================================
       * DESTINATION ENTITY
       * =====================================================
       */

      {
        "@type": "TouristDestination",

        "@id": `${canonicalUrl}#destination`,

        name: destinationData.name,

        description:
          destinationData.description ||
          destinationData.shortDescription,

        url: canonicalUrl,

        image: destinationImage,

        touristType: [
          "Couples",
          "Families",
          "Friends",
          "Adventure travellers",
          "Leisure travellers",
        ],

        containedInPlace: {
          "@type": "Country",

          name:
            destinationData.country || "India",
        },

        ...(destinationData.state
          ? {
              address: {
                "@type": "PostalAddress",

                addressLocality:
                  destinationData.city ||
                  destinationData.name,

                addressRegion:
                  destinationData.state,

                addressCountry:
                  destinationData.country ||
                  "IN",
              },
            }
          : {}),

        ...(destinationData.bestTime
          ? {
              additionalProperty: [
                {
                  "@type": "PropertyValue",

                  name: "Best time to visit",

                  value:
                    destinationData.bestTime,
                },

                ...(destinationData.altitude
                  ? [
                      {
                        "@type": "PropertyValue",

                        name: "Altitude",

                        value:
                          destinationData.altitude,
                      },
                    ]
                  : []),
              ],
            }
          : {}),
      },

      /*
       * =====================================================
       * BREADCRUMB
       * =====================================================
       */

      {
        "@type": "BreadcrumbList",

        "@id": `${canonicalUrl}#breadcrumb`,

        itemListElement: [
          {
            "@type": "ListItem",

            position: 1,

            name: "Home",

            item: SITE_URL,
          },

          {
            "@type": "ListItem",

            position: 2,

            name: "Destinations",

            item: `${SITE_URL}/destinations`,
          },

          {
            "@type": "ListItem",

            position: 3,

            name: destinationData.name,

            item: canonicalUrl,
          },
        ],
      },

      /*
       * =====================================================
       * WEB PAGE
       * =====================================================
       */

      {
        "@type": "WebPage",

        "@id": `${canonicalUrl}#webpage`,

        url: canonicalUrl,

        name:
          destinationData.seoTitle ||
          `${destinationData.name} | ${SITE_NAME}`,

        description:
          destinationData.seoDescription ||
          destinationData.shortDescription,

        isPartOf: {
          "@type": "WebSite",

          "@id": `${SITE_URL}#website`,

          url: SITE_URL,

          name: SITE_NAME,
        },

        primaryImageOfPage: {
          "@type": "ImageObject",

          url: destinationImage,
        },

        breadcrumb: {
          "@id": `${canonicalUrl}#breadcrumb`,
        },

        mainEntity: {
          "@id": `${canonicalUrl}#destination`,
        },

        inLanguage: "en-IN",
      },

      /*
       * =====================================================
       * PACKAGE LIST
       * =====================================================
       */

      ...(packageItems.length > 0
        ? [
            {
              "@type": "ItemList",

              "@id": `${canonicalUrl}#packages`,

              name:
                `${destinationData.name} Travel Packages`,

              numberOfItems: packageItems.length,

              itemListOrder:
                "https://schema.org/ItemListOrderAscending",

              itemListElement: packageItems,
            },
          ]
        : []),

      /*
       * =====================================================
       * HOTEL LIST
       * =====================================================
       */

      ...(hotelItems.length > 0
        ? [
            {
              "@type": "ItemList",

              "@id": `${canonicalUrl}#stays`,

              name:
                `${destinationData.name} Hotels & Stays`,

              numberOfItems: hotelItems.length,

              itemListOrder:
                "https://schema.org/ItemListOrderAscending",

              itemListElement: hotelItems,
            },
          ]
        : []),

      /*
       * =====================================================
       * FAQ
       * =====================================================
       *
       * Only output when real destination FAQs exist.
       */

      ...(faqs.length > 0
        ? [
            {
              "@type": "FAQPage",

              "@id": `${canonicalUrl}#faq`,

              mainEntity: faqs.map(
                (faq: {
                  question: string;
                  answer: string;
                }) => ({
                  "@type": "Question",

                  name: faq.question,

                  acceptedAnswer: {
                    "@type": "Answer",

                    text: faq.answer,
                  },
                }),
              ),
            },
          ]
        : []),
    ],
  };

  /*
   * =========================================================
   * RENDER
   * =========================================================
   */

  return (
    <>
      {/* =====================================================
          STRUCTURED DATA
      ====================================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <main className="min-h-screen bg-[#FAF9F5]">
        {/* ===================================================
            HERO + BREADCRUMB
        ==================================================== */}

        <div className="relative">
          <div className="absolute inset-x-0 top-0 z-30">
            <Breadcrumb
              destinationName={
                destinationData.name
              }
            />
          </div>

          <DestinationHero
            destination={destinationData}
          />
        </div>

        {/* ===================================================
            LOCAL DESTINATION NAVIGATION
        ==================================================== */}

        <DestinationSectionNav
          destinationSlug={
            destinationData.slug
          }
        />

        {/* ===================================================
            OVERVIEW
        ==================================================== */}

        <DestinationOverview
          destination={destinationData}
        />

        {/* ===================================================
            PACKAGES
        ==================================================== */}

        <DestinationPackages
          packages={packages}
          destinationName={
            destinationData.name
          }
        />

        {/* ===================================================
            STAYS
        ==================================================== */}

        <DestinationStays
          hotels={hotels}
          destinationName={
            destinationData.name
          }
        />

        {/* ===================================================
            EXPERIENCES
        ==================================================== */}

        <DestinationExperiences
          destination={destinationData}
        />

        {/* ===================================================
            GALLERY
        ==================================================== */}

        <DestinationGallery
          heroImage={
            destinationData.heroImage
          }
          gallery={
            destinationData.gallery
          }
          destinationName={
            destinationData.name
          }
        />

        {/* ===================================================
            FAQ
        ==================================================== */}

        <DestinationFAQs
          faqs={faqs}
          destinationName={
            destinationData.name
          }
        />

        {/* ===================================================
            FINAL CTA
        ==================================================== */}

        <DestinationCTA
          destinationName={
            destinationData.name
          }
          destinationSlug={
            destinationData.slug
          }
        />
      </main>
    </>
  );
}