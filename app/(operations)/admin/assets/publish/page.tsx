'use client';

import { useState } from 'react';
import MarketSegmentation from './market-segmentation';

export default function AssetPublishing() {
  const [lang, setLang] = useState<'en' | 'ar'>('en');

  const toggleLang = () => setLang(lang === 'en' ? 'ar' : 'en');

  const publishingPipeline = [
    { step: 'RERA Approval', status: '✅ Complete' },
    { step: 'Escrow Activation', status: '⚠️ Pending' },
    { step: 'Market Distribution', status: '⏳ Scheduled' }
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{lang === 'en' ? 'Asset Publishing' : 'نشر الأصول'}</h1>
        <button onClick={toggleLang} className="px-4 py-2 bg-gray-200 rounded">
          {lang === 'en' ? 'عربي' : 'EN'}
        </button>
      </div>

      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded">
        <h2 className="font-semibold mb-2">{lang === 'en' ? 'Publishing Pipeline' : 'خط سير النشر'}</h2>
        <ul className="space-y-1">
          {publishingPipeline.map((step) => (
            <li key={step.step} className="flex justify-between">
              <span>{lang === 'en' ? step.step : translateStep(step.step)}</span>
              <span>{step.status}</span>
            </li>
          ))}
        </ul>
      </div>

      <MarketSegmentation lang={lang} />
    </div>
  );
}

function translateStep(step: string) {
  switch(step) {
    case 'RERA Approval': return 'اعتماد ريـرا';
    case 'Escrow Activation': return 'تفعيل الضمان';
    case 'Market Distribution': return 'توزيع السوق';
    default: return step;
  }
}
