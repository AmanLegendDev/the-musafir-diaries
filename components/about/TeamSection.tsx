"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Mountain,
  MapPinned,
  Headset,
  Compass,
} from "lucide-react";

const team = [
  {
    icon: Compass,
    role: "Founder & Travel Curator",
    name: "Altitude Escapes",
    description:
      "Designing unforgettable Himalayan journeys with a passion for luxury travel, authentic experiences, and exceptional hospitality.",
  },
  {
    icon: Mountain,
    role: "Destination Expert",
    name: "Local Specialists",
    description:
      "Our local travel experts know the hidden valleys, scenic routes, and cultural treasures that make every trip unique.",
  },
  {
    icon: MapPinned,
    role: "Trip Planner",
    name: "Travel Consultants",
    description:
      "Every itinerary is thoughtfully customized to match your travel style, preferences, and budget.",
  },
  {
    icon: Headset,
    role: "Guest Support",
    name: "24/7 Assistance",
    description:
      "From planning to your return journey, our dedicated support team is always ready to assist whenever you need us.",
  },
];

export default function TeamSection() {
  return (
    <section className="py-28 bg-slate-50">

      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="mx-auto max-w-3xl text-center">

          <span className="rounded-full bg-emerald-100 px-5 py-2 text-sm font-semibold text-emerald-700">

            Meet Our Experts

          </span>

          <h2 className="mt-6 text-4xl md:text-5xl font-bold text-slate-900">

            The People Behind
            <span className="text-emerald-600">
              {" "}Every Great Journey
            </span>

          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">

            Behind every unforgettable adventure is a passionate team
            dedicated to planning seamless experiences, providing expert
            guidance, and ensuring every traveler feels confident from
            the first inquiry to the final destination.

          </p>

        </div>

        <motion.div
          initial={{ opacity: 0, scale: .95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: .6 }}
          className="relative mt-16 overflow-hidden rounded-[36px]"
        >

          <Image
            src="/images/about/team.jpg"
            alt="Altitude Escapes Team"
            width={1400}
            height={700}
            className="h-[500px] w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

          <div className="absolute bottom-10 left-10 max-w-xl">

            <h3 className="text-4xl font-bold text-white">

              Passion.
              Trust.
              Adventure.

            </h3>

            <p className="mt-4 text-slate-200 leading-8">

              Our experienced travel professionals work together to
              transform every itinerary into an extraordinary Himalayan
              experience.

            </p>

          </div>

        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {team.map((member, index) => {

            const Icon = member.icon;

            return (

              <motion.div
                key={member.role}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: .5,
                  delay: index * .1,
                }}
                whileHover={{
                  y: -8,
                }}
                className="rounded-[30px] bg-white border border-slate-200 p-8 shadow-sm hover:shadow-xl transition"
              >

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100">

                  <Icon className="h-8 w-8 text-emerald-600"/>

                </div>

                <p className="mt-8 text-sm uppercase tracking-widest text-emerald-600 font-semibold">

                  {member.role}

                </p>

                <h3 className="mt-2 text-2xl font-bold text-slate-900">

                  {member.name}

                </h3>

                <p className="mt-5 leading-8 text-slate-600">

                  {member.description}

                </p>

              </motion.div>

            );

          })}

        </div>

      </div>

    </section>
  );
}