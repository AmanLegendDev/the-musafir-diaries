import type { Metadata } from "next";
import { notFound } from "next/navigation";

import PackageBreadcrumb from "@/components/packages/detail/PackageBreadcrumb";
import PackageHero from "@/components/packages/detail/PackageHero";
import PackageSectionNav from "@/components/packages/detail/PackageSectionNav";
import PackageOverview from "@/components/packages/detail/PackageOverview";
import PackageHighlights from "@/components/packages/detail/PackageHighlights";
import PackageItinerary from "@/components/packages/detail/PackageItinerary";
import PackagePricing from "@/components/packages/detail/PackagePricing";
import PackageInclusions from "@/components/packages/detail/PackageInclusions";
import PackageStayOptions from "@/components/packages/detail/PackageStayOptions";
import PackageGallery from "@/components/packages/detail/PackageGallery";
import PackageFAQs from "@/components/packages/detail/PackageFAQs";
import RelatedPackages from "@/components/packages/detail/RelatedPackages";
import PackageCTA from "@/components/packages/detail/PackageCTA";

import {
  getPackageBySlug,
  getRelatedPackages,
} from "@/lib/queries/package.queries";

import connectDB from "@/lib/db";
import Hotel from "@/models/hotel.model";
import FAQ from "@/models/faq.model";

import "@/models/destination.model";
import "@/models/category.model";

/* =========================================================
   TYPES
========================================================= */

interface PackagePageProps {
  params: Promise<{
    slug: string;
  }>;
}

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
   METADATA
========================================================= */

