'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/useLanguage';
import { Building2, Menu, X, LayoutDashboard, Home, List, Settings } from 'lucide-react';

const Header = () => {
  const { lang, setLang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <div className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100" />;

  const isRTL = lang === 'ar';

  const navLinks = [
    { name: isRTL ? 'الرئيسية' : 'Home', href: '/', icon: Home },
    { name: isRTL ? 'العقارات' : 'Properties', href: '/properties', icon: List },
    { name: isRTL ? 'الإدارة' : 'Management', href: '/admin/add', icon: LayoutDashboard, pro: true },
    { name: isRTL ? 'الإعدادات' : 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-[110] w-full" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-bayt-dark rounded-xl flex items-center justify-center group-hover:bg-bayt-warm transition-colors">
            <Building2 className="text-bayt-warm group-hover:text-bayt-dark w-6 h-6 transition-colors" />
          </div>
          <span className="text-xl font-bold text-bayt-dark tracking-tighter">
            BAYT<span className="text-bayt-warm font-light">ELITE</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${link.pro ? 'text-bayt-dark font-black border-l-2 pl-4 border-gray-200' : 'text-gray-600'} hover:text-bayt-warm transition-colors font-medium`}
            >
              {link.name}
            </Link>
          ))}
          <button
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 font-bold text-xs hover:bg-bayt-warm hover:text-white transition-all"
          >
            {lang === 'en' ? 'العربية' : 'English'}
          </button>
        </nav>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2 text-bayt-dark" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-100 shadow-xl animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col p-6 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 py-3 text-lg font-bold text-bayt-dark border-b border-gray-50 last:border-0"
              >
                <link.icon className="w-5 h-5 text-bayt-warm" />
                {link.name}
              </Link>
            ))}
            <button
              onClick={() => { setLang(lang === 'en' ? 'ar' : 'en'); setIsOpen(false); }}
              className="mt-2 w-full py-4 bg-gray-100 rounded-2xl font-bold text-bayt-dark"
            >
              {lang === 'en' ? 'Switch to العربية' : 'Switch to English'}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
