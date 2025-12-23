'use client';

import { useState, useEffect, FC } from 'react';

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
  const [touched, setTouched] = useState(false);
  const isRTL = lang === 'ar';

  // Validate input - only allow positive numbers
  const validateInput = (value: string): boolean => {
    if (value === '') return true;
    const num = parseFloat(value.replace(/,/g, ''));
    return !isNaN(num) && num >= 0 && num <= 10000000000; // 10 billion max
  };

  const handleInvestmentChange = (value: string) => {
    if (validateInput(value)) {
      // Remove commas for storage, add for display
      const numValue = value.replace(/,/g, '');
      setInvestment(numValue);
      setTouched(true);
    }
  };

  const formatDisplayNumber = (value: string): string => {
    if (!value) return '';
    const num = parseFloat(value.replace(/,/g, ''));
    if (isNaN(num)) return value;
    return num.toLocaleString('en-US');
  };

  // Format currency for display - uses country-specific settings
  const formatCurrency = (amount: number, country: Country): string => {
    try {
      return new Intl.NumberFormat(country.currencyLocale, {
        style: 'currency',
        currency: country.currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount);
    } catch {
      // Fallback formatting
      return `${country.currencySymbol} ${amount.toLocaleString('en-US')}`;
    }
  };

  const checkEligibility = () => {
    if (!selectedCountry || !investment.trim()) {
      setEligible(null);
      return;
    }

    const investmentNum = parseFloat(investment.replace(/,/g, ''));
    if (isNaN(investmentNum) || investmentNum < 0) {
      setEligible(null);
      return;
    }

    setEligible(investmentNum >= selectedCountry.threshold);
  };

  useEffect(() => {
    if (touched && investment.trim()) {
      checkEligibility();
    }
  }, [selectedCountry, investment]);

  const getRequiredAdditional = (): number => {
    if (!investment || eligible === null || eligible) return 0;
    const investmentNum = parseFloat(investment.replace(/,/g, ''));
    return selectedCountry.threshold - investmentNum;
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

      {/* Country Selector */}
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
              }}
              className={`p-3 rounded-lg border flex flex-col items-center justify-center transition-all ${
                selectedCountry.code === country.code
                  ? 'border-bayt-warm bg-bayt-warm/10 text-bayt-dark'
                  : 'border-gray-300 hover:border-bayt-warm/50 hover:bg-gray-50'
              }`}
            >
              <span className="text-xl mb-1">{country.flagEmoji}</span>
              <span className="font-medium text-sm">{isRTL ? country.nameAr : country.nameEn}</span>
              <span className="text-xs text-gray-500 mt-1">
                {formatCurrency(country.threshold, country)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Investment Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {isRTL ? `مبلغ الاستثمار (${selectedCountry.currency})` : `Investment Amount (${selectedCountry.currency})`}
        </label>
        <div className="relative">
          <input
            type="text"
            inputMode="decimal"
            placeholder={isRTL ? `أدخل المبلغ بـ ${selectedCountry.currency}` : `Enter amount in ${selectedCountry.currency}`}
            className="w-full p-3 border border-gray-300 rounded-lg text-lg font-mono focus:border-bayt-warm focus:ring-2 focus:ring-bayt-warm/20 outline-none transition-all"
            value={formatDisplayNumber(investment)}
            onChange={(e) => handleInvestmentChange(e.target.value)}
            onBlur={() => setTouched(true)}
          />
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <span className="text-gray-500">{selectedCountry.currencySymbol}</span>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          {isRTL 
            ? `الحد الأدنى المطلوب: ${formatCurrency(selectedCountry.threshold, selectedCountry)}`
            : `Minimum required: ${formatCurrency(selectedCountry.threshold, selectedCountry)}`
          }
        </p>
      </div>

      {/* Check Button */}
      <button
        className="w-full py-3 bg-gradient-to-r from-bayt-warm to-yellow-600 text-white font-bold rounded-lg hover:from-yellow-600 hover:to-bayt-warm transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={checkEligibility}
        disabled={!investment.trim()}
      >
        {isRTL ? 'تحقق من الأهلية' : 'Check Eligibility'}
      </button>

      {/* Result Display */}
      {eligible !== null && (
        <div 
          className={`p-4 rounded-xl border ${
            eligible 
              ? 'bg-green-50 border-green-200 text-green-800' 
              : 'bg-red-50 border-red-200 text-red-800'
          }`}
          role="alert"
        >
          <div className="flex items-start gap-3">
            <div className={`text-2xl ${eligible ? 'text-green-500' : 'text-red-500'}`}>
              {eligible ? '✅' : '❌'}
            </div>
            <div className="flex-1">
              <h5 className="font-bold text-lg">
                {eligible
                  ? (isRTL ? `مؤهل لتأشيرة ${selectedCountry.nameAr} الذهبية!` : `Eligible for ${selectedCountry.nameEn} Golden Visa!`)
                  : (isRTL ? `غير مؤهل لتأشيرة ${selectedCountry.nameAr} الذهبية` : `Not eligible for ${selectedCountry.nameEn} Golden Visa`)
                }
              </h5>
              
              <div className="mt-3 p-3 bg-white/50 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">{isRTL ? 'استثمارك' : 'Your Investment'}</p>
                    <p className="text-lg font-bold">
                      {formatCurrency(parseFloat(investment) || 0, selectedCountry)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{isRTL ? 'المطلوب' : 'Required'}</p>
                    <p className="text-lg font-bold">
                      {formatCurrency(selectedCountry.threshold, selectedCountry)}
                    </p>
                  </div>
                </div>
              </div>

              {!eligible && investment && (
                <div className="mt-4 p-3 bg-white/70 rounded-lg">
                  <p className="font-semibold mb-1">
                    {isRTL ? 'المبلغ الإضافي المطلوب' : 'Additional Amount Needed'}
                  </p>
                  <p className="text-2xl font-bold text-red-600">
                    {formatCurrency(getRequiredAdditional(), selectedCountry)}
                  </p>
                </div>
              )}

              {eligible && (
                <div className="mt-4 p-3 bg-green-100 rounded-lg border border-green-200">
                  <p className="font-semibold text-green-800">
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
            ? 'جميع المبالغ بالعملة المحلية. قد تتغير المتطلبات - تحقق من المصادر الرسمية.' 
            : 'All amounts in local currency. Requirements may change - verify with official sources.'}
        </p>
      </div>
    </div>
  );
};

export default GoldenVisaChecker;
