'use client';

import HeroSection from './home/HeroSection';
import RoleSelector from './home/RoleSelector';
import MarketHighlights from './home/MarketHighlights';
import FeaturesSection from './home/FeaturesSection';
import TrustSection from './home/TrustSection';
import CTASection from './home/CTASection';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <RoleSelector />
      <MarketHighlights />
      <FeaturesSection />
      <TrustSection />
      <CTASection />
    </div>
  );
}
import ChooseRole from './home/components/ChooseRole';

// In the return statement, add:
<ChooseRole />
