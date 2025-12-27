'use client';

import { useState } from 'react';
import { 
  UserPlus, 
  Search, 
  Filter, 
  MoreVertical, 
  Mail, 
  Phone, 
  ShieldCheck, 
  MapPin,
  Trash2,
  ExternalLink
} from 'lucide-react';
import { useAgentStore, Agent } from '@/lib/stores/agentStore';

export default function AgentDirectory() {
  const { agents, addAgent, deleteAgent, updateAgent } = useAgentStore();
  const [isAdding, setIsAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    licenseNumber: '',
    specialization: 'Residential',
    city: 'Dubai'
  });

  const handleAddAgent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    addAgent(formData);
    setFormData({ name: '', email: '', licenseNumber: '', specialization: 'Residential', city: 'Dubai' });
    setIsAdding(false);
  };

  const filteredAgents = agents.filter(a => 
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    a.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 bg-gray-50/50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Agent Directory</h1>
          <p className="text-gray-500">Manage and onboard real estate professionals</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-sm"
        >
          <UserPlus size={18} />
          {isAdding ? 'Cancel' : 'Add New Agent'}
        </button>
      </div>

      {/* Quick Add Form */}
      {isAdding && (
        <form onSubmit={handleAddAgent} className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Full Name</label>
              <input 
                required
                className="w-full p-2.5 border rounded-xl bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="e.g. Samir Al-Farsi"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Email Address</label>
              <input 
                required
                type="email"
                className="w-full p-2.5 border rounded-xl bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="samir@agency.com"
                value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">License (RERA/ORB)</label>
              <input 
                className="w-full p-2.5 border rounded-xl bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="e.g. 12345"
                value={formData.licenseNumber}
                onChange={e => setFormData({...formData, licenseNumber: e.target.value})}
              />
            </div>
          </div>
          <button type="submit" className="mt-4 w-full bg-blue-600 text-white py-2.5 rounded-xl font-bold hover:bg-blue-700">
            Complete Onboarding
          </button>
        </form>
      )}

      {/* Directory Controls */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            className="w-full pl-10 pr-4 py-2.5 border rounded-xl bg-white shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search agents by name, email or license..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Agent Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredAgents.map((agent) => (
          <div key={agent.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:border-blue-200 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg">
                  {agent.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{agent.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <MapPin size={12} /> {agent.city}
                  </div>
                </div>
              </div>
              <button onClick={() => deleteAgent(agent.id)} className="text-gray-300 hover:text-red-500 p-1">
                <Trash2 size={18} />
              </button>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail size={14} className="text-gray-400" /> {agent.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <ShieldCheck size={14} className={`text-gray-400 ${agent.licenseNumber ? 'text-emerald-500' : ''}`} /> 
                License: <span className="font-medium">{agent.licenseNumber || 'Not Provided'}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
              <div className="text-xs">
                <span className="font-bold text-blue-600">{agent.listingsCount}</span>
                <span className="text-gray-500 ml-1">Active Listings</span>
              </div>
              <div className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                agent.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
              }`}>
                {agent.status}
              </div>
            </div>
          </div>
        ))}
        
        {filteredAgents.length === 0 && (
          <div className="col-span-full py-20 text-center bg-white rounded-2xl border border-dashed border-gray-200">
            <div className="bg-gray-50 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="text-gray-300" size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-900">No agents found</h3>
            <p className="text-gray-500">Try adjusting your search or add a new agent to the system.</p>
          </div>
        )}
      </div>
    </div>
  );
}
