"use client";

import { motion } from "framer-motion";

interface ArticleContentProps {
  content: string;
}

export default function ArticleContent({
  content,
}: ArticleContentProps) {
  return (
<motion.article
  initial={{
    opacity: 0,
    y: 30,
  }}
  whileInView={{
    opacity: 1,
    y: 0,
  }}
  viewport={{
    once: true,
  }}
  transition={{
    duration: 0.5,
  }}
  className="
    prose
    prose-lg
    lg:prose-xl
    max-w-none
    prose-slate

    prose-headings:font-bold
    prose-headings:text-slate-900

    prose-h2:text-4xl
    prose-h2:mt-16
    prose-h2:mb-6

    prose-h3:text-2xl
    prose-h3:mt-10
    prose-h3:mb-4

    prose-p:text-slate-700
    prose-p:leading-9

    prose-ul:list-disc
    prose-ul:pl-6

    prose-ol:list-decimal
    prose-ol:pl-6

    prose-li:my-2
  "
  dangerouslySetInnerHTML={{
    __html: content,
  }}
/>
  );
}