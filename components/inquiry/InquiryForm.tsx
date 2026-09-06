"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarDays, Loader2, Send } from "lucide-react";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { inquirySchema } from "@/lib/validations/inquiry";

interface DestinationOption {
  _id: string;
  name: string;
}

export default function InquiryForm() {
  const router = useRouter();

  const [destinations, setDestinations] = useState<
    DestinationOption[]
  >([]);

  const [loadingDestinations, setLoadingDestinations] =
    useState(true);

 const {
  register,
  handleSubmit,
  formState: { errors, isSubmitting },
} = useForm<
  z.input<typeof inquirySchema>,
  any,
  z.output<typeof inquirySchema>
>({
  resolver: zodResolver(inquirySchema),
  defaultValues: {
    fullName: "",
    phone: "",
    email: "",
    destination: "",
    travelDate: "",
    travelers: 2,
    budget: "",
    pickupLocation: "",
    message: "",
  },
});

  useEffect(() => {
    async function fetchDestinations() {
      try {
        const res = await fetch("/api/destinations");

        const data = await res.json();

        if (data.success) {
          setDestinations(data.destinations);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingDestinations(false);
      }
    }

    fetchDestinations();
  }, []);

 async function onSubmit(values: z.output<typeof inquirySchema>)  {
    try {
      const response = await fetch(
        "/api/inquiries",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(values),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);

        return;
      }

      router.push(
        `/inquiry/success?id=${data.inquiryId}`
      );
    } catch (error) {
      console.error(error);

      alert(
        "Something went wrong. Please try again."
      );
    }
  }

  return (
    <section
      id="inquiry-form"
      className="py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          className="
            overflow-hidden
            rounded-[32px]
            border
            border-slate-200
            bg-white
            shadow-2xl
          "
        >
          <div
            className="
              grid

              lg:grid-cols-5
            "
          >
            {/* LEFT */}

            <div
              className="
                bg-gradient-to-br
                from-[#081C2D]
                via-[#0F4C81]
                to-[#3BAEA0]

                p-10

                text-white

                lg:col-span-2
              "
            >
              <span
                className="
                  rounded-full
                  bg-white/15

                  px-4

                  py-2

                  text-sm
                "
              >
                Start Planning
              </span>

              <h2
                className="
                  mt-6

                  text-4xl

                  font-bold

                  leading-tight
                "
              >
                Tell Us About
                <br />
                Your Dream Trip
              </h2>

              <p
                className="
                  mt-6

                  leading-8

                  text-white/80
                "
              >
                Fill out the inquiry form and our
                travel specialists will contact
                you with a personalized itinerary
                designed around your preferences.
              </p>

              <div className="mt-12 space-y-6">
                {[
                  "100% Personalized Planning",
                  "Best Price Guarantee",
                  "Trusted Local Experts",
                  "Response Within 30 Minutes",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3"
                  >
                    <div
                      className="
                        h-2
                        w-2
                        rounded-full
                        bg-white
                      "
                    />

                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT */}

            <div
              className="
                p-10

                lg:col-span-3
              "
            >
              <form
                onSubmit={handleSubmit(
                  onSubmit
                )}
                className="space-y-6"
              >
                <div className="grid gap-6 md:grid-cols-2">

                  {/* Full Name */}

                  <div>
                    <label className="mb-2 block font-medium text-slate-700">
                      Full Name
                    </label>

                    <input
                      {...register("fullName")}
                      placeholder="John Doe"
                      className="
                        w-full
                        rounded-xl
                        border
                        border-slate-300
                        px-4
                        py-3
                        outline-none
                        transition

                        focus:border-[#3BAEA0]
                      "
                    />

                    {errors.fullName && (
                      <p className="mt-2 text-sm text-red-500">
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>

                  {/* Phone */}

                  <div>
                    <label className="mb-2 block font-medium text-slate-700">
                      Phone Number
                    </label>

                    <input
                      {...register("phone")}
                      placeholder="+91 XXXXX XXXXX"
                      className="
                        w-full
                        rounded-xl
                        border
                        border-slate-300
                        px-4
                        py-3
                        outline-none
                        transition

                        focus:border-[#3BAEA0]
                      "
                    />

                    {errors.phone && (
                      <p className="mt-2 text-sm text-red-500">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}

                  <div>
                    <label className="mb-2 block font-medium text-slate-700">
                      Email Address
                    </label>

                    <input
                      type="email"
                      {...register("email")}
                      placeholder="john@example.com"
                      className="
                        w-full
                        rounded-xl
                        border
                        border-slate-300
                        px-4
                        py-3
                        outline-none
                        transition

                        focus:border-[#3BAEA0]
                      "
                    />

                    {errors.email && (
                      <p className="mt-2 text-sm text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Destination */}

                  <div>
                    <label className="mb-2 block font-medium text-slate-700">
                      Destination
                    </label>

                    <select
                      {...register("destination")}
                      disabled={
                        loadingDestinations
                      }
                      className="
                        w-full
                        rounded-xl
                        border
                        border-slate-300
                        px-4
                        py-3
                        outline-none

                        focus:border-[#3BAEA0]
                      "
                    >
                      <option value="">
                        Select Destination
                      </option>

                      {destinations.map(
                        (destination) => (
                          <option
                            key={
                              destination._id
                            }
                            value={
                              destination._id
                            }
                          >
                            {destination.name}
                          </option>
                        )
                      )}
                    </select>

                    {errors.destination && (
                      <p className="mt-2 text-sm text-red-500">
                        {errors.destination.message}
                      </p>
                    )}
                  </div>
                                    {/* Travel Date */}

                  <div>
                    <label className="mb-2 block font-medium text-slate-700">
                      Travel Date
                    </label>

                    <div className="relative">
                      <CalendarDays
                        size={18}
                        className="
                          pointer-events-none
                          absolute
                          left-4
                          top-1/2
                          -translate-y-1/2
                          text-slate-400
                        "
                      />

                      <input
                        type="date"
                        {...register("travelDate")}
                        className="
                          w-full
                          rounded-xl
                          border
                          border-slate-300
                          py-3
                          pl-12
                          pr-4
                          outline-none
                          transition
                          focus:border-[#3BAEA0]
                        "
                      />
                    </div>

                    {errors.travelDate && (
                      <p className="mt-2 text-sm text-red-500">
                        {errors.travelDate.message}
                      </p>
                    )}
                  </div>

                  {/* Travelers */}

                  <div>
                    <label className="mb-2 block font-medium text-slate-700">
                      Travelers
                    </label>

                    <input
                      type="number"
                      min={1}
                      {...register("travelers", {
                        valueAsNumber: true,
                      })}
                      className="
                        w-full
                        rounded-xl
                        border
                        border-slate-300
                        px-4
                        py-3
                        outline-none
                        transition
                        focus:border-[#3BAEA0]
                      "
                    />

                    {errors.travelers && (
                      <p className="mt-2 text-sm text-red-500">
                        {errors.travelers.message}
                      </p>
                    )}
                  </div>

                  {/* Budget */}

                  <div>
                    <label className="mb-2 block font-medium text-slate-700">
                      Budget (Optional)
                    </label>

                    <input
                      {...register("budget")}
                      placeholder="₹50,000"
                      className="
                        w-full
                        rounded-xl
                        border
                        border-slate-300
                        px-4
                        py-3
                        outline-none
                        transition
                        focus:border-[#3BAEA0]
                      "
                    />
                  </div>

                  {/* Pickup */}

                  <div>
                    <label className="mb-2 block font-medium text-slate-700">
                      Pickup Location
                    </label>

                    <input
                      {...register("pickupLocation")}
                      placeholder="Delhi, Chandigarh..."
                      className="
                        w-full
                        rounded-xl
                        border
                        border-slate-300
                        px-4
                        py-3
                        outline-none
                        transition
                        focus:border-[#3BAEA0]
                      "
                    />
                  </div>
                </div>

                {/* Message */}

                <div>
                  <label className="mb-2 block font-medium text-slate-700">
                    Tell Us About Your Trip
                  </label>

                  <textarea
                    rows={6}
                    {...register("message")}
                    placeholder="Share your travel plans, hotel preferences, sightseeing interests, or any special requests..."
                    className="
                      w-full
                      rounded-xl
                      border
                      border-slate-300
                      px-4
                      py-3
                      outline-none
                      transition
                      resize-none
                      focus:border-[#3BAEA0]
                    "
                  />

                  {errors.message && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Privacy */}

                <div
                  className="
                    rounded-2xl
                    border
                    border-[#3BAEA0]/20
                    bg-[#3BAEA0]/5
                    p-5
                  "
                >
                  <p className="text-sm leading-7 text-slate-600">
                    🔒 Your information is secure and will only be
                    used by our travel experts to prepare your
                    personalized itinerary. We never share your
                    details with third parties.
                  </p>
                </div>

                {/* Button */}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-3
                    rounded-xl
                    bg-gradient-to-r
                    from-[#0F4C81]
                    to-[#3BAEA0]
                    px-6
                    py-4
                    font-semibold
                    text-white
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-xl
                    disabled:cursor-not-allowed
                    disabled:opacity-70
                  "
                >
                  {isSubmitting ? (
                    <>
                      <Loader2
                        size={20}
                        className="animate-spin"
                      />

                      Submitting Inquiry...
                    </>
                  ) : (
                    <>
                      <Send size={20} />

                      Get My Personalized Travel Plan
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}