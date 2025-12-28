'use client';

import { useMemo, useEffect } from 'react';
import { 
  TrendingUp, Wallet, ArrowUpRight, 
  MapPin, ShieldCheck, Info,
  Activity, Building2
} from 'lucide-react';
import { useGulfAssetStore } from '@/lib/stores/gulfAssetStore';

export default function InvestorDashboard() {
  const { properties, loadProperties } = useGulfAssetStore();
  
  // Ensure properties are loaded from localStorage on mount
  useEffect(() => {
    loadProperties();
  }, [loadProperties]);

  // Calculate Portfolio Intelligence based on your Store Schema
  const stats = useMemo(() => {
    const totalValue = properties.reduce((acc, curr) => acc + Number(curr.price || 0), 0);
    const avgYield = 7.2; // Mock market data for Dubai
    const activeRequests = properties.filter(p => p.complianceStatus === 'verified').length;
    return { totalValue, avgYield, activeRequests };
  }, [properties]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-8 rounded-[2.5rem] border shadow-sm">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight uppercase">Investor Intelligence</h1>
          <p className="text-gray-500 font-medium">Portfolio Performance & Market Yield Analytics</p>
        </div>
        <div className="bg-green-50 text-green-700 px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2">
          <Activity size={14} /> MARKET: BULLISH
        </div>
      </div>

      {/* Metric Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-900 rounded-[2rem] p-8 text-white relative overflow-hidden group shadow-xl">
          <div className="relative z-10">
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2">Monitored Asset Value</p>
            <h2 className="text-4xl font-black mb-4">AED {(stats.totalValue / 1000000).toFixed(1)}M</h2>
            <div className="flex items-center gap-2 text-green-400 text-xs font-bold">
              <ArrowUpRight size={14} /> +12.4% vs Last Quarter
            </div>
          </div>
          <Wallet className="absolute -bottom-4 -right-4 text-white/5 w-32 h-32 group-hover:scale-110 transition-transform" />
        </div>

        <div className="bg-white rounded-[2rem] p-8 border shadow-sm group">
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2">Projected Net Yield</p>
          <h2 className="text-4xl font-black text-blue-600 mb-4">{stats.avgYield}%</h2>
          <div className="flex items-center gap-2 text-gray-500 text-xs font-bold">
            <Info size={14} className="text-blue-600" /> Based on 2025 rental trends
          </div>
        </div>

        <div className="bg-white rounded-[2rem] p-8 border shadow-sm">
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2">Verified Assets</p>
          <h2 className="text-4xl font-black text-gray-900 mb-4">{stats.activeRequests}</h2>
          <div className="flex items-center gap-2 text-gray-500 text-xs font-bold">
            <ShieldCheck size={14} className="text-blue-600" /> Compliance Verified
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Yield Calculator Widget */}
        <div className="bg-white rounded-[2.5rem] p-8 border shadow-sm">
          <h3 className="text-lg font-black uppercase tracking-tight mb-6 flex items-center gap-2">
            <TrendingUp size={20} className="text-blue-600" /> Yield Forecaster
          </h3>
          <div className="space-y-6">
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase">Investment Amount (AED)</label>
              <input type="number" defaultValue="2500000" className="w-full mt-2 p-4 bg-gray-50 rounded-2xl border-none font-bold text-gray-900 outline-none focus:ring-2 focus:ring-blue-600" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-2xl text-blue-900">
                <p className="text-[10px] font-bold uppercase">Est. Monthly ROI</p>
                <p className="text-xl font-black">AED 14,500</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-2xl">
                <p className="text-[10px] font-bold text-gray-500 uppercase">Service Charges</p>
                <p className="text-xl font-black text-gray-900">1.2%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Hotspots Section */}
        <div className="bg-white rounded-[2.5rem] p-8 border shadow-sm">
          <h3 className="text-lg font-black uppercase tracking-tight mb-6 flex items-center gap-2">
            <MapPin size={20} className="text-blue-600" /> Liquidity Hotspots
          </h3>
          <div className="space-y-4">
            {[
              { area: 'Palm Jumeirah', trend: '+18.2%', color: 'bg-green-500' },
              { area: 'Business Bay', trend: '+11.5%', color: 'bg-blue-500' },
              { area: 'Dubai Hills', trend: '+9.8%', color: 'bg-indigo-500' }
            ].map((spot, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${spot.color}`} />
                  <span className="font-bold text-gray-900">{spot.area}</span>
                </div>
                <span className="text-xs font-black text-gray-500">{spot.trend} growth</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
