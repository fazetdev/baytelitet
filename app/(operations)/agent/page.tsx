'use client';

import { useState } from 'react';
import LeadInbox from './components/LeadInbox';
import ListingManager from './components/ListingManager';
import DealPipeline from './components/DealPipeline';

export default function AgentPortal() {
  const [activeView, setActiveView] = useState<'leads' | 'listings' | 'pipeline'>('leads');

  return (
    <div className="min-h-screen">
      {/* Sub-Navigation (Portal Switcher) */}
      <div className="flex gap-8 border-b border-white/5 mb-12 overflow-x-auto no-scrollbar pb-1">
        {[
          { id: 'leads', label: 'Lead Intelligence' },
          { id: 'listings', label: 'Inventory Manager' },
          { id: 'pipeline', label: 'Deal Pipeline' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveView(tab.id as any)}
            className={`pb-4 text-[11px] font-black uppercase tracking-[0.2em] transition-all relative whitespace-nowrap ${
              activeView === tab.id ? 'text-[#D4AF37]' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            {tab.label}
            {activeView === tab.id && (
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#D4AF37] shadow-[0_0_10px_#D4AF37]"></div>
            )}
          </button>
        ))}
      </div>

      {/* Render Active View */}
      <div className="animate-in fade-in duration-700">
        {activeView === 'leads' && <LeadInbox />}
        {activeView === 'listings' && <ListingManager />}
        {activeView === 'pipeline' && <DealPipeline />}
      </div>
    </div>
  );
}
