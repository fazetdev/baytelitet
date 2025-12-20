'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/useLanguage';
import { Home, Calculator, Building, Map, Users, Settings, Menu, X, Globe } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { lang: language, setLang: setLanguage } = useLanguage();
  const isRTL = language === 'ar';

  const navItems = [
    { name: isRTL ? 'الرئيسية' : 'Home', path: '/', icon: <Home className="w-5 h-5" /> },
    { name: isRTL ? 'العقارات' : 'Properties', path: '/properties', icon: <Building className="w-5 h-5" /> },
    { name: isRTL ? 'الحاسبة' : 'Calculator', path: '/calculator', icon: <Calculator className="w-5 h-5" /> },
    { name: isRTL ? 'الجولات' : 'Tours', path: '/tours', icon: <Map className="w-5 h-5" /> },
    { name: isRTL ? 'الوكلاء' : 'Agents', path: '/agents', icon: <Users className="w-5 h-5" /> },
    { name: isRTL ? 'الإعدادات' : 'Settings', path: '/settings', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <header dir={isRTL ? 'rtl' : 'ltr'} className="sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b border-[#D4AF37]/20 shadow-sm">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#D4AF37] rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.3)]">
              <span className="text-black font-black text-lg">BE</span>
            </div>
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <div className="font-bold text-xl text-white tracking-tight">
                Bayt <span className="text-[#D4AF37]">Elite</span>
              </div>
              <div className="text-[10px] text-gray-400 uppercase tracking-widest">
                {isRTL ? 'تمكين المبيعات الخليجية' : 'Gulf Sales Enablement'}
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.path || (item.path !== '/' && pathname?.startsWith(item.path));
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                    isActive
                      ? 'bg-[#D4AF37] text-black font-bold'
                      : 'text-gray-300 hover:text-[#D4AF37] hover:bg-white/5'
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              );
            })}

            {/* Language Switcher */}
            <button 
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              className="ml-4 flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all font-bold text-xs"
            >
              <Globe className="w-4 h-4" />
              {language === 'en' ? 'العربية' : 'EN'}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2 text-[#D4AF37]">
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <nav className="lg:hidden px-6 py-4 bg-black/90 border-t border-[#D4AF37]/20 flex flex-col gap-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                pathname === item.path ? 'bg-[#D4AF37] text-black font-bold' : 'text-gray-300 hover:text-[#D4AF37] hover:bg-white/5'
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
