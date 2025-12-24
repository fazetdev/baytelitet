'use client';

interface MarketSegmentationProps {
  lang: 'en' | 'ar';
}

const MarketSegmentation = ({ lang }: MarketSegmentationProps) => {
  const markets = [
    { nameEn: 'UAE', nameAr: 'الإمارات', status: 'Active' },
    { nameEn: 'KSA', nameAr: 'السعودية', status: 'Scheduled' },
    { nameEn: 'Qatar', nameAr: 'قطر', status: 'Pending' }
  ];

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold">{lang === 'en' ? 'Market Segmentation' : 'تقسيم السوق'}</h2>
      <ul className="space-y-2">
        {markets.map((m) => (
          <li key={m.nameEn} className="flex justify-between p-2 bg-white rounded border border-gray-100">
            <span>{lang === 'en' ? m.nameEn : m.nameAr}</span>
            <span>{m.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MarketSegmentation;
