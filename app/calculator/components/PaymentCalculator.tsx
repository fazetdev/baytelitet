'use client';

import { useEffect, useState } from 'react';
import { useCalculator } from '@/context/useCalculator';
import PaymentSlider from './PaymentSlider';
import PaymentBreakdown from './PaymentBreakdown';
import HijriGregorianTimeline from './HijriGregorianTimeline';
import MortgageCalculator from './MortgageCalculator';

interface PaymentPlan {
  downPayment: number;
  loanAmount: number;
  monthlyPayment: number;
  totalInterest: number;
  totalPayment: number;
  numberOfPayments: number;
  annualInterestRate: number;
}

export default function PaymentCalculator() {
  // Use Zustand context - single source of truth for UI state
  const {
    propertyPrice,
    downPaymentPercent,
    loanTermYears,
    setPropertyPrice,
    setDownPaymentPercent,
    setLoanTermYears,
    reset
  } = useCalculator();

  const [paymentPlan, setPaymentPlan] = useState<PaymentPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currency] = useState('AED'); // Could come from context/settings

  // Default interest rate (should be configurable via context/settings)
  const annualInterestRate = 4.5;

  useEffect(() => {
    const calculatePayment = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/calculator', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            propertyPrice,
            downPaymentPercent,
            loanTermYears,
            annualInterestRate
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Calculation failed');
        }

        if (!data.success) {
          throw new Error(data.error || 'Invalid response');
        }

        setPaymentPlan(data.data);
      } catch (err: any) {
        setError(err.message || 'Failed to calculate payment plan');
        console.error('Calculation error:', err);
      } finally {
        setLoading(false);
      }
    };

    // Debounce to avoid too many API calls on slider changes
    const timeoutId = setTimeout(() => {
      calculatePayment();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [propertyPrice, downPaymentPercent, loanTermYears, annualInterestRate]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dynamic Payment Calculator</h1>
            <p className="text-gray-600 mt-2">Calculate your payment plan with complete transparency</p>
          </div>
          <button
            onClick={reset}
            className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            aria-label="Reset calculator to default values"
          >
            Reset to Defaults
          </button>
        </div>
      </div>

      {/* Payment Slider - Note the prop mapping from context */}
      <PaymentSlider
        propertyPrice={propertyPrice}
        downPaymentPercent={downPaymentPercent}
        loanTerm={loanTermYears}                    // Map context's loanTermYears to loanTerm prop
        onPriceChange={setPropertyPrice}
        onDownPaymentChange={setDownPaymentPercent}
        onLoanTermChange={setLoanTermYears}         // Map context's setLoanTermYears to onLoanTermChange
        language="en"
        currency={currency}
        monthlyInstallment={paymentPlan?.monthlyPayment} // Pass real API-calculated value
      />

      {/* Loading State */}
      {loading && (
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-3"></div>
            <p className="text-blue-700">Calculating your payment plan...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="mt-8 p-4 bg-red-50 rounded-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">Error: {error}</p>
              <button
                onClick={() => setError(null)}
                className="mt-2 text-sm text-red-600 hover:text-red-800"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Results - Only show when we have valid payment plan data */}
      {paymentPlan && !loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <PaymentBreakdown 
            plan={paymentPlan} 
            propertyPrice={propertyPrice}
            currency={currency}
          />
          <div className="space-y-6">
            <HijriGregorianTimeline 
              totalAmount={propertyPrice}
              downPayment={paymentPlan.downPayment}
              startDate={new Date()}
              currency={currency}
            />
            <MortgageCalculator 
              propertyPrice={propertyPrice}
              downPayment={paymentPlan.downPayment}
              loanTermYears={loanTermYears}
              interestRate={annualInterestRate}
              currency={currency}
            />
          </div>
        </div>
      )}

      {/* Empty State - When no results yet (initial load) */}
      {!paymentPlan && !loading && !error && (
        <div className="mt-8 p-8 text-center bg-gray-50 rounded-lg">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Adjust the sliders above</h3>
          <p className="mt-1 text-sm text-gray-500">Change property price, down payment, or loan term to see payment calculations.</p>
        </div>
      )}
    </div>
  );
}
