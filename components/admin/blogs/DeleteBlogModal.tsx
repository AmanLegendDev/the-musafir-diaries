"use client";

import { useState } from "react";

import {
  AlertTriangle,
  Loader2,
  Trash2,
  X,
} from "lucide-react";

import { toast } from "sonner";

interface BlogItem {
  _id: string;
  title: string;
}

interface Props {
  blog: BlogItem | null;
  onClose: () => void;
  onDeleted: (id: string) => void;
}

export default function DeleteBlogModal({
  blog,
  onClose,
  onDeleted,
}: Props) {
  const [loading, setLoading] =
    useState(false);

  /*
   * TypeScript narrowing is not always preserved
   * inside nested async functions.
   *
   * Capture the already-validated blog in a
   * non-null constant so handleDelete() can safely
   * access it.
   */
  if (!blog) {
    return null;
  }

  const currentBlog = blog;

  async function handleDelete() {
    try {
      setLoading(true);

      const response = await fetch(
        `/api/blogs/${currentBlog._id}`,
        {
          method: "DELETE",
        },
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result?.message ||
            "Unable to delete blog.",
        );
      }

      toast.success(
        "Blog deleted successfully.",
      );

      onDeleted(currentBlog._id);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong.",
      );

      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-blog-title"
        className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl"
      >
        {/* HEADER */}
        <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
              <AlertTriangle className="h-5 w-5" />
            </div>

            <div>
              <h2
                id="delete-blog-title"
                className="text-base font-bold text-slate-900"
              >
                Delete Blog
              </h2>

              <p className="mt-0.5 text-xs text-slate-400">
                Permanent action
              </p>
            </div>
          </div>

          <button
            type="button"
            disabled={loading}
            onClick={onClose}
            aria-label="Close delete dialog"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* BODY */}
        <div className="px-6 py-6">
          <p className="text-sm leading-6 text-slate-600">
            Are you sure you want to permanently
            delete{" "}
            <span className="font-semibold text-slate-900">
              “{currentBlog.title}”
            </span>
            ?
          </p>

          <div className="mt-4 rounded-xl border border-rose-100 bg-rose-50 px-4 py-3">
            <p className="text-xs leading-5 text-rose-700">
              This blog and its content will be
              removed from the CMS. This action
              cannot be undone.
            </p>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 border-t border-slate-100 bg-slate-50/70 px-6 py-4">
          <button
            type="button"
            disabled={loading}
            onClick={onClose}
            className="h-10 rounded-xl border border-slate-200 bg-white px-5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={handleDelete}
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-rose-600 px-5 text-xs font-semibold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4" />
                Delete Blog
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}