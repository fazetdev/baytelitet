'use client';

import HeroSection from './home/components/HeroSection';
import ChooseRole from './home/components/ChooseRole';
import MarketHighlights from './home/components/MarketHighlights';
import FeaturesSection from './home/components/FeaturesSection';
import TrustSection from './home/components/TrustSection';
import MarketTools from './home/MarketTools'; // Different path

export default function HomePage() {
  return (
    <main className="min-h-screen bg-bayt-light">
      <HeroSection />
      <ChooseRole />
      <MarketHighlights />
      <FeaturesSection />
      <TrustSection />
      <div className="container mx-auto px-6 py-12">
        <MarketTools />
      </div>
    </main>
  );
}
