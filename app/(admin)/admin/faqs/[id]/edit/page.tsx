import { notFound } from "next/navigation";

import connectDB from "@/lib/db";
import FAQ from "@/models/faq.model";
import FAQForm from "@/components/admin/faqs/FAQForm";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export const dynamic = "force-dynamic";

export default async function EditFAQPage({
  params,
}: Props) {
  const { id } = await params;

  await connectDB();

  const faq = await FAQ.findById(id)
    .populate(
      "destination",
      "_id name slug status",
    )
    .populate(
      "package",
      "_id name slug status",
    )
    .populate(
      "hotel",
      "_id name slug status",
    )
    .lean();

  if (!faq) {
    notFound();
  }

  const serialized = JSON.parse(
    JSON.stringify(faq),
  );

  return (
    <FAQForm
      mode="edit"
      initialData={{
        ...serialized,
        destination:
          serialized.destination?._id
            ? String(
                serialized.destination._id,
              )
            : null,
        package:
          serialized.package?._id
            ? String(
                serialized.package._id,
              )
            : null,
        hotel:
          serialized.hotel?._id
            ? String(
                serialized.hotel._id,
              )
            : null,
      }}
    />
  );
}