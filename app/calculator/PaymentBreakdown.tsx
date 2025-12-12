'use client';

import { formatCurrency } from '@/lib/formatters';
// Assuming these constants are available and correct
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

  // Updated color mapping for Bayt Elite consistency
  const breakdownItems = [
    { label: 'Property Price', amount: propertyPrice, color: 'text-bayt-dark', bg: 'bg-bayt-warm/30' },
    { label: 'VAT (5%)', amount: vat, color: 'text-bayt-dark', bg: 'bg-bayt-cool/30' },
    { label: 'Registration Fee (4%)', amount: registrationFee, color: 'text-bayt-dark', bg: 'bg-bayt-cool/30' },
    { label: 'Service Fee (2%)', amount: serviceFee, color: 'text-bayt-dark', bg: 'bg-bayt-cool/30' },
  ];
  
  // Custom milestone colors for the Bayt Elite progress bar
  const milestones = [
    { label: 'Booking Amount (10%)', percent: 10, color: 'bg-bayt-cultural' }, // Cultural Green for initial
    { label: 'Foundation (15%)', percent: 25, color: 'bg-bayt-warm/70' },
    { label: 'Structure (25%)', percent: 50, color: 'bg-bayt-warm' }, // Warm Gold for main construction
    { label: 'Finishing (30%)', percent: 80, color: 'bg-bayt-warm' },
    { label: 'Handover (20%)', percent: 100, color: 'bg-bayt-cool' }, // Cool Accent for final
  ];


  return (
    // Base container uses light background and cool accent border
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-bayt-cool/50">
      <h2 className="text-2xl font-bold text-bayt-dark mb-6">Complete Financial Breakdown</h2>

      {/* Cost Breakdown */}
      <div className="space-y-4 mb-8">
        {breakdownItems.map((item, index) => (
          // Hover state uses light accent
          <div 
            key={index} 
            className="flex justify-between items-center p-4 rounded-lg hover:bg-bayt-light/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              {/* Dot uses the specific item's light background */}
              <div className={`w-3 h-3 rounded-full ${item.bg}`}></div>
              <span className="font-medium text-bayt-dark">{item.label}</span>
            </div>
            {/* Amount text uses dark primary color */}
            <span className={`font-bold ${item.color}`}>
              {formatCurrency(item.amount)}
            </span>
          </div>
        ))}
      </div>

      {/* Total Cost */}
      <div className="border-t border-bayt-cool/50 pt-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-lg font-semibold text-bayt-dark">Total Cost</span>
          {/* Total Cost uses the warm accent color for high visibility */}
          <span className="text-3xl font-bold text-bayt-warm">{formatCurrency(totalCost)}</span>
        </div>
        <p className="text-sm text-bayt-cool">Including all government fees and charges</p>
      </div>

      {/* Construction Milestones */}
      <div className="mt-8 pt-6 border-t border-bayt-cool/50">
        <h3 className="font-bold text-bayt-dark mb-4">Construction Payment Milestones</h3>
        <div className="space-y-3">
          {milestones.map((milestone, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-bayt-dark">{milestone.label}</span>
                <span className="font-bold text-bayt-dark">
                  {/* Calculate amount based on the percentage of the property price */}
                  {formatCurrency(propertyPrice * (milestone.percent / 100))}
                </span>
              </div>
              {/* Progress bar uses light background */}
              <div className="h-2 bg-bayt-light rounded-full overflow-hidden">
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
