import { Suspense } from "react";

import InquiryListing from "@/components/admin/inquiries/InquiryListing";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{
    status?: string;
    search?: string;
  }>;
}

function LoadingState() {
  return (
    <div className="space-y-6">
      <div className="h-9 w-56 animate-pulse rounded-xl bg-slate-200" />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="h-28 animate-pulse rounded-2xl bg-white shadow-sm"
          />
        ))}
      </div>

      <div className="h-16 animate-pulse rounded-2xl bg-white shadow-sm" />

      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-48 animate-pulse rounded-2xl bg-white shadow-sm"
          />
        ))}
      </div>
    </div>
  );
}

export default async function InquiriesPage({
  searchParams,
}: Props) {
  const params = await searchParams;

  return (
    <Suspense fallback={<LoadingState />}>
      <InquiryListing
        initialStatus={params.status ?? ""}
        initialSearch={params.search ?? ""}
      />
    </Suspense>
  );
}