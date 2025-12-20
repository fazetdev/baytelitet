'use client';

import HeroSection from '@/app/home/HeroSection';
import RoleSelector from '@/app/home/RoleSelector';
import MarketHighlights from '@/app/home/MarketHighlights';
import FeaturesSection from '@/app/home/FeaturesSection';
import TrustSection from '@/app/home/TrustSection';
import CTASection from '@/app/home/CTASection';

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
