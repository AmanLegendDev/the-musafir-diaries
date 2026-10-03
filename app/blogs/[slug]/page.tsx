import type { Metadata } from "next";

import BlogBreadcrumb from "@/components/blog/detail/BlogBreadcrumb";
import BlogHero from "@/components/blog/detail/BlogHero";
import BlogReadingProgress from "@/components/blog/detail/BlogReadingProgress";
import BlogArticle from "@/components/blog/detail/BlogArticle";
import BlogTags from "@/components/blog/detail/BlogTags";
import RelatedBlogs from "@/components/blog/detail/RelatedBlogs";
import BlogCTA from "@/components/blog/detail/BlogCTA";
import BlogNotFound from "@/components/blog/detail/BlogNotFound";

import {
  getBlogBySlug,
  getRelatedBlogs,
} from "@/lib/queries/blog.queries";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type BlogCategory = {
  _id?: string;
  name?: string;
  slug?: string;
};

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.themusafirdiaries.com";

const SITE_NAME = "The Musafir Diaries";

const SITE_LOGO = `${SITE_URL}/icon-512.png`;

function getCategoryId(
  category: BlogCategory | null | undefined,
) {
  if (!category?._id) {
    return null;
  }

  return String(category._id);
}

function getAbsoluteUrl(path: string) {
  if (
    path.startsWith("http://") ||
    path.startsWith("https://")
  ) {
    return path;
  }

  return `${SITE_URL.replace(/\/$/, "")}/${path.replace(
    /^\//,
    "",
  )}`;
}

