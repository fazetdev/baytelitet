'use client';

import { useState, FC } from 'react';

interface Country {
  code: string;
  nameEn: string;
  nameAr: string;
  currency: string;
  currencySymbol: string;
  threshold: number;
  currencyLocale: string;
  flagEmoji: string;
}

interface GoldenVisaCheckerProps {
  lang?: 'en' | 'ar';
}

const countries: Country[] = [
  { 
    code: 'UAE', 
    nameEn: 'United Arab Emirates', 
    nameAr: 'الإمارات', 
    currency: 'AED',
    currencySymbol: 'د.إ',
    threshold: 2000000,
    currencyLocale: 'en-AE',
    flagEmoji: '🇦🇪'
  },
  { 
    code: 'SA', 
    nameEn: 'Saudi Arabia', 
    nameAr: 'السعودية', 
    currency: 'SAR',
    currencySymbol: '﷼',
    threshold: 4000000,
    currencyLocale: 'en-SA',
    flagEmoji: '🇸🇦'
  },
  { 
    code: 'KW', 
    nameEn: 'Kuwait', 
    nameAr: 'الكويت', 
    currency: 'KWD',
    currencySymbol: 'د.ك',
    threshold: 200000,
    currencyLocale: 'en-KW',
    flagEmoji: '🇰🇼'
  },
  { 
    code: 'BHR', 
    nameEn: 'Bahrain', 
    nameAr: 'البحرين', 
    currency: 'BHD',
    currencySymbol: '.د.ب',
    threshold: 345000,
    currencyLocale: 'en-BH',
    flagEmoji: '🇧🇭'
  },
  { 
    code: 'OM', 
    nameEn: 'Oman', 
    nameAr: 'عمان', 
    currency: 'OMR',
    currencySymbol: 'ر.ع.',
    threshold: 650000,
    currencyLocale: 'en-OM',
    flagEmoji: '🇴🇲'
  },
  { 
    code: 'QA', 
    nameEn: 'Qatar', 
    nameAr: 'قطر', 
    currency: 'QAR',
    currencySymbol: 'ر.ق',
    threshold: 200000,
    currencyLocale: 'en-QA',
    flagEmoji: '🇶🇦'
  },
];

