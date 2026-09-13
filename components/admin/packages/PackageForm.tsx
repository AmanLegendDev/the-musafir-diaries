"use client";

import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Check,
  ChevronDown,
  Image as ImageIcon,
  Loader2,
  Plus,
  Save,
  Trash2,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { packageSchema } from "@/lib/validations/package";

type FormValues = {
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  category: string;
  destination: string;
  heroImage: string;
  gallery: string[];
  duration: string;
  difficulty: "easy" | "moderate" | "difficult";
  groupSize: string;
  originalPrice: number;
  discountedPrice: number;
  childPolicy: {
    complimentaryBelow: number;
    halfPriceBelow: number;
    halfPricePercentage: number;
  };
  highlights: string[];
  included: string[];
  excluded: string[];
  itinerary: {
    day: number;
    title: string;
    description: string;
  }[];
  seoTitle: string;
  seoDescription: string;
  featured: boolean;
  status: "active" | "inactive";
};

interface Option {
  _id: string;
  name: string;
}

interface Props {
  mode: "create" | "edit";
  packageId?: string;
  defaultValues?: Partial<FormValues>;
}

const emptyValues: FormValues = {
  name: "",
  slug: "",
  shortDescription: "",
  description: "",
  category: "",
  destination: "",
  heroImage: "",
  gallery: [],
  duration: "",
  difficulty: "easy",
  groupSize: "",
  originalPrice: 0,
  discountedPrice: 0,
  childPolicy: {
    complimentaryBelow: 5,
    halfPriceBelow: 10,
    halfPricePercentage: 50,
  },
  highlights: [],
  included: [],
  excluded: [],
  itinerary: [],
  seoTitle: "",
  seoDescription: "",
  featured: false,
  status: "active",
};

