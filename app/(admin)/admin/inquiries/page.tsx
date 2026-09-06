import PageHeader from "@/components/admin/shared/PageHeader";

export default function InquiriesPage() {
  return (
    <>
      <PageHeader
        title="Inquiries"
        description="Manage customer inquiries."
      />

      <div className="rounded-2xl bg-white p-16 text-center shadow-sm">
        <h2 className="text-2xl font-semibold">
          No Inquiries Found
        </h2>

        <p className="mt-3 text-slate-500">
          Customer inquiries will appear here.
        </p>
      </div>
    </>
  );
}