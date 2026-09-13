import { notFound } from "next/navigation";

import connectDB from "@/lib/db";
import Booking from "@/models/booking.model";

import BookingDetails from "@/components/admin/bookings/BookingDetails";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export const dynamic = "force-dynamic";

export default async function BookingDetailsPage({
  params,
}: Props) {
  const { id } = await params;

  await connectDB();

  const booking = await Booking.findById(id)
    .populate(
      "package",
      "_id name slug duration discountedPrice originalPrice status"
    )
    .select("-__v")
    .lean();

  if (!booking) {
    notFound();
  }

  const serializedBooking = JSON.parse(
    JSON.stringify(booking)
  );

  return (
    <BookingDetails
      booking={serializedBooking}
    />
  );
}