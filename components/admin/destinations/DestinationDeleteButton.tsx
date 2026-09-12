"use client";

import { useState } from "react";
import { Loader2, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Props {
  id: string;
  name: string;
}

export default function DestinationDeleteButton({
  id,
  name,
}: Props) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (deleting) return;

    try {
      setDeleting(true);

      const response = await fetch(
        `/api/destinations/${id}`,
        {
          method: "DELETE",
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to delete destination.",
        );
      }

      toast.success("Destination deleted successfully.");

      setOpen(false);

      router.refresh();
    } catch (error) {
      console.error(
        "DESTINATION_DELETE_ERROR:",
        error,
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to delete destination.",
      );
    } finally {
      setDeleting(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Delete ${name}`}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-red-100 bg-white text-red-400 transition-all duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
      >
        <Trash2 className="h-4 w-4" />
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-5 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[24px] bg-white p-6 shadow-2xl sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-50 text-red-500">
                  <Trash2 className="h-5 w-5" />
                </div>

                <h3 className="mt-5 text-xl font-semibold text-slate-900">
                  Delete destination?
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  You are about to delete{" "}
                  <span className="font-semibold text-slate-800">
                    {name}
                  </span>
                  . This action cannot be undone.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                disabled={deleting}
                className="flex h-9 w-9 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setOpen(false)}
                disabled={deleting}
                className="min-h-11 rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deleting && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}

                {deleting
                  ? "Deleting..."
                  : "Delete destination"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}