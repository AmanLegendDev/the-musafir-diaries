"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import CloudinaryUploader from "@/components/admin/shared/CloudinaryUploader";
import Editor from "@/components/editor/Editor";
/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Category {
  _id: string;
  name: string;
}

interface BlogFormState {
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

type FieldErrors = Partial<Record<keyof BlogFormState, string>>;

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function estimateReadTime(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

const initialForm: BlogFormState = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  featuredImage: "",
  category: "",
  author: "Altitude Escapes",
  tags: [],
  readTime: "",
  seoTitle: "",
  seoDescription: "",
  featured: false,
};

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function CreateBlogPage() {
  const router = useRouter();

  const [form, setForm] = useState<BlogFormState>(initialForm);
  const [slugTouched, setSlugTouched] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});

  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesFailed, setCategoriesFailed] = useState(false);
  const [saving, setSaving] = useState<"draft" | "published" | null>(null);
  const [banner, setBanner] = useState<{ type: "success" | "error"; text: string } | null>(null);


  /* -------------------------- load categories -------------------------- */

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/categories");
        if (!res.ok) throw new Error("failed");
        const data = await res.json();
        const list: Category[] = Array.isArray(data) ? data : data.categories ?? [];
        if (!cancelled) setCategories(list);
      } catch {
        if (!cancelled) setCategoriesFailed(true);
      } finally {
        if (!cancelled) setCategoriesLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  /* -------------------------- field updates -------------------------- */

  const updateField = useCallback(
    <K extends keyof BlogFormState>(key: K, value: BlogFormState[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    },
    []
  );

  const handleTitleChange = (value: string) => {
    updateField("title", value);
    if (!slugTouched) {
      updateField("slug", slugify(value));
    }
  };

  const handleSlugChange = (value: string) => {
    setSlugTouched(true);
    updateField("slug", slugify(value));
  };

const handleAutoReadTime = () => {

  const plainText =
    form.content.replace(
      /<[^>]*>/g,
      " "
    );

  updateField(
    "readTime",
    estimateReadTime(
      plainText
    )
  );
};

  /* -------------------------- tags -------------------------- */

  const addTag = () => {
    const value = tagInput.trim().replace(/,$/, "");
    if (!value) return;
    if (!form.tags.includes(value)) {
      updateField("tags", [...form.tags, value]);
    }
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    updateField(
      "tags",
      form.tags.filter((t) => t !== tag)
    );
  };

  const onTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    } else if (e.key === "Backspace" && !tagInput && form.tags.length) {
      removeTag(form.tags[form.tags.length - 1]);
    }
  };

  /* -------------------------- image upload -------------------------- */

 

  /* -------------------------- validation -------------------------- */

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};
    if (!form.title.trim()) next.title = "Title zaroori hai";
    if (!form.slug.trim()) next.slug = "Slug zaroori hai";
    if (!form.excerpt.trim()) next.excerpt = "Excerpt zaroori hai";
const cleanContent =
  form.content
    .replace(/<[^>]*>/g, "")
    .trim();

