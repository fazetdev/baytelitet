'use client';

import { useState } from 'react';
import PublishingPipeline from './components/PublishingPipeline';

export default function AssetPublishing() {
  const [lang, setLang] = useState<'en' | 'ar'>('en');

  const toggleLang = () => setLang(lang === 'en' ? 'ar' : 'en');

  const pipeline = [
    { step: lang === 'en' ? 'RERA Approval' : 'الموافقة من ريـرا', status: '✅ Complete' },
    { step: lang === 'en' ? 'Escrow Activation' : 'تفعيل الضمان', status: '⚠️ Pending' },
    { step: lang === 'en' ? 'Market Distribution' : 'توزيع السوق', status: '⏳ Scheduled' }
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{lang === 'en' ? 'Asset Publishing' : 'نشر العقارات'}</h1>
        <button onClick={toggleLang} className="px-4 py-2 bg-gray-200 rounded">
          {lang === 'en' ? 'عربي' : 'EN'}
        </button>
      </div>
      <PublishingPipeline steps={pipeline} />
    </div>
  );
}
