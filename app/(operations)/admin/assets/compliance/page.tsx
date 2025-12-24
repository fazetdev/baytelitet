'use client';

import { useGulfAssetStore } from '@/stores/gulfAssetStore';
import { useState } from 'react';

export default function AssetCompliance() {
  const { assets } = useGulfAssetStore();
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const toggleLang = () => setLang(lang === 'en' ? 'ar' : 'en');

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{lang === 'en' ? 'Asset Compliance Dashboard' : 'لوحة امتثال العقارات'}</h1>
        <button onClick={toggleLang} className="px-4 py-2 bg-gray-200 rounded">
          {lang === 'en' ? 'عربي' : 'EN'}
        </button>
      </div>
      <div className="space-y-4">
        {assets.map(asset => (
          <div key={asset.reraNumber} className="p-4 border rounded bg-gray-50">
            <h2 className="font-bold">{lang === 'en' ? asset.title : asset.titleAr}</h2>
            <p>{lang === 'en' ? `RERA Status: ${asset.complianceStatus}` : `حالة ريـرا: ${asset.complianceStatusAr}`}</p>
            <p>{lang === 'en' ? `Escrow: ${asset.escrowRequired ? 'Required' : 'Not Required'}` : `الضمان: ${asset.escrowRequired ? 'مطلوب' : 'غير مطلوب'}`}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
