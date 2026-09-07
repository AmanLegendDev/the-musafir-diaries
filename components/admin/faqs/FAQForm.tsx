"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  HelpCircle,
  Loader2,
  Package,
  Save,
  Search,
  Hotel as HotelIcon,
  MapPin,
  Star,
  Globe,
} from "lucide-react";
import { toast } from "sonner";

/* =========================================================
   TYPES
   ========================================================= */

type ScopeType =
  | "global"
  | "destination"
  | "package"
  | "hotel";

type Destination = {
  _id: string;
  name: string;
  slug: string;
  status?: "active" | "draft";
};

type TravelPackage = {
  _id: string;
  name: string;
  slug: string;
  destination?: string | { _id: string };
  status?: string;
};

type Hotel = {
  _id: string;
  name: string;
  slug: string;
  destination?: string | { _id: string };
  status?: "active" | "draft";
};

type FormState = {
  question: string;
  answer: string;

  destination: string | null;
  package: string | null;
  hotel: string | null;

  category: string;

  featured: boolean;
  displayOrder: number;
  status: "active" | "draft";

  seoTitle: string;
  seoDescription: string;
};

const INITIAL_FORM: FormState = {
  question: "",
  answer: "",

  destination: null,
  package: null,
  hotel: null,

  category: "",

  featured: false,
  displayOrder: 0,
  status: "draft",

  seoTitle: "",
  seoDescription: "",
};

/* =========================================================
   HELPERS
   ========================================================= */

function getId(value: unknown): string | null {
  if (!value) return null;

  if (typeof value === "string") {
    return value;
  }

  if (
    typeof value === "object" &&
    value !== null &&
    "_id" in value
  ) {
    const id = (value as { _id?: unknown })._id;

    return typeof id === "string" ? id : null;
  }

  return null;
}

/* =========================================================
   PAGE
   ========================================================= */

