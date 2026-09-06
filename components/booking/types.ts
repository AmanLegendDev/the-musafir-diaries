export interface BookingFormData {
  package: string;

  customerName: string;
  phone: string;
  email: string;

  travelDate: string;

  adults: number;

  childrenCount: number;

  childrenAges?: number[];

  pickupLocation: string;

  specialRequest?: string;

  totalPrice: number;
}