import './globals.css';
import { Inter } from 'next/font/google';
import { PropertiesProvider } from '@/context/useProperties';
import { AgentProvider } from '@/context/useAgents';
import { LanguageProvider } from '@/context/useLanguage';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css"
        />
      </head>
      <body className={inter.className}>
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
        <Script 
          src="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
