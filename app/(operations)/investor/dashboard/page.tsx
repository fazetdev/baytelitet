'use client';

import { useMemo, useEffect, useState } from 'react';
import {
  TrendingUp, Wallet, ArrowUpRight,
  MapPin, ShieldCheck, Info,
  Activity, Building2, Loader2
} from 'lucide-react';

interface Property {
  id: string;
  price: number;
  complianceStatus: string;
  // other properties...
}

export default function InvestorDashboard() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load properties from API
  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/properties');
        if (!response.ok) {
          throw new Error(`Failed to fetch properties: ${response.status}`);
        }
        const data = await response.json();
        setProperties(data);
      } catch (err) {
        console.error('Failed to load properties:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Calculate Portfolio Intelligence based on API data
  const stats = useMemo(() => {
    if (loading) {
      return { totalValue: 0, avgYield: 7.2, activeRequests: 0 };
    }
    
    const totalValue = properties.reduce((acc, curr) => acc + Number(curr.price || 0), 0);
    const avgYield = 7.2; // Mock market data for Dubai
    const activeRequests = properties.filter(p => p.complianceStatus === 'verified').length;
    return { totalValue, avgYield, activeRequests };
  }, [properties, loading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold text-red-700 mb-2">Error Loading Dashboard</h2>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

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
              { location: 'Dubai Marina', yield: '8.2%', trend: 'up' },
              { location: 'Downtown Dubai', yield: '7.8%', trend: 'stable' },
              { location: 'Jumeirah Village', yield: '9.1%', trend: 'up' },
              { location: 'Business Bay', yield: '7.5%', trend: 'stable' }
            ].map((spot, index) => (
              <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <Building2 size={16} className="text-blue-600" />
                  <span className="font-bold">{spot.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-blue-700">{spot.yield}</span>
                  <ArrowUpRight size={14} className={spot.trend === 'up' ? 'text-green-500' : 'text-gray-400'} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
