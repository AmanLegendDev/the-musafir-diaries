"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Building2,
  MapPin,
  PhoneCall,
  Mail,
  Clock3,
  ArrowRight,
} from "lucide-react";

const info = [
  {
    icon: Building2,
    title: "Our Office",
    value: "Shimla, Himachal Pradesh, India",
  },
  {
    icon: PhoneCall,
    title: "Phone",
    value: "+91 98765 43210",
  },
  {
    icon: Mail,
    title: "Email",
    value: "hello@altitudeescapes.com",
  },
  {
    icon: Clock3,
    title: "Working Hours",
    value: "Mon - Sat • 9:00 AM - 7:00 PM",
  },
];

export default function OfficeInfo() {
  return (
    <section className="bg-white py-24">

      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-2 lg:px-8">

        {/* Left */}

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >

          <span className="rounded-full bg-emerald-100 px-5 py-2 text-sm font-semibold text-emerald-700">

            Visit Our Office

          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900 md:text-5xl">

            We'd Love To
            <span className="text-emerald-600"> Meet You</span>

          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">

            Whether you're planning your next Himalayan adventure or
            simply have questions about our travel experiences,
            our team is always happy to help.

          </p>

          <div className="mt-10 space-y-6">

            {info.map((item) => {

              const Icon = item.icon;

              return (

                <div
                  key={item.title}
                  className="flex items-start gap-5"
                >

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100">

                    <Icon className="h-7 w-7 text-emerald-600" />

                  </div>

                  <div>

                    <h3 className="font-semibold text-slate-900">

                      {item.title}

                    </h3>

                    <p className="mt-1 text-slate-600">

                      {item.value}

                    </p>

                  </div>

                </div>

              );

            })}

          </div>

          <Link
            href="/booking"
            className="mt-10 inline-flex items-center gap-3 rounded-2xl bg-emerald-600 px-7 py-4 font-semibold text-white transition hover:bg-emerald-700"
          >

            Schedule Your Trip

            <ArrowRight className="h-5 w-5" />

          </Link>

        </motion.div>

        {/* Right */}

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="rounded-[32px] border border-slate-200 bg-slate-50 p-10 shadow-lg"
        >

          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-100">

            <MapPin className="h-10 w-10 text-emerald-600" />

          </div>

          <h3 className="mt-8 text-3xl font-bold text-slate-900">

            Why Visit Us?

          </h3>

          <p className="mt-5 leading-8 text-slate-600">

            Meet our experienced travel consultants in person,
            explore customized itineraries, discuss your travel goals,
            and receive expert recommendations tailored specifically
            to your journey.

          </p>

          <div className="mt-10 space-y-5">

            <div className="flex gap-3">

              <span className="text-emerald-600">✔</span>

              <p className="text-slate-700">

                Free travel consultation

              </p>

            </div>

            <div className="flex gap-3">

              <span className="text-emerald-600">✔</span>

              <p className="text-slate-700">

                Personalized itinerary planning

              </p>

            </div>

            <div className="flex gap-3">

              <span className="text-emerald-600">✔</span>

              <p className="text-slate-700">

                Expert destination recommendations

              </p>

            </div>

            <div className="flex gap-3">

              <span className="text-emerald-600">✔</span>

              <p className="text-slate-700">

                Instant booking assistance

              </p>

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}