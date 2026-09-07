"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { STORY } from "./storyData";

export default function StoryImage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="relative"
    >
      <div className="absolute -left-8 -top-8 h-40 w-40 rounded-full bg-[#1597C7]/10 blur-3xl" />
      <div className="absolute -bottom-8 -right-8 h-48 w-48 rounded-full bg-[#F59E0B]/10 blur-3xl" />

      <div className="relative overflow-hidden rounded-[36px] shadow-[0_35px_80px_rgba(7,26,51,0.18)]">
        <Image
          src={STORY.image}
          alt="The Musafir Diaries editorial journey"
          width={700}
          height={850}
          className="h-[520px] w-full object-cover"
        />
      </div>

      {/* Floating quote */}
      <div className="absolute bottom-6 left-6 rounded-2xl bg-white/90 px-5 py-4 backdrop-blur-xl">
        <p className="text-xs uppercase tracking-[0.22em] text-[#087E8B]">
          Our Philosophy
        </p>
        <h3 className="mt-2 font-serif text-2xl text-[#071A33]">
          Travel deeper,
          <br />
          not faster.
        </h3>
      </div>
    </motion.div>
  );
}