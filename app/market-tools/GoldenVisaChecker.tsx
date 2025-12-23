'use client';

import { useState, useEffect } from 'react';

interface Country {
  code: string;
  nameEn: string;
  nameAr: string;
  goldenVisaThreshold: number;
}

const countries: Country[] = [
  { code: 'UAE', nameEn: 'United Arab Emirates', nameAr: 'الإمارات', goldenVisaThreshold: 2000000 },
  { code: 'BHR', nameEn: 'Bahrain', nameAr: 'البحرين', goldenVisaThreshold: 345000 },
  { code: 'OM', nameEn: 'Oman', nameAr: 'عمان', goldenVisaThreshold: 650000 },
  { code: 'QA', nameEn: 'Qatar', nameAr: 'قطر', goldenVisaThreshold: 200000 },
];

export default function GoldenVisaChecker() {
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  const [investment, setInvestment] = useState<string>('');
  const [eligible, setEligible] = useState<boolean | null>(null);
  const [touched, setTouched] = useState(false);

  // Validate input - only allow positive numbers
  const validateInput = (value: string): boolean => {
    if (value === '') return true;
    const num = parseFloat(value);
    return !isNaN(num) && num >= 0 && num <= 1000000000; // 1 billion AED max
  };

  const handleInvestmentChange = (value: string) => {
    if (validateInput(value)) {
      setInvestment(value);
      setTouched(true);
    }
  };

  const checkEligibility = () => {
    if (!selectedCountry || !investment.trim()) {
      setEligible(null);
      return;
    }
    
    const investmentNum = parseFloat(investment);
    if (isNaN(investmentNum) || investmentNum < 0) {
      setEligible(null);
      return;
    }
    
    setEligible(investmentNum >= selectedCountry.goldenVisaThreshold);
  };

  // Format currency for display
  const formatAED = (amount: number): string => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  useEffect(() => {
    if (touched && investment.trim()) {
      checkEligibility();
    }
  }, [selectedCountry, investment]);

  return (
    <div className="p-6 bg-white rounded-xl border border-bayt-warm/50 space-y-4">
      <h4 className="text-lg font-bold text-bayt-dark">Golden Visa Checker / مدقق التأشيرة الذهبية</h4>
      
      {/* Country selector with label */}
      <div>
        <label htmlFor="country-select" className="sr-only">
          Select country
        </label>
        <select
          id="country-select"
          className="w-full border rounded p-2"
          value={selectedCountry.code}
          onChange={(e) => {
            const country = countries.find(c => c.code === e.target.value);
            if (country) {
              setSelectedCountry(country);
              setEligible(null);
            }
          }}
        >
          {countries.map(c => (
            <option key={c.code} value={c.code}>
              {c.nameEn} / {c.nameAr} - {formatAED(c.goldenVisaThreshold)}
            </option>
          ))}
        </select>
      </div>

      {/* Investment input with label */}
      <div>
        <label htmlFor="investment-input" className="sr-only">
          Investment amount in AED
        </label>
        <input
          id="investment-input"
          type="text"
          inputMode="decimal"
          pattern="[0-9]*"
          placeholder="Investment amount in AED / مبلغ الاستثمار بالدرهم"
          className="w-full border rounded p-2"
          value={investment}
          onChange={(e) => handleInvestmentChange(e.target.value)}
          onBlur={() => setTouched(true)}
        />
        <p className="text-xs text-gray-500 mt-1">
          Enter amount in AED (e.g., 1500000)
        </p>
      </div>

      {/* Check button */}
      <button
        className="w-full bg-bayt-warm text-white p-2 rounded hover:bg-bayt-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={checkEligibility}
        disabled={!investment.trim()}
      >
        Check Eligibility / تحقق من الأهلية
      </button>

      {/* Result */}
      {eligible !== null && (
        <div 
          className={`p-3 rounded ${eligible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
          role="alert"
        >
          <p className="font-semibold">
            {eligible
              ? `✅ Eligible for ${selectedCountry.nameEn} Golden Visa!`
              : `❌ Not eligible for ${selectedCountry.nameEn} Golden Visa`}
          </p>
          <p className="text-sm mt-1">
            {eligible
              ? `مؤهل لتأشيرة الذهبية في ${selectedCountry.nameAr}!`
              : `غير مؤهل لتأشيرة الذهبية في ${selectedCountry.nameAr}`}
          </p>
          <p className="text-sm mt-2">
            Required: {formatAED(selectedCountry.goldenVisaThreshold)}
            {!eligible && investment && (
              <span className="block">
                You need additional {formatAED(selectedCountry.goldenVisaThreshold - parseFloat(investment))}
              </span>
            )}
          </p>
        </div>
      )}
    </div>
  );
}
