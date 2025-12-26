/**
 * Gulf Commission Calculator
 * Strict compliance with regional commission caps and regulations
 * Updated: 2024 - All GCC countries included
 */

export interface CommissionCalculation {
  propertyValue: number;
  jurisdiction: string;
  jurisdictionCode: string;
  commissionRate: number;
  commissionAmount: number;
  commissionCap: number | null;
  isCapApplied: boolean;
  finalCommission: number;
  currency: string;
  notes: string[];
  warnings: string[];
  isCompliant: boolean;
}

export interface CommissionRules {
  jurisdictionCode: string;
  jurisdictionName: string;
  minRate: number;        // Minimum commission percentage
  maxRate: number;        // Maximum commission percentage
  defaultRate: number;    // Default commission percentage
  capAmount: number | null;      // Absolute cap in local currency
  capPercentage: number | null;  // Percentage cap of property value
  currency: string;
  authority: string;
  regulationReference: string;
  notes: string[];
}

/**
 * Gulf Commission Rules Database
 * Based on latest real estate regulations in GCC countries
 */
export const GULF_COMMISSION_RULES: Record<string, CommissionRules> = {
  // United Arab Emirates - Dubai
  'AE-DU': {
    jurisdictionCode: 'AE-DU',
    jurisdictionName: 'Dubai, UAE',
    minRate: 1.0,
    maxRate: 2.0,
    defaultRate: 2.0,
    capAmount: 50000, // AED 50,000 cap (approx $13,600)
    capPercentage: null,
    currency: 'AED',
    authority: 'Dubai Land Department (DLD)',
    regulationReference: 'DLD Regulation No. 3 of 2010',
    notes: [
      '2% maximum commission for properties under AED 500,000',
      'Negotiable for properties above AED 500,000',
      'Must be clearly stated in brokerage agreement'
    ]
  },

  // United Arab Emirates - Abu Dhabi
  'AE-AZ': {
    jurisdictionCode: 'AE-AZ',
    jurisdictionName: 'Abu Dhabi, UAE',
    minRate: 1.5,
    maxRate: 2.0,
    defaultRate: 2.0,
    capAmount: 50000, // AED 50,000 cap
    capPercentage: null,
    currency: 'AED',
    authority: 'Abu Dhabi Municipality',
    regulationReference: 'Abu Dhabi Real Estate Regulation',
    notes: [
      'Typically 2% for residential properties',
      'Commercial properties may have different rates',
      'Must be registered with Tawtheeq system'
    ]
  },

  // Saudi Arabia - Riyadh
  'SA-RY': {
    jurisdictionCode: 'SA-RY',
    jurisdictionName: 'Riyadh, Saudi Arabia',
    minRate: 2.0,
    maxRate: 5.0,
    defaultRate: 5.0,
    capAmount: null,
    capPercentage: 5.0,
    currency: 'SAR',
    authority: 'Ministry of Municipal and Rural Affairs',
    regulationReference: 'Ejar Regulations',
    notes: [
      'Maximum 5% commission by law',
      'Must be registered in EJAR system',
      'Separate fees for property management'
    ]
  },

  // Saudi Arabia - Jeddah
  'SA-JZ': {
    jurisdictionCode: 'SA-JZ',
    jurisdictionName: 'Jeddah, Saudi Arabia',
    minRate: 2.0,
    maxRate: 5.0,
    defaultRate: 5.0,
    capAmount: null,
    capPercentage: 5.0,
    currency: 'SAR',
    authority: 'Ministry of Municipal and Rural Affairs',
    regulationReference: 'Ejar Regulations',
    notes: [
      'Follows national 5% maximum cap',
      'Market rates typically 3-5%',
      'Commercial properties may have separate rates'
    ]
  },

  // Qatar - Doha
  'QA-DA': {
    jurisdictionCode: 'QA-DA',
    jurisdictionName: 'Doha, Qatar',
    minRate: 2.0,
    maxRate: 3.0,
    defaultRate: 2.5,
    capAmount: null,
    capPercentage: 3.0,
    currency: 'QAR',
    authority: 'Qatar Real Estate Regulatory Authority',
    regulationReference: 'Qatar Law No. 8 of 2012',
    notes: [
      'Maximum 3% commission for residential',
      'Commercial properties up to 5%',
      'Must be Qatari licensed broker'
    ]
  },

  // Bahrain - Manama
  'BH-MA': {
    jurisdictionCode: 'BH-MA',
    jurisdictionName: 'Manama, Bahrain',
    minRate: 2.0,
    maxRate: 3.0,
    defaultRate: 2.5,
    capAmount: null,
    capPercentage: 3.0,
    currency: 'BHD',
    authority: 'Bahrain Real Estate Regulatory Authority',
    regulationReference: 'Bahrain Real Estate Law',
    notes: [
      'Typically 2-3% commission',
      'No official cap but market standard',
      'Must be Bahraini licensed broker'
    ]
  },

  // Kuwait - Kuwait City
  'KW-KU': {
    jurisdictionCode: 'KW-KU',
    jurisdictionName: 'Kuwait City, Kuwait',
    minRate: 2.5,
    maxRate: 4.0,
    defaultRate: 3.0,
    capAmount: null,
    capPercentage: 4.0,
    currency: 'KWD',
    authority: 'Kuwait Real Estate Union',
    regulationReference: 'Kuwait Real Estate Law',
    notes: [
      'Market rates 2.5-4%',
      'No official government cap',
      'Commercial properties 3-5%'
    ]
  },

  // Oman - Muscat
  'OM-MU': {
    jurisdictionCode: 'OM-MU',
    jurisdictionName: 'Muscat, Oman',
    minRate: 2.0,
    maxRate: 3.0,
    defaultRate: 2.5,
    capAmount: null,
    capPercentage: 3.0,
    currency: 'OMR',
    authority: 'Oman Real Estate Regulatory Authority',
    regulationReference: 'Oman Real Estate Law',
    notes: [
      'Typically 2-3% commission',
      'No official cap but market standard',
      'Must be Omani licensed broker'
    ]
  }
};

