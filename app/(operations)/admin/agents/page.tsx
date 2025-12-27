'use client';

import { useState } from 'react';
import {
  UserPlus, Search, Filter, MoreVertical, Mail, Phone, 
  ShieldCheck, MapPin, Trash2, ExternalLink, Camera, Briefcase, Award
} from 'lucide-react';
import { useAgentStore, Agent } from '@/lib/stores/agentStore';

export default function AgentDirectory() {
  const { agents, addAgent, deleteAgent, updateAgent } = useAgentStore();
  const [isAdding, setIsAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    photo: '',
    agency: '',
    licenseNumber: '',
    specialization: 'Residential',
    city: 'Dubai',
    bio: '',
    experience: ''
  });

  const handleAddAgent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    
    // Now includes all professional fields required by the Store
    addAgent(formData);
    
    // Reset form
    setFormData({ 
      name: '', email: '', phone: '', photo: '', 
      agency: '', licenseNumber: '', specialization: 'Residential', 
      city: 'Dubai', bio: '', experience: '' 
    });
    setIsAdding(false);
  };

  const filteredAgents = agents.filter(a =>
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.agency.toLowerCase().includes(searchTerm.toLowerCase())
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
          className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold transition-all shadow-sm ${
            isAdding ? 'bg-gray-200 text-gray-700' : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isAdding ? 'Cancel' : <><UserPlus size={18} /> Add New Agent</>}
        </button>
      </div>

      {/* Professional Add Form */}
      {isAdding && (
        <form onSubmit={handleAddAgent} className="bg-white p-8 rounded-2xl border border-blue-100 shadow-lg animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Email</label>
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
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Phone / WhatsApp</label>
              <input
                required
                className="w-full p-2.5 border rounded-xl bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="+971..."
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Agency Name</label>
              <input
                required
                className="w-full p-2.5 border rounded-xl bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Elite Properties"
                value={formData.agency}
                onChange={e => setFormData({...formData, agency: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">License (RERA/ORB)</label>
              <input
                className="w-full p-2.5 border rounded-xl bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="ORN-12345"
                value={formData.licenseNumber}
                onChange={e => setFormData({...formData, licenseNumber: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Photo URL</label>
              <input
                className="w-full p-2.5 border rounded-xl bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="https://..."
                value={formData.photo}
                onChange={e => setFormData({...formData, photo: e.target.value})}
              />
            </div>
          </div>
          <button type="submit" className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 shadow-md">
            Register Professional Agent
          </button>
        </form>
      )}

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          className="w-full pl-10 pr-4 py-3 border rounded-xl bg-white shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search agents by name, agency, or license..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Agent Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredAgents.map((agent) => (
          <div key={agent.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden">
            <div className="p-5 flex items-center gap-4">
              <div className="h-16 w-16 bg-gray-100 rounded-full overflow-hidden flex-shrink-0 border border-gray-50">
                {agent.photo ? (
                  <img src={agent.photo} alt={agent.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-blue-600 font-bold text-xl uppercase bg-blue-50">
                    {agent.name.charAt(0)}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">{agent.name}</h3>
                <p className="text-sm text-blue-600 font-medium">{agent.agency}</p>
                <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                  <MapPin size={12} /> {agent.city}
                </div>
              </div>
              <button onClick={() => deleteAgent(agent.id)} className="text-gray-300 hover:text-red-500 self-start">
                <Trash2 size={18} />
              </button>
            </div>

            <div className="px-5 py-4 bg-gray-50/50 space-y-2 border-y border-gray-50">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail size={14} className="text-gray-400" /> {agent.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone size={14} className="text-gray-400" /> {agent.phone}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Award size={14} className="text-emerald-500" />
                <span className="font-medium text-gray-900">{agent.licenseNumber}</span>
              </div>
            </div>

            <div className="p-4 flex items-center justify-between">
              <div className="text-xs px-3 py-1 bg-blue-50 text-blue-700 rounded-full font-bold">
                {agent.listingsCount} Listings
              </div>
              <div className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                agent.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
              }`}>
                {agent.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
