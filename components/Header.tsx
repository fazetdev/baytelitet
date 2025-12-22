'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/useLanguage';
import { useTranslations } from '@/hooks/useTranslations';
import { Building2, LayoutDashboard, Globe } from 'lucide-react';

const Header = () => {
  const { lang, setLang } = useLanguage();
  const t = useTranslations(lang);
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-20 bg-white border-b border-gray-100" />;

  const isRTL = lang === 'ar';

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-[110] w-full" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-10 h-10 bg-bayt-dark rounded-xl flex items-center justify-center">
            <Building2 className="text-bayt-warm w-6 h-6" />
          </div>
          <span className="text-xl font-bold text-bayt-dark tracking-tight hidden sm:inline-block">
            BAYT<span className="text-bayt-warm font-light">ELITE</span>
          </span>
        </Link>

        {/* Navigation Menu - Visible on Tablet/Desktop */}
        <nav className="flex items-center gap-4 md:gap-8">
          <Link href="/properties" className="text-gray-600 hover:text-bayt-warm font-medium text-sm md:text-base">
            {t?.nav?.buy || 'Buy'}
          </Link>
          <Link href="/tours" className="text-gray-600 hover:text-bayt-warm font-medium text-sm md:text-base">
            {t?.nav?.tours || 'Tours'}
          </Link>
          <Link href="/admin/add" className="flex items-center gap-1 text-bayt-dark font-bold border-s-2 border-gray-200 ps-4 hover:text-bayt-warm transition-colors text-sm md:text-base">
            <LayoutDashboard className="w-4 h-4" />
            <span className="hidden xs:inline">{t?.nav?.admin || 'Admin'}</span>
          </Link>
        </nav>

        {/* Language Switcher */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 text-gray-700 font-bold text-xs md:text-sm hover:bg-bayt-warm hover:text-white transition-all border border-gray-100"
          >
            <Globe className="w-4 h-4" />
            <span>{lang === 'en' ? 'العربية' : 'English'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
