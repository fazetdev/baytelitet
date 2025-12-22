'use client';

import React, { useState, useEffect } from 'react';
import MortgageCalculator from './MortgageCalculator';

export default function PaymentCalculator() {
  const [propertyPrice, setPropertyPrice] = useState(2000000);
  const [downPayment, setDownPayment] = useState(400000);
  const [interestRate, setInterestRate] = useState(4.5);
  const [loanTerm, setLoanTerm] = useState(20);

  // Financial State
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  useEffect(() => {
    const principal = propertyPrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    if (principal > 0 && monthlyRate > 0) {
      const x = Math.pow(1 + monthlyRate, numberOfPayments);
      const monthly = (principal * x * monthlyRate) / (x - 1);
      
      const totalPay = monthly * numberOfPayments;
      setMonthlyPayment(monthly);
      setTotalPayment(totalPay);
      setTotalInterest(totalPay - principal);
    }
  }, [propertyPrice, downPayment, interestRate, loanTerm]);

  return (
    <div className="space-y-8">
      {/* Precision Input Deck */}
      <div className="bg-[#111] p-8 rounded-[2.5rem] border border-white/5 shadow-2xl">
        <h3 className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.4em] mb-6 flex items-center gap-2">
          <span className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse"></span>
          Input Parameters
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Property Valuation</label>
            <input 
              type="number" 
              value={propertyPrice} 
              onChange={(e) => setPropertyPrice(Number(e.target.value))}
              className="w-full bg-black/50 border border-white/10 p-4 rounded-xl text-[#D4AF37] font-mono focus:border-[#D4AF37] outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Down Payment (Equity)</label>
            <input 
              type="number" 
              value={downPayment} 
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="w-full bg-black/50 border border-white/10 p-4 rounded-xl text-white font-mono focus:border-[#D4AF37] outline-none transition-all"
            />
          </div>
        </div>
      </div>

      <MortgageCalculator 
        propertyPrice={propertyPrice}
        downPayment={downPayment}
        interestRate={interestRate}
        loanTermYears={loanTerm}
        monthlyPayment={monthlyPayment}
        totalInterest={totalInterest}
        totalPayment={totalPayment}
        onInterestRateChange={setInterestRate}
        onLoanTermChange={setLoanTerm}
        language="en"
      />
    </div>
  );
}
