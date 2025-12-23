'use client';
import React from 'react';
import { Users, Zap, ArrowUpRight } from 'lucide-react';

export default function LeadFlowManager() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-black italic uppercase text-white flex items-center gap-2">
          <Users className="text-[#D4AF37]" size={20} /> Broker Assignment
        </h3>
      </div>
      <div className="space-y-3 text-center py-20 border-2 border-dashed border-white/5 rounded-3xl">
        <Zap className="mx-auto text-gray-600 mb-4" />
        <p className="text-gray-500 font-bold uppercase text-[10px]">Lead sync active. No pending assignments.</p>
      </div>
    </div>
  );
}
