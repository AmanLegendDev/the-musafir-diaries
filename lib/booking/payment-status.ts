export type PaymentStatus =
  | "pending"
  | "advance_paid"
  | "paid"
  | "refunded";

/**
 * Payment lifecycle is intentionally separate
 * from booking lifecycle.
 *
 * pending
 *   → advance_paid
 *   → paid
 *
 * advance_paid
 *   → paid
 *   → refunded
 *
 * paid
 *   → refunded
 *
 * refunded
 *   → nothing
 */

export const PAYMENT_STATUS_TRANSITIONS: Record<
  PaymentStatus,
  readonly PaymentStatus[]
> = {
  pending: ["advance_paid", "paid"],
  advance_paid: ["paid", "refunded"],
  paid: ["refunded"],
  refunded: [],
};

export function isValidPaymentStatus(
  value: unknown
): value is PaymentStatus {
  return (
    value === "pending" ||
    value === "advance_paid" ||
    value === "paid" ||
    value === "refunded"
  );
}

export function canTransitionPaymentStatus(
  currentStatus: PaymentStatus,
  nextStatus: PaymentStatus
): boolean {
  return PAYMENT_STATUS_TRANSITIONS[
    currentStatus
  ].includes(nextStatus);
}

export function getAllowedPaymentActions(
  status: PaymentStatus
): PaymentStatus[] {
  return [
    ...PAYMENT_STATUS_TRANSITIONS[status],
  ];
}