const GoldenVisaChecker: FC<GoldenVisaCheckerProps> = ({ lang = 'en' }) => {
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  const [investment, setInvestment] = useState<string>('');
  const [eligible, setEligible] = useState<boolean | null>(null);
  const [hasChecked, setHasChecked] = useState(false);
  const isRTL = lang === 'ar';

  // Validate input - only allow numbers and commas
  const validateInput = (value: string): boolean => {
    if (value === '') return true;
    // Allow only numbers and commas
    if (!/^[0-9,]*$/.test(value)) return false;
    
    const num = parseFloat(value.replace(/,/g, ''));
    return !isNaN(num) && num >= 0 && num <= 10000000000;
  };

  const handleInvestmentChange = (value: string) => {
    if (validateInput(value)) {
      // Auto-format with commas as user types
      const cleanValue = value.replace(/,/g, '');
      if (cleanValue === '') {
        setInvestment('');
      } else {
        const numValue = parseFloat(cleanValue);
        setInvestment(numValue.toString());
      }
      
      // Reset results when input changes
      if (hasChecked) {
        setEligible(null);
        setHasChecked(false);
      }
    }
  };

  // Format number with commas for display
  const formatWithCommas = (value: string | number): string => {
    const num = typeof value === 'string' ? parseFloat(value.replace(/,/g, '')) : value;
    if (isNaN(num)) return '';
    return num.toLocaleString('en-US');
  };

  // Format currency properly
  const formatCurrency = (amount: number, country: Country): string => {
    try {
      return new Intl.NumberFormat(country.currencyLocale, {
        style: 'currency',
        currency: country.currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount);
    } catch {
      // Fallback: currency symbol + formatted number
      return `${country.currencySymbol} ${formatWithCommas(amount)}`;
    }
  };

  // Compact currency for small spaces
  const formatCurrencyCompact = (amount: number, country: Country): string => {
    if (amount >= 1000000) {
      return `${country.currencySymbol} ${(amount / 1000000).toFixed(1)}M`;
    }
    if (amount >= 1000) {
      return `${country.currencySymbol} ${(amount / 1000).toFixed(1)}K`;
    }
    return `${country.currencySymbol} ${amount}`;
  };

  const checkEligibility = () => {
    if (!investment.trim()) {
      setEligible(null);
      setHasChecked(false);
      return;
    }

    const investmentNum = parseFloat(investment.replace(/,/g, ''));
    if (isNaN(investmentNum) || investmentNum < 0) {
      setEligible(null);
      setHasChecked(false);
      return;
    }

    const isEligible = investmentNum >= selectedCountry.threshold;
    setEligible(isEligible);
    setHasChecked(true);
  };

  const getRequiredAdditional = (): number => {
    if (!investment || eligible === null || eligible) return 0;
    const investmentNum = parseFloat(investment.replace(/,/g, ''));
    return Math.max(0, selectedCountry.threshold - investmentNum);
  };

  return (
    <div className="p-6 bg-white rounded-2xl border border-bayt-warm/50 space-y-6 shadow-lg" dir={isRTL ? 'rtl' : 'ltr'}>
      <div>
        <h4 className="text-xl font-bold text-bayt-dark mb-1">
          {isRTL ? 'مدقق التأشيرة الذهبية' : 'Golden Visa Checker'}
        </h4>
        <p className="text-sm text-gray-600">
          {isRTL 
            ? 'تحقق من أهلية الاستثمار لبرامج الإقامة في دول الخليج' 
            : 'Check investment eligibility for Gulf residency programs'}
        </p>
      </div>

      {/* Country Selector - FIXED: No wrapping */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {isRTL ? 'اختر الدولة' : 'Select Country'}
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {countries.map(country => (
            <button
              key={country.code}
              onClick={() => {
                setSelectedCountry(country);
                setEligible(null);
                setHasChecked(false);
              }}
              className={`p-3 rounded-lg border flex flex-col items-center justify-center transition-all whitespace-nowrap overflow-hidden ${
                selectedCountry.code === country.code
                  ? 'border-bayt-warm bg-bayt-warm/10 text-bayt-dark'
                  : 'border-gray-300 hover:border-bayt-warm/50 hover:bg-gray-50'
              }`}
              title={`${country.nameEn} - ${formatCurrency(country.threshold, country)}`}
            >
              <span className="text-xl mb-1">{country.flagEmoji}</span>
              <span className="font-medium text-sm truncate w-full text-center">
                {isRTL ? country.nameAr : country.nameEn}
              </span>
              <span className="text-xs text-gray-500 mt-1 truncate w-full text-center">
                {formatCurrencyCompact(country.threshold, country)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Investment Input - FIXED: Proper number formatting */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {isRTL ? `مبلغ الاستثمار (${selectedCountry.currency})` : `Investment Amount (${selectedCountry.currency})`}
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <span className="text-gray-500 font-medium">{selectedCountry.currencySymbol}</span>
          </div>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9,]*"
            placeholder={isRTL ? "أدخل المبلغ" : "Enter amount"}
            className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-lg font-mono focus:border-bayt-warm focus:ring-2 focus:ring-bayt-warm/20 outline-none transition-all"
            value={formatWithCommas(investment)}
            onChange={(e) => handleInvestmentChange(e.target.value)}
          />
        </div>
        <div className="flex justify-between items-center mt-2">
          <p className="text-xs text-gray-500">
            {isRTL 
              ? `الحد الأدنى: ${formatCurrencyCompact(selectedCountry.threshold, selectedCountry)}`
              : `Minimum: ${formatCurrencyCompact(selectedCountry.threshold, selectedCountry)}`
            }
          </p>
          {investment && (
            <p className="text-xs font-medium text-bayt-dark">
              {formatCurrency(parseFloat(investment.replace(/,/g, '')) || 0, selectedCountry)}
            </p>
          )}
        </div>
      </div>

      {/* Check Button */}
      <button
        className="w-full py-3 bg-gradient-to-r from-bayt-warm to-yellow-600 text-white font-bold rounded-lg hover:from-yellow-600 hover:to-bayt-warm transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={checkEligibility}
        disabled={!investment.trim()}
      >
        {isRTL ? 'تحقق من الأهلية' : 'Check Eligibility'}
      </button>

      {/* Result Display - HIDDEN by default, shows only after check */}
      {hasChecked && eligible !== null && (
        <div 
          className={`p-4 rounded-xl border overflow-hidden ${
            eligible 
              ? 'bg-green-50 border-green-200 text-green-800' 
              : 'bg-red-50 border-red-200 text-red-800'
          }`}
          role="alert"
        >
          <div className="flex items-start gap-3">
            <div className={`text-2xl flex-shrink-0 ${eligible ? 'text-green-500' : 'text-red-500'}`}>
              {eligible ? '✅' : '❌'}
            </div>
            <div className="flex-1 min-w-0"> {/* FIX: Prevents overflow */}
              <h5 className="font-bold text-lg truncate">
                {eligible
                  ? (isRTL ? `مؤهل لتأشيرة ${selectedCountry.nameAr} الذهبية!` : `Eligible for ${selectedCountry.nameEn} Golden Visa!`)
                  : (isRTL ? `غير مؤهل لتأشيرة ${selectedCountry.nameAr} الذهبية` : `Not eligible for ${selectedCountry.nameEn} Golden Visa`)
                }
              </h5>
              
              {/* Investment Comparison - FIXED: Clean layout */}
              <div className="mt-3 bg-white/50 rounded-lg p-3">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">{isRTL ? 'استثمارك' : 'Your Investment'}</p>
                    <p className="text-lg font-bold truncate" title={formatCurrency(parseFloat(investment) || 0, selectedCountry)}>
                      {formatCurrencyCompact(parseFloat(investment) || 0, selectedCountry)}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">{isRTL ? 'المطلوب' : 'Required'}</p>
                    <p className="text-lg font-bold truncate" title={formatCurrency(selectedCountry.threshold, selectedCountry)}>
                      {formatCurrencyCompact(selectedCountry.threshold, selectedCountry)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Additional Amount Needed - Only if not eligible */}
              {!eligible && investment && (
                <div className="mt-4 bg-white/70 rounded-lg p-3">
                  <p className="font-semibold mb-1 text-center">
                    {isRTL ? 'المبلغ الإضافي المطلوب' : 'Additional Amount Needed'}
                  </p>
                  <p className="text-2xl font-bold text-red-600 text-center truncate" title={formatCurrency(getRequiredAdditional(), selectedCountry)}>
                    {formatCurrencyCompact(getRequiredAdditional(), selectedCountry)}
                  </p>
                </div>
              )}

              {/* Success Message */}
              {eligible && (
                <div className="mt-4 bg-green-100 rounded-lg border border-green-200 p-3">
                  <p className="font-semibold text-green-800 text-center">
                    {isRTL ? '🎉 تهانينا! يمكنك المتابعة مع المستشار القانوني.' : '🎉 Congratulations! You can proceed with legal consultation.'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer Note */}
      <div className="pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          {isRTL 
            ? 'جميع المبالغ بالعملة المحلية. قد تتغير المتطلبات.' 
            : 'All amounts in local currency. Requirements may change.'}
        </p>
      </div>
    </div>
  );
};

export default GoldenVisaChecker;
