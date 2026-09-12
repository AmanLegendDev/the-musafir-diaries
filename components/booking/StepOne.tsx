"use client";

import {
  Mail,
  Phone,
  UserRound,
} from "lucide-react";
import { useFormContext } from "react-hook-form";

import TravellerField from "./TravellerField";
import TravellerIntro from "./TravellerIntro";
import TravellerPrivacyNote from "./TravellerPrivacyNote";
import type { BookingFormData } from "./types";

export default function StepOne() {
  const {
    register,
    formState: { errors },
  } = useFormContext<BookingFormData>();

  return (
    <div className="space-y-8">
      {/* Intro */}

      <TravellerIntro />

      {/* Section heading */}

      <div>
        <div className="flex items-end justify-between gap-5">
          <div>
            <p
              className="
                text-[10px] font-semibold
                uppercase tracking-[0.2em]
                text-[#087E8B]
              "
            >
              Traveller details
            </p>

            <h3
              className="
                mt-2 text-xl font-semibold
                tracking-tight text-[#071A33]
              "
            >
              Who should we contact?
            </h3>
          </div>

          <p className="hidden text-xs text-[#071A33]/35 sm:block">
            * Required
          </p>
        </div>
      </div>

      {/* Form */}

      <div className="grid gap-7 md:grid-cols-2">
        {/* Full Name */}

        <TravellerField
          label="Full name"
          hint="Your name as you would like it on the booking."
          icon={UserRound}
          error={
            errors.customerName?.message
          }
        >
          <input
            {...register("customerName")}
            id="customerName"
            name="customerName"
            type="text"
            autoComplete="name"
            placeholder="Enter your full name"
            aria-invalid={
              Boolean(
                errors.customerName,
              )
            }
            aria-describedby={
              errors.customerName
                ? "customerName-error"
                : undefined
            }
            className={inputClass(
              Boolean(
                errors.customerName,
              ),
            )}
          />
        </TravellerField>

        {/* Phone */}

        <TravellerField
          label="Phone number"
          hint="The best number for trip coordination."
          icon={Phone}
          error={
            errors.phone?.message
          }
        >
          <input
            {...register("phone")}
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+91 XXXXX XXXXX"
            aria-invalid={Boolean(
              errors.phone,
            )}
            className={inputClass(
              Boolean(errors.phone),
            )}
          />
        </TravellerField>

        {/* Email */}

        <div className="md:col-span-2">
          <TravellerField
            label="Email address"
            hint="We&apos;ll use this for booking communication and important journey updates."
            icon={Mail}
            error={
              errors.email?.message
            }
          >
            <input
              {...register("email")}
              id="email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@example.com"
              aria-invalid={Boolean(
                errors.email,
              )}
              className={inputClass(
                Boolean(errors.email),
              )}
            />
          </TravellerField>
        </div>
      </div>

      {/* Contact reassurance */}

      <TravellerPrivacyNote />
    </div>
  );
}

function inputClass(
  hasError: boolean,
) {
  return `
    min-h-[52px] w-full rounded-2xl border
    bg-white px-4 py-3.5
    text-sm font-medium text-[#071A33]
    outline-none
    transition-all duration-200

    placeholder:text-[#071A33]/25

    ${
      hasError
        ? `
          border-[#D94A3A]/45
          focus:border-[#D94A3A]
          focus:ring-4
          focus:ring-[#D94A3A]/10
        `
        : `
          border-[#071A33]/10
          hover:border-[#071A33]/20
          focus:border-[#087E8B]
          focus:ring-4
          focus:ring-[#087E8B]/10
        `
    }
  `;
}