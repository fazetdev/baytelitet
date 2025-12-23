'use client';
import React from 'react';
import { Building2, ShieldCheck, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';

export default function InventoryController() {
  const permits = [
    { id: 'T-9821', prop: 'Burj Khalifa Apt 402', status: 'Expiring', date: '2025-12-28' },
    { id: 'T-4432', prop: 'Palm Villa #9', status: 'Valid', date: '2026-05-12' },
    { id: 'T-1109', prop: 'Dubai Hills Townhouse', status: 'Pending', date: 'N/A' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
      {/* Inventory Health Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20 p-8 rounded-[2.5rem] relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <CheckCircle2 size={120} />
          </div>
          <div className="flex justify-between items-center mb-6">
            <ShieldCheck className="text-green-500" size={24} />
            <span className="bg-green-500/20 text-green-500 text-[8px] font-black px-2 py-1 rounded tracking-widest uppercase">RERA Compliant</span>
          </div>
          <h3 className="text-4xl font-black italic text-white leading-none">842</h3>
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mt-2">Active Live Units</p>
        </div>

        <div className="bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/20 p-8 rounded-[2.5rem] relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <AlertCircle size={120} />
          </div>
          <div className="flex justify-between items-center mb-6">
            <AlertCircle className="text-red-500" size={24} />
            <span className="bg-red-500/20 text-red-500 text-[8px] font-black px-2 py-1 rounded tracking-widest uppercase">Audit Required</span>
          </div>
          <h3 className="text-4xl font-black italic text-white leading-none">12</h3>
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mt-2">Permit Violations</p>
        </div>
      </div>

      {/* Permit Tracking Table */}
      <div className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden">
        <div className="p-8 border-b border-white/5 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-black italic uppercase text-white">Permit Control Center</h3>
            <p className="text-gray-500 text-[9px] font-black uppercase tracking-widest">Trakheesi Integration Active</p>
          </div>
          <button className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all">
             <FileText size={18} className="text-[#D4AF37]" />
          </button>
        </div>
        
        <div className="divide-y divide-white/5">
          {permits.map((p, i) => (
            <div key={i} className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-white/[0.02] transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center font-black text-[#D4AF37] text-[10px]">{p.id}</div>
                <div>
                  <p className="text-sm font-bold text-white">{p.prop}</p>
                  <p className="text-[9px] text-gray-500 font-black uppercase">Expires: {p.date}</p>
                </div>
              </div>
              <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-full border ${
                p.status === 'Expiring' ? 'text-orange-500 bg-orange-500/10 border-orange-500/20' : 
                p.status === 'Valid' ? 'text-green-500 bg-green-500/10 border-green-500/20' : 
                'text-gray-500 bg-gray-500/10 border-gray-500/20'
              }`}>
                {p.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
