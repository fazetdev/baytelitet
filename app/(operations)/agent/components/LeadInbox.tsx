'use client';
import React from 'react';
import { MessageCircle, Zap, Loader2 } from 'lucide-react';
import { useLeads } from '@/lib/hooks/useLeads';

export default function LeadInbox() {
  const { leads, loading } = useLeads();

  if (loading) return (
    <div className="flex items-center gap-2 p-10 text-[#D4AF37]">
      <Loader2 className="animate-spin" />
      <span className="font-black uppercase text-xs">Syncing Leads...</span>
    </div>
  );

  return (
    <div className="space-y-6">
      {leads.map(lead => (
        <div key={lead.id} className="bg-white/5 border border-white/10 p-6 rounded-[2rem] hover:border-[#D4AF37]/50 transition-all">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center gap-2">
                <p className="text-white font-bold text-lg">{lead.name}</p>
                {lead.visaCandidate && <span className="bg-[#D4AF37] text-black text-[8px] font-black px-1 rounded">GOLDEN VISA</span>}
              </div>
              <p className="text-[#D4AF37] text-sm font-black italic">{lead.budget.toLocaleString()} AED</p>
              <p className="text-gray-500 text-[10px] uppercase font-bold mt-1 flex items-center gap-1">
                <Zap size={10} /> {lead.source}
              </p>
            </div>
            <a 
              href={`https://wa.me/${lead.phone.replace('+', '')}`} 
              className="bg-[#25D366] hover:bg-[#128C7E] p-4 rounded-2xl text-white transition-transform active:scale-95"
            >
              <MessageCircle size={20}/>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
