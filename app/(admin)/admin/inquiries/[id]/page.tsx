import { notFound } from "next/navigation";

import connectDB from "@/lib/db";
import Inquiry from "@/models/Inquiry";

import InquiryDetails from "@/components/admin/inquiries/InquiryDetails";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function InquiryDetailsPage({
  params,
}: Props) {
  const { id } = await params;

  await connectDB();

  const inquiry = await Inquiry.findById(id)
    .populate({
      path: "destination",
      select:
        "_id name slug city state country status",
    })
    .select("-__v")
    .lean();

  if (!inquiry) {
    notFound();
  }

  const serialized = JSON.parse(
    JSON.stringify(inquiry),
  );

  return (
    <InquiryDetails
      inquiry={serialized}
    />
  );
}