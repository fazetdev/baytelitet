'use client';

import { LanguageProvider } from '@/context/useLanguage';
import { PropertiesProvider } from '@/context/PropertiesContext';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <PropertiesProvider>
        {children}
      </PropertiesProvider>
    </LanguageProvider>
  );
}
