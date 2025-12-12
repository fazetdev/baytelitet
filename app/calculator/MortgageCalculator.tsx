'use client';

import { useState } from 'react';
import { formatCurrency } from '@/lib/formatters';

interface MortgageCalculatorProps {
  propertyPrice: number;
  downPayment: number;
}

export default function MortgageCalculator({ propertyPrice, downPayment }: MortgageCalculatorProps) {
  const [interestRate, setInterestRate] = useState(4.5);
  const [loanTerm, setLoanTerm] = useState(20);

  const loanAmount = propertyPrice - downPayment;
  // Calculation logic remains the same
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = loanTerm * 12;

  const calculateMonthlyPayment = () => {
    if (loanAmount <= 0) return 0;
    if (interestRate === 0) return loanAmount / numberOfPayments;

    return loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  };

  const monthlyPayment = calculateMonthlyPayment();
  const totalPayment = monthlyPayment * numberOfPayments;
  const totalInterest = totalPayment - loanAmount;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-bayt-cool/50">
      <h2 className="text-xl font-bold text-bayt-dark mb-4">Mortgage Calculator</h2>

      {/* Interest Rate Control */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="font-medium text-bayt-dark">Interest Rate</label>
          {/* Rate display uses the warm financial accent */}
          <span className="text-2xl font-bold text-bayt-warm">{interestRate.toFixed(2)}%</span>
        </div>
        <input
          type="range"
          min="2"
          max="8"
          step="0.1"
          value={interestRate}
          onChange={(e) => setInterestRate(Number(e.target.value))}
          // Slider track color uses light background, thumb color should be warm
          className="w-full h-2 bg-bayt-light rounded-lg appearance-none cursor-pointer accent-bayt-warm"
        />
        <div className="flex justify-between text-sm text-bayt-cool mt-2">
          <span>2%</span>
          <span>5%</span>
          <span>8%</span>
        </div>
      </div>

      {/* Loan Term Buttons */}
      <div className="mb-6">
        <label className="font-medium text-bayt-dark mb-2 block">Loan Term</label>
        <div className="grid grid-cols-4 gap-2">
          {[5, 10, 15, 20].map((years) => (
            <button
              key={years}
              onClick={() => setLoanTerm(years)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                loanTerm === years
                  // Active state uses warm accent color
                  ? 'bg-bayt-warm text-bayt-dark'
                  // Inactive state uses cool/light background
                  : 'bg-bayt-light/50 text-bayt-dark hover:bg-bayt-cool/20'
              }`}
            >
              {years} yrs
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        {/* Monthly Payment (Primary Result) */}
        <div className="flex justify-between items-center p-3 bg-bayt-warm/20 rounded-lg border border-bayt-warm/50">
          <span className="text-bayt-dark">Monthly Payment</span>
          <span className="text-xl font-bold text-bayt-dark">
            {formatCurrency(monthlyPayment)}
          </span>
        </div>

        {/* Total Interest */}
        <div className="flex justify-between items-center p-3 bg-bayt-light rounded-lg">
          <span className="text-bayt-dark">Total Interest</span>
          <span className="text-lg font-semibold text-bayt-warm">
            {formatCurrency(totalInterest)}
          </span>
        </div>

        {/* Total Payment */}
        <div className="flex justify-between items-center p-3 bg-bayt-light rounded-lg">
          <span className="text-bayt-dark">Total Payment</span>
          <span className="text-lg font-semibold text-bayt-dark">
            {formatCurrency(totalPayment)}
          </span>
        </div>
      </div>

      {/* Bank Rates */}
      <div className="mt-6 pt-6 border-t border-bayt-cool/50">
        <h4 className="font-semibold text-bayt-dark mb-3">Pre-Approved Bank Rates (UAE)</h4>
        <div className="space-y-2">
          {[
            { bank: 'Emirates NBD', rate: 4.25 },
            { bank: 'ADCB', rate: 4.0 },
            { bank: 'Mashreq', rate: 4.5 },
            { bank: 'DIB', rate: 3.99 },
          ].map((bank, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-sm text-bayt-dark">{bank.bank}</span>
              <span className={`text-sm font-medium ${
                // Use cultural green for favorable/low rates
                bank.rate <= 4.0 ? 'text-bayt-cultural' : 'text-bayt-dark'
              }`}>
                {bank.rate}%
              </span>
            </div>
          ))}
        </div>
        {/* Button uses primary warm CTA accent */}
        <button className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-bayt-warm to-yellow-700 text-bayt-dark rounded-lg font-semibold hover:from-yellow-700 hover:to-bayt-warm transition-all shadow-md">
          Check Eligibility
        </button>
      </div>
    </div>
  );
}
