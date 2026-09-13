import { Suspense } from "react";
import HotelForm from "@/components/admin/hotels/HotelForm";

export default function NewHotelPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm text-slate-500 shadow-sm">
            Loading hotel form...
          </div>
        </div>
      }
    >
      <HotelForm mode="create" />
    </Suspense>
  );
}