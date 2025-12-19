// All monetary values are in base currency units
// Rounding rule: round to nearest whole unit at each payment step

export interface PaymentInput {
  propertyPrice: number;
  downPaymentPercent: number;
  loanTermYears: number;
  annualInterestRate: number;
}

export interface PaymentResult {
  downPayment: number;
  loanAmount: number;
  monthlyPayment: number;
  totalInterest: number;
  totalPayment: number;
  numberOfPayments: number;
  annualInterestRate: number;
}

// Input validation helper
function validatePaymentInput(input: PaymentInput): void {
  const { propertyPrice, downPaymentPercent, loanTermYears, annualInterestRate } = input;

  if (propertyPrice <= 0) {
    throw new Error('Property price must be greater than 0');
  }
  if (downPaymentPercent < 0 || downPaymentPercent > 100) {
    throw new Error('Down payment percent must be between 0 and 100');
  }
  if (loanTermYears <= 0) {
    throw new Error('Loan term must be greater than 0 years');
  }
  if (annualInterestRate < 0) {
    throw new Error('Interest rate cannot be negative');
  }
}

export function calculateMortgagePlan(input: PaymentInput): PaymentResult {
  validatePaymentInput(input);

  const {
    propertyPrice,
    downPaymentPercent,
    loanTermYears,
    annualInterestRate
  } = input;

  const downPayment = round(propertyPrice * (downPaymentPercent / 100));
  const loanAmount = round(propertyPrice - downPayment);

  // Handle zero interest rate
  if (annualInterestRate === 0) {
    const numberOfPayments = loanTermYears * 12;
    const monthlyPayment = round(loanAmount / numberOfPayments);
    const totalPayment = round(monthlyPayment * numberOfPayments);

    return {
      downPayment,
      loanAmount,
      monthlyPayment,
      totalInterest: 0,
      totalPayment,
      numberOfPayments,
      annualInterestRate
    };
  }

  const monthlyRate = annualInterestRate / 100 / 12;
  const numberOfPayments = loanTermYears * 12;

  const rawMonthly =
    loanAmount *
    (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  const monthlyPayment = round(rawMonthly);
  const totalPayment = round(monthlyPayment * numberOfPayments);
  const totalInterest = round(totalPayment - loanAmount);

  return {
    downPayment,
    loanAmount,
    monthlyPayment,
    totalInterest,
    totalPayment,
    numberOfPayments,
    annualInterestRate
  };
}

// Construction milestone payment plan
export interface ConstructionMilestoneInput {
  propertyPrice: number;
  milestones: Array<{
    name: string;
    completionPercent: number;
    paymentPercent: number;
  }>;
  serviceFeePercent?: number;
  vatPercent?: number;
}

export interface ConstructionPaymentPlan {
  milestones: Array<{
    name: string;
    completionPercent: number;
    paymentAmount: number;
    cumulativePayment: number;
  }>;
  serviceFee: number;
  vatAmount: number;
  totalPrice: number;
  paymentSchedule: Array<{ milestone: string; amount: number; dueAt: string }>;
}

export function calculateConstructionPaymentPlan(
  input: ConstructionMilestoneInput
): ConstructionPaymentPlan {
  const { propertyPrice, milestones, serviceFeePercent = 2, vatPercent = 5 } = input;

  const totalPaymentPercent = milestones.reduce((sum, m) => sum + m.paymentPercent, 0);
  if (Math.abs(totalPaymentPercent - 100) > 0.01) {
    throw new Error('Milestone payment percentages must sum to 100%');
  }

  const serviceFee = round(propertyPrice * (serviceFeePercent / 100));
  const baseAmount = propertyPrice + serviceFee;
  const vatAmount = round(baseAmount * (vatPercent / 100));
  const totalPrice = baseAmount + vatAmount;

  let cumulativePayment = 0;
  const calculatedMilestones = milestones.map(m => {
    const paymentAmount = round(totalPrice * (m.paymentPercent / 100));
    cumulativePayment += paymentAmount;

    return {
      name: m.name,
      completionPercent: m.completionPercent,
      paymentAmount,
      cumulativePayment
    };
  });

  return {
    milestones: calculatedMilestones,
    serviceFee,
    vatAmount,
    totalPrice,
    paymentSchedule: calculatedMilestones.map(m => ({
      milestone: m.name,
      amount: m.paymentAmount,
      dueAt: `At ${m.completionPercent}% completion`
    }))
  };
}

export function calculateVat(amount: number, vatRatePercent: number): number {
  if (vatRatePercent < 0) throw new Error('VAT rate cannot be negative');
  return round(amount * (vatRatePercent / 100));
}

export function calculateRentalYield(purchasePrice: number, annualRent: number): number {
  if (purchasePrice <= 0) throw new Error('Purchase price must be greater than 0');
  return roundToTwo((annualRent / purchasePrice) * 100);
}

export function calculateNetYield(
  purchasePrice: number,
  annualRent: number,
  annualExpenses: number
): number {
  if (purchasePrice <= 0) throw new Error('Purchase price must be greater than 0');
  if (annualExpenses < 0) throw new Error('Expenses cannot be negative');

  const netIncome = annualRent - annualExpenses;
  if (netIncome < 0) return 0;

  return roundToTwo((netIncome / purchasePrice) * 100);
}

/* ---------- helpers ---------- */
export function round(value: number): number {
  return Math.round(value);
}

export function roundToTwo(value: number): number {
  return Math.round(value * 100) / 100;
}
