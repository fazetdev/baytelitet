'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useLanguage from '../context/useLanguage';
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

  // Mobile menu toggle handler
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Prevent body scroll when menu is open
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  // Close mobile menu when clicking a link
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <header dir={isRTL ? 'rtl' : 'ltr'} className="sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b border-golden/20 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3" onClick={closeMobileMenu}>
            <div className="w-9 h-9 md:w-10 md:h-10 bg-golden rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.3)]">
              <span className="text-black font-black text-base md:text-lg">BE</span>
            </div>
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <div className="font-bold text-lg md:text-xl text-white tracking-tight">
                Bayt <span className="text-golden">Elite</span>
              </div>
              <div className="text-[9px] md:text-[10px] text-gray-400 uppercase tracking-widest">
                {isRTL ? 'تمكين المبيعات الخليجية' : 'Gulf Sales Enablement'}
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.path || (item.path !== '/' && pathname?.startsWith(item.path));
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-xl transition-all ${
                    isActive
                      ? 'bg-golden text-black font-bold'
                      : 'text-gray-300 hover:text-golden hover:bg-white/5'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.icon}
                  <span className="text-sm md:text-base">{item.name}</span>
                </Link>
              );
            })}

            {/* Language Switcher */}
            <button 
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              className="ml-3 flex items-center gap-2 px-3 py-1.5 rounded-lg border border-golden/50 text-golden hover:bg-golden/10 transition-all font-bold text-xs"
              aria-label={language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
            >
              <Globe className="w-4 h-4" />
              {language === 'en' ? 'العربية' : 'EN'}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <button 
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              className="flex items-center gap-1 px-2 py-1 rounded-lg border border-golden/50 text-golden hover:bg-golden/10 transition-all font-bold text-xs"
              aria-label={language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
            >
              <Globe className="w-3 h-3" />
              {language === 'en' ? 'AR' : 'EN'}
            </button>
            
            <button 
              onClick={toggleMobileMenu}
              className="p-2 text-golden"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/70 z-40 lg:hidden"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
          
          {/* Mobile Menu Panel */}
          <div className={`fixed top-16 md:top-20 ${isRTL ? 'left-0' : 'right-0'} w-64 h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] bg-black/95 backdrop-blur-md border-l border-golden/20 z-50 lg:hidden transform transition-transform duration-300 ease-out`}>
            <div className="flex flex-col h-full">
              <nav className="flex-1 overflow-y-auto py-4">
                {navItems.map((item) => {
                  const isActive = pathname === item.path || (item.path !== '/' && pathname?.startsWith(item.path));
                  return (
                    <Link
                      key={item.name}
                      href={item.path}
                      onClick={closeMobileMenu}
                      className={`flex items-center gap-3 px-6 py-3 mx-2 rounded-xl transition-all ${
                        isActive
                          ? 'bg-golden text-black font-bold'
                          : 'text-gray-300 hover:text-golden hover:bg-white/5'
                      }`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {item.icon}
                      <span className="text-base">{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
              
              {/* Mobile Menu Footer */}
              <div className="p-4 border-t border-gray-800">
                <div className="text-center text-xs text-gray-400 mb-2">
                  {isRTL ? 'منصة مبيعات العقارات الخليجية' : 'Gulf Real Estate Sales Platform'}
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={closeMobileMenu}
                    className="px-4 py-2 text-sm text-golden border border-golden/50 rounded-lg hover:bg-golden/10 transition-all"
                  >
                    {isRTL ? 'إغلاق القائمة' : 'Close Menu'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
