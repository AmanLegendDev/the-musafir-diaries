"use client";



import { zodResolver } from "@hookform/resolvers/zod";

import { bookingSchema } from "@/lib/validations/booking";


import { useState } from "react";

import {
  FormProvider,
  useForm,
} from "react-hook-form";

import { motion, AnimatePresence } from "framer-motion";

import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";

import type { BookingFormData } from "./types";


import { useRouter } from "next/navigation";
import { toast } from "sonner";








const steps = [
  "Personal",
  "Trip",
  "Review",
];

export default function BookingWizard() {
  const [currentStep, setCurrentStep] =
    useState(1);



    const router = useRouter();
 const methods = useForm<BookingFormData>({
  resolver: zodResolver(bookingSchema),

  mode: "onTouched",

  defaultValues: {
  package: "",
  customerName: "",
  phone: "",
  email: "",
  travelDate: "",
  adults: 2,

  childrenCount: 0,
  childrenAges: [],

  pickupLocation: "",
  specialRequest: "",
  totalPrice: 0,
}
});

const { trigger } = methods;




const onSubmit = async (
  data: BookingFormData
) => {
  try {
    const response = await fetch(
      "/api/bookings",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result =
      await response.json();

    if (!response.ok) {
      toast.error(
        result.message ||
          "Booking failed"
      );
      return;
    }

    toast.success(
      "Booking created successfully!"
    );

    router.push(
  `/booking/success?id=${result.bookingId}`
);
  } catch (error) {
    console.error(error);

    toast.error(
      "Something went wrong."
    );
  }
};


async function nextStep() {
  let fields: (keyof BookingFormData)[] = [];

  if (currentStep === 1) {
    fields = [
      "customerName",
      "phone",
      "email",
    ];
  }

  if (currentStep === 2) {
   fields = [
  "package",
  "travelDate",
  "adults",
  "childrenCount",
  "pickupLocation",
];
  }

  const isValid = await trigger(fields);

  if (!isValid) return;

  if (currentStep < 3) {
    setCurrentStep((prev) => prev + 1);
  }
}

  function previousStep() {
    if (currentStep > 1) {
      setCurrentStep(
        (prev) => prev - 1
      );
    }
  }

 return (
  <FormProvider {...methods}>
  <section className="relative overflow-hidden bg-[#F8FAFC] py-20 lg:py-24">
    {/* Background */}

    <div className="absolute inset-0 overflow-hidden pointer-events-none">

      <div className="absolute -top-40 -left-24 h-96 w-96 rounded-full bg-[#0F4C81]/5 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-[#3BAEA0]/10 blur-3xl" />

      <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-sky-100/30 blur-3xl" />

    </div>

    <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

      {/* Heading */}

      <div className="mx-auto mb-16 max-w-3xl text-center">

        <span className="inline-flex items-center rounded-full border border-[#3BAEA0]/20 bg-[#3BAEA0]/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#0F4C81]">

          Secure Booking Experience

        </span>

        <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">

          Complete Your Reservation

        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">

          You're only a few steps away from your Himalayan adventure.
          Complete your booking securely and our travel experts will
          confirm everything shortly.

        </p>

      </div>
            {/* Progress Stepper */}

      <div className="mb-20">

        <div className="mx-auto flex max-w-4xl items-center justify-between">

          {steps.map((step, index) => {

            const stepNumber = index + 1;

            const active = currentStep >= stepNumber;

            const completed = currentStep > stepNumber;

            return (

              <div
                key={step}
                className="flex flex-1 items-center"
              >

                <div className="flex flex-col items-center">

                  <motion.div
                    initial={false}
                    animate={{
                      scale: active ? 1 : 0.95,
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                    className={`
                      relative
                      flex
                      h-16
                      w-16
                      items-center
                      justify-center
                      rounded-full
                      border-2
                      text-lg
                      font-bold
                      transition-all
                      duration-500

                      ${
                        active
                          ? "border-[#0F4C81] bg-gradient-to-br from-[#0F4C81] to-[#3BAEA0] text-white shadow-xl shadow-[#0F4C81]/25"
                          : "border-slate-300 bg-white text-slate-400"
                      }
                    `}
                  >

                    {completed ? (
                      <span className="text-xl">✓</span>
                    ) : (
                      stepNumber
                    )}

                  </motion.div>

                  <span
                    className={`
                      mt-4
                      text-sm
                      font-semibold
                      transition-colors

                      ${
                        active
                          ? "text-[#0F4C81]"
                          : "text-slate-400"
                      }
                    `}
                  >
                    {step}
                  </span>

                </div>

                {stepNumber !== steps.length && (

                  <div className="mx-5 flex-1">

                    <div className="h-[5px] overflow-hidden rounded-full bg-slate-200">

                      <motion.div
                        initial={false}
                        animate={{
                          width: completed ? "100%" : "0%",
                        }}
                        transition={{
                          duration: 0.45,
                        }}
                        className="h-full rounded-full bg-gradient-to-r from-[#0F4C81] to-[#3BAEA0]"
                      />

                    </div>

                  </div>

                )}

              </div>

            );

          })}

        </div>

      </div>
            {/* Booking Card */}

      <div
        className="
          overflow-hidden
          rounded-[40px]
          border
          border-white/60
          bg-white/90
          shadow-[0_30px_80px_rgba(15,76,129,0.10)]
          backdrop-blur-xl
        "
      >
        {/* Top Strip */}

        <div className="border-b border-slate-100 bg-gradient-to-r from-[#0F4C81] via-[#17669B] to-[#3BAEA0] px-8 py-6 text-white">

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                Booking Wizard
              </p>

              <h3 className="mt-2 text-2xl font-bold">
                Complete Your Details
              </h3>

              <p className="mt-2 text-sm text-white/80">
                Fill in your information to reserve your Himalayan journey.
              </p>

            </div>

            <div className="rounded-2xl border border-white/15 bg-white/10 px-5 py-4 backdrop-blur-lg">

              <p className="text-xs uppercase tracking-[0.2em] text-white/70">
                Current Step
              </p>

              <div className="mt-2 flex items-center gap-2">

                <span className="text-3xl font-bold">
                  {currentStep}
                </span>

                <span className="text-white/70">
                  / {steps.length}
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* Form Area */}

<div className="w-full min-w-0 overflow-hidden p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
          <AnimatePresence
            mode="wait"
            initial={false}
          >

           <motion.div
  className="w-full min-w-0"
              key={currentStep}
              initial={{
                opacity: 0,
                y: 24,
                scale: 0.98,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -24,
                scale: 0.98,
              }}
              transition={{
                duration: 0.35,
                ease: "easeOut",
              }}
            >
                            {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <StepOne />
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <StepTwo />
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <StepThree />
                </motion.div>
              )}

            </motion.div>

          </AnimatePresence>

          {/* Navigation */}

          <div className="mt-14 border-t border-slate-100 pt-8">

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                            {/* Previous Button */}

              <button
                type="button"
                onClick={previousStep}
                disabled={currentStep === 1}
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  border
                  border-slate-300
                  bg-white
                  px-7
                  py-3.5
                  font-semibold
                  text-slate-700
                  transition-all
                  duration-300
                  hover:border-[#0F4C81]
                  hover:text-[#0F4C81]
                  hover:shadow-lg
                  disabled:pointer-events-none
                  disabled:opacity-40
                "
              >
                <span className="text-lg">←</span>

                Previous Step
              </button>

              {/* Right Side */}

              <div className="flex items-center gap-4">

                <div className="hidden text-right md:block">

                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Step
                  </p>

                  <p className="mt-1 font-semibold text-slate-800">
                    {currentStep} of {steps.length}
                  </p>

                </div>

                {currentStep < steps.length ? (

                  <button
                    type="button"
                    onClick={nextStep}
                    className="
                      inline-flex
                      items-center
                      gap-3
                      rounded-2xl
                      bg-gradient-to-r
                      from-[#0F4C81]
                      to-[#3BAEA0]
                      px-8
                      py-3.5
                      font-semibold
                      text-white
                      shadow-lg
                      shadow-[#0F4C81]/20
                      transition-all
                      duration-300
                      hover:-translate-y-0.5
                      hover:shadow-xl
                      active:scale-[0.98]
                    "
                  >
                    Continue

                    <span className="text-lg">
                      →
                    </span>

                  </button>

                ) : (
                                    <button
                    type="button"
                    onClick={methods.handleSubmit(onSubmit)}
                    className="
                      inline-flex
                      items-center
                      gap-3
                      rounded-2xl
                      bg-gradient-to-r
                      from-emerald-500
                      via-emerald-600
                      to-[#3BAEA0]
                      px-8
                      py-3.5
                      font-semibold
                      text-white
                      shadow-lg
                      shadow-emerald-500/20
                      transition-all
                      duration-300
                      hover:-translate-y-0.5
                      hover:shadow-xl
                      active:scale-[0.98]
                    "
                  >
                    <span>✓</span>

                    Confirm Booking

                  </button>

                )}

              </div>

            </div>

          </div>
                  </div>

      </div>

    </div>

  </section>

</FormProvider>
);
}