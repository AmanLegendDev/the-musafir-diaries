"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation, ExternalLink } from "lucide-react";

export default function MapSection() {
  return (
    <section className="bg-white py-24">

      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="mx-auto max-w-3xl text-center">

          <span className="rounded-full bg-emerald-100 px-5 py-2 text-sm font-semibold text-emerald-700">

            Find Us

          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900 md:text-5xl">

            Visit Our
            <span className="text-emerald-600"> Office</span>

          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">

            Located in the beautiful hills of Shimla, our office is
            easily accessible for travelers looking to plan their next
            unforgettable Himalayan adventure.

          </p>

        </div>

        <div className="mt-16 overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-xl">

          <div className="aspect-[16/9] w-full">

            <iframe
              title="Altitude Escapes Office"
              src="https://www.google.com/maps?q=Dhalli,Shimla,Himachal+Pradesh&output=embed"
              className="h-full w-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />

          </div>

        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 grid gap-6 md:grid-cols-3"
        >

          <div className="rounded-3xl bg-slate-50 p-8">

            <MapPin className="h-10 w-10 text-emerald-600" />

            <h3 className="mt-5 text-xl font-bold text-slate-900">

              Office Address

            </h3>

            <p className="mt-3 leading-7 text-slate-600">

              Dhalli,
              <br />
              Shimla,
              <br />
              Himachal Pradesh,
              <br />
              India

            </p>

          </div>

          <div className="rounded-3xl bg-slate-50 p-8">

            <Navigation className="h-10 w-10 text-emerald-600" />

            <h3 className="mt-5 text-xl font-bold text-slate-900">

              Easy To Reach

            </h3>

            <p className="mt-3 leading-7 text-slate-600">

              Conveniently located near the main highway with easy
              access by taxi, private vehicle, and local transport.

            </p>

          </div>

          <a
            href="https://maps.google.com/?q=Dhalli,Shimla,Himachal+Pradesh"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-3xl bg-emerald-600 p-8 text-white transition hover:bg-emerald-700"
          >

            <ExternalLink className="h-10 w-10" />

            <h3 className="mt-5 text-xl font-bold">

              Open In Google Maps

            </h3>

            <p className="mt-3 leading-7 text-emerald-100">

              Get turn-by-turn directions and navigate directly to our
              office.

            </p>

            <span className="mt-6 inline-flex items-center font-semibold">

              Open Maps →

            </span>

          </a>

        </motion.div>

      </div>

    </section>
  );
}