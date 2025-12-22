'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/useLanguage';
import { useTranslations } from '@/hooks/useTranslations';
import { Building2, LayoutDashboard } from 'lucide-react';

const Header = () => {
  const { lang, setLang } = useLanguage();
  const t = useTranslations(lang);
  const isRTL = lang === 'ar';

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-[110]" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-bayt-dark rounded-xl flex items-center justify-center">
            <Building2 className="text-bayt-warm w-6 h-6" />
          </div>
          <span className="text-xl font-bold text-bayt-dark tracking-tight">
            BAYT<span className="text-bayt-warm font-light">ELITE</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/properties" className="text-gray-600 hover:text-bayt-warm font-medium">{t.nav.buy}</Link>
          <Link href="/tours" className="text-gray-600 hover:text-bayt-warm font-medium">360° {t.nav.tours}</Link>
          {/* Portfolio Admin Link */}
          <Link href="/admin/add" className="flex items-center gap-1 text-bayt-dark font-bold border-l-2 border-gray-100 pl-4 hover:text-bayt-warm transition-colors">
            <LayoutDashboard className="w-4 h-4" />
            {isRTL ? 'لوحة التحكم' : 'Admin Panel'}
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            className="px-4 py-2 rounded-lg bg-gray-50 text-gray-700 font-bold text-sm hover:bg-bayt-warm hover:text-white transition-all"
          >
            {lang === 'en' ? 'العربية' : 'English'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
