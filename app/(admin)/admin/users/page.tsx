import PageHeader from "@/components/admin/shared/PageHeader";

export default function UsersPage() {
  return (
    <>
      <PageHeader
        title="Users"
        description="Manage all registered users."
      />

      <div className="rounded-2xl bg-white p-16 text-center shadow-sm">
        <h2 className="text-2xl font-semibold">
          No Users Found
        </h2>

        <p className="mt-3 text-slate-500">
          Registered users will appear here.
        </p>
      </div>
    </>
  );
}