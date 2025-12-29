'use client';

import { useAgents } from '@/app/context/useAgents';
import { Search, MapPin, ShieldCheck, Mail, Phone, Briefcase } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function PublicAgentsPage() {
  const { agents, loadAgents, getVerifiedAgents } = useAgents();
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadAgents();
  }, [loadAgents]);

  // Only show Verified agents to the public
  const verifiedAgents = getVerifiedAgents();
  
  const filteredAgents = verifiedAgents.filter(a => 
    a.fullName.toLowerCase().includes(search.toLowerCase()) ||
    a.brokerageName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#1A1A1A] text-white py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Elite Agents Network</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Connecting top-tier professionals with premium Gulf real estate opportunities.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-8">
        <div className="bg-white shadow-xl rounded-xl p-4 flex flex-col md:flex-row gap-4 border">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search verified agents..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="py-12">
          {filteredAgents.length === 0 ? (
            <div className="text-center py-20 border-2 border-dashed rounded-3xl">
              <ShieldCheck className="mx-auto text-gray-300 mb-4" size={48} />
              <p className="text-gray-500 font-medium">
                {verifiedAgents.length === 0 
                  ? "No agents have been verified yet. Check back soon!" 
                  : "No verified agents match your search."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAgents.map((agent) => (
                <div key={agent.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 font-bold text-2xl border border-emerald-100">
                        {agent.fullName.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          <h3 className="text-xl font-bold text-gray-900">{agent.fullName}</h3>
                          <ShieldCheck size={16} className="text-blue-500" />
                        </div>
                        <p className="text-sm text-gray-500">{agent.brokerageName || 'Independent Broker'}</p>
                      </div>
                    </div>
                    <div className="space-y-2 mb-6 text-sm text-gray-600">
                      <p className="flex items-center gap-2"><Briefcase size={14}/> License: {agent.reraNumber}</p>
                      <p className="flex items-center gap-2"><Phone size={14}/> {agent.phone}</p>
                    </div>
                    <button className="w-full py-3 bg-gray-900 text-white rounded-lg font-bold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
                      <Mail size={18} /> Contact Agent
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
