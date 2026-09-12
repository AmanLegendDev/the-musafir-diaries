"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import {
  inquirySchema,
  type InquiryInput,
} from "@/lib/validations/inquiry";

import InquiryBudgetField from "./InquiryBudgetField";
import InquiryDateField from "./InquiryDateField";
import InquiryDestinationSelect from "./InquiryDestinationSelect";
import InquiryField from "./InquiryField";
import InquiryFormHeader from "./InquiryFormHeader";
import InquiryMessageField from "./InquiryMessageField";
import InquiryPrivacyNote from "./InquiryPrivacyNote";
import InquirySubmit from "./InquirySubmit";
import InquiryTravelerField from "./InquiryTravelerField";

const DEFAULT_VALUES: InquiryInput = {
  fullName: "",
  phone: "",
  email: "",
  destination: "",
  travelDate: "",
  travelers: 2,
  budget: "",
  pickupLocation: "",
  message: "",
};

const inputClass =
  "h-13 w-full rounded-2xl border border-[#071A33]/10 bg-white px-4 text-sm text-[#071A33] outline-none placeholder:text-[#071A33]/35 transition focus:border-[#087E8B] focus:ring-4 focus:ring-[#087E8B]/10 disabled:cursor-not-allowed disabled:opacity-60";

export default function InquiryForm() {
  const router = useRouter();

  const [submitError, setSubmitError] = useState("");

  const methods = useForm<InquiryInput>({
    resolver: zodResolver(inquirySchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onChange",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  async function onSubmit(values: InquiryInput) {
    setSubmitError("");

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.success) {
        setSubmitError(
          data?.message ||
            "We couldn't submit your inquiry. Please try again.",
        );

        return;
      }

      if (!data.inquiryId) {
        setSubmitError(
          "Your inquiry could not be completed. Please try again.",
        );

        return;
      }

      const params = new URLSearchParams({
        id: String(data.inquiryId),
      });

      if (data.inquiryNumber) {
        params.set(
          "reference",
          String(data.inquiryNumber),
        );
      }

      router.push(`/inquiry/success?${params.toString()}`);
    } catch {
      setSubmitError(
        "Unable to connect right now. Please check your connection and try again.",
      );
    }
  }

  return (
    <section
      id="inquiry-form"
      aria-labelledby="inquiry-form-heading"
      className="bg-[#FAF9F5] px-4 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-24"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-16">
        {/* Intro */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <InquiryFormHeader />

          <div className="hidden rounded-3xl border border-[#071A33]/8 bg-white p-6 lg:block">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#087E8B]">
              A little goes a long way
            </p>

            <p className="mt-3 text-sm leading-7 text-[#071A33]/65">
              Destination, dates and group size give us the
              essentials. Your message lets us understand the
              experience you actually want.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="min-w-0">
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="rounded-[2rem] border border-[#071A33]/8 bg-white p-5 shadow-[0_18px_60px_rgba(7,26,51,0.07)] sm:p-7 lg:p-9"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <InquiryField
                  label="Full name"
                  htmlFor="fullName"
                  required
                  error={errors.fullName?.message}
                >
                  <input
                    id="fullName"
                    type="text"
                    autoComplete="name"
                    placeholder="Your full name"
                    aria-invalid={Boolean(errors.fullName)}
                    aria-describedby={
                      errors.fullName
                        ? "fullName-error"
                        : undefined
                    }
                    className={inputClass}
                    {...register("fullName")}
                  />
                </InquiryField>

                <InquiryField
                  label="Mobile number"
                  htmlFor="phone"
                  required
                  hint="10 digits"
                  error={errors.phone?.message}
                >
                  <input
                    id="phone"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    maxLength={10}
                    placeholder="10-digit mobile number"
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={
                      errors.phone
                        ? "phone-error"
                        : undefined
                    }
                    className={inputClass}
                    {...register("phone")}
                  />
                </InquiryField>

                <InquiryField
                  label="Email address"
                  htmlFor="email"
                  required
                  error={errors.email?.message}
                >
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={
                      errors.email
                        ? "email-error"
                        : undefined
                    }
                    className={inputClass}
                    {...register("email")}
                  />
                </InquiryField>

                <InquiryDestinationSelect
                  error={errors.destination?.message}
                />

                <InquiryDateField
                  error={errors.travelDate?.message}
                />

                <InquiryTravelerField
                  error={errors.travelers?.message}
                />

                <InquiryBudgetField
                  error={errors.budget?.message}
                />

                <InquiryField
                  label="Preferred pickup location"
                  htmlFor="pickupLocation"
                  hint="Optional"
                  error={errors.pickupLocation?.message}
                >
                  <input
                    id="pickupLocation"
                    type="text"
                    autoComplete="street-address"
                    placeholder="e.g. Chandigarh, Shimla, Delhi"
                    aria-invalid={Boolean(
                      errors.pickupLocation,
                    )}
                    aria-describedby={
                      errors.pickupLocation
                        ? "pickupLocation-error"
                        : undefined
                    }
                    className={inputClass}
                    {...register("pickupLocation")}
                  />
                </InquiryField>

                <div className="sm:col-span-2">
                  <InquiryMessageField
                    error={errors.message?.message}
                  />
                </div>
              </div>

              <div className="my-7 h-px bg-[#071A33]/8" />

              <div className="space-y-5">
                <InquiryPrivacyNote />

                <InquirySubmit
                  errorMessage={submitError}
                />
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </section>
  );
}