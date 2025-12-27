'use client';

import React, { useState } from 'react';
import { Search, MapPin, Award, MessageCircle, Star, ShieldCheck } from 'lucide-react';
import { useAgentStore } from '@/lib/stores/agentStore';

export default function PublicAgentDir() {
  const { agents } = useAgentStore();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAgents = agents.filter(agent => 
    agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.agency.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full">
      {/* Search Header */}
      <div className="relative mb-12 max-w-2xl mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input 
          type="text"
          placeholder="Search by name, area, or agency..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-[#B8860B] outline-none transition-all"
        />
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredAgents.map((agent) => (
          <div key={agent.id} className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden hover:shadow-2xl transition-all group">
            <div className="relative h-48 bg-gray-900">
              {agent.photo ? (
                <img src={agent.photo} alt={agent.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-black text-white text-4xl font-bold">
                  {agent.name.charAt(0)}
                </div>
              )}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1">
                <ShieldCheck className="text-emerald-600" size={14} />
                <span className="text-[10px] font-bold text-gray-900 uppercase">Verified</span>
              </div>
            </div>

            <div className="p-6 relative">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{agent.name}</h3>
                  <p className="text-[#B8860B] font-medium text-sm">{agent.agency}</p>
                </div>
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star size={14} fill="currentColor" />
                  <span className="text-xs font-bold text-gray-900">5.0</span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <Award size={16} className="text-gray-400" />
                  <span>License: {agent.licenseNumber}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <MapPin size={16} className="text-gray-400" />
                  <span>{agent.city} • {agent.specialization}</span>
                </div>
              </div>

              <p className="text-gray-500 text-sm line-clamp-2 mb-6 italic">
                "{agent.bio || 'Professional real estate advisor dedicated to finding your perfect Gulf home.'}"
              </p>

              <div className="flex gap-3">
                <a 
                  href={`https://wa.me/${agent.phone}`} 
                  target="_blank"
                  className="flex-1 bg-emerald-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-colors"
                >
                  <MessageCircle size={18} /> WhatsApp
                </a>
                <button className="flex-1 border border-gray-200 py-3 rounded-xl font-bold hover:bg-gray-50 transition-colors">
                  View Listings
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAgents.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-400 italic">No agents found matching your search.</p>
        </div>
      )}
    </div>
  );
}
