"use client";

import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import type { BookingFormData } from "./types";

interface Package {
  _id: string;
  name: string;
}

export default function StepThree() {


 function Info({
  label,
  value,
}: {
  label: string;
  value?: string | number;
}) {
  return (
    <div
      className="
        min-w-0
        w-full
        rounded-2xl
        border
        border-slate-200
        bg-slate-50
        p-4
        
        sm:p-5
      "
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
        {label}
      </p>

      <p
        className="
          mt-2
          break-words
          overflow-hidden
          text-ellipsis
          text-base
          sm:text-lg
          font-semibold
          text-[#081C2D]
        "
      >
        {value || "-"}
      </p>
    </div>
  );
}

function Row({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-white/80">
        {title}
      </span>

      <span className="font-semibold text-white">
        {value}
      </span>
    </div>
  );
}
  const { watch } =
    useFormContext<BookingFormData>();

  const values = watch();

  const [packages, setPackages] = useState<
    Package[]
  >([]);

  useEffect(() => {
    async function loadPackages() {
      try {
        const res = await fetch("/api/packages");
        const data = await res.json();

        setPackages(data.packages);
      } catch (err) {
        console.error(err);
      }
    }

    loadPackages();
  }, []);

  const selectedPackage = packages.find(
    (p) => p._id === values.package
  );


  useEffect(() => {
  console.log("STEP THREE MOUNTED");
}, []);

  return (
    <div className="space-y-8 lg:space-y-12">

  {/* Header */}

  <div className="text-center">

    <div className="flex w-fit max-w-full items-center rounded-full bg-[#0F4C81]/10 px-5 py-2 text-sm font-semibold text-[#0F4C81]">
      Step 3 • Review & Confirm
    </div>

<h2 className="mt-5 break-words text-3xl font-bold leading-tight sm:text-4xl text-[#081C2D]">      Review Your Booking
    </h2>

    <p className="mx-auto mt-4 max-w-3xl text-base sm:text-lg leading-7 sm:leading-8 text-slate-600">
      Take one final look at your travel information before confirming your
      booking. Everything below will be used to process your reservation.
    </p>

  </div>

  {/* Traveller Information */}

  <div className="rounded-3xl border border-slate-200 bg-whitep-5 sm:p-6 lg:p-8 shadow-sm">

   <div className="mb-6 flex items-start gap-3 sm:items-center sm:gap-4 p-8">

      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0F4C81]/10 text-2xl">
        👤
      </div>

      <div>

        <h3 className="text-2xl font-bold text-[#081C2D]">
          Traveller Information
        </h3>

        <p className="mt-1 text-slate-600">
          Primary traveller details.
        </p>

      </div>

    </div>

   <div className="p-8 grid grid-cols-1 gap-5 xl:grid-cols-2">

      <Info
        label="Full Name"
        value={values.customerName}
      />

      <Info
        label="Phone"
        value={values.phone}
      />

      <Info
        label="Email"
        value={values.email}
      />

    </div>

  </div>

  {/* Trip Details */}

  <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

    <div className="mb-8 flex items-center gap-4">

      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0F4C81]/10 text-2xl">
        🏔️
      </div>

      <div>

        <h3 className="text-2xl font-bold text-[#081C2D]">
          Trip Details
        </h3>

        <p className="mt-1 text-slate-600">
          Review your selected package and travel plan.
        </p>

      </div>

    </div>

    <div className="grid gap-6 md:grid-cols-2">

            <Info
        label="Package"
        value={selectedPackage?.name ?? "-"}
      />

      <Info
        label="Travel Date"
        value={values.travelDate}
      />

      <Info
        label="Adults"
        value={String(values.adults)}
      />

      <Info
        label="Children"
        value={String(values.childrenCount)}
      />

      <Info
        label="Pickup Location"
        value={values.pickupLocation}
      />

    </div>

  </div>

  {/* Children Ages */}

  {(values.childrenCount ?? 0) > 0 && (

    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

      <div className="mb-8 flex items-center gap-4">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0F4C81]/10 text-2xl">
          👶
        </div>

        <div>

          <h3 className="text-2xl font-bold text-[#081C2D]">
            Children Information
          </h3>

          <p className="mt-1 text-slate-600">
            Ages used for automatic package pricing.
          </p>

        </div>

      </div>

      <div className="flex flex-wrap gap-4">

        {values.childrenAges?.map((age, index) => (

          <div
            key={index}
            className="
              rounded-2xl
              border
              border-slate-200
              bg-gradient-to-br
              from-[#F8FCFF]
              to-white
              px-6
              py-5
              shadow-sm
            "
          >

            <p className="text-sm uppercase tracking-wider text-slate-500">
              Child {index + 1}
            </p>

            <p className="mt-2 text-2xl font-bold text-[#081C2D]">
              {age} Years
            </p>

          </div>

        ))}

      </div>

    </div>

  )}

    {/* Special Request */}

  {values.specialRequest && (

    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

      <div className="mb-8 flex items-center gap-4">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0F4C81]/10 text-2xl">
          ✍️
        </div>

        <div>

          <h3 className="text-2xl font-bold text-[#081C2D]">
            Special Request
          </h3>

          <p className="mt-1 text-slate-600">
            Additional preferences shared by the traveller.
          </p>

        </div>

      </div>

      <div className="rounded-2xl bg-slate-50 p-6 leading-8 text-slate-700">

        {values.specialRequest}

      </div>

    </div>

  )}

  {/* Booking Summary */}

  <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-[#0F4C81] via-[#17669B] to-[#3BAEA0] p-8 text-white shadow-2xl">

    <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

      <div>

        <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
          Booking Summary
        </div>

        <h3 className="mt-5 text-4xl font-bold">
          Ready to Confirm
        </h3>

        <p className="mt-3 max-w-xl leading-8 text-white/80">
          Everything looks good. Review your booking status and estimated
          amount before submitting your reservation request.
        </p>

      </div>

      <div className="rounded-3xl border border-white/15 bg-white/10 p-8 backdrop-blur-xl">

        <div className="space-y-5">

          <Row
            title="Booking Status"
            value="Pending"
          />

          <Row
            title="Payment Status"
            value="Pending"
          />

          <div className="border-t border-white/20 pt-5">

           <div className="border-t border-white/20 pt-5">

  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

    <span className="text-lg text-white/80">
      Estimated Total
    </span>

    <span className="break-all text-3xl font-bold leading-none sm:text-4xl">
      ₹{values.totalPrice.toLocaleString("en-IN")}
    </span>

  </div>

</div>

          </div>

        </div>

      </div>

    </div>

  </div>
    {/* Trust Section */}

  <div className="grid gap-6 md:grid-cols-3">

    <div className="rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-sm">

      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 text-2xl text-white">
        🔒
      </div>

      <h3 className="mt-5 text-xl font-bold text-[#081C2D]">
        Secure Booking
      </h3>

      <p className="mt-3 leading-7 text-slate-600">
        Your personal information and booking details are protected using
        secure systems.
      </p>

    </div>

    <div className="rounded-3xl border border-sky-200 bg-gradient-to-br from-sky-50 to-white p-6 shadow-sm">

      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-500 text-2xl text-white">
        ⚡
      </div>

      <h3 className="mt-5 text-xl font-bold text-[#081C2D]">
        Instant Confirmation
      </h3>

      <p className="mt-3 leading-7 text-slate-600">
        Our travel team reviews your request quickly and confirms your booking
        as soon as availability is verified.
      </p>

    </div>

    <div className="rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-6 shadow-sm">

      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500 text-2xl text-white">
        💬
      </div>

      <h3 className="mt-5 text-xl font-bold text-[#081C2D]">
        24×7 Travel Support
      </h3>

      <p className="mt-3 leading-7 text-slate-600">
        Dedicated travel experts are available whenever you need assistance
        before or during your journey.
      </p>

    </div>

  </div>

</div>

  );
}