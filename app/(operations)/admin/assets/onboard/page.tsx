'use client';

import { useState } from 'react';
import { PropertyForm } from './components/PropertyForm';

export default function AssetOnboarding() {
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const toggleLang = () => setLang(lang === 'en' ? 'ar' : 'en');

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {lang === 'en' ? 'Asset Onboarding' : 'إدخال العقارات'}
        </h1>
        <button
          onClick={toggleLang}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          {lang === 'en' ? 'عربي' : 'EN'}
        </button>
      </div>

      <PropertyForm lang={lang} />
    </div>
  );
}
