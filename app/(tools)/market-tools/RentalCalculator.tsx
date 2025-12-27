'use client';

import { useState, useEffect, FC } from 'react';

interface CountryRental {
  code: string;
  nameEn: string;
  nameAr: string;
  currency: string;
  currencySymbol: string;
  avgRentPerSqM: number; // Local currency per square meter per month
  avgYield?: number; // Optional: average annual yield percentage
  currencyLocale: string;
  flagEmoji: string;
}

interface RentalCalculatorProps {
  lang?: 'en' | 'ar';
}

const countryRentals: CountryRental[] = [
  { 
    code: 'UAE', 
    nameEn: 'United Arab Emirates', 
    nameAr: 'الإمارات', 
    currency: 'AED',
    currencySymbol: 'د.إ',
    avgRentPerSqM: 120, 
    avgYield: 6.5,
    currencyLocale: 'en-AE',
    flagEmoji: '🇦🇪'
  },
  { 
    code: 'SA', 
    nameEn: 'Saudi Arabia', 
    nameAr: 'السعودية', 
    currency: 'SAR',
    currencySymbol: '﷼',
    avgRentPerSqM: 100, 
    avgYield: 7.0,
    currencyLocale: 'en-SA',
    flagEmoji: '🇸🇦'
  },
  { 
    code: 'KW', 
    nameEn: 'Kuwait', 
    nameAr: 'الكويت', 
    currency: 'KWD',
    currencySymbol: 'د.ك',
    avgRentPerSqM: 25, 
    avgYield: 6.8,
    currencyLocale: 'en-KW',
    flagEmoji: '🇰🇼'
  },
  { 
    code: 'BHR', 
    nameEn: 'Bahrain', 
    nameAr: 'البحرين', 
    currency: 'BHD',
    currencySymbol: '.د.ب',
    avgRentPerSqM: 90, 
    avgYield: 7.2,
    currencyLocale: 'en-BH',
    flagEmoji: '🇧🇭'
  },
  { 
    code: 'OM', 
    nameEn: 'Oman', 
    nameAr: 'عمان', 
    currency: 'OMR',
    currencySymbol: 'ر.ع.',
    avgRentPerSqM: 80, 
    avgYield: 6.8,
    currencyLocale: 'en-OM',
    flagEmoji: '🇴🇲'
  },
  { 
    code: 'QA', 
    nameEn: 'Qatar', 
    nameAr: 'قطر', 
    currency: 'QAR',
    currencySymbol: 'ر.ق',
    avgRentPerSqM: 100, 
    avgYield: 7.0,
    currencyLocale: 'en-QA',
    flagEmoji: '🇶🇦'
  },
];

