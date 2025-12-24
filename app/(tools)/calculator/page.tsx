'use client';

import PaymentCalculator from './components/PaymentCalculator';

export default function CalculatorPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#D4AF37] italic mb-2 uppercase tracking-tighter">
            Financial Terminal
          </h1>
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.4em]">Bayt Elite Precision Analytics</p>
        </header>
        <PaymentCalculator />
      </div>
    </div>
  );
}
