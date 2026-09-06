import PageHeader from "@/components/admin/shared/PageHeader";

export default function CategoriesPage() {
  return (
    <>
      <PageHeader
        title="Categories"
        description="Manage all travel categories."
        buttonText="Add Category"
        buttonHref="/admin/categories/new"
      />

      <div className="rounded-2xl bg-white p-16 text-center shadow-sm">

        <h2 className="text-2xl font-semibold">
          No Categories Found
        </h2>

        <p className="mt-3 text-slate-500">
          Create your first category to organize travel packages.
        </p>

      </div>
    </>
  );
}