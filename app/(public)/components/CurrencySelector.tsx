'use client';

import { useState, useEffect } from 'react';

const currencies = [
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ' },
  { code: 'SAR', name: 'Saudi Riyal', symbol: '﷼' },
  { code: 'QAR', name: 'Qatari Riyal', symbol: '﷼' },
  { code: 'KWD', name: 'Kuwaiti Dinar', symbol: 'د.ك' },
  { code: 'BHD', name: 'Bahraini Dinar', symbol: '.د.ب' },
  { code: 'OMR', name: 'Omani Rial', symbol: '﷼' },
];

export default function CurrencySelector() {
  const [selected, setSelected] = useState('AED');

  useEffect(() => {
    const saved = localStorage.getItem('bayt_currency');
    if (saved && currencies.some(c => c.code === saved)) setSelected(saved);
  }, []);

  const handleSelect = (code: string) => {
    setSelected(code);
    localStorage.setItem('bayt_currency', code);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
        <div>
          <h3 className="font-semibold text-bayt-dark">Default Currency</h3>
          <p className="text-sm text-gray-600">For property prices & calculations</p>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-bayt-dark">{selected}</div>
          <div className="text-sm text-gray-500">Selected</div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {currencies.map((currency) => (
          <button
            key={currency.code}
            onClick={() => handleSelect(currency.code)}
            className={`p-4 rounded-xl border-2 transition-all ${selected === currency.code ? 'border-bayt-warm bg-yellow-50' : 'border-gray-200 hover:border-bayt-cool'}`}
          >
            <div className="font-bold text-bayt-dark">{currency.code}</div>
            <div className="text-sm text-gray-600">{currency.name}</div>
            <div className="text-lg mt-1" dir="rtl">{currency.symbol}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
