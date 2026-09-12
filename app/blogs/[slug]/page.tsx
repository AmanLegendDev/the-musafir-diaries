import type { Metadata } from "next";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/footer/Footer";

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

function getCategoryId(category: BlogCategory | null | undefined) {
  if (!category?._id) return null;

  return String(category._id);
}

function getAbsoluteUrl(path: string) {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://the-musafir-diaries.vercel.app";

  return `${baseUrl.replace(/\/$/, "")}${path}`;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Story Not Found | The Musafir Diaries",
      description:
        "The travel story you're looking for could not be found.",
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

  const canonicalPath = `/blog/${blog.slug}`;

  return {
    title,
    description,

    keywords: [
      blog.title,
      ...(blog.tags || []),
      blog.category?.name,
      "Himachal Pradesh travel",
      "Himalayan travel",
      "The Musafir Diaries",
    ].filter(Boolean),

    alternates: {
      canonical: canonicalPath,
    },

    openGraph: {
      title,
      description,
      type: "article",
      url: canonicalPath,

      publishedTime: blog.publishedAt
        ? new Date(blog.publishedAt).toISOString()
        : undefined,

      authors: blog.author
        ? [blog.author]
        : undefined,

      tags: blog.tags?.length
        ? blog.tags
        : undefined,

      images: blog.featuredImage
        ? [
            {
              url: blog.featuredImage,
              alt: blog.title,
            },
          ]
        : undefined,
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,

      images: blog.featuredImage
        ? [blog.featuredImage]
        : undefined,
    },
  };
}

export default async function BlogDetailPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return (
      <>
        <Navbar />
        <BlogNotFound />
        <Footer />
      </>
    );
  }

  const category = blog.category as BlogCategory | null;

  const categoryId = getCategoryId(category);

  const relatedBlogs = await getRelatedBlogs(
    categoryId,
    blog.slug,
    3
  );

  const blogPath = `/blog/${blog.slug}`;
  const blogUrl = getAbsoluteUrl(blogPath);

  const publishedDate = blog.publishedAt
    ? new Date(blog.publishedAt)
    : null;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",

    headline: blog.title,

    description: blog.seoDescription?.trim() || blog.excerpt,

    image: blog.featuredImage
      ? [blog.featuredImage]
      : undefined,

    datePublished: publishedDate
      ? publishedDate.toISOString()
      : undefined,

    dateModified: blog.updatedAt
      ? new Date(blog.updatedAt).toISOString()
      : publishedDate
        ? publishedDate.toISOString()
        : undefined,

    author: {
      "@type": "Person",
      name: blog.author,
    },

    publisher: {
      "@type": "Organization",
      name: "The Musafir Diaries",
    },

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": blogUrl,
    },

    url: blogUrl,

    keywords: blog.tags?.length
      ? blog.tags.join(", ")
      : undefined,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",

    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: getAbsoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Journal",
        item: getAbsoluteUrl("/blog"),
      },
      ...(category?.name
        ? [
            {
              "@type": "ListItem",
              position: 3,
              name: category.name,
              item: category.slug
                ? getAbsoluteUrl(
                    `/blog?category=${encodeURIComponent(
                      category.slug
                    )}`
                  )
                : getAbsoluteUrl("/blog"),
            },
          ]
        : []),
      {
        "@type": "ListItem",
        position: category?.name ? 4 : 3,
        name: blog.title,
        item: blogUrl,
      },
    ],
  };

  return (
    <>
    

      <BlogReadingProgress />

      <main>
        <BlogBreadcrumb
          blogTitle={blog.title}
          categoryName={category?.name}
          categorySlug={category?.slug}
        />

        <BlogHero blog={blog} />

        <BlogArticle
          content={blog.content}
          blogUrl={blogUrl}
          title={blog.title}
        />

        <BlogTags tags={blog.tags || []} />

        <RelatedBlogs
          blogs={relatedBlogs}
          currentSlug={blog.slug}
        />

        <BlogCTA blogTitle={blog.title} />
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

     
    </>
  );
}