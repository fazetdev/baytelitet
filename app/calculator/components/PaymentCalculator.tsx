'use client';

import { useState } from 'react';
import PaymentSlider from './PaymentSlider';
import PaymentBreakdown from './PaymentBreakdown';
import HijriGregorianTimeline from './HijriGregorianTimeline';
import MortgageCalculator from './MortgageCalculator';
import { calculatePaymentPlan } from '@/lib/calculations';

export default function PaymentCalculator() {
  const [propertyPrice, setPropertyPrice] = useState(2000000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [loanTerm, setLoanTerm] = useState(20);

  const paymentPlan = calculatePaymentPlan(propertyPrice, downPaymentPercent, loanTerm);
  
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dynamic Payment Calculator</h1>
        <p className="text-gray-600 mt-2">Calculate your payment plan with complete transparency</p>
      </div>

      <PaymentSlider
        propertyPrice={propertyPrice}
        downPaymentPercent={downPaymentPercent}
        loanTerm={loanTerm}
        onPriceChange={setPropertyPrice}
        onDownPaymentChange={setDownPaymentPercent}
        onLoanTermChange={setLoanTerm}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <PaymentBreakdown plan={paymentPlan} propertyPrice={propertyPrice} />
        <div className="space-y-6">
          <HijriGregorianTimeline 
            totalAmount={propertyPrice}
            downPayment={paymentPlan.downPayment}
            startDate={new Date()}
          />
          <MortgageCalculator 
            propertyPrice={propertyPrice}
            downPayment={paymentPlan.downPayment}
          />
        </div>
      </div>
    </div>
  );
}
