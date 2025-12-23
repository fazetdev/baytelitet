'use client';
import React, { useState } from 'react';
import MapWrapper from './MapWrapper';                                    
import { MapPin, Building2, Trash2, Plus, X, Info } from 'lucide-react';
import { useProperties, Property } from '@/context/useProperties';

export default function InventoryController() {
  const { properties, addProperty, deleteProperty } = useProperties();
  const [isAdding, setIsAdding] = useState(false);
  const [activeProp, setActiveProp] = useState<Property | null>(properties[0] || null);

  // Form state matching your Property interface
  const [newProp, setNewProp] = useState({
    title: '',
    price: '',
    city: 'Dubai',
    type: 'apartment' as const,
    lat: 25.1124,
    lng: 55.1390
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const propertyToSubmit: Property = {
      id: Date.now(), // Number ID
      title: newProp.title,
      location: newProp.city,
      price: parseInt(newProp.price.replace(/[^0-9]/g, '')) || 0,
      type: newProp.type,
      city: newProp.city,
      images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'],
      description: 'New luxury property managed via Vault.',
      latitude: newProp.lat,
      longitude: newProp.lng,
      bedrooms: 3,
      bathrooms: 3,
      virtualTour: false,
      premium: true
    };
    
    addProperty(propertyToSubmit);
    setIsAdding(false);
    setNewProp({ title: '', price: '', city: 'Dubai', type: 'apartment', lat: 25.1124, lng: 55.1390 });
  };

  return (
    <div className="flex flex-col space-y-8 animate-in fade-in duration-700">
      {/* Metrics Header */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/5 border border-white/10 p-5 rounded-3xl">
          <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Live Units</p>
          <p className="text-xl font-black italic text-white mt-1">{properties.length}</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-[#D4AF37]/10 border border-[#D4AF37]/20 p-5 rounded-3xl flex flex-col items-start hover:bg-[#D4AF37]/20 transition-all"
        >
          <Plus className="text-[#D4AF37] mb-1" size={20} />
          <p className="text-[9px] font-black text-[#D4AF37] uppercase tracking-widest">New Listing</p>
        </button>
      </div>

      {isAdding && (
        <div className="bg-white/5 border border-[#D4AF37]/30 p-8 rounded-[3rem] animate-in zoom-in duration-300">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-black italic uppercase">Authorization Required</h3>
            <button onClick={() => setIsAdding(false)}><X size={24} /></button>
          </div>
          <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input 
              placeholder="Property Title" 
              className="bg-black/40 border border-white/10 p-4 rounded-2xl outline-none focus:border-[#D4AF37] text-white"
              onChange={e => setNewProp({...newProp, title: e.target.value})}
              required
            />
            <input 
              placeholder="Price (Numbers only)" 
              className="bg-black/40 border border-white/10 p-4 rounded-2xl outline-none focus:border-[#D4AF37] text-white"
              onChange={e => setNewProp({...newProp, price: e.target.value})}
              required
            />
            <button type="submit" className="md:col-span-2 bg-[#D4AF37] text-black font-black py-4 rounded-2xl uppercase italic hover:bg-[#B8860B] transition-colors">
              Confirm & Push to Live
            </button>
          </form>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/3 space-y-4 max-h-[600px] overflow-y-auto no-scrollbar pr-2">
          {properties.map((loc) => (
            <div key={loc.id} className="relative group">
              <button
                onClick={() => setActiveProp(loc)}
                className={`w-full p-6 rounded-[2.5rem] border transition-all text-left relative overflow-hidden ${
                  activeProp?.id === loc.id
                    ? 'bg-[#D4AF37] border-[#D4AF37] text-black'
                    : 'bg-white/5 border-white/10 text-white hover:border-white/20'
                }`}
              >
                <div className="flex justify-between items-start">
                  <Building2 className={activeProp?.id === loc.id ? 'text-black' : 'text-[#D4AF37]'} size={20} />
                  <button 
                    onClick={(e) => { e.stopPropagation(); deleteProperty(loc.id); }}
                    className="p-2 bg-black/10 rounded-lg hover:bg-red-600 hover:text-white transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="mt-6">
                  <p className="font-black italic uppercase text-lg leading-none tracking-tighter">{loc.title}</p>
                  <p className={`text-[10px] font-bold mt-2 uppercase tracking-widest ${activeProp?.id === loc.id ? 'text-black/60' : 'text-gray-500'}`}>
                    AED {loc.price.toLocaleString()}
                  </p>
                </div>
              </button>
            </div>
          ))}
        </div>

        <div className="flex-1">
          <div className="h-[450px] relative rounded-[3rem] overflow-hidden border border-white/10">
            {activeProp ? (
              <MapWrapper latitude={activeProp.latitude} longitude={activeProp.longitude} title={activeProp.title} />
            ) : (
              <div className="h-full flex items-center justify-center bg-white/5 text-gray-500 italic uppercase font-black">Select a unit to view location</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
