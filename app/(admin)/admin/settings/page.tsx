import PageHeader from "@/components/admin/shared/PageHeader";

export default function SettingsPage() {
  return (
    <>
      <PageHeader
        title="Settings"
        description="Manage website configuration."
      />

      <div className="grid gap-6 md:grid-cols-2">

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">General Settings</h2>
          <p className="mt-2 text-slate-500">
            Site name, logo and branding.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">SEO</h2>
          <p className="mt-2 text-slate-500">
            Meta title, description and keywords.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Contact</h2>
          <p className="mt-2 text-slate-500">
            Phone, email and address.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Social Links</h2>
          <p className="mt-2 text-slate-500">
            Facebook, Instagram, X and YouTube.
          </p>
        </div>

      </div>
    </>
  );
}