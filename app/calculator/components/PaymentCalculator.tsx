'use client';

import React, { useState, useEffect } from 'react';
import MortgageCalculator from './MortgageCalculator';
import { Play, ChevronDown } from 'lucide-react';

export default function PaymentCalculator() {
  const [propertyPrice, setPropertyPrice] = useState<string>('2,000,000');
  const [downPayment, setDownPayment] = useState<string>('1,000,000');
  const [propertyStatus, setPropertyStatus] = useState<'ready' | 'off-plan'>('ready');
  const [interestRate, setInterestRate] = useState(4.5);
  const [loanTerm, setLoanTerm] = useState(20);
  const [isCalculated, setIsCalculated] = useState(false);

  const [results, setResults] = useState({
    monthly: 0, totalInterest: 0, totalPayment: 0, 
    equityRatio: 0, isEligible: false
  });

  const parse = (val: string) => Number(val.replace(/,/g, '')) || 0;
  const format = (val: string) => {
    const num = val.replace(/[^0-9]/g, '');
    return num ? Number(num).toLocaleString('en-US') : '';
  };

  const handleCalculate = () => {
    const p = parse(propertyPrice);
    const d = parse(downPayment);
    const principal = p - d;
    const monthlyRate = interestRate / 100 / 12;
    const n = loanTerm * 12;

    const monthly = principal * (monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
    
    // Eligibility Logic: Price >= 2M AND (Ready Property) AND (Mortgage <= 50% or Equity >= 50%)
    const equityRatio = (d / p) * 100;
    const isEligible = p >= 2000000 && propertyStatus === 'ready' && equityRatio >= 50;

    setResults({
      monthly, totalInterest: (monthly * n) - principal, totalPayment: monthly * n,
      equityRatio, isEligible
    });
    setIsCalculated(true);
  };

  return (
    <div className="space-y-10 pb-20">
      <section className="bg-[#111] p-8 rounded-[2.5rem] border border-[#D4AF37]/20 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Property Value (AED)</label>
            <input type="text" inputMode="numeric" value={propertyPrice} onChange={(e) => setPropertyPrice(format(e.target.value))} className="w-full bg-black/50 border border-white/10 p-5 rounded-2xl text-2xl font-mono text-[#D4AF37] outline-none focus:border-[#D4AF37]" />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Down Payment / Equity</label>
            <input type="text" inputMode="numeric" value={downPayment} onChange={(e) => setDownPayment(format(e.target.value))} className="w-full bg-black/50 border border-white/10 p-5 rounded-2xl text-2xl font-mono text-white outline-none focus:border-[#D4AF37]" />
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <button onClick={() => setPropertyStatus('ready')} className={`flex-1 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${propertyStatus === 'ready' ? 'bg-[#D4AF37] text-black border-[#D4AF37]' : 'bg-white/5 text-gray-500 border-white/10'}`}>Completed Property</button>
          <button onClick={() => setPropertyStatus('off-plan')} className={`flex-1 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${propertyStatus === 'off-plan' ? 'bg-[#D4AF37] text-black border-[#D4AF37]' : 'bg-white/5 text-gray-500 border-white/10'}`}>Off-Plan</button>
        </div>

        <button onClick={handleCalculate} className="w-full mt-10 py-6 bg-[#D4AF37] text-black rounded-2xl font-black uppercase text-xs tracking-[0.3em] flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(212,175,55,0.2)] hover:scale-[1.01] transition-transform">
          <Play size={16} fill="black" /> Run Eligibility Diagnostic
        </button>
      </section>

      {isCalculated && (
        <div className="animate-in fade-in slide-in-from-bottom-10 duration-700">
          <div className="flex flex-col items-center mb-10"><ChevronDown className="text-[#D4AF37] animate-bounce" /></div>
          <MortgageCalculator 
            monthlyPayment={results.monthly}
            totalInterest={results.totalInterest}
            totalPayment={results.totalPayment}
            interestRate={interestRate}
            loanTermYears={loanTerm}
            onInterestRateChange={(r) => {setInterestRate(r); setIsCalculated(false);}}
            onLoanTermChange={(y) => {setLoanTerm(y); setIsCalculated(false);}}
            isEligible={results.isEligible}
            equityRatio={results.equityRatio}
            propertyPrice={parse(propertyPrice)}
          />
        </div>
      )}
    </div>
  );
}
