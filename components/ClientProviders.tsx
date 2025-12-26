'use client';

import React from 'react';
import { LanguageProvider } from '@/context/LanguageContext';
import { PropertiesProvider } from '@/context/useProperties';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <PropertiesProvider>
        {children}
      </PropertiesProvider>
    </LanguageProvider>
  );
}
