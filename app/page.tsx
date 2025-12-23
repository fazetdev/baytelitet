'use client';

import { useLanguage } from '@/context/useLanguage'; // Import the hook
import HeroSection from './home/HeroSection';
import ChooseRole from './home/components/ChooseRole';
import MarketHighlights from './home/MarketHighlights';
import FeaturesSection from './home/components/FeaturesSection';
import TrustSection from './home/TrustSection';
import MarketTools from './market-tools/page';

export default function HomePage() {
  const { lang } = useLanguage(); // Get the current language

  return (
    <main className="min-h-screen bg-bayt-light">
      {/* Pass lang prop to components that need it */}
      <HeroSection />
      <ChooseRole lang={lang} />
      <MarketHighlights />
      <FeaturesSection lang={lang} />
      <TrustSection />
      <div className="container mx-auto px-6 py-12">
        <MarketTools />
      </div>
    </main>
  );
}
