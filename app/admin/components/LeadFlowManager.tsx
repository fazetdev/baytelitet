'use client';
import React from 'react';
import { Users, Zap, MessageSquare, ArrowUpRight } from 'lucide-react';

export default function LeadFlowManager() {
  const sources = [
    { name: 'Instagram Ads', count: 142, quality: 'High' },
    { name: 'PropertyFinder', count: 89, quality: 'Medium' },
    { name: 'Direct Referrals', count: 12, quality: 'Elite' },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sources.map((source, i) => (
          <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-[2rem] hover:bg-white/10 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-[#D4AF37]/20 rounded-lg text-[#D4AF37]">
                <Zap size={18} />
              </div>
              <span className="text-[8px] font-black uppercase tracking-widest text-gray-500">{source.quality} Quality</span>
            </div>
            <p className="text-white font-black italic text-lg uppercase tracking-tighter">{source.name}</p>
            <p className="text-2xl font-black text-[#D4AF37] mt-1">{source.count} <span className="text-[10px] text-gray-500 font-bold uppercase">New Leads</span></p>
          </div>
        ))}
      </div>

      <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8">
        <h3 className="text-xl font-black italic uppercase text-white mb-6 flex items-center gap-2">
          <Users className="text-[#D4AF37]" size={20} /> Broker Assignment Queue
        </h3>
        <div className="space-y-3">
          {['Ahmed Mansoor', 'Sarah Jenkins', 'Elena Rodriguez'].map((agent, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-black/40 rounded-2xl border border-white/5 group hover:border-[#D4AF37]/50 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-800 border border-white/10"></div>
                <div>
                  <p className="text-sm font-bold text-white">{agent}</p>
                  <p className="text-[9px] text-gray-500 font-black uppercase">Active Load: {5 + i} Leads</p>
                </div>
              </div>
              <button className="flex items-center gap-2 text-[10px] font-black uppercase text-[#D4AF37] group-hover:translate-x-1 transition-transform">
                Assign Lead <ArrowUpRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
