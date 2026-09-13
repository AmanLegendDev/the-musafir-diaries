import { Suspense } from "react";
import FAQForm from "@/components/admin/faqs/FAQForm";

export default function NewFAQPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm text-slate-500 shadow-sm">
            Loading FAQ form...
          </div>
        </div>
      }
    >
      <FAQForm mode="create" />
    </Suspense>
  );
}