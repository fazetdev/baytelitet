'use client';

import { useState, FC } from 'react';
import { Zap, Droplets, Home, Calculator, TrendingDown, TrendingUp } from 'lucide-react';

interface CountryUtility {
  code: string;
  nameEn: string;
  nameAr: string;
  currency: string;
  currencySymbol: string;
  electricityPerSqM: number; // Local currency per sq.m/month
  waterPerSqM: number;       // Local currency per sq.m/month
  avgCoolingCost?: number;   // Additional for AC-heavy regions
  currencyLocale: string;
  flagEmoji: string;
  climateNoteEn?: string;
  climateNoteAr?: string;
}

interface UtilityEstimatorProps {
  lang?: 'en' | 'ar';
}

const countryUtilities: CountryUtility[] = [
  { 
    code: 'UAE', 
    nameEn: 'United Arab Emirates', 
    nameAr: 'الإمارات', 
    currency: 'AED',
    currencySymbol: 'د.إ',
    electricityPerSqM: 8, 
    waterPerSqM: 2,
    avgCoolingCost: 5,
    currencyLocale: 'en-AE',
    flagEmoji: '🇦🇪',
    climateNoteEn: 'High AC usage affects electricity',
    climateNoteAr: 'استخدام المكيفات يؤثر على الكهرباء'
  },
  { 
    code: 'SA', 
    nameEn: 'Saudi Arabia', 
    nameAr: 'السعودية', 
    currency: 'SAR',
    currencySymbol: '﷼',
    electricityPerSqM: 6, 
    waterPerSqM: 1.8,
    avgCoolingCost: 4.5,
    currencyLocale: 'en-SA',
    flagEmoji: '🇸🇦',
    climateNoteEn: 'Desert climate increases cooling needs',
    climateNoteAr: 'المناخ الصحراوي يزيد احتياجات التبريد'
  },
  { 
    code: 'KW', 
    nameEn: 'Kuwait', 
    nameAr: 'الكويت', 
    currency: 'KWD',
    currencySymbol: 'د.ك',
    electricityPerSqM: 4, 
    waterPerSqM: 1.2,
    avgCoolingCost: 3.5,
    currencyLocale: 'en-KW',
    flagEmoji: '🇰🇼',
    climateNoteEn: 'Subsidized utilities lower costs',
    climateNoteAr: 'الدعم الحكومي يخفض تكاليف الخدمات'
  },
  { 
    code: 'BHR', 
    nameEn: 'Bahrain', 
    nameAr: 'البحرين', 
    currency: 'BHD',
    currencySymbol: '.د.ب',
    electricityPerSqM: 7, 
    waterPerSqM: 1.8,
    avgCoolingCost: 4,
    currencyLocale: 'en-BH',
    flagEmoji: '🇧🇭',
    climateNoteEn: 'Island climate affects consumption',
    climateNoteAr: 'مناخ الجزيرة يؤثر على الاستهلاك'
  },
  { 
    code: 'OM', 
    nameEn: 'Oman', 
    nameAr: 'عمان', 
    currency: 'OMR',
    currencySymbol: 'ر.ع.',
    electricityPerSqM: 6, 
    waterPerSqM: 1.5,
    avgCoolingCost: 4,
    currencyLocale: 'en-OM',
    flagEmoji: '🇴🇲',
    climateNoteEn: 'Mountain regions vary in costs',
    climateNoteAr: 'المناطق الجبلية تختلف في التكاليف'
  },
  { 
    code: 'QA', 
    nameEn: 'Qatar', 
    nameAr: 'قطر', 
    currency: 'QAR',
    currencySymbol: 'ر.ق',
    electricityPerSqM: 7.5, 
    waterPerSqM: 2,
    avgCoolingCost: 5.5,
    currencyLocale: 'en-QA',
    flagEmoji: '🇶🇦',
    climateNoteEn: 'Modern infrastructure affects rates',
    climateNoteAr: 'البنية التحتية الحديثة تؤثر على الأسعار'
  },
];

