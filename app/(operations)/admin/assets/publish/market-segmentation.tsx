'use client';

interface MarketSegmentationProps {
  lang: 'en' | 'ar';
}

export default function MarketSegmentation({ lang }: MarketSegmentationProps) {
  const markets = [
    { nameEn: 'UAE', nameAr: 'الإمارات', status: '✅ Ready' },
    { nameEn: 'KSA', nameAr: 'السعودية', status: '⏳ Scheduled' },
    { nameEn: 'Qatar', nameAr: 'قطر', status: '⚠️ Pending' },
  ];

  return (
    <div className="p-4 bg-green-50 border border-green-200 rounded">
      <h3 className="font-semibold mb-2">
        {lang === 'en' ? 'Market Segmentation' : 'تقسيم السوق'}
      </h3>
      <ul className="space-y-1">
        {markets.map((m) => (
          <li key={m.nameEn} className="flex justify-between">
            <span>{lang === 'en' ? m.nameEn : m.nameAr}</span>
            <span>{m.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
