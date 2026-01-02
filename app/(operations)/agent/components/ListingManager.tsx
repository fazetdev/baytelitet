'use client';
import React, { useState, useEffect } from 'react';
import {
  Building2, Users, ShieldAlert, BadgeDollarSign,
  Search, Filter, Plus, ChevronRight, FileText, Trash2,
  Loader2
} from 'lucide-react';
import { useProperties } from '@/app/context/useProperties';
import { useAgents } from '@/app/context/useAgents';

export default function ListingManager() {
  const [activeSubView, setActiveSubView] = useState<'inventory' | 'agents' | 'compliance'>('inventory');
  const { properties, deleteProperty, loading: propertiesLoading } = useProperties();
  const { agents, loading: agentsLoading } = useAgents();

  const handleDeleteProperty = async (id: number) => {
    if (confirm('Are you sure you want to delete this property?')) {
      try {
        await deleteProperty(id);
      } catch (error) {
        console.error('Failed to delete property:', error);
        alert('Failed to delete property');
      }
    }
  };

  if (propertiesLoading || agentsLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-6 h-6 text-[#D4AF37] animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20">
      {/* MANAGEMENT TABS */}
      <div className="flex gap-4 border-b border-white/5 pb-1 overflow-x-auto no-scrollbar">
        {[
          { id: 'inventory', label: 'Inventory Control', icon: Building2 },
          { id: 'agents', label: 'Team Performance', icon: Users },
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

      {/* RENDER CONTENT */}
      {activeSubView === 'inventory' && (
        <div className="space-y-6 animate-in fade-in duration-500">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
              <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Global Inventory</p>
              <p className="text-2xl font-black italic text-white mt-1">{properties.length} Units</p>
            </div>
            <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
              <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Verified Listings</p>
              <p className="text-2xl font-black italic text-[#D4AF37] mt-1">
                {properties.filter(p => p.complianceStatus === 'verified').length} Valid
              </p>
            </div>
            <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
              <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Active Agents</p>
              <p className="text-2xl font-black italic text-green-500 mt-1">{agents.filter(a => a.status === 'verified').length}</p>
            </div>
          </div>

          <div className="space-y-4">
            {properties.length === 0 ? (
               <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-6 text-center py-20 text-gray-500">
                 No assets in management. Use the Onboarding dashboard to add units.
               </div>
            ) : (
              properties.map((prop) => (
                <div key={prop.id} className="bg-white/5 border border-white/10 p-4 rounded-2xl flex justify-between items-center group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-[#D4AF37]">
                      <Building2 size={20} />
                    </div>
                    <div>
                      <h4 className="text-white text-sm font-bold">{prop.title}</h4>
                      <p className="text-[10px] text-gray-500 uppercase font-black">{prop.city} • AED {prop.price?.toLocaleString()}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => prop.id && handleDeleteProperty(prop.id)}
                    className="opacity-0 group-hover:opacity-100 text-red-500 transition-opacity p-2 hover:text-red-400"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {activeSubView === 'agents' && (
        <div className="grid grid-cols-1 gap-4 animate-in slide-in-from-right-4 duration-500">
          {agents.length === 0 ? (
            <p className="text-gray-500 text-center py-10 italic">No agents onboarded.</p>
          ) : (
            agents.map((agent) => (
              <div key={agent.id} className="bg-white/5 border border-white/10 p-6 rounded-[2rem] flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-800 rounded-full border border-[#D4AF37]/30 flex items-center justify-center text-white font-bold">
                    {agent.name?.charAt(0) || 'A'}
                  </div>
                  <div>
                    <h4 className="text-white font-bold">{agent.name || 'Unknown Agent'}</h4>
                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-tighter">{agent.agency || 'Independent'}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-[9px] font-black px-2 py-1 rounded-full ${agent.status === 'verified' ? 'bg-green-500/10 text-green-500' : 'bg-amber-500/10 text-amber-500'}`}>
                    {(agent.status || 'active').toUpperCase()}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeSubView === 'compliance' && (
        <div className="bg-red-500/5 border border-red-500/20 p-8 rounded-[2.5rem] flex flex-col items-center text-center gap-4">
          <ShieldAlert className="w-12 h-12 text-red-500" />
          <div>
             <h3 className="text-white font-black uppercase italic tracking-tighter">Live Compliance Monitor</h3>
             <p className="text-gray-500 text-xs mt-1">
               {properties.filter(p => p.complianceStatus === 'pending').length} items require Trakheesi permit validation.
             </p>
          </div>
          <button className="bg-red-500 text-white px-6 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-red-600 transition-colors">
            Begin Audit
          </button>
        </div>
      )}
    </div>
  );
}
