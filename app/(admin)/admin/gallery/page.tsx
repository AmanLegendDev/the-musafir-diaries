import PageHeader from "@/components/admin/shared/PageHeader";

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        title="Gallery"
        description="Manage all uploaded gallery images."
        buttonText="Upload Images"
        buttonHref="/admin/gallery/upload"
      />

      <div className="rounded-2xl bg-white p-16 text-center shadow-sm">
        <h2 className="text-2xl font-semibold">
          No Images Found
        </h2>

        <p className="mt-3 text-slate-500">
          Upload your first gallery images.
        </p>
      </div>
    </>
  );
}