export const TAXES_AND_FEES = 499;

export const CONVENIENCE_FEE = 199;

export const calculateBookingAmount = (
  pricePerTraveller: number,
  travellerCount: number,
) => {
  const baseFare = pricePerTraveller * travellerCount;

  return {
    baseFare,
    taxesAndFees: TAXES_AND_FEES,
    convenienceFee: CONVENIENCE_FEE,
    totalAmount: baseFare + TAXES_AND_FEES + CONVENIENCE_FEE,
  };
};
