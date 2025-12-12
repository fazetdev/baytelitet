export function calculatePaymentPlan(propertyPrice: number, downPaymentPercent: number, loanTerm: number = 20) {
  const downPayment = propertyPrice * (downPaymentPercent / 100);
  const loanAmount = propertyPrice - downPayment;
  const monthlyInterestRate = 0.045 / 12; // 4.5% annual interest
  const numberOfPayments = loanTerm * 12;
  
  // Calculate monthly payment using mortgage formula
  const monthlyPayment = loanAmount * 
    (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
    (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
  
  const totalInterest = (monthlyPayment * numberOfPayments) - loanAmount;
  const totalPayment = monthlyPayment * numberOfPayments;
  
  return {
    downPayment,
    loanAmount,
    monthlyPayment: Math.round(monthlyPayment),
    totalInterest: Math.round(totalInterest),
    totalPayment: Math.round(totalPayment),
    loanTerm,
    interestRate: 4.5, // 4.5% annual
    numberOfPayments
  };
}

export function calculateVat(amount: number, vatRate: number = 0.05) {
  return amount * vatRate;
}

export function calculateRentalYield(purchasePrice: number, annualRent: number) {
  return ((annualRent / purchasePrice) * 100).toFixed(2);
}

export function calculateNetYield(purchasePrice: number, annualRent: number, expenses: number = 0) {
  const netIncome = annualRent - expenses;
  return ((netIncome / purchasePrice) * 100).toFixed(2);
}