export default function FAQForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [form, setForm] =
    useState<FormState>(INITIAL_FORM);

  const [scope, setScope] =
    useState<ScopeType>("global");

  const [destinations, setDestinations] =
    useState<Destination[]>([]);

  const [packages, setPackages] =
    useState<TravelPackage[]>([]);

  const [hotels, setHotels] =
    useState<Hotel[]>([]);

  const [loadingDestinations, setLoadingDestinations] =
    useState(false);

  const [loadingPackages, setLoadingPackages] =
    useState(false);

  const [loadingHotels, setLoadingHotels] =
    useState(false);

  const [submitting, setSubmitting] =
    useState(false);

  const [errors, setErrors] =
    useState<Record<string, string[]>>({});

  const [search, setSearch] =
    useState("");

  /* =========================================================
     LOAD DESTINATIONS
     ========================================================= */

  useEffect(() => {
    let cancelled = false;

    async function loadDestinations() {
      try {
        setLoadingDestinations(true);

        const response =
          await fetch("/api/destinations");

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error ||
              data.message ||
              "Unable to load destinations.",
          );
        }

        if (!cancelled) {
          setDestinations(
            Array.isArray(data.destinations)
              ? data.destinations
              : [],
          );
        }
      } catch (error) {
        console.error(
          "LOAD_DESTINATIONS_ERROR:",
          error,
        );

        if (!cancelled) {
          toast.error(
            "Unable to load destinations.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoadingDestinations(false);
        }
      }
    }

    loadDestinations();

    return () => {
      cancelled = true;
    };
  }, []);

  /* =========================================================
     LOAD PACKAGES
     ========================================================= */

  useEffect(() => {
    let cancelled = false;

    async function loadPackages() {
      try {
        setLoadingPackages(true);

        const response =
          await fetch("/api/packages");

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error ||
              data.message ||
              "Unable to load packages.",
          );
        }

        if (!cancelled) {
          setPackages(
            Array.isArray(data.packages)
              ? data.packages
              : [],
          );
        }
      } catch (error) {
        console.error(
          "LOAD_PACKAGES_ERROR:",
          error,
        );

        if (!cancelled) {
          toast.error(
            "Unable to load packages.",
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

  /* =========================================================
     LOAD HOTELS
     ========================================================= */

  useEffect(() => {
    let cancelled = false;

    async function loadHotels() {
      try {
        setLoadingHotels(true);

        const response =
          await fetch("/api/hotels");

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error ||
              data.message ||
              "Unable to load hotels.",
          );
        }

        if (!cancelled) {
          setHotels(
            Array.isArray(data.hotels)
              ? data.hotels
              : [],
          );
        }
      } catch (error) {
        console.error(
          "LOAD_HOTELS_ERROR:",
          error,
        );

        if (!cancelled) {
          toast.error(
            "Unable to load hotels.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoadingHotels(false);
        }
      }
    }

    loadHotels();

    return () => {
      cancelled = true;
    };
  }, []);

  /* =========================================================
     URL PREFILL
     ========================================================= */

 useEffect(() => {
  const destination = searchParams.get("destination");
  const packageId = searchParams.get("package");
  const hotel = searchParams.get("hotel");

  if (destination) {
    queueMicrotask(() => {
      setScope("destination");
      setForm((prev) => ({
        ...prev,
        destination,
        package: null,
        hotel: null,
      }));
    });
    return;
  }

  if (packageId) {
    queueMicrotask(() => {
      setScope("package");
      setForm((prev) => ({
        ...prev,
        destination: null,
        package: packageId,
        hotel: null,
      }));
    });
    return;
  }

  if (hotel) {
    queueMicrotask(() => {
      setScope("hotel");
      setForm((prev) => ({
        ...prev,
        destination: null,
        package: null,
        hotel,
      }));
    });
  }
}, [searchParams]);

  /* =========================================================
     SCOPE CHANGE
     ========================================================= */

  function handleScopeChange(
    nextScope: ScopeType,
  ) {
    setScope(nextScope);

    setSearch("");

    setErrors({});

    setForm((prev) => ({
      ...prev,

      destination:
        nextScope === "destination"
          ? prev.destination
          : null,

      package:
        nextScope === "package"
          ? prev.package
          : null,

      hotel:
        nextScope === "hotel"
          ? prev.hotel
          : null,
    }));
  }

  /* =========================================================
     FIELD UPDATE
     ========================================================= */

  function updateField(
    field: keyof FormState,
    value: string | number | boolean | null,
  ) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => {
      const next = { ...prev };

      delete next[field];

      return next;
    });
  }

  /* =========================================================
     VALIDATION
     ========================================================= */

  function validateClient() {
    const nextErrors: Record<
      string,
      string[]
    > = {};

    if (form.question.trim().length < 5) {
      nextErrors.question = [
        "Question must be at least 5 characters.",
      ];
    }

    if (form.question.trim().length > 300) {
      nextErrors.question = [
        "Question cannot exceed 300 characters.",
      ];
    }

    if (form.answer.trim().length < 10) {
      nextErrors.answer = [
        "Answer must be at least 10 characters.",
      ];
    }

    if (form.answer.trim().length > 5000) {
      nextErrors.answer = [
        "Answer cannot exceed 5,000 characters.",
      ];
    }

    if (scope === "destination" &&
      !form.destination) {
      nextErrors.destination = [
        "Please select a destination.",
      ];
    }

    if (scope === "package" &&
      !form.package) {
      nextErrors.package = [
        "Please select a package.",
      ];
    }

    if (scope === "hotel" &&
      !form.hotel) {
      nextErrors.hotel = [
        "Please select a hotel.",
      ];
    }

    if (
      form.status === "active" &&
      form.seoTitle.trim().length < 10
    ) {
      nextErrors.seoTitle = [
        "Active FAQs require an SEO title of at least 10 characters.",
      ];
    }

    if (
      form.status === "active" &&
      form.seoDescription.trim().length < 50
    ) {
      nextErrors.seoDescription = [
        "Active FAQs require an SEO description of at least 50 characters.",
      ];
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }

  /* =========================================================
     FILTERED DATA
     ========================================================= */

  const filteredDestinations =
    useMemo(() => {
      const term =
        search.trim().toLowerCase();

      if (!term) return destinations;

      return destinations.filter((item) =>
        item.name
          .toLowerCase()
          .includes(term),
      );
    }, [destinations, search]);

  const filteredPackages =
    useMemo(() => {
      const term =
        search.trim().toLowerCase();

      if (!term) return packages;

      return packages.filter((item) =>
        item.name
          .toLowerCase()
          .includes(term),
      );
    }, [packages, search]);

  const filteredHotels =
    useMemo(() => {
      const term =
        search.trim().toLowerCase();

      if (!term) return hotels;

      return hotels.filter((item) =>
        item.name
          .toLowerCase()
          .includes(term),
      );
    }, [hotels, search]);

  /* =========================================================
     SELECTED LABEL
     ========================================================= */

  const selectedScopeLabel =
    scope === "global"
      ? "Global FAQ"
      : scope === "destination"
        ? "Destination FAQ"
        : scope === "package"
          ? "Package FAQ"
          : "Hotel FAQ";

  /* =========================================================
     SUBMIT
     ========================================================= */

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (submitting) return;

    if (!validateClient()) {
      toast.error(
        "Please fix the highlighted fields.",
      );

      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        question: form.question.trim(),
        answer: form.answer.trim(),

        destination:
          scope === "destination"
            ? form.destination
            : null,

        package:
          scope === "package"
            ? form.package
            : null,

        hotel:
          scope === "hotel"
            ? form.hotel
            : null,

        category:
          form.category.trim(),

        featured: form.featured,

        displayOrder:
          Number(form.displayOrder),

        status: form.status,

        seoTitle:
          form.seoTitle.trim(),

        seoDescription:
          form.seoDescription.trim(),
      };

      const response =
        await fetch("/api/faqs", {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(payload),
        });

      const data =
        await response.json();

      if (!response.ok) {
        console.error(
          "FAQ_CREATE_ERROR:",
          data,
        );

        if (data.fieldErrors) {
          setErrors(data.fieldErrors);
        }

        const fieldErrors =
          data.fieldErrors
            ? Object.entries(
                data.fieldErrors,
              )
                .map(
                  ([field, messages]) =>
                    `${field}: ${(messages as string[]).join(", ")}`,
                )
                .join("\n")
            : "";

        throw new Error(
          [data.error, fieldErrors]
            .filter(Boolean)
            .join("\n") ||
            "Unable to create FAQ.",
        );
      }

      toast.success(
        "FAQ created successfully.",
      );

      router.push("/admin/faqs");
      router.refresh();
    } catch (error) {
      console.error(
        "FAQ_SUBMIT_ERROR:",
        error,
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to create FAQ.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  /* =========================================================
     ERROR HELPER
     ========================================================= */

  function fieldError(
    field: string,
  ) {
    return errors[field]?.[0];
  }

  /* =========================================================
     RENDER
     ========================================================= */

  return (
    <div className="min-h-screen bg-[#f7f7f5]">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="border-b border-black/5 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  router.push("/admin/faqs")
                }
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 bg-white transition hover:bg-black/[0.03]"
              >
                <ArrowLeft
                  className="h-5 w-5"
                />
              </button>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/40">
                  FAQ Management
                </p>

                <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[#171717]">
                  Add New FAQ
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="rounded-full bg-black/[0.04] px-3 py-1.5 text-xs font-medium text-black/60">
                {selectedScopeLabel}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <form
          onSubmit={handleSubmit}
          className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]"
        >
          {/* =================================================
              MAIN
          ================================================= */}

          <div className="space-y-6">
            {/* =================================================
                SCOPE
            ================================================= */}

            <section className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5">
                <h2 className="text-base font-semibold text-[#171717]">
                  FAQ Scope
                </h2>

                <p className="mt-1 text-sm text-black/50">
                  Choose where this FAQ belongs.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  {
                    id: "global",
                    title: "Global",
                    description:
                      "General travel questions",
                    icon: Globe,
                  },
                  {
                    id: "destination",
                    title: "Destination",
                    description:
                      "Specific destination",
                    icon: MapPin,
                  },
                  {
                    id: "package",
                    title: "Package",
                    description:
                      "Specific travel package",
                    icon: Package,
                  },
                  {
                    id: "hotel",
                    title: "Hotel",
                    description:
                      "Specific hotel",
                    icon: HotelIcon,
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  const active =
                    scope === item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        handleScopeChange(
                          item.id as ScopeType,
                        )
                      }
                      className={[
                        "relative rounded-xl border p-4 text-left transition",
                        active
                          ? "border-black bg-black text-white shadow-sm"
                          : "border-black/10 bg-white hover:border-black/20 hover:bg-black/[0.02]",
                      ].join(" ")}
                    >
                      {active && (
                        <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-white text-black">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                      )}

                      <Icon
                        className={[
                          "h-5 w-5",
                          active
                            ? "text-white"
                            : "text-black/60",
                        ].join(" ")}
                      />

                      <p className="mt-3 text-sm font-semibold">
                        {item.title}
                      </p>

                      <p
                        className={[
                          "mt-1 text-xs",
                          active
                            ? "text-white/60"
                            : "text-black/45",
                        ].join(" ")}
                      >
                        {item.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* =================================================
                CONTENT
            ================================================= */}

            <section className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5 flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black/[0.04]">
                  <HelpCircle className="h-5 w-5 text-black/70" />
                </div>

                <div>
                  <h2 className="text-base font-semibold text-[#171717]">
                    Question & Answer
                  </h2>

                  <p className="mt-1 text-sm text-black/50">
                    Write a clear question and a useful answer.
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                {/* Question */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-black/75">
                    Question
                    <span className="ml-1 text-red-500">
                      *
                    </span>
                  </label>

                  <input
                    type="text"
                    value={form.question}
                    onChange={(event) =>
                      updateField(
                        "question",
                        event.target.value,
                      )
                    }
                    placeholder="e.g. What is the best time to visit Shimla?"
                    maxLength={300}
                    className={[
                      "w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition placeholder:text-black/30",
                      fieldError("question")
                        ? "border-red-400 focus:border-red-500"
                        : "border-black/10 focus:border-black/30",
                    ].join(" ")}
                  />

                  <div className="mt-1.5 flex justify-between text-xs text-black/35">
                    <span>
                      {fieldError("question") ||
                        "Keep the question natural and customer-focused."}
                    </span>

                    <span>
                      {form.question.length}/300
                    </span>
                  </div>
                </div>

                {/* Answer */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-black/75">
                    Answer
                    <span className="ml-1 text-red-500">
                      *
                    </span>
                  </label>

                  <textarea
                    value={form.answer}
                    onChange={(event) =>
                      updateField(
                        "answer",
                        event.target.value,
                      )
                    }
                    placeholder="Write a helpful and accurate answer..."
                    rows={8}
                    maxLength={5000}
                    className={[
                      "w-full resize-y rounded-xl border bg-white px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-black/30",
                      fieldError("answer")
                        ? "border-red-400 focus:border-red-500"
                        : "border-black/10 focus:border-black/30",
                    ].join(" ")}
                  />

                  <div className="mt-1.5 flex justify-between text-xs text-black/35">
                    <span>
                      {fieldError("answer") ||
                        "Avoid unsupported promises or misleading information."}
                    </span>

                    <span>
                      {form.answer.length}/5000
                    </span>
                  </div>
                </div>

                {/* Category */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-black/75">
                    Category
                  </label>

                  <input
                    type="text"
                    value={form.category}
                    onChange={(event) =>
                      updateField(
                        "category",
                        event.target.value,
                      )
                    }
                    placeholder="e.g. Travel, Booking, Hotels, Payments"
                    maxLength={100}
                    className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-black/30 focus:border-black/30"
                  />

                  <p className="mt-1.5 text-xs text-black/35">
                    Optional grouping label for the FAQ CMS.
                  </p>
                </div>
              </div>
            </section>

            {/* =================================================
                RELATIONSHIP
            ================================================= */}

            {scope !== "global" && (
              <section className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm sm:p-6">
                <div className="mb-5">
                  <h2 className="text-base font-semibold text-[#171717]">
                    Related {scope}
                  </h2>

                  <p className="mt-1 text-sm text-black/50">
                    Select the exact content entity this FAQ belongs to.
                  </p>
                </div>

                {/* Search */}

                <div className="relative mb-4">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black/35" />

                  <input
                    type="text"
                    value={search}
                    onChange={(event) =>
                      setSearch(
                        event.target.value,
                      )
                    }
                    placeholder={`Search ${scope}...`}
                    className="w-full rounded-xl border border-black/10 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-black/30"
                  />
                </div>

                {/* Destination */}

                {scope === "destination" && (
                  <div>
                    <select
                      value={
                        form.destination || ""
                      }
                      onChange={(event) =>
                        updateField(
                          "destination",
                          event.target.value ||
                            null,
                        )
                      }
                      disabled={
                        loadingDestinations
                      }
                      className={[
                        "w-full appearance-none rounded-xl border bg-white px-4 py-3 text-sm outline-none",
                        fieldError(
                          "destination",
                        )
                          ? "border-red-400"
                          : "border-black/10",
                      ].join(" ")}
                    >
                      <option value="">
                        {loadingDestinations
                          ? "Loading destinations..."
                          : "Select destination"}
                      </option>

                      {filteredDestinations.map(
                        (item) => (
                          <option
                            key={item._id}
                            value={item._id}
                          >
                            {item.name}
                            {item.status ===
                            "draft"
                              ? " — Draft"
                              : ""}
                          </option>
                        ),
                      )}
                    </select>

                    <p className="mt-2 text-xs text-red-500">
                      {fieldError(
                        "destination",
                      )}
                    </p>
                  </div>
                )}

                {/* Package */}

                {scope === "package" && (
                  <div>
                    <select
                      value={
                        form.package || ""
                      }
                      onChange={(event) =>
                        updateField(
                          "package",
                          event.target.value ||
                            null,
                        )
                      }
                      disabled={loadingPackages}
                      className={[
                        "w-full appearance-none rounded-xl border bg-white px-4 py-3 text-sm outline-none",
                        fieldError("package")
                          ? "border-red-400"
                          : "border-black/10",
                      ].join(" ")}
                    >
                      <option value="">
                        {loadingPackages
                          ? "Loading packages..."
                          : "Select package"}
                      </option>

                      {filteredPackages.map(
                        (item) => (
                          <option
                            key={item._id}
                            value={item._id}
                          >
                            {item.name}
                          </option>
                        ),
                      )}
                    </select>

                    <p className="mt-2 text-xs text-red-500">
                      {fieldError(
                        "package",
                      )}
                    </p>
                  </div>
                )}

                {/* Hotel */}

                {scope === "hotel" && (
                  <div>
                    <select
                      value={
                        form.hotel || ""
                      }
                      onChange={(event) =>
                        updateField(
                          "hotel",
                          event.target.value ||
                            null,
                        )
                      }
                      disabled={loadingHotels}
                      className={[
                        "w-full appearance-none rounded-xl border bg-white px-4 py-3 text-sm outline-none",
                        fieldError("hotel")
                          ? "border-red-400"
                          : "border-black/10",
                      ].join(" ")}
                    >
                      <option value="">
                        {loadingHotels
                          ? "Loading hotels..."
                          : "Select hotel"}
                      </option>

                      {filteredHotels.map(
                        (item) => (
                          <option
                            key={item._id}
                            value={item._id}
                          >
                            {item.name}
                            {item.status ===
                            "draft"
                              ? " — Draft"
                              : ""}
                          </option>
                        ),
                      )}
                    </select>

                    <p className="mt-2 text-xs text-red-500">
                      {fieldError("hotel")}
                    </p>
                  </div>
                )}
              </section>
            )}

            {/* =================================================
                SEO
            ================================================= */}

            <section className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5">
                <h2 className="text-base font-semibold text-[#171717]">
                  SEO
                </h2>

                <p className="mt-1 text-sm text-black/50">
                  SEO metadata for the page where this FAQ is displayed.
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-black/75">
                    SEO Title
                  </label>

                  <input
                    type="text"
                    value={form.seoTitle}
                    onChange={(event) =>
                      updateField(
                        "seoTitle",
                        event.target.value,
                      )
                    }
                    placeholder="FAQ SEO title"
                    maxLength={60}
                    className={[
                      "w-full rounded-xl border px-4 py-3 text-sm outline-none",
                      fieldError("seoTitle")
                        ? "border-red-400"
                        : "border-black/10 focus:border-black/30",
                    ].join(" ")}
                  />

                  <div className="mt-1.5 flex justify-between text-xs text-black/35">
                    <span>
                      {fieldError("seoTitle") ||
                        (form.status === "active"
                          ? "Required for active FAQs."
                          : "Optional while draft.")}
                    </span>

                    <span>
                      {form.seoTitle.length}/60
                    </span>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-black/75">
                    SEO Description
                  </label>

                  <textarea
                    value={
                      form.seoDescription
                    }
                    onChange={(event) =>
                      updateField(
                        "seoDescription",
                        event.target.value,
                      )
                    }
                    placeholder="Brief search-engine friendly description..."
                    rows={4}
                    maxLength={160}
                    className={[
                      "w-full resize-y rounded-xl border px-4 py-3 text-sm leading-6 outline-none",
                      fieldError(
                        "seoDescription",
                      )
                        ? "border-red-400"
                        : "border-black/10 focus:border-black/30",
                    ].join(" ")}
                  />

                  <div className="mt-1.5 flex justify-between text-xs text-black/35">
                    <span>
                      {fieldError(
                        "seoDescription",
                      ) ||
                        (form.status === "active"
                          ? "Minimum 50 characters for active FAQs."
                          : "Optional while draft.")}
                    </span>

                    <span>
                      {
                        form.seoDescription
                          .length
                      }
                      /160
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* =================================================
              SIDEBAR
          ================================================= */}

          <aside className="space-y-6">
            {/* =================================================
                PUBLISH
            ================================================= */}

            <section className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
              <div className="mb-5">
                <h2 className="text-base font-semibold text-[#171717]">
                  Publishing
                </h2>

                <p className="mt-1 text-sm text-black/50">
                  Control visibility and ordering.
                </p>
              </div>

              <div className="space-y-5">
                {/* Status */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-black/75">
                    Status
                  </label>

                  <div className="grid grid-cols-2 gap-2">
                    {(
                      [
                        "draft",
                        "active",
                      ] as const
                    ).map((status) => {
                      const active =
                        form.status ===
                        status;

                      return (
                        <button
                          key={status}
                          type="button"
                          onClick={() =>
                            updateField(
                              "status",
                              status,
                            )
                          }
                          className={[
                            "rounded-xl border px-3 py-2.5 text-sm font-medium capitalize transition",
                            active
                              ? "border-black bg-black text-white"
                              : "border-black/10 bg-white text-black/60 hover:border-black/20",
                          ].join(" ")}
                        >
                          {status}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Featured */}

                <button
                  type="button"
                  onClick={() =>
                    updateField(
                      "featured",
                      !form.featured,
                    )
                  }
                  className="flex w-full items-center justify-between rounded-xl border border-black/10 p-3.5 text-left transition hover:bg-black/[0.02]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-black/[0.04]">
                      <Star className="h-4 w-4" />
                    </div>

                    <div>
                      <p className="text-sm font-medium">
                        Featured FAQ
                      </p>

                      <p className="text-xs text-black/40">
                        Highlight this FAQ
                      </p>
                    </div>
                  </div>

                  <span
                    className={[
                      "flex h-6 w-11 items-center rounded-full p-1 transition",
                      form.featured
                        ? "bg-black"
                        : "bg-black/10",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "h-4 w-4 rounded-full bg-white shadow-sm transition",
                        form.featured
                          ? "translate-x-5"
                          : "translate-x-0",
                      ].join(" ")}
                    />
                  </span>
                </button>

                {/* Display Order */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-black/75">
                    Display Order
                  </label>

                  <input
                    type="number"
                    min={0}
                    value={
                      form.displayOrder
                    }
                    onChange={(event) =>
                      updateField(
                        "displayOrder",
                        Number(
                          event.target.value,
                        ),
                      )
                    }
                    className={[
                      "w-full rounded-xl border px-4 py-3 text-sm outline-none",
                      fieldError(
                        "displayOrder",
                      )
                        ? "border-red-400"
                        : "border-black/10 focus:border-black/30",
                    ].join(" ")}
                  />

                  <p className="mt-1.5 text-xs text-black/40">
                    Lower numbers appear first.
                  </p>
                </div>
              </div>
            </section>

            {/* =================================================
                SUMMARY
            ================================================= */}

            <section className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
              <div className="mb-4">
                <h2 className="text-base font-semibold text-[#171717]">
                  Summary
                </h2>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-black/45">
                    Scope
                  </span>

                  <span className="font-medium text-black/75">
                    {selectedScopeLabel}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-black/45">
                    Status
                  </span>

                  <span className="font-medium capitalize text-black/75">
                    {form.status}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-black/45">
                    Featured
                  </span>

                  <span className="font-medium text-black/75">
                    {form.featured
                      ? "Yes"
                      : "No"}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-black/45">
                    Order
                  </span>

                  <span className="font-medium text-black/75">
                    {form.displayOrder}
                  </span>
                </div>
              </div>
            </section>

            {/* =================================================
                ACTIONS
            ================================================= */}

            <section className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
              <button
                type="submit"
                disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-black px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-black/85 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Creating FAQ...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Create FAQ
                  </>
                )}
              </button>

              <button
                type="button"
                disabled={submitting}
                onClick={() =>
                  router.push("/admin/faqs")
                }
                className="mt-2 w-full rounded-xl border border-black/10 px-4 py-3 text-sm font-medium text-black/60 transition hover:bg-black/[0.03]"
              >
                Cancel
              </button>
            </section>
          </aside>
        </form>
      </div>
    </div>
  );
}