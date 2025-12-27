'use client';

import { useState } from 'react';
import {
  Users, Building2, ShieldCheck, TrendingUp,
  AlertTriangle, Clock, CheckCircle2, Plus, Search, X, Camera, Briefcase, MapPin, Award
} from 'lucide-react';
import { useGulfComplianceStore } from '@/lib/stores/compliance/gulfComplianceStore';
import { useGulfAssetStore } from '@/lib/stores/gulfAssetStore';
import { useAgentStore } from '@/lib/stores/agentStore';

export default function AdminDashboard() {
  const { records } = useGulfComplianceStore();
  const { properties } = useGulfAssetStore();
  const { agents, addAgent, deleteAgent } = useAgentStore();
  
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', photo: '', 
    agency: '', licenseNumber: '', specialization: '', 
    city: '', bio: '', experience: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAgent(formData);
    setShowForm(false);
    setFormData({ name: '', email: '', phone: '', photo: '', agency: '', licenseNumber: '', specialization: '', city: '', bio: '', experience: '' });
  };

  return (
    <div className="space-y-6">
      {/* Metrics Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Building2 size={24} /></div>
            <span className="text-xs font-bold text-emerald-600">+12%</span>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-500 font-medium">Total Assets</p>
            <h3 className="text-2xl font-black text-gray-900">{properties.length}</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-gold-50 rounded-lg text-yellow-600"><Users size={24} /></div>
            <span className="text-xs font-bold text-emerald-600">NEW</span>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-500 font-medium">Verified Agents</p>
            <h3 className="text-2xl font-black text-gray-900">{agents.length}</h3>
          </div>
        </div>
      </div>

      {/* Management Section */}
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Agent Directory</h3>
            <p className="text-sm text-gray-500">Onboard and manage elite real estate professionals</p>
          </div>
          <button 
            onClick={() => setShowForm(true)}
            className="bg-[#1A1A1A] text-white px-5 py-2.5 rounded-xl flex items-center gap-2 font-bold hover:bg-black transition-all"
          >
            <Plus size={18} /> Onboard Agent
          </button>
        </div>

        <div className="p-6">
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search agents by name, license, or agency..." 
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#B8860B] outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {agents.map((agent) => (
              <div key={agent.id} className="p-4 border border-gray-100 rounded-xl flex gap-4 items-center">
                <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                  {agent.photo ? <img src={agent.photo} alt={agent.name} className="w-full h-full object-cover" /> : <Users className="w-full h-full p-4 text-gray-400" />}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900">{agent.name}</h4>
                  <p className="text-xs text-gray-500">{agent.agency} • {agent.licenseNumber}</p>
                  <div className="flex gap-2 mt-1">
                    <span className="text-[10px] px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full font-bold uppercase">{agent.status}</span>
                  </div>
                </div>
                <button onClick={() => deleteAgent(agent.id)} className="text-gray-400 hover:text-red-500 transition-colors"><X size={18} /></button>
              </div>
            ))}
            {agents.length === 0 && <p className="text-center py-10 text-gray-400 col-span-2 italic">No agents onboarded yet.</p>}
          </div>
        </div>
      </div>

      {/* Professional Onboarding Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden">
            <div className="p-6 bg-[#1A1A1A] text-white flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">Professional Agent Onboarding</h2>
                <p className="text-xs text-gray-400">Add credentials for public directory & property linking</p>
              </div>
              <button onClick={() => setShowForm(false)} className="hover:rotate-90 transition-transform"><X /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 flex items-center gap-1 uppercase tracking-wider"><Users size={12}/> Full Name</label>
                <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} type="text" placeholder="e.g. Samir Al-Farsi" className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:border-[#B8860B]" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 flex items-center gap-1 uppercase tracking-wider"><Camera size={12}/> Profile Image URL</label>
                <input value={formData.photo} onChange={e => setFormData({...formData, photo: e.target.value})} type="text" placeholder="https://..." className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:border-[#B8860B]" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 flex items-center gap-1 uppercase tracking-wider"><Briefcase size={12}/> Agency Name</label>
                <input required value={formData.agency} onChange={e => setFormData({...formData, agency: e.target.value})} type="text" placeholder="Elite Properties LLC" className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:border-[#B8860B]" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 flex items-center gap-1 uppercase tracking-wider"><Award size={12}/> RERA License</label>
                <input required value={formData.licenseNumber} onChange={e => setFormData({...formData, licenseNumber: e.target.value})} type="text" placeholder="ORN-12345" className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:border-[#B8860B]" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 flex items-center gap-1 uppercase tracking-wider"><TrendingUp size={12}/> Specialization</label>
                <input value={formData.specialization} onChange={e => setFormData({...formData, specialization: e.target.value})} type="text" placeholder="Luxury Off-plan" className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:border-[#B8860B]" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 flex items-center gap-1 uppercase tracking-wider"><MapPin size={12}/> City/Region</label>
                <input value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} type="text" placeholder="Dubai Marina" className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:border-[#B8860B]" />
              </div>
              <div className="md:col-span-2 space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Professional Bio</label>
                <textarea rows={3} value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} placeholder="Expert in luxury penthouses with 10+ years..." className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:border-[#B8860B]" />
              </div>
              <button type="submit" className="md:col-span-2 bg-[#B8860B] text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-yellow-800 shadow-lg">Complete Onboarding</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
