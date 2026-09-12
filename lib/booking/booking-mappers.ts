import type { BookingDocument } from "@/models/booking.model";

export function mapBookingResponse(
  booking: BookingDocument & {
    _id: unknown;
  },
) {
  return {
    bookingId: String(booking._id),

    bookingNumber: booking.bookingNumber,

    bookingStatus: booking.bookingStatus,

    paymentStatus: booking.paymentStatus,

    package: {
      id: String(booking.package),
      name: booking.packageSnapshot.name,
      slug: booking.packageSnapshot.slug,
      duration: booking.packageSnapshot.duration,
    },

    customer: {
      name: booking.customerName,
      email: booking.email,
    },

    travelDate: booking.travelDate,

    travellers: {
      adults: booking.adults,
      children: booking.children,
    },

    pricing: {
      adultTotal: booking.pricing.adultTotal,
      childTotal: booking.pricing.childTotal,
      subtotal: booking.pricing.subtotal,
      total: booking.pricing.total,
    },

    createdAt: booking.createdAt,
  };
};