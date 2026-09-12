export interface ChildPricingPolicy {
  complimentaryBelow: number;
  halfPriceBelow: number;
  halfPricePercentage: number;
}

export interface BookingPriceInput {
  adultPrice: number;
  adults: number;
  childrenAges: number[];
  childPolicy: ChildPricingPolicy;
}

export interface BookingPriceBreakdown {
  adultTotal: number;
  childTotal: number;
  subtotal: number;
  total: number;
}

export function calculateBookingPrice({
  adultPrice,
  adults,
  childrenAges,
  childPolicy,
}: BookingPriceInput): BookingPriceBreakdown {
  const safeAdultPrice = Math.max(0, adultPrice);
  const safeAdults = Math.max(0, adults);

  const adultTotal = safeAdults * safeAdultPrice;

  let childTotal = 0;

  for (const age of childrenAges) {
    if (age < childPolicy.complimentaryBelow) {
      continue;
    }

    if (age < childPolicy.halfPriceBelow) {
      childTotal +=
        safeAdultPrice *
        (childPolicy.halfPricePercentage / 100);

      continue;
    }

    childTotal += safeAdultPrice;
  }

  const subtotal = adultTotal + childTotal;

  return {
    adultTotal,
    childTotal,
    subtotal,
    total: subtotal,
  };
}