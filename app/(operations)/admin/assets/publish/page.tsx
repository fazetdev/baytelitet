'use client';

import { useGulfAssetStore } from '@/stores/gulfAssetStore';
import { useState } from 'react';
import PublishingPipeline from './components/PublishingPipeline';

export default function AssetPublishing() {
  const { assets } = useGulfAssetStore();
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const toggleLang = () => setLang(lang === 'en' ? 'ar' : 'en');

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{lang === 'en' ? 'Asset Publishing Control' : 'تحكم نشر العقارات'}</h1>
        <button onClick={toggleLang} className="px-4 py-2 bg-gray-200 rounded">
          {lang === 'en' ? 'عربي' : 'EN'}
        </button>
      </div>

      {assets.map(asset => (
        <div key={asset.reraNumber} className="p-4 border rounded bg-gray-50">
          <h2 className="font-bold">{lang === 'en' ? asset.title : asset.titleAr}</h2>
          <PublishingPipeline steps={asset.publishingPipeline} lang={lang} />
        </div>
      ))}
    </div>
  );
}
