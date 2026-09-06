import PageHeader from "@/components/admin/shared/PageHeader";

export default function BlogsPage() {
  return (
    <>
      <PageHeader
        title="Blogs"
        description="Manage all blog posts."
        buttonText="Add Blog"
        buttonHref="/admin/blogs/new"
      />

      <div className="rounded-2xl bg-white p-16 text-center shadow-sm">

        <h2 className="text-2xl font-semibold">
          No Blogs Found
        </h2>

        <p className="mt-3 text-slate-500">
          Publish your first travel blog.
        </p>

      </div>

    </>
  );
}