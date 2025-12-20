'use client';

import { useLanguage } from '@/context/useLanguage';

export default function LanguageToggle() {
  const { lang, setLanguage } = useLanguage();

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
      <div>
        <h3 className="font-semibold text-bayt-dark">Language</h3>
        <p className="text-sm text-gray-600">Arabic / English interface</p>
      </div>
      <div className="flex bg-gray-200 rounded-lg p-1">
        <button
          onClick={() => setLanguage('en')}
          className={`px-4 py-2 rounded-md transition-colors ${lang === 'en' ? 'bg-white shadow' : 'hover:bg-gray-100'}`}
        >
          English
        </button>
        <button
          onClick={() => setLanguage('ar')}
          className={`px-4 py-2 rounded-md transition-colors ${lang === 'ar' ? 'bg-white shadow' : 'hover:bg-gray-100'}`}
        >
          العربية
        </button>
      </div>
    </div>
  );
}
