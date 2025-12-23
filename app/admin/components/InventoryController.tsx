'use client';
import React from 'react';
import { Building2, ShieldCheck, AlertCircle, Eye } from 'lucide-react';

export default function InventoryController() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20 p-8 rounded-[2.5rem]">
          <div className="flex justify-between items-center mb-6">
            <ShieldCheck className="text-green-500" size={24} />
            <span className="bg-green-500/20 text-green-500 text-[8px] font-black px-2 py-1 rounded">RERA COMPLIANT</span>
          </div>
          <h3 className="text-3xl font-black italic text-white leading-none">842</h3>
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mt-2">Active Live Units</p>
        </div>

        <div className="bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/20 p-8 rounded-[2.5rem]">
          <div className="flex justify-between items-center mb-6">
            <AlertCircle className="text-red-500" size={24} />
            <span className="bg-red-500/20 text-red-500 text-[8px] font-black px-2 py-1 rounded">ACTION REQUIRED</span>
          </div>
          <h3 className="text-3xl font-black italic text-white leading-none">12</h3>
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mt-2">Permit Expiring (48h)</p>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden">
        <div className="p-6 border-b border-white/5 flex justify-between items-center">
          <h3 className="text-lg font-black italic uppercase tracking-tight">Elite Portfolio Audit</h3>
        </div>
        <div className="divide-y divide-white/5">
           {[
             { title: 'Palm Jumeirah Mansion', status: 'Pending NOC', agent: 'Sarah J.' },
             { title: 'Downtown Loft v2', status: 'Invalid Photos', agent: 'Ahmed M.' },
           ].map((item, i) => (
             <div key={i} className="p-6 flex justify-between items-center hover:bg-white/[0.02] transition-colors">
               <div>
                 <p className="text-sm font-bold text-white">{item.title}</p>
                 <p className="text-[9px] text-gray-500 font-black uppercase">Managed by: {item.agent}</p>
               </div>
               <span className="text-orange-500 text-[9px] font-black uppercase tracking-widest bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">{item.status}</span>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
