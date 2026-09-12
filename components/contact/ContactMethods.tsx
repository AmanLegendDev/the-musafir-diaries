"use client";

import { Mail, MessageCircle, Phone, Camera } from "lucide-react";
import { motion } from "framer-motion";

import ContactMethodCard from "./ContactMethodCard";

const CONTACT_METHODS = [
  {
    icon: Phone,
    label: "Call",
    title: "Speak with us",
    description: "For a quick conversation about your travel plans.",
    value: "999999999",
    href: "tel:999999999",
    accent: "teal" as const,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    title: "Message us",
    description: "Send us your idea, dates or questions directly.",
    value: "WhatsApp",
    href: "https://wa.me/919999999999",
    accent: "orange" as const,
  },
  {
    icon: Mail,
    label: "Email",
    title: "Write to us",
    description: "Prefer email? Share the details at your own pace.",
    value: "hello@themusafirdiaries.com",
    href: "mailto:hello@themusafirdiaries.com",
    accent: "teal" as const,
  },
  {
    icon: Camera,
    label: "Instagram",
    title: "Follow the journey",
    description: "A glimpse into the places, stories and moments we love.",
    value: "Instagram",
    href: "https://instagram.com/",
    accent: "orange" as const,
  },
];

export default function ContactMethods() {
  return (
    <section
      id="contact"
      className="bg-white px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="grid gap-8 lg:grid-cols-[0.55fr_1.45fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-9 bg-[#087E8B]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#071A33]/40">
                Find your way in
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.08 }}
          >
            <h2 className="max-w-4xl font-serif text-4xl leading-[1.02] tracking-[-0.04em] text-[#071A33] sm:text-5xl lg:text-[4.15rem]">
              Choose the conversation
              <span className="text-[#087E8B]"> that suits you.</span>
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#071A33]/50 sm:text-base sm:leading-8">
              Call, message, email or simply follow along. There&apos;s no
              wrong way to start planning.
            </p>
          </motion.div>
        </div>

        {/* Contact cards */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {CONTACT_METHODS.map((method, index) => (
            <motion.div
              key={method.label}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.55,
                delay: index * 0.07,
              }}
            >
              <ContactMethodCard {...method} />
            </motion.div>
          ))}
        </div>

        {/* Small bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-8 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.17em] text-[#071A33]/30"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#F59E0B]" />
          Start wherever feels easiest
        </motion.div>
      </div>
    </section>
  );
}