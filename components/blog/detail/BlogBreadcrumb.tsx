import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Props = {
  blogTitle: string;
  categoryName?: string | null;
  categorySlug?: string | null;
};

export default function BlogBreadcrumb({
  blogTitle,
  categoryName,
  categorySlug,
}: Props) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="border-b border-[#071A33]/8 bg-[#FAF9F5]"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-hidden px-5 py-4 sm:px-8 lg:px-10">
        <Link
          href="/"
          className="shrink-0 text-xs font-medium text-[#071A33]/45 transition hover:text-[#087E8B]"
        >
          Home
        </Link>

        <ChevronRight className="h-3.5 w-3.5 shrink-0 text-[#071A33]/20" />

        <Link
          href="/blog"
          className="shrink-0 text-xs font-medium text-[#071A33]/45 transition hover:text-[#087E8B]"
        >
          Journal
        </Link>

        {categoryName && (
          <>
            <ChevronRight className="h-3.5 w-3.5 shrink-0 text-[#071A33]/20" />

            {categorySlug ? (
              <Link
                href={`/blog?category=${encodeURIComponent(categorySlug)}`}
                className="max-w-[180px] shrink-0 truncate text-xs font-medium text-[#071A33]/45 transition hover:text-[#087E8B]"
              >
                {categoryName}
              </Link>
            ) : (
              <span className="max-w-[180px] shrink-0 truncate text-xs font-medium text-[#071A33]/45">
                {categoryName}
              </span>
            )}
          </>
        )}

        <ChevronRight className="h-3.5 w-3.5 shrink-0 text-[#071A33]/20" />

        <span
          aria-current="page"
          className="min-w-0 truncate text-xs font-semibold text-[#071A33]"
        >
          {blogTitle}
        </span>
      </div>
    </nav>
  );
}