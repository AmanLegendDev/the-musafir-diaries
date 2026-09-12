"use client";

import {
  CalendarDays,
  MapPin,
  UsersRound,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";

import BookingPriceCard from "./BookingPriceCard";
import ChildrenAges from "./ChildrenAges";
import PackageOption from "./PackageOption";
import TravellerCounter from "./TravellerCounter";
import type {
  BookingFormData,
  BookingPriceBreakdown,
} from "./types";

interface Package {
  _id: string;
  name: string;
  slug?: string;
  duration?: string;
  originalPrice: number;
  discountedPrice: number;
  childPolicy: {
    complimentaryBelow: number;
    halfPriceBelow: number;
    halfPricePercentage: number;
  };
}

export default function StepTwo() {
  const [packages, setPackages] =
    useState<Package[]>([]);

  const [
    loadingPackages,
    setLoadingPackages,
  ] = useState(true);

  const [
    packageError,
    setPackageError,
  ] = useState("");

  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } =
    useFormContext<BookingFormData>();

  const packageId =
    watch("package");

  const adults =
    watch("adults") || 1;

  const childrenCount =
    watch("childrenCount") || 0;

  const childrenAges =
    watch("childrenAges") || [];

  const selectedPackage =
    useMemo(
      () =>
        packages.find(
          (item) =>
            item._id === packageId,
        ),
      [
        packages,
        packageId,
      ],
    );

  const pricing:
    BookingPriceBreakdown =
    useMemo(() => {
      if (!selectedPackage) {
        return {
          adultTotal: 0,
          childTotal: 0,
          subtotal: 0,
          total: 0,
        };
      }

      const adultPrice =
        selectedPackage.discountedPrice;

      const adultTotal =
        adults * adultPrice;

      let childTotal = 0;

      childrenAges
        .slice(
          0,
          childrenCount,
        )
        .forEach((age) => {
          const policy =
            selectedPackage.childPolicy;

          if (
            age <
            policy.complimentaryBelow
          ) {
            return;
          }

          if (
            age <
            policy.halfPriceBelow
          ) {
            childTotal +=
              adultPrice *
              (policy.halfPricePercentage /
                100);

            return;
          }

          childTotal +=
            adultPrice;
        });

      const subtotal =
        adultTotal +
        childTotal;

      return {
        adultTotal,
        childTotal,
        subtotal,
        total: subtotal,
      };
    }, [
      selectedPackage,
      adults,
      childrenCount,
      childrenAges,
    ]);

  /*
   * Frontend estimate only.
   * Backend recalculates the final amount.
   */
  useEffect(() => {
    setValue(
      "totalPrice",
      pricing.total,
      {
        shouldDirty: true,
      },
    );
  }, [
    pricing.total,
    setValue,
  ]);

  /*
   * Keep children ages aligned
   * with the selected child count.
   */
  useEffect(() => {
    const count = Math.max(
      0,
      childrenCount,
    );

    const current =
      childrenAges || [];

    const updated =
      current.slice(0, count);

    while (
      updated.length < count
    ) {
      updated.push(0);
    }

    const changed =
      updated.length !==
        current.length ||
      updated.some(
        (value, index) =>
          value !==
          current[index],
      );

    if (changed) {
      setValue(
        "childrenAges",
        updated,
        {
          shouldDirty: true,
        },
      );
    }
  }, [
    childrenCount,
    childrenAges,
    setValue,
  ]);

  /*
   * Load active packages.
   */
  useEffect(() => {
    let cancelled = false;

    async function loadPackages() {
      try {
        setLoadingPackages(true);
        setPackageError("");

        const response =
          await fetch(
            "/api/packages",
          );

        if (!response.ok) {
          throw new Error(
            "Unable to load packages.",
          );
        }

        const data =
          await response.json();

        if (cancelled) {
          return;
        }

        setPackages(
          Array.isArray(
            data.packages,
          )
            ? data.packages
            : [],
        );
      } catch (error) {
        console.error(
          "BOOKING_PACKAGE_LOAD_ERROR:",
          error,
        );

        if (!cancelled) {
          setPackageError(
            "We couldn't load the available journeys. Please refresh and try again.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoadingPackages(false);
        }
      }
    }

    loadPackages();

    return () => {
      cancelled = true;
    };
  }, []);

  function setAdults(
    value: number,
  ) {
    setValue(
      "adults",
      Math.min(
        20,
        Math.max(1, value),
      ),
      {
        shouldDirty: true,
        shouldValidate: true,
      },
    );
  }

  function setChildren(
    value: number,
  ) {
    setValue(
      "childrenCount",
      Math.min(
        20,
        Math.max(0, value),
      ),
      {
        shouldDirty: true,
        shouldValidate: true,
      },
    );
  }

  function setChildAge(
    index: number,
    age: number,
  ) {
    const updated = [
      ...childrenAges,
    ];

    updated[index] =
      Math.min(
        17,
        Math.max(0, age),
      );

    setValue(
      "childrenAges",
      updated,
      {
        shouldDirty: true,
        shouldValidate: true,
      },
    );
  }

  return (
    <div className="space-y-9">
      {/* Intro */}

      <div className="max-w-2xl">
        <p className="text-sm leading-7 text-[#071A33]/55">
          Choose the journey you&apos;re
          interested in, your preferred
          travel date and the people
          travelling with you.
        </p>
      </div>

      {/* Package */}

      <section>
        <SectionHeading
          icon={MapPin}
          eyebrow="01"
          title="Choose your journey"
          description="Select the experience you would like us to plan."
        />

        <div className="mt-5">
          {loadingPackages ? (
            <div className="space-y-3">
              <PackageSkeleton />
              <PackageSkeleton />
              <PackageSkeleton />
            </div>
          ) : packageError ? (
            <div className="rounded-2xl border border-[#D94A3A]/20 bg-[#D94A3A]/5 p-5">
              <p className="text-sm leading-6 text-[#D94A3A]">
                {packageError}
              </p>
            </div>
          ) : packages.length ===
            0 ? (
            <div className="rounded-2xl border border-[#071A33]/10 bg-[#FAF9F5] p-5">
              <p className="text-sm text-[#071A33]/55">
                No journeys are currently
                available.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {packages.map(
                (pkg) => (
                  <PackageOption
                    key={pkg._id}
                    name={pkg.name}
                    duration={
                      pkg.duration
                    }
                    originalPrice={
                      pkg.originalPrice
                    }
                    discountedPrice={
                      pkg.discountedPrice
                    }
                    selected={
                      pkg._id ===
                      packageId
                    }
                    onSelect={() =>
                      setValue(
                        "package",
                        pkg._id,
                        {
                          shouldDirty:
                            true,
                          shouldValidate:
                            true,
                        },
                      )
                    }
                  />
                ),
              )}
            </div>
          )}

          {errors.package && (
            <p className="mt-3 text-xs font-medium text-[#D94A3A]">
              {errors.package.message}
            </p>
          )}
        </div>
      </section>

      {/* Date */}

      <section>
        <SectionHeading
          icon={CalendarDays}
          eyebrow="02"
          title="When are you travelling?"
          description="Choose your preferred starting date."
        />

        <div className="mt-5">
          <input
            {...register(
              "travelDate",
            )}
            type="date"
            min={
              new Date()
                .toISOString()
                .split("T")[0]
            }
            className={inputClass(
              Boolean(
                errors.travelDate,
              ),
            )}
          />

          {errors.travelDate && (
            <p className="mt-2 text-xs font-medium text-[#D94A3A]">
              {errors.travelDate.message}
            </p>
          )}
        </div>
      </section>

      {/* Travellers */}

      <section>
        <SectionHeading
          icon={UsersRound}
          eyebrow="03"
          title="Who is travelling?"
          description="Tell us how many people will be joining the journey."
        />

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <TravellerCounter
            label="Adults"
            description="18 years and above"
            value={adults}
            min={1}
            max={20}
            onDecrease={() =>
              setAdults(
                adults - 1,
              )
            }
            onIncrease={() =>
              setAdults(
                adults + 1,
              )
            }
          />

          <TravellerCounter
            label="Children"
            description="Under 18 years"
            value={childrenCount}
            min={0}
            max={20}
            onDecrease={() =>
              setChildren(
                childrenCount - 1,
              )
            }
            onIncrease={() =>
              setChildren(
                childrenCount + 1,
              )
            }
          />
        </div>

        {errors.adults && (
          <p className="mt-3 text-xs font-medium text-[#D94A3A]">
            {errors.adults.message}
          </p>
        )}

        {errors.childrenCount && (
          <p className="mt-2 text-xs font-medium text-[#D94A3A]">
            {
              errors
                .childrenCount
                .message
            }
          </p>
        )}
      </section>

      {/* Children */}

      {childrenCount > 0 && (
        <ChildrenAges
          count={
            childrenCount
          }
          ages={
            childrenAges
          }
          onChange={
            setChildAge
          }
        />
      )}

      {/* Pickup */}

      <section>
        <SectionHeading
          icon={MapPin}
          eyebrow="04"
          title="Where should we meet you?"
          description="Hotel, airport, bus stand or another preferred pickup point."
        />

        <div className="mt-5">
          <input
            {...register(
              "pickupLocation",
            )}
            type="text"
            placeholder="Enter your preferred pickup location"
            className={inputClass(
              Boolean(
                errors.pickupLocation,
              ),
            )}
          />

          {errors.pickupLocation && (
            <p className="mt-2 text-xs font-medium text-[#D94A3A]">
              {
                errors
                  .pickupLocation
                  .message
              }
            </p>
          )}
        </div>
      </section>

      {/* Special request */}

      <section>
        <div className="mb-3">
          <label
            htmlFor="specialRequest"
            className="block text-sm font-semibold text-[#071A33]"
          >
            Anything else we should know?
          </label>

          <p className="mt-1 text-xs leading-5 text-[#071A33]/40">
            Optional — preferences,
            celebrations, accessibility
            needs or other requests.
          </p>
        </div>

        <textarea
          id="specialRequest"
          {...register(
            "specialRequest",
          )}
          rows={4}
          maxLength={1000}
          placeholder="Share anything that could help us plan your journey..."
          className="
            w-full rounded-2xl
            border border-[#071A33]/10
            bg-white px-4 py-3.5
            text-sm leading-7
            text-[#071A33]
            outline-none
            transition
            placeholder:text-[#071A33]/25
            hover:border-[#071A33]/20
            focus:border-[#087E8B]
            focus:ring-4
            focus:ring-[#087E8B]/10
          "
        />

        {errors.specialRequest && (
          <p className="mt-2 text-xs font-medium text-[#D94A3A]">
            {
              errors
                .specialRequest
                .message
            }
          </p>
        )}
      </section>

      {/* Price */}

      {selectedPackage && (
        <BookingPriceCard
          adults={adults}
          children={
            childrenCount
          }
          adultTotal={
            pricing.adultTotal
          }
          childTotal={
            pricing.childTotal
          }
          total={
            pricing.total
          }
        />
      )}
    </div>
  );
}

function SectionHeading({
  icon: Icon,
  eyebrow,
  title,
  description,
}: {
  icon: typeof MapPin;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#087E8B]/10 text-[#087E8B]">
        <Icon size={18} />
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#087E8B]">
          {eyebrow}
        </p>

        <h3 className="mt-1 text-base font-semibold text-[#071A33]">
          {title}
        </h3>

        <p className="mt-1 text-xs leading-5 text-[#071A33]/40">
          {description}
        </p>
      </div>
    </div>
  );
}

function PackageSkeleton() {
  return (
    <div className="h-[92px] animate-pulse rounded-[22px] bg-[#071A33]/5" />
  );
}

function inputClass(
  hasError: boolean,
) {
  return `
    min-h-[52px] w-full rounded-2xl border
    bg-white px-4 py-3.5
    text-sm font-medium text-[#071A33]
    outline-none transition-all duration-200
    placeholder:text-[#071A33]/25

    ${
      hasError
        ? "border-[#D94A3A]/45 focus:border-[#D94A3A] focus:ring-4 focus:ring-[#D94A3A]/10"
        : "border-[#071A33]/10 hover:border-[#071A33]/20 focus:border-[#087E8B] focus:ring-4 focus:ring-[#087E8B]/10"
    }
  `;
}