import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { PropertiesProvider } from '@/context/useProperties';
import { AgentProvider } from '@/context/useAgents'; // Add this import
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Script from 'next/script';

export const metadata = {
  title: 'BaytElite | Gulf Real Estate',
  description: 'Premium Real Estate Investment Portal for the Gulf Region',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Leaflet CSS is now imported in components */}
      </head>
      <body>
        <LanguageProvider>
          <PropertiesProvider>
            <AgentProvider> {/* Add AgentProvider wrapper */}
              <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">{children}</main>
                <Footer />
              </div>
            </AgentProvider>
          </PropertiesProvider>
        </LanguageProvider>
        {/* Leaflet JS is now imported in components */}
      </body>
    </html>
  );
}
