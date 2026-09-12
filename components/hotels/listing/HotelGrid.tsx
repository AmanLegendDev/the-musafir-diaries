"use client";

import HotelCard from "./HotelCard";

export type HotelListItem = {
  _id: string;
  name: string;
  slug: string;
  area: string;
  city: string;
  state: string;
  country: string;
  starRating: number;
  hotelType: string;
  shortDescription: string;
  heroImage: string;
  gallery: string[];
  amenities: string[];
  guestRating: number | null;
  reviewCount: number;
  featured: boolean;
  displayOrder: number;
  status: "active" | "draft";
  destination:
    | {
        _id: string;
        name: string;
        slug: string;
        state?: string;
      }
    | string;
  createdAt: string | Date;
  updatedAt: string | Date;
};

type Props = {
  hotels: HotelListItem[];
  view?: "grid" | "list";
};

export default function HotelGrid({
  hotels,
  view = "grid",
}: Props) {
  if (view === "list") {
    return (
      <div className="space-y-5">
        {hotels.map((hotel, index) => (
          <HotelCard
            key={hotel._id}
            hotel={hotel}
            index={index}
            view="list"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {hotels.map((hotel, index) => (
        <HotelCard
          key={hotel._id}
          hotel={hotel}
          index={index}
          view="grid"
        />
      ))}
    </div>
  );
}