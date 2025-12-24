'use client';

import React, { useState } from 'react';
import { Building2, MapPin, BadgePercent, FileText, Camera, Save } from 'lucide-react';

export default function AddListingForm({ onComplete }: { onComplete: () => void }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // PRODUCTION BRIDGE: This will hit your /api/properties/add
    console.log('Publishing Real Listing:', data);
    
    // Simulate network delay
    setTimeout(() => {
      setLoading(false);
      onComplete();
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white/5 border border-white/10 p-8 rounded-[2.5rem]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Section 1: Property Identity */}
        <div className="space-y-6">
          <h3 className="text-[#D4AF37] font-black text-xs uppercase tracking-[0.2em] flex items-center gap-2">
            <Building2 className="w-4 h-4" /> Property Identity
          </h3>
          
          <div className="space-y-4">
            <input 
              name="title" 
              required 
              placeholder="Property Title (e.g. 3BR Villa in Dubai Hills)" 
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:border-[#D4AF37] outline-none transition-all"
            />
            
            <select name="type" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#D4AF37] outline-none appearance-none">
              <option value="Ready">Ready to Move</option>
              <option value="Off-Plan">Off-Plan / Under Construction</option>
            </select>

            <div className="grid grid-cols-2 gap-4">
              <input 
                name="price" 
                type="number" 
                required 
                placeholder="Price (AED)" 
                className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:border-[#D4AF37] outline-none"
              />
              <input 
                name="size" 
                type="number" 
                required 
                placeholder="Size (Sq.Ft)" 
                className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:border-[#D4AF37] outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Legal & Compliance (RERA) */}
        <div className="space-y-6">
          <h3 className="text-[#D4AF37] font-black text-xs uppercase tracking-[0.2em] flex items-center gap-2">
            <FileText className="w-4 h-4" /> Legal Compliance
          </h3>
          
          <div className="space-y-4">
            <input 
              name="permitNumber" 
              required 
              placeholder="Trakheesi Permit Number" 
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:border-[#D4AF37] outline-none"
            />
            <div className="relative">
              <input 
                name="permitExpiry" 
                type="date" 
                required 
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#D4AF37] outline-none"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-gray-500 uppercase font-bold pointer-events-none">Expiry Date</span>
            </div>
            <input 
              name="developer" 
              placeholder="Developer (e.g. Emaar, Damac)" 
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:border-[#D4AF37] outline-none"
            />
          </div>
        </div>
      </div>

      {/* Media Upload Area (UI Placeholder for File Selection) */}
      <div className="border-2 border-dashed border-white/10 rounded-[2rem] p-10 flex flex-col items-center justify-center hover:border-[#D4AF37]/40 transition-all cursor-pointer group">
        <Camera className="w-10 h-10 text-gray-600 group-hover:text-[#D4AF37] mb-4 transition-colors" />
        <p className="text-sm font-bold text-gray-400 group-hover:text-white">Upload Property Images & Title Deed</p>
        <p className="text-[10px] text-gray-600 uppercase mt-2 font-black">Max 10 High-Res Photos (JPG/PNG)</p>
      </div>

      {/* Form Submission */}
      <div className="flex justify-end gap-4">
        <button 
          type="button" 
          onClick={onComplete}
          className="px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
        >
          Cancel
        </button>
        <button 
          type="submit" 
          disabled={loading}
          className="bg-[#D4AF37] text-black px-12 py-4 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-lg shadow-[#D4AF37]/10 hover:shadow-[#D4AF37]/20 flex items-center gap-3 transition-all disabled:opacity-50"
        >
          {loading ? 'Processing...' : <><Save className="w-4 h-4" /> Publish Listing</>}
        </button>
      </div>
    </form>
  );
}
