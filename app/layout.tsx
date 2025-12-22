import './globals.css';
import { Inter } from 'next/font/google';
import { PropertiesProvider } from '@/context/useProperties';
import { LanguageProvider } from '@/context/useLanguage';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Bayt Elite | Premium Real Estate',
  description: 'Virtual 360° Property Tours in the Gulf',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <LanguageProvider>
          <PropertiesProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <div className="flex-grow">
                {children}
              </div>
              <Footer />
            </div>
          </PropertiesProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
