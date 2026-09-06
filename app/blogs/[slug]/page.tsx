import { notFound } from "next/navigation";
import { Metadata } from "next";

import connectDB from "@/lib/db";

import Blog from "@/models/blog.model";

import ReadingProgress from "@/components/blog/details/ReadingProgress";
import ArticleHero from "@/components/blog/details/ArticleHero";
import ArticleContent from "@/components/blog/details/ArticleContent";
import BlogSidebar from "@/components/blog/details/BlogSidebar";
import PopularPosts from "@/components/blog/details/PopularPosts";
import ShareButtons from "@/components/blog/details/ShareButtons";
import TableOfContents from "@/components/blog/details/TableOfContents";
import AuthorCard from "@/components/blog/details/AuthorCard";
import RelatedArticles from "@/components/blog/details/RelatedArticles";
import { Footer } from "@/components/footer";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  await connectDB();

  const { slug } = await params;

  const article = await Blog.findOne({
    slug,
    status: "published",
  }).lean();

  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: article.seoTitle || article.title,
    description: article.seoDescription || article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.featuredImage],
    },
  };
}

export default async function BlogDetailPage({
  params,
}: Props) {
  await connectDB();

  const { slug } = await params;

  const article = await Blog.findOne({
    slug,
    status: "published",
  })
    .populate("category", "name slug")
    .lean();

  if (!article) {
    notFound();
  }

  const relatedArticles = await Blog.find({
    _id: {
      $ne: article._id,
    },
    category: article.category._id,
    status: "published",
  })
    .populate("category", "name slug")
    .sort({
      publishedAt: -1,
    })
    .limit(3)
    .lean();

  const popularPosts = await Blog.find({
    _id: {
      $ne: article._id,
    },
    status: "published",
  })
    .sort({
      publishedAt: -1,
    })
    .limit(5)
    .select(
      "title slug featuredImage readTime publishedAt"
    )
    .lean();

  const articleUrl = `https://altitude-escapes.vercel.app/blog/${article.slug}`;

  return (
    <>
      <ReadingProgress />

      <ArticleHero
        article={JSON.parse(JSON.stringify(article))}
      />

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-3 lg:px-8">

          {/* Left */}

          <div className="lg:col-span-2 space-y-14">

            <ArticleContent
              content={article.content}
            />

     
          </div>

          {/* Sidebar */}

          <BlogSidebar>

            <TableOfContents />

            <PopularPosts
              posts={JSON.parse(
                JSON.stringify(popularPosts)
              )}
            />

            <ShareButtons
              title={article.title}
              url={articleUrl}
            />

          </BlogSidebar>

        </div>
      </section>

      <RelatedArticles
        articles={JSON.parse(
          JSON.stringify(relatedArticles)
        )}
      />
      <Footer/>
    </>
  );
}