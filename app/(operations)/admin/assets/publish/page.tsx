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
        <h1 className="text-2xl font-bold">{lang === 'en' ? 'Asset Publishing' : 'نشر العقار'}</h1>
        <button onClick={toggleLang} className="px-4 py-2 bg-gray-200 rounded">
          {lang === 'en' ? 'عربي' : 'EN'}
        </button>
      </div>

      <div className="space-y-4">
        {publishingPipeline.map((step) => (
          <div key={step.step} className="p-4 bg-blue-50 border border-blue-200 rounded">
            <strong>{lang === 'en' ? step.step : step.step === 'RERA Approval' ? 'الموافقة من ريـرا' : step.step === 'Escrow Activation' ? 'تنشيط الضمان' : 'توزيع السوق'}</strong>
            : {step.status}
          </div>
        ))}
      </div>

      <MarketSegmentation lang={lang} />
    </div>
  );
}
