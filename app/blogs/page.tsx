
import type { Metadata } from "next";
import { Suspense } from "react";

import BlogHero from "@/components/blog/listing/BlogHero";
import BlogListing from "@/components/blog/listing/BlogListing";
import BlogCTA from "@/components/blog/listing/BlogCTA";
import BlogFAQ from "@/components/blog/listing/BlogFAQ";

import {
  getBlogCategories,
  getFeaturedBlog,
  getPublishedBlogs,
} from "@/lib/queries/blog.queries";

/* =========================================================
   SITE CONFIG
========================================================= */

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.themusafirdiaries.com";

const SITE_NAME = "The Musafir Diaries";

const PAGE_URL = `${SITE_URL.replace(
  /\/$/,
  "",
)}/blog`;

const PAGE_TITLE =
  "Travel Stories & Guides";

const PAGE_DESCRIPTION =
  "Explore Himalayan travel stories, destination guides, practical travel tips and journey inspiration from The Musafir Diaries.";

/* =========================================================
   METADATA
========================================================= */

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

/* =========================================================
   FAQ DATA
========================================================= */

const faqItems = [
  {
    question:
      "What can I find on The Musafir Diaries travel blog?",
    answer:
      "The Musafir Diaries travel blog features Himalayan travel stories, destination guides, practical travel tips and inspiration to help you plan meaningful journeys across India.",
  },
  {
    question:
      "Does the blog cover Himachal Pradesh destinations?",
    answer:
      "Yes. The blog covers travel information and stories around Himachal Pradesh destinations such as Shimla, Manali, Spiti Valley and other Himalayan places.",
  },
  {
    question:
      "Can I find practical travel tips in the blog?",
    answer:
      "Yes. The blog includes practical travel information, destination planning ideas, travel tips and useful guidance for exploring Himalayan and Indian destinations.",
  },
  {
    question:
      "Are there travel guides for Shimla and Manali?",
    answer:
      "Yes. The Musafir Diaries publishes destination-focused content covering popular Himalayan destinations including Shimla and Manali.",
  },
  {
    question:
      "Can I use the blog to plan a Himalayan trip?",
    answer:
      "Yes. Destination guides, travel stories and practical tips can help you research places, understand the travel experience and plan your Himalayan journey.",
  },
  {
    question:
      "How often are new travel stories and guides added?",
    answer:
      "New travel stories, destination guides and useful travel content can be added to The Musafir Diaries as the travel guide collection grows.",
  },
];

/* =========================================================
   PAGE
========================================================= */

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
   */

  const blogItems = [
    ...(featuredBlog
      ? [
          {
            "@type": "ListItem",
            position: 1,
            name: featuredBlog.title,
            url: `${SITE_URL.replace(
              /\/$/,
              "",
            )}/blog/${featuredBlog.slug}`,
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

        url: `${SITE_URL.replace(
          /\/$/,
          "",
        )}/blog/${blog.slug}`,
      }),
    ),
  ];

  /*
   * =========================================================
   * FAQ SCHEMA
   * =========================================================
   */

  const faqSchema = {
    "@type": "FAQPage",

    "@id": `${PAGE_URL}#faq`,

    mainEntity: faqItems.map(
      (faq) => ({
        "@type": "Question",

        name: faq.question,

        acceptedAnswer: {
          "@type": "Answer",

          text: faq.answer,
        },
      }),
    ),
  };

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

              numberOfItems:
                blogItems.length,

              itemListOrder:
                "https://schema.org/ItemListOrderDescending",

              itemListElement:
                blogItems,
            },
          ]
        : []),

      /*
       * =====================================================
       * FAQ
       * =====================================================
       */

      faqSchema,
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
            FAQ
        ==================================================== */}

        <BlogFAQ
          items={faqItems}
        />

        {/* ===================================================
            FINAL CTA
        ==================================================== */}

        <BlogCTA />
      </main>
    </>
  );
}
