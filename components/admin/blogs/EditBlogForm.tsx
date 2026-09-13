"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  ArrowLeft,
  Check,
  FileText,
  Globe2,
  Loader2,
  Save,
  Sparkles,
  Star,
  Tag,
  UserRound,
  X,
} from "lucide-react";

import CloudinaryUploader from "@/components/admin/shared/CloudinaryUploader";
import Editor from "@/components/editor/Editor";

interface Category {
  _id: string;
  name: string;
}

interface BlogData {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category:
    | Category
    | string
    | null;
  author: string;
  tags: string[];
  readTime: number;
  seoTitle?: string;
  seoDescription?: string;
  featured: boolean;
  status: "draft" | "published";
  publishedAt?: string | null;
}

interface Props {
  blog: BlogData;
}

interface FormState {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: string;
  author: string;
  tags: string[];
  readTime: number | "";
  seoTitle: string;
  seoDescription: string;
  featured: boolean;
}

type FieldErrors = Partial<
  Record<keyof FormState, string>
>;

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function estimateReadTime(text: string) {
  const words = text
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(
    1,
    Math.round(words / 200)
  );
}

function getCategoryId(
  category: BlogData["category"]
) {
  if (!category) return "";

  if (typeof category === "string") {
    return category;
  }

  return category._id;
}

