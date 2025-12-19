'use client';

import { create } from 'zustand';

interface CalculatorState {
  propertyPrice: number;
  downPaymentPercent: number;
  loanTermYears: number; // in years
  setPropertyPrice: (price: number) => void;
  setDownPaymentPercent: (percent: number) => void;
  setLoanTermYears: (years: number) => void;
  reset: () => void;
}

const DEFAULTS = {
  propertyPrice: 2000000,
  downPaymentPercent: 20,
  loanTermYears: 20
};

export const useCalculator = create<CalculatorState>((set) => ({
  ...DEFAULTS,
  setPropertyPrice: (price) => set({ propertyPrice: price }),
  setDownPaymentPercent: (percent) => set({ downPaymentPercent: percent }),
  setLoanTermYears: (years) => set({ loanTermYears: years }),
  reset: () => set({ ...DEFAULTS })
}));
