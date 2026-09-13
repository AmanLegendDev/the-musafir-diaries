"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  CheckCircle2,
  Globe2,
  Loader2,
  Save,
} from "lucide-react";
import { toast } from "sonner";

interface FormValues {
  name: string;
  slug: string;
  description: string;
  displayOrder: number;
  status: "active" | "inactive";
  seoTitle: string;
  seoDescription: string;
}

interface Props {
  mode: "create" | "edit";
  categoryId?: string;
  defaultValues?: Partial<FormValues>;
}

const EMPTY: FormValues = {
  name: "",
  slug: "",
  description: "",
  displayOrder: 1,
  status: "active",
  seoTitle: "",
  seoDescription: "",
};

function generateSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-");
}

export default function CategoryForm({
  mode,
  categoryId,
  defaultValues,
}: Props) {
  const [form, setForm] =
    useState<FormValues>({
      ...EMPTY,
      ...defaultValues,
    });

  const [errors, setErrors] = useState<
    Record<string, string>
  >({});

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (defaultValues) {
      setForm({
        ...EMPTY,
        ...defaultValues,
      });
    }
  }, [defaultValues]);

  function update(
    field: keyof FormValues,
    value: string | number
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => ({
      ...current,
      [field]: "",
    }));
  }

  function handleNameChange(value: string) {
    setForm((current) => ({
      ...current,
      name: value,
      slug: generateSlug(value),
    }));

    setErrors((current) => ({
      ...current,
      name: "",
    }));
  }

  function validate() {
    const nextErrors: Record<
      string,
      string
    > = {};

    if (form.name.trim().length < 2) {
      nextErrors.name =
        "Category name must contain at least 2 characters.";
    }

    if (form.slug.trim().length < 2) {
      nextErrors.slug =
        "A valid slug is required.";
    }

    if (form.displayOrder < 0) {
      nextErrors.displayOrder =
        "Display order cannot be negative.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(
    event: React.FormEvent
  ) {
    event.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      const endpoint =
        mode === "edit"
          ? `/api/categories/${categoryId}`
          : "/api/categories";

      const response = await fetch(endpoint, {
        method:
          mode === "edit" ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Unable to save category."
        );
      }

      toast.success(
        mode === "edit"
          ? "Category updated successfully."
          : "Category created successfully."
      );

      window.location.href =
        mode === "edit"
          ? `/admin/categories`
          : "/admin/categories";
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* BASIC */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <SectionHeader
          icon={<Globe2 className="h-5 w-5" />}
          title="Category Information"
          description="Define the category identity and description."
        />

        <div className="space-y-5 p-5 sm:p-6">
          <div className="grid gap-5 md:grid-cols-2">
            <Field
              label="Category Name"
              required
              error={errors.name}
            >
              <input
                value={form.name}
                onChange={(event) =>
                  handleNameChange(
                    event.target.value
                  )
                }
                placeholder="Adventure Tours"
                className={inputClass(
                  Boolean(errors.name)
                )}
              />
            </Field>

            <Field
              label="Slug"
              required
              error={errors.slug}
            >
              <input
                value={form.slug}
                readOnly
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 text-sm text-slate-500 outline-none"
              />

              <p className="mt-1.5 text-[11px] text-slate-400">
                Automatically generated from the
                category name.
              </p>
            </Field>
          </div>

          <Field
            label="Description"
            error={errors.description}
          >
            <textarea
              value={form.description}
              onChange={(event) =>
                update(
                  "description",
                  event.target.value
                )
              }
              rows={6}
              placeholder="Describe what type of travel packages belong to this category..."
              className={textareaClass(
                Boolean(errors.description)
              )}
            />
          </Field>
        </div>
      </section>

      {/* SETTINGS */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <SectionHeader
          icon={
            <CheckCircle2 className="h-5 w-5" />
          }
          title="Publishing Settings"
          description="Control category visibility and ordering."
        />

        <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">
          <Field
            label="Display Order"
            error={errors.displayOrder}
          >
            <input
              type="number"
              min="0"
              value={form.displayOrder}
              onChange={(event) =>
                update(
                  "displayOrder",
                  Number(event.target.value)
                )
              }
              className={inputClass(
                Boolean(errors.displayOrder)
              )}
            />
          </Field>

          <Field label="Status">
            <select
              value={form.status}
              onChange={(event) =>
                update(
                  "status",
                  event.target.value as
                    | "active"
                    | "inactive"
                )
              }
              className={inputClass(false)}
            >
              <option value="active">
                Active
              </option>

              <option value="inactive">
                Inactive
              </option>
            </select>
          </Field>
        </div>
      </section>

      {/* SEO */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <SectionHeader
          icon={<Globe2 className="h-5 w-5" />}
          title="Search Engine Optimization"
          description="Configure metadata for search engines and social sharing."
        />

        <div className="space-y-5 p-5 sm:p-6">
          <Field label="SEO Title">
            <input
              value={form.seoTitle}
              onChange={(event) =>
                update(
                  "seoTitle",
                  event.target.value
                )
              }
              placeholder="Adventure Tours | The Musafir Diaries"
              className={inputClass(false)}
            />
          </Field>

          <Field label="SEO Description">
            <textarea
              value={form.seoDescription}
              onChange={(event) =>
                update(
                  "seoDescription",
                  event.target.value
                )
              }
              rows={5}
              placeholder="Explore curated adventure travel experiences..."
              className={textareaClass(false)}
            />
          </Field>
        </div>
      </section>

      {/* SAVE BAR */}
      <div className="sticky bottom-4 z-20 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-xl shadow-slate-900/10 backdrop-blur">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="hidden h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 sm:flex">
              <CheckCircle2 className="h-4 w-4" />
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-800">
                {mode === "edit"
                  ? "Update Category"
                  : "Create Category"}
              </p>

              <p className="text-xs text-slate-400">
                Review your information before
                saving.
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <Link
              href="/admin/categories"
              className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#071A33] px-6 text-xs font-semibold text-white transition hover:bg-[#0D2747] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  {mode === "edit"
                    ? "Save Changes"
                    : "Create Category"}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

function SectionHeader({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4 border-b border-slate-100 px-5 py-5 sm:px-6">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1597C7]/10 text-[#1597C7]">
        {icon}
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
          <span className="ml-1 text-rose-500">
            *
          </span>
        )}
      </label>

      {children}

      {error && (
        <p className="mt-1.5 flex items-center gap-1 text-[11px] font-medium text-rose-600">
          <AlertCircle className="h-3 w-3" />
          {error}
        </p>
      )}
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