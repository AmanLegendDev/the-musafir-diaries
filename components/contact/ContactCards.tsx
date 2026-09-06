"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  PhoneCall,
  MessageCircle,
  Mail,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

const contactCards = [
  {
    title: "Call Us",
    description:
      "Speak directly with our travel experts for personalized guidance and instant assistance.",
    icon: PhoneCall,
    value: "+91 98765 43210",
    href: "tel:+919876543210",
    color: "text-emerald-600",
    bg: "bg-emerald-100",
  },
  {
    title: "WhatsApp",
    description:
      "Chat with us anytime to get quick answers, package details, and travel support.",
    icon: MessageCircle,
    value: "Start Chat",
    href: "https://wa.me/919876543210",
    color: "text-green-600",
    bg: "bg-green-100",
  },
  {
    title: "Email Us",
    description:
      "Send your travel inquiries and we'll respond with a customized itinerary.",
    icon: Mail,
    value: "hello@altitudeescapes.com",
    href: "mailto:hello@altitudeescapes.com",
    color: "text-sky-600",
    bg: "bg-sky-100",
  },
  {
    title: "Visit Office",
    description:
      "Meet our team and discuss your next Himalayan adventure in person.",
    icon: MapPin,
    value: "Shimla, Himachal Pradesh",
    href: "https://maps.google.com",
    color: "text-rose-600",
    bg: "bg-rose-100",
  },
];

export default function ContactCards() {
  return (
    <section className="bg-white py-24">

      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="mx-auto max-w-3xl text-center">

          <span className="rounded-full bg-emerald-100 px-5 py-2 text-sm font-semibold text-emerald-700">

            Multiple Ways To Connect

          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900 md:text-5xl">

            We're Always Here
            <span className="text-emerald-600">
              {" "}To Help
            </span>

          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">

            Choose the most convenient way to reach us. Whether you
            prefer a quick call, WhatsApp chat, email, or visiting our
            office, our travel specialists are ready to assist.

          </p>

        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {contactCards.map((card, index) => {

            const Icon = card.icon;

            return (

              <motion.div
                key={card.title}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.5,
                }}
                whileHover={{
                  y: -10,
                }}
                className="group"
              >

                <Link
                  href={card.href}
                  target={
                    card.href.startsWith("http")
                      ? "_blank"
                      : undefined
                  }
                  className="block h-full rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:border-emerald-200 hover:shadow-xl"
                >

                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl ${card.bg}`}
                  >

                    <Icon
                      className={`h-8 w-8 ${card.color}`}
                    />

                  </div>

                  <h3 className="mt-6 text-2xl font-bold text-slate-900">

                    {card.title}

                  </h3>

                  <p className="mt-4 leading-7 text-slate-600">

                    {card.description}

                  </p>

                  <div className="mt-8 flex items-center justify-between">

                    <span className="font-semibold text-slate-900">

                      {card.value}

                    </span>

                    <ArrowUpRight className="h-6 w-6 text-emerald-600 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />

                  </div>

                </Link>

              </motion.div>

            );

          })}

        </div>

      </div>

    </section>
  );
}