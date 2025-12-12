export const CURRENCIES = {
  AED: { symbol: 'د.إ', name: 'UAE Dirham' },
  SAR: { symbol: 'ر.س', name: 'Saudi Riyal' },
  QAR: { symbol: 'ر.ق', name: 'Qatari Riyal' },
  OMR: { symbol: 'ر.ع.', name: 'Omani Rial' },
  KWD: { symbol: 'د.ك', name: 'Kuwaiti Dinar' }
} as const;

export const PROPERTY_TYPES = [
  { value: 'villa', label: 'Villa', icon: '🏠' },
  { value: 'apartment', label: 'Apartment', icon: '🏢' },
  { value: 'townhouse', label: 'Townhouse', icon: '🏘️' },
  { value: 'penthouse', label: 'Penthouse', icon: '🏙️' },
  { value: 'commercial', label: 'Commercial', icon: '🏬' }
] as const;

export const CITIES = [
  'Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman',
  'Riyadh', 'Jeddah', 'Dammam',
  'Doha', 'Muscat', 'Kuwait City'
] as const;

// Financial Constants
export const VAT_RATE = 0.05; // 5%
export const REGISTRATION_FEE_PERCENTAGE = 0.04; // 4%
export const AGENT_COMMISSION = 0.02; // 2%
export const DEFAULT_INTEREST_RATE = 4.5; // 4.5%

// Construction Milestones (percentage of property price)
export const CONSTRUCTION_MILESTONES = [
  { stage: 'Booking', percentage: 10, duration: 'Immediate' },
  { stage: 'Foundation', percentage: 15, duration: '3 months' },
  { stage: 'Structure', percentage: 25, duration: '6 months' },
  { stage: 'Finishing', percentage: 30, duration: '9 months' },
  { stage: 'Handover', percentage: 20, duration: '12 months' }
] as const;

// Prayer Times (placeholder - will be replaced with API)
export const PRAYER_TIMES = {
  fajr: '05:30',
  dhuhr: '12:30',
  asr: '15:45',
  maghrib: '18:30',
  isha: '20:00'
} as const;

// Golden Visa Requirements
export const GOLDEN_VISA_REQUIREMENTS = {
  minPropertyValue: 2000000, // 2M AED
  minSalary: 30000, // 30K AED/month
  validDocuments: ['Passport', 'Emirates ID', 'Property Title Deed']
} as const;
