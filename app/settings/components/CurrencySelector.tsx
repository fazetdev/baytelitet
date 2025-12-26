'use client';

import { DollarSign, TrendingUp, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface CurrencySelectorProps {
  className?: string;
}

interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag: string;
  rate?: number;
}

export default function CurrencySelector({ className = '' }: CurrencySelectorProps) {
  const { lang } = useLanguage();
  // Derived state instead of destructuring from context
  const isRTL = lang === 'ar';
  
  const [selectedCurrency, setSelectedCurrency] = useState<string>('AED');
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(false);

  const currencies: Currency[] = [
    { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', flag: '🇦🇪', rate: 1 },
    { code: 'SAR', name: 'Saudi Riyal', symbol: 'ر.س', flag: '🇸🇦' },
    { code: 'QAR', name: 'Qatari Riyal', symbol: 'ر.ق', flag: '🇶🇦' },
    { code: 'OMR', name: 'Omani Rial', symbol: 'ر.ع.', flag: '🇴🇲' },
    { code: 'KWD', name: 'Kuwaiti Dinar', symbol: 'د.ك', flag: '🇰🇼' },
    { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
    { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
    { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' }
  ];

  useEffect(() => {
    const savedCurrency = localStorage.getItem('bayt_currency');
    if (savedCurrency) setSelectedCurrency(savedCurrency);
    fetchExchangeRates();
  }, []);

  const fetchExchangeRates = async () => {
    setIsLoading(true);
    try {
      const mockRates = {
        AED: 1, SAR: 1.02, QAR: 1.01, OMR: 0.10,
        KWD: 0.083, USD: 0.27, EUR: 0.25, GBP: 0.21
      };
      setExchangeRates(mockRates);
    } catch (error) {
      console.error('Failed to fetch exchange rates:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCurrencyChange = (currencyCode: string) => {
    setSelectedCurrency(currencyCode);
    localStorage.setItem('bayt_currency', currencyCode);
    window.dispatchEvent(new CustomEvent('currencyChange', { detail: { currency: currencyCode } }));
  };

  const getExchangeRateText = (currencyCode: string) => {
    const rate = exchangeRates[currencyCode];
    if (!rate || currencyCode === 'AED') return null;
    return `1 AED = ${rate.toFixed(3)} ${currencyCode}`;
  };

  const t = {
    title: lang === 'ar' ? 'العملة المفضلة' : 'Preferred Currency',
    subtitle: lang === 'ar' ? 'اختر عملة العرض للعقارات' : 'Select display currency for properties',
    loading: lang === 'ar' ? 'جاري تحميل أسعار الصرف...' : 'Loading exchange rates...',
    selected: lang === 'ar' ? 'محدد' : 'Selected',
    defaultCurrency: lang === 'ar' ? 'العملة الافتراضية للإمارات' : 'Default currency for UAE',
    affects: lang === 'ar' ? 'سيؤثر هذا على جميع الأسعار المعروضة' : 'This will affect all displayed prices'
  };

  return (
    <div className={className} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-bayt-dark flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-bayt-cultural" />
          {t.title}
        </h3>
        {isLoading && <div className="text-sm text-bayt-cool animate-pulse">{t.loading}</div>}
      </div>
      <p className="text-gray-600 mb-6">{t.subtitle}</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {currencies.map((currency) => {
          const isSelected = selectedCurrency === currency.code;
          return (
            <button
              key={currency.code}
              onClick={() => handleCurrencyChange(currency.code)}
              className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                isSelected ? 'border-bayt-cultural bg-bayt-cultural/10 shadow-md' : 'border-gray-200'
              }`}
            >
              <div className="flex flex-col items-center text-center">
                <div className="text-2xl mb-2">{currency.flag}</div>
                <div className="font-bold text-lg text-bayt-dark mb-1">{currency.symbol}</div>
                <div className="font-semibold text-bayt-dark text-sm mb-1">{currency.code}</div>
                {isSelected && <div className="text-xs text-bayt-cultural font-medium"><Check className="w-3 h-3 inline" /> {t.selected}</div>}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
