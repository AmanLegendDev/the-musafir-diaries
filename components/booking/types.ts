export interface BookingFormData {
  package: string;

  customerName: string;
  phone: string;
  email: string;

  travelDate: string;

  adults: number;

  childrenCount: number;
  childrenAges: number[];

  pickupLocation: string;

  specialRequest?: string;

  /*
   * Temporary compatibility field.
   *
   * This is NOT trusted by the backend.
   * It will be removed after the new pricing UI is complete.
   */
  totalPrice?: number;
}

export interface BookingPriceBreakdown {
  adultTotal: number;
  childTotal: number;
  subtotal: number;
  total: number;
}

export interface BookingPackageSnapshot {
  name: string;
  slug: string;
  duration: string;
  originalPrice: number;
  discountedPrice: number;
}