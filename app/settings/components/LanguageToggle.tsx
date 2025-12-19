'use client';

import { Globe, Check } from 'lucide-react';
import { useLanguage } from '@/context/useLanguage';

interface LanguageToggleProps {
  className?: string;
}

export default function LanguageToggle({ className = '' }: LanguageToggleProps) {
  const { language, setLanguage, isRTL } = useLanguage();

  const languages = [
    { code: 'en', name: 'English', native: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'Arabic', native: 'العربية', flag: '🇸🇦', rtl: true }
  ];

  return (
    <div className={className}>
      <h3 className="text-lg font-semibold text-bayt-dark mb-4 flex items-center gap-2">
        <Globe className="w-5 h-5 text-bayt-cool" />
        Language / اللغة
      </h3>
      
      <div className="space-y-3">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code as 'en' | 'ar')}
            className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-300 ${
              language === lang.code
                ? 'border-bayt-cool bg-bayt-cool/10 shadow-md'
                : 'border-bayt-cool/30 hover:border-bayt-cool hover:bg-bayt-cool/5'
            }`}
            dir={lang.rtl ? 'rtl' : 'ltr'}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{lang.flag}</span>
                <div>
                  <div className="font-semibold text-bayt-dark">{lang.name}</div>
                  <div className="text-sm text-gray-600">{lang.native}</div>
                </div>
              </div>
              
              {language === lang.code && (
                <div className="flex items-center gap-2 text-bayt-cool">
                  <Check className="w-5 h-5" />
                  <span className="text-sm font-medium">Selected</span>
                </div>
              )}
            </div>
            
            {/* Language description */}
            {lang.code === 'en' && (
              <p className="mt-2 text-sm text-gray-500">
                Default interface language for international users
              </p>
            )}
            
            {lang.code === 'ar' && (
              <p className="mt-2 text-sm text-gray-500 text-right">
                الواجهة العربية مع دعم التخطيط من اليمين لليسار
              </p>
            )}
          </button>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-bayt-light/50 rounded-lg">
        <p className="text-sm text-gray-600">
          Changing language will update all text, dates, and layout direction across the app.
        </p>
      </div>
    </div>
  );
}
