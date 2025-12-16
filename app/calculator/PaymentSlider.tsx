'use client';

import { formatCurrency } from '@/lib/formatters';

interface PaymentSliderProps {
  propertyPrice: number;
  downPaymentPercent: number;
  loanTerm: number;
  onPriceChange: (value: number) => void;
  onDownPaymentChange: (value: number) => void;
  onLoanTermChange: (value: number) => void;
  language?: 'ar' | 'en';
}

export default function PaymentSlider({
  propertyPrice,
  downPaymentPercent,
  loanTerm,
  onPriceChange,
  onDownPaymentChange,
  onLoanTermChange,
  language = 'en'
}: PaymentSliderProps) {
  // Bilingual content
  const content = {
    en: {
      title: 'Adjust Your Plan',
      propertyPrice: 'Property Price',
      propertyDescription: 'Total value of the property',
      currency: 'AED',
      priceRange: 'Mid Range: ',
      downPayment: 'Down Payment',
      downPaymentDescription: 'Initial payment amount',
      loanTerm: 'Loan Term',
      loanTermDescription: 'Mortgage duration in years',
      monthlyPayments: 'monthly payments',
      quickSummary: 'Quick Summary',
      propertyValue: 'Property Value',
      remainingAmount: 'Remaining Amount',
      monthlyInstallment: 'Monthly Installment (Approx.)',
      perMonth: '/month'
    },
    ar: {
      title: 'اضبط خطتك',
      propertyPrice: 'سعر العقار',
      propertyDescription: 'القيمة الإجمالية للعقار',
      currency: 'درهم',
      priceRange: 'النطاق المتوسط: ',
      downPayment: 'الدفعة المقدمة',
      downPaymentDescription: 'مبلغ الدفعة الأولية',
      loanTerm: 'مدة القرض',
      loanTermDescription: 'مدة الرهن العقاري بالسنوات',
      monthlyPayments: 'دفعة شهرية',
      quickSummary: 'ملخص سريع',
      propertyValue: 'قيمة العقار',
      remainingAmount: 'المبلغ المتبقي',
      monthlyInstallment: 'القسط الشهري (تقريبي)',
      perMonth: '/شهر'
    }
  };

  const t = content[language];
  const isRTL = language === 'ar';

  const downPaymentAmount = propertyPrice * (downPaymentPercent / 100);
  const remainingAmount = propertyPrice - downPaymentAmount;

  return (
    // Base container uses light background and cool accent border
    <div 
      dir={isRTL ? 'rtl' : 'ltr'}
      className="bg-white rounded-2xl shadow-lg p-8 border border-bayt-cool/50"
    >
      <h2 className={`text-2xl font-bold text-bayt-dark mb-6 ${isRTL ? 'text-right' : ''}`}>
        {t.title}
      </h2>

      <div className="space-y-8">
        {/* Property Price Slider - Uses Warm Accent */}
        <div>
          <div className={`flex justify-between items-center mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={isRTL ? 'text-right' : ''}>
              <h3 className={`font-semibold text-bayt-dark ${isRTL ? 'text-right' : ''}`}>
                {t.propertyPrice}
              </h3>
              <p className={`text-sm text-bayt-cool ${isRTL ? 'text-right' : ''}`}>
                {t.propertyDescription}
              </p>
            </div>
            <div className={isRTL ? 'text-left' : 'text-right'}>
              {/* Value display uses the warm accent color */}
              <div className="text-3xl font-bold text-bayt-warm">
                {formatCurrency(propertyPrice)}
              </div>
              <div className="text-sm text-bayt-cool">{t.currency}</div>
            </div>
          </div>

          <input
            type="range"
            min="500000"
            max="20000000"
            step="50000"
            value={propertyPrice}
            onChange={(e) => onPriceChange(Number(e.target.value))}
            // Slider track gradient and thumb use the warm accent color
            className="w-full h-3 bg-gradient-to-r from-bayt-warm/20 to-bayt-warm/50 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-bayt-warm [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg"
          />

          <div className={`flex justify-between text-sm text-bayt-cool mt-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span>{formatCurrency(500000)}</span>
            <span className="font-medium">
              {t.priceRange}{formatCurrency(5000000)}
            </span>
            <span>{formatCurrency(20000000)}</span>
          </div>
        </div>

        {/* Down Payment Slider - Uses Cultural Accent */}
        <div>
          <div className={`flex justify-between items-center mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={isRTL ? 'text-right' : ''}>
              <h3 className={`font-semibold text-bayt-dark ${isRTL ? 'text-right' : ''}`}>
                {t.downPayment}
              </h3>
              <p className={`text-sm text-bayt-cool ${isRTL ? 'text-right' : ''}`}>
                {t.downPaymentDescription}
              </p>
            </div>
            <div className={isRTL ? 'text-left' : 'text-right'}>
              {/* Value display uses the cultural accent color */}
              <div className="text-3xl font-bold text-bayt-cultural">
                {downPaymentPercent}%
              </div>
              <div className="text-sm text-bayt-cool">
                {formatCurrency(downPaymentAmount)} {t.currency}
              </div>
            </div>
          </div>

          <input
            type="range"
            min="10"
            max="80"
            step="5"
            value={downPaymentPercent}
            onChange={(e) => onDownPaymentChange(Number(e.target.value))}
            // Slider track gradient and thumb use the cultural accent color
            className="w-full h-3 bg-gradient-to-r from-bayt-cultural/20 to-bayt-cultural/50 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-bayt-cultural [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg"
          />

          <div className={`grid grid-cols-4 gap-2 mt-3 ${isRTL ? 'text-right' : ''}`}>
            {[10, 20, 30, 50].map((percent) => (
              <button
                key={percent}
                onClick={() => onDownPaymentChange(percent)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  downPaymentPercent === percent
                    // Active state uses cultural accent
                    ? 'bg-bayt-cultural text-white'
                    // Inactive state uses light/cool background
                    : 'bg-bayt-light text-bayt-dark hover:bg-bayt-cool/20'
                }`}
              >
                {percent}%
              </button>
            ))}
          </div>
        </div>

        {/* Loan Term Slider - Uses Warm Accent (same as price) */}
        <div>
          <div className={`flex justify-between items-center mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={isRTL ? 'text-right' : ''}>
              <h3 className={`font-semibold text-bayt-dark ${isRTL ? 'text-right' : ''}`}>
                {t.loanTerm}
              </h3>
              <p className={`text-sm text-bayt-cool ${isRTL ? 'text-right' : ''}`}>
                {t.loanTermDescription}
              </p>
            </div>
            <div className={isRTL ? 'text-left' : 'text-right'}>
              {/* Value display uses the warm accent color */}
              <div className="text-3xl font-bold text-bayt-warm">
                {loanTerm} {language === 'ar' ? 'سنة' : 'years'}
              </div>
              <div className="text-sm text-bayt-cool">
                {loanTerm * 12} {t.monthlyPayments}
              </div>
            </div>
          </div>

          <input
            type="range"
            min="5"
            max="30"
            step="5"
            value={loanTerm}
            onChange={(e) => onLoanTermChange(Number(e.target.value))}
            // Slider track gradient and thumb use the warm accent color
            className="w-full h-3 bg-gradient-to-r from-bayt-warm/20 to-bayt-warm/50 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-bayt-warm [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg"
          />

          <div className={`grid grid-cols-4 gap-2 mt-3 ${isRTL ? 'text-right' : ''}`}>
            {[5, 10, 20, 30].map((years) => (
              <button
                key={years}
                onClick={() => onLoanTermChange(years)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  loanTerm === years
                    // Active state uses warm accent
                    ? 'bg-bayt-warm text-bayt-dark'
                    // Inactive state uses light/cool background
                    : 'bg-bayt-light text-bayt-dark hover:bg-bayt-cool/20'
                }`}
              >
                {years} {language === 'ar' ? 'سنة' : 'years'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Summary */}
      {/* Summary block uses warm/cool gradient and border */}
      <div className="mt-8 p-6 bg-gradient-to-r from-bayt-warm/10 to-bayt-cool/10 rounded-xl border border-bayt-cool/50">
        <h3 className={`font-bold text-bayt-dark mb-3 ${isRTL ? 'text-right' : ''}`}>
          {t.quickSummary}
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className={isRTL ? 'text-right' : ''}>
            <p className="text-sm text-bayt-cool">{t.propertyValue}</p>
            <p className="text-lg font-semibold text-bayt-dark">{formatCurrency(propertyPrice)}</p>
          </div>
          <div className={isRTL ? 'text-right' : ''}>
            <p className="text-sm text-bayt-cool">{t.downPayment}</p>
            {/* Down Payment figure uses cultural accent */}
            <p className="text-lg font-semibold text-bayt-cultural">{formatCurrency(downPaymentAmount)}</p>
          </div>
          <div className={isRTL ? 'text-right' : ''}>
            <p className="text-sm text-bayt-cool">{t.remainingAmount}</p>
            {/* Remaining figure uses warm accent */}
            <p className="text-lg font-semibold text-bayt-warm">{formatCurrency(remainingAmount)}</p>
          </div>
          <div className={isRTL ? 'text-right' : ''}>
            <p className="text-sm text-bayt-cool">{t.monthlyInstallment}</p>
            {/* Monthly Installment figure uses warm accent */}
            <p className="text-lg font-semibold text-bayt-warm">
              {formatCurrency(remainingAmount / (loanTerm > 0 ? (loanTerm * 12) : 1))}{t.perMonth}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}