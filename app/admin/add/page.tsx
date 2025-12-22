'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Users, Home, Plus, Trash2, PieChart, Camera, ArrowRight, AlertTriangle } from 'lucide-react';
import { useProperties, Property } from '@/context/useProperties';
import { useAgents } from '@/context/useAgents';

export default function ManagementHub() {
  const [activeTab, setActiveTab] = useState<'overview' | 'properties' | 'agents'>('overview');
  const { properties, addProperty, deleteProperty } = useProperties();
  const { agents, deleteAgent } = useAgents();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const [propForm, setPropForm] = useState({
    title: '', price: '', city: '', location: '', type: 'villa' as Property['type'], lat: '', lng: '', img: ''
  });

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const handleAddProp = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Safety check for City
    const finalCity = propForm.city.trim() || 'Dubai';
    
    const newProperty: Property = {
      id: Date.now(),
      title: propForm.title || 'New Property',
      location: propForm.location.trim() || finalCity,
      price: Number(propForm.price) || 0,
      type: propForm.type,
      city: finalCity,
      // Fixed: Clean URL without unsafe query parameters
      images: [propForm.img || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750'],
      description: 'Exclusive portfolio listing managed via Bayt Elite Office.',
      latitude: Number(propForm.lat) || 25.2048,
      longitude: Number(propForm.lng) || 55.2708,
      bedrooms: 4,
      bathrooms: 4,
      virtualTour: true
    };
    
    addProperty(newProperty);
    // Reset form
    setPropForm({ title: '', price: '', city: '', location: '', type: 'villa', lat: '', lng: '', img: '' });
    setPreviewImage(null);
    setActiveTab('overview');
  };

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-bayt-dark text-white pt-12 pb-24 px-8 rounded-b-[4rem] shadow-2xl">
        <div className="container mx-auto">
          <h1 className="text-4xl font-black mb-2 tracking-tighter uppercase">Agency Hub</h1>
          <p className="text-bayt-warm font-bold uppercase tracking-[0.3em] text-xs">Professional Management Layer</p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-12">
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 bg-white/50 backdrop-blur-md p-2 rounded-[2.5rem] w-fit shadow-inner border border-white">
          {(['overview', 'properties', 'agents'] as const).map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} 
              className={`px-8 py-4 rounded-[2rem] font-black text-sm uppercase transition-all ${activeTab === tab ? 'bg-bayt-dark text-white shadow-xl' : 'text-gray-400 hover:text-bayt-dark'}`}>
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-gray-100">
              <p className="text-gray-400 font-bold text-xs uppercase mb-1">Total Listings</p>
              <p className="text-4xl font-black text-bayt-dark">{properties.length}</p>
            </div>
            <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-gray-100">
              <p className="text-gray-400 font-bold text-xs uppercase mb-1">Team Size</p>
              <p className="text-4xl font-black text-bayt-dark">{agents.length}</p>
            </div>
            <button onClick={() => setActiveTab('properties')} className="bg-bayt-warm p-8 rounded-[3rem] shadow-lg text-white text-left group hover:bg-bayt-dark transition-colors">
              <p className="font-black text-xl">New Entry</p>
              <div className="flex items-center gap-2 mt-2 font-bold text-sm opacity-80">Launch Form <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform"/></div>
            </button>
          </div>
        )}

        {activeTab === 'properties' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <form onSubmit={handleAddProp} className="bg-white p-8 rounded-[3rem] shadow-xl space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-black">Property Details</h2>
                {previewImage && <div className="flex items-center gap-1 text-[10px] text-amber-600 font-bold uppercase"><AlertTriangle className="w-3 h-3"/> Local Storage Warning</div>}
              </div>

              <div className="relative h-48 bg-gray-50 rounded-[2rem] border-2 border-dashed border-bayt-warm/30 flex items-center justify-center overflow-hidden cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                {previewImage ? <img src={previewImage} className="w-full h-full object-cover" alt="preview" /> : <div className="text-center"><Camera className="w-10 h-10 mx-auto text-bayt-warm mb-2"/><p className="text-xs font-bold text-gray-400">CAMERA / UPLOAD</p></div>}
                <input type="file" accept="image/*" capture="environment" ref={fileInputRef} hidden onChange={(e) => {
                   const file = e.target.files?.[0];
                   if(file) {
                     if(file.size > 1000000) { alert("Image too large for local demo. Please use a smaller photo."); return; }
                     const reader = new FileReader();
                     reader.onload = () => { 
                       setPreviewImage(reader.result as string); 
                       setPropForm({...propForm, img: reader.result as string}); 
                     };
                     reader.readAsDataURL(file);
                   }
                }} />
              </div>

              <input type="text" placeholder="Property Title" className="w-full p-5 bg-gray-50 rounded-2xl outline-none font-bold" required value={propForm.title} onChange={e => setPropForm({...propForm, title: e.target.value})} />
              <div className="grid grid-cols-2 gap-4">
                <input type="number" placeholder="Price (AED)" className="w-full p-5 bg-gray-50 rounded-2xl outline-none font-bold" required value={propForm.price} onChange={e => setPropForm({...propForm, price: e.target.value})} />
                <select className="w-full p-5 bg-gray-50 rounded-2xl outline-none font-bold" value={propForm.type} onChange={e => setPropForm({...propForm, type: e.target.value as any})}>
                  <option value="villa">Villa</option><option value="apartment">Apartment</option><option value="penthouse">Penthouse</option>
                </select>
              </div>
              <input type="text" placeholder="City" className="w-full p-5 bg-gray-50 rounded-2xl outline-none" required value={propForm.city} onChange={e => setPropForm({...propForm, city: e.target.value})} />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Lat (25.1)" className="w-full p-5 bg-gray-50 rounded-2xl outline-none" value={propForm.lat} onChange={e => setPropForm({...propForm, lat: e.target.value})} />
                <input type="text" placeholder="Lng (55.2)" className="w-full p-5 bg-gray-50 rounded-2xl outline-none" value={propForm.lng} onChange={e => setPropForm({...propForm, lng: e.target.value})} />
              </div>
              <button className="w-full bg-bayt-dark text-white py-6 rounded-3xl font-black text-lg shadow-lg hover:bg-bayt-warm transition-all">PUBLISH LISTING</button>
            </form>

            <div className="space-y-4 overflow-y-auto max-h-[700px] pr-2">
              <h2 className="text-2xl font-black px-4">Active Inventory</h2>
              {properties.length === 0 ? <p className="px-4 text-gray-400 italic">No listings in database.</p> : properties.map(p => (
                <div key={p.id} className="bg-white p-6 rounded-[2.5rem] shadow-sm flex items-center justify-between border border-gray-100 group">
                  <div className="flex items-center gap-4">
                    <img src={p.images[0]} className="w-16 h-16 rounded-2xl object-cover" alt="" />
                    <div><p className="font-black text-bayt-dark leading-none mb-1">{p.title}</p><p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{p.city}</p></div>
                  </div>
                  <button onClick={() => deleteProperty(p.id)} className="p-3 bg-red-50 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all"><Trash2 className="w-5 h-5"/></button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
