'use client';
import React, { useState } from 'react';
import { 
  Building2, Users, ShieldCheck, 
  Plus, BarChart3, Fingerprint, 
  Briefcase, ArrowLeftRight 
} from 'lucide-react';

// Sub-components for different roles
import InventoryController from '../components/InventoryController';
import LeadFlowManager from '../components/LeadFlowManager';
import ExecutiveOps from '../components/ExecutiveOps';

type ManagementRole = 'listing_mgr' | 'lead_mgr' | 'ops_head';

export default function GulfManagementDashboard() {
  const [role, setRole] = useState<ManagementRole>('listing_mgr');

  const roles = [
    { id: 'listing_mgr', label: 'Listing Manager', icon: Building2, color: 'from-blue-500' },
    { id: 'lead_mgr', label: 'Lead Manager', icon: Users, color: 'from-[#D4AF37]' },
    { id: 'ops_head', label: 'Operations Head', icon: ShieldCheck, color: 'from-red-600' },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Top Identity Bar */}
      <header className="border-b border-white/5 bg-black/50 backdrop-blur-md p-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-[#D4AF37] to-[#B8860B] rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.3)]">
              <Fingerprint className="text-black w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-black italic uppercase tracking-tighter">Management Vault</h1>
              <p className="text-[9px] font-bold text-gray-500 uppercase tracking-[0.3em]">Division: {role.replace('_', ' ')}</p>
            </div>
          </div>

          {/* Role Switcher */}
          <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10 overflow-x-auto no-scrollbar max-w-full">
            {roles.map((r) => (
              <button
                key={r.id}
                onClick={() => setRole(r.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                  role === r.id ? 'bg-[#D4AF37] text-black shadow-lg' : 'text-gray-500 hover:text-white'
                }`}
              >
                <r.icon size={14} />
                {r.label.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content Dashboard */}
      <main className="max-w-7xl mx-auto p-6 md:p-10 animate-in fade-in duration-500">
        {role === 'listing_mgr' && <InventoryController />}
        {role === 'lead_mgr' && <LeadFlowManager />}
        {role === 'ops_head' && <ExecutiveOps />}
      </main>
    </div>
  );
}
