"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";

import FAQContextLinks from "./FAQContextLinks";

export type FAQReference = {
  _id: string;
  name: string;
  slug: string;
};

export type FAQItemData = {
  _id: string;
  question: string;
  answer: string;
  category?: string;
  destination?: FAQReference | null;
  package?: FAQReference | null;
  hotel?: FAQReference | null;
  featured?: boolean;
  displayOrder?: number;
};

type Props = {
  faq: FAQItemData;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
};

function formatCategory(category?: string) {
  if (!category?.trim()) {
    return "Travel information";
  }

  return category
    .trim()
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatAnswer(answer: string) {
  return answer
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export default function FAQItem({
  faq,
  index,
  isOpen,
  onToggle,
}: Props) {
  const answerId = `faq-answer-${faq._id}`;
  const questionId = `faq-question-${faq._id}`;

  const paragraphs = formatAnswer(faq.answer);

  return (
    <div className="group border-b border-[#071A33]/10">
      <button
        id={questionId}
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={answerId}
        className="flex w-full items-start gap-4 py-6 text-left sm:gap-6 sm:py-7 lg:py-8"
      >
        {/* Number */}
        <span className="w-8 shrink-0 pt-1 text-xs font-medium tracking-[0.08em] text-[#071A33]/25 sm:w-10">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Question */}
        <span className="min-w-0 flex-1">
          <span className="block text-[10px] font-semibold uppercase tracking-[0.17em] text-[#071A33]/35">
            {formatCategory(faq.category)}
          </span>

          <span
            className={`mt-2 block max-w-3xl font-serif text-xl leading-[1.28] tracking-[-0.025em] transition-colors duration-300 sm:text-2xl lg:text-[1.7rem] ${
              isOpen
                ? "text-[#087E8B]"
                : "text-[#071A33] group-hover:text-[#087E8B]"
            }`}
          >
            {faq.question}
          </span>
        </span>

        {/* Toggle */}
        <span
          aria-hidden="true"
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 sm:h-11 sm:w-11 ${
            isOpen
              ? "border-[#087E8B] bg-[#087E8B] text-white"
              : "border-[#071A33]/10 bg-white text-[#071A33]/50 group-hover:border-[#087E8B]/30 group-hover:text-[#087E8B]"
          }`}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.span
                key="minus"
                initial={{ rotate: -45, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 45, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Minus className="h-4 w-4" />
              </motion.span>
            ) : (
              <motion.span
                key="plus"
                initial={{ rotate: 45, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -45, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Plus className="h-4 w-4" />
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      </button>

      {/* Answer */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={answerId}
            role="region"
            aria-labelledby={questionId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: {
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              },
              opacity: {
                duration: 0.2,
              },
            }}
            className="overflow-hidden"
          >
            <div className="pb-7 pl-12 pr-14 sm:pb-8 sm:pl-16 lg:pl-20">
          <div className="max-w-3xl border-l border-[#087E8B]/20 pl-5 sm:pl-6">
  <div className="space-y-4 text-sm leading-7 text-[#071A33]/55 sm:text-base sm:leading-8">
    {paragraphs.map((paragraph, paragraphIndex) => (
      <p key={paragraphIndex}>{paragraph}</p>
    ))}
  </div>

  <FAQContextLinks faq={faq} />
</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}