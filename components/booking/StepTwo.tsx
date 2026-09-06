"use client";

import { useFormContext } from "react-hook-form";
import type { BookingFormData } from "./types";
import { useState ,useEffect } from "react";

export default function StepTwo() {



interface Package {
  _id: string;
  name: string;

  originalPrice: number;
  discountedPrice: number;

  childPolicy: {
    complimentaryBelow: number;
    halfPriceBelow: number;
    halfPricePercentage: number;
  };
}

const [packages, setPackages] = useState<Package[]>([]);

const {
  register,
  watch,
  setValue,
  formState: { errors },
} = useFormContext<BookingFormData>();

const childrenCount = watch("childrenCount");
const childrenAges = watch("childrenAges");


const selectedPackageId = watch("package");
const adults = watch("adults");


const selectedPackage = packages.find(
  (p) => p._id === selectedPackageId
);




let adultTotal = 0;
let childTotal = 0;

if (selectedPackage) {
  const adultPrice = selectedPackage.discountedPrice;

  adultTotal = (adults || 0) * adultPrice;

  (childrenAges || []).forEach((age) => {
    const policy = selectedPackage.childPolicy;

    if (age < policy.complimentaryBelow) {
      return;
    }

    if (age < policy.halfPriceBelow) {
      childTotal +=
        adultPrice *
        (policy.halfPricePercentage / 100);
    } else {
      childTotal += adultPrice;
    }
  });
}

const total = adultTotal + childTotal;


useEffect(() => {
  setValue("totalPrice", total, {
    shouldDirty: true,
  });
}, [total, setValue]);


useEffect(() => {
  if (!childrenCount) {
    setValue("childrenAges", []);
    return;
  }

  const updated = (childrenAges || []).slice(0, childrenCount);

  while (updated.length < childrenCount) {
    updated.push(0);
  }

  setValue("childrenAges", updated);
}, [childrenCount, childrenAges, setValue]);

useEffect(() => {
  const fetchPackages = async () => {
    try {
      const res = await fetch("/api/packages");

      const data = await res.json();

      setPackages(data.packages);
    } catch (err) {
      console.error(err);
    }
  };

  fetchPackages();
}, []);

  return (

    <div className="space-y-12">

  {/* Header */}

  <div className="text-center">

    <div className="inline-flex items-center rounded-full bg-[#0F4C81]/10 px-5 py-2 text-sm font-semibold text-[#0F4C81]">
      Step 2 • Trip Information
    </div>

    <h2 className="mt-5 text-4xl font-bold text-[#081C2D]">
      Plan Your Journey
    </h2>

    <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600">
      Choose your destination package and travel details to customize your
      Himalayan adventure.
    </p>

  </div>

  {/* Package Selection */}

  <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 lg:p-8 shadow-sm">

    <div className="mb-8 flex items-center gap-4">

      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0F4C81]/10 text-2xl">
        🏔️
      </div>

      <div>

        <h3 className="text-2xl font-bold text-[#081C2D]">
          Select Your Package
        </h3>

        <p className="mt-1 text-slate-600">
          Choose the experience you'd like to book.
        </p>

      </div>

    </div>

    <div>

      <label className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-600">

        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0F4C81]/10">
          📦
        </span>

        Travel Package

      </label>

      <select
        {...register("package")}
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
          focus:border-[#0F4C81]
          focus:ring-4
          focus:ring-[#0F4C81]/10
        "
      >
        <option value="">
          Select Package
        </option>

        {packages.map((pkg) => (
          <option
            key={pkg._id}
            value={pkg._id}
          >
            {pkg.name}
          </option>
        ))}

      </select>

      {errors.package && (
        <p className="mt-3 text-sm font-medium text-red-500">
          {errors.package.message}
        </p>
      )}

    </div>

  </div>

  {/* Travel Details */}

  <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Travel Date */}

    <div className="group">

      <label className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-600">

        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0F4C81]/10">
          📅
        </span>

        Travel Date

      </label>

      <input
        type="date"
        {...register("travelDate")}
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
          focus:border-[#0F4C81]
          focus:ring-4
          focus:ring-[#0F4C81]/10
          group-hover:border-[#3BAEA0]
        "
      />

      {errors.travelDate && (
        <p className="mt-3 text-sm font-medium text-red-500">
          {errors.travelDate.message}
        </p>
      )}

    </div>

    {/* Adults */}

    <div className="group">

      <label className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-600">

        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0F4C81]/10">
          🧑
        </span>

        Adults

      </label>

      <input
        type="number"
        min={1}
        {...register("adults", {
          valueAsNumber: true,
        })}
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
          focus:border-[#0F4C81]
          focus:ring-4
          focus:ring-[#0F4C81]/10
          group-hover:border-[#3BAEA0]
        "
      />

      {errors.adults && (
        <p className="mt-3 text-sm font-medium text-red-500">
          {errors.adults.message}
        </p>
      )}

    </div>

    {/* Children */}

    <div className="group">

      <label className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-600">

        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0F4C81]/10">
          👶
        </span>

        Children

      </label>

      <input
        type="number"
        min={0}
        {...register("childrenCount", {
          valueAsNumber: true,
        })}
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
          focus:border-[#0F4C81]
          focus:ring-4
          focus:ring-[#0F4C81]/10
          group-hover:border-[#3BAEA0]
        "
      />

      {errors.childrenCount && (
        <p className="mt-3 text-sm font-medium text-red-500">
          {errors.childrenCount.message}
        </p>
      )}

    </div>
        {/* Children Ages */}

    <div className="space-y-5 md:col-span-2">

      {(childrenCount || 0) > 0 && (

        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">

          <div className="mb-6 flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0F4C81]/10 text-xl">
              👦
            </div>

            <div>

              <h3 className="text-xl font-bold text-[#081C2D]">
                Children's Ages
              </h3>

              <p className="text-sm text-slate-600">
                Enter each child's age to calculate the correct package price.
              </p>

            </div>

          </div>

          <div className="grid gap-5 md:grid-cols-2">

            {Array.from({ length: childrenCount || 0 }).map((_, index) => (

              <div key={index}>

                <label className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-600">

                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#3BAEA0]/15">
                    👶
                  </span>

                  Child {index + 1} Age

                </label>

                <input
                  type="number"
                  min={0}
                  max={17}
                  value={childrenAges?.[index] ?? ""}
                  onChange={(e) => {
                    const updated = [...(childrenAges || [])];

                    updated[index] = Number(e.target.value);

                    setValue("childrenAges", updated, {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                  }}
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    px-5
                    py-4
                    outline-none
                    transition-all
                    duration-300
                    focus:border-[#0F4C81]
                    focus:ring-4
                    focus:ring-[#0F4C81]/10
                  "
                />

              </div>

            ))}

          </div>

        </div>

      )}

    </div>

    {/* Pickup Location */}

    <div className="group md:col-span-2">

      <label className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-600">

        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0F4C81]/10">
          📍
        </span>

        Pickup Location

      </label>

      <input
        {...register("pickupLocation")}
        placeholder="Hotel, Airport, Bus Stand or preferred pickup point"
        className="
          w-full
          rounded-2xl
          border
          border-slate-200
          bg-white
          px-5
          py-4
          outline-none
          transition-all
          duration-300
          focus:border-[#0F4C81]
          focus:ring-4
          focus:ring-[#0F4C81]/10
          group-hover:border-[#3BAEA0]
        "
      />

      {errors.pickupLocation && (
        <p className="mt-3 text-sm font-medium text-red-500">
          {errors.pickupLocation.message}
        </p>
      )}

    </div>
        {/* Special Request */}

    <div className="md:col-span-2">

      <label className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-600">

        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0F4C81]/10">
          ✍️
        </span>

        Special Request

      </label>

      <textarea
        rows={6}
        {...register("specialRequest")}
        placeholder="Tell us about dietary preferences, celebration plans, accessibility requirements, room preferences, or anything else you'd like us to know..."
        className="
          w-full
          rounded-2xl
          border
          border-slate-200
          bg-white
          px-5
          py-4
          leading-7
          outline-none
          transition-all
          duration-300
          placeholder:text-slate-400
          focus:border-[#0F4C81]
          focus:ring-4
          focus:ring-[#0F4C81]/10
        "
      />

    </div>

    {/* Helpful Information */}

    <div className="md:col-span-2">

      <div className="rounded-3xl border border-[#3BAEA0]/20 bg-gradient-to-r from-[#F8FCFF] to-[#F3FAF8] p-7">

        <div className="flex items-start gap-5">

          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#3BAEA0]/15 text-2xl">
            💡
          </div>

          <div>

            <h3 className="text-xl font-bold text-[#081C2D]">
              Good to Know
            </h3>

            <p className="mt-3 leading-8 text-slate-600">
              Child pricing is calculated automatically according to the package
              policy. Complimentary, discounted, or full-price rates are applied
              based on the ages you entered above.
            </p>

            <div className="mt-5 grid gap-3 md:grid-cols-2">

              <div className="rounded-2xl bg-white p-4">
                <p className="font-semibold text-[#081C2D]">
                  ✓ Flexible Planning
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Travel details can be reviewed before confirmation.
                </p>
              </div>

              <div className="rounded-2xl bg-white p-4">
                <p className="font-semibold text-[#081C2D]">
                  ✓ Transparent Pricing
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  No hidden charges. The estimate updates instantly.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

    {/* Price Summary */}

    <div className="md:col-span-2">

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

        <div className="mb-8 flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0F4C81]/10 text-2xl">
            💰
          </div>

          <div>

            <h3 className="text-2xl font-bold text-[#081C2D]">
              Price Summary
            </h3>

            <p className="mt-1 text-slate-600">
              Estimated cost based on your current selections.
            </p>

          </div>

        </div>
                <div className="space-y-5">

          <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-5 py-4">

            <div>
              <p className="font-semibold text-[#081C2D]">
                Adults
              </p>

              <p className="text-sm text-slate-500">
                {adults || 0} Traveller(s)
              </p>
            </div>

            <span className="text-lg font-bold text-[#081C2D]">
              ₹{adultTotal.toLocaleString("en-IN")}
            </span>

          </div>

          <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-5 py-4">

            <div>
              <p className="font-semibold text-[#081C2D]">
                Children
              </p>

              <p className="text-sm text-slate-500">
                {childrenCount || 0} Child(ren)
              </p>
            </div>

            <span className="text-lg font-bold text-[#081C2D]">
              ₹{childTotal.toLocaleString("en-IN")}
            </span>

          </div>

          <div className="mt-8 rounded-3xl bg-gradient-to-r from-[#0F4C81] via-[#17669B] to-[#3BAEA0] p-7 text-white shadow-xl">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm uppercase tracking-[0.25em] text-white/70">
                  Estimated Total
                </p>

                <h4 className="mt-2 text-3xl font-bold">
                  ₹{total.toLocaleString("en-IN")}
                </h4>

                <p className="mt-2 text-sm text-white/80">
                  Final price may vary based on taxes, availability and optional add-ons.
                </p>

              </div>

              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10 text-4xl backdrop-blur-sm">
                ✨
              </div>

            </div>

          </div>

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">

            <div className="flex items-start gap-4">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-xl">
                🔒
              </div>

              <div>

                <h4 className="font-semibold text-emerald-800">
                  Transparent Pricing
                </h4>

                <p className="mt-2 text-sm leading-7 text-emerald-700">
                  Your package estimate updates automatically as you change
                  travellers or children's ages. You'll review everything once
                  more before confirming your booking.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  </div>
  </div>

  );
}