'use client';

interface MarketSegmentationProps {
  lang: 'en' | 'ar';
}

export default function MarketSegmentation({ lang }: MarketSegmentationProps) {
  const markets = [
    { name: 'UAE', status: '✅ Approved' },
    { name: 'KSA', status: '⚠️ Pending' },
    { name: 'Qatar', status: '⏳ Scheduled' }
  ];

  return (
    <div className="p-4 bg-green-50 border border-green-200 rounded space-y-2">
      <h2 className="text-xl font-semibold mb-2">
        {lang === 'en' ? 'Market Segmentation' : 'تجزئة السوق'}
      </h2>
      {markets.map((m) => (
        <div key={m.name} className="flex justify-between p-2 bg-white/50 rounded">
          <span>{lang === 'en' ? m.name : translateMarket(m.name)}</span>
          <span>{m.status}</span>
        </div>
      ))}
    </div>
  );

  function translateMarket(market: string) {
    const translations: Record<string, string> = {
      'UAE': 'الإمارات',
      'KSA': 'السعودية',
      'Qatar': 'قطر'
    };
    return translations[market] || market;
  }
}
