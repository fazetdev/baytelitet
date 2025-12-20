'use client';

export default function MarketTools() {
  return (
    <div className="bg-gradient-to-br from-bayt-warm/10 to-yellow-50 rounded-2xl p-6 border border-bayt-warm/50 my-8">
      <h3 className="text-lg font-bold text-bayt-dark mb-4">Market Tools</h3>
      <div className="space-y-4">
        <button className="w-full text-left p-4 bg-white rounded-xl border border-bayt-warm/50 hover:border-bayt-warm transition-colors">
          <div className="flex items-center gap-3">
            <div className="text-2xl text-bayt-warm">🏆</div>
            <div>
              <div className="font-semibold text-bayt-dark">Golden Visa Checker</div>
              <div className="text-sm text-gray-600">Check eligibility for UAE Golden Visa</div>
            </div>
          </div>
        </button>
        <button className="w-full text-left p-4 bg-white rounded-xl border border-bayt-warm/50 hover:border-bayt-warm transition-colors">
          <div className="flex items-center gap-3">
            <div className="text-2xl text-bayt-warm">📈</div>
            <div>
              <div className="font-semibold text-bayt-dark">Rental Yield Calculator</div>
              <div className="text-sm text-gray-600">Calculate potential rental income</div>
            </div>
          </div>
        </button>
        <button className="w-full text-left p-4 bg-white rounded-xl border border-bayt-warm/50 hover:border-bayt-warm transition-colors">
          <div className="flex items-center gap-3">
            <div className="text-2xl text-bayt-warm">⚡</div>
            <div>
              <div className="font-semibold text-bayt-dark">Utility Estimates</div>
              <div className="text-sm text-gray-600">Power/water consumption estimates</div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