export async function generateMetadata({
  params,
}: PackagePageProps): Promise<Metadata> {
  const { slug } = await params;

  const packageData =
    await getPackageBySlug(slug);

  /*
   * -------------------------------------------------------
   * Invalid package
   * -------------------------------------------------------
   */

  if (!packageData) {
    return {
      title:
        "Journey Not Found | The Musafir Diaries",

      description:
        "The requested Himalayan journey could not be found.",

      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title =
    packageData.seoTitle?.trim() ||
    `${packageData.name} | The Musafir Diaries`;

  const description =
    packageData.seoDescription?.trim() ||
    packageData.shortDescription?.trim() ||
    `Explore ${packageData.name} with The Musafir Diaries.`;

  const canonicalUrl =
    getAbsoluteUrl(
      `/packages/${packageData.slug}`,
    );

  const packageImage =
    packageData.heroImage
      ? getAbsoluteUrl(
          packageData.heroImage,
        )
      : getAbsoluteUrl(
          "/og-image.jpg",
        );

  return {
    metadataBase: new URL(SITE_URL),

    title,

    description,

    keywords: [
      packageData.name,

      ...(packageData.destination?.name
        ? [
            `${packageData.destination.name} tour`,
            `${packageData.destination.name} travel package`,
            `${packageData.destination.name} holiday package`,
          ]
        : []),

      ...(packageData.category?.name
        ? [
            packageData.category.name,
          ]
        : []),

      "Himalayan travel packages",
      "Himachal travel packages",
      "Himalayan tours",
      SITE_NAME,
    ],

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title,

      description,

      type: "website",

      url: canonicalUrl,

      siteName: SITE_NAME,

      locale: "en_IN",

      images: [
        {
          url: packageImage,

          width: 1200,

          height: 630,

          alt: `${packageData.name} | ${SITE_NAME}`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",

      title,

      description,

      images: [packageImage],
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

export default async function PackageDetailPage({
  params,
}: PackagePageProps) {
  const { slug } = await params;

  /*
   * -------------------------------------------------------
   * PACKAGE
   * -------------------------------------------------------
   */

  const packageData =
    await getPackageBySlug(slug);

  if (!packageData) {
    notFound();
  }

  /*
   * -------------------------------------------------------
   * POPULATED ENTITIES
   * -------------------------------------------------------
   */

  const destination =
    packageData.destination &&
    typeof packageData.destination ===
      "object"
      ? packageData.destination
      : null;

  const category =
    packageData.category &&
    typeof packageData.category ===
      "object"
      ? packageData.category
      : null;

  /*
   * -------------------------------------------------------
   * EXTRA DATA
   * -------------------------------------------------------
   */

  await connectDB();

  /*
   * -------------------------------------------------------
   * HOTELS
   * -------------------------------------------------------
   */

  let hotels: unknown[] = [];

  if (destination?._id) {
    const hotelDocuments =
      await Hotel.find({
        destination:
          destination._id,

        status: "active",
      })
        .sort({
          featured: -1,
          displayOrder: 1,
          createdAt: -1,
        })
        .limit(6)
        .lean();

    hotels = JSON.parse(
      JSON.stringify(
        hotelDocuments,
      ),
    );
  }

  /*
   * -------------------------------------------------------
   * FAQS
   * -------------------------------------------------------
   */

  const faqDocuments =
    await FAQ.find({
      package:
        packageData._id,

      status: "active",
    })
      .sort({
        featured: -1,
        displayOrder: 1,
        createdAt: -1,
      })
      .limit(8)
      .lean();

  const faqs = JSON.parse(
    JSON.stringify(
      faqDocuments,
    ),
  );

  /*
   * -------------------------------------------------------
   * RELATED PACKAGES
   * -------------------------------------------------------
   */

  let relatedPackages = [];

  if (destination?._id) {
    relatedPackages =
      await getRelatedPackages(
        destination._id.toString(),
        packageData.slug,
        3,
      );
  }

  /*
   * -------------------------------------------------------
   * URLS
   * -------------------------------------------------------
   */

  const packageUrl =
    getAbsoluteUrl(
      `/packages/${packageData.slug}`,
    );

  const packageImage =
    packageData.heroImage
      ? getAbsoluteUrl(
          packageData.heroImage,
        )
      : getAbsoluteUrl(
          "/og-image.jpg",
        );

  /*
   * -------------------------------------------------------
   * BREADCRUMB SCHEMA
   * -------------------------------------------------------
   */

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

      name: "Packages",

      item: getAbsoluteUrl(
        "/packages",
      ),
    },
  ];

  if (
    destination?.name &&
    destination?.slug
  ) {
    breadcrumbItems.push({
      "@type": "ListItem",

      position: 3,

      name: destination.name,

      item: getAbsoluteUrl(
        `/destinations/${destination.slug}`,
      ),
    });
  }

  breadcrumbItems.push({
    "@type": "ListItem",

    position:
      destination?.name &&
      destination?.slug
        ? 4
        : 3,

    name: packageData.name,

    item: packageUrl,
  });

  const breadcrumbSchema = {
    "@type":
      "BreadcrumbList",

    "@id": `${packageUrl}#breadcrumb`,

    itemListElement:
      breadcrumbItems,
  };

  /*
   * -------------------------------------------------------
   * TOURIST TRIP / PACKAGE SCHEMA
   * -------------------------------------------------------
   */

  const packageSchema: Record<
    string,
    unknown
  > = {
    "@type": "TouristTrip",

    "@id": `${packageUrl}#tour`,

    name: packageData.name,

    url: packageUrl,

    description:
      packageData.seoDescription?.trim() ||
      packageData.shortDescription?.trim() ||
      undefined,

    image: [
      packageImage,

      ...(packageData.gallery || [])
        .filter(Boolean)
        .map((image: string) =>
          getAbsoluteUrl(image),
        ),
    ],

    ...(packageData.duration
      ? {
          duration:
            packageData.duration,
        }
      : {}),

    ...(destination?.name
      ? {
          touristType:
            destination.name,
        }
      : {}),

    provider: {
      "@type":
        "Organization",

      "@id":
        `${SITE_URL}/#organization`,

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

    ...(destination?.name
      ? {
          itinerary: {
            "@type":
              "ItemList",

            name:
              `${packageData.name} itinerary`,

            itemListElement: (
              packageData.itinerary ||
              []
            ).map(
              (
                item: {
                  day?: number;
                  title?: string;
                  description?: string;
                },
                index: number,
              ) => ({
                "@type":
                  "ListItem",

                position:
                  index + 1,

                name:
                  item.title ||
                  `Day ${
                    item.day ||
                    index + 1
                  }`,

                ...(item.description
                  ? {
                      description:
                        item.description,
                    }
                  : {}),
              }),
            ),
          },
        }
      : {}),
  };

  /*
   * -------------------------------------------------------
   * WEBPAGE SCHEMA
   * -------------------------------------------------------
   */

  const webPageSchema = {
    "@type": "WebPage",

    "@id": `${packageUrl}#webpage`,

    url: packageUrl,

    name: packageData.name,

    description:
      packageData.seoDescription?.trim() ||
      packageData.shortDescription?.trim() ||
      `Explore ${packageData.name} with ${SITE_NAME}.`,

    isPartOf: {
      "@type": "WebSite",

      "@id":
        `${SITE_URL}/#website`,

      name: SITE_NAME,

      url: SITE_URL,
    },

    primaryImageOfPage: {
      "@type":
        "ImageObject",

      url: packageImage,
    },

    mainEntity: {
      "@id": `${packageUrl}#tour`,
    },

    breadcrumb: {
      "@id": `${packageUrl}#breadcrumb`,
    },

    inLanguage: "en-IN",
  };

  /*
   * -------------------------------------------------------
   * WEBSITE SCHEMA
   * -------------------------------------------------------
   */

  const websiteSchema = {
    "@type": "WebSite",

    "@id":
      `${SITE_URL}/#website`,

    name: SITE_NAME,

    url: SITE_URL,

    publisher: {
      "@type":
        "Organization",

      "@id":
        `${SITE_URL}/#organization`,

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

  /*
   * -------------------------------------------------------
   * FAQ SCHEMA
   * -------------------------------------------------------
   *
   * Only FAQs actually attached to this package are included.
   */

  const validFAQs = faqs.filter(
    (faq: {
      question?: string;
      answer?: string;
    }) =>
      faq.question?.trim() &&
      faq.answer?.trim(),
  );

  const faqSchema =
    validFAQs.length > 0
      ? {
          "@type":
            "FAQPage",

          "@id": `${packageUrl}#faq`,

          mainEntity:
            validFAQs.map(
              (faq: {
                question: string;
                answer: string;
              }) => ({
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

  /*
   * -------------------------------------------------------
   * COMBINED STRUCTURED DATA
   * -------------------------------------------------------
   */

  const structuredData = {
    "@context":
      "https://schema.org",

    "@graph": [
      websiteSchema,
      packageSchema,
      webPageSchema,
      breadcrumbSchema,

      ...(faqSchema
        ? [faqSchema]
        : []),
    ],
  };

  /*
   * -------------------------------------------------------
   * RENDER
   * -------------------------------------------------------
   */

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
            HERO + BREADCRUMB
        ==================================================== */}

        <div className="relative">
          <div className="absolute inset-x-0 top-0 z-30">
            <PackageBreadcrumb
              packageName={
                packageData.name
              }
              destinationName={
                destination?.name ||
                ""
              }
              destinationSlug={
                destination?.slug
                  ? String(
                      destination.slug,
                    )
                  : undefined
              }
            />
          </div>

          <PackageHero
            packageData={
              packageData
            }
            destinationName={
              destination?.name ||
              ""
            }
          />
        </div>

        {/* ===================================================
            PACKAGE LOCAL NAVIGATION
        ==================================================== */}

        <PackageSectionNav
          packageSlug={
            packageData.slug
          }
        />

        {/* ===================================================
            OVERVIEW
        ==================================================== */}

        <PackageOverview
          packageData={
            packageData
          }
          destination={
            destination
          }
          category={
            category
          }
        />

        {/* ===================================================
            HIGHLIGHTS
        ==================================================== */}

        <PackageHighlights
          highlights={
            packageData.highlights ||
            []
          }
        />

        {/* ===================================================
            ITINERARY
        ==================================================== */}

        <PackageItinerary
          itinerary={
            packageData.itinerary ||
            []
          }
        />

        {/* ===================================================
            PRICING
        ==================================================== */}

        <PackagePricing
          packageData={
            packageData
          }
        />

        {/* ===================================================
            INCLUSIONS / EXCLUSIONS / CHILD POLICY
        ==================================================== */}

        <PackageInclusions
          included={
            packageData.included ||
            []
          }
          excluded={
            packageData.excluded ||
            []
          }
          childPolicy={
            packageData.childPolicy
          }
        />

        {/* ===================================================
            STAY OPTIONS
        ==================================================== */}

        <PackageStayOptions
          hotels={hotels}
          destinationName={
            destination?.name ||
            ""
          }
        />

        {/* ===================================================
            GALLERY
        ==================================================== */}

        <PackageGallery
          gallery={
            packageData.gallery ||
            []
          }
          heroImage={
            packageData.heroImage ||
            ""
          }
          packageName={
            packageData.name
          }
        />

        {/* ===================================================
            FAQ
        ==================================================== */}

        <PackageFAQs
          packageId={
            packageData._id.toString()
          }
          packageName={
            packageData.name
          }
          faqs={faqs}
        />

        {/* ===================================================
            RELATED JOURNEYS
        ==================================================== */}

        <RelatedPackages
          packages={
            relatedPackages
          }
          destinationName={
            destination?.name ||
            ""
          }
        />

        {/* ===================================================
            FINAL CTA
        ==================================================== */}

        <PackageCTA
          packageName={
            packageData.name
          }
          packageSlug={
            packageData.slug
          }
        />
      </main>
    </>
  );
}