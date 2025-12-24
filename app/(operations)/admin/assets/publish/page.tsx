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

      <div className="space-y-3">
        <h2 className="text-xl font-semibold">{lang === 'en' ? 'Publishing Pipeline' : 'خط سير النشر'}</h2>
        <ul className="space-y-2">
          {publishingPipeline.map((p) => (
            <li key={p.step} className="flex justify-between p-2 bg-white rounded border border-gray-100">
              <span>{lang === 'en' ? p.step : translateStep(p.step)}</span>
              <span>{p.status}</span>
            </li>
          ))}
        </ul>
      </div>

      <MarketSegmentation lang={lang} />
    </div>
  );

  function translateStep(step: string) {
    const translations: Record<string, string> = {
      'RERA Approval': 'موافقة ريـرا',
      'Escrow Activation': 'تنشيط الضمان',
      'Market Distribution': 'توزيع السوق'
    };
    return translations[step] || step;
  }
}
