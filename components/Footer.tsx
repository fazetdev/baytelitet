'use client';

import { useLanguage } from '@/context/useLanguage';

export default function Footer() {
  const { lang: language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <footer dir={isRTL ? 'rtl' : 'ltr'} className="bg-black/90 border-t border-bayt-cultural/20 py-8">
      <div className="container mx-auto px-6">
        <div className={`flex flex-col md:flex-row justify-between items-center ${isRTL ? 'text-right' : 'text-left'}`}>
          <div className="mb-4 md:mb-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-bayt-cultural rounded-lg flex items-center justify-center">
                <span className="text-black font-black">BE</span>
              </div>
              <div>
                <div className="font-bold text-white">
                  Bayt <span className="text-bayt-cultural">Elite</span>
                </div>
                <div className="text-xs text-gray-400">
                  {isRTL ? 'تمكين المبيعات الخليجية' : 'Gulf Sales Enablement'}
                </div>
              </div>
            </div>
          </div>

          <div className="text-center md:text-right">
            <p className="text-sm text-gray-400 mb-2">
              {isRTL ? '© 2024 بايت إيليت. جميع الحقوق محفوظة.' : '© 2024 Bayt Elite. All rights reserved.'}
            </p>
            <p className="text-xs text-gray-500">
              {isRTL ? 'منصة مبيعات العقارات المتكاملة للخليج' : 'Integrated Gulf Real Estate Sales Platform'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
