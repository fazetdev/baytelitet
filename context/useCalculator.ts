'use client';

import { create } from 'zustand';

interface CalculatorState {
  propertyPrice: number;
  downPaymentPercent: number;
  loanTerm: number; // in years
  setPropertyPrice: (price: number) => void;
  setDownPaymentPercent: (percent: number) => void;
  setLoanTerm: (years: number) => void;
  calculatePaymentPlan: () => {
    downPayment: number;
    monthlyPayment: number;
    totalInterest: number;
  };
}

export const useCalculator = create<CalculatorState>((set, get) => ({
  propertyPrice: 2000000,
  downPaymentPercent: 20,
  loanTerm: 20,
  
  setPropertyPrice: (price) => set({ propertyPrice: price }),
  setDownPaymentPercent: (percent) => set({ downPaymentPercent: percent }),
  setLoanTerm: (years) => set({ loanTerm: years }),
  
  calculatePaymentPlan: () => {
    const { propertyPrice, downPaymentPercent, loanTerm } = get();
    const downPayment = propertyPrice * (downPaymentPercent / 100);
    const loanAmount = propertyPrice - downPayment;
    const monthlyInterestRate = 0.04 / 12; // 4% annual interest
    const numberOfPayments = loanTerm * 12;
    
    const monthlyPayment = loanAmount * 
      (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
    
    const totalInterest = (monthlyPayment * numberOfPayments) - loanAmount;
    
    return {
      downPayment,
      monthlyPayment,
      totalInterest
    };
  }
}));
