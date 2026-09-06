"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Mountain, HeartHandshake, Globe2 } from "lucide-react";

const highlights = [
  {
    icon: Mountain,
    title: "Curated Experiences",
    description:
      "Every itinerary is carefully planned to showcase the true beauty of the Himalayas.",
  },
  {
    icon: HeartHandshake,
    title: "Personalized Service",
    description:
      "From your first inquiry to your final destination, we focus on making every journey seamless.",
  },
  {
    icon: Globe2,
    title: "Authentic Local Connections",
    description:
      "We partner with trusted local experts and premium stays to create meaningful travel experiences.",
  },
];

export default function OurStory() {
  return (
    <section className="py-28 bg-white">

      <div className="mx-auto grid max-w-7xl items-center gap-20 px-6 lg:grid-cols-2 lg:px-8">

        {/* Image */}

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >

          <div className="relative h-[650px] overflow-hidden rounded-[36px]">

            <Image
              src="/images/about/our-story.jpg"
              alt="Our Story"
              fill
              className="object-cover"
            />

          </div>

          <div className="absolute -bottom-8 -right-8 rounded-[28px] bg-white p-8 shadow-2xl">

            <p className="text-sm uppercase tracking-[0.25em] text-slate-500">

              Since

            </p>

            <h3 className="mt-2 text-5xl font-bold text-emerald-600">

              2018

            </h3>

          </div>

        </motion.div>

        {/* Content */}

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >

          <span className="rounded-full bg-emerald-100 px-5 py-2 text-sm font-semibold text-emerald-700">

            Our Story

          </span>

          <h2 className="mt-6 text-4xl font-bold leading-tight text-slate-900 md:text-5xl">

            More Than A Travel Company —
            <span className="text-emerald-600">

              {" "}A Journey Partner

            </span>

          </h2>

          <p className="mt-8 text-lg leading-9 text-slate-600">

            Altitude Escapes was born from a deep passion for the Himalayas and
            a belief that travel should be more than simply visiting destinations.
            Every journey has the power to inspire, transform, and create lifelong
            memories. Our goal has always been to help travelers experience the
            mountains through authentic culture, breathtaking landscapes, meaningful
            adventures, and exceptional hospitality.

          </p>

          <p className="mt-6 text-lg leading-9 text-slate-600">

            Rather than offering ordinary tour packages, we focus on carefully
            crafted experiences that balance luxury, comfort, and local authenticity.
            Whether it is a peaceful mountain retreat, an adventurous road trip,
            a family holiday, or a romantic escape, every itinerary is thoughtfully
            designed to match your travel dreams while maintaining the highest
            standards of safety and service.

          </p>

          <div className="mt-10 space-y-6">

            {highlights.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="flex gap-5"
                >

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100">

                    <Icon className="h-7 w-7 text-emerald-600" />

                  </div>

                  <div>

                    <h3 className="text-xl font-semibold text-slate-900">

                      {item.title}

                    </h3>

                    <p className="mt-2 text-slate-600 leading-7">

                      {item.description}

                    </p>

                  </div>

                </div>
              );
            })}

          </div>

        </motion.div>

      </div>

    </section>
  );
}