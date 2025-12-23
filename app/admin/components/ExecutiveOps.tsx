'use client';
import React from 'react';
import { TrendingUp, Award, Target, Landmark, ShieldCheck } from 'lucide-react';

export default function ExecutiveOps() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* High-Level KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Q4 Revenue', val: '4.8M AED', icon: TrendingUp, trend: '+12%', color: 'text-[#D4AF37]' },
          { label: 'Active Pipeline', val: '82M AED', icon: Landmark, trend: 'Stable', color: 'text-blue-400' },
          { label: 'Top Agent', val: 'Ahmed M.', icon: Award, trend: '9 Deals', color: 'text-green-400' },
          { label: 'Market Share', val: '2.4%', icon: Target, trend: '+0.4%', color: 'text-purple-400' },
        ].map((stat, i) => (
          <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-[2rem]">
            <div className="flex justify-between items-start mb-4">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
              <span className="text-[8px] font-black bg-white/5 px-2 py-1 rounded text-gray-400 uppercase tracking-tighter">{stat.trend}</span>
            </div>
            <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">{stat.label}</p>
            <p className="text-2xl font-black italic text-white mt-1">{stat.val}</p>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-br from-[#D4AF37]/10 to-transparent border border-[#D4AF37]/20 p-10 rounded-[3rem] flex flex-col items-center text-center">
        <ShieldCheck className="text-[#D4AF37] w-12 h-12 mb-4" />
        <h3 className="text-xl font-black italic uppercase text-white mb-2">Executive Strategy Brief</h3>
        <p className="text-gray-400 text-sm max-w-xl mx-auto italic leading-relaxed">
          Platform usage is up 40% since the Golden Visa update. Priority: Onboard more Off-Plan specialists in Dubai Hills and Palm Jumeirah sectors.
        </p>
      </div>
    </div>
  );
}