if (!cleanContent) {
  next.content =
    "Content khali nahi ho sakta";
}    if (!form.featuredImage.trim()) next.featuredImage = "Featured image lagana zaroori hai";
    if (!form.category) next.category = "Category select kar";
    if (!form.readTime || Number(form.readTime) < 1) next.readTime = "Read time kam se kam 1 min ho";
    return next;
  };

  /* -------------------------- submit -------------------------- */

  const handleSubmit = async (status: "draft" | "published") => {
    const validation = validate();
    setErrors(validation);
    if (Object.keys(validation).length > 0) {
      setBanner({ type: "error", text: "Kuch fields missing hain — neeche highlighted dekh le." });
      return;
    }

    setSaving(status);
    setBanner(null);

    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          readTime: Number(form.readTime),
          status,
          publishedAt: status === "published" ? new Date().toISOString() : null,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Save failed");
      }

      setBanner({
        type: "success",
        text: status === "published" ? "Blog publish ho gaya! 🎉" : "Draft save ho gaya.",
      });

      setTimeout(() => router.push("/admin/blogs"), 900);
    } catch (err) {
      setBanner({
        type: "error",
        text: err instanceof Error ? err.message : "Kuch galat ho gaya, dobara try kar.",
      });
    } finally {
      setSaving(null);
    }
  };

  /* ------------------------------------------------------------------ */
  /*  Render                                                             */
  /* ------------------------------------------------------------------ */

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-['Inter']">
      {/* ---------- Sticky header ---------- */}
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="min-w-0">
            <p className="text-xs font-medium text-[#64748B]">Altitude Escapes · Admin</p>
            <h1 className="truncate font-['Poppins'] text-lg font-semibold text-[#0F172A] sm:text-xl">
              New Story
            </h1>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => handleSubmit("draft")}
              disabled={saving !== null}
              className="rounded-xl border border-[#0F4C81]/20 bg-white px-3 py-2 text-sm font-medium text-[#0F4C81] transition hover:bg-[#0F4C81]/5 disabled:opacity-50 sm:px-4"
            >
              {saving === "draft" ? "Saving…" : "Save Draft"}
            </button>
            <button
              type="button"
              onClick={() => handleSubmit("published")}
              disabled={saving !== null}
              className="rounded-xl bg-[#F97316] px-3 py-2 text-sm font-semibold text-white shadow-sm shadow-orange-200 transition hover:bg-[#ea6a0d] disabled:opacity-50 sm:px-4"
            >
              {saving === "published" ? "Publishing…" : "Publish"}
            </button>
          </div>
        </div>
      </header>

      {/* ---------- Banner ---------- */}
      {banner && (
        <div className="mx-auto mt-4 max-w-6xl px-4 sm:px-6">
          <div
            className={`rounded-xl border px-4 py-3 text-sm ${
              banner.type === "success"
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border-red-200 bg-red-50 text-red-700"
            }`}
          >
            {banner.text}
          </div>
        </div>
      )}

      {/* ---------- Body ---------- */}
      <main className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[1fr_340px] lg:py-8">
        {/* ============ MAIN COLUMN ============ */}
        <section className="space-y-6">
          {/* Title */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-[#64748B]">
              Title
            </label>
            <textarea
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g. 5 Hidden Trails Around Shimla You Haven't Explored Yet"
              rows={2}
              className={`w-full resize-none border-0 border-b-2 bg-transparent font-['Poppins'] text-2xl font-semibold text-[#0F172A] outline-none placeholder:text-slate-300 sm:text-3xl ${
                errors.title ? "border-red-400" : "border-slate-100 focus:border-[#38BDF8]"
              }`}
            />
            {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}

            <div className="mt-4 flex items-center gap-2 text-sm">
              <span className="text-[#64748B]">/blog/</span>
              <input
                value={form.slug}
                onChange={(e) => handleSlugChange(e.target.value)}
                placeholder="auto-generated-from-title"
                className={`flex-1 rounded-lg border bg-slate-50 px-3 py-1.5 text-[#0F172A] outline-none focus:bg-white focus:ring-2 focus:ring-[#38BDF8]/40 ${
                  errors.slug ? "border-red-400" : "border-slate-200"
                }`}
              />
            </div>
            {errors.slug && <p className="mt-1 text-xs text-red-500">{errors.slug}</p>}
          </div>

          {/* Excerpt */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <label className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-[#64748B]">
              <span>Excerpt</span>
              <span className="font-normal normal-case text-slate-400">
                {form.excerpt.length}/200
              </span>
            </label>
            <textarea
              value={form.excerpt}
              onChange={(e) => updateField("excerpt", e.target.value.slice(0, 200))}
              placeholder="Ek do line mein — listing card aur SEO preview mein yahi dikhega."
              rows={3}
              className={`w-full resize-none rounded-xl border bg-slate-50 p-3 text-sm text-[#0F172A] outline-none focus:bg-white focus:ring-2 focus:ring-[#38BDF8]/40 ${
                errors.excerpt ? "border-red-400" : "border-slate-200"
              }`}
            />
            {errors.excerpt && <p className="mt-1 text-xs text-red-500">{errors.excerpt}</p>}
          </div>

          {/* Content */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-[#64748B]">
              Content
            </label>
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
  <p className="mt-2 text-xs text-red-500">
    {errors.content}
  </p>
)}
            {errors.content && <p className="mt-1 text-xs text-red-500">{errors.content}</p>}
          </div>

          {/* Tags */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-[#64748B]">
              Tags
            </label>
            <div className="flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-2 focus-within:ring-2 focus-within:ring-[#38BDF8]/40">
              {form.tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 rounded-full bg-[#0F4C81]/10 px-3 py-1 text-xs font-medium text-[#0F4C81]"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-0.5 text-[#0F4C81]/60 hover:text-[#0F4C81]"
                    aria-label={`Remove ${tag}`}
                  >
                    ×
                  </button>
                </span>
              ))}
              <input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={onTagKeyDown}
                onBlur={addTag}
                placeholder={form.tags.length ? "Add more…" : "e.g. trekking, shimla, offbeat"}
                className="min-w-[120px] flex-1 bg-transparent px-1 py-1 text-sm text-[#0F172A] outline-none placeholder:text-slate-400"
              />
            </div>
            <p className="mt-1.5 text-xs text-slate-400">Click Enter </p>
          </div>
        </section>

        {/* ============ SIDEBAR ============ */}
        <aside className="space-y-6">
          {/* Featured image */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-[#64748B]">
              Featured Image
            </label>

           <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

  <label className="mb-3 block text-xs font-semibold uppercase tracking-wide text-[#64748B]">
    Featured Image
  </label>

  <CloudinaryUploader
    multiple={false}
    value={form.featuredImage}
    onChange={(url) => updateField("featuredImage", url)}
  />

  {errors.featuredImage && (
    <p className="mt-2 text-xs text-red-500">
      {errors.featuredImage}
    </p>
  )}

</div>
          </div>

          {/* Category */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-[#64748B]">
              Category
            </label>
            <select
              value={form.category}
              onChange={(e) => updateField("category", e.target.value)}
              className={`w-full rounded-lg border bg-slate-50 px-3 py-2 text-sm text-[#0F172A] outline-none focus:bg-white focus:ring-2 focus:ring-[#38BDF8]/40 ${
                errors.category ? "border-red-400" : "border-slate-200"
              }`}
            >
              <option value="">
                {categoriesLoading ? "Loading…" : "Select category"}
              </option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
            {categoriesFailed && (
              <p className="mt-1 text-xs text-amber-600">
                /api/categories nahi mila — pehle wo route check kar le.
              </p>
            )}
            {errors.category && <p className="mt-1 text-xs text-red-500">{errors.category}</p>}
          </div>

          {/* Author + read time */}
          <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-[#64748B]">
                Author
              </label>
              <input
                value={form.author}
                onChange={(e) => updateField("author", e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-[#0F172A] outline-none focus:bg-white focus:ring-2 focus:ring-[#38BDF8]/40"
              />
            </div>

            <div>
              <label className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-[#64748B]">
                <span>Read Time (min)</span>
                <button
                  type="button"
                  onClick={handleAutoReadTime}
                  className="font-medium normal-case text-[#38BDF8] hover:underline"
                >
                  Auto-calc
                </button>
              </label>
              <input
                type="number"
                min={1}
                value={form.readTime}
                onChange={(e) =>
                  updateField("readTime", e.target.value === "" ? "" : Number(e.target.value))
                }
                className={`w-full rounded-lg border bg-slate-50 px-3 py-2 text-sm text-[#0F172A] outline-none focus:bg-white focus:ring-2 focus:ring-[#38BDF8]/40 ${
                  errors.readTime ? "border-red-400" : "border-slate-200"
                }`}
              />
              {errors.readTime && <p className="mt-1 text-xs text-red-500">{errors.readTime}</p>}
            </div>

            <label className="flex cursor-pointer items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
              <span className="text-sm font-medium text-[#0F172A]">Featured post</span>
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => updateField("featured", e.target.checked)}
                className="h-5 w-5 accent-[#F97316]"
              />
            </label>
          </div>

          {/* SEO */}
          <details className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <summary className="cursor-pointer list-none text-xs font-semibold uppercase tracking-wide text-[#64748B]">
              <span className="inline-flex items-center gap-1.5">
                SEO Settings
                <span className="text-slate-400 transition group-open:rotate-180">⌄</span>
              </span>
            </summary>

            <div className="mt-4 space-y-4">
              <div>
                <label className="mb-1.5 block text-xs text-[#64748B]">SEO Title</label>
                <input
                  value={form.seoTitle}
                  onChange={(e) => updateField("seoTitle", e.target.value)}
                  placeholder={form.title || "Falls back to title"}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-[#0F172A] outline-none focus:bg-white focus:ring-2 focus:ring-[#38BDF8]/40"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs text-[#64748B]">SEO Description</label>
                <textarea
                  value={form.seoDescription}
                  onChange={(e) => updateField("seoDescription", e.target.value.slice(0, 160))}
                  rows={3}
                  placeholder={form.excerpt || "Falls back to excerpt"}
                  className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-[#0F172A] outline-none focus:bg-white focus:ring-2 focus:ring-[#38BDF8]/40"
                />
                <p className="mt-1 text-right text-xs text-slate-400">
                  {form.seoDescription.length}/160
                </p>
              </div>
            </div>
          </details>
        </aside>
      </main>

      {/* mobile bottom action bar */}
      <div className="sticky bottom-0 z-20 flex gap-3 border-t border-slate-200 bg-white/95 p-3 backdrop-blur lg:hidden">
        <button
          type="button"
          onClick={() => handleSubmit("draft")}
          disabled={saving !== null}
          className="flex-1 rounded-xl border border-[#0F4C81]/20 bg-white py-2.5 text-sm font-medium text-[#0F4C81] disabled:opacity-50"
        >
          {saving === "draft" ? "Saving…" : "Save Draft"}
        </button>
        <button
          type="button"
          onClick={() => handleSubmit("published")}
          disabled={saving !== null}
          className="flex-1 rounded-xl bg-[#F97316] py-2.5 text-sm font-semibold text-white disabled:opacity-50"
        >
          {saving === "published" ? "Publishing…" : "Publish"}
        </button>
      </div>
    </div>
  );
}