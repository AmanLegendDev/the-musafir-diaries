import PageHeader from "@/components/admin/shared/PageHeader";

export default function TestimonialsPage() {
  return (
    <>
      <PageHeader
        title="Testimonials"
        description="Manage customer testimonials."
        buttonText="Add Testimonial"
        buttonHref="/admin/testimonials/new"
      />

      <div className="rounded-2xl bg-white p-16 text-center shadow-sm">
        <h2 className="text-2xl font-semibold">
          No Testimonials Found
        </h2>

        <p className="mt-3 text-slate-500">
          Add your first customer testimonial.
        </p>
      </div>
    </>
  );
}