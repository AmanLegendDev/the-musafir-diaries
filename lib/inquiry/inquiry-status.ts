export type InquiryStatus =
  | "pending"
  | "contacted"
  | "quoted"
  | "confirmed"
  | "cancelled";

/* -------------------------------------------------------------------------- */
/* Inquiry lifecycle                                                          */
/*                                                                            */
/* pending                                                                     */
/*   ├── contacted                                                            */
/*   └── cancelled                                                            */
/*                                                                            */
/* contacted                                                                   */
/*   ├── quoted                                                               */
/*   └── cancelled                                                            */
/*                                                                            */
/* quoted                                                                      */
/*   ├── confirmed                                                            */
/*   └── cancelled                                                            */
/*                                                                            */
/* confirmed → terminal                                                       */
/* cancelled → terminal                                                       */
/* -------------------------------------------------------------------------- */

export const INQUIRY_STATUS_TRANSITIONS: Record<
  InquiryStatus,
  readonly InquiryStatus[]
> = {
  pending: ["contacted", "cancelled"],
  contacted: ["quoted", "cancelled"],
  quoted: ["confirmed", "cancelled"],
  confirmed: [],
  cancelled: [],
};

export function isValidInquiryStatus(
  value: unknown,
): value is InquiryStatus {
  return (
    value === "pending" ||
    value === "contacted" ||
    value === "quoted" ||
    value === "confirmed" ||
    value === "cancelled"
  );
}

export function canTransitionInquiryStatus(
  currentStatus: InquiryStatus,
  nextStatus: InquiryStatus,
): boolean {
  return INQUIRY_STATUS_TRANSITIONS[
    currentStatus
  ].includes(nextStatus);
}

export function getAllowedInquiryActions(
  status: InquiryStatus,
): InquiryStatus[] {
  return [
    ...INQUIRY_STATUS_TRANSITIONS[status],
  ];
}