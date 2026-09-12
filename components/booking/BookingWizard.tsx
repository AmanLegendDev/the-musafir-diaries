"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  FormProvider,
  useForm,
} from "react-hook-form";
import { toast } from "sonner";

import { bookingSchema } from "@/lib/validations/booking.schema";

import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import type { BookingFormData } from "./types";

interface BookingWizardProps {
  onStepChange?: (step: number) => void;
}

export default function BookingWizard({
  onStepChange,
}: BookingWizardProps) {
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const methods = useForm<BookingFormData>({
  resolver: zodResolver(bookingSchema) as any,
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
    },
  });

  const {
    trigger,
    handleSubmit,
  } = methods;

  function changeStep(step: number) {
    setCurrentStep(step);
    onStepChange?.(step);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function handleNext() {
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
        "childrenAges",
        "pickupLocation",
      ];
    }

    const valid = await trigger(fields);

    if (!valid) {
      toast.error(
        "Please complete the required details before continuing.",
      );

      return;
    }

    if (currentStep < 3) {
      changeStep(currentStep + 1);
    }
  }

  function handleBack() {
    if (currentStep > 1 && !submitting) {
      changeStep(currentStep - 1);
    }
  }

  async function handleBookingSubmit(
    data: BookingFormData,
  ) {
    if (submitting) return;

    try {
      setSubmitting(true);

      const response = await fetch(
        "/api/bookings",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(data),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        toast.error(
          result.message ||
            "We couldn't submit your booking request.",
        );

        return;
      }

      toast.success(
        "Your booking request has been received.",
      );

      router.push(
        `/booking/success?id=${encodeURIComponent(
          result.bookingId,
        )}`,
      );
    } catch (error) {
      console.error(
        "BOOKING_SUBMIT_ERROR:",
        error,
      );

      toast.error(
        "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(
          handleBookingSubmit,
        )}
      >
        <div className="overflow-hidden rounded-[28px] border border-[#071A33]/10 bg-white shadow-[0_24px_70px_rgba(7,26,51,0.08)]">
          {/* Step Header */}

          <div className="border-b border-[#071A33]/10 px-6 py-6 sm:px-8 lg:px-10">
            <div className="flex items-center justify-between gap-5">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#087E8B]">
                  Step {currentStep} of 3
                </p>

                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#071A33] sm:text-3xl">
                  {currentStep === 1 &&
                    "Tell us about yourself"}

                  {currentStep === 2 &&
                    "Shape your journey"}

                  {currentStep === 3 &&
                    "Review your journey"}
                </h2>
              </div>

              <div className="hidden max-w-[230px] text-right sm:block">
                <p className="text-xs text-[#071A33]/40">
                  The Musafir Diaries
                </p>

                <p className="mt-1 text-xs leading-5 text-[#071A33]/60">
                  Himalayan travel,
                  thoughtfully planned.
                </p>
              </div>
            </div>
          </div>

          {/* Step Content */}

          <div className="p-6 sm:p-8 lg:p-10">
            <AnimatePresence
              mode="wait"
              initial={false}
            >
              <motion.div
                key={currentStep}
                initial={{
                  opacity: 0,
                  x: 16,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  x: -16,
                }}
                transition={{
                  duration: 0.25,
                  ease: "easeOut",
                }}
              >
                {currentStep === 1 && (
                  <StepOne />
                )}

                {currentStep === 2 && (
                  <StepTwo />
                )}

                {currentStep === 3 && (
                  <StepThree />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}

            <div className="mt-10 border-t border-[#071A33]/10 pt-6">
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={
                    currentStep === 1 ||
                    submitting
                  }
                  className="
                    inline-flex min-h-12 items-center justify-center
                    rounded-full border border-[#071A33]/15
                    bg-white px-6
                    text-sm font-semibold text-[#071A33]
                    transition-all duration-200
                    hover:border-[#087E8B]
                    hover:text-[#087E8B]
                    disabled:pointer-events-none
                    disabled:opacity-30
                  "
                >
                  Back
                </button>

                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={submitting}
                    className="
                      inline-flex min-h-12 items-center justify-center
                      rounded-full bg-[#071A33] px-7
                      text-sm font-semibold text-white
                      shadow-lg shadow-[#071A33]/15
                      transition-all duration-200
                      hover:-translate-y-0.5
                      hover:bg-[#0D2747]
                      disabled:pointer-events-none
                      disabled:opacity-50
                    "
                  >
                    Continue

                    <span className="ml-3 text-[#7FD8DE]">
                      →
                    </span>
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={submitting}
                    className="
                      inline-flex min-h-12 items-center justify-center
                      rounded-full bg-[#087E8B] px-7
                      text-sm font-semibold text-white
                      shadow-lg shadow-[#087E8B]/20
                      transition-all duration-200
                      hover:-translate-y-0.5
                      hover:bg-[#076E79]
                      disabled:pointer-events-none
                      disabled:opacity-60
                    "
                  >
                    {submitting
                      ? "Sending request..."
                      : "Submit booking request"}

                    {!submitting && (
                      <span className="ml-3">
                        →
                      </span>
                    )}
                  </button>
                )}
              </div>

              <p className="mt-4 text-center text-xs leading-5 text-[#071A33]/40 sm:text-right">
                Your request is reviewed before
                final confirmation.
              </p>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}