import BlogArticleContent from "./BlogArticleContent";
import BlogShare from "./BlogShare";

type Props = {
  content: string;
  blogUrl: string;
  title: string;
};

export default function BlogArticle({
  content,
  blogUrl,
  title,
}: Props) {
  return (
    <section
      id="article"
      className="bg-[#FAF9F5] px-5 py-14 sm:px-8 sm:py-20 lg:px-10 lg:py-24"
    >
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,760px)_180px] lg:justify-center lg:gap-16">
        {/* Article */}
        <article className="min-w-0">
          <BlogArticleContent content={content} />
        </article>

        {/* Share */}
        <aside className="lg:pt-2">
          <BlogShare
            blogUrl={blogUrl}
            title={title}
          />
        </aside>
      </div>
    </section>
  );
}