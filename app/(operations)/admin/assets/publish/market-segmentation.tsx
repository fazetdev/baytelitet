'use client';

import { FC } from 'react';

interface MarketSegmentationProps {
  lang: 'en' | 'ar';
}

const MarketSegmentation: FC<MarketSegmentationProps> = ({ lang }) => {
  const markets = [
    { name: 'UAE', status: '✅ Compliant' },
    { name: 'KSA', status: '⚠️ Pending' },
    { name: 'Qatar', status: '⏳ Scheduled' }
  ];

  return (
    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded">
      <h2 className="font-semibold mb-2">
        {lang === 'en' ? 'Market Segmentation' : 'تقسيم السوق'}
      </h2>
      <ul className="space-y-1">
        {markets.map((m) => (
          <li key={m.name} className="flex justify-between">
            <span>{lang === 'en' ? m.name : translateMarket(m.name)}</span>
            <span>{m.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

function translateMarket(name: string) {
  switch(name) {
    case 'UAE': return 'الإمارات';
    case 'KSA': return 'السعودية';
    case 'Qatar': return 'قطر';
    default: return name;
  }
}

export default MarketSegmentation;
