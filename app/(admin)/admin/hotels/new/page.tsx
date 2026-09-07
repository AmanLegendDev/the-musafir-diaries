import { Suspense } from "react";
import HotelForm from "@/components/admin/hotels/HotelForm";

export default function NewHotelPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="rounded-xl border border-black/10 bg-white px-5 py-3 text-sm text-black/50 shadow-sm">
            Loading hotel form...
          </div>
        </div>
      }
    >
      <HotelForm />
    </Suspense>
  );
}