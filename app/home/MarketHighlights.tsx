'use client';

import { useLanguage } from '@/context/useLanguage';

interface Stat {
  id: string;
  value: string;
  labelEn: string;
  labelAr: string;
}

const stats: Stat[] = [
  { id: 'markets', value: '5+', labelEn: 'Markets Covered', labelAr: 'أسواق مغطاة' },
  { id: 'listings', value: '1K+', labelEn: 'Listings Capacity', labelAr: 'سعة القوائم' },
  { id: 'tools', value: '10+', labelEn: 'Investor Tools Available', labelAr: 'أدوات استثمارية متاحة' },
  { id: 'data', value: 'Multiple', labelEn: 'Data Sources Integrated', labelAr: 'مصادر بيانات متكاملة' },
];

export default function MarketHighlights(): JSX.Element {
  const { lang } = useLanguage(); // REMOVED: toggleLanguage
  const isRTL = lang === 'ar';

  return (
    <section className="py-16 bg-bayt-dark text-white" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-6">
        {/* REMOVED: Duplicate language toggle button */}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat: Stat) => (
            <div key={stat.id} className="space-y-1">
              <div className="text-3xl md:text-4xl font-bold text-bayt-warm">{stat.value}</div>
              <div className="text-sm md:text-base text-bayt-cool">
                {isRTL ? stat.labelAr : stat.labelEn}
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className={`mt-8 text-xs text-bayt-cool ${isRTL ? 'text-right' : 'text-center'}`}>
          {isRTL
            ? 'المؤشرات تعكس قدرات المنصة، وليس حجم المعاملات أو الأصول تحت الإدارة.'
            : 'Metrics reflect platform capabilities, not transactional volume or assets under management.'
          }
        </p>
      </div>
    </section>
  );
}
