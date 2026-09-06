import PageHeader from "@/components/admin/shared/PageHeader";

export default function PackagesPage() {
  return (
    <>
      <PageHeader
        title="Packages"
        description="Manage all travel packages."
        buttonText="Add Package"
        buttonHref="/admin/packages/new"
      />

      <div className="rounded-2xl bg-white p-16 text-center shadow-sm">

        <h2 className="text-2xl font-semibold">
          No Packages Found
        </h2>

        <p className="mt-3 text-slate-500">
          Create your first package.
        </p>

      </div>

    </>
  );
}