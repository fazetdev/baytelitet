'use client';

import AdminMenu from './components/AdminMenu';
import { ReactNode } from 'react';
import { LanguageProvider, useLanguage } from '@/context/LanguageContext';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <div className="flex min-h-screen">
        <aside className="w-64 bg-gray-50 border-r p-4">
          <AdminMenu />
        </aside>
        <main className="flex-1 p-6 bg-gray-100">
          {children}
        </main>
      </div>
    </LanguageProvider>
  );
}