export default function PackageForm({
  mode,
  packageId,
  defaultValues,
}: Props) {
  const [destinations, setDestinations] = useState<Option[]>([]);
  const [categories, setCategories] = useState<Option[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [saving, setSaving] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(packageSchema),
    defaultValues: {
      ...emptyValues,
      ...defaultValues,
    },
    mode: "onBlur",
  });

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty },
  } = form;

  const [gallery, setGallery] = useState<string[]>(
    defaultValues?.gallery ?? emptyValues.gallery,
  );
  const [highlights, setHighlights] = useState<string[]>(
    defaultValues?.highlights ?? emptyValues.highlights,
  );
  const [included, setIncluded] = useState<string[]>(
    defaultValues?.included ?? emptyValues.included,
  );
  const [excluded, setExcluded] = useState<string[]>(
    defaultValues?.excluded ?? emptyValues.excluded,
  );

  const appendGallery = () => setGallery((current) => [...current, ""]);
  const removeGallery = (index: number) =>
    setGallery((current) =>
      current.filter((_, itemIndex) => itemIndex !== index),
    );

  const appendHighlight = () =>
    setHighlights((current) => [...current, ""]);
  const removeHighlight = (index: number) =>
    setHighlights((current) =>
      current.filter((_, itemIndex) => itemIndex !== index),
    );

  const appendIncluded = () =>
    setIncluded((current) => [...current, ""]);
  const removeIncluded = (index: number) =>
    setIncluded((current) =>
      current.filter((_, itemIndex) => itemIndex !== index),
    );

  const appendExcluded = () =>
    setExcluded((current) => [...current, ""]);
  const removeExcluded = (index: number) =>
    setExcluded((current) =>
      current.filter((_, itemIndex) => itemIndex !== index),
    );

  const {
    fields: itineraryFields,
    append: appendItinerary,
    remove: removeItinerary,
  } = useFieldArray({
    control,
    name: "itinerary",
  });

  const heroImage = watch("heroImage");

  useEffect(() => {
    async function loadOptions() {
      try {
        const [destinationResponse, categoryResponse] =
          await Promise.all([
            fetch("/api/destinations"),
            fetch("/api/categories"),
          ]);

        if (destinationResponse.ok) {
          const destinationResult =
            await destinationResponse.json();

          const destinationData =
            destinationResult.data ??
            destinationResult.destinations ??
            [];

          setDestinations(destinationData);
        }

        if (categoryResponse.ok) {
          const categoryResult =
            await categoryResponse.json();

          const categoryData =
            categoryResult.data ??
            categoryResult.categories ??
            [];

          setCategories(categoryData);
        }
      } catch (error) {
        console.error(
          "Failed to load package options:",
          error
        );
      } finally {
        setLoadingOptions(false);
      }
    }

    loadOptions();
  }, []);

  useEffect(() => {
    if (defaultValues) {
      reset({
        ...emptyValues,
        ...defaultValues,
      });

      setGallery(defaultValues.gallery ?? []);
      setHighlights(defaultValues.highlights ?? []);
      setIncluded(defaultValues.included ?? []);
      setExcluded(defaultValues.excluded ?? []);
    }
  }, [defaultValues, reset]);

  async function onSubmit(values: FormValues) {
    try {
      setSaving(true);

      const submitValues: FormValues = {
        ...values,
        gallery,
        highlights,
        included,
        excluded,
      };

      const url =
        mode === "edit"
          ? `/api/packages/${packageId}`
          : "/api/packages";

      const response = await fetch(url, {
        method: mode === "edit" ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitValues),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to save package."
        );
      }

      toast.success(
        mode === "edit"
          ? "Package updated successfully."
          : "Package created successfully."
      );

      window.location.href =
        mode === "edit"
          ? `/admin/packages/${packageId}`
          : "/admin/packages";
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setSaving(false);
    }
  }

  function addItineraryDay() {
    appendItinerary({
      day: itineraryFields.length + 1,
      title: "",
      description: "",
    });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      {/* BASICS */}
      <FormSection
        number="01"
        title="Package Basics"
        description="The core information visitors will see about this package."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <Field
            label="Package Name"
            required
            error={errors.name?.message}
          >
            <input
              {...register("name")}
              placeholder="e.g. Shimla Heritage Escape"
              className={inputClass(
                Boolean(errors.name)
              )}
            />
          </Field>

          <Field
            label="Slug"
            required
            error={errors.slug?.message}
          >
            <input
              {...register("slug")}
              placeholder="shimla-heritage-escape"
              className={inputClass(
                Boolean(errors.slug)
              )}
            />
          </Field>
        </div>

        <Field
          label="Short Description"
          error={errors.shortDescription?.message}
        >
          <textarea
            {...register("shortDescription")}
            rows={3}
            placeholder="A concise description for package cards and previews..."
            className={textareaClass(
              Boolean(errors.shortDescription)
            )}
          />
        </Field>

        <Field
          label="Full Description"
          error={errors.description?.message}
        >
          <textarea
            {...register("description")}
            rows={7}
            placeholder="Describe the complete travel experience..."
            className={textareaClass(
              Boolean(errors.description)
            )}
          />
        </Field>
      </FormSection>

      {/* DESTINATION */}
      <FormSection
        number="02"
        title="Destination & Experience"
        description="Connect this package to the correct destination and define the trip characteristics."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <SelectField
            label="Destination"
            required
            {...register("destination")}
            error={errors.destination?.message}
            disabled={loadingOptions}
          >
            <option value="">
              {loadingOptions
                ? "Loading destinations..."
                : "Select destination"}
            </option>

            {destinations.map((item) => (
              <option
                key={item._id}
                value={item._id}
              >
                {item.name}
              </option>
            ))}
          </SelectField>

          <SelectField
            label="Category"
            required
            {...register("category")}
            error={errors.category?.message}
            disabled={loadingOptions}
          >
            <option value="">
              {loadingOptions
                ? "Loading categories..."
                : "Select category"}
            </option>

            {categories.map((item) => (
              <option
                key={item._id}
                value={item._id}
              >
                {item.name}
              </option>
            ))}
          </SelectField>

          <Field
            label="Duration"
            error={errors.duration?.message}
          >
            <input
              {...register("duration")}
              placeholder="5 Days / 4 Nights"
              className={inputClass(
                Boolean(errors.duration)
              )}
            />
          </Field>

          <Field
            label="Group Size"
            error={errors.groupSize?.message}
          >
            <input
              {...register("groupSize")}
              placeholder="2–12 Guests"
              className={inputClass(
                Boolean(errors.groupSize)
              )}
            />
          </Field>

          <SelectField
            label="Difficulty"
            {...register("difficulty")}
            error={errors.difficulty?.message}
          >
            <option value="easy">Easy</option>
            <option value="moderate">Moderate</option>
            <option value="difficult">Difficult</option>
          </SelectField>
        </div>
      </FormSection>

      {/* PRICING */}
      <FormSection
        number="03"
        title="Pricing"
        description="Set the displayed package pricing and promotional discount."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <Field
            label="Original Price"
            required
            error={errors.originalPrice?.message}
          >
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                ₹
              </span>

              <input
                type="number"
                min="0"
                {...register("originalPrice", {
                  valueAsNumber: true,
                })}
                className={`${inputClass(
                  Boolean(errors.originalPrice)
                )} pl-8`}
              />
            </div>
          </Field>

          <Field
            label="Discounted Price"
            required
            error={errors.discountedPrice?.message}
          >
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                ₹
              </span>

              <input
                type="number"
                min="0"
                {...register("discountedPrice", {
                  valueAsNumber: true,
                })}
                className={`${inputClass(
                  Boolean(errors.discountedPrice)
                )} pl-8`}
              />
            </div>
          </Field>
        </div>
      </FormSection>

      {/* CHILD POLICY */}
      <FormSection
        number="04"
        title="Child Policy"
        description="Configure complimentary and discounted child pricing rules."
      >
        <div className="grid gap-5 md:grid-cols-3">
          <Field label="Complimentary Below">
            <input
              type="number"
              min="0"
              {...register(
                "childPolicy.complimentaryBelow",
                { valueAsNumber: true }
              )}
              className={inputClass(false)}
            />
          </Field>

          <Field label="Half Price Below">
            <input
              type="number"
              min="0"
              {...register(
                "childPolicy.halfPriceBelow",
                { valueAsNumber: true }
              )}
              className={inputClass(false)}
            />
          </Field>

          <Field label="Half Price Percentage">
            <input
              type="number"
              min="0"
              max="100"
              {...register(
                "childPolicy.halfPricePercentage",
                { valueAsNumber: true }
              )}
              className={inputClass(false)}
            />
          </Field>
        </div>
      </FormSection>

      {/* IMAGES */}
      <FormSection
        number="05"
        title="Images"
        description="Manage the hero image and gallery used throughout the package."
      >
        <Field
          label="Hero Image URL"
          error={errors.heroImage?.message}
        >
          <input
            {...register("heroImage")}
            placeholder="https://res.cloudinary.com/..."
            className={inputClass(
              Boolean(errors.heroImage)
            )}
          />
        </Field>

        {heroImage && (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
            <img
              src={heroImage}
              alt="Hero preview"
              className="h-64 w-full object-cover"
              onError={(event) => {
                event.currentTarget.style.display =
                  "none";
              }}
            />
          </div>
        )}

        <div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-slate-800">
                Gallery Images
              </h3>

              <p className="mt-1 text-xs text-slate-400">
                Add image URLs for the package gallery.
              </p>
            </div>

            <button
              type="button"
              onClick={() => appendGallery()}
              className={secondaryButton}
            >
              <Plus className="h-4 w-4" />
              Add Image
            </button>
          </div>

          <div className="mt-4 space-y-3">
            {gallery.map((image, index) => (
              <div
                key={`gallery-${index}`}
                className="flex gap-2"
              >
                <input
                  value={image}
                  onChange={(event) => {
                    const value = event.target.value;
                    setGallery((current) =>
                      current.map((item, itemIndex) =>
                        itemIndex === index ? value : item,
                      ),
                    );
                  }}
                  placeholder="https://res.cloudinary.com/..."
                  className={inputClass(false)}
                />

                <button
                  type="button"
                  onClick={() => removeGallery(index)}
                  className={iconDangerButton}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}

            {gallery.length === 0 && (
              <EmptyArray text="No gallery images added yet." />
            )}
          </div>
        </div>
      </FormSection>

      {/* HIGHLIGHTS */}
      <FormSection
        number="06"
        title="Highlights"
        description="Showcase the most important reasons to choose this package."
      >
        <DynamicStringList
          fields={highlights.map((_, index) => ({
            id: `highlight-${index}`,
          }))}
          values={highlights}
          onChange={setHighlights}
          name="highlights"
          append={appendHighlight}
          remove={removeHighlight}
          placeholder="e.g. Private Himalayan sightseeing"
          addLabel="Add Highlight"
        />
      </FormSection>

      {/* INCLUDED / EXCLUDED */}
      <FormSection
        number="07"
        title="Included & Excluded"
        description="Clearly define what is and isn't included in the package."
      >
        <div className="grid gap-8 lg:grid-cols-2">
          <DynamicStringList
            title="What's Included"
            fields={included.map((_, index) => ({
              id: `included-${index}`,
            }))}
            values={included}
            onChange={setIncluded}
            name="included"
            append={appendIncluded}
            remove={removeIncluded}
            placeholder="e.g. Breakfast & dinner"
            addLabel="Add Included Item"
            positive
          />

          <DynamicStringList
            title="What's Excluded"
            fields={excluded.map((_, index) => ({
              id: `excluded-${index}`,
            }))}
            values={excluded}
            onChange={setExcluded}
            name="excluded"
            append={appendExcluded}
            remove={removeExcluded}
            placeholder="e.g. Personal expenses"
            addLabel="Add Excluded Item"
          />
        </div>
      </FormSection>

      {/* ITINERARY */}
      <FormSection
        number="08"
        title="Day-by-Day Itinerary"
        description="Build the complete journey one day at a time."
      >
        <div className="space-y-4">
          {itineraryFields.map((field, index) => (
            <div
              key={field.id}
              className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#071A33] text-xs font-bold text-white">
                    D{index + 1}
                  </div>

                  <p className="text-sm font-semibold text-slate-800">
                    Day {index + 1}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => removeItinerary(index)}
                  className="rounded-lg p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <Field label="Day Number">
                  <input
                    type="number"
                    min="1"
                    {...register(
                      `itinerary.${index}.day`,
                      {
                        valueAsNumber: true,
                      }
                    )}
                    className={inputClass(false)}
                  />
                </Field>

                <Field label="Title">
                  <input
                    {...register(
                      `itinerary.${index}.title`
                    )}
                    placeholder="Arrival & Shimla exploration"
                    className={inputClass(false)}
                  />
                </Field>
              </div>

              <div className="mt-4">
                <Field label="Description">
                  <textarea
                    {...register(
                      `itinerary.${index}.description`
                    )}
                    rows={4}
                    placeholder="Describe what happens on this day..."
                    className={textareaClass(false)}
                  />
                </Field>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addItineraryDay}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-300 py-4 text-xs font-semibold text-slate-500 transition hover:border-[#1597C7] hover:bg-[#1597C7]/5 hover:text-[#1597C7]"
          >
            <Plus className="h-4 w-4" />
            Add Itinerary Day
          </button>
        </div>
      </FormSection>

      {/* SEO */}
      <FormSection
        number="09"
        title="SEO"
        description="Control how this package appears in search engines."
      >
        <Field
          label="SEO Title"
          error={errors.seoTitle?.message}
        >
          <input
            {...register("seoTitle")}
            placeholder="Shimla Heritage Escape | The Musafir Diaries"
            className={inputClass(
              Boolean(errors.seoTitle)
            )}
          />
        </Field>

        <Field
          label="SEO Description"
          error={errors.seoDescription?.message}
        >
          <textarea
            {...register("seoDescription")}
            rows={4}
            placeholder="Discover our curated Shimla heritage experience..."
            className={textareaClass(
              Boolean(errors.seoDescription)
            )}
          />
        </Field>
      </FormSection>

      {/* PUBLISHING */}
      <FormSection
        number="10"
        title="Publishing"
        description="Control the package's visibility across the website."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/50 p-4">
            <div>
              <p className="text-sm font-semibold text-slate-800">
                Featured Package
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Highlight this package on the website.
              </p>
            </div>

            <input
              type="checkbox"
              {...register("featured")}
              className="h-4 w-4 accent-[#1597C7]"
            />
          </label>

          <Field label="Status">
            <select
              {...register("status")}
              className={inputClass(false)}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </Field>
        </div>
      </FormSection>

      {/* SAVE */}
      <div className="sticky bottom-4 z-20 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-2xl shadow-slate-900/10 backdrop-blur">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-800">
              {mode === "edit"
                ? "Ready to update?"
                : "Ready to publish?"}
            </p>

            <p className="text-xs text-slate-400">
              {isDirty
                ? "You have unsaved changes."
                : "Review your information before saving."}
            </p>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#071A33] px-6 text-sm font-semibold text-white transition hover:bg-[#0D2747] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                {mode === "edit"
                  ? "Save Changes"
                  : "Create Package"}
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

/* ---------------- HELPERS ---------------- */

function FormSection({
  number,
  title,
  description,
  children,
}: {
  number: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-5 py-5 sm:px-6">
        <div className="flex gap-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#1597C7]/10 text-xs font-bold text-[#1597C7]">
            {number}
          </div>

          <div>
            <h2 className="text-base font-bold text-[#071A33]">
              {title}
            </h2>

            <p className="mt-1 text-xs leading-5 text-slate-400">
              {description}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-5 p-5 sm:p-6">
        {children}
      </div>
    </section>
  );
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold text-slate-700">
        {label}
        {required && (
          <span className="ml-1 text-rose-500">*</span>
        )}
      </label>

      {children}

      {error && (
        <p className="mt-1.5 text-[11px] font-medium text-rose-600">
          {error}
        </p>
      )}
    </div>
  );
}

function SelectField({
  label,
  required,
  error,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <Field
      label={label}
      required={required}
      error={error}
    >
      <div className="relative">
        <select
          {...props}
          className={`${inputClass(
            Boolean(error)
          )} appearance-none pr-10`}
        >
          {children}
        </select>

        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      </div>
    </Field>
  );
}

function DynamicStringList({
  title,
  fields,
  values,
  onChange,
  name,
  append,
  remove,
  placeholder,
  addLabel,
  positive,
}: {
  title?: string;
  fields: { id: string }[];
  values: string[];
  onChange: React.Dispatch<React.SetStateAction<string[]>>;
  name: "highlights" | "included" | "excluded";
  append: () => void;
  remove: (index: number) => void;
  placeholder: string;
  addLabel: string;
  positive?: boolean;
}) {
  return (
    <div>
      {title && (
        <h3 className="mb-3 text-sm font-semibold text-slate-800">
          {title}
        </h3>
      )}

      <div className="space-y-3">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex gap-2"
          >
            <div className="relative flex-1">
              {positive && (
                <Check className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-500" />
              )}

              <input
                value={values[index] ?? ""}
                onChange={(event) => {
                  const value = event.target.value;
                  onChange((current) =>
                    current.map((item, itemIndex) =>
                      itemIndex === index ? value : item,
                    ),
                  );
                }}
                placeholder={placeholder}
                className={`${inputClass(false)} ${
                  positive ? "pl-9" : ""
                }`}
                name={`${name}.${index}`}
              />
            </div>

            <button
              type="button"
              onClick={() => remove(index)}
              className={iconDangerButton}
              aria-label={`Remove ${name} item ${index + 1}`}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}

        {fields.length === 0 && (
          <EmptyArray text="No items added yet." />
        )}
      </div>

      <button
        type="button"
        onClick={append}
        className="mt-3 inline-flex h-9 items-center gap-2 rounded-lg border border-slate-200 px-3 text-xs font-semibold text-slate-600 transition hover:border-[#1597C7]/30 hover:bg-[#1597C7]/5 hover:text-[#1597C7]"
      >
        <Plus className="h-3.5 w-3.5" />
        {addLabel}
      </button>
    </div>
  );
}

function EmptyArray({ text }: { text: string }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-200 py-6 text-center text-xs text-slate-400">
      {text}
    </div>
  );
}

function inputClass(error: boolean) {
  return `h-11 w-full rounded-xl border ${
    error
      ? "border-rose-300 bg-rose-50/30"
      : "border-slate-200 bg-white"
  } px-3.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-300 focus:border-[#1597C7] focus:ring-4 focus:ring-[#1597C7]/10`;
}

function textareaClass(error: boolean) {
  return `w-full rounded-xl border ${
    error
      ? "border-rose-300 bg-rose-50/30"
      : "border-slate-200 bg-white"
  } px-3.5 py-3 text-sm leading-6 text-slate-800 outline-none transition placeholder:text-slate-300 focus:border-[#1597C7] focus:ring-4 focus:ring-[#1597C7]/10`;
}

const secondaryButton =
  "inline-flex h-9 items-center gap-2 rounded-lg border border-slate-200 px-3 text-xs font-semibold text-slate-600 transition hover:border-[#1597C7]/30 hover:bg-[#1597C7]/5 hover:text-[#1597C7]";

const iconDangerButton =
  "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-400 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600";