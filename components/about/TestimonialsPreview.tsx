"use client";

import Image from "next/image";
import Link from "next/link";

import { motion } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";

interface Testimonial {
  _id: string;
  name: string;
  designation?: string;
  location?: string;
  image: string;
  rating: number;
  review: string;
  trip?: string;
}

interface Props {
  testimonials: Testimonial[];
}

export default function TestimonialsPreview({
  testimonials,
}: Props) {
  return (
    <section className="py-28 bg-slate-50">

      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="mx-auto max-w-3xl text-center">

          <span className="rounded-full bg-emerald-100 px-5 py-2 text-sm font-semibold text-emerald-700">

            Traveler Stories

          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900 md:text-5xl">

            Loved By
            <span className="text-emerald-600">
              {" "}Thousands Of Travelers
            </span>

          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">

            Every review reflects a memorable journey,
            genuine hospitality, and unforgettable moments
            across the Himalayas.

          </p>

        </div>

        <div className="mt-20 grid gap-8 lg:grid-cols-3">

          {testimonials.map((item, index) => (

            <motion.div
              key={item._id}
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
                duration: .5,
                delay: index * .1,
              }}
              whileHover={{
                y: -8,
              }}
              className="rounded-[30px] bg-white p-8 border border-slate-200 shadow-sm hover:shadow-xl transition"
            >

              <div className="flex gap-1">

                {Array.from({
                  length: item.rating,
                }).map((_, i) => (

                  <Star
                    key={i}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />

                ))}

              </div>

              <p className="mt-6 leading-8 text-slate-600 line-clamp-5">

                "{item.review}"

              </p>

              <div className="mt-8 flex items-center gap-4">

                <Image
                  src={item.image}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="rounded-full object-cover"
                />

                <div>

                  <h4 className="font-bold text-slate-900">

                    {item.name}

                  </h4>

                  <p className="text-sm text-slate-500">

                    {item.designation}

                    {item.location &&
                      ` • ${item.location}`}

                  </p>

                  {item.trip && (

                    <span className="mt-1 inline-block text-sm text-emerald-600 font-medium">

                      {item.trip}

                    </span>

                  )}

                </div>

              </div>

            </motion.div>

          ))}

        </div>

        <div className="mt-16 text-center">

          <Link
            href="/testimonials"
            className="inline-flex items-center gap-3 rounded-2xl bg-emerald-600 px-8 py-4 font-semibold text-white hover:bg-emerald-700 transition"
          >

            View All Testimonials

            <ArrowRight className="h-5 w-5"/>

          </Link>

        </div>

      </div>

    </section>
  );
}