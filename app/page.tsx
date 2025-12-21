'use client';

// CORRECT PATHS BASED ON YOUR FILE STRUCTURE:
import HeroSection from './home/HeroSection';                // ✓ app/home/HeroSection.tsx
import ChooseRole from './home/components/ChooseRole';      // ✓ app/home/components/ChooseRole.tsx
import MarketHighlights from './home/MarketHighlights';     // ✓ app/home/MarketHighlights.tsx
import FeaturesSection from './home/components/FeaturesSection'; // ✓ app/home/components/FeaturesSection.tsx
import TrustSection from './home/TrustSection';             // ✓ app/home/TrustSection.tsx
import MarketTools from './home/components/MarketTools';    // ✓ app/home/components/MarketTools.tsx

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
