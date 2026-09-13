"use client";

import { useState } from "react";

import {
  AlertTriangle,
  Loader2,
  Trash2,
  X,
} from "lucide-react";

interface PackageItem {
  _id: string;
  name: string;
}

interface Props {
  packageItem: PackageItem | null;
  onClose: () => void;
  onDeleted: (id: string) => void;
}

export default function DeletePackageModal({
  packageItem,
  onClose,
  onDeleted,
}: Props) {
  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  /*
   * TypeScript does not reliably preserve the
   * null narrowing of a prop inside a nested
   * async function.
   *
   * After the guard, keep a stable non-null
   * reference for the delete handler.
   */
  if (!packageItem) {
    return null;
  }

  const currentPackage = packageItem;

  async function handleDelete() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `/api/packages/${currentPackage._id}`,
        {
          method: "DELETE",
        },
      );

      const result =
        await response.json();

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result?.message ||
            "Unable to delete package.",
        );
      }

      onDeleted(
        currentPackage._id,
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong.",
      );

      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-package-title"
        className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        {/* HEADER */}
        <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
              <AlertTriangle className="h-5 w-5" />
            </div>

            <div>
              <h2
                id="delete-package-title"
                className="text-base font-bold text-slate-900"
              >
                Delete Package
              </h2>

              <p className="mt-0.5 text-xs text-slate-400">
                This action cannot be undone.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            aria-label="Close delete dialog"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* BODY */}
        <div className="px-6 py-6">
          <p className="text-sm leading-6 text-slate-600">
            Are you sure you want to
            permanently delete{" "}
            <span className="font-semibold text-slate-900">
              “{currentPackage.name}”
            </span>
            ?
          </p>

          {error && (
            <div className="mt-4 rounded-xl border border-rose-100 bg-rose-50 px-4 py-3 text-xs font-medium leading-5 text-rose-700">
              {error}
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 border-t border-slate-100 bg-slate-50/60 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-rose-600 px-4 text-xs font-semibold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4" />
                Delete Package
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}