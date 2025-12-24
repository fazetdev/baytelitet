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
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          {lang === 'en' ? 'Asset Publishing Workflow' : 'سير النشر للعقار'}
        </h1>
        <button onClick={toggleLang} className="px-4 py-2 bg-gray-200 rounded">
          {lang === 'en' ? 'عربي' : 'EN'}
        </button>
      </div>

      <div className="p-4 bg-blue-50 border border-blue-200 rounded space-y-2">
        {publishingPipeline.map((p) => (
          <div key={p.step} className="flex justify-between">
            <span>{lang === 'en' ? p.step : translateStep(p.step)}</span>
            <span>{p.status}</span>
          </div>
        ))}
      </div>

      <MarketSegmentation />
    </div>
  );
}

function translateStep(step: string) {
  const translations: Record<string, string> = {
    'RERA Approval': 'اعتماد ريـرا',
    'Escrow Activation': 'تفعيل الضمان',
    'Market Distribution': 'توزيع السوق'
  };
  return translations[step] || step;
}
