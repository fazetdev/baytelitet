'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { lang } = useLanguage();
  const isRTL = lang === 'ar';

  return (
    <footer dir={isRTL ? 'rtl' : 'ltr'} className="bg-bayt-dark border-t border-gray-800 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-bayt-warm rounded-xl flex items-center justify-center">
              <span className="text-bayt-dark font-black">BE</span>
            </div>
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <div className="font-bold text-white text-lg">
                BAYT <span className="text-bayt-warm">ELITE</span>
              </div>
              <div className="text-xs text-gray-400 uppercase tracking-widest">
                {isRTL ? 'تمكين المبيعات الخليجية' : 'Gulf Sales Enablement'}
              </div>
            </div>
          </div>

          <div className={`text-center ${isRTL ? 'md:text-left' : 'md:text-right'}`}>
            <p className="text-sm text-gray-300 mb-1 font-medium">
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
