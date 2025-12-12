'use client';

import { formatCurrency } from '@/lib/formatters';

interface PaymentSliderProps {
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
  onLoanTermChange
}: PaymentSliderProps) {
  
  const downPaymentAmount = propertyPrice * (downPaymentPercent / 100);
  const remainingAmount = propertyPrice - downPaymentAmount;
  
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Adjust Your Plan</h2>
      
      <div className="space-y-8">
        {/* Property Price Slider */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-semibold text-gray-800">Property Price</h3>
              <p className="text-sm text-gray-600">Total value of the property</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">
                {formatCurrency(propertyPrice)}
              </div>
              <div className="text-sm text-gray-500">AED</div>
            </div>
          </div>
          
          <input
            type="range"
            min="500000"
            max="20000000"
            step="50000"
            value={propertyPrice}
            onChange={(e) => onPriceChange(Number(e.target.value))}
            className="w-full h-3 bg-gradient-to-r from-blue-100 to-blue-300 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg"
          />
          
          <div className="flex justify-between text-sm text-gray-600 mt-3">
            <span>{formatCurrency(500000)}</span>
            <span className="font-medium">Mid Range: {formatCurrency(5000000)}</span>
            <span>{formatCurrency(20000000)}</span>
          </div>
        </div>

        {/* Down Payment Slider */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-semibold text-gray-800">Down Payment</h3>
              <p className="text-sm text-gray-600">Initial payment amount</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600">
                {downPaymentPercent}%
              </div>
              <div className="text-sm text-gray-500">
                {formatCurrency(downPaymentAmount)} AED
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
            className="w-full h-3 bg-gradient-to-r from-green-100 to-green-300 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-600 [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg"
          />
          
          <div className="grid grid-cols-4 gap-2 mt-3">
            {[10, 20, 30, 50].map((percent) => (
              <button
                key={percent}
                onClick={() => onDownPaymentChange(percent)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  downPaymentPercent === percent
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {percent}%
              </button>
            ))}
          </div>
        </div>

        {/* Loan Term Slider */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-semibold text-gray-800">Loan Term</h3>
              <p className="text-sm text-gray-600">Mortgage duration in years</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-purple-600">
                {loanTerm} years
              </div>
              <div className="text-sm text-gray-500">
                {loanTerm * 12} monthly payments
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
            className="w-full h-3 bg-gradient-to-r from-purple-100 to-purple-300 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-600 [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg"
          />
          
          <div className="grid grid-cols-4 gap-2 mt-3">
            {[5, 10, 20, 30].map((years) => (
              <button
                key={years}
                onClick={() => onLoanTermChange(years)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  loanTerm === years
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {years} years
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
        <h3 className="font-bold text-gray-900 mb-3">Quick Summary</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Property Value</p>
            <p className="text-lg font-semibold text-gray-900">{formatCurrency(propertyPrice)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Down Payment</p>
            <p className="text-lg font-semibold text-green-600">{formatCurrency(downPaymentAmount)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Remaining Amount</p>
            <p className="text-lg font-semibold text-blue-600">{formatCurrency(remainingAmount)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Monthly Installment</p>
            <p className="text-lg font-semibold text-purple-600">
              {formatCurrency(remainingAmount / (loanTerm * 12))}/month
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
