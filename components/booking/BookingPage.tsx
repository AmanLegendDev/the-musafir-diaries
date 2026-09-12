"use client";

import { FormProvider, useForm } from "react-hook-form";

import BookingHeader from "./BookingHeader";
import BookingNavigation from "./BookingNavigation";
import BookingWizard from "./BookingWizard";

import BookingJourneyCard from "./sidebar/BookingJourneyCard";
import BookingPriceCard from "./sidebar/BookingPriceCard";
import BookingHelpCard from "./sidebar/BookingHelpCard";

import type { BookingFormData } from "./types";

const DEFAULT_VALUES: BookingFormData = {
  package: "",
  customerName: "",
  phone: "",
  email: "",
  travelDate: "",
  adults: 1,
  childrenCount: 0,
  childrenAges: [],
  pickupLocation: "",
  specialRequest: "",
  totalPrice: 0,
};

export default function BookingPage() {
  const methods = useForm<BookingFormData>({
    defaultValues: DEFAULT_VALUES,
    mode: "onChange",
  });

  return (
    <FormProvider {...methods}>
      <main className="min-h-screen bg-[#FAF9F5] text-[#071A33]">
        <BookingHeader />

        <BookingNavigation />

        <section className="px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
          <div className="mx-auto w-full max-w-7xl">
            <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px] xl:gap-8">
              {/* Main booking flow */}
              <div className="min-w-0">
                <BookingWizard />
              </div>

              {/* Desktop sidebar */}
              <aside className="hidden min-w-0 lg:block">
                <div className="sticky top-28 space-y-5">
                  <BookingJourneyCard />

                  <BookingPriceCard />

                  <BookingHelpCard />
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
    </FormProvider>
  );
}