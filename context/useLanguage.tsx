'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface LanguageContextProps {
  lang: 'en' | 'ar';
  setLang: (lang: 'en' | 'ar') => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<'en' | 'ar'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('language') as 'en' | 'ar') || 'en';
    }
    return 'en';
  });

  const setLang = (value: 'en' | 'ar') => {
    setLangState(value);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', value);
    }
  };

  const toggleLanguage = () => setLang(lang === 'en' ? 'ar' : 'en');

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
