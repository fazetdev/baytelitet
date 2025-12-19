import '../styles/globals.css';
import { Inter } from 'next/font/google';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { LanguageProvider } from '../context/useLanguage';
import { PropertiesProvider } from '../context/useProperties';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'BaytElite',
  description: 'Premium Gulf Properties',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          <PropertiesProvider>
            <Header />
            {children}
            <Footer />
          </PropertiesProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
