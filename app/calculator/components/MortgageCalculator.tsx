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
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = loanTerm * 12;
  
  const calculateMonthlyPayment = () => {
    if (loanAmount <= 0) return 0;
    if (interestRate === 0) return loanAmount / numberOfPayments;
    
    return loanAmount * 
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  };
  
  const monthlyPayment = calculateMonthlyPayment();
  const totalPayment = monthlyPayment * numberOfPayments;
  const totalInterest = totalPayment - loanAmount;
  
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Mortgage Calculator</h2>
      
      {/* Interest Rate Control */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="font-medium text-gray-800">Interest Rate</label>
          <span className="text-2xl font-bold text-blue-600">{interestRate.toFixed(2)}%</span>
        </div>
        <input
          type="range"
          min="2"
          max="8"
          step="0.1"
          value={interestRate}
          onChange={(e) => setInterestRate(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span>2%</span>
          <span>5%</span>
          <span>8%</span>
        </div>
      </div>
      
      {/* Loan Term Buttons */}
      <div className="mb-6">
        <label className="font-medium text-gray-800 mb-2 block">Loan Term</label>
        <div className="grid grid-cols-4 gap-2">
          {[5, 10, 15, 20].map((years) => (
            <button
              key={years}
              onClick={() => setLoanTerm(years)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                loanTerm === years
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {years} yrs
            </button>
          ))}
        </div>
      </div>
      
      {/* Results */}
      <div className="space-y-4">
        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
          <span className="text-gray-700">Monthly Payment</span>
          <span className="text-xl font-bold text-blue-600">
            {formatCurrency(monthlyPayment)}
          </span>
        </div>
        
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
          <span className="text-gray-700">Total Interest</span>
          <span className="text-lg font-semibold text-gray-900">
            {formatCurrency(totalInterest)}
          </span>
        </div>
        
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
          <span className="text-gray-700">Total Payment</span>
          <span className="text-lg font-semibold text-gray-900">
            {formatCurrency(totalPayment)}
          </span>
        </div>
      </div>
      
      {/* Bank Rates */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="font-semibold text-gray-800 mb-3">Pre-Approved Bank Rates (UAE)</h4>
        <div className="space-y-2">
          {[
            { bank: 'Emirates NBD', rate: 4.25 },
            { bank: 'ADCB', rate: 4.0 },
            { bank: 'Mashreq', rate: 4.5 },
            { bank: 'DIB', rate: 3.99 },
          ].map((bank, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-sm text-gray-700">{bank.bank}</span>
              <span className={`text-sm font-medium ${
                bank.rate <= 4.0 ? 'text-green-600' : 'text-gray-900'
              }`}>
                {bank.rate}%
              </span>
            </div>
          ))}
        </div>
        <button className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all">
          Check Eligibility
        </button>
      </div>
    </div>
  );
}
