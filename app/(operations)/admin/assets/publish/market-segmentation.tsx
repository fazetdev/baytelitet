'use client';

interface MarketSegmentationProps {
  lang: 'en' | 'ar';
}

export default function MarketSegmentation({ lang }: MarketSegmentationProps) {
  const markets = [
    { name: 'UAE', status: '✅ Compliant' },
    { name: 'KSA', status: '⚠️ Pending' },
    { name: 'Qatar', status: '⏳ Scheduled' }
  ];

  return (
    <div className="mt-6 space-y-3 p-4 bg-gray-50 border border-gray-200 rounded">
      <h2 className="text-xl font-semibold">
        {lang === 'en' ? 'Market Segmentation' : 'تقسيم السوق'}
      </h2>
      <ul className="space-y-2">
        {markets.map((m) => (
          <li key={m.name} className="flex justify-between p-2 bg-white rounded border border-gray-100">
            <span>{lang === 'en' ? m.name : translateMarket(m.name)}</span>
            <span>{m.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  function translateMarket(name: string) {
    const translations: Record<string, string> = {
      UAE: 'الإمارات',
      KSA: 'المملكة العربية السعودية',
      Qatar: 'قطر'
    };
    return translations[name] || name;
  }
}
