'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface MortgageCalculatorProps {
  monthlyPayment: number;
  totalInterest: number;
  totalPayment: number;
  interestRate: number;
  loanTermYears: number;
  onInterestRateChange: (rate: number) => void;
  onLoanTermChange: (years: number) => void;
  currency?: string;
}

export default function MortgageCalculator({
  monthlyPayment, totalInterest, totalPayment, interestRate, loanTermYears, 
  onInterestRateChange, onLoanTermChange, currency = 'AED'
}: MortgageCalculatorProps) {
  
  const fmt = (val: number) => Math.round(val).toLocaleString('en-US');

  return (
    <div className="bg-[#111] rounded-[2rem] p-6 md:p-8 border border-white/5 shadow-2xl relative overflow-hidden">
      <div className="relative z-10">
        
        <div className="bg-gradient-to-br from-[#1A1A1A] to-black p-6 md:p-8 rounded-[2rem] border-2 border-[#D4AF37]/20 mb-8 text-center shadow-inner">
          <p className="text-[10px] text-[#D4AF37] font-black uppercase tracking-[0.4em] mb-4">Monthly Commitment</p>
          <div className="flex items-baseline justify-center gap-2 overflow-hidden">
             <span className="text-4xl md:text-6xl font-mono font-bold text-white whitespace-nowrap tabular-nums tracking-tighter">
               {fmt(monthlyPayment)}
             </span>
             <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">{currency}</span>
          </div>
        </div>

        <div className="mb-8">
          <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-4 block">Loan Term (Years)</label>
          <div className="flex flex-wrap gap-2">
            {[5, 10, 15, 20, 25].map((y) => (
              <button key={y} onClick={() => onLoanTermChange(y)} className={`flex-1 py-3 rounded-xl text-[10px] font-black transition-all border ${loanTermYears === y ? 'bg-[#D4AF37] text-black border-[#D4AF37]' : 'bg-white/5 text-gray-400 border-white/10'}`}>
                {y}Y
              </button>
            ))}
            <input 
              type="number" 
              value={loanTermYears || ''} 
              onChange={(e) => onLoanTermChange(Number(e.target.value))}
              className="w-16 bg-black/50 border border-[#D4AF37]/30 rounded-xl p-2 text-center text-[#D4AF37] font-mono font-bold text-xs outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
           <div className="bg-white/5 p-4 rounded-xl border border-white/5">
              <p className="text-[8px] text-gray-500 font-black uppercase mb-1 tracking-widest">Total Interest</p>
              <p className="text-sm font-mono font-bold text-white">{fmt(totalInterest)}</p>
           </div>
           <div className="bg-white/5 p-4 rounded-xl border border-white/5">
              <p className="text-[8px] text-gray-500 font-black uppercase mb-1 tracking-widest">Total Repayment</p>
              <p className="text-sm font-mono font-bold text-white">{fmt(totalPayment)}</p>
           </div>
        </div>

        <div className="space-y-4 mb-8">
           <div className="p-5 bg-black/40 rounded-2xl border border-white/5">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Interest Rate</span>
                <span className="text-xl font-mono font-bold text-[#D4AF37]">{interestRate}%</span>
              </div>
              <input 
                type="range" min="1" max="10" step="0.1" 
                value={interestRate} 
                onChange={(e) => onInterestRateChange(Number(e.target.value))} 
                className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]" 
              />
           </div>
        </div>

        <button className="w-full py-5 bg-[#D4AF37] text-black rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3">
          <ShieldCheck size={18} /> Eligibility Status
        </button>
      </div>
    </div>
  );
}
