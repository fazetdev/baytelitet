'use client';

import { useState, useEffect } from 'react';

const stats = [
  {
    id: 'markets',
    value: '5+',
    labelEn: 'Markets Covered',
    labelAr: 'أسواق مغطاة'
  },
  {
    id: 'listings',
    value: '1K+',
    labelEn: 'Listings Capacity',
    labelAr: 'سعة القوائم'
  },
  {
    id: 'tools',
    value: '10+',
    labelEn: 'Investor Tools Available',
    labelAr: 'أدوات استثمارية متاحة'
  },
  {
    id: 'data',
    value: 'Multiple',
    labelEn: 'Data Sources Integrated',
    labelAr: 'مصادر بيانات متكاملة'
  }
];

export default function MarketHighlights() {
  // Language state (persisted in localStorage)
  const [lang, setLang] = useState<'en' | 'ar'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('language') as 'en' | 'ar') || 'en';
    }
    return 'en';
  });
  const isRTL = lang === 'ar';

  useEffect(() => {
    localStorage.setItem('language', lang);
  }, [lang]);

  const toggleLanguage = () => setLang(lang === 'en' ? 'ar' : 'en');

  return (
    <section
      className="py-16 bg-bayt-dark text-white"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto px-6">
        {/* Language Toggle */}
        <div className="flex justify-end mb-6">
          <button
            onClick={toggleLanguage}
            className={`flex items-center gap-2 px-4 py-2 rounded-full bg-white text-bayt-dark font-medium border border-bayt-cool/30 hover:border-bayt-warm transition-colors`}
            aria-label={isRTL ? 'التبديل إلى الإنجليزية' : 'Switch to Arabic'}
          >
            {isRTL ? 'AR' : 'EN'}
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.id} className="space-y-1">
              <div className="text-3xl md:text-4xl font-bold text-bayt-warm">
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-bayt-cool">
                {isRTL ? stat.labelAr : stat.labelEn}
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className={`mt-8 text-xs text-bayt-cool text-center ${isRTL ? 'text-right' : 'text-center'}`}>
          {isRTL
            ? 'المؤشرات تعكس قدرات المنصة، وليس حجم المعاملات أو الأصول تحت الإدارة.'
            : 'Metrics reflect platform capabilities, not transactional volume or assets under management.'
          }
        </p>
      </div>
    </section>
  );
}
