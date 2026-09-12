import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Navbar from "@/components/layout/Navbar";
import  Footer  from "@/components/layout/footer/Footer";

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

interface PackagePageProps {
  params: Promise<{
    slug: string;
  }>;
}

/* -------------------------------------------------------------------------- */
/*                                   METADATA                                  */
/* -------------------------------------------------------------------------- */

export async function generateMetadata({
  params,
}: PackagePageProps): Promise<Metadata> {
  const { slug } = await params;

  const packageData = await getPackageBySlug(slug);

  if (!packageData) {
    return {
      title: "Journey Not Found | The Musafir Diaries",
      description:
        "The requested Himalayan journey could not be found.",
    };
  }

  const title =
    packageData.seoTitle?.trim() ||
    `${packageData.name} | The Musafir Diaries`;

  const description =
    packageData.seoDescription?.trim() ||
    packageData.shortDescription?.trim() ||
    `Explore ${packageData.name} with The Musafir Diaries.`;

  return {
    title,
    description,

    alternates: {
      canonical: `/packages/${packageData.slug}`,
    },

    openGraph: {
      title,
      description,
      type: "website",
      url: `/packages/${packageData.slug}`,
      siteName: "The Musafir Diaries",
      images: packageData.heroImage
        ? [
            {
              url: packageData.heroImage,
              alt: packageData.name,
            },
          ]
        : undefined,
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: packageData.heroImage
        ? [packageData.heroImage]
        : undefined,
    },
  };
}

/* -------------------------------------------------------------------------- */
/*                                     PAGE                                   */
/* -------------------------------------------------------------------------- */

export default async function PackageDetailPage({
  params,
}: PackagePageProps) {
  const { slug } = await params;

  /* ------------------------------------------------------------------------ */
  /*                              PACKAGE                                     */
  /* ------------------------------------------------------------------------ */

  const packageData = await getPackageBySlug(slug);

  if (!packageData) {
    notFound();
  }

  /* ------------------------------------------------------------------------ */
  /*                         POPULATED ENTITIES                               */
  /* ------------------------------------------------------------------------ */

  const destination =
    packageData.destination &&
    typeof packageData.destination === "object"
      ? packageData.destination
      : null;

  const category =
    packageData.category &&
    typeof packageData.category === "object"
      ? packageData.category
      : null;

  /* ------------------------------------------------------------------------ */
  /*                              EXTRA DATA                                  */
  /* ------------------------------------------------------------------------ */

  await connectDB();

  /* ------------------------------------------------------------------------ */
  /*                               HOTELS                                     */
  /* ------------------------------------------------------------------------ */

  let hotels: unknown[] = [];

  if (destination?._id) {
    const hotelDocuments = await Hotel.find({
      destination: destination._id,
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
      JSON.stringify(hotelDocuments)
    );
  }

  /* ------------------------------------------------------------------------ */
  /*                                  FAQS                                    */
  /* ------------------------------------------------------------------------ */

  const faqDocuments = await FAQ.find({
    package: packageData._id,
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
    JSON.stringify(faqDocuments)
  );

  /* ------------------------------------------------------------------------ */
  /*                           RELATED PACKAGES                               */
  /* ------------------------------------------------------------------------ */

  let relatedPackages = [];

  if (destination?._id) {
    relatedPackages = await getRelatedPackages(
      destination._id.toString(),
      packageData.slug,
      3
    );
  }

  /* ------------------------------------------------------------------------ */
  /*                                  RENDER                                  */
  /* ------------------------------------------------------------------------ */

  return (
    <>
      {/* ================================================================== */}
      {/* NAVBAR                                                             */}
      {/* ================================================================== */}

      
<main className="min-h-screen bg-[#FAF9F5]">
  <div className="relative">
    {/* Breadcrumb over hero — same treatment as destination detail */}
    <div className="absolute inset-x-0 top-0 z-30">
      <PackageBreadcrumb
        packageName={packageData.name}
        destinationName={destination?.name || ""}
        destinationSlug={
          destination?.slug
            ? String(destination.slug)
            : undefined
        }
      />
    </div>

    <PackageHero
      packageData={packageData}
      destinationName={destination?.name || ""}
    />
  </div>

        {/* ================================================================ */}
        {/* PACKAGE LOCAL NAV                                                 */}
        {/* ================================================================ */}

        <PackageSectionNav
          packageSlug={packageData.slug}
        />


          <PackageItinerary
          itinerary={packageData.itinerary || []}
        />


         <PackageInclusions
          included={packageData.included || []}
          excluded={packageData.excluded || []}
          childPolicy={packageData.childPolicy}
        />

        {/* ================================================================ */}
        {/* OVERVIEW                                                          */}
        {/* ================================================================ */}

        <PackageOverview
          packageData={packageData}
          destination={destination}
          category={category}
        />

        {/* ================================================================ */}
        {/* HIGHLIGHTS                                                        */}
        {/* ================================================================ */}

        <PackageHighlights
          highlights={packageData.highlights || []}
        />

        {/* ================================================================ */}
        {/* ITINERARY                                                         */}
        {/* ================================================================ */}

      

        {/* ================================================================ */}
        {/* PRICING                                                           */}
        {/* ================================================================ */}

        <PackagePricing
          packageData={packageData}
        />

        {/* ================================================================ */}
        {/* INCLUDED / EXCLUDED / CHILD POLICY                                */}
        {/* ================================================================ */}

       

        {/* ================================================================ */}
        {/* STAY OPTIONS                                                      */}
        {/* ================================================================ */}

        <PackageStayOptions
          hotels={hotels}
          destinationName={destination?.name || ""}
        />

        {/* ================================================================ */}
        {/* GALLERY                                                           */}
        {/* ================================================================ */}

        <PackageGallery
          gallery={packageData.gallery || []}
          heroImage={packageData.heroImage || ""}
          packageName={packageData.name}
        />

        {/* ================================================================ */}
        {/* FAQ                                                               */}
        {/* ================================================================ */}

        <PackageFAQs
          packageId={packageData._id.toString()}
          packageName={packageData.name}
          faqs={faqs}
        />

        {/* ================================================================ */}
        {/* RELATED JOURNEYS                                                  */}
        {/* ================================================================ */}

        <RelatedPackages
          packages={relatedPackages}
          destinationName={destination?.name || ""}
        />

        {/* ================================================================ */}
        {/* FINAL CTA                                                         */}
        {/* ================================================================ */}

        <PackageCTA
          packageName={packageData.name}
          packageSlug={packageData.slug}
        />
      </main>

      {/* ================================================================== */}
      {/* FOOTER                                                             */}
      {/* ================================================================== */}

      
    </>
  );
}