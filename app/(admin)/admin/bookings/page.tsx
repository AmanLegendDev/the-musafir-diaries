import PageHeader from "@/components/admin/shared/PageHeader";

export default function BookingsPage() {
  return (
    <>
      <PageHeader
        title="Bookings"
        description="Manage all customer bookings."
      />

      <div className="rounded-2xl bg-white p-16 text-center shadow-sm">
        <h2 className="text-2xl font-semibold">
          No Bookings Found
        </h2>

        <p className="mt-3 text-slate-500">
          Customer bookings will appear here.
        </p>
      </div>
    </>
  );
}