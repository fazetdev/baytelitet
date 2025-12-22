'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/useLanguage';
import { Building2, LayoutDashboard, Home, List } from 'lucide-react';

const Header = () => {
  const { lang, setLang } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <div className="h-20 bg-white border-b border-gray-100" />;

  const isRTL = lang === 'ar';

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-[110]" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-bayt-dark rounded-xl flex items-center justify-center">
            <Building2 className="text-bayt-warm w-6 h-6" />
          </div>
          <span className="text-xl font-bold text-bayt-dark">BAYT ELITE</span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link href="/" className="text-gray-600 hover:text-bayt-warm font-bold flex items-center gap-1">
             <Home className="w-4 h-4 hidden sm:block"/> {isRTL ? 'الرئيسية' : 'Home'}
          </Link>
          <Link href="/properties" className="text-gray-600 hover:text-bayt-warm font-bold flex items-center gap-1">
             <List className="w-4 h-4 hidden sm:block"/> {isRTL ? 'العقارات' : 'Properties'}
          </Link>
          <Link href="/admin/add" className="text-bayt-dark hover:text-bayt-warm font-black flex items-center gap-1 border-l-2 pl-4 border-gray-200">
             <LayoutDashboard className="w-4 h-4 hidden sm:block"/> {isRTL ? 'الإدارة' : 'Management'}
          </Link>
        </nav>

        <button onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} className="p-2 font-bold text-sm bg-gray-100 rounded-lg">
          {lang === 'en' ? 'AR' : 'EN'}
        </button>
      </div>
    </header>
  );
};

export default Header;
