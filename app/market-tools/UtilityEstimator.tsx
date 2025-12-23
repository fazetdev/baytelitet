'use client';

import { useState, useEffect } from 'react';

interface CountryUtility {
  code: string;
  nameEn: string;
  nameAr: string;
  electricityPerSqM: number; // AED per sq.m/month
  waterPerSqM: number;       // AED per sq.m/month
}

const countryUtilities: CountryUtility[] = [
  { code: 'UAE', nameEn: 'United Arab Emirates', nameAr: 'الإمارات', electricityPerSqM: 8, waterPerSqM: 2 },
  { code: 'BHR', nameEn: 'Bahrain', nameAr: 'البحرين', electricityPerSqM: 7, waterPerSqM: 1.8 },
  { code: 'OM', nameEn: 'Oman', nameAr: 'عمان', electricityPerSqM: 6, waterPerSqM: 1.5 },
  { code: 'QA', nameEn: 'Qatar', nameAr: 'قطر', electricityPerSqM: 7.5, waterPerSqM: 2 },
];

export default function UtilityEstimator() {
  const [selectedCountry, setSelectedCountry] = useState<CountryUtility>(countryUtilities[0]);
  const [propertySize, setPropertySize] = useState<string>('');
  const [estimatedUtilities, setEstimatedUtilities] = useState<{ electricity: number; water: number; total: number } | null>(null);

  const validateNumber = (value: string, max: number = 10000): boolean => {
    if (value === '') return true;
    const num = parseFloat(value);
    return !isNaN(num) && num >= 0 && num <= max;
  };

  const handlePropertySizeChange = (value: string) => {
    if (validateNumber(value)) setPropertySize(value);
  };

  const formatAED = (amount: number): string => {
    return new Intl.NumberFormat('en-AE', { style: 'currency', currency: 'AED', minimumFractionDigits: 0 }).format(amount);
  };

  useEffect(() => {
    const sizeNum = parseFloat(propertySize);
    if (isNaN(sizeNum) || sizeNum <= 0) {
      setEstimatedUtilities(null);
      return;
    }

    const electricity = selectedCountry.electricityPerSqM * sizeNum;
    const water = selectedCountry.waterPerSqM * sizeNum;
    setEstimatedUtilities({ electricity, water, total: electricity + water });
  }, [selectedCountry, propertySize]);

  return (
    <div className="p-6 bg-white rounded-xl border border-bayt-warm/50 space-y-4">
      <h4 className="text-lg font-bold text-bayt-dark">Utility Estimator / تقدير فواتير الخدمات</h4>

      {/* Country selector */}
      <select
        className="w-full border rounded p-2"
        value={selectedCountry.code}
        onChange={(e) => {
          const country = countryUtilities.find(c => c.code === e.target.value);
          if (country) setSelectedCountry(country);
        }}
      >
        {countryUtilities.map(c => (
          <option key={c.code} value={c.code}>
            {c.nameEn} / {c.nameAr}
          </option>
        ))}
      </select>

      {/* Property size input */}
      <input
        type="text"
        inputMode="decimal"
        placeholder="Property size (sq.m) / المساحة بالمتر المربع"
        className="w-full border rounded p-2"
        value={propertySize}
        onChange={(e) => handlePropertySizeChange(e.target.value)}
      />
      <p className="text-xs text-gray-500 mt-1">
        Enter property size to estimate monthly utilities
      </p>

      {/* Results */}
      {estimatedUtilities !== null && (
        <div className="p-4 rounded bg-yellow-50 border border-yellow-200 space-y-3">
          <h5 className="font-semibold text-yellow-800">Estimated Monthly Utilities / التقدير الشهري لفواتير الخدمات</h5>
          <div className="grid grid-cols-3 gap-3">
            <div className="p-2 bg-white rounded border text-center">
              <p className="text-xs text-gray-500">Electricity / الكهرباء</p>
              <p className="font-bold text-lg">{formatAED(estimatedUtilities.electricity)}</p>
            </div>
            <div className="p-2 bg-white rounded border text-center">
              <p className="text-xs text-gray-500">Water / المياه</p>
              <p className="font-bold text-lg">{formatAED(estimatedUtilities.water)}</p>
            </div>
            <div className="p-2 bg-white rounded border text-center">
              <p className="text-xs text-gray-500">Total / الإجمالي</p>
              <p className="font-bold text-lg">{formatAED(estimatedUtilities.total)}</p>
            </div>
          </div>
          <p className="text-xs text-gray-600 pt-2 border-t">
            Based on averages in {selectedCountry.nameEn} / بناءً على المتوسطات في {selectedCountry.nameAr}
          </p>
        </div>
      )}
    </div>
  );
}
