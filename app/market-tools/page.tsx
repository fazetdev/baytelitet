'use client';
import GoldenVisaChecker from './GoldenVisaChecker';
import RentalCalculator from './RentalCalculator';
import UtilityEstimator from './UtilityEstimator';

export default function MarketToolsPage() {
  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-bayt-light to-white">
      <h1 className="text-4xl font-bold text-bayt-dark mb-2">Market Tools</h1>
      <p className="text-gray-600 mb-8">Complete suite for real estate investment analysis</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <GoldenVisaChecker />
        <RentalCalculator />
        <UtilityEstimator />
      </div>
    </div>
  );
}
