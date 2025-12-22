'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Users, Home, Trash2, Camera, UserPlus } from 'lucide-react';
import { useProperties, Property } from '@/context/useProperties';
import { useAgents } from '@/context/useAgents';

export default function PremiumManagementDashboard() {
  const [activeTab, setActiveTab] = useState<'properties' | 'agents'>('properties');
  const { properties, addProperty, deleteProperty } = useProperties();
  const { agents, addAgent, deleteAgent } = useAgents();
  const [mounted, setMounted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const agentFileRef = useRef<HTMLInputElement>(null);

  const [propForm, setPropForm] = useState({
    title: '', price: '', city: '', type: 'villa' as Property['type'], lat: '', lng: '', img: '', premium: true, bedrooms: 3, bathrooms: 3, virtualTour: true
  });
  const [agentForm, setAgentForm] = useState({
    name: '', role: '', email: '', phone: '', img: '', certified: true
  });

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const handleAddProp = (e: React.FormEvent) => {
    e.preventDefault();
    addProperty({
      id: Date.now(),
      title: propForm.title || 'Untitled Property',
      location: propForm.city || 'Dubai',
      price: Number(propForm.price) || 0,
      type: propForm.type,
      city: propForm.city || 'Dubai',
      images: [propForm.img || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750'],
      description: 'Premium Gulf luxury property.',
      latitude: Number(propForm.lat) || 25.2,
      longitude: Number(propForm.lng) || 55.3,
      bedrooms: propForm.bedrooms,
      bathrooms: propForm.bathrooms,
      virtualTour: propForm.virtualTour,
      premium: propForm.premium
    });
    setPropForm({ title: '', price: '', city: '', type: 'villa', lat: '', lng: '', img: '', premium: true, bedrooms: 3, bathrooms: 3, virtualTour: true });
    alert('Premium Property Added');
  };

  const handleAddAgent = (e: React.FormEvent) => {
    e.preventDefault();
    addAgent({
      id: Date.now(),
      name: agentForm.name,
      role: agentForm.role,
      email: agentForm.email,
      phone: agentForm.phone,
      image: agentForm.img || 'https://images.unsplash.com/photo-1560250097-0b93528c311a',
      certified: agentForm.certified
    });
    setAgentForm({ name: '', role: '', email: '', phone: '', img: '', certified: true });
    alert('Agent Added');
  };

  const inputClass = "w-full p-4 bg-gray-50 rounded-2xl border border-gray-200 focus:border-red-400 outline-none transition-all text-sm font-medium";

  return (
    <main className="min-h-screen bg-gray-50 pb-12">
      <header className="bg-gradient-to-r from-yellow-500 via-red-500 to-pink-600 text-white py-12 px-6 text-center shadow-xl">
        <h1 className="text-2xl md:text-4xl font-black uppercase tracking-widest">Gulf Estate Dashboard</h1>
        <p className="mt-2 text-xs md:text-sm font-bold opacity-90 uppercase">Portfolio Command Center</p>
        
        <div className="flex justify-center gap-2 md:gap-4 mt-8">
          <button onClick={() => setActiveTab('properties')} className={`flex items-center gap-2 px-5 py-3 rounded-full font-black text-[10px] md:text-xs uppercase tracking-tighter transition-all ${activeTab === 'properties' ? 'bg-white text-red-500 shadow-lg scale-105' : 'bg-white/20 text-white border border-white/40'}`}>
            <Home className="w-4 h-4"/> Listings
          </button>
          <button onClick={() => setActiveTab('agents')} className={`flex items-center gap-2 px-5 py-3 rounded-full font-black text-[10px] md:text-xs uppercase tracking-tighter transition-all ${activeTab === 'agents' ? 'bg-white text-red-500 shadow-lg scale-105' : 'bg-white/20 text-white border border-white/40'}`}>
            <Users className="w-4 h-4"/> Agents
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          
          {/* FORM SECTION */}
          <section className="bg-white p-6 rounded-[2.5rem] shadow-xl border border-gray-100">
            <h2 className="text-xl font-black text-gray-800 mb-6 flex items-center gap-2">
              {activeTab === 'properties' ? 'NEW PROPERTY' : 'NEW AGENT'}
            </h2>
            
            {activeTab === 'properties' ? (
              <form onSubmit={handleAddProp} className="space-y-4">
                <div className="aspect-video bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer overflow-hidden group hover:border-red-400 transition-colors" onClick={() => fileRef.current?.click()}>
                  {propForm.img ? <img src={propForm.img} className="w-full h-full object-cover" /> :
                  <><Camera className="w-8 h-8 text-gray-300"/><p className="text-[10px] font-black text-gray-400 mt-2">PROPERTY IMAGE</p></>}
                  <input type="file" hidden ref={fileRef} onChange={e => {
                    const r = new FileReader(); r.onload = () => setPropForm({...propForm, img: r.result as string});
                    if(e.target.files?.[0]) r.readAsDataURL(e.target.files[0]);
                  }} />
                </div>
                <input placeholder="Title" className={inputClass} value={propForm.title} onChange={e => setPropForm({...propForm, title: e.target.value})} required />
                <div className="grid grid-cols-2 gap-3">
                  <input placeholder="Price (AED)" type="number" className={inputClass} value={propForm.price} onChange={e => setPropForm({...propForm, price: e.target.value})} required />
                  <select className={inputClass} value={propForm.type} onChange={e => setPropForm({...propForm, type: e.target.value as any})}>
                    <option value="villa">Villa</option><option value="apartment">Apartment</option><option value="penthouse">Penthouse</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input placeholder="Lat" className={inputClass} value={propForm.lat} onChange={e => setPropForm({...propForm, lat: e.target.value})} />
                  <input placeholder="Lng" className={inputClass} value={propForm.lng} onChange={e => setPropForm({...propForm, lng: e.target.value})} />
                </div>
                <button className="w-full py-5 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg shadow-red-200 active:scale-95 transition-all">Add Premium Listing</button>
              </form>
            ) : (
              <form onSubmit={handleAddAgent} className="space-y-4">
                <div className="w-32 h-32 mx-auto rounded-full border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer overflow-hidden group hover:border-red-400 transition-colors" onClick={() => agentFileRef.current?.click()}>
                  {agentForm.img ? <img src={agentForm.img} className="w-full h-full object-cover rounded-full"/> :
                  <UserPlus className="w-8 h-8 text-gray-300" />}
                  <input type="file" hidden ref={agentFileRef} onChange={e => {
                    const r = new FileReader(); r.onload = () => setAgentForm({...agentForm, img: r.result as string});
                    if(e.target.files?.[0]) r.readAsDataURL(e.target.files[0]);
                  }} />
                </div>
                <input placeholder="Name" className={inputClass} value={agentForm.name} onChange={e => setAgentForm({...agentForm, name: e.target.value})} required />
                <input placeholder="Role" className={inputClass} value={agentForm.role} onChange={e => setAgentForm({...agentForm, role: e.target.value})} required />
                <div className="grid grid-cols-2 gap-3">
                  <input placeholder="Email" className={inputClass} value={agentForm.email} onChange={e => setAgentForm({...agentForm, email: e.target.value})} />
                  <input placeholder="Phone" className={inputClass} value={agentForm.phone} onChange={e => setAgentForm({...agentForm, phone: e.target.value})} />
                </div>
                <button className="w-full py-5 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg active:scale-95 transition-all">Recruit Agent</button>
              </form>
            )}
          </section>

          {/* LIST SECTION */}
          <section className="space-y-4">
            <h3 className="text-[10px] font-black text-gray-400 tracking-widest uppercase ml-2">
              {activeTab === 'properties' ? `ACTIVE INVENTORY (${properties.length})` : `ELITE TEAM (${agents.length})`}
            </h3>
            
            <div className="max-h-[600px] overflow-y-auto pr-2 space-y-3">
              {activeTab === 'properties' ? (
                properties.map(p => (
                  <div key={p.id} className="flex items-center justify-between p-4 bg-white rounded-3xl shadow-sm border border-gray-100 animate-in fade-in slide-in-from-right-4">
                    <div className="flex items-center gap-4">
                      <img src={p.images[0]} className="w-14 h-14 rounded-2xl object-cover" alt="" />
                      <div><p className="font-bold text-sm text-gray-800">{p.title}</p><p className="text-[10px] text-gray-400 font-bold">AED {p.price.toLocaleString()}</p></div>
                    </div>
                    <button onClick={() => deleteProperty(p.id)} className="p-3 text-red-400 hover:bg-red-50 rounded-full transition-colors"><Trash2 className="w-5 h-5"/></button>
                  </div>
                ))
              ) : (
                agents.map(a => (
                  <div key={a.id} className="flex items-center justify-between p-4 bg-white rounded-3xl shadow-sm border border-gray-100 animate-in fade-in slide-in-from-right-4">
                    <div className="flex items-center gap-4">
                      <img src={a.image} className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm" alt="" />
                      <div><p className="font-bold text-sm text-gray-800">{a.name}</p><p className="text-[10px] text-red-500 font-black uppercase tracking-tighter">{a.role}</p></div>
                    </div>
                    <button onClick={() => deleteAgent(a.id)} className="p-3 text-red-400 hover:bg-red-50 rounded-full transition-colors"><Trash2 className="w-5 h-5"/></button>
                  </div>
                ))
              )}
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
