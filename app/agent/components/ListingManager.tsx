'use client';
import React, { useState } from 'react';
import { 
  Building2, Users, ShieldAlert, BadgeDollarSign, 
  Search, Filter, Plus, ChevronRight, FileText 
} from 'lucide-react';

export default function ListingManager() {
  const [activeSubView, setActiveSubView] = useState<'inventory' | 'agents' | 'compliance'>('inventory');

  return (
    <div className="space-y-8 pb-20">
      {/* MANAGEMENT TABS - Sub-Navigation */}
      <div className="flex gap-4 border-b border-white/5 pb-1 overflow-x-auto no-scrollbar">
        {[
          { id: 'inventory', label: 'Inventory Control', icon: Building2 },
          { id: 'agents', label: 'Agent Performance', icon: Users },
          { id: 'compliance', label: 'RERA Compliance', icon: ShieldAlert },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubView(tab.id as any)}
            className={`flex items-center gap-2 pb-4 px-2 text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
              activeSubView === tab.id ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]' : 'text-gray-500 hover:text-white'
            }`}
          >
            <tab.icon size={14} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* RENDER CONTENT BASED ON SUB-VIEW */}
      {activeSubView === 'inventory' && (
        <div className="space-y-6 animate-in fade-in duration-500">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
              <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Global Inventory</p>
              <p className="text-2xl font-black italic text-white mt-1">142 Units</p>
            </div>
            <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
              <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Active NOCs</p>
              <p className="text-2xl font-black italic text-[#D4AF37] mt-1">118 Valid</p>
            </div>
            <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
              <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Management Yield</p>
              <p className="text-2xl font-black italic text-green-500 mt-1">6.8% Avg</p>
            </div>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-6 text-center py-20">
             <p className="text-gray-500 italic text-sm">Property Management Module: Active monitoring of 42 buildings...</p>
          </div>
        </div>
      )}

      {activeSubView === 'agents' && (
        <div className="grid grid-cols-1 gap-4 animate-in slide-in-from-right-4 duration-500">
          {[
            { name: 'Sarah Jenkins', role: 'Off-Plan Specialist', sales: '12.5M', target: '80%' },
            { name: 'Ahmed Mansoor', role: 'Luxury Rental Lead', sales: '4.2M', target: '110%' },
          ].map((agent, i) => (
            <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-[2rem] flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-800 rounded-full border border-[#D4AF37]/30"></div>
                <div>
                  <h4 className="text-white font-bold">{agent.name}</h4>
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-tighter">{agent.role}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[#D4AF37] font-black">{agent.sales} AED</p>
                <div className="w-24 h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
                   <div className="h-full bg-green-500" style={{ width: agent.target }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeSubView === 'compliance' && (
        <div className="bg-red-500/5 border border-red-500/20 p-8 rounded-[2.5rem] flex flex-col items-center text-center gap-4">
          <ShieldAlert className="w-12 h-12 text-red-500" />
          <div>
             <h3 className="text-white font-black uppercase italic tracking-tighter">Audit Required</h3>
             <p className="text-gray-500 text-xs mt-1">3 Listing Permits (RERA Trakheesi) are expiring in 48 hours.</p>
          </div>
          <button className="bg-red-500 text-white px-6 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest">Review Permits</button>
        </div>
      )}
    </div>
  );
}
