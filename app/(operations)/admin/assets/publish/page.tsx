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
        <h1 className="text-2xl font-bold">{lang === 'en' ? 'Asset Publishing' : 'نشر العقارات'}</h1>
        <button onClick={toggleLang} className="px-4 py-2 bg-gray-200 rounded">
          {lang === 'en' ? 'عربي' : 'EN'}
        </button>
      </div>

      <div className="space-y-4">
        {publishingPipeline.map((p) => (
          <div key={p.step} className="flex justify-between p-3 bg-blue-50 border border-blue-200 rounded">
            <span>{lang === 'en' ? p.step : p.step === 'RERA Approval' ? 'اعتماد ريـرا' : p.step === 'Escrow Activation' ? 'تفعيل الضمان' : 'توزيع السوق'}</span>
            <span>{p.status}</span>
          </div>
        ))}
      </div>

      <MarketSegmentation lang={lang} />
    </div>
  );
}
