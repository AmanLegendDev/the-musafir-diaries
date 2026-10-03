import type { Metadata } from "next";

import connectDB from "@/lib/db";
import Gallery from "@/models/gallery.model";

import GalleryClient from "./GalleryClient";

/* =========================================================
   SITE CONFIG
========================================================= */

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.themusafirdiaries.com";

const SITE_NAME = "The Musafir Diaries";

const GALLERY_URL = `${SITE_URL.replace(
  /\/$/,
  "",
)}/gallery`;

const GALLERY_IMAGE = `${SITE_URL.replace(
  /\/$/,
  "",
)}/images/home/hero/himalayan-hero.webp`;

const SITE_LOGO = `${SITE_URL.replace(
  /\/$/,
  "",
)}/icon-512.png`;

/* =========================================================
   METADATA
========================================================= */

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title:
    "Travel Gallery | Himalayan Landscapes & Travel Experiences | The Musafir Diaries",

  description:
    "Explore the Himalayan travel gallery of The Musafir Diaries, featuring mountain landscapes, destinations, stays, adventures and memorable travel experiences across India.",

  keywords: [
    "Travel Gallery",
    "Himalayan Travel Gallery",
    "Himachal Pradesh Gallery",
    "Himachal Travel Photos",
    "Himalayan Landscapes",
    "Himachal Travel",
    "Mountain Travel India",
    "Travel Experiences",
    "The Musafir Diaries",
  ],

  alternates: {
    canonical: GALLERY_URL,
  },

  openGraph: {
    type: "website",

    locale: "en_IN",

    siteName: SITE_NAME,

    title:
      "Travel Gallery | Himalayan Travel Experiences | The Musafir Diaries",

    description:
      "Explore Himalayan landscapes, destinations, stays, adventures and unforgettable travel moments with The Musafir Diaries.",

    url: GALLERY_URL,

    images: [
      {
        url: GALLERY_IMAGE,
        width: 1200,
        height: 630,
        alt:
          "The Musafir Diaries — Himalayan travel gallery",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Travel Gallery | The Musafir Diaries",

    description:
      "Explore Himalayan landscapes, destinations and unforgettable travel experiences through The Musafir Diaries gallery.",

    images: [GALLERY_IMAGE],
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

/* =========================================================
   PAGE
========================================================= */

export default async function GalleryPage() {
  /*
   * -------------------------------------------------------
   * Database connection
   * -------------------------------------------------------
   */

  await connectDB();

  /*
   * -------------------------------------------------------
   * Fetch active gallery images
   * -------------------------------------------------------
   *
   * Featured images appear first.
   * Then manual order.
   * Then newest images.
   */

  const images = await Gallery.find({
    active: true,
  })
    .sort({
      featured: -1,
      order: 1,
      createdAt: -1,
    })
    .lean();

  /*
   * -------------------------------------------------------
   * Serialize MongoDB data
   * -------------------------------------------------------
   */

  const gallery = JSON.parse(
    JSON.stringify(images),
  );

  /*
   * -------------------------------------------------------
   * WebPage schema
   * -------------------------------------------------------
   */

  const webPageSchema = {
    "@type": "CollectionPage",

    "@id": `${GALLERY_URL}#webpage`,

    name:
      "Travel Gallery | The Musafir Diaries",

    description:
      "A collection of Himalayan landscapes, destinations, stays, adventures and travel experiences from The Musafir Diaries.",

    url: GALLERY_URL,

    isPartOf: {
      "@type": "WebSite",

      "@id": `${SITE_URL}/#website`,

      name: SITE_NAME,

      url: SITE_URL,
    },

    primaryImageOfPage: {
      "@type": "ImageObject",

      url: GALLERY_IMAGE,
    },

    inLanguage: "en-IN",
  };

  /*
   * -------------------------------------------------------
   * WebSite schema
   * -------------------------------------------------------
   */

  const websiteSchema = {
    "@type": "WebSite",

    "@id": `${SITE_URL}/#website`,

    name: SITE_NAME,

    url: SITE_URL,

    publisher: {
      "@type": "Organization",

      "@id": `${SITE_URL}/#organization`,

      name: SITE_NAME,

      url: SITE_URL,

      logo: {
        "@type": "ImageObject",

        url: SITE_LOGO,

        width: 512,

        height: 512,
      },
    },

    inLanguage: "en-IN",
  };

  /*
   * -------------------------------------------------------
   * Breadcrumb schema
   * -------------------------------------------------------
   */

  const breadcrumbSchema = {
    "@type": "BreadcrumbList",

    "@id": `${GALLERY_URL}#breadcrumb`,

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

        name: "Gallery",

        item: GALLERY_URL,
      },
    ],
  };

  /*
   * -------------------------------------------------------
   * ImageGallery schema
   * -------------------------------------------------------
   *
   * Only add images that have a usable image URL.
   * Alt/title data is taken from CMS where available.
   */

  const imageItems = gallery
    .filter(
      (image: {
        image?: string;
      }) =>
        Boolean(image.image),
    )
    .map(
      (
        image: {
          _id?: string;
          image?: string;
          title?: string;
          description?: string;
          alt?: string;
        },
        index: number,
      ) => ({
        "@type": "ImageObject",

        "@id": `${GALLERY_URL}#image-${image._id || index + 1}`,

        contentUrl: image.image,

        url: image.image,

        name:
          image.title ||
          `${SITE_NAME} Travel Gallery Image ${index + 1}`,

        description:
          image.description ||
          image.alt ||
          undefined,

        caption:
          image.alt ||
          image.title ||
          undefined,
      }),
    );

  const imageGallerySchema =
    imageItems.length > 0
      ? {
          "@type": "ImageGallery",

          "@id": `${GALLERY_URL}#image-gallery`,

          name:
            "The Musafir Diaries Travel Gallery",

          description:
            "Himalayan landscapes, destinations, stays and travel experiences captured by The Musafir Diaries.",

          url: GALLERY_URL,

          image: imageItems,
        }
      : null;

  /*
   * -------------------------------------------------------
   * Combined structured data
   * -------------------------------------------------------
   */

  const structuredData = {
    "@context": "https://schema.org",

    "@graph": [
      websiteSchema,
      webPageSchema,
      breadcrumbSchema,
      ...(imageGallerySchema
        ? [imageGallerySchema]
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

      {/* =====================================================
          GALLERY
      ====================================================== */}

      <main>
        <GalleryClient
          images={gallery}
        />
      </main>
    </>
  );
}