'use client';

import HeroSection from './home/HeroSection';
import MarketHighlights from './home/MarketHighlights';
import FeaturesSection from './home/FeaturesSection';
import TrustSection from './home/TrustSection';
import CTASection from './home/CTASection';
import ChooseRole from './home/components/ChooseRole';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ChooseRole />
      <MarketHighlights />
      <FeaturesSection />
      <TrustSection />
      <CTASection />
    </div>
  );
}
