export interface CommissionResult {
  baseCommission: number;
  vatAmount: number;
  finalCommission: number;
  rateUsed: number;
  currency: string;
}

export const calculateGulfCommission = (
  propertyPrice: number,
  jurisdiction: string,
  manualRate?: number
): CommissionResult => {
  // Default rates by jurisdiction if not manually provided
  const defaultRates: Record<string, number> = {
    'AE-DU': 2.0, // Dubai
    'AE-AZ': 2.0, // Abu Dhabi
    'SA-RY': 2.5, // Riyadh (KSA standard is 2.5%)
    'QA-DA': 1.0, // Doha (Often 1% from each side)
    'KW-KU': 1.0, // Kuwait
    'OM-MU': 3.0, // Oman
  };

  // VAT rates (Simplified: UAE/KSA are 5% or 15% depending on service type)
  const vatRates: Record<string, number> = {
    'AE-DU': 0.05,
    'AE-AZ': 0.05,
    'SA-RY': 0.15,
    'QA-DA': 0,
    'BH-MA': 0.10,
  };

  const rate = manualRate !== undefined ? manualRate : (defaultRates[jurisdiction] || 2.0);
  const vatRate = vatRates[jurisdiction] || 0;

  const baseCommission = propertyPrice * (rate / 100);
  const vatAmount = baseCommission * vatRate;
  const finalCommission = baseCommission + vatAmount;

  return {
    baseCommission,
    vatAmount,
    finalCommission,
    rateUsed: rate,
    currency: jurisdiction.startsWith('SA') ? 'SAR' : 'AED' 
  };
};
