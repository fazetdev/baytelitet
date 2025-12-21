'use client';

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
  return (
    <section className="py-16 bg-bayt-dark text-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.id} className="space-y-1">
              <div className="text-3xl md:text-4xl font-bold text-bayt-warm">
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-bayt-cool">
                {stat.labelEn}
              </div>
              <div className="text-sm md:text-base text-bayt-cool" dir="rtl">
                {stat.labelAr}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-xs text-bayt-cool text-center">
          Metrics reflect platform capabilities, not transactional volume or assets under management.
        </p>
      </div>
    </section>
  );
}
