'use client';

import { FC } from 'react';

interface MarketSegmentationProps {
  lang?: 'en' | 'ar';
}

const MarketSegmentation: FC<MarketSegmentationProps> = ({ lang = 'en' }) => {
  const markets = [
    { nameEn: 'UAE', nameAr: 'الإمارات', status: '✅ Ready' },
    { nameEn: 'KSA', nameAr: 'السعودية', status: '⏳ Pending' },
    { nameEn: 'Qatar', nameAr: 'قطر', status: '⚠️ Approval Required' }
  ];

  return (
    <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded">
      <h2 className="text-xl font-semibold mb-2">
        {lang === 'en' ? 'Market Segmentation' : 'تقسيم السوق'}
      </h2>
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
};

export default MarketSegmentation;