export default function EditBlogForm({
  blog,
}: Props) {
  const router = useRouter();

  const [form, setForm] =
    useState<FormState>({
      title: blog.title || "",
      slug: blog.slug || "",
      excerpt: blog.excerpt || "",
      content: blog.content || "",
      featuredImage:
        blog.featuredImage || "",
      category: getCategoryId(
        blog.category
      ),
      author:
        blog.author || "Altitude Escapes",
      tags: blog.tags || [],
      readTime:
        blog.readTime || "",
      seoTitle:
        blog.seoTitle || "",
      seoDescription:
        blog.seoDescription || "",
      featured:
        Boolean(blog.featured),
    });

  const [categories, setCategories] =
    useState<Category[]>([]);

  const [categoriesLoading, setCategoriesLoading] =
    useState(true);

  const [categoriesFailed, setCategoriesFailed] =
    useState(false);

  const [slugTouched, setSlugTouched] =
    useState(true);

  const [tagInput, setTagInput] =
    useState("");

  const [errors, setErrors] =
    useState<FieldErrors>({});

  const [saving, setSaving] =
    useState<"draft" | "published" | null>(
      null
    );

  const [banner, setBanner] =
    useState<{
      type: "success" | "error";
      text: string;
    } | null>(null);

  /* =========================
     LOAD CATEGORIES
  ========================= */

  useEffect(() => {
    let cancelled = false;

    async function loadCategories() {
      try {
        const response = await fetch(
          "/api/categories"
        );

        if (!response.ok) {
          throw new Error(
            "Failed to load categories."
          );
        }

        const result =
          await response.json();

        const list: Category[] =
          Array.isArray(result)
            ? result
            : result.categories || [];

        if (!cancelled) {
          setCategories(list);
        }
      } catch {
        if (!cancelled) {
          setCategoriesFailed(true);
        }
      } finally {
        if (!cancelled) {
          setCategoriesLoading(false);
        }
      }
    }

    loadCategories();

    return () => {
      cancelled = true;
    };
  }, []);

  /* =========================
     FIELD UPDATE
  ========================= */

  const updateField = useCallback(
    <K extends keyof FormState>(
      key: K,
      value: FormState[K]
    ) => {
      setForm((previous) => ({
        ...previous,
        [key]: value,
      }));

      setErrors((previous) => ({
        ...previous,
        [key]: undefined,
      }));
    },
    []
  );

  /* =========================
     TITLE
  ========================= */

  const handleTitleChange = (
    value: string
  ) => {
    updateField("title", value);

    if (!slugTouched) {
      updateField(
        "slug",
        slugify(value)
      );
    }
  };

  /* =========================
     TAGS
  ========================= */

  const addTag = () => {
    const value = tagInput
      .trim()
      .replace(/,$/, "");

    if (!value) return;

    if (!form.tags.includes(value)) {
      updateField("tags", [
        ...form.tags,
        value,
      ]);
    }

    setTagInput("");
  };

  const removeTag = (tag: string) => {
    updateField(
      "tags",
      form.tags.filter(
        (item) => item !== tag
      )
    );
  };

  const onTagKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (
      event.key === "Enter" ||
      event.key === ","
    ) {
      event.preventDefault();
      addTag();
      return;
    }

    if (
      event.key === "Backspace" &&
      !tagInput &&
      form.tags.length
    ) {
      removeTag(
        form.tags[form.tags.length - 1]
      );
    }
  };

  /* =========================
     AUTO READ TIME
  ========================= */

  const handleAutoReadTime = () => {
    const plainText =
      form.content.replace(
        /<[^>]*>/g,
        " "
      );

    updateField(
      "readTime",
      estimateReadTime(plainText)
    );
  };

  /* =========================
     VALIDATION
  ========================= */

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};

    if (!form.title.trim()) {
      next.title =
        "Blog title is required.";
    }

    if (!form.slug.trim()) {
      next.slug =
        "Blog slug is required.";
    }

    if (!form.excerpt.trim()) {
      next.excerpt =
        "Excerpt is required.";
    }

    const cleanContent =
      form.content
        .replace(/<[^>]*>/g, "")
        .trim();

    if (!cleanContent) {
      next.content =
        "Blog content cannot be empty.";
    }

    if (!form.featuredImage.trim()) {
      next.featuredImage =
        "Featured image is required.";
    }

    if (!form.category) {
      next.category =
        "Please select a category.";
    }

    if (
      !form.readTime ||
      Number(form.readTime) < 1
    ) {
      next.readTime =
        "Read time must be at least 1 minute.";
    }

    return next;
  };

  /* =========================
     UPDATE
  ========================= */

  const handleUpdate = async (
    status: "draft" | "published"
  ) => {
    const validation = validate();

    setErrors(validation);

    if (
      Object.keys(validation).length > 0
    ) {
      setBanner({
        type: "error",
        text: "Please complete the highlighted fields.",
      });

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    setSaving(status);
    setBanner(null);

    try {
      const response = await fetch(
        `/api/blogs/${blog._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            ...form,
            readTime: Number(
              form.readTime
            ),
            status,
          }),
        }
      );

      const result =
        await response.json();

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message ||
            "Failed to update blog."
        );
      }

      setBanner({
        type: "success",
        text:
          status === "published"
            ? "Blog updated & published successfully."
            : "Blog saved as draft successfully.",
      });

      setTimeout(() => {
        router.push("/admin/blogs");
        router.refresh();
      }, 900);
    } catch (error) {
      setBanner({
        type: "error",
        text:
          error instanceof Error
            ? error.message
            : "Something went wrong.",
      });
    } finally {
      setSaving(null);
    }
  };

  /* =========================
     RENDER
  ========================= */

  return (
    <div className="min-h-screen bg-[#F6F8FB]">
      {/* ================= HEADER ================= */}

      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <div className="min-w-0">
            <Link
              href="/admin/blogs"
              className="mb-1 inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 transition hover:text-[#1597C7]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Blogs
            </Link>

            <div className="flex items-center gap-2">
              <h1 className="truncate text-lg font-bold text-[#071A33] sm:text-xl">
                Edit Story
              </h1>

              <StatusBadge
                status={blog.status}
              />
            </div>
          </div>

          {/* Desktop actions */}
          <div className="hidden items-center gap-2 sm:flex">
            <button
              type="button"
              onClick={() =>
                handleUpdate("draft")
              }
              disabled={saving !== null}
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-[#071A33]/15 bg-white px-4 text-xs font-semibold text-[#071A33] transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving === "draft" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}

              {saving === "draft"
                ? "Saving..."
                : "Save Draft"}
            </button>

            <button
              type="button"
              onClick={() =>
                handleUpdate("published")
              }
              disabled={saving !== null}
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#071A33] px-5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#0D2747] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ===
              "published" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Check className="h-4 w-4" />
              )}

              {saving === "published"
                ? "Updating..."
                : "Update & Publish"}
            </button>
          </div>
        </div>
      </header>

      {/* ================= BANNER ================= */}

      {banner && (
        <div className="mx-auto max-w-7xl px-4 pt-5 sm:px-6 lg:px-8">
          <div
            className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm ${
              banner.type === "success"
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border-rose-200 bg-rose-50 text-rose-700"
            }`}
          >
            {banner.type ===
            "success" ? (
              <Check className="h-4 w-4 shrink-0" />
            ) : (
              <X className="h-4 w-4 shrink-0" />
            )}

            <span>
              {banner.text}
            </span>
          </div>
        </div>
      )}

      {/* ================= MAIN ================= */}

      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_350px] lg:px-8 lg:py-8">
        {/* =====================================================
            MAIN COLUMN
        ===================================================== */}

        <section className="space-y-6">
          {/* TITLE */}
          <Card>
            <SectionHeading
              icon={
                <FileText className="h-4 w-4" />
              }
              title="Story Details"
              description="Shape the title and URL of your travel story."
            />

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Title
                </label>

                <textarea
                  rows={2}
                  value={form.title}
                  onChange={(event) =>
                    handleTitleChange(
                      event.target.value
                    )
                  }
                  className={`w-full resize-none rounded-2xl border bg-slate-50 px-4 py-4 text-xl font-bold leading-8 text-[#071A33] outline-none transition placeholder:text-slate-300 focus:bg-white focus:ring-4 sm:text-2xl ${
                    errors.title
                      ? "border-rose-300 focus:ring-rose-100"
                      : "border-slate-200 focus:border-[#1597C7] focus:ring-[#1597C7]/10"
                  }`}
                />

                {errors.title && (
                  <FieldError
                    text={errors.title}
                  />
                )}
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                  URL Slug
                </label>

                <div className="flex items-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50 focus-within:border-[#1597C7] focus-within:ring-4 focus-within:ring-[#1597C7]/10">
                  <span className="border-r border-slate-200 px-3 text-xs font-medium text-slate-400">
                    /blog/
                  </span>

                  <input
                    value={form.slug}
                    onChange={(event) => {
                      setSlugTouched(true);

                      updateField(
                        "slug",
                        slugify(
                          event.target.value
                        )
                      );
                    }}
                    className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm font-medium text-slate-700 outline-none"
                  />
                </div>

                {errors.slug && (
                  <FieldError
                    text={errors.slug}
                  />
                )}
              </div>
            </div>
          </Card>

          {/* EXCERPT */}
          <Card>
            <SectionHeading
              icon={
                <Sparkles className="h-4 w-4" />
              }
              title="Excerpt"
              description="A concise summary used across blog cards and previews."
            />

            <div>
              <textarea
                rows={4}
                maxLength={200}
                value={form.excerpt}
                onChange={(event) =>
                  updateField(
                    "excerpt",
                    event.target.value
                  )
                }
                className={`w-full resize-none rounded-xl border bg-slate-50 p-4 text-sm leading-6 text-slate-700 outline-none transition focus:bg-white focus:ring-4 ${
                  errors.excerpt
                    ? "border-rose-300 focus:ring-rose-100"
                    : "border-slate-200 focus:border-[#1597C7] focus:ring-[#1597C7]/10"
                }`}
              />

              <div className="mt-2 flex justify-between">
                {errors.excerpt ? (
                  <FieldError
                    text={errors.excerpt}
                  />
                ) : (
                  <span />
                )}

                <span className="text-[10px] text-slate-400">
                  {form.excerpt.length}/200
                </span>
              </div>
            </div>
          </Card>

          {/* CONTENT */}
          <Card>
            <SectionHeading
              icon={
                <FileText className="h-4 w-4" />
              }
              title="Story Content"
              description="Edit the complete article content."
            />

            <Editor
              value={form.content}
              onChange={(html) =>
                updateField(
                  "content",
                  html
                )
              }
            />

            {errors.content && (
              <FieldError
                text={errors.content}
              />
            )}
          </Card>

          {/* TAGS */}
          <Card>
            <SectionHeading
              icon={
                <Tag className="h-4 w-4" />
              }
              title="Tags"
              description="Use relevant travel keywords to organize the story."
            />

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 focus-within:border-[#1597C7] focus-within:ring-4 focus-within:ring-[#1597C7]/10">
              <div className="flex flex-wrap gap-2">
                {form.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#071A33] px-3 py-1.5 text-xs font-medium text-white"
                  >
                    {tag}

                    <button
                      type="button"
                      onClick={() =>
                        removeTag(tag)
                      }
                      className="text-white/60 transition hover:text-white"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}

                <input
                  value={tagInput}
                  onChange={(event) =>
                    setTagInput(
                      event.target.value
                    )
                  }
                  onKeyDown={
                    onTagKeyDown
                  }
                  onBlur={addTag}
                  placeholder="Type a tag and press Enter..."
                  className="min-w-[180px] flex-1 bg-transparent px-1 py-1.5 text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />
              </div>
            </div>
          </Card>
        </section>

        {/* =====================================================
            SIDEBAR
        ===================================================== */}

        <aside className="space-y-6">
          {/* IMAGE */}
          <Card>
            <SectionHeading
              icon={
                <Globe2 className="h-4 w-4" />
              }
              title="Featured Image"
              description="Main visual for the story."
            />

            <CloudinaryUploader
              multiple={false}
              value={form.featuredImage}
              onChange={(url) =>
                updateField(
                  "featuredImage",
                  url
                )
              }
            />

            {errors.featuredImage && (
              <FieldError
                text={
                  errors.featuredImage
                }
              />
            )}
          </Card>

          {/* CATEGORY */}
          <Card>
            <SectionHeading
              icon={
                <Tag className="h-4 w-4" />
              }
              title="Category"
              description="Choose where this story belongs."
            />

            <select
              value={form.category}
              onChange={(event) =>
                updateField(
                  "category",
                  event.target.value
                )
              }
              className={`w-full rounded-xl border bg-slate-50 px-3 py-3 text-sm font-medium text-slate-700 outline-none transition focus:bg-white focus:ring-4 ${
                errors.category
                  ? "border-rose-300 focus:ring-rose-100"
                  : "border-slate-200 focus:border-[#1597C7] focus:ring-[#1597C7]/10"
              }`}
            >
              <option value="">
                {categoriesLoading
                  ? "Loading categories..."
                  : "Select category"}
              </option>

              {categories.map(
                (category) => (
                  <option
                    key={category._id}
                    value={category._id}
                  >
                    {category.name}
                  </option>
                )
              )}
            </select>

            {categoriesFailed && (
              <p className="mt-2 text-xs text-amber-600">
                Unable to load categories.
              </p>
            )}

            {errors.category && (
              <FieldError
                text={errors.category}
              />
            )}
          </Card>

          {/* AUTHOR / READ TIME */}
          <Card>
            <SectionHeading
              icon={
                <UserRound className="h-4 w-4" />
              }
              title="Publishing Details"
              description="Control the author and reading experience."
            />

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-xs font-semibold text-slate-500">
                  Author
                </label>

                <input
                  value={form.author}
                  onChange={(event) =>
                    updateField(
                      "author",
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none transition focus:border-[#1597C7] focus:bg-white focus:ring-4 focus:ring-[#1597C7]/10"
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-500">
                    Read Time
                  </label>

                  <button
                    type="button"
                    onClick={
                      handleAutoReadTime
                    }
                    className="text-[10px] font-bold text-[#1597C7] hover:underline"
                  >
                    Auto-calculate
                  </button>
                </div>

                <div className="relative">
                  <input
                    type="number"
                    min={1}
                    value={form.readTime}
                    onChange={(event) =>
                      updateField(
                        "readTime",
                        event.target
                          .value === ""
                          ? ""
                          : Number(
                              event.target
                                .value
                            )
                      )
                    }
                    className={`w-full rounded-xl border bg-slate-50 px-3 py-3 pr-16 text-sm text-slate-700 outline-none transition focus:bg-white focus:ring-4 ${
                      errors.readTime
                        ? "border-rose-300 focus:ring-rose-100"
                        : "border-slate-200 focus:border-[#1597C7] focus:ring-[#1597C7]/10"
                    }`}
                  />

                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                    minutes
                  </span>
                </div>

                {errors.readTime && (
                  <FieldError
                    text={
                      errors.readTime
                    }
                  />
                )}
              </div>

              <label className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-500">
                    <Star className="h-4 w-4 fill-current" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-700">
                      Featured Story
                    </p>

                    <p className="text-[10px] text-slate-400">
                      Show prominently
                    </p>
                  </div>
                </div>

                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(event) =>
                    updateField(
                      "featured",
                      event.target
                        .checked
                    )
                  }
                  className="h-5 w-5 accent-[#F59E0B]"
                />
              </label>
            </div>
          </Card>

          {/* SEO */}
          <Card>
            <SectionHeading
              icon={
                <Globe2 className="h-4 w-4" />
              }
              title="SEO Settings"
              description="Search engine title and description."
            />

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-xs font-semibold text-slate-500">
                  SEO Title
                </label>

                <input
                  value={form.seoTitle}
                  onChange={(event) =>
                    updateField(
                      "seoTitle",
                      event.target.value
                    )
                  }
                  placeholder={
                    form.title ||
                    "Falls back to blog title"
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700 outline-none transition focus:border-[#1597C7] focus:bg-white focus:ring-4 focus:ring-[#1597C7]/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold text-slate-500">
                  SEO Description
                </label>

                <textarea
                  rows={4}
                  maxLength={160}
                  value={
                    form.seoDescription
                  }
                  onChange={(event) =>
                    updateField(
                      "seoDescription",
                      event.target.value
                    )
                  }
                  placeholder={
                    form.excerpt ||
                    "Falls back to excerpt"
                  }
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm leading-6 text-slate-700 outline-none transition focus:border-[#1597C7] focus:bg-white focus:ring-4 focus:ring-[#1597C7]/10"
                />

                <p className="mt-1 text-right text-[10px] text-slate-400">
                  {
                    form.seoDescription
                      .length
                  }
                  /160
                </p>
              </div>
            </div>
          </Card>

          {/* RECORD INFO */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
              Record
            </p>

            <div className="mt-4 space-y-3 text-xs">
              <InfoRow
                label="Blog ID"
                value={blog._id}
              />

              <InfoRow
                label="Current Status"
                value={
                  blog.status
                }
              />

              {blog.publishedAt && (
                <InfoRow
                  label="Published"
                  value={new Date(
                    blog.publishedAt
                  ).toLocaleDateString(
                    "en-IN",
                    {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    }
                  )}
                />
              )}
            </div>
          </div>
        </aside>
      </main>

      {/* ================= MOBILE ACTION BAR ================= */}

      <div className="sticky bottom-0 z-40 flex gap-2 border-t border-slate-200 bg-white/95 p-3 shadow-[0_-8px_30px_rgba(15,23,42,0.08)] backdrop-blur sm:hidden">
        <button
          type="button"
          onClick={() =>
            handleUpdate("draft")
          }
          disabled={saving !== null}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-xs font-semibold text-[#071A33] disabled:opacity-50"
        >
          {saving === "draft" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}

          Save Draft
        </button>

        <button
          type="button"
          onClick={() =>
            handleUpdate("published")
          }
          disabled={saving !== null}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#071A33] py-3 text-xs font-semibold text-white disabled:opacity-50"
        >
          {saving === "published" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Check className="h-4 w-4" />
          )}

          Update
        </button>
      </div>
    </div>
  );
}

/* ========================================================= */
/* SMALL COMPONENTS */
/* ========================================================= */

function Card({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {children}
    </div>
  );
}

function SectionHeading({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1597C7]/10 text-[#1597C7]">
          {icon}
        </div>

        <div>
          <h2 className="text-sm font-bold text-[#071A33]">
            {title}
          </h2>

          <p className="mt-0.5 text-[10px] leading-4 text-slate-400">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

function FieldError({
  text,
}: {
  text: string;
}) {
  return (
    <p className="mt-1.5 text-xs font-medium text-rose-600">
      {text}
    </p>
  );
}

function StatusBadge({
  status,
}: {
  status: "draft" | "published";
}) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider ${
        status === "published"
          ? "bg-emerald-50 text-emerald-700"
          : "bg-amber-50 text-amber-700"
      }`}
    >
      {status}
    </span>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-2 last:border-0 last:pb-0">
      <span className="text-slate-400">
        {label}
      </span>

      <span className="max-w-[190px] truncate text-right font-medium text-slate-600">
        {value}
      </span>
    </div>
  );
}