'use client';

import { useState } from 'react';
import PipelineStep from './components/PipelineStep';

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
        <h1 className="text-2xl font-bold">{lang === 'en' ? 'Asset Publishing Workflow' : 'سير النشر للعقارات'}</h1>
        <button onClick={toggleLang} className="px-4 py-2 bg-gray-200 rounded">
          {lang === 'en' ? 'عربي' : 'EN'}
        </button>
      </div>
      <div className="space-y-2">
        {publishingPipeline.map((step, idx) => (
          <PipelineStep key={idx} step={step.step} status={step.status} />
        ))}
      </div>
    </div>
  );
}
