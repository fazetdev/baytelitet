'use client';

import { formatCurrency } from '@/lib/formatters';
import { VAT_RATE, REGISTRATION_FEE_PERCENTAGE } from '@/lib/constants';

interface PaymentBreakdownProps {
  plan: any;
  propertyPrice: number;
}

export default function PaymentBreakdown({ plan, propertyPrice }: PaymentBreakdownProps) {
  const vat = propertyPrice * VAT_RATE;
  const registrationFee = propertyPrice * REGISTRATION_FEE_PERCENTAGE;
  const serviceFee = propertyPrice * 0.02; // 2% service fee
  const totalFees = vat + registrationFee + serviceFee;
  const totalCost = propertyPrice + totalFees;
  
  const breakdownItems = [
    { label: 'Property Price', amount: propertyPrice, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'VAT (5%)', amount: vat, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Registration Fee (4%)', amount: registrationFee, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Service Fee (2%)', amount: serviceFee, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Complete Financial Breakdown</h2>
      
      {/* Cost Breakdown */}
      <div className="space-y-4 mb-8">
        {breakdownItems.map((item, index) => (
          <div key={index} className="flex justify-between items-center p-4 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${item.bg}`}></div>
              <span className="font-medium text-gray-800">{item.label}</span>
            </div>
            <span className={`font-bold ${item.color}`}>
              {formatCurrency(item.amount)}
            </span>
          </div>
        ))}
      </div>

      {/* Total Cost */}
      <div className="border-t border-gray-200 pt-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-lg font-semibold text-gray-900">Total Cost</span>
          <span className="text-3xl font-bold text-gray-900">{formatCurrency(totalCost)}</span>
        </div>
        <p className="text-sm text-gray-600">Including all government fees and charges</p>
      </div>

      {/* Construction Milestones */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="font-bold text-gray-900 mb-4">Construction Payment Milestones</h3>
        <div className="space-y-3">
          {[
            { label: 'Booking Amount (10%)', percent: 10, color: 'bg-blue-500' },
            { label: 'Foundation (15%)', percent: 25, color: 'bg-green-500' },
            { label: 'Structure (25%)', percent: 50, color: 'bg-amber-500' },
            { label: 'Finishing (30%)', percent: 80, color: 'bg-orange-500' },
            { label: 'Handover (20%)', percent: 100, color: 'bg-red-500' },
          ].map((milestone, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-700">{milestone.label}</span>
                <span className="font-bold text-gray-900">{formatCurrency(propertyPrice * (milestone.percent / 100))}</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${milestone.color} rounded-full transition-all duration-500`}
                  style={{ width: `${milestone.percent}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
