type Props = {
  content: string;
};

export default function BlogArticleContent({ content }: Props) {
  if (!content?.trim()) {
    return (
      <p className="text-base leading-8 text-[#071A33]/55">
        This story is being prepared. Please check back soon.
      </p>
    );
  }

  return (
    <div
      className="
        blog-content

        text-[17px]
        leading-[1.9]
        text-[#071A33]/75

        sm:text-[18px]
        sm:leading-[1.95]

        [&>p]:mb-7
        [&>p:last-child]:mb-0

        [&>h2]:mb-5
        [&>h2]:mt-14
        [&>h2]:text-3xl
        [&>h2]:font-semibold
        [&>h2]:leading-tight
        [&>h2]:tracking-[-0.03em]
        [&>h2]:text-[#071A33]

        sm:[&>h2]:text-4xl

        [&>h3]:mb-4
        [&>h3]:mt-11
        [&>h3]:text-2xl
        [&>h3]:font-semibold
        [&>h3]:leading-tight
        [&>h3]:tracking-[-0.025em]
        [&>h3]:text-[#071A33]

        sm:[&>h3]:text-3xl

        [&>h4]:mb-3
        [&>h4]:mt-8
        [&>h4]:text-xl
        [&>h4]:font-semibold
        [&>h4]:text-[#071A33]

        [&>ul]:mb-7
        [&>ul]:ml-5
        [&>ul]:list-disc
        [&>ul]:space-y-2

        [&>ol]:mb-7
        [&>ol]:ml-5
        [&>ol]:list-decimal
        [&>ol]:space-y-2

        [&_li]:pl-2

        [&_a]:font-medium
        [&_a]:text-[#087E8B]
        [&_a]:underline
        [&_a]:decoration-[#087E8B]/30
        [&_a]:underline-offset-4
        [&_a]:transition
        [&_a:hover]:text-[#071A33]
        [&_a:hover]:decoration-[#071A33]/30

        [&_strong]:font-semibold
        [&_strong]:text-[#071A33]

        [&_em]:text-[#071A33]/80

        [&>blockquote]:my-10
        [&>blockquote]:border-l-4
        [&>blockquote]:border-[#F59E0B]
        [&>blockquote]:bg-white
        [&>blockquote]:px-6
        [&>blockquote]:py-5
        [&>blockquote]:text-xl
        [&>blockquote]:font-medium
        [&>blockquote]:italic
        [&>blockquote]:leading-8
        [&>blockquote]:text-[#071A33]

        sm:[&>blockquote]:px-8
        sm:[&>blockquote]:py-7
        sm:[&>blockquote]:text-2xl

        [&>hr]:my-12
        [&>hr]:border-0
        [&>hr]:border-t
        [&>hr]:border-[#071A33]/10

        [&>img]:my-10
        [&>img]:w-full
        [&>img]:rounded-[1.5rem]
        [&>img]:object-cover

        [&>figure]:my-10
        [&>figure]:overflow-hidden
        [&>figure]:rounded-[1.5rem]

        [&_figcaption]:mt-3
        [&_figcaption]:text-center
        [&_figcaption]:text-xs
        [&_figcaption]:leading-5
        [&_figcaption]:text-[#071A33]/45

        [&>table]:my-8
        [&>table]:w-full
        [&>table]:overflow-hidden
        [&>table]:rounded-xl
        [&>table]:border
        [&>table]:border-[#071A33]/10

        [&_th]:bg-[#071A33]
        [&_th]:px-4
        [&_th]:py-3
        [&_th]:text-left
        [&_th]:text-sm
        [&_th]:font-semibold
        [&_th]:text-white

        [&_td]:border-t
        [&_td]:border-[#071A33]/10
        [&_td]:px-4
        [&_td]:py-3
        [&_td]:text-sm

        [&>pre]:my-8
        [&>pre]:overflow-x-auto
        [&>pre]:rounded-2xl
        [&>pre]:bg-[#071A33]
        [&>pre]:p-5
        [&>pre]:text-sm
        [&>pre]:leading-6
        [&>pre]:text-white

        [&_code]:rounded
        [&_code]:bg-[#071A33]/5
        [&_code]:px-1.5
        [&_code]:py-0.5
        [&_code]:text-[0.9em]
        [&_code]:text-[#071A33]

        [&>pre_code]:bg-transparent
        [&>pre_code]:p-0
        [&>pre_code]:text-white
      "
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}