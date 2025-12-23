'use client';
import React from 'react';
import { Users, Zap, MessageSquare, ArrowUpRight, Globe, Instagram } from 'lucide-react';

export default function LeadFlowManager() {
  const sources = [
    { name: 'Instagram Ads', count: 142, quality: 'High', icon: Instagram },
    { name: 'PropertyFinder', count: 89, quality: 'Medium', icon: Globe },
    { name: 'Direct Referrals', count: 12, quality: 'Elite', icon: Zap },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sources.map((source, i) => (
          <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-[2rem] hover:bg-white/10 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-[#D4AF37]/10 rounded-xl text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-all">
                <source.icon size={20} />
              </div>
              <span className="text-[8px] font-black uppercase tracking-widest text-gray-500">Source: Verified</span>
            </div>
            <p className="text-white font-black italic text-lg uppercase tracking-tighter">{source.name}</p>
            <p className="text-2xl font-black text-[#D4AF37] mt-1">{source.count} <span className="text-[10px] text-gray-500 font-bold uppercase">New Leads</span></p>
          </div>
        ))}
      </div>

      <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xl font-black italic uppercase text-white flex items-center gap-2">
            <Users className="text-[#D4AF37]" size={20} /> Broker Assignment
          </h3>
          <span className="text-[10px] font-black uppercase text-green-500 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">4 Agents Online</span>
        </div>
        
        <div className="space-y-3">
          {[
            { name: 'Ahmed Mansoor', load: 8, performance: 'Top' },
            { name: 'Sarah Jenkins', load: 12, performance: 'Steady' },
            { name: 'Elena Rodriguez', load: 5, performance: 'New' }
          ].map((agent, i) => (
            <div key={i} className="flex items-center justify-between p-5 bg-black/40 rounded-2xl border border-white/5 hover:border-[#D4AF37]/30 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-800 to-gray-700 border border-white/10 flex items-center justify-center font-black text-[10px]">{agent.name[0]}</div>
                <div>
                  <p className="text-sm font-bold text-white">{agent.name}</p>
                  <p className="text-[9px] text-gray-500 font-black uppercase tracking-tighter">Active Load: {agent.load} Leads • {agent.performance} Performer</p>
                </div>
              </div>
              <button className="text-[9px] font-black uppercase bg-[#D4AF37] text-black px-4 py-2 rounded-lg shadow-lg hover:brightness-110 active:scale-95 transition-all">Assign</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
