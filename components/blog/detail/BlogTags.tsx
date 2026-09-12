import Link from "next/link";
import { Hash } from "lucide-react";

type Props = {
  tags?: string[];
};

export default function BlogTags({ tags = [] }: Props) {
  const cleanTags = Array.from(
    new Set(
      tags
        .map((tag) => tag.trim())
        .filter(Boolean)
    )
  );

  if (!cleanTags.length) {
    return null;
  }

  return (
    <section className="bg-[#FAF9F5] px-5 pb-16 sm:px-8 sm:pb-20 lg:px-10 lg:pb-24">
      <div className="mx-auto max-w-3xl border-t border-[#071A33]/10 pt-8">
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="mr-1 flex items-center gap-2 text-[#071A33]/45">
            <Hash className="h-4 w-4" />

            <span className="text-xs font-semibold uppercase tracking-[0.16em]">
              Topics
            </span>
          </div>

          {cleanTags.map((tag) => (
            <Link
              key={tag}
              href={`/blog?search=${encodeURIComponent(tag)}`}
              className="rounded-full border border-[#071A33]/10 bg-white px-3.5 py-2 text-xs font-medium text-[#071A33]/60 transition hover:border-[#087E8B]/30 hover:bg-[#087E8B]/5 hover:text-[#087E8B]"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}