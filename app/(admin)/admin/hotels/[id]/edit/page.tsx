import { notFound } from "next/navigation";

import connectDB from "@/lib/db";
import Hotel from "@/models/hotel.model";

import HotelForm from "@/components/admin/hotels/HotelForm";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export const dynamic = "force-dynamic";

export default async function EditHotelPage({
  params,
}: Props) {
  const { id } = await params;

  await connectDB();

  const hotel =
    await Hotel.findById(id)
      .populate(
        "destination",
        "_id name slug status"
      )
      .lean();

  if (!hotel) {
    notFound();
  }

  const serializedHotel =
    JSON.parse(
      JSON.stringify(hotel)
    );

  return (
    <HotelForm
      mode="edit"
      initialData={{
        ...serializedHotel,
        destination:
          serializedHotel.destination
            ? serializedHotel.destination
                ._id
            : "",
      }}
    />
  );
}