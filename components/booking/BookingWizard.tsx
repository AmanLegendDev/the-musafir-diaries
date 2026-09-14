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

  /* -------------------------------------------------------------------------- */
  /* STEP CHANGE                                                                */
  /* -------------------------------------------------------------------------- */

  function changeStep(step: number) {
    // Never allow invalid steps.
    if (step < 1 || step > 3) {
      return;
    }

    setCurrentStep(step);

    onStepChange?.(step);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  /* -------------------------------------------------------------------------- */
  /* NEXT STEP                                                                  */
  /* -------------------------------------------------------------------------- */

  async function handleNext() {
    /*
     * This function is ONLY for moving between steps.
     *
     * It NEVER submits the booking.
     */

    if (submitting) {
      return;
    }

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

    /*
     * HARD RULE:
     *
     * Step 1 → Step 2
     * Step 2 → Step 3
     *
     * No API call happens here.
     */
    if (currentStep === 1) {
      changeStep(2);
      return;
    }

    if (currentStep === 2) {
      changeStep(3);
      return;
    }
  }

  /* -------------------------------------------------------------------------- */
  /* BACK                                                                       */
  /* -------------------------------------------------------------------------- */

  function handleBack() {
    if (submitting) {
      return;
    }

    if (currentStep <= 1) {
      return;
    }

    changeStep(currentStep - 1);
  }

  /* -------------------------------------------------------------------------- */
  /* SUBMIT                                                                     */
  /* -------------------------------------------------------------------------- */

  async function handleBookingSubmit(
    data: BookingFormData,
  ) {
    /*
     * 🔒 ABSOLUTE SUBMIT GATE
     *
     * Even if some child component accidentally triggers
     * a form submit, booking submission is impossible unless
     * the user is currently on Step 3.
     */
    if (currentStep !== 3) {
      console.warn(
        "BOOKING SUBMIT BLOCKED: review step has not been reached.",
      );

      return;
    }

    if (submitting) {
      return;
    }

    /*
     * Frontend form uses:
     *   package
     *   childrenCount
     *
     * API expects:
     *   packageId
     *   children
     */

    const packageId = String(
      data.package ?? "",
    ).trim();

    const children = Number(
      data.childrenCount ?? 0,
    );

    /*
     * Safety check.
     *
     * If package somehow disappears before submission,
     * send the user back to Step 2 instead of creating
     * a broken booking.
     */
    if (!packageId) {
      toast.error(
        "Please select a package before submitting.",
      );

      changeStep(2);

      return;
    }

    const payload = {
      packageId,

      customerName: data.customerName,
      phone: data.phone,
      email: data.email,

      travelDate: data.travelDate,

      adults: Number(data.adults),

      children,

      childrenAges:
        children > 0
          ? (data.childrenAges ?? []).map(
              Number,
            )
          : [],

      pickupLocation:
        data.pickupLocation,

      specialRequest:
        data.specialRequest ?? "",
    };

    console.log(
      "BOOKING SUBMIT — REVIEW STEP:",
      currentStep,
    );

    console.log(
      "BOOKING PAYLOAD:",
      payload,
    );

    try {
      setSubmitting(true);

      const response = await fetch(
        "/api/bookings",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(payload),
        },
      );

      /*
       * Try to parse JSON safely.
       *
       * This prevents "Unexpected end of JSON input"
       * if the server ever returns an empty/non-JSON response.
       */
      let result: {
        bookingId?: string;
        bookingNumber?: string;
        message?: string;
        total?: number;
      } = {};

      try {
        result = await response.json();
      } catch {
        result = {};
      }

      if (!response.ok) {
        toast.error(
          result.message ||
            "We couldn't submit your booking request.",
        );

        return;
      }

      /*
       * Success is only reached after:
       *
       * Step 3 → Submit → API 2xx
       */
      if (!result.bookingId) {
        console.error(
          "BOOKING_SUCCESS_WITHOUT_ID:",
          result,
        );

        toast.error(
          "Booking was submitted, but we couldn't verify the booking reference.",
        );

        return;
      }

      toast.success(
        "Your booking request has been received.",
      );

      /*
       * Only now do we leave the wizard.
       */
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

  /* -------------------------------------------------------------------------- */
  /* FORM SUBMIT GUARD                                                          */
  /* -------------------------------------------------------------------------- */

  function handleFormSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    /*
     * 🔒 SECOND HARD GATE
     *
     * The HTML form exists around all three steps.
     * Therefore we explicitly prevent ANY form submission
     * unless Step 3 is currently visible.
     */
    if (currentStep !== 3) {
      event.preventDefault();

      console.warn(
        "FORM SUBMIT BLOCKED — CURRENT STEP:",
        currentStep,
      );

      return;
    }

    /*
     * Step 3 is the only place where React Hook Form
     * is allowed to process the submission.
     */
    void handleSubmit(
      handleBookingSubmit,
    )(event);
  }

  /* -------------------------------------------------------------------------- */
  /* RENDER                                                                     */
  /* -------------------------------------------------------------------------- */

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleFormSubmit}
      >
        <div className="overflow-hidden rounded-[28px] border border-[#071A33]/10 bg-white shadow-[0_24px_70px_rgba(7,26,51,0.08)]">
          {/* ---------------------------------------------------------------- */}
          {/* STEP HEADER                                                       */}
          {/* ---------------------------------------------------------------- */}

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

          {/* ---------------------------------------------------------------- */}
          {/* STEP CONTENT                                                      */}
          {/* ---------------------------------------------------------------- */}

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

            {/* ---------------------------------------------------------------- */}
            {/* NAVIGATION                                                        */}
            {/* ---------------------------------------------------------------- */}

            <div className="mt-10 border-t border-[#071A33]/10 pt-6">
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                {/* BACK */}

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

                {/* ---------------------------------------------------------- */}
                {/* CONTINUE                                                     */}
                {/* ---------------------------------------------------------- */}

                {currentStep < 3 && (
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
                )}

                {/* ---------------------------------------------------------- */}
                {/* FINAL SUBMIT — STEP 3 ONLY                                  */}
                {/* ---------------------------------------------------------- */}

                {currentStep === 3 && (
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