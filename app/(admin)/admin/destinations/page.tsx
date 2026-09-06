import PageHeader from "@/components/admin/shared/PageHeader";

export default function DestinationsPage() {
  return (
    <>
      <PageHeader
        title="Destinations"
        description="Manage all travel destinations."
        buttonText="Add Destination"
        buttonHref="/admin/destinations/new"
      />

      <div className="rounded-2xl bg-white p-16 text-center shadow-sm">
        <h2 className="text-2xl font-semibold">
          No Destinations Found
        </h2>

        <p className="mt-3 text-slate-500">
          Create your first destination.
        </p>
      </div>
    </>
  );
}