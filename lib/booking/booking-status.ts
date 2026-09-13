export type BookingStatus =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "completed";

/**
 * Defines the only valid lifecycle transitions
 * for a booking.
 *
 * pending
 *   → confirmed
 *   → cancelled
 *
 * confirmed
 *   → completed
 *   → cancelled
 *
 * cancelled
 *   → nothing
 *
 * completed
 *   → nothing
 */

export const BOOKING_STATUS_TRANSITIONS: Record<
  BookingStatus,
  readonly BookingStatus[]
> = {
  pending: ["confirmed", "cancelled"],
  confirmed: ["completed", "cancelled"],
  cancelled: [],
  completed: [],
};

export function isValidBookingStatus(
  value: unknown
): value is BookingStatus {
  return (
    value === "pending" ||
    value === "confirmed" ||
    value === "cancelled" ||
    value === "completed"
  );
}

export function canTransitionBookingStatus(
  currentStatus: BookingStatus,
  nextStatus: BookingStatus
): boolean {
  return BOOKING_STATUS_TRANSITIONS[
    currentStatus
  ].includes(nextStatus);
}

export function getAllowedBookingActions(
  status: BookingStatus
): BookingStatus[] {
  return [
    ...BOOKING_STATUS_TRANSITIONS[status],
  ];
}