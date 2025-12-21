'use client';

import HeroSection from './home/components/HeroSection';
import ChooseRole from './home/components/ChooseRole';
import MarketHighlights from './home/components/MarketHighlights';
import FeaturesSection from './home/components/FeaturesSection';
import TrustSection from './home/components/TrustSection';
import MarketTools from './home/components/MarketTools';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-bayt-light">
      {/* Hero Section */}
      <HeroSection />

      {/* Choose Role Section */}
      <ChooseRole />

      {/* Market Highlights */}
      <MarketHighlights />

      {/* Features Section */}
      <FeaturesSection />

      {/* Trust Section */}
      <TrustSection />

      {/* Market Tools */}
      <div className="container mx-auto px-6 py-12">
        <MarketTools />
      </div>
    </main>
  );
}
