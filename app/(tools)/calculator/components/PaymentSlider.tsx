'use client';

import { formatCurrency } from '@/lib/formatters';

interface PaymentSliderProps {
  language?: string;
  currency?: string;
  monthlyInstallment?: number;
  propertyPrice: number;
  downPaymentPercent: number;
  loanTerm: number;
  onPriceChange: (value: number) => void;
  onDownPaymentChange: (value: number) => void;
  onLoanTermChange: (value: number) => void;
}

export default function PaymentSlider({
  propertyPrice,
  downPaymentPercent,
  loanTerm,
  onPriceChange,
  onDownPaymentChange,
  onLoanTermChange,
  language = 'en',
  currency = 'AED',
  monthlyInstallment
}: PaymentSliderProps) {

  const downPaymentAmount = propertyPrice * (downPaymentPercent / 100);
  const remainingAmount = propertyPrice - downPaymentAmount;
  const calculatedMonthly = monthlyInstallment || (remainingAmount / (loanTerm * 12));

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {language === 'ar' ? 'تعديل الخطة' : 'Adjust Your Plan'}
      </h2>

      <div className="space-y-8">
        {/* Property Price Slider */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-semibold text-gray-800">
                {language === 'ar' ? 'سعر العقار' : 'Property Price'}
              </h3>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">
                {formatCurrency(propertyPrice)}
              </div>
              <div className="text-sm text-gray-500">{currency}</div>
            </div>
          </div>

          <input
            type="range"
            min="500000"
            max="20000000"
            step="50000"
            value={propertyPrice}
            onChange={(e) => onPriceChange(Number(e.target.value))}
            className="w-full h-3 bg-blue-100 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Down Payment Slider */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-semibold text-gray-800">
                {language === 'ar' ? 'الدفعة الأولى' : 'Down Payment'}
              </h3>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600">
                {downPaymentPercent}%
              </div>
              <div className="text-sm text-gray-500">
                {formatCurrency(downPaymentAmount)} {currency}
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
            className="w-full h-3 bg-green-100 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Loan Term Slider */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-semibold text-gray-800">
                {language === 'ar' ? 'مدة القرض' : 'Loan Term'}
              </h3>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-purple-600">
                {loanTerm} {language === 'ar' ? 'سنوات' : 'years'}
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
            className="w-full h-3 bg-purple-100 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>

      {/* Summary */}
      <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-100">
        <h3 className="font-bold text-gray-900 mb-3">
          {language === 'ar' ? 'ملخص سريع' : 'Quick Summary'}
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">{language === 'ar' ? 'قيمة العقار' : 'Property Value'}</p>
            <p className="text-lg font-semibold text-gray-900">{formatCurrency(propertyPrice)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">{language === 'ar' ? 'القسط الشهري' : 'Monthly Installment'}</p>
            <p className="text-lg font-semibold text-purple-600">
              {formatCurrency(calculatedMonthly)} / {language === 'ar' ? 'شهرياً' : 'month'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