/* =========================================================
   DYNAMIC METADATA
========================================================= */

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const blog = await getBlogBySlug(slug);

  /*
   * Invalid blog:
   * Do not allow a soft 404 to be indexed.
   */

  if (!blog) {
    return {
      title: "Story Not Found | The Musafir Diaries",

      description:
        "The travel story you are looking for could not be found.",

      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title =
    blog.seoTitle?.trim() ||
    `${blog.title} | The Musafir Diaries`;

  const description =
    blog.seoDescription?.trim() ||
    blog.excerpt;

  const canonicalUrl =
    getAbsoluteUrl(`/blog/${blog.slug}`);

  const featuredImage = blog.featuredImage
    ? getAbsoluteUrl(blog.featuredImage)
    : getAbsoluteUrl("/og-image.jpg");

  return {
    metadataBase: new URL(SITE_URL),

    title,

    description,

    keywords: [
      blog.title,
      ...(blog.tags || []),
      blog.category?.name,
      "Himachal Pradesh travel",
      "Himalayan travel",
      "India travel",
      SITE_NAME,
    ].filter(Boolean),

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      type: "article",

      locale: "en_IN",

      siteName: SITE_NAME,

      title,

      description,

      url: canonicalUrl,

      publishedTime: blog.publishedAt
        ? new Date(
            blog.publishedAt,
          ).toISOString()
        : undefined,

      modifiedTime: blog.updatedAt
        ? new Date(
            blog.updatedAt,
          ).toISOString()
        : undefined,

      authors: blog.author
        ? [blog.author]
        : undefined,

      tags: blog.tags?.length
        ? blog.tags
        : undefined,

      images: [
        {
          url: featuredImage,
          width: 1200,
          height: 630,
          alt: `${blog.title} | ${SITE_NAME}`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",

      title,

      description,

      images: [featuredImage],
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
   BLOG DETAIL PAGE
========================================================= */

export default async function BlogDetailPage({
  params,
}: PageProps) {
  const { slug } = await params;

  /*
   * ---------------------------------------------------------
   * Resolve blog
   * ---------------------------------------------------------
   */

  const blog = await getBlogBySlug(slug);

  /*
   * ---------------------------------------------------------
   * Real not-found handling
   * ---------------------------------------------------------
   *
   * Keep existing visual fallback instead of allowing an
   * indexable soft 404.
   */

  if (!blog) {
    return <BlogNotFound />;
  }

  /*
   * ---------------------------------------------------------
   * Category
   * ---------------------------------------------------------
   */

  const category =
    blog.category as BlogCategory | null;

  const categoryId =
    getCategoryId(category);

  /*
   * ---------------------------------------------------------
   * Related posts
   * ---------------------------------------------------------
   */

  const relatedBlogs =
    await getRelatedBlogs(
      categoryId,
      blog.slug,
      3,
    );

  /*
   * ---------------------------------------------------------
   * URLs
   * ---------------------------------------------------------
   */

  const blogUrl =
    getAbsoluteUrl(`/blog/${blog.slug}`);

  const blogImage = blog.featuredImage
    ? getAbsoluteUrl(blog.featuredImage)
    : getAbsoluteUrl("/og-image.jpg");

  /*
   * ---------------------------------------------------------
   * Dates
   * ---------------------------------------------------------
   */

  const publishedDate = blog.publishedAt
    ? new Date(blog.publishedAt)
    : null;

  const modifiedDate = blog.updatedAt
    ? new Date(blog.updatedAt)
    : publishedDate;

  /*
   * ---------------------------------------------------------
   * Article schema
   * ---------------------------------------------------------
   */

  const articleSchema = {
    "@type": "BlogPosting",

    "@id": `${blogUrl}#article`,

    headline: blog.title,

    description:
      blog.seoDescription?.trim() ||
      blog.excerpt,

    image: [blogImage],

    url: blogUrl,

    mainEntityOfPage: {
      "@type": "WebPage",

      "@id": `${blogUrl}#webpage`,
    },

    ...(publishedDate
      ? {
          datePublished:
            publishedDate.toISOString(),
        }
      : {}),

    ...(modifiedDate
      ? {
          dateModified:
            modifiedDate.toISOString(),
        }
      : {}),

    author: {
      "@type": "Person",

      name:
        blog.author ||
        SITE_NAME,
    },

    publisher: {
      "@type": "Organization",

      "@id":
        `${SITE_URL}/#organization`,

      name: SITE_NAME,

      url: SITE_URL,

      logo: {
        "@type": "ImageObject",

        url: SITE_LOGO,

        width: 512,

        height: 512,
      },
    },

    ...(blog.tags?.length
      ? {
          keywords:
            blog.tags.join(", "),
        }
      : {}),

    inLanguage: "en-IN",

    isPartOf: {
      "@type": "WebSite",

      "@id":
        `${SITE_URL}/#website`,

      name: SITE_NAME,

      url: SITE_URL,
    },
  };

  /*
   * ---------------------------------------------------------
   * WebPage schema
   * ---------------------------------------------------------
   */

  const webPageSchema = {
    "@type": "WebPage",

    "@id": `${blogUrl}#webpage`,

    url: blogUrl,

    name: blog.title,

    description:
      blog.seoDescription?.trim() ||
      blog.excerpt,

    isPartOf: {
      "@type": "WebSite",

      "@id":
        `${SITE_URL}/#website`,

      name: SITE_NAME,

      url: SITE_URL,
    },

    primaryImageOfPage: {
      "@type": "ImageObject",

      url: blogImage,
    },

    mainEntity: {
      "@id": `${blogUrl}#article`,
    },

    breadcrumb: {
      "@id": `${blogUrl}#breadcrumb`,
    },

    inLanguage: "en-IN",
  };

  /*
   * ---------------------------------------------------------
   * Breadcrumb schema
   * ---------------------------------------------------------
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

      name: "Journal",

      item:
        getAbsoluteUrl("/blog"),
    },
  ];

  if (category?.name) {
    breadcrumbItems.push({
      "@type": "ListItem",

      position: 3,

      name: category.name,

      item: category.slug
        ? getAbsoluteUrl(
            `/blog?category=${encodeURIComponent(
              category.slug,
            )}`,
          )
        : getAbsoluteUrl("/blog"),
    });
  }

  breadcrumbItems.push({
    "@type": "ListItem",

    position: category?.name ? 4 : 3,

    name: blog.title,

    item: blogUrl,
  });

  const breadcrumbSchema = {
    "@type": "BreadcrumbList",

    "@id": `${blogUrl}#breadcrumb`,

    itemListElement:
      breadcrumbItems,
  };

  /*
   * ---------------------------------------------------------
   * Combined structured data
   * ---------------------------------------------------------
   */

  const structuredData = {
    "@context": "https://schema.org",

    "@graph": [
      articleSchema,
      webPageSchema,
      breadcrumbSchema,
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
          READING PROGRESS
      ====================================================== */}

      <BlogReadingProgress />

      <main className="min-h-screen bg-[#FAF9F5]">
        {/* ===================================================
            BREADCRUMB
        ==================================================== */}

        <BlogBreadcrumb
          blogTitle={blog.title}
          categoryName={
            category?.name
          }
          categorySlug={
            category?.slug
          }
        />

        {/* ===================================================
            BLOG HERO
        ==================================================== */}

        <BlogHero blog={blog} />

        {/* ===================================================
            ARTICLE
        ==================================================== */}

        <BlogArticle
          content={blog.content}
          blogUrl={blogUrl}
          title={blog.title}
        />

        {/* ===================================================
            TAGS
        ==================================================== */}

        <BlogTags
          tags={blog.tags || []}
        />

        {/* ===================================================
            RELATED BLOGS
        ==================================================== */}

        <RelatedBlogs
          blogs={relatedBlogs}
          currentSlug={blog.slug}
        />

        {/* ===================================================
            FINAL CTA
        ==================================================== */}

        <BlogCTA
          blogTitle={blog.title}
        />
      </main>
    </>
  );
}