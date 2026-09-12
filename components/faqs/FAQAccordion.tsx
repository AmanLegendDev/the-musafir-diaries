"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import FAQItem, { type FAQItemData } from "./FAQItem";

type Props = {
  faqs: FAQItemData[];
};

export default function FAQAccordion({ faqs }: Props) {
  const [openId, setOpenId] = useState<string | null>(null);

  if (!faqs.length) {
    return null;
  }

  const handleToggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <div className="border-t border-[#071A33]/10">
      {faqs.map((faq, index) => (
        <FAQItem
          key={faq._id}
          faq={faq}
          index={index}
          isOpen={openId === faq._id}
          onToggle={() => handleToggle(faq._id)}
        />
      ))}
    </div>
  );
}