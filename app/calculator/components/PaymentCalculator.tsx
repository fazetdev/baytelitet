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
  const [error, setError] = useState<string | null>(null);
  const currency = 'AED';

  // State for the new component structures
  const [breakdownData, setBreakdownData] = useState<PaymentBreakdownData | null>(null);
  const [milestones, setMilestones] = useState<TimelineMilestone[]>([]);
  const [mortgageData, setMortgageData] = useState<any>(null);

  useEffect(() => {
    const calculateAll = async () => {
      setLoading(true);
      try {
        // Mocking the data structure expected by your new components
        // In a real app, this would come from your /api/calculator
        const downPayment = propertyPrice * (downPaymentPercent / 100);
        const loanAmount = propertyPrice - downPayment;
        
        setBreakdownData({
          propertyPrice,
          vatAmount: propertyPrice * 0.05,
          vatRate: 5,
          registrationFee: propertyPrice * 0.04,
          registrationFeeRate: 4,
          serviceFee: 5000,
          serviceFeeRate: 0.1,
          totalFees: (propertyPrice * 0.09) + 5000,
          totalCost: propertyPrice + (propertyPrice * 0.09) + 5000
        });

        setMilestones([
          { name: 'Booking Fee', amount: propertyPrice * 0.1, dueDate: new Date() },
          { name: 'First Installment', amount: propertyPrice * 0.2, dueDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) },
          { name: 'Handover', amount: propertyPrice * 0.7, dueDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) }
        ]);

        setMortgageData({
          monthlyPayment: (loanAmount * 0.045) / 12, // Simplified
          totalInterest: loanAmount * 0.045 * loanTermYears,
          totalPayment: loanAmount + (loanAmount * 0.045 * loanTermYears)
        });

      } catch (err) {
        setError("Failed to calculate");
      } finally {
        setLoading(false);
      }
    };

    calculateAll();
  }, [propertyPrice, downPaymentPercent, loanTermYears]);

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
          <PaymentBreakdown data={breakdownData} currency={currency} />
          <div className="space-y-8">
            <HijriGregorianTimeline milestones={milestones} currency={currency} />
            <MortgageCalculator 
              propertyPrice={propertyPrice}
              downPayment={propertyPrice * (downPaymentPercent / 100)}
              monthlyPayment={mortgageData?.monthlyPayment}
              totalInterest={mortgageData?.totalInterest}
              totalPayment={mortgageData?.totalPayment}
              loanTermYears={loanTermYears}
              currency={currency}
            />
          </div>
        </div>
      )}
    </div>
  );
}
