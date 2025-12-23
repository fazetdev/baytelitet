'use client';

import React, { useState } from 'react';
import { Home, ShieldCheck, AlertTriangle, ExternalLink, Plus, ArrowLeft } from 'lucide-react';
import { AgentListing } from '@/lib/types/agent';
import AddListingForm from './AddListingForm';

// Initial data state (In Phase 3, this will come from useListings hook)
const initialListings: AgentListing[] = [
  {
    id: 'prop-101',
    title: 'Luxury Penthouse | Business Bay',
    permitNumber: '7123456789',
    permitExpiry: '2026-05-20',
    status: 'Live',
    price: 4500000,
    location: 'Dubai, UAE',
    type: 'Ready'
  }
];

export default function ListingManager() {
  const [isAdding, setIsAdding] = useState(false);
  const [listings, setListings] = useState<AgentListing[]>(initialListings);

  if (isAdding) {
    return (
      <div className="space-y-6">
        <button 
          onClick={() => setIsAdding(false)}
          className="flex items-center gap-2 text-gray-500 hover:text-[#D4AF37] transition-colors font-bold text-xs uppercase tracking-widest"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Inventory
        </button>
        <AddListingForm onComplete={() => setIsAdding(false)} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black italic uppercase tracking-tighter text-white">Portfolio Management</h2>
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mt-1">Managed Inventory & Compliance</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 px-6 py-3 bg-[#D4AF37] text-black rounded-xl font-black uppercase text-xs tracking-widest hover:bg-yellow-500 transition-all shadow-lg shadow-[#D4AF37]/10"
        >
          <Plus className="w-4 h-4" /> Add New Listing
        </button>
      </div>

      {/* Stats Mini-Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
          <p className="text-[9px] font-black text-gray-500 uppercase">Total Value</p>
          <p className="text-sm font-bold text-white">4.5M AED</p>
        </div>
        <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
          <p className="text-[9px] font-black text-gray-500 uppercase">Active Permits</p>
          <p className="text-sm font-bold text-green-500">100%</p>
        </div>
      </div>

      {/* Inventory List */}
      <div className="grid grid-cols-1 gap-4">
        {listings.map((listing) => {
          const isExpiring = new Date(listing.permitExpiry) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
          
          return (
            <div key={listing.id} className="bg-white/5 border border-white/10 p-6 rounded-[2rem] hover:bg-white/[0.07] transition-all group">
              <div className="flex flex-col lg:flex-row gap-6 justify-between">
                
                <div className="flex gap-4">
                  <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[#D4AF37]/30 transition-colors">
                    <Home className="w-8 h-8 text-gray-600 group-hover:text-[#D4AF37]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white mb-1">{listing.title}</h3>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-tight">{listing.location}</span>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded ${listing.type === 'Off-Plan' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'}`}>
                        {listing.type}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-center px-6 lg:border-l lg:border-r border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Permit: {listing.permitNumber}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold ${isExpiring ? 'text-red-500' : 'text-gray-500'}`}>
                      {isExpiring ? '⚠️ Action Required' : '✓ Compliant'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between lg:justify-end gap-8">
                  <div className="text-right">
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Price</p>
                    <p className="text-xl font-black text-white italic">
                      {listing.price.toLocaleString()} <span className="text-[#D4AF37] text-sm not-italic font-bold">AED</span>
                    </p>
                  </div>
                  <button className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-[#D4AF37] hover:text-black transition-all">
                    <ExternalLink className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
