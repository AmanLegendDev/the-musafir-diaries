"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { STORY } from "./storyData";

export default function StoryContent() {
  return (
    <div className="max-w-xl">
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-xs font-semibold uppercase tracking-[0.28em] text-[#087E8B]"
      >
        {STORY.eyebrow}
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-4 font-serif text-4xl leading-tight text-[#071A33] md:text-5xl"
      >
        {STORY.title.line1}
        <br />
        {STORY.title.line2}
        <br />
        <span className="text-[#087E8B]">{STORY.title.highlight}</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="mt-7 text-lg leading-8 text-[#0D2747]/80"
      >
        {STORY.description}
      </motion.p>

      <div className="mt-9 space-y-5">
        {STORY.points.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="flex gap-4"
          >
            <CheckCircle2 className="mt-1 h-6 w-6 text-[#F59E0B]" />

            <div>
              <h3 className="font-semibold text-[#071A33]">{item.title}</h3>
              <p className="mt-1 text-sm leading-7 text-[#0D2747]/70">
                {item.text}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}