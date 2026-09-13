import { Suspense } from "react";
import HotelListing from "@/components/admin/hotels/HotelListing";

export const dynamic = "force-dynamic";

export default function HotelsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm text-slate-500 shadow-sm">
            Loading hotels...
          </div>
        </div>
      }
    >
      <HotelListing />
    </Suspense>
  );
}