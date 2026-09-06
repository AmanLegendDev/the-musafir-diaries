"use client";

import { useFormContext } from "react-hook-form";

import type { BookingFormData } from "./types";

export default function StepOne() {

const {
  register,
  formState: { errors },
} = useFormContext<BookingFormData>();

  return (
  <div className="space-y-12">

    {/* Header */}

    <div className="text-center">

      <div className="inline-flex items-center rounded-full bg-[#0F4C81]/10 px-5 py-2 text-sm font-semibold text-[#0F4C81]">
        Step 1 • Traveler Information
      </div>

      <h2 className="mt-5 text-4xl font-bold text-[#081C2D]">
        Personal Details
      </h2>

      <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600">
        Tell us about the primary traveler. We'll use these details for your
        booking confirmation and trip communication.
      </p>

    </div>

    {/* Form */}

    <div className="grid gap-8 md:grid-cols-2">

      {/* Full Name */}

      <div className="group">

        <label className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-600">

          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0F4C81]/10 text-lg">
            👤
          </span>

          Full Name

        </label>

        <input
          {...register("customerName")}
          placeholder="Enter your full name"
          className="
            w-full
            rounded-2xl
            border
            border-slate-200
            bg-white
            px-5
            py-4
            text-base
            outline-none
            transition-all
            duration-300
            placeholder:text-slate-400
            focus:border-[#0F4C81]
            focus:ring-4
            focus:ring-[#0F4C81]/10
            group-hover:border-[#3BAEA0]
          "
        />

        {errors.customerName && (
          <p className="mt-3 text-sm font-medium text-red-500">
            {errors.customerName.message}
          </p>
        )}

      </div>

      {/* Phone */}

      <div className="group">

        <label className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-600">

          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0F4C81]/10 text-lg">
            📞
          </span>

          Phone Number

        </label>

        <input
          {...register("phone")}
          placeholder="+91 XXXXX XXXXX"
          className="
            w-full
            rounded-2xl
            border
            border-slate-200
            bg-white
            px-5
            py-4
            text-base
            outline-none
            transition-all
            duration-300
            placeholder:text-slate-400
            focus:border-[#0F4C81]
            focus:ring-4
            focus:ring-[#0F4C81]/10
            group-hover:border-[#3BAEA0]
          "
        />

        {errors.phone && (
          <p className="mt-3 text-sm font-medium text-red-500">
            {errors.phone.message}
          </p>
        )}

      </div>

      {/* Email */}

      <div className="group md:col-span-2">

        <label className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-600">

          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0F4C81]/10 text-lg">
            ✉️
          </span>

          Email Address

        </label>

        <input
          type="email"
          {...register("email")}
          placeholder="you@example.com"
          className="
            w-full
            rounded-2xl
            border
            border-slate-200
            bg-white
            px-5
            py-4
            text-base
            outline-none
            transition-all
            duration-300
            placeholder:text-slate-400
            focus:border-[#0F4C81]
            focus:ring-4
            focus:ring-[#0F4C81]/10
            group-hover:border-[#3BAEA0]
          "
        />

        {errors.email && (
          <p className="mt-3 text-sm font-medium text-red-500">
            {errors.email.message}
          </p>
        )}

      </div>

    </div>

    {/* Bottom Info Card */}

    <div className="rounded-3xl border border-[#3BAEA0]/20 bg-gradient-to-r from-[#F8FCFF] to-[#F3FAF8] p-6">

      <div className="flex items-start gap-4">

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#3BAEA0]/15 text-xl">
          🔒
        </div>

        <div>

          <h4 className="text-lg font-semibold text-[#081C2D]">
            Your information is secure
          </h4>

          <p className="mt-2 leading-7 text-slate-600">
            We only use your details for booking confirmation, travel updates,
            and important trip communication. Your information is protected and
            never shared with third parties.
          </p>

        </div>

      </div>

    </div>

  </div>
);
}