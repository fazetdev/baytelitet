'use client';

import HeroSection from './home/HeroSection';
import ChooseRole from './home/components/ChooseRole';
import MarketHighlights from './home/MarketHighlights';
import MarketTools from './home/components/MarketTools';
import FeaturesSection from './home/FeaturesSection';
import TrustSection from './home/TrustSection';
import CTASection from './home/CTASection';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Role Selector / Choose Role */}
      <ChooseRole />

      {/* Market Highlights */}
      <MarketHighlights />

      {/* Market Tools */}
      <MarketTools />

      {/* Features */}
      <FeaturesSection />

      {/* Trust Section */}
      <TrustSection />

      {/* Call To Action */}
      <CTASection />
    </div>
  );
}
