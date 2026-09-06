"use client";

import Image from "next/image";
import {
  ShieldCheck,
  CalendarCheck,
  Headphones,
  BadgeCheck,
} from "lucide-react";

export default function BookingHero() {
  return (
    <section className="relative overflow-hidden bg-[#071826] pt-36 pb-20">

      {/* Background Image */}

      <Image
        src="/images/booking/booking-hero.jpg"
        alt="Himalayan Booking"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Overlay */}

      <div className="absolute inset-0 bg-[#071826]/75" />

      <div className="absolute inset-0 bg-gradient-to-r from-[#071826] via-[#071826]/90 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6">

        <div className="max-w-3xl">

          <div className="inline-flex items-center gap-3 rounded-full border border-[#3BAEA0]/40 bg-[#3BAEA0]/10 px-5 py-2 text-sm font-medium text-[#3BAEA0] backdrop-blur">

            <ShieldCheck className="h-5 w-5" />

            Secure & Encrypted Booking

          </div>

          <h1 className="mt-8 text-5xl font-bold leading-tight text-white md:text-6xl">
            Complete Your
            <span className="block text-[#3BAEA0]">
              Himalayan Journey
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            You're only a few steps away from confirming your
            unforgettable Himalayan adventure. Every booking is
            securely processed with instant confirmation.
          </p>

          <div className="mt-10 flex flex-wrap gap-5">

            <div className="flex items-center gap-3 rounded-2xl bg-white/10 px-5 py-4 backdrop-blur">
              <CalendarCheck className="h-6 w-6 text-[#3BAEA0]" />
              <div>
                <p className="font-semibold text-white">
                  Instant Confirmation
                </p>
                <p className="text-sm text-slate-300">
                  Quick booking process
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl bg-white/10 px-5 py-4 backdrop-blur">
              <Headphones className="h-6 w-6 text-[#3BAEA0]" />
              <div>
                <p className="font-semibold text-white">
                  24×7 Support
                </p>
                <p className="text-sm text-slate-300">
                  Always here to help
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl bg-white/10 px-5 py-4 backdrop-blur">
              <BadgeCheck className="h-6 w-6 text-[#3BAEA0]" />
              <div>
                <p className="font-semibold text-white">
                  Trusted by Travelers
                </p>
                <p className="text-sm text-slate-300">
                  Safe & reliable service
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}