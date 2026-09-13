import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

import connectDB from "@/lib/db";
import Package from "@/models/package.model";

import PackageForm from "@/components/admin/packages/PackageForm";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export const dynamic = "force-dynamic";

export default async function EditPackagePage({
  params,
}: Props) {
  const { id } = await params;

  await connectDB();

  const pkg = await Package.findById(id).lean();

  if (!pkg) {
    notFound();
  }

  const data = JSON.parse(JSON.stringify(pkg));

  return (
    <div className="mx-auto max-w-6xl">
      {/* Top */}
      <div className="mb-8">
        <Link
          href={`/admin/packages/${id}`}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 transition hover:text-[#1597C7]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Package
        </Link>

        <div className="mt-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#1597C7]">
            Package Management
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#071A33] sm:text-4xl">
            Edit Package
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Update package information, pricing, itinerary,
            images, publishing settings and SEO.
          </p>
        </div>
      </div>

      <PackageForm
        mode="edit"
        packageId={id}
        defaultValues={data}
      />
    </div>
  );
}