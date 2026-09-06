"use client";

import { motion } from "framer-motion";
import {
  Clock3,
  CalendarDays,
  PhoneCall,
  ShieldCheck,
} from "lucide-react";

const schedule = [
  {
    day: "Monday - Friday",
    time: "09:00 AM - 07:00 PM",
  },
  {
    day: "Saturday",
    time: "10:00 AM - 05:00 PM",
  },
  {
    day: "Sunday",
    time: "Closed",
  },
];

export default function WorkingHours() {
  return (
    <section className="bg-slate-50 py-24">

      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="mx-auto max-w-3xl text-center">

          <span className="rounded-full bg-emerald-100 px-5 py-2 text-sm font-semibold text-emerald-700">

            Business Hours

          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900 md:text-5xl">

            We're Here When
            <span className="text-emerald-600">
              {" "}You Need Us
            </span>

          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">

            Our travel experts are available throughout the week to
            answer your questions, plan your itinerary, and assist
            you before, during, and after your journey.

          </p>

        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-2">

          {/* Working Hours */}

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg"
          >

            <div className="flex items-center gap-4">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100">

                <Clock3 className="h-8 w-8 text-emerald-600" />

              </div>

              <div>

                <h3 className="text-2xl font-bold text-slate-900">

                  Office Hours

                </h3>

                <p className="text-slate-500">

                  Regular Business Schedule

                </p>

              </div>

            </div>

            <div className="mt-10 space-y-5">

              {schedule.map((item) => (

                <div
                  key={item.day}
                  className="flex items-center justify-between rounded-2xl bg-slate-50 p-5"
                >

                  <span className="font-semibold text-slate-800">

                    {item.day}

                  </span>

                  <span
                    className={`font-medium ${
                      item.time === "Closed"
                        ? "text-red-500"
                        : "text-emerald-600"
                    }`}
                  >

                    {item.time}

                  </span>

                </div>

              ))}

            </div>

          </motion.div>

          {/* Additional Info */}

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-gradient-to-br from-emerald-600 to-emerald-800 p-8 text-white shadow-xl"
          >

            <h3 className="text-3xl font-bold">

              Need Immediate Assistance?

            </h3>

            <p className="mt-5 leading-8 text-emerald-100">

              Even outside business hours, you can submit an inquiry
              through our website. Our team will review your request
              and get back to you as soon as possible.

            </p>

            <div className="mt-10 space-y-6">

              <div className="flex gap-4">

                <PhoneCall className="mt-1 h-6 w-6 flex-shrink-0" />

                <div>

                  <h4 className="font-semibold">

                    Fast Response

                  </h4>

                  <p className="text-emerald-100">

                    Most inquiries are answered within 30–60 minutes during working hours.

                  </p>

                </div>

              </div>

              <div className="flex gap-4">

                <CalendarDays className="mt-1 h-6 w-6 flex-shrink-0" />

                <div>

                  <h4 className="font-semibold">

                    Flexible Consultation

                  </h4>

                  <p className="text-emerald-100">

                    Schedule a call whenever it's convenient for you.

                  </p>

                </div>

              </div>

              <div className="flex gap-4">

                <ShieldCheck className="mt-1 h-6 w-6 flex-shrink-0" />

                <div>

                  <h4 className="font-semibold">

                    Dedicated Travel Support

                  </h4>

                  <p className="text-emerald-100">

                    We're committed to helping you before, during, and after your trip.

                  </p>

                </div>

              </div>

            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}