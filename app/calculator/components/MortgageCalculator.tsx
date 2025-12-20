'use client';

import { useState } from 'react';
import { formatCurrency } from '@/lib/formatters';

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
    if (onInterestRateChange) {
      onInterestRateChange(rate);
    } else {
      setLocalInterestRate(rate);
    }
  };

  const handleLoanTermChange = (years: number) => {
    if (onLoanTermChange) {
      onLoanTermChange(years);
    } else {
      setLocalLoanTerm(years);
    }
  };

  const content = {
    en: {
      title: 'Mortgage Calculator',
      interestRate: 'Interest Rate',
      loanTerm: 'Loan Term',
      monthlyPayment: 'Monthly Payment',
      totalInterest: 'Total Interest',
      totalPayment: 'Total Payment',
      bankRates: 'Pre-Approved Bank Rates',
      checkEligibility: 'Check Eligibility',
      years: 'years',
      lowRate: 'Competitive',
      highRate: 'Standard',
      loanAmount: 'Loan Amount',
      calculateNow: 'Calculate Now',
    },
    ar: {
      title: 'حاسبة الرهن العقاري',
      interestRate: 'سعر الفائدة',
      loanTerm: 'مدة القرض',
      monthlyPayment: 'الدفعة الشهرية',
      totalInterest: 'إجمالي الفائدة',
      totalPayment: 'إجمالي السداد',
      bankRates: 'أسعار البنوك المعتمدة',
      checkEligibility: 'تحقق من الأهلية',
      years: 'سنة',
      lowRate: 'تنافسي',
      highRate: 'عادي',
      loanAmount: 'مبلغ القرض',
      calculateNow: 'احسب الآن',
    },
  };

  const t = content[language];

  const bankRates: BankRate[] = [
    { name: language === 'ar' ? 'الإمارات NBD' : 'Emirates NBD', rate: 4.25, type: 'competitive' },
    { name: language === 'ar' ? 'أبوظبي التجاري' : 'ADCB', rate: 4.0, type: 'competitive' },
    { name: language === 'ar' ? 'مصرف المشرق' : 'Mashreq', rate: 4.5, type: 'standard' },
    { name: language === 'ar' ? 'دبي الإسلامي' : 'DIB', rate: 3.99, type: 'competitive', description: language === 'ar' ? 'تمويل إسلامي' : 'Islamic Financing' },
  ];

  const loanAmount = propertyPrice - downPayment;

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="bg-white rounded-2xl shadow-lg p-6 border border-bayt-cool/50">
      <h2 className={`text-xl font-bold text-bayt-dark mb-4 ${isRTL ? 'text-right' : ''}`}>
        {t.title}
      </h2>

      <div className={`mb-6 p-4 bg-bayt-light/30 rounded-lg ${isRTL ? 'text-right' : ''}`}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-bayt-cool">{t.loanAmount}</p>
            <p className="text-lg font-semibold text-bayt-dark">{formatCurrency(loanAmount)}</p>
          </div>
          <div className={isRTL ? 'text-right' : ''}>
            <p className="text-sm text-bayt-cool">{t.interestRate}</p>
            <p className="text-lg font-semibold text-bayt-warm">{currentInterestRate.toFixed(2)}%</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className={`flex justify-between items-center mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <label className={`font-medium text-bayt-dark ${isRTL ? 'text-right' : ''}`}>
            {t.interestRate}
          </label>
          <span className="text-2xl font-bold text-bayt-warm">
            {currentInterestRate.toFixed(2)}%
          </span>
        </div>
        <input
          type="range"
          min="2"
          max="8"
          step="0.1"
          value={currentInterestRate}
          onChange={(e) => handleInterestRateChange(Number(e.target.value))}
          className="w-full h-2 bg-bayt-light rounded-lg appearance-none cursor-pointer accent-bayt-warm"
        />
      </div>

      <div className="mb-6">
        <label className={`font-medium text-bayt-dark mb-2 block ${isRTL ? 'text-right' : ''}`}>
          {t.loanTerm}
        </label>
        <div className={`grid grid-cols-4 gap-2 ${isRTL ? 'text-right' : ''}`}>
          {[5, 10, 15, 20].map((years) => (
            <button
              key={years}
              onClick={() => handleLoanTermChange(years)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                currentLoanTerm === years
                  ? 'bg-bayt-warm text-bayt-dark'
                  : 'bg-bayt-light/50 text-bayt-dark hover:bg-bayt-cool/20'
              }`}
            >
              {years} {t.years}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div className={`flex justify-between items-center p-3 bg-bayt-warm/20 rounded-lg border border-bayt-warm/50 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <span className={`text-bayt-dark font-medium ${isRTL ? 'text-right' : ''}`}>
            {t.monthlyPayment}
          </span>
          <span className="text-xl font-bold text-bayt-dark">
            {currency} {formatCurrency(monthlyPayment)}
          </span>
        </div>

        <div className={`flex justify-between items-center p-3 bg-bayt-light/30 rounded-lg ${isRTL ? 'flex-row-reverse' : ''}`}>
          <span className={`text-bayt-dark ${isRTL ? 'text-right' : ''}`}>{t.totalInterest}</span>
          <span className="text-lg font-semibold text-bayt-warm">
            {currency} {formatCurrency(totalInterest)}
          </span>
        </div>

        <div className={`flex justify-between items-center p-3 bg-bayt-light/30 rounded-lg ${isRTL ? 'flex-row-reverse' : ''}`}>
          <span className={`text-bayt-dark ${isRTL ? 'text-right' : ''}`}>{t.totalPayment}</span>
          <span className="text-lg font-semibold text-bayt-dark">
            {currency} {formatCurrency(totalPayment)}
          </span>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-bayt-cool/50">
        <h4 className={`font-semibold text-bayt-dark mb-3 ${isRTL ? 'text-right' : ''}`}>
          {t.bankRates}
        </h4>
        <div className="space-y-2">
          {bankRates.map((bank, index) => (
            <div key={index} className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className={`flex flex-col ${isRTL ? 'text-right' : ''}`}>
                <span className="text-sm text-bayt-dark">{bank.name}</span>
                {bank.description && (
                  <span className="text-xs text-bayt-cool">{bank.description}</span>
                )}
              </div>
              <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span className={`text-sm font-medium ${bank.type === 'competitive' ? 'text-bayt-cultural' : 'text-bayt-dark'}`}>
                  {bank.rate}%
                </span>
                <span className="text-xs text-bayt-cool">
                  ({bank.type === 'competitive' ? t.lowRate : t.highRate})
                </span>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onCheckEligibility}
          className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-bayt-warm to-yellow-700 text-bayt-dark rounded-lg font-semibold hover:from-yellow-700 hover:to-bayt-warm transition-all shadow-md"
        >
          {t.checkEligibility}
        </button>
      </div>
    </div>
  );
}
