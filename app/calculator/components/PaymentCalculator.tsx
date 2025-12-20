'use client';

import { useEffect, useState } from 'react';
import { useCalculator } from '@/context/useCalculator';
import PaymentSlider from './PaymentSlider';
import PaymentBreakdown, { PaymentBreakdownData } from './PaymentBreakdown';
import HijriGregorianTimeline, { TimelineMilestone } from './HijriGregorianTimeline';
import MortgageCalculator from './MortgageCalculator';

export default function PaymentCalculator() {
  const {
    propertyPrice,
    downPaymentPercent,
    loanTermYears,
    setPropertyPrice,
    setDownPaymentPercent,
    setLoanTermYears,
    reset
  } = useCalculator();

  const [loading, setLoading] = useState(false);
  const currency = 'AED';

  // State structured for the new Breakdown component
  const [breakdownData, setBreakdownData] = useState<PaymentBreakdownData | null>(null);
  const [milestones, setMilestones] = useState<TimelineMilestone[]>([]);

  useEffect(() => {
    // Mocking the detailed data your new PaymentBreakdown expects
    const vatRate = 5;
    const regRate = 4;
    const serviceRate = 1;
    
    const vatAmount = propertyPrice * (vatRate / 100);
    const registrationFee = propertyPrice * (regRate / 100);
    const serviceFee = propertyPrice * (serviceRate / 100);
    const totalFees = vatAmount + registrationFee + serviceFee;

    setBreakdownData({
      propertyPrice,
      vatAmount,
      vatRate,
      registrationFee,
      registrationFeeRate: regRate,
      serviceFee,
      serviceFeeRate: serviceRate,
      totalFees,
      totalCost: propertyPrice + totalFees
    });

    setMilestones([
      { name: 'Booking', amount: propertyPrice * 0.1, dueDate: new Date() },
      { name: 'Construction Start', amount: propertyPrice * 0.2, dueDate: new Date(Date.now() + 1000*60*60*24*90) },
      { name: 'Handover', amount: propertyPrice * 0.7, dueDate: new Date(Date.now() + 1000*60*60*24*365) }
    ]);
  }, [propertyPrice]);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Elite Property Calculator</h1>
        <button onClick={reset} className="px-4 py-2 bg-gray-100 rounded-md">Reset</button>
      </div>

      <PaymentSlider
        propertyPrice={propertyPrice}
        downPaymentPercent={downPaymentPercent}
        loanTerm={loanTermYears}
        onPriceChange={setPropertyPrice}
        onDownPaymentChange={setDownPaymentPercent}
        onLoanTermChange={setLoanTermYears}
        currency={currency}
      />

      {breakdownData && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* FIXED: Using 'data' prop instead of 'plan' */}
          <PaymentBreakdown 
            data={breakdownData} 
            currency={currency} 
            language="en" 
          />
          
          <div className="space-y-8">
            <HijriGregorianTimeline milestones={milestones} currency={currency} />
            <MortgageCalculator 
              propertyPrice={propertyPrice}
              downPayment={propertyPrice * (downPaymentPercent / 100)}
              currency={currency}
              loanTermYears={loanTermYears}
            />
          </div>
        </div>
      )}
    </div>
  );
}
