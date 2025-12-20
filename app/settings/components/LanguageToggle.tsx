'use client';

import { useLanguage } from '@/context/useLanguage';
import { Globe, Check } from 'lucide-react';

interface LanguageToggleProps {
  className?: string;
}

export default function LanguageToggle({ className = '' }: LanguageToggleProps) {
  const { lang, setLang } = useLanguage();
  const isRTL = lang === 'ar';

  const languages = [
    { code: 'en' as const, name: 'English', native: 'English', flag: '🇺🇸' },
    { code: 'ar' as const, name: 'Arabic', native: 'العربية', flag: '🇦🇪' }
  ];

  return (
    <div className={className} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="flex items-center gap-2 mb-4">
        <Globe className="w-5 h-5 text-bayt-cultural" />
        <h3 className="text-lg font-semibold text-bayt-dark">
          {lang === 'ar' ? 'لغة العرض' : 'Display Language'}
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {languages.map((language) => {
          const isSelected = lang === language.code;

          return (
            <button
              key={language.code}
              onClick={() => setLang(language.code)}
              className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-300 ${
                isSelected
                  ? 'border-bayt-cultural bg-bayt-cultural/10'
                  : 'border-gray-200 hover:border-bayt-cultural/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{language.flag}</span>
                <div className={isRTL ? 'text-right' : 'text-left'}>
                  <div className="font-bold text-bayt-dark">{language.native}</div>
                  <div className="text-xs text-gray-500">{language.name}</div>
                </div>
              </div>
              {isSelected && <Check className="w-5 h-5 text-bayt-cultural" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