export default function UtilityEstimator({ lang = 'en' }: UtilityEstimatorProps) {
  const [selectedCountry, setSelectedCountry] = useState<CountryUtility>(countryUtilities[0]);
  const [propertySize, setPropertySize] = useState<string>('');
  const [occupants, setOccupants] = useState<string>('4');
  const [estimatedUtilities, setEstimatedUtilities] = useState<{
    electricity: number; 
    water: number; 
    cooling: number;
    total: number;
    perOccupant: number;
  } | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);
  const isRTL = lang === 'ar';

  const validateNumber = (value: string, max: number = 10000): boolean => {
    if (value === '') return true;
    const num = parseFloat(value.replace(/,/g, ''));
    return !isNaN(num) && num >= 0 && num <= max;
  };

  const handlePropertySizeChange = (value: string) => {
    if (validateNumber(value)) {
      const cleanValue = value.replace(/,/g, '');
      setPropertySize(cleanValue);
      if (hasCalculated) {
        setEstimatedUtilities(null);
        setHasCalculated(false);
      }
    }
  };

  const handleOccupantsChange = (value: string) => {
    const num = parseInt(value.replace(/,/g, ''));
    if (!isNaN(num) && num >= 1 && num <= 20) {
      setOccupants(num.toString());
      if (hasCalculated) {
        setEstimatedUtilities(null);
        setHasCalculated(false);
      }
    }
  };

  const formatWithCommas = (value: string | number): string => {
    const num = typeof value === 'string' ? parseFloat(value.replace(/,/g, '')) : value;
    if (isNaN(num)) return '';
    return num.toLocaleString('en-US');
  };

  const formatCurrency = (amount: number, country: CountryUtility): string => {
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

  const formatCurrencyCompact = (amount: number, country: CountryUtility): string => {
    if (amount >= 1000) {
      return `${country.currencySymbol} ${(amount / 1000).toFixed(1)}K`;
    }
    return `${country.currencySymbol} ${amount}`;
  };

  const calculateUtilities = () => {
    const sizeNum = parseFloat(propertySize.replace(/,/g, ''));
    const occupantsNum = parseInt(occupants.replace(/,/g, '')) || 4;

    if (isNaN(sizeNum) || sizeNum <= 0) {
      setEstimatedUtilities(null);
      setHasCalculated(false);
      return;
    }

    const electricity = selectedCountry.electricityPerSqM * sizeNum;
    const water = selectedCountry.waterPerSqM * sizeNum;
    const cooling = selectedCountry.avgCoolingCost ? selectedCountry.avgCoolingCost * sizeNum : 0;
    const total = electricity + water + cooling;
    const perOccupant = total / occupantsNum;

    setEstimatedUtilities({ electricity, water, cooling, total, perOccupant });
    setHasCalculated(true);
  };

  const resetCalculation = () => {
    setEstimatedUtilities(null);
    setHasCalculated(false);
  };

  const getEfficiencyTips = () => {
    const tipsEn = [
      "Use LED lighting to reduce electricity by 30%",
      "Install low-flow faucets to cut water usage",
      "Regular AC maintenance improves efficiency",
      "Consider solar water heating for sustainability"
    ];
    const tipsAr = [
      "استخدم إضاءة LED لتقليل الكهرباء بنسبة 30٪",
      "قم بتركيب صنابير منخفضة التدفق لتقليل استهلاك المياه",
      "الصيانة المنتظمة للمكيفات تحسن الكفاءة",
      "فكر في تسخين المياه بالطاقة الشمسية للاستدامة"
    ];
    return isRTL ? tipsAr : tipsEn;
  };

  return (
    <div className="p-6 bg-gradient-to-br from-white to-blue-50 rounded-2xl border border-blue-100 space-y-6 shadow-lg" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header with Icon */}
      <div className="flex items-start gap-3">
        <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl text-white">
          <Home className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h4 className="text-xl font-bold text-gray-800 mb-1">
            {isRTL ? 'مقدر تكاليف الخدمات' : 'Utility Cost Estimator'}
          </h4>
          <p className="text-sm text-gray-600">
            {isRTL 
              ? 'تقدير فواتير الكهرباء والمياه للعقارات في الخليج' 
              : 'Estimate electricity & water bills for Gulf properties'}
          </p>
        </div>
      </div>

      {/* Country Selector - Visual Tabs */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          <span className="flex items-center gap-2">
            <span className="text-blue-500">📍</span>
            {isRTL ? 'حدد الدولة' : 'Select Country'}
          </span>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {countryUtilities.map(country => (
            <button
              key={country.code}
              onClick={() => {
                setSelectedCountry(country);
                resetCalculation();
              }}
              className={`group p-3 rounded-xl border flex items-center justify-center gap-2 transition-all duration-300 ${
                selectedCountry.code === country.code
                  ? 'border-blue-500 bg-blue-50 shadow-sm'
                  : 'border-gray-200 hover:border-blue-300 hover:bg-blue-25'
              }`}
              title={`${country.nameEn} - ${formatCurrencyCompact(country.electricityPerSqM, country)}/m² electricity`}
            >
              <span className="text-2xl">{country.flagEmoji}</span>
              <div className="text-left">
                <span className={`block text-sm font-medium ${selectedCountry.code === country.code ? 'text-blue-700' : 'text-gray-700'}`}>
                  {isRTL ? country.nameAr : country.nameEn}
                </span>
                <span className="text-xs text-gray-500">
                  {formatCurrencyCompact(country.electricityPerSqM, country)}/m²
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Input Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Property Size */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            <span className="flex items-center gap-2">
              <Home className="w-4 h-4 text-gray-500" />
              {isRTL ? 'المساحة (متر مربع)' : 'Property Size (sq.m)'}
            </span>
          </label>
          <div className="relative">
            <input
              type="text"
              inputMode="decimal"
              placeholder={isRTL ? 'أدخل المساحة' : 'Enter area'}
              className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              value={formatWithCommas(propertySize)}
              onChange={(e) => handlePropertySizeChange(e.target.value)}
            />
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <span className="text-gray-500 text-sm font-medium">m²</span>
            </div>
          </div>
        </div>

        {/* Occupants */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            <span className="flex items-center gap-2">
              <span className="text-gray-500">👥</span>
              {isRTL ? 'عدد السكان' : 'Number of Occupants'}
            </span>
          </label>
          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              placeholder={isRTL ? 'عدد السكان' : 'Number of people'}
              className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              value={occupants}
              onChange={(e) => handleOccupantsChange(e.target.value)}
            />
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <span className="text-gray-500">👤</span>
            </div>
          </div>
        </div>
      </div>

      {/* Climate Note */}
      {selectedCountry.climateNoteEn && (
        <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
          <p className="text-sm text-blue-700 flex items-start gap-2">
            <span className="text-blue-500 mt-0.5">🌡️</span>
            {isRTL ? selectedCountry.climateNoteAr : selectedCountry.climateNoteEn}
          </p>
        </div>
      )}

      {/* Calculate Button */}
      <button
        className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={calculateUtilities}
        disabled={!propertySize.trim()}
      >
        <Calculator className="w-5 h-5" />
        {isRTL ? 'احسب التكاليف' : 'Calculate Costs'}
      </button>

      {/* Results Section */}
      {hasCalculated && estimatedUtilities !== null && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-10 duration-500">
          {/* Total Cost Card */}
          <div className="p-5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl text-white">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm opacity-90">{isRTL ? 'التكلفة الشهرية الإجمالية' : 'Total Monthly Cost'}</p>
                <p className="text-3xl font-bold mt-2">
                  {formatCurrency(estimatedUtilities.total, selectedCountry)}
                </p>
                <p className="text-sm opacity-90 mt-2">
                  {isRTL 
                    ? `لكل ساكن: ${formatCurrency(estimatedUtilities.perOccupant, selectedCountry)}`
                    : `Per occupant: ${formatCurrency(estimatedUtilities.perOccupant, selectedCountry)}`}
                </p>
              </div>
              <div className="p-3 bg-white/20 rounded-xl">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Breakdown Cards */}
          <div className="grid md:grid-cols-3 gap-3">
            {/* Electricity */}
            <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Zap className="w-5 h-5 text-blue-500" />
                </div>
                <span className="text-xs font-medium text-blue-600">{isRTL ? 'كهرباء' : 'Electricity'}</span>
              </div>
              <p className="text-xl font-bold text-gray-800 truncate" title={formatCurrency(estimatedUtilities.electricity, selectedCountry)}>
                {formatCurrencyCompact(estimatedUtilities.electricity, selectedCountry)}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {formatCurrency(estimatedUtilities.electricity, selectedCountry)}
              </p>
            </div>

            {/* Water */}
            <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-teal-50 rounded-lg">
                  <Droplets className="w-5 h-5 text-teal-500" />
                </div>
                <span className="text-xs font-medium text-teal-600">{isRTL ? 'مياه' : 'Water'}</span>
              </div>
              <p className="text-xl font-bold text-gray-800 truncate" title={formatCurrency(estimatedUtilities.water, selectedCountry)}>
                {formatCurrencyCompact(estimatedUtilities.water, selectedCountry)}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {formatCurrency(estimatedUtilities.water, selectedCountry)}
              </p>
            </div>

            {/* Cooling */}
            <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <span className="text-purple-500">❄️</span>
                </div>
                <span className="text-xs font-medium text-purple-600">{isRTL ? 'تبريد' : 'Cooling'}</span>
              </div>
              <p className="text-xl font-bold text-gray-800 truncate" title={formatCurrency(estimatedUtilities.cooling, selectedCountry)}>
                {formatCurrencyCompact(estimatedUtilities.cooling, selectedCountry)}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {formatCurrency(estimatedUtilities.cooling, selectedCountry)}
              </p>
            </div>
          </div>

          {/* Efficiency Tips */}
          <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
            <div className="flex items-center gap-2 mb-3">
              <TrendingDown className="w-5 h-5 text-green-600" />
              <h5 className="font-semibold text-green-800">
                {isRTL ? 'نصائح لتوفير الطاقة' : 'Energy Saving Tips'}
              </h5>
            </div>
            <ul className="space-y-2">
              {getEfficiencyTips().map((tip, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-green-700">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Disclaimer */}
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-600 text-center">
              {isRTL
                ? `تقدير مبني على متوسطات ${selectedCountry.nameAr}. الأسعار الفعلية قد تختلف.`
                : `Estimate based on averages in ${selectedCountry.nameEn}. Actual prices may vary.`}
            </p>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!hasCalculated && (
        <div className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-50 flex items-center justify-center">
            <Calculator className="w-8 h-8 text-blue-400" />
          </div>
          <h5 className="font-medium text-gray-700 mb-2">
            {isRTL ? 'أدخل المساحة لحساب التكاليف' : 'Enter property size to calculate costs'}
          </h5>
          <p className="text-sm text-gray-500">
            {isRTL 
              ? 'احصل على تقدير دقيق لفواتير الكهرباء والمياه' 
              : 'Get accurate estimates for electricity and water bills'}
          </p>
        </div>
      )}
    </div>
  );
};

