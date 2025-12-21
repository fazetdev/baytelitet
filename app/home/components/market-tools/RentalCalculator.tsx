'use client';

import { useState, useEffect } from 'react';

interface CountryRental {
  code: string;
  nameEn: string;
  nameAr: string;
  avgRentPerSqM: number; // AED per square meter per month
  avgYield?: number; // Optional: average annual yield percentage
}

const countryRentals: CountryRental[] = [
  { code: 'UAE', nameEn: 'United Arab Emirates', nameAr: 'الإمارات', avgRentPerSqM: 120, avgYield: 6.5 },
  { code: 'BHR', nameEn: 'Bahrain', nameAr: 'البحرين', avgRentPerSqM: 90, avgYield: 7.2 },
  { code: 'OM', nameEn: 'Oman', nameAr: 'عمان', avgRentPerSqM: 80, avgYield: 6.8 },
  { code: 'QA', nameEn: 'Qatar', nameAr: 'قطر', avgRentPerSqM: 100, avgYield: 7.0 },
];

export default function RentalCalculator() {
  const [selectedCountry, setSelectedCountry] = useState<CountryRental>(countryRentals[0]);
  const [propertySize, setPropertySize] = useState<string>(''); 
  const [purchasePrice, setPurchasePrice] = useState<string>(''); // Optional: for yield calculation
  const [estimatedRent, setEstimatedRent] = useState<{monthly: number, annual: number, yield?: number} | null>(null);

  const validateNumber = (value: string, max: number = 1000000000): boolean => {
    if (value === '') return true;
    const num = parseFloat(value);
    return !isNaN(num) && num >= 0 && num <= max;
  };

  const handlePropertySizeChange = (value: string) => {
    if (validateNumber(value, 10000)) { // Max 10,000 sq.m
      setPropertySize(value);
    }
  };

  const handlePurchasePriceChange = (value: string) => {
    if (validateNumber(value, 1000000000)) { // Max 1 billion AED
      setPurchasePrice(value);
    }
  };

  const formatAED = (amount: number): string => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Auto-calculate when inputs change
  useEffect(() => {
    const sizeNum = parseFloat(propertySize);
    const priceNum = parseFloat(purchasePrice);
    
    if (isNaN(sizeNum) || sizeNum <= 0) {
      setEstimatedRent(null);
      return;
    }

    const monthlyRent = selectedCountry.avgRentPerSqM * sizeNum;
    const annualRent = monthlyRent * 12;
    
    let yieldPercentage;
    if (!isNaN(priceNum) && priceNum > 0) {
      yieldPercentage = (annualRent / priceNum) * 100;
    }

    setEstimatedRent({
      monthly: monthlyRent,
      annual: annualRent,
      yield: yieldPercentage
    });
  }, [selectedCountry, propertySize, purchasePrice]);

  return (
    <div className="p-6 bg-white rounded-xl border border-bayt-warm/50 space-y-4">
      <h4 className="text-lg font-bold text-bayt-dark">Rental Yield Calculator / حاسبة العائد الإيجاري</h4>

      {/* Country selector */}
      <div>
        <label htmlFor="rental-country" className="sr-only">
          Select country for rental calculation
        </label>
        <select
          id="rental-country"
          className="w-full border rounded p-2"
          value={selectedCountry.code}
          onChange={(e) => {
            const country = countryRentals.find(c => c.code === e.target.value);
            if (country) setSelectedCountry(country);
          }}
        >
          {countryRentals.map(c => (
            <option key={c.code} value={c.code}>
              {c.nameEn} / {c.nameAr} - {c.avgRentPerSqM} AED/m²/month
              {c.avgYield && ` (${c.avgYield}% avg yield)`}
            </option>
          ))}
        </select>
      </div>

      {/* Property size input */}
      <div>
        <label htmlFor="property-size" className="sr-only">
          Property size in square meters
        </label>
        <input
          id="property-size"
          type="text"
          inputMode="decimal"
          placeholder="Property size (sq.m) / المساحة بالمتر المربع"
          className="w-full border rounded p-2"
          value={propertySize}
          onChange={(e) => handlePropertySizeChange(e.target.value)}
        />
        <p className="text-xs text-gray-500 mt-1">
          Enter size in square meters (e.g., 150)
        </p>
      </div>

      {/* Optional: Purchase price for yield calculation */}
      <div>
        <label htmlFor="purchase-price" className="sr-only">
          Purchase price for yield calculation (optional)
        </label>
        <input
          id="purchase-price"
          type="text"
          inputMode="decimal"
          placeholder="Purchase price in AED (optional) / سعر الشراء بالدرهم (اختياري)"
          className="w-full border rounded p-2"
          value={purchasePrice}
          onChange={(e) => handlePurchasePriceChange(e.target.value)}
        />
        <p className="text-xs text-gray-500 mt-1">
          Enter purchase price to calculate yield percentage
        </p>
      </div>

      {/* Results */}
      {estimatedRent !== null && (
        <div className="p-4 rounded bg-blue-50 border border-blue-200 space-y-3">
          <h5 className="font-semibold text-blue-800">
            Rental Estimate / تقدير الإيجار
          </h5>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="p-2 bg-white rounded border">
              <p className="text-xs text-gray-500">Monthly / شهري</p>
              <p className="font-bold text-lg">{formatAED(estimatedRent.monthly)}</p>
            </div>
            
            <div className="p-2 bg-white rounded border">
              <p className="text-xs text-gray-500">Annual / سنوي</p>
              <p className="font-bold text-lg">{formatAED(estimatedRent.annual)}</p>
            </div>
          </div>

          {estimatedRent.yield !== undefined && (
            <div className="p-3 bg-green-50 border border-green-200 rounded">
              <p className="text-sm font-medium text-green-800">
                Estimated Yield / العائد التقديري
              </p>
              <p className="text-2xl font-bold text-green-900">
                {estimatedRent.yield.toFixed(1)}%
              </p>
              <p className="text-xs text-green-700 mt-1">
                {estimatedRent.yield > (selectedCountry.avgYield || 0) 
                  ? "Above market average" 
                  : "At or below market average"}
              </p>
            </div>
          )}

          <p className="text-xs text-gray-600 pt-2 border-t">
            Based on average of {selectedCountry.avgRentPerSqM} AED per sq.m per month in {selectedCountry.nameEn}
          </p>
        </div>
      )}

      {!estimatedRent && propertySize && (
        <p className="text-sm text-gray-500 italic">
          Enter property size to see rental estimate
        </p>
      )}
    </div>
  );
}
