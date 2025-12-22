'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Users, Home, Trash2, Camera, UserPlus, ShieldCheck, Gold } from 'lucide-react';
import { useProperties, Property } from '@/context/useProperties';
import { useAgents, Agent } from '@/context/useAgents';

export default function GulfManagementDashboard() {
  const [activeTab, setActiveTab] = useState<'properties' | 'agents'>('properties');
  const { properties, addProperty, deleteProperty } = useProperties();
  const { agents, addAgent, deleteAgent } = useAgents();
  const [mounted, setMounted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const agentFileRef = useRef<HTMLInputElement>(null);

  const [propForm, setPropForm] = useState({
    title: '', price: '', city: '', type: 'villa' as Property['type'], lat: '', lng: '', img: ''
  });
  const [agentForm, setAgentForm] = useState({
    name: '', role: '', email: '', phone: '', img: ''
  });

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const handleAddProp = (e: React.FormEvent) => {
    e.preventDefault();
    addProperty({
      id: Date.now(),
      title: propForm.title || 'Elite Residence',
      location: propForm.city || 'Dubai',
      price: Number(propForm.price) || 0,
      type: propForm.type,
      city: propForm.city || 'Dubai',
      images: [propForm.img || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750'],
      description: 'Exclusive luxury portfolio entry.',
      latitude: Number(propForm.lat) || 25.2,
      longitude: Number(propForm.lng) || 55.3,
      bedrooms: 4, bathrooms: 4, virtualTour: true, premium: true
    });
    setPropForm({ title: '', price: '', city: '', type: 'villa', lat: '', lng: '', img: '' });
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
      certified: true
    });
    setAgentForm({ name: '', role: '', email: '', phone: '', img: '' });
  };

  const inputClass = "w-full p-4 bg-white/5 rounded-xl border border-white/10 focus:border-[#D4AF37] outline-none transition-all text-sm font-medium text-white placeholder:text-gray-500";

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white pb-20">
      {/* Premium Header */}
      <header className="relative py-16 px-6 text-center border-b border-[#D4AF37]/20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/5 to-transparent pointer-events-none"></div>
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#D4AF37] tracking-tighter mb-2 italic">Bayt Elite</h1>
        <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.5em]">Executive Office Terminal</p>
        
        <div className="flex justify-center gap-4 mt-10">
          <button onClick={() => setActiveTab('properties')} className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold text-xs uppercase tracking-widest transition-all ${activeTab === 'properties' ? 'bg-[#D4AF37] text-black shadow-[0_0_20px_rgba(212,175,55,0.3)]' : 'bg-white/5 text-gray-400 border border-white/10 hover:border-[#D4AF37]/50'}`}>
            <Home className="w-4 h-4"/> Listings
          </button>
          <button onClick={() => setActiveTab('agents')} className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold text-xs uppercase tracking-widest transition-all ${activeTab === 'agents' ? 'bg-[#D4AF37] text-black shadow-[0_0_20px_rgba(212,175,55,0.3)]' : 'bg-white/5 text-gray-400 border border-white/10 hover:border-[#D4AF37]/50'}`}>
            <Users className="w-4 h-4"/> Agents
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* CONTROL PANEL */}
          <section className="bg-[#111] p-8 rounded-[2rem] border border-[#D4AF37]/10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              {activeTab === 'properties' ? <Home size={120} /> : <Users size={120} />}
            </div>
            
            <h2 className="text-xl font-bold text-[#D4AF37] mb-8 flex items-center gap-3">
              <span className="w-8 h-[2px] bg-[#D4AF37]"></span>
              {activeTab === 'properties' ? 'OFFER NEW ESTATE' : 'COMMISSION AGENT'}
            </h2>
            
            {activeTab === 'properties' ? (
              <form onSubmit={handleAddProp} className="space-y-4 relative z-10">
                <div className="aspect-video bg-black rounded-2xl border border-white/10 flex flex-col items-center justify-center cursor-pointer overflow-hidden group hover:border-[#D4AF37] transition-all" onClick={() => fileRef.current?.click()}>
                  {propForm.img ? <img src={propForm.img} className="w-full h-full object-cover" /> :
                  <><Camera className="w-8 h-8 text-[#D4AF37] opacity-50 group-hover:opacity-100 transition-opacity"/><p className="text-[10px] font-bold text-gray-500 mt-2 uppercase">Property Visual</p></>}
                  <input type="file" hidden ref={fileRef} onChange={e => {
                    const r = new FileReader(); r.onload = () => setPropForm({...propForm, img: r.result as string});
                    if(e.target.files?.[0]) r.readAsDataURL(e.target.files[0]);
                  }} />
                </div>
                <input placeholder="Title" className={inputClass} value={propForm.title} onChange={e => setPropForm({...propForm, title: e.target.value})} required />
                <div className="grid grid-cols-2 gap-4">
                  <input placeholder="Price (AED)" type="number" className={inputClass} value={propForm.price} onChange={e => setPropForm({...propForm, price: e.target.value})} required />
                  <input placeholder="City" className={inputClass} value={propForm.city} onChange={e => setPropForm({...propForm, city: e.target.value})} />
                </div>
                <button className="w-full py-5 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black rounded-xl font-black uppercase text-xs tracking-[0.2em] shadow-lg hover:brightness-110 active:scale-95 transition-all">Publish to Portfolio</button>
              </form>
            ) : (
              <form onSubmit={handleAddAgent} className="space-y-4 relative z-10">
                <div className="w-28 h-28 mx-auto rounded-full border border-[#D4AF37]/30 bg-black flex items-center justify-center cursor-pointer overflow-hidden group hover:border-[#D4AF37] transition-all" onClick={() => agentFileRef.current?.click()}>
                  {agentForm.img ? <img src={agentForm.img} className="w-full h-full object-cover rounded-full"/> :
                  <UserPlus className="w-8 h-8 text-[#D4AF37] opacity-50" />}
                  <input type="file" hidden ref={agentFileRef} onChange={e => {
                    const r = new FileReader(); r.onload = () => setAgentForm({...agentForm, img: r.result as string});
                    if(e.target.files?.[0]) r.readAsDataURL(e.target.files[0]);
                  }} />
                </div>
                <input placeholder="Full Name" className={inputClass} value={agentForm.name} onChange={e => setAgentForm({...agentForm, name: e.target.value})} required />
                <input placeholder="Professional Role" className={inputClass} value={agentForm.role} onChange={e => setAgentForm({...agentForm, role: e.target.value})} required />
                <button className="w-full py-5 bg-[#D4AF37] text-black rounded-xl font-black uppercase text-xs tracking-[0.2em] shadow-lg hover:brightness-110 transition-all">Authorize Agent</button>
              </form>
            )}
          </section>

          {/* ASSET LIST */}
          <section className="space-y-6">
            <h3 className="text-[10px] font-black text-gray-500 tracking-[0.5em] uppercase px-2 flex items-center gap-2">
              <ShieldCheck size={14} className="text-[#D4AF37]"/> Secure Records
            </h3>
            
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {(activeTab === 'properties' ? properties : agents).map((item: any) => (
                <div key={item.id} className="group bg-[#111] p-4 rounded-2xl border border-white/5 flex items-center justify-between hover:border-[#D4AF37]/30 transition-all">
                  <div className="flex items-center gap-4">
                    <img src={item.images ? item.images[0] : item.image} className={`w-14 h-14 object-cover ${activeTab === 'agents' ? 'rounded-full' : 'rounded-xl'} grayscale group-hover:grayscale-0 transition-all border border-white/10`} alt="" />
                    <div>
                      <p className="font-bold text-gray-200 text-sm tracking-tight">{item.title || item.name}</p>
                      <p className="text-[9px] text-[#D4AF37] font-black uppercase tracking-widest opacity-70">{item.city || item.role}</p>
                    </div>
                  </div>
                  <button onClick={() => activeTab === 'properties' ? deleteProperty(item.id) : deleteAgent(item.id)} className="p-2 text-gray-600 hover:text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4"/>
                  </button>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
