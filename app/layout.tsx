'use client';

import { ReactNode } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { RoleProvider } from '@/context/useUserRole';
import { LanguageProvider } from '@/context/useLanguage';
import ClientProviders from '@/components/ClientProviders';
import '@/styles/globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-bayt-light text-bayt-dark">
        <ClientProviders>
          <RoleProvider>
            <LanguageProvider>
              <Header />
              <main>{children}</main>
              <Footer />
            </LanguageProvider>
          </RoleProvider>
        </ClientProviders>
      </body>
    </html>
  );
}
