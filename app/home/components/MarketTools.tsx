'use client';

import { useState } from 'react';
import GoldenVisaChecker from './market-tools/GoldenVisaChecker';
import RentalCalculator from './market-tools/RentalCalculator';
import UtilityEstimator from './market-tools/UtilityEstimator';

export default function MarketTools() {
  const [activeTool, setActiveTool] = useState<'golden' | 'rental' | 'utility' | null>(null);

  return (
    <div className="bg-gradient-to-br from-bayt-warm/10 to-yellow-50 rounded-2xl p-6 border border-bayt-warm/50 my-8">
      <h3 className="text-lg font-bold text-bayt-dark mb-4">Market Tools / أدوات السوق</h3>

      {/* Tool selection buttons */}
      <div className="space-y-4">
        <button
          className={`w-full text-left p-4 rounded-xl border transition-colors ${
            activeTool === 'golden' 
              ? 'bg-bayt-warm/20 border-bayt-warm text-bayt-dark' 
              : 'bg-white border-bayt-warm/50 hover:border-bayt-warm'
          }`}
          onClick={() => setActiveTool(activeTool === 'golden' ? null : 'golden')}
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">🏆</span>
            <div>
              <p className="font-semibold">Golden Visa Checker</p>
              <p className="text-sm text-gray-600">مدقق التأشيرة الذهبية</p>
            </div>
          </div>
        </button>

        <button
          className={`w-full text-left p-4 rounded-xl border transition-colors ${
            activeTool === 'rental' 
              ? 'bg-bayt-warm/20 border-bayt-warm text-bayt-dark' 
              : 'bg-white border-bayt-warm/50 hover:border-bayt-warm'
          }`}
          onClick={() => setActiveTool(activeTool === 'rental' ? null : 'rental')}
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">📈</span>
            <div>
              <p className="font-semibold">Rental Yield Calculator</p>
              <p className="text-sm text-gray-600">حاسبة العائد الإيجاري</p>
            </div>
          </div>
        </button>

        <button
          className={`w-full text-left p-4 rounded-xl border transition-colors ${
            activeTool === 'utility' 
              ? 'bg-bayt-warm/20 border-bayt-warm text-bayt-dark' 
              : 'bg-white border-bayt-warm/50 hover:border-bayt-warm'
          }`}
          onClick={() => setActiveTool(activeTool === 'utility' ? null : 'utility')}
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">⚡</span>
            <div>
              <p className="font-semibold">Utility Estimator</p>
              <p className="text-sm text-gray-600">تقدير فواتير الخدمات</p>
            </div>
          </div>
        </button>
      </div>

      {/* Render selected tool with close option */}
      {activeTool && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-semibold text-bayt-dark">
              {activeTool === 'golden' && 'Golden Visa Checker'}
              {activeTool === 'rental' && 'Rental Yield Calculator'}
              {activeTool === 'utility' && 'Utility Estimator'}
            </h4>
            <button 
              onClick={() => setActiveTool(null)}
              className="text-sm text-gray-500 hover:text-bayt-warm flex items-center gap-1"
            >
              <span>Close</span>
              <span>✕</span>
            </button>
          </div>
          
          <div className="animate-fadeIn">
            {activeTool === 'golden' && <GoldenVisaChecker />}
            {activeTool === 'rental' && <RentalCalculator />}
            {activeTool === 'utility' && <UtilityEstimator />}
          </div>
        </div>
      )}

      {/* Add fadeIn animation to Tailwind if not already present */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
