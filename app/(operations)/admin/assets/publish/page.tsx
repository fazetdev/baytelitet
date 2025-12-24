'use client';

import { useState } from 'react';

export default function AssetPublishing() {
  const [lang, setLang] = useState<'en' | 'ar'>('en');

  // Gulf publishing pipeline
  const publishingPipeline = [
    { step: 'RERA Approval', status: '✅ Complete' },
    { step: 'Escrow Activation', status: '⚠️ Pending' },
    { step: 'Market Distribution', status: '⏳ Scheduled' }
  ];

  const toggleLang = () => setLang(lang === 'en' ? 'ar' : 'en');

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {lang === 'en' ? 'Asset Publishing Workflow' : 'سير عمل نشر العقارات'}
        </h1>
        <button onClick={toggleLang} className="px-4 py-2 bg-gray-200 rounded">
          {lang === 'en' ? 'عربي' : 'EN'}
        </button>
      </div>

      <div className="space-y-4">
        {publishingPipeline.map((item, index) => (
          <div key={index} className="p-4 bg-blue-50 border border-blue-200 rounded flex justify-between items-center">
            <span>{lang === 'en' ? item.step : 
                  item.step === 'RERA Approval' ? 'الموافقة من ريـرا' :
                  item.step === 'Escrow Activation' ? 'تفعيل الضمان' :
                  'توزيع السوق'}</span>
            <span>{item.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