export default function RentalCalculator({ lang = 'en' }: RentalCalculatorProps) {
  const [selectedCountry, setSelectedCountry] = useState<CountryRental>(countryRentals[0]);
  const [propertySize, setPropertySize] = useState<string>(''); 
  const [purchasePrice, setPurchasePrice] = useState<string>('');
  const [estimatedRent, setEstimatedRent] = useState<{monthly: number, annual: number, yield?: number} | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);
  const isRTL = lang === 'ar';

  const validateNumber = (value: string, max: number = 1000000000): boolean => {
    if (value === '') return true;
    const num = parseFloat(value.replace(/,/g, ''));
    return !isNaN(num) && num >= 0 && num <= max;
  };

  const handlePropertySizeChange = (value: string) => {
    if (validateNumber(value, 10000)) {
      const cleanValue = value.replace(/,/g, '');
      setPropertySize(cleanValue);
      if (hasCalculated) {
        setEstimatedRent(null);
        setHasCalculated(false);
      }
    }
  };

  const handlePurchasePriceChange = (value: string) => {
    if (validateNumber(value, 1000000000)) {
      const cleanValue = value.replace(/,/g, '');
      setPurchasePrice(cleanValue);
      if (hasCalculated) {
        setEstimatedRent(null);
        setHasCalculated(false);
      }
    }
  };

  const formatWithCommas = (value: string | number): string => {
    const num = typeof value === 'string' ? parseFloat(value.replace(/,/g, '')) : value;
    if (isNaN(num)) return '';
    return num.toLocaleString('en-US');
  };

  const formatCurrency = (amount: number, country: CountryRental): string => {
    try {
      return new Intl.NumberFormat(country.currencyLocale, {
        style: 'currency',
        currency: country.currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount);
    } catch {
      return `${country.currencySymbol} ${formatWithCommas(amount)}`;
    }
  };

  const formatCurrencyCompact = (amount: number, country: CountryRental): string => {
    if (amount >= 1000000) {
      return `${country.currencySymbol} ${(amount / 1000000).toFixed(1)}M`;
    }
    if (amount >= 1000) {
      return `${country.currencySymbol} ${(amount / 1000).toFixed(1)}K`;
    }
    return `${country.currencySymbol} ${amount}`;
  };

  const calculateRental = () => {
    const sizeNum = parseFloat(propertySize.replace(/,/g, ''));
    const priceNum = parseFloat(purchasePrice.replace(/,/g, ''));

    if (isNaN(sizeNum) || sizeNum <= 0) {
      setEstimatedRent(null);
      setHasCalculated(false);
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
    setHasCalculated(true);
  };

  const resetCalculation = () => {
    setEstimatedRent(null);
    setHasCalculated(false);
  };

  return (
    <div className="p-6 bg-white rounded-2xl border border-bayt-warm/50 space-y-6 shadow-lg" dir={isRTL ? 'rtl' : 'ltr'}>
      <div>
        <h4 className="text-xl font-bold text-bayt-dark mb-1">
          {isRTL ? 'حاسبة العائد الإيجاري' : 'Rental Yield Calculator'}
        </h4>
        <p className="text-sm text-gray-600">
          {isRTL 
            ? 'احسب الإيجار الشهري والعائد السنوي للعقارات في الخليج' 
            : 'Calculate monthly rent & annual yield for Gulf properties'}
        </p>
      </div>

      {/* Country Selector - Fixed layout */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {isRTL ? 'اختر الدولة' : 'Select Country'}
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {countryRentals.map(country => (
            <button
              key={country.code}
              onClick={() => {
                setSelectedCountry(country);
                resetCalculation();
              }}
              className={`p-3 rounded-lg border flex flex-col items-center justify-center transition-all whitespace-nowrap overflow-hidden ${
                selectedCountry.code === country.code
                  ? 'border-bayt-warm bg-bayt-warm/10 text-bayt-dark'
                  : 'border-gray-300 hover:border-bayt-warm/50 hover:bg-gray-50'
              }`}
              title={`${country.nameEn} - ${formatCurrency(country.avgRentPerSqM, country)}/m²/month`}
            >
              <span className="text-xl mb-1">{country.flagEmoji}</span>
              <span className="font-medium text-sm truncate w-full text-center">
                {isRTL ? country.nameAr : country.nameEn}
              </span>
              <span className="text-xs text-gray-500 mt-1 truncate w-full text-center">
                {formatCurrencyCompact(country.avgRentPerSqM, country)}/m²
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Property Size Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {isRTL ? 'المساحة (متر مربع)' : 'Property Size (sq.m)'}
        </label>
        <div className="relative">
          <input
            type="text"
            inputMode="decimal"
            placeholder={isRTL ? 'أدخل المساحة' : 'Enter area'}
            className="w-full pl-3 pr-10 py-3 border border-gray-300 rounded-lg text-lg font-mono focus:border-bayt-warm focus:ring-2 focus:ring-bayt-warm/20 outline-none transition-all"
            value={formatWithCommas(propertySize)}
            onChange={(e) => handlePropertySizeChange(e.target.value)}
          />
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <span className="text-gray-500 text-sm font-medium">m²</span>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          {isRTL 
            ? `المتوسط: ${formatCurrencyCompact(selectedCountry.avgRentPerSqM, selectedCountry)} لكل متر مربع شهرياً`
            : `Average: ${formatCurrencyCompact(selectedCountry.avgRentPerSqM, selectedCountry)} per sq.m monthly`}
        </p>
      </div>

      {/* Purchase Price Input (Optional) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {isRTL ? `سعر الشراء (${selectedCountry.currency}) - اختياري` : `Purchase Price (${selectedCountry.currency}) - Optional`}
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <span className="text-gray-500 font-medium">{selectedCountry.currencySymbol}</span>
          </div>
          <input
            type="text"
            inputMode="decimal"
            placeholder={isRTL ? 'سعر الشراء لحساب العائد' : 'Purchase price for yield calculation'}
            className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-lg font-mono focus:border-bayt-warm focus:ring-2 focus:ring-bayt-warm/20 outline-none transition-all"
            value={formatWithCommas(purchasePrice)}
            onChange={(e) => handlePurchasePriceChange(e.target.value)}
          />
        </div>
        <p className="text-xs text-gray-500 mt-2">
          {isRTL 
            ? 'أدخل سعر الشراء لحساب نسبة العائد السنوي' 
            : 'Enter purchase price to calculate annual yield percentage'}
        </p>
      </div>

      {/* Calculate Button */}
      <button
        className="w-full py-3 bg-gradient-to-r from-bayt-warm to-yellow-600 text-white font-bold rounded-lg hover:from-yellow-600 hover:to-bayt-warm transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={calculateRental}
        disabled={!propertySize.trim()}
      >
        {isRTL ? 'احسب الإيجار' : 'Calculate Rent'}
      </button>

      {/* Results - Only shown after calculation */}
      {hasCalculated && estimatedRent !== null && (
        <div className="p-4 rounded-xl border border-blue-200 bg-blue-50 space-y-4 overflow-hidden">
          <h5 className="font-bold text-blue-800 text-lg">
            {isRTL ? 'نتائج الحساب' : 'Calculation Results'}
          </h5>

          {/* Rent Estimates - Fixed grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3 bg-white rounded-lg border border-blue-100 text-center">
              <p className="text-sm text-gray-600 mb-1">{isRTL ? 'الإيجار الشهري' : 'Monthly Rent'}</p>
              <p className="text-xl font-bold text-bayt-dark truncate" title={formatCurrency(estimatedRent.monthly, selectedCountry)}>
                {formatCurrencyCompact(estimatedRent.monthly, selectedCountry)}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {formatCurrency(estimatedRent.monthly, selectedCountry)}
              </p>
            </div>

            <div className="p-3 bg-white rounded-lg border border-blue-100 text-center">
              <p className="text-sm text-gray-600 mb-1">{isRTL ? 'الإيجار السنوي' : 'Annual Rent'}</p>
              <p className="text-xl font-bold text-bayt-dark truncate" title={formatCurrency(estimatedRent.annual, selectedCountry)}>
                {formatCurrencyCompact(estimatedRent.annual, selectedCountry)}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {formatCurrency(estimatedRent.annual, selectedCountry)}
              </p>
            </div>
          </div>

          {/* Yield Calculation - Only if purchase price entered */}
          {estimatedRent.yield !== undefined && (
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="text-center">
                <p className="text-sm font-medium text-green-800 mb-1">
                  {isRTL ? 'العائد السنوي التقديري' : 'Estimated Annual Yield'}
                </p>
                <p className="text-3xl font-bold text-green-900">
                  {estimatedRent.yield.toFixed(1)}%
                </p>
                
                {/* Yield Comparison */}
                <div className="mt-3 flex items-center justify-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${estimatedRent.yield > (selectedCountry.avgYield || 0) ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                  <p className="text-sm text-green-700">
                    {estimatedRent.yield > (selectedCountry.avgYield || 0)
                      ? (isRTL ? 'أعلى من المتوسط السوقي' : 'Above market average')
                      : (isRTL ? 'عند أو تحت المتوسط السوقي' : 'At or below market average')}
                  </p>
                </div>
                
                <p className="text-xs text-green-600 mt-2">
                  {isRTL 
                    ? `المتوسط السوقي: ${selectedCountry.avgYield?.toFixed(1)}%`
                    : `Market average: ${selectedCountry.avgYield?.toFixed(1)}%`}
                </p>
              </div>
            </div>
          )}

          {/* Disclaimer */}
          <div className="pt-3 border-t border-blue-200">
            <p className="text-xs text-gray-600 text-center">
              {isRTL
                ? `بناءً على متوسط ${formatCurrencyCompact(selectedCountry.avgRentPerSqM, selectedCountry)} لكل متر مربع شهرياً في ${selectedCountry.nameAr}`
                : `Based on average of ${formatCurrencyCompact(selectedCountry.avgRentPerSqM, selectedCountry)} per sq.m monthly in ${selectedCountry.nameEn}`}
            </p>
          </div>
        </div>
      )}

      {/* Call to action when no calculation */}
      {!hasCalculated && (
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            {isRTL 
              ? 'أدخل المساحة واضغط "احسب الإيجار" لرؤية النتائج' 
              : 'Enter property size and click "Calculate Rent" to see results'}
          </p>
        </div>
      )}
    </div>
  );
};

