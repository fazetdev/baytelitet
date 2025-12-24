'use client';

interface MarketSegmentationProps {
  lang: 'en' | 'ar';
}

export default function MarketSegmentation({ lang }: MarketSegmentationProps) {
  const markets = [
    { country: 'UAE', status: '✅ Ready' },
    { country: 'KSA', status: '⏳ Pending' },
    { country: 'Qatar', status: '⚠️ Review' }
  ];

  return (
    <div className="mt-6 space-y-2">
      <h2 className="text-xl font-semibold">{lang === 'en' ? 'Market Segmentation' : 'تقسيم السوق'}</h2>
      {markets.map((m) => (
        <div key={m.country} className="p-3 bg-green-50 border border-green-200 rounded">
          <strong>{lang === 'en' ? m.country : m.country === 'UAE' ? 'الإمارات' : m.country === 'KSA' ? 'السعودية' : 'قطر'}</strong>: {m.status}
        </div>
      ))}
    </div>
  );
}
