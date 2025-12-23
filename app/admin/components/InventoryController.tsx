'use client';
import React, { useState } from 'react';
import MapWrapper from './MapWrapper';
import { MapPin, Building2, ShieldCheck, Info } from 'lucide-react';

export default function InventoryController() {
  const [activeProp, setActiveProp] = useState({
    title: 'Palm Jumeirah Signature',
    lat: 25.1124,
    lng: 55.1390,
    price: '45M AED',
    permit: 'T-9821-X',
    status: 'Verified'
  });

  const locations = [
    { title: 'Palm Jumeirah Signature', lat: 25.1124, lng: 55.1390, price: '45M AED', permit: 'T-9821-X', status: 'Verified' },
    { title: 'Burj Khalifa Penthouse', lat: 25.1972, lng: 55.2744, price: '18M AED', permit: 'T-4432-A', status: 'Audit Req' },
    { title: 'Dubai Hills Estate', lat: 25.0819, lng: 55.1440, price: '12M AED', permit: 'T-1109-C', status: 'Verified' },
  ];

  return (
    <div className="flex flex-col space-y-8 animate-in fade-in duration-700">
      {/* Metrics Header */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/5 border border-white/10 p-5 rounded-3xl">
          <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Total Value</p>
          <p className="text-xl font-black italic text-white mt-1">75M AED</p>
        </div>
        <div className="bg-white/5 border border-white/10 p-5 rounded-3xl">
          <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Live Units</p>
          <p className="text-xl font-black italic text-[#D4AF37] mt-1">124</p>
        </div>
        <div className="bg-white/5 border border-white/10 p-5 rounded-3xl">
          <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Compliant</p>
          <p className="text-xl font-black italic text-green-500 mt-1">98%</p>
        </div>
        <div className="bg-white/5 border border-white/10 p-5 rounded-3xl">
          <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Pending NOC</p>
          <p className="text-xl font-black italic text-red-500 mt-1">03</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Inventory Selection List */}
        <div className="w-full lg:w-1/3 space-y-4 max-h-[600px] overflow-y-auto no-scrollbar pr-2">
          {locations.map((loc, i) => (
            <button
              key={i}
              onClick={() => setActiveProp(loc)}
              className={`w-full p-6 rounded-[2.5rem] border transition-all text-left group relative overflow-hidden ${
                activeProp.title === loc.title 
                  ? 'bg-[#D4AF37] border-[#D4AF37] text-black shadow-[0_20px_40px_rgba(212,175,55,0.15)]' 
                  : 'bg-white/5 border-white/10 text-white hover:border-white/20'
              }`}
            >
              <div className="flex justify-between items-start relative z-10">
                <Building2 className={activeProp.title === loc.title ? 'text-black' : 'text-[#D4AF37]'} size={20} />
                <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-lg ${activeProp.title === loc.title ? 'bg-black/10' : 'bg-white/5'}`}>
                  {loc.status}
                </span>
              </div>
              <div className="mt-6 relative z-10">
                <p className="font-black italic uppercase text-lg leading-none tracking-tighter">{loc.title}</p>
                <p className={`text-[10px] font-bold mt-2 uppercase tracking-widest ${activeProp.title === loc.title ? 'text-black/60' : 'text-gray-500'}`}>
                  Valuation: {loc.price}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Map & Detail View */}
        <div className="flex-1 space-y-6">
          <div className="h-[450px] relative rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
            <MapWrapper 
              latitude={activeProp.lat} 
              longitude={activeProp.lng} 
              title={activeProp.title} 
            />
            {/* Overlay Info Card */}
            <div className="absolute bottom-6 left-6 right-6 bg-black/80 backdrop-blur-xl border border-white/10 p-6 rounded-3xl z-[1000] flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#D4AF37] rounded-2xl text-black">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-white font-black italic uppercase text-sm tracking-tight">{activeProp.title}</p>
                  <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mt-1">
                    Permit: {activeProp.permit} • GPS: {activeProp.lat.toFixed(3)}, {activeProp.lng.toFixed(3)}
                  </p>
                </div>
              </div>
              <button className="bg-white/5 hover:bg-white/10 text-white p-3 rounded-2xl border border-white/10 transition-all">
                <Info size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
