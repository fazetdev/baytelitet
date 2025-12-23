'use client';

import { FC } from 'react';
import GoldenVisaChecker from './GoldenVisaChecker';
import RentalCalculator from './RentalCalculator';
import UtilityEstimator from './UtilityEstimator';

interface MarketToolsPageProps {
  lang?: 'en' | 'ar';
}

const MarketToolsPage: FC<MarketToolsPageProps> = ({ lang = 'en' }) => {
  const isRTL = lang === 'ar';

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-bayt-light to-white" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className={`max-w-7xl mx-auto ${isRTL ? 'text-right' : 'text-left'}`}>
        <h1 className="text-4xl font-bold text-bayt-dark mb-2">
          {isRTL ? 'أدوات السوق' : 'Market Tools'}
        </h1>
        <p className="text-gray-600 mb-8">
          {isRTL 
            ? 'مجموعة كاملة لتحليل الاستثمار العقاري' 
            : 'Complete suite for real estate investment analysis'}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <GoldenVisaChecker />
          <RentalCalculator />
          <UtilityEstimator />
        </div>
      </div>
    </div>
  );
};

export default MarketToolsPage;
