'use client';

import { useLanguage } from '@/context/LanguageContext'; // Import the hook
import HeroSection from './home/HeroSection';
import ChooseRole from './home/components/ChooseRole';
import MarketHighlights from './home/MarketHighlights';
import FeaturesSection from './home/components/FeaturesSection';
import TrustSection from './home/TrustSection';
import MarketTools from '../(tools)/market-tools/page';

export default function HomePage() {
  const { lang } = useLanguage(); // Get the current language

  return (
    <main className="min-h-screen bg-bayt-light">
      {/* Pass lang prop to components that need it */}
      <HeroSection lang={lang} />
      <ChooseRole lang={lang} />
      <MarketHighlights />
      <FeaturesSection lang={lang} />
      <TrustSection lang={lang} />
      <div className="container mx-auto px-6 py-12">
        <MarketTools />
      </div>
    </main>
  );
}
