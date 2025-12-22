'use client';

import React, { useState, useEffect } from 'react';
import MortgageCalculator from './MortgageCalculator';

export default function PaymentCalculator() {
  const [propertyPrice, setPropertyPrice] = useState<string>('2,000,000');
  const [downPayment, setDownPayment] = useState<string>('400,000');
  const [interestRate, setInterestRate] = useState(4.5);
  const [loanTerm, setLoanTerm] = useState(20);

  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  const parseAmount = (val: string) => {
    const clean = val.replace(/,/g, '');
    return clean === '' ? 0 : Number(clean);
  };
  
  const formatInput = (val: string) => {
    const num = val.replace(/[^0-9]/g, '');
    if (!num) return '';
    return Number(num).toLocaleString('en-US');
  };

  useEffect(() => {
    const pPrice = parseAmount(propertyPrice);
    const dPayment = parseAmount(downPayment);
    const principal = pPrice - dPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = (loanTerm || 1) * 12;

    if (principal > 0 && monthlyRate > 0) {
      const x = Math.pow(1 + monthlyRate, numberOfPayments);
      const monthly = (principal * x * monthlyRate) / (x - 1);
      const totalPay = monthly * numberOfPayments;
      
      setMonthlyPayment(monthly);
      setTotalPayment(totalPay);
      setTotalInterest(totalPay - principal);
    } else {
      // Fallback for zero principal or interest
      setMonthlyPayment(principal > 0 && loanTerm > 0 ? principal / numberOfPayments : 0);
      setTotalPayment(principal > 0 ? principal : 0);
      setTotalInterest(0);
    }
  }, [propertyPrice, downPayment, interestRate, loanTerm]);

  return (
    <div className="space-y-6">
      <div className="bg-[#111] p-6 md:p-8 rounded-[2rem] border border-white/5 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em]">Valuation (AED)</label>
            <input 
              type="text" 
              inputMode="numeric"
              value={propertyPrice} 
              placeholder="Enter Price"
              onChange={(e) => setPropertyPrice(formatInput(e.target.value))}
              className="w-full bg-black/50 border border-white/10 p-4 rounded-xl text-xl font-mono font-bold text-[#D4AF37] outline-none focus:border-[#D4AF37] transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em]">Down Payment</label>
            <input 
              type="text" 
              inputMode="numeric"
              value={downPayment} 
              placeholder="Enter Equity"
              onChange={(e) => setDownPayment(formatInput(e.target.value))}
              className="w-full bg-black/50 border border-white/10 p-4 rounded-xl text-xl font-mono font-bold text-white outline-none focus:border-[#D4AF37] transition-all"
            />
          </div>
        </div>
      </div>

      <MortgageCalculator 
        monthlyPayment={monthlyPayment}
        totalInterest={totalInterest}
        totalPayment={totalPayment}
        interestRate={interestRate}
        loanTermYears={loanTerm}
        onInterestRateChange={setInterestRate}
        onLoanTermChange={setLoanTerm}
      />
    </div>
  );
}
