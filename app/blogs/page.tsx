import type { Metadata } from "next";
import { Suspense } from "react";

import BlogHero from "@/components/blog/listing/BlogHero";
import BlogListing from "@/components/blog/listing/BlogListing";
import BlogCTA from "@/components/blog/listing/BlogCTA";

import {
  getBlogCategories,
  getFeaturedBlog,
  getPublishedBlogs,
} from "@/lib/queries/blog.queries";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.themusafirdiaries.com";

const SITE_NAME = "The Musafir Diaries";

const PAGE_URL = `${SITE_URL}/blog`;

const PAGE_TITLE =
  "Travel Stories, Guides & Himalayan Inspiration | The Musafir Diaries";

const PAGE_DESCRIPTION =
  "Explore Himalayan travel stories, destination guides, practical travel tips and journey inspiration from The Musafir Diaries.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: PAGE_TITLE,

  description: PAGE_DESCRIPTION,

  keywords: [
    "Himachal Pradesh travel blog",
    "Himalayan travel blog",
    "Himalayan travel stories",
    "Himachal travel guides",
    "Shimla travel guide",
    "Manali travel guide",
    "Spiti Valley travel guide",
    "Himachal travel tips",
    "India travel stories",
    "The Musafir Diaries",
  ],

  alternates: {
    canonical: "/blog",
  },

  openGraph: {
    type: "website",

    locale: "en_IN",

    siteName: SITE_NAME,

    title: PAGE_TITLE,

    description: PAGE_DESCRIPTION,

    url: PAGE_URL,

    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt:
          "The Musafir Diaries — Himalayan Travel Stories and Guides",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: PAGE_TITLE,

    description: PAGE_DESCRIPTION,

    images: ["/og-image.jpg"],
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

export default async function BlogPage() {
  /*
   * =========================================================
   * BLOG DATA
   * =========================================================
   */

  const [
    blogs,
    featuredBlog,
    categories,
  ] = await Promise.all([
    getPublishedBlogs(),
    getFeaturedBlog(),
    getBlogCategories(),
  ]);

  /*
   * =========================================================
   * REMOVE FEATURED BLOG FROM NORMAL LIST
   * =========================================================
   */

  const featuredId = featuredBlog?._id
    ? String(featuredBlog._id)
    : null;

  const listingBlogs = featuredId
    ? blogs.filter(
        (blog: { _id: string }) =>
          String(blog._id) !== featuredId,
      )
    : blogs;

  /*
   * =========================================================
   * BLOG ITEM LIST
   * =========================================================
   *
   * Featured blog is represented first when available.
   * Normal published posts follow it.
   */

  const blogItems = [
    ...(featuredBlog
      ? [
          {
            "@type": "ListItem",
            position: 1,
            name: featuredBlog.title,
            url: `${SITE_URL}/blog/${featuredBlog.slug}`,
          },
        ]
      : []),

    ...listingBlogs.map(
      (
        blog: {
          title: string;
          slug: string;
        },
        index: number,
      ) => ({
        "@type": "ListItem",

        position:
          (featuredBlog ? 2 : 1) + index,

        name: blog.title,

        url: `${SITE_URL}/blog/${blog.slug}`,
      }),
    ),
  ];

  /*
   * =========================================================
   * BLOG STRUCTURED DATA
   * =========================================================
   */

  const structuredData = {
    "@context": "https://schema.org",

    "@graph": [
      /*
       * =====================================================
       * BLOG COLLECTION PAGE
       * =====================================================
       */

      {
        "@type": "CollectionPage",

        "@id": `${PAGE_URL}#webpage`,

        url: PAGE_URL,

        name: PAGE_TITLE,

        description: PAGE_DESCRIPTION,

        isPartOf: {
          "@type": "WebSite",

          "@id": `${SITE_URL}/#website`,

          url: SITE_URL,

          name: SITE_NAME,
        },

        breadcrumb: {
          "@id": `${PAGE_URL}#breadcrumb`,
        },

        mainEntity: {
          "@id": `${PAGE_URL}#blog-list`,
        },

        inLanguage: "en-IN",
      },

      /*
       * =====================================================
       * BREADCRUMB
       * =====================================================
       */

      {
        "@type": "BreadcrumbList",

        "@id": `${PAGE_URL}#breadcrumb`,

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

            name: "Blog",

            item: PAGE_URL,
          },
        ],
      },

      /*
       * =====================================================
       * BLOG LIST
       * =====================================================
       */

      ...(blogItems.length > 0
        ? [
            {
              "@type": "ItemList",

              "@id": `${PAGE_URL}#blog-list`,

              name:
                "The Musafir Diaries Travel Stories and Guides",

              description:
                "Published travel stories, destination guides and travel inspiration from The Musafir Diaries.",

              numberOfItems: blogItems.length,

              itemListOrder:
                "https://schema.org/ItemListOrderDescending",

              itemListElement: blogItems,
            },
          ]
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
          __html: JSON.stringify(structuredData),
        }}
      />

      <main className="min-h-screen bg-[#FAF9F5]">
        {/* ===================================================
            BLOG INTRO
        ==================================================== */}

        <BlogHero />

        {/* ===================================================
            BLOG LISTING
        ==================================================== */}

        <Suspense fallback={null}>
          <BlogListing
            blogs={listingBlogs}
            featuredBlog={featuredBlog}
            categories={categories}
          />
        </Suspense>

        {/* ===================================================
            FINAL CTA
        ==================================================== */}

        <BlogCTA />
      </main>
    </>
  );
}