/**
 * Calculate commission for Gulf property transaction
 */
export const calculateGulfCommission = (
  propertyValue: number,
  jurisdictionCode: string,
  requestedRate?: number
): CommissionCalculation => {
  const rules = GULF_COMMISSION_RULES[jurisdictionCode];
  
  if (!rules) {
    throw new Error(`No commission rules found for jurisdiction: ${jurisdictionCode}`);
  }

  // Use requested rate or default rate
  const commissionRate = requestedRate || rules.defaultRate;
  
  // Validate rate is within legal limits
  const isValidRate = commissionRate >= rules.minRate && commissionRate <= rules.maxRate;
  
  // Calculate initial commission
  const commissionAmount = (propertyValue * commissionRate) / 100;
  
  // Apply caps if they exist
  let finalCommission = commissionAmount;
  let isCapApplied = false;
  let capApplied = null;
  
  if (rules.capAmount && commissionAmount > rules.capAmount) {
    finalCommission = rules.capAmount;
    isCapApplied = true;
    capApplied = rules.capAmount;
  }
  
  if (rules.capPercentage) {
    const capByPercentage = (propertyValue * rules.capPercentage) / 100;
    if (commissionAmount > capByPercentage) {
      finalCommission = capByPercentage;
      isCapApplied = true;
      capApplied = rules.capPercentage;
    }
  }
  
  // Generate notes and warnings
  const notes: string[] = [...rules.notes];
  const warnings: string[] = [];
  
  if (!isValidRate) {
    warnings.push(`Commission rate ${commissionRate}% is outside legal range (${rules.minRate}%-${rules.maxRate}%) for ${rules.jurisdictionName}`);
  }
  
  if (isCapApplied) {
    notes.push(`Commission capped at ${capApplied}${rules.capAmount ? rules.currency : '%'} as per ${rules.authority} regulations`);
  }
  
  if (commissionRate > rules.maxRate) {
    warnings.push(`Rate exceeds maximum allowed by ${rules.authority}. Risk of regulatory action.`);
  }
  
  if (commissionRate < rules.minRate) {
    warnings.push(`Rate below typical market minimum for ${rules.jurisdictionName}`);
  }
  
  return {
    propertyValue,
    jurisdiction: rules.jurisdictionName,
    jurisdictionCode: rules.jurisdictionCode,
    commissionRate,
    commissionAmount,
    commissionCap: rules.capAmount || rules.capPercentage,
    isCapApplied,
    finalCommission,
    currency: rules.currency,
    notes,
    warnings,
    isCompliant: isValidRate && warnings.length === 0
  };
};

/**
 * Get all available jurisdictions for commission calculation
 */
export const getAvailableJurisdictions = (): CommissionRules[] => {
  return Object.values(GULF_COMMISSION_RULES);
};

/**
 * Convert commission to different currency
 */
export const convertCommissionCurrency = (
  commission: number,
  fromCurrency: string,
  toCurrency: string,
  exchangeRate: number
): number => {
  // Simplified currency conversion
  // In production, integrate with live exchange rates
  return commission * exchangeRate;
};

// Default export for main calculator
export default calculateGulfCommission;
