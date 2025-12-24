'use client';

import { useState } from 'react';
import MarketSegmentation from './market-segmentation';

export default function AssetPublishing() {
  const [lang, setLang] = useState<'en' | 'ar'>('en');

  const publishingPipeline = [
    { step: 'RERA Approval', status: '✅ Complete' },
    { step: 'Escrow Activation', status: '⚠️ Pending' },
    { step: 'Market Distribution', status: '⏳ Scheduled' }
  ];

  const toggleLang = () => setLang(lang === 'en' ? 'ar' : 'en');

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">{lang === 'en' ? 'Asset Publishing' : 'نشر العقار'}</h1>

      {/* Publishing Pipeline */}
      <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
        <h2 className="font-semibold mb-2">{lang === 'en' ? 'Publishing Pipeline' : 'خط سير النشر'}</h2>
        <ul className="space-y-1">
          {publishingPipeline.map((p) => (
            <li key={p.step} className="flex justify-between">
              <span>{lang === 'en' ? p.step : translateStep(p.step)}</span>
              <span>{p.status}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Market Segmentation */}
      <MarketSegmentation lang={lang} />

      {/* Language Toggle */}
      <div className="mt-6">
        <button onClick={toggleLang} className="px-4 py-2 bg-gray-200 rounded">
          {lang === 'en' ? 'عربي' : 'EN'}
        </button>
      </div>
    </div>
  );
}

function translateStep(step: string) {
  switch(step) {
    case 'RERA Approval': return 'الموافقة من ريـرا';
    case 'Escrow Activation': return 'تفعيل الضمان';
    case 'Market Distribution': return 'توزيع السوق';
    default: return step;
  }
}
