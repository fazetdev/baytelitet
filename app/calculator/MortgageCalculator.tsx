'use client';

import { useState } from 'react';
import { formatCurrency } from '@/lib/formatters';

interface MortgageCalculatorProps {
  propertyPrice: number;
  downPayment: number;
  language?: 'ar' | 'en';
}

export default function MortgageCalculator({ 
  propertyPrice, 
  downPayment,
  language = 'en'
}: MortgageCalculatorProps) {
  const [interestRate, setInterestRate] = useState(4.5);
  const [loanTerm, setLoanTerm] = useState(20);

  // Bilingual content
  const content = {
    en: {
      title: 'Mortgage Calculator',
      interestRate: 'Interest Rate',
      loanTerm: 'Loan Term',
      monthlyPayment: 'Monthly Payment',
      totalInterest: 'Total Interest',
      totalPayment: 'Total Payment',
      bankRates: 'Pre-Approved Bank Rates (UAE)',
      checkEligibility: 'Check Eligibility',
      years: 'yrs',
      lowRate: 'Competitive Rate',
      highRate: 'Standard Rate'
    },
    ar: {
      title: 'حاسبة الرهن العقاري',
      interestRate: 'سعر الفائدة',
      loanTerm: 'مدة القرض',
      monthlyPayment: 'الدفعة الشهرية',
      totalInterest: 'إجمالي الفائدة',
      totalPayment: 'إجمالي السداد',
      bankRates: 'أسعار البنوك المعتمدة مسبقاً (الإمارات)',
      checkEligibility: 'تحقق من الأهلية',
      years: 'سنة',
      lowRate: 'سعر تنافسي',
      highRate: 'سعر عادي'
    }
  };

  const t = content[language];
  const isRTL = language === 'ar';

  const loanAmount = propertyPrice - downPayment;
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
    <div 
      dir={isRTL ? 'rtl' : 'ltr'}
      className="bg-white rounded-2xl shadow-lg p-6 border border-bayt-cool/50"
    >
      <h2 className={`text-xl font-bold text-bayt-dark mb-4 ${isRTL ? 'text-right' : ''}`}>
        {t.title}
      </h2>

      {/* Interest Rate Control */}
      <div className="mb-6">
        <div className={`flex justify-between items-center mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <label className={`font-medium text-bayt-dark ${isRTL ? 'text-right' : ''}`}>
            {t.interestRate}
          </label>
          <span className="text-2xl font-bold text-bayt-warm">{interestRate.toFixed(2)}%</span>
        </div>
        <input
          type="range"
          min="2"
          max="8"
          step="0.1"
          value={interestRate}
          onChange={(e) => setInterestRate(Number(e.target.value))}
          className="w-full h-2 bg-bayt-light rounded-lg appearance-none cursor-pointer accent-bayt-warm"
        />
        <div className={`flex justify-between text-sm text-bayt-cool mt-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <span>2%</span>
          <span>5%</span>
          <span>8%</span>
        </div>
      </div>

      {/* Loan Term Buttons */}
      <div className="mb-6">
        <label className={`font-medium text-bayt-dark mb-2 block ${isRTL ? 'text-right' : ''}`}>
          {t.loanTerm}
        </label>
        <div className={`grid grid-cols-4 gap-2 ${isRTL ? 'text-right' : ''}`}>
          {[5, 10, 15, 20].map((years) => (
            <button
              key={years}
              onClick={() => setLoanTerm(years)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                loanTerm === years
                  ? 'bg-bayt-warm text-bayt-dark'
                  : 'bg-bayt-light/50 text-bayt-dark hover:bg-bayt-cool/20'
              }`}
            >
              {years} {t.years}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        {/* Monthly Payment (Primary Result) */}
        <div className={`flex justify-between items-center p-3 bg-bayt-warm/20 rounded-lg border border-bayt-warm/50 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <span className={`text-bayt-dark ${isRTL ? 'text-right' : ''}`}>{t.monthlyPayment}</span>
          <span className="text-xl font-bold text-bayt-dark">
            {formatCurrency(monthlyPayment)}
          </span>
        </div>

        {/* Total Interest */}
        <div className={`flex justify-between items-center p-3 bg-bayt-light rounded-lg ${isRTL ? 'flex-row-reverse' : ''}`}>
          <span className={`text-bayt-dark ${isRTL ? 'text-right' : ''}`}>{t.totalInterest}</span>
          <span className="text-lg font-semibold text-bayt-warm">
            {formatCurrency(totalInterest)}
          </span>
        </div>

        {/* Total Payment */}
        <div className={`flex justify-between items-center p-3 bg-bayt-light rounded-lg ${isRTL ? 'flex-row-reverse' : ''}`}>
          <span className={`text-bayt-dark ${isRTL ? 'text-right' : ''}`}>{t.totalPayment}</span>
          <span className="text-lg font-semibold text-bayt-dark">
            {formatCurrency(totalPayment)}
          </span>
        </div>
      </div>

      {/* Bank Rates */}
      <div className="mt-6 pt-6 border-t border-bayt-cool/50">
        <h4 className={`font-semibold text-bayt-dark mb-3 ${isRTL ? 'text-right' : ''}`}>
          {t.bankRates}
        </h4>
        <div className="space-y-2">
          {[
            { bank: language === 'en' ? 'Emirates NBD' : 'الإمارات NBD', rate: 4.25 },
            { bank: language === 'en' ? 'ADCB' : 'أبوظبي التجاري', rate: 4.0 },
            { bank: language === 'en' ? 'Mashreq' : 'مصراف', rate: 4.5 },
            { bank: language === 'en' ? 'DIB' : 'دبي الإسلامي', rate: 3.99 },
          ].map((bank, index) => (
            <div key={index} className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className={`text-sm text-bayt-dark ${isRTL ? 'text-right' : ''}`}>{bank.bank}</span>
              <span className={`text-sm font-medium ${bank.rate <= 4.0 ? 'text-bayt-cultural' : 'text-bayt-dark'}`}>
                {bank.rate}%
                <span className={`text-xs ml-2 ${isRTL ? 'mr-2' : 'ml-2'}`}>
                  ({bank.rate <= 4.0 ? t.lowRate : t.highRate})
                </span>
              </span>
            </div>
          ))}
        </div>
        <button className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-bayt-warm to-yellow-700 text-bayt-dark rounded-lg font-semibold hover:from-yellow-700 hover:to-bayt-warm transition-all shadow-md">
          {t.checkEligibility}
        </button>
      </div>
    </div>
  );
}