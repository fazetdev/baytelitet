import './globals.css';
import { Inter } from 'next/font/google';
import { PropertiesProvider } from '@/context/useProperties';
import { AgentProvider } from '@/context/useAgents';
import { LanguageProvider } from '@/context/useLanguage';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <LanguageProvider>
          <AgentProvider>
            <PropertiesProvider>
              <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">
                  {children}
                </main>
                <Footer />
              </div>
            </PropertiesProvider>
          </AgentProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
