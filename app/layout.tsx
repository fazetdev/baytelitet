import '../styles/globals.css';
import { ReactNode } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { LanguageProvider } from '../context/useLanguage'; // Path to your language context

export const metadata = {
  title: 'Bayt Elite',
  description: 'Complete Sales Enablement Platform for Gulf Developers',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        <LanguageProvider>
          <Header />
          {/* Using min-h-screen ensures the footer stays at the bottom */}
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}