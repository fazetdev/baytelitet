'use client';

import { useState } from 'react';
import { formatCurrency } from '@/lib/formatters';
import { Activity, ShieldCheck, Landmark, Percent } from 'lucide-react';

interface BankRate {
  name: string;
  rate: number;
  type: 'competitive' | 'standard';
  description?: string;
}

interface MortgageCalculatorProps {
  propertyPrice: number;
  downPayment: number;
  monthlyPayment?: number;
  totalInterest?: number;
  totalPayment?: number;
  interestRate?: number;
  loanTermYears?: number;
  currency?: string;
  language?: 'ar' | 'en';
  onInterestRateChange?: (rate: number) => void;
  onLoanTermChange?: (years: number) => void;
  onCheckEligibility?: () => void;
}

export default function MortgageCalculator({
  propertyPrice,
  downPayment,
  monthlyPayment = 0,
  totalInterest = 0,
  totalPayment = 0,
  interestRate = 4.5,
  loanTermYears = 20,
  currency = 'AED',
  language = 'en',
  onInterestRateChange,
  onLoanTermChange,
  onCheckEligibility,
}: MortgageCalculatorProps) {
  const [localInterestRate, setLocalInterestRate] = useState(interestRate);
  const [localLoanTerm, setLocalLoanTerm] = useState(loanTermYears);
  const isRTL = language === 'ar';

  const currentInterestRate = onInterestRateChange ? interestRate : localInterestRate;
  const currentLoanTerm = onLoanTermChange ? loanTermYears : localLoanTerm;

  const handleInterestRateChange = (rate: number) => {
    onInterestRateChange ? onInterestRateChange(rate) : setLocalInterestRate(rate);
  };

  const handleLoanTermChange = (years: number) => {
    onLoanTermChange ? onLoanTermChange(years) : setLocalLoanTerm(years);
  };

  const t = {
    en: {
      title: 'Digital Mortgage Engine',
      interestRate: 'Interest Rate',
      loanTerm: 'Loan Term',
      monthlyPayment: 'Monthly Commitment',
      totalInterest: 'Total Interest Cost',
      totalPayment: 'Total Repayment',
      bankRates: 'Bank Market Rates',
      checkEligibility: 'Check Executive Eligibility',
      years: 'YRS',
      loanAmount: 'Principal Loan Amount',
    },
    ar: {
      title: 'محرك الرهن الرقمي',
      interestRate: 'سعر الفائدة',
      loanTerm: 'مدة القرض',
      monthlyPayment: 'الالتزام الشهري',
      totalInterest: 'تكلفة الفائدة الإجمالية',
      totalPayment: 'إجمالي السداد',
      bankRates: 'أسعار السوق المصرفية',
      checkEligibility: 'تحقق من الأهلية التنفيذية',
      years: 'سنة',
      loanAmount: 'مبلغ القرض الأساسي',
    },
  }[language];

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="bg-[#111] rounded-[2.5rem] p-8 border border-white/5 shadow-2xl relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 p-8 opacity-5">
        <Activity size={120} className="text-[#D4AF37]" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-2 h-8 bg-[#D4AF37] rounded-full"></div>
          <h2 className="text-xl font-bold text-white uppercase tracking-widest">{t.title}</h2>
        </div>

        {/* Top Stats Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-black/40 p-6 rounded-3xl border border-white/5">
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-2">{t.loanAmount}</p>
            <p className="text-2xl font-mono font-bold text-[#D4AF37]">
              {formatCurrency(propertyPrice - downPayment)} <span className="text-[10px] text-gray-400">{currency}</span>
            </p>
          </div>
          <div className="bg-black/40 p-6 rounded-3xl border border-white/5">
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-2">{t.interestRate}</p>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-mono font-bold text-white">{currentInterestRate.toFixed(2)}%</p>
              <Percent size={16} className="text-[#D4AF37] opacity-50" />
            </div>
          </div>
        </div>

        {/* Monthly Payment "Digital Readout" */}
        <div className="bg-gradient-to-br from-[#1A1A1A] to-black p-8 rounded-[2rem] border-2 border-[#D4AF37]/20 mb-8 text-center shadow-[0_0_50px_rgba(212,175,55,0.1)]">
          <p className="text-[10px] text-[#D4AF37] font-black uppercase tracking-[0.3em] mb-4">{t.monthlyPayment}</p>
          <p className="text-5xl md:text-6xl font-mono font-bold text-white tracking-tighter">
            {formatCurrency(monthlyPayment)}
          </p>
          <p className="text-[12px] text-gray-500 mt-2 font-bold uppercase">{currency} / PER MONTH</p>
        </div>

        {/* Term Selection UI */}
        <div className="mb-8">
          <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-4 block">{t.loanTerm}</label>
          <div className="grid grid-cols-4 gap-3">
            {[5, 10, 15, 20, 25].map((years) => (
              <button
                key={years}
                onClick={() => handleLoanTermChange(years)}
                className={`py-4 rounded-2xl text-xs font-black transition-all border ${
                  currentLoanTerm === years
                    ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-lg shadow-[#D4AF37]/20'
                    : 'bg-white/5 text-gray-400 border-white/10 hover:border-[#D4AF37]/50'
                }`}
              >
                {years}{t.years}
              </button>
            ))}
          </div>
        </div>

        {/* Breakdown Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
           <div className="bg-white/5 p-4 rounded-2xl">
              <p className="text-[9px] text-gray-500 font-bold uppercase mb-1">{t.totalInterest}</p>
              <p className="text-sm font-mono font-bold text-white">{formatCurrency(totalInterest)}</p>
           </div>
           <div className="bg-white/5 p-4 rounded-2xl">
              <p className="text-[9px] text-gray-500 font-bold uppercase mb-1">{t.totalPayment}</p>
              <p className="text-sm font-mono font-bold text-white">{formatCurrency(totalPayment)}</p>
           </div>
        </div>

        {/* Bank Market Rates Section */}
        <div className="mt-10 pt-8 border-t border-white/5">
          <div className="flex items-center gap-2 mb-6">
            <Landmark size={14} className="text-[#D4AF37]" />
            <h4 className="text-[10px] font-black text-white uppercase tracking-widest">{t.bankRates}</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { name: 'Emirates NBD', rate: 4.25 },
              { name: 'ADCB', rate: 4.0 },
              { name: 'Mashreq', rate: 4.5 },
              { name: 'DIB', rate: 3.99 }
            ].map((bank, i) => (
              <div key={i} className="flex justify-between items-center p-4 bg-black/40 rounded-xl border border-white/5 group hover:border-[#D4AF37]/30 transition-all">
                <span className="text-xs font-bold text-gray-400 group-hover:text-white transition-colors">{bank.name}</span>
                <span className="text-xs font-mono font-bold text-[#D4AF37]">{bank.rate}%</span>
              </div>
            ))}
          </div>

          <button
            onClick={onCheckEligibility}
            className="w-full mt-8 py-5 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <ShieldCheck size={16} />
            {t.checkEligibility}
          </button>
        </div>
      </div>
    </div>
  );
}
