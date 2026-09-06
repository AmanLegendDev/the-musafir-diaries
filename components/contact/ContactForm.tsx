"use client";

import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPinned,
  Calendar,
  MessageSquare,
} from "lucide-react";
import { useState } from "react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    // TODO:
    // POST /api/contact

    setTimeout(() => {
      setLoading(false);
      alert("Inquiry Submitted Successfully!");
    }, 1200);
  }

  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-2 lg:px-8">
        
        {/* Left */}

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="rounded-full bg-emerald-100 px-5 py-2 text-sm font-semibold text-emerald-700">
            Send An Inquiry
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900 md:text-5xl">
            Let's Create Your
            <span className="text-emerald-600"> Dream Trip</span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Tell us about your travel plans and our experts will create
            a personalized itinerary designed around your preferences.
          </p>

          <div className="mt-10 space-y-6">

            <div>
              <h4 className="font-semibold text-slate-900">
                ✔ Personalized Packages
              </h4>

              <p className="mt-1 text-slate-600">
                Every itinerary is customized for you.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-slate-900">
                ✔ Quick Response
              </h4>

              <p className="mt-1 text-slate-600">
                Usually within 30 minutes during business hours.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-slate-900">
                ✔ Free Consultation
              </h4>

              <p className="mt-1 text-slate-600">
                Discuss your requirements without any obligation.
              </p>
            </div>

          </div>
        </motion.div>

        {/* Right */}

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-white p-8 shadow-xl"
        >

          <div className="grid gap-6 md:grid-cols-2">

            <Input
              icon={<User size={18} />}
              placeholder="Full Name"
            />

            <Input
              icon={<Mail size={18} />}
              placeholder="Email Address"
              type="email"
            />

            <Input
              icon={<Phone size={18} />}
              placeholder="Phone Number"
            />

            <Input
              icon={<MapPinned size={18} />}
              placeholder="Preferred Destination"
            />

            <Input
              icon={<Calendar size={18} />}
              placeholder="Travel Date"
              type="date"
            />

            <Input
              placeholder="Number of Travelers"
            />

          </div>

          <div className="mt-6">

            <label className="mb-2 block font-medium text-slate-700">
              Your Message
            </label>

            <div className="relative">

              <MessageSquare
                className="absolute left-4 top-4 text-slate-400"
                size={18}
              />

              <textarea
                rows={6}
                placeholder="Tell us about your dream vacation..."
                className="w-full rounded-2xl border border-slate-300 pl-11 pr-4 pt-3 text-slate-700 outline-none transition focus:border-emerald-500"
              />

            </div>

          </div>

          <button
            disabled={loading}
            className="mt-8 w-full rounded-2xl bg-emerald-600 px-6 py-4 font-semibold text-white transition hover:bg-emerald-700"
          >
            {loading
              ? "Submitting..."
              : "Send Inquiry"}
          </button>

        </motion.form>

      </div>
    </section>
  );
}

function Input({
  icon,
  ...props
}: any) {
  return (
    <div>

      <div className="relative">

        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </div>
        )}

        <input
          {...props}
          className={`w-full rounded-2xl border border-slate-300 py-3 pr-4 outline-none transition focus:border-emerald-500 ${
            icon ? "pl-11" : "pl-4"
          }`}
        />

      </div>

    </div>
  );
}