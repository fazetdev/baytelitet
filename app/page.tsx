'use client';

import HeroSection from './home/HeroSection';
import FeaturesSection from './home/FeaturesSection';
import MarketHighlights from './home/MarketHighlights';
import TrustSection from './home/TrustSection';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-bayt-light">
      <HeroSection />
      <MarketHighlights />

      {/* Features Section */}
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-bayt-dark mb-8">Market Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 border border-bayt-warm/50 shadow">
            <div className="flex items-center gap-3 text-2xl text-bayt-warm">🏆</div>
            <div className="mt-2 font-semibold text-bayt-dark">Golden Visa Checker</div>
            <div className="text-sm text-gray-600">Check eligibility for UAE Golden Visa</div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-bayt-warm/50 shadow">
            <div className="flex items-center gap-3 text-2xl text-bayt-warm">📈</div>
            <div className="mt-2 font-semibold text-bayt-dark">Rental Yield Calculator</div>
            <div className="text-sm text-gray-600">Calculate potential rental income</div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-bayt-warm/50 shadow">
            <div className="flex items-center gap-3 text-2xl text-bayt-warm">⚡</div>
            <div className="mt-2 font-semibold text-bayt-dark">Utility Estimates</div>
            <div className="text-sm text-gray-600">Power/water consumption estimates</div>
          </div>
        </div>
      </div>

      <FeaturesSection />
      <TrustSection />
    </div>
  );
}
