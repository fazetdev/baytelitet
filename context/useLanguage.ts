'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  lang: string;
  setLang: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState('en');
  
  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  
  // Safe for SSR/SSG - return default values if context is undefined
  if (context === undefined) {
    // During SSR/SSG or if not wrapped in Provider, return defaults
    return {
      lang: 'en',
      setLang: () => {
        console.warn('LanguageProvider not found. setLang called outside provider.');
      }
    };
  }
  
  return context;
